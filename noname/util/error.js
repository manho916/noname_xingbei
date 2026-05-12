class CodeSnippet {
	/** @type {Array<CodeSnippet>} */
	static #snippetStack = [];

	/** @type {string} */
	#code;
	/** @type {number} */
	#erroff;

	/**
	 * ```plain
	 * 構造一個代碼片段對象
	 * 
	 * 通過 `erroff` 指定在發生錯誤時，錯誤信息指出的行與實際代碼行的偏移量
	 * ```
	 * @param {string} code 
	 * @param {number} erroff 
	 */
	constructor(code, erroff = 0) {
		this.#code = String(code);
		this.#erroff = parseInt(String(erroff)) || 0;
	}

	/** @type {string} */
	get code() {
		return this.#code;
	}

	/** @type {Array<string>} */
	get lines() {
		return this.code.split(/\r?\n/);
	}

	/**
	 * ```plain
	 * 給定錯誤行號來獲取錯誤代碼片段
	 * ```
	 * 
	 * @param {number} lineno 
	 * @returns {string} 
	 */
	viewCode(lineno) {
		const range = 5;

		if (!Number.isInteger(lineno))
			throw new TypeError("錯誤行號必須是一個整數");

		const index = lineno - this.#erroff;
		const lines = this.lines;
		const width = String(index + range).length;

		let codeView = "";

		for (let i = index - range; i < index + range + 1; i++) {
			if (i < 0 || i >= lines.length)
				continue;

			codeView += String(i + 1).padStart(width, "0");
			codeView += `|${i == index ? "⚠️" : "    "}${lines[i]}\n`;
		}

		return codeView;
	}

	/**
	 * ```plain
	 * 獲取當前代碼片段
	 * ```
	 * 
	 * @type {CodeSnippet?}
	 */
	static get currentSnippet() {
		if (!this.#snippetStack.length)
			return null;

		return this.#snippetStack[this.#snippetStack.length - 1];
	}

	/**
	 * ```plain
	 * 壓入一個代碼片段作為當前代碼片段
	 * ```
	 * 
	 * @param {CodeSnippet} snippet 
	 */
	static pushSnippet(snippet) {
		if (!(snippet instanceof CodeSnippet))
			throw new TypeError("參數必須是一個代碼片段對象");

		this.#snippetStack.push(snippet);
	}

	/**
	 * ```plain
	 * 彈出當前代碼片段
	 * ```
	 * 
	 * @returns {CodeSnippet} 
	 */
	static popSnippet() {
		if (!this.#snippetStack.length)
			throw new Error("代碼片段棧為空");

		// @ts-ignore // eslint好不智能哦
		return this.#snippetStack.pop();
	}
}

class ErrorReporter {
	static #topAlert = window.alert.bind(null);
	static #errorLineNoPatterns = [
		/<anonymous>:(\d+):\d+\)/,
		/at <anonymous>:(\d+):\d+/,
		/eval:(\d+):\d+/,
		/Function:(\d+):\d+/,
		/:(\d+):\d+/,
	];

	/** @type {CodeSnippet?} */
	#snippet;
	/** @type {string} */
	#message;
	/** @type {string} */
	#stack;

	/**
	 * ```plain
	 * 構造一個錯誤報告對象
	 * 以此來保存錯誤相關信息
	 * ```
	 * 
	 * @param {Error} error 
	 * @param {CodeSnippet?} snippet 
	 */
	constructor(error, snippet = CodeSnippet.currentSnippet) {
		if (!("stack" in error))
			throw new TypeError("傳入的對象不是一個錯誤對象");

		this.#snippet = snippet;
		this.#message = String(error);
		this.#stack = String(error.stack);
	}

	get message() {
		return this.#message;
	}

	get stack() {
		return this.#stack;
	}

	static #findLineNo = function (line) {
		for (const pattern of ErrorReporter.#errorLineNoPatterns) {
			const match = pattern.exec(line);

			if (match)
				return parseInt(match[1]);
		}

		return NaN;
	}

	viewCode() {
		if (!this.#snippet)
			return null;

		const stack = this.#stack;
		const line = stack.split("\n")[1];
		const lineno = ErrorReporter.#findLineNo(line);

		if (!isNaN(lineno))
			return this.#snippet.viewCode(lineno);

		return null;
	}

	/**
	 * ```plain
	 * 向用戶報告錯誤信息
	 * ```
	 * 
	 * @param {string} title 
	 * @returns {string} 
	 */
	report(title) {
		const codeView = this.viewCode() || "#沒有代碼預覽#";
		let errorInfo = `${title}:\n\t${this.#message}\n`;
		errorInfo += `-------------\n${codeView.trim()}\n`;
		errorInfo += `-------------\n調用堆棧:\n${this.#stack}`;
		ErrorReporter.#topAlert(errorInfo);
		return errorInfo;
	}

	/**
	 * ```plain
	 * 向用戶報告錯誤信息
	 * ```
	 * 
	 * @param {Error} error 
	 * @param {string} title 
	 */
	static reportError(error, title = "發生錯誤") {
		new ErrorReporter(error).report(title);
	}
}

class ErrorManager {
	/** @type {WeakMap<Function, CodeSnippet>} */
	static #codeSnippets = new WeakMap();
	/** @type {WeakMap<Object, ErrorReporter>} */
	static #errorReporters = new WeakMap();

	/**
	 * ```plain
	 * 獲取函數對應的代碼片段
	 * ```
	 * 
	 * @param {Function} func 
	 * @returns {CodeSnippet?}
	 */
	static getCodeSnippet(func) {
		if (typeof func !== 'function')
			throw new TypeError("參數func必須是一個function");

		return this.#codeSnippets.get(func) || null;
	}

	/**
	 * ```plain
	 * 設置函數對應的代碼片段
	 * ```
	 * 
	 * @param {Function} func 
	 * @param {CodeSnippet} snippet 
	 */
	static setCodeSnippet(func, snippet) {
		if (typeof func !== 'function')
			throw new TypeError("參數func必須是一個function");
		if (!(snippet instanceof CodeSnippet))
			throw new TypeError("參數snippet必須是一個CodeSnippet");

		return this.#codeSnippets.set(func, snippet);
	}

	/**
	 * ```plain
	 * 獲取錯誤堆棧中與行列無關的錯誤信息
	 * ```
	 * 
	 * @param {Error} error 
	 * @returns {string[]?}
	 */
	static #getFramesHead = function (error) {
		return error.stack
			? error.stack.slice(String(error).length + 1)
				.split("\n")
				.map(line => {
					line = line.trim();
					const match = /^\s*(.+?):\d+:\d+/.exec(line);
					return match ? match[1] : line;
				})
			: null;
	}

	/**
	 * ```plain
	 * 計算錯誤A比錯誤B多的堆棧層數
	 * ```
	 * 
	 * @param {Error} errorA 
	 * @param {Error} errorB 
	 * @returns {number?}
	 */
	static #compareStackLevel = function (errorA, errorB) {
		const stackA = ErrorManager.#getFramesHead(errorA);
		const stackB = ErrorManager.#getFramesHead(errorB);

		if (!stackA || !stackB
			|| stackA.length < stackB.length)
			return null;

		const lastFrameA = stackA[stackA.length - 1];
		const indexInB = stackB.lastIndexOf(lastFrameA);

		if (indexInB === -1)
			return stackA.length - stackB.length;

		return stackA.length - indexInB - 1;
	}

	/**
	 * ```plain
	 * 封裝被設定了代碼片段函數的錯誤捕獲調用
	 * 
	 * 當 `body` 函數在它這一層調用棧中出現錯誤時
	 * 此函數將自動記錄此次錯誤信息並整理相關代碼片段
	 * ```
	 * @example
	 * ```javascript
	 * ErrorManager.errorHandle(() => {
	 *     event.content(...);
	 * }, event.content);
	 * ```
	 * 
	 * @param {Function} action 調用函數的閉包
	 * @param {Function} body 實際被調用的函數，同時也是持有代碼片段的函數
	 * @param {number} extraLevel action調用到body的間隔調用棧層數
	 */
	static errorHandle(action, body, extraLevel = 0) {
		const snippet = ErrorManager.getCodeSnippet(body);

		try {
			action();
		} catch (e) {
			if (!(e instanceof Error))
				throw e;

			if (snippet) {
				const diff = ErrorManager.#compareStackLevel(e, new Error());

				if (diff && diff == 2 + extraLevel)
					ErrorManager.setErrorReporter(e, snippet);
			}

			throw e;
		}
	}

	/**
	 * ```plain
	 * 設置錯誤報告器
	 * 
	 * 在報告錯誤時可以從此處獲取錯誤報告器來直接報告錯誤
	 * ```
	 * 
	 * @param {Object} obj 
	 * @param {ErrorReporter|CodeSnippet|null} reporter 
	 * 
	 * @overload
	 * @param {Object} obj 
	 * 
	 * @overload
	 * @param {Object} obj 
	 * @param {ErrorReporter?} reporter 
	 * 
	 * @overload
	 * @param {Object} obj 
	 * @param {CodeSnippet?} codeSnippet 
	 */
	static setErrorReporter(obj, reporter = null) {
		if (obj !== Object(obj))
			throw new TypeError("參數必須是一個對象");

		if (!(reporter instanceof ErrorReporter)) {
			if (reporter instanceof CodeSnippet)
				reporter = new ErrorReporter(obj, reporter);
			else
				reporter = new ErrorReporter(obj);
		}

		ErrorManager.#errorReporters.set(obj, reporter);
	}

	/**
	 * ```plain
	 * 獲取設置的錯誤報告器
	 * ```
	 * 
	 * @param {Object} obj 
	 * @returns {ErrorReporter?}
	 */
	static getErrorReporter(obj) {
		return ErrorManager.#errorReporters.get(obj) || null;
	}
}

export {
	CodeSnippet,
	ErrorReporter,
	ErrorManager,
};