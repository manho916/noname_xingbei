/**
 * 關於`Google Chrome`的異步錯誤處理
 *
 * 由於`v8`提供的`Error.prepareStackTrace(error, structuredStackTrace)`接口存在一些限制，導致不適合無名殺
 *
 * 故我們直接解析`Error`的棧堆信息，來獲取相關內容
 *
 * ~~`Chrome`所用的`v8`引擎為`Error`提供了特有的報錯棧堆處理接口，用於用戶自定義報錯棧堆的內容。~~
 *
 * ~~我們用到了`Error.prepareStackTrace(error, structuredStackTrace)`這個接口，這個接口的信息可參考[這裡](https://v8.dev/docs/stack-trace-api#customizing-stack-traces)~~
 *
 * ~~該接口提供了結構化的棧堆信息，很幸運的是，這個結構化的棧堆能直接告訴我們報錯的文件以及位置，故我們使用該接口，讓異步報錯能直接定位原始位置~~
 *
 * @implements {PromiseErrorHandler}
 */
export class ChromePromiseErrorHandler {
	/**
	 * ~~用於臨時記錄報錯信息的列表，通過`Error.prepareStackTrace`更新該列表~~
	 *
	 * 現在用於存儲報錯過的錯誤信息
	 *
	 * @type {Error[]}
	 */
	#errorList;

	/**
	 * @type {typeof Error.prepareStackTrace}
	 *
	 * @deprecated
	 */
	#_originErrorPrepareStackTrace;

	/**
	 * 判斷是否是v8錯誤棧堆用到的正則
	 */
	#STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;

	/**
	 * ~~初始化`Error.prepareStackTrace`，將該值賦值成我們需要的函數~~
	 *
	 * ~~未防止本來Error.prepareStackTrace便存在賦值的行為，我們將原始值存儲，並在需要的函數中調用~~
	 *
	 * 初始化存儲報錯信息的列表
	 */
	onLoad() {
		/*
		this.#errorList = [];
		this.#originErrorPrepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (error, stackTraces) => {
			// 其實這步或許不需要
			// 但真賦值了Error.prepareStackTrace的話，保不齊會出現需要返回值的情況
			const result = this.#originErrorPrepareStackTrace
				? this.#originErrorPrepareStackTrace(error, stackTraces)
				: void 0;
			this.#errorList.push([error, stackTraces]);
			return result;
		};
		*/
		this.#errorList = [];
	}

	/**
	 * ~~將原來可能的`Error.prepareStackTrace`賦值回去~~
	 *
	 * @deprecated
	 */
	onUnload() {
		/*
		Error.prepareStackTrace = this.#originErrorPrepareStackTrace;
		*/
	}

	/**
	 * 在獲取報錯的時候，我們通過發生報錯的`Promise`來進行捕獲錯誤的操作
	 *
	 * 如果捕獲出來的錯誤存放我們存報錯棧堆的列表中，則證明該錯誤能獲取到棧堆，由此來獲取報錯的地址和行列號
	 *
	 * @param {PromiseRejectionEvent} event
	 */
	onHandle(event) {
		event.promise.catch((error) => {
			// 如果`error`是個錯誤，則繼續處理
			if (error instanceof Error) {
				if (/Failed to fetch/.test(error.message) || /Failed to load because no supported source was found/.test(error.message)) return;
				// 如果已經處理過該錯誤，則不再處理
				if (this.#errorList.includes(error)) return;
				this.#errorList.push(error);
				// 如果`error`擁有字符串形式的報錯棧堆，且報錯棧堆確實符合v8的stack
				if (typeof error.stack === "string" && this.#STACK_REGEXP.test(error.stack)) {
					// 獲取符合棧堆信息的字符串，一般來說就是從第二行開始的所有行
					// 為了處理eval的情況，故必須獲取完行數
					let lines = error.stack.split("\n").filter((line) => this.#STACK_REGEXP.test(line));

					// 提供類型信息防止vscode報錯
					/**
					 * @type {string | undefined}
					 */
					let fileName = void 0;

					/**
					 * @type {number | undefined}
					 */
					let line = void 0;

					/**
					 * @type {number | undefined}
					 */
					let column = void 0;

					// 從第一條開始遍歷，一直遍歷到不存在eval的位置
					for (let currentLine = 0; currentLine < lines.length; ++currentLine) {
						if (/\(eval /.test(lines[currentLine])) continue;

						let formatedLine = lines[currentLine]
							.replace(/^\s+/, "")
							.replace(/\(eval code/g, "(")
							.replace(/^.*?\s+/, "");

						const location = formatedLine.match(/ (\(.+\)$)/);
						if (location) formatedLine = formatedLine.replace(location[0], "");

						const locationParts = extractLocation(location ? location[1] : formatedLine);

						fileName = ["eval", "<anonymous>"].includes(locationParts[0])
							? void 0
							: locationParts[0];
						line = Number(locationParts[1]);
						column = Number(locationParts[2]);
						break;
					}

					// @ts-ignore
					window.onerror(error.message, fileName, line, column, error);
				}
				// 反之我們只能不考慮報錯文件信息，直接調用onerror
				else {
					try {
						// @ts-ignore
						let [_, src = void 0, line = void 0, column = void 0] =
							/at\s+.*\s+\((.*):(\d*):(\d*)\)/i.exec(error.stack.split("\n")[1]);
						if (typeof line == "string") line = Number(line);
						if (typeof column == "string") column = Number(column);
						// @ts-ignore
						window.onerror(error.message, src, line, column, error);
					} catch (e) {
						window.onerror(error.message, "", 0, 0, error);
					}
				}
			}
			/*
			console.error(error)
			const result = this.#errorList.find(savedError => savedError[0] === error);
			if (result) {
				// @ts-ignore
				window.onerror(
					result[0].message,
					result[1][0].getScriptNameOrSourceURL(),
					result[1][0].getLineNumber() || void 0,
					result[1][0].getColumnNumber() || void 0,
					result[0]
				);
			}
			*/
		});
	}

	/**
	 * ~~正式報錯時便不再需要報錯信息了，故直接清空列表，釋放內存~~
	 *
	 * @deprecated
	 */
	onErrorPrepare() {
		/*
		this.#errorList.length = 0;
		*/
	}
}

/**
 * 簡易的解析報錯棧堆位置信息的函數
 *
 * @param {string} urlLike
 * @returns {string[]}
 */
export function extractLocation(urlLike) {
	// 不存在地址信息的字符串
	if (!/:/.test(urlLike)) {
		return [urlLike];
	}

	// 捕獲位置用到的正則
	const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
	const parts = regExp.exec(urlLike.replace(/[()]/g, ""));

	// @ts-ignore
	return [parts[1], parts[2] || void 0, parts[3] || void 0];
}

/**
 * @typedef {import('../interface/promise-error-handler').PromiseErrorHandler} PromiseErrorHandler
 */
