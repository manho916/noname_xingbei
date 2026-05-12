"use strict";

(async function () {
	// 預設定常量
	/**
	 * 最低要求的Safari版本
	 *
	 * @type {[majorVersion: number, minorVersion: number, patchVersion: number]}
	 */
	const minSafariVersion = [15, 0, 0];

	// 獲取基礎變量
	/**
	 * @type {import("../noname-compatible.js")}
	 */
	const {
		game,
		get,
		util: { nonameInitialized, assetURL, userAgentLowerCase, compatibleEnvironment },
		UpdateReason,
	} = await import("../noname-compatible.js").catch(importFallback);

	// 使用到的文本
	const globalText = {
		GPL_ALERT: ["歡迎來到《星杯傳說》網頁對戰平臺！\n","·項目開發·農傑(代碼)&上杉隱月(運營維護)\n","·發佈地址·https://github.com/RancherJie/noname_xingbei。\n","·開源聲明·本項目基於支持GPLv3協議的《無名殺》底層開發https://www.gnu.org/licenses/gpl-3.0.html。\n\n","【初次啟動請等待資源加載】","*若長時間無內容請刷新網頁*\n\n","點擊“確定”即代表您知曉並接受上述信息。\n"].join("\n"),
		LOAD_ENTRY_FAILED: ["您使用的瀏覽器或《星杯傳說》客戶端加載內容失敗！", "請檢查是否缺少遊戲文件！隔版本更新請下載完整包而不是離線包！", "目前使用的瀏覽器UA信息為: ", userAgentLowerCase, "若您使用的客戶端為自帶內核的舊版“兼容版”，請及時更新客戶端版本！"].join("\n"),
		REDIRECT_TIP: ["您使用的瀏覽器或星杯傳說客戶端的版本或內核版本過低，已經無法正常運行星杯傳說！", "目前使用的瀏覽器UA信息為: ", userAgentLowerCase, "如果你使用的是瀏覽器，請更新你的瀏覽器內核！"].join("\n"),
		SAFARI_VERSION_NOT_SUPPORT: ["您使用的Safari瀏覽器無法支持當前星杯傳說所需的功能，請至少升級至15.0.0！", "當前瀏覽器的UA為: ", userAgentLowerCase, "稍後您的星杯傳說將自動退出（可能的話）"].join("\n"),
	};

	// 不支持file協議
	if (location.protocol.startsWith("file")) {
		return alert(globalText.REDIRECT_TIP);
	}

	// 檢查 window 對象中是否存在 "__core-js_shared__" 屬性
	if (!("__core-js_shared__" in window)) {
		// 如果不存在，則執行以下操作
		await new Promise(resolve => {
			// 創建一個新的 <script> 元素
			const coreJSBundle = document.createElement("script");
			// 為 script 元素設置 onerror 和 onload 事件處理程序
			// 當出錯或加載完成時，調用 resolve 函數以解決 Promise
			coreJSBundle.onerror = coreJSBundle.onload = resolve;
			// 設置 script 元素的 src 屬性，指向 core-js-bundle.js 文件
			coreJSBundle.src = `${assetURL}game/core-js-bundle.js`;
			// 將 script 元素添加到 document.head 中
			document.head.appendChild(coreJSBundle);
		});
	}

	// 檢查是否已經顯示過GPL許可協議警告
	if (!localStorage.getItem("gplv3_noname_alerted")) {
		// 判斷遊戲是否已經初始化過
		const gameIntialized = nonameInitialized && nonameInitialized.length > 0;

		// 如果滿足以下條件之一，則顯示GPL許可協議警告:
		// 1. 已經初始化過
		// 2. 用戶確認顯示GPL許可協議警告
		if (gameIntialized || confirm(globalText.GPL_ALERT)) {
			// 記錄已顯示過GPL許可協議警告
			localStorage.setItem("gplv3_noname_alerted", String(true));
		} else {
			// 如果用戶拒絕顯示GPL許可協議警告，則退出程序
			game.exit();
		}
	}

	window["bannedExtensions"] = [
		"\u4fa0\u4e49",
		"\u5168\u6559\u7a0b",
		"在線更新", //遊戲內在線更新方式修改了，不再依賴於在線更新擴展了
	];

	// 檢查是否是Safari瀏覽器
	// 通過檢查用戶代理字符串是否包含 "safari" 且不包含 "chrome"，可以初步判斷是不是Safari
	if (userAgentLowerCase.includes("safari") && !userAgentLowerCase.includes("chrome")) {
		// 如果是 Safari 瀏覽器,則進行以下操作
		// 獲取 Safari 版本信息
		let [coreName, ...safariVersion] = get.coreInfo();
		// 檢查 Safari 的內核名稱是否為 "safari"，以及版本號是否低於要求的最小版本號
		// 如果無法判定是Safari，則證明這個瀏覽器內核很玄乎，我們表示對未知的、不符合標準的內核無能為力，只能等出問題了再適配
		if (coreName === "safari" && !get.checkVersion(minSafariVersion, safariVersion)) {
			// 如果版本號低於要求的最小版本號,則執行以下操作
			// 顯示警告消息
			alert(globalText.SAFARI_VERSION_NOT_SUPPORT);
			// 退出程序
			game.exit();
			return;
		}
	}
	// Safari由於系統原因，管不了，先默哀幾秒

	// 處理Node環境下的http情況
	if (typeof window.require == "function" && typeof window.process == "object" && typeof window.__dirname == "string") {
		// 在http環境下修改__dirname和require的邏輯
		if (window.__dirname.endsWith("electron.asar\\renderer") || window.__dirname.endsWith("electron.asar/renderer")) {
			const path = require("path");
			window.__dirname = path.join(path.resolve(), "resources/app");
			const oldData = Object.entries(window.require);
			// @ts-ignore
			window.require = function (moduleId) {
				try {
					return module.require(moduleId);
				} catch {
					return module.require(path.join(window.__dirname, moduleId));
				}
			};
			oldData.forEach(([key, value]) => {
				window.require[key] = value;
			});
		}
		// 增加導入ts的邏輯
		window.require.extensions[".ts"] = function (module, filename) {
			// @ts-ignore
			const _compile = module._compile;
			// @ts-ignore
			module._compile = function (code, fileName) {
				/**
				 *
				 * @type { import("typescript") }
				 */
				// @ts-ignore
				const ts = require("./game/typescript.js");
				// 使用ts compiler對ts文件進行編譯
				const result = ts.transpile(
					code,
					{
						module: ts.ModuleKind.CommonJS,
						target: ts.ScriptTarget.ES2020,
						inlineSourceMap: true,
						resolveJsonModule: true,
						esModuleInterop: true,
					},
					fileName
				);
				// 使用默認的js編譯函數獲取返回值
				return _compile.call(this, result, fileName);
			};
			// @ts-ignore
			module._compile(require("fs").readFileSync(filename, "utf8"), filename);
		};
	}

	// 創建一個新的 <script> 元素
	const script = document.createElement("script");
	// 設置該 <script> 元素為模塊腳本
	script.type = "module";
	// 設置 <script> 元素的 src 屬性,指向 entry.js 文件
	script.src = `${assetURL}game/entry.js`;
	// 設置該腳本為異步加載
	script.async = true;
	// 為 <script> 元素設置 onerror 事件處理程序
	script.onerror = event => {
		// 在控制台輸出錯誤信息
		console.error(event);
		// 獲取加載失敗的提示信息
		const message = globalText.LOAD_ENTRY_FAILED;
		// 在控制台輸出提示信息
		console.error(message);
		// 顯示提示信息
		alert(message);
	};
	// 將 <script> 元素添加到 document.head 中
	document.head.appendChild(script);

	// 創建一個新的 <script> 元素,用於回退
	let fallback = document.createElement("script");
	// 設置該 <script> 元素為舊式腳本
	fallback.noModule = true;
	// 設置 <script> 元素的 src 屬性,指向 fallback.js 文件
	fallback.src = `${assetURL}game/fallback.js`;
	// 為 <script> 元素設置 onload 事件處理程序
	fallback.onload = () => game.tryUpdateClient(UpdateReason.FALLBACK);
	// 將 <script> 元素添加到 document.head 中
	document.head.appendChild(fallback);

	/**
	 *
	 * @return {import("../noname-compatible.js")}
	 */
	function importFallback() {
		class GameCompatible {
			/**
			 * `game/game.js`中退出客戶端用到的代碼
			 *
			 * @author Spmario233
			 */
			exit() {
				const ios = userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("macintosh");
				//electron
				if (typeof window.process == "object" && typeof window.require == "function") {
					const versions = window.process.versions;
					// @ts-ignore
					const electronVersion = parseFloat(versions.electron);
					let remote;
					if (electronVersion >= 14) {
						// @ts-ignore
						remote = require("@electron/remote");
					} else {
						// @ts-ignore
						remote = require("electron").remote;
					}
					const thisWindow = remote.getCurrentWindow();
					thisWindow.destroy();
					window.process.exit();
				}
				//android-cordova環境
				//ios-cordova環境或ios瀏覽器環境
				//非ios的網頁版
				else if (!ios) {
					window.close();
				}
			}

			/**
			 * @async
			 * @param {UpdateReason} type
			 * @param {string} [text]
			 * @returns {Promise<unknown>}
			 */
			tryUpdateClient(type, text = "") {
				if (!compatibleEnvironment && type != UpdateReason.DEBUG) return Promise.resolve();

				/**
				 * @param {*} url
				 * @param {typeof import("../noname/library/update.js")} param1
				 * @returns {Promise<File>}
				 */
				function update(url, { request, createProgress }) {
					let fileName = undefined;
					let progress = createProgress("正在下載最新客戶端");

					// @ts-ignore
					return (
						request(url, (receivedBytes, total, filename) => {
							if (typeof filename == "string") {
								progress.setFileName(filename);
								fileName = filename;
							}
							let received = 0,
								max = 0;
							if (total) {
								max = +(total / (1024 * 1024)).toFixed(1);
							} else {
								max = 1000;
							}
							received = +(receivedBytes / (1024 * 1024)).toFixed(1);
							if (received > max) max = received;
							progress.setProgressMax(max);
							progress.setProgressValue(received);
						})
							.then(result => (progress.remove(), result))
							// @ts-ignore
							.then(blob => ((blob.name = fileName), blob))
					);
				}

				/**
				 *
				 * @param {File} blob
				 */
				function open(blob) {
					let link = URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = link;
					a.download = blob.name;
					a.addEventListener("click", () => {
						setTimeout(() => URL.revokeObjectURL(link), 100);
					});
					a.click();
				}

				/**
				 * @param {string} text
				 */
				function fallback(text) {
					// 顯示一個確認對話框，詢問是否要重定向到 GitHub 頁面
					if (confirm(text)) {
						// 如果確認,則打開新的瀏覽器窗口,跳轉到指定的 GitHub 頁面
						window.open("https://github.com/libnoname/noname/releases/tag/chromium85-client");
					}
				}

				switch (type) {
					case UpdateReason.DEBUG: {
						// 測試環境
						let url = "https://ghproxy.cc/https://github.com/libnoname/noname/releases/download/chromium85-client/Noname-linux-x64.zip";
						return import("../library/update.js").then(module => update(url, module)).then(open);
					}
					case UpdateReason.FALLBACK: {
						// 不支持module的平臺
						// 雖然以無名殺直接用了`import`來看，已經不存在這類情況
						// 但還是引導一下去github，防止存在玄學情況
						// 畢竟這種情況下，瀏覽器自行更新，而客戶端也提供不了`noname/library/update.js`的環境

						fallback(text);

						return Promise.resolve();
					}
					case UpdateReason.UNDERSUPPORT: {
						// 可以加載`entry.js`，但版本號低，因為非chrome瀏覽器不會嘗試更新客戶端，故只需要考慮chrome的情況
						// 此時需要檢測是瀏覽器還是客戶端，客戶端的話是chrome版本問題還是webview問題等等
						// 總之如果是webview版本過低的話，此時`noname/library/update.js`的內容可能可以加載出來
						// 故先判斷，再嘗試下載
						let [_coreName, coreVersion] = get.coreInfo();
						let needToWait = Promise.resolve();

						// 使用新版本的客戶端，但版本號不到需要的程度，查看是否是由理版或詩箋版，提示更新chrome
						if (androidNewStandardApp) {
							let tips = ["您使用的無名殺客戶端已達到最新，但目前的瀏覽器內核版本過低，未來可能將無法使用！", "目前使用的瀏覽器UA信息為: ", userAgent, "新版本的客戶端在機器存在Chrome的情況下會直接使用Chrome的內核", "請前往下載最新版的Chrome，以獲取最佳的體驗！", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");

							let packageName = window.NonameAndroidBridge.getPackageName();
							if (!(packageName.includes("shijian") || packageName.includes("yuri"))) {
								tips = ["您使用的無名殺客戶端已達到最新，但目前的瀏覽器內核版本過低，未來可能將無法使用！", "目前使用的瀏覽器UA信息為: ", userAgent, "檢測到你現在使用的是第三方客戶端，請聯繫客戶端製作者尋求幫助！", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");
							}

							alert(tips);
						}
						// 使用舊版安卓客戶端，提示更新，在版本號為77時識別為兼容版
						// 此時將先考慮能不能加載更新代碼
						else if (device == "android") {
							let tips = ["你使用的無名殺客戶端版本號未達到最新無名殺需要的要求，未來可能將無法正常運行無名殺！", "目前使用的瀏覽器UA信息為: ", userAgent, "如果你使用的是第三方客戶端，請聯繫客戶端製作者更新或尋求解決方法！", "點擊“確認”將開始下載最新版客戶端（如果你使用的是第三方客戶端，請不要點擊“確認”）", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");
							let fallbacks = ["你使用的無名殺客戶端版本號未達到最新無名殺需要的要求，已無法正常運行無名殺！", "目前使用的瀏覽器UA信息為: ", userAgent, "如果你使用的是第三方客戶端，請聯繫客戶端製作者更新或尋求解決方法！", "點擊“確認”以前往GitHub下載最新版無名殺客戶端（可能需要科學上網）"].join("\n");

							/**
							 * @param {typeof import("../library/update.js")} module
							 * @returns {Promise<void>}
							 */
							function callback(module) {
								// 此時已經加載了update.js，可以嘗試更新
								if (confirm(tips)) {
									let url = "https://ghproxy.cc/https://github.com/libnoname/noname/releases/download/chromium85-client/Noname-yuri-v1.9.2.apk";

									if (coreVersion == 77) {
										let compatibleTips = ["檢測到你現在的版本號為上版本兼容版的版本號，由於當前版本無法確認是否為兼容版，特此在此再次詢問", "請問你是否需要下載最新的兼容版？", "（目前由理版可直接使用已安裝的Chrome內核，但如果無法安裝最新的Chrome，依然需要兼容版）"].join("\n");
										if (confirm(compatibleTips)) {
											url = "https://ghproxy.cc/https://github.com/libnoname/noname/releases/download/chromium85-client/Noname-yuri-compatible-v1.8.3.apk";
										}
									}

									return update(url, module).then(open);
								}

								return Promise.resolve();
							}

							needToWait = import("../library/update.js").then(callback, () => fallback(fallbacks));
						}
						// 使用電腦端客戶端，直接轉到github
						else if (typeof window.require == "function") {
							let tips = ["你使用的無名殺客戶端版本號未達到最新無名殺需要的要求，未來可能將無法正常運行無名殺！", "目前使用的瀏覽器UA信息為: ", userAgent, "如果你使用的是第三方客戶端，請聯繫客戶端製作者更新或尋求解決方法！", "點擊“確認”以前往GitHub下載最新版無名殺客戶端（可能需要科學上網）", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");
							fallback(tips);
						}
						// 使用chrome的，直接提示更新（不是現在還有人用Chrome 85以下的版本嗎）
						else {
							let tips = ["你使用的瀏覽器內核已無法達到無名殺的最低要求，未來可能將無法使用！", "請更新你的Google Chrome/Chromium內核！", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");
							alert(tips);
						}

						return needToWait;
					}
					default: {
						return Promise.reject();
					}
				}
			}
		}

		class GetCompatible {
			// require是需求的版本號，current是瀏覽器環境本身的版本號
			/**
			 *
			 * @param {[majorVersion: number, minorVersion: number, patchVersion: number]} require
			 * @param {[majorVersion: number, minorVersion: number, patchVersion: number]} current
			 * @returns
			 */
			checkVersion(require, current) {
				// 防止不存在的意外，提前截斷當前版本號的長度
				if (current.length > require.length) current.length = require.length;

				// 考慮到玄學的NaN情況，記錄是否存在NaN
				let flag = false;
				// 從主版本號遍歷到修訂版本號，只考慮當前版本號的長度
				for (let i = 0; i < current.length; ++i) {
					// 當前環境版本號當前位若是NaN，則記錄後直接到下一位
					if (isNaN(current[i])) {
						flag = true;
						continue;
					}
					// 如果此時flag為true且current[i]不為NaN，版本號則不合法，直接否
					if (flag) return false;
					// 上位版本號未達到要求，直接否決
					if (require[i] > current[i]) return false;
					// 上位版本號已超過要求，直接可行
					if (current[i] > require[i]) return true;
				}
				return true;
			}

			/**
			 * 獲取當前內核版本信息
			 *
			 * 目前僅考慮`chrome`, `firefox`和`safari`三種瀏覽器的信息，其餘均歸於其他範疇
			 *
			 * > 其他後續或許會增加，但`IE`永無可能
			 *
			 * @returns {["firefox" | "chrome" | "safari" | "other", number, number, number]}
			 */
			coreInfo() {
				// 如果存在process並且存在process.versions，則默認為node環境
				if (typeof window.process != "undefined" && typeof window.process.versions == "object") {
					// 如果存在versions.chrome，默認為electron的versions.chrome
					if (window.process.versions.chrome) {
						return parseVersion("chrome", window.process.versions.chrome);
					}
				}

				// Chrome/Chromium下的實驗性特性，具體可參見
				// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
				// @ts-ignore
				if (typeof navigator.userAgentData != "undefined") {
					// @ts-ignore
					const userAgentData = navigator.userAgentData;
					if (userAgentData.brands && userAgentData.brands.length) {
						const brand = userAgentData.brands.find(({ brand }) => {
							let str = brand.toLowerCase();
							// 當前支持的瀏覽器中只有chrome支持userAgentData，故只判斷chrome的情況
							return str.includes("chrome") || str.includes("chromium");
						});

						// 如果能通過userAgentData找到對應的瀏覽器信息，則直接返回
						// 反之則繼續通過正則表達式匹配userAgent
						if (brand) {
							return ["chrome", parseInt(brand.version), 0, 0];
						}
					}
				}

				// 目前僅考慮Firefox, Chrome和Safari三種瀏覽器
				// 其餘瀏覽器均歸於other
				const regex = /(firefox|chrome|safari)\/(\d+(?:\.\d+)+)/;
				let result = userAgentLowerCase.match(regex);
				if (result == null) {
					return ["other", NaN, NaN, NaN];
				}

				// 非Safari情況可直接返回結果
				if (result[1] !== "safari") {
					// @ts-expect-error Type must be right
					return parseVersion(result[1], result[2]);
				}

				// 以下是所有Safari平臺的判斷方法
				// macOS以及以桌面顯示的移動端則直接判斷
				if (/macintosh/.test(userAgentLowerCase)) {
					result = userAgentLowerCase.match(/version\/(\d+(?:\.\d+)+).*safari/);
					if (result == null) {
						return ["other", NaN, NaN, NaN];
					}
				}
				// 不然則通過OS後面的版本號來獲取內容
				else {
					let safariRegex = /(?:iphone|ipad); cpu (?:iphone )?os (\d+(?:_\d+)+)/;
					result = userAgentLowerCase.match(safariRegex);
					if (result == null) {
						return ["other", NaN, NaN, NaN];
					}
				}
				// result = userAgent.match(/version\/(\d+(?:\.\d+)+).*safari/)
				return parseVersion("safari", result[1]);

				/**
				 * 通用解析版本號方法
				 *
				 * @param {"firefox" | "chrome" | "safari" | "other"} coreName
				 * @param {string} versions
				 * @returns {["firefox" | "chrome" | "safari" | "other", number, number, number]}
				 */
				function parseVersion(coreName, versions) {
					const [major, minor, patch] = versions.split(".");
					const majorVersion = parseInt(major);

					// 如果major解析為NaN，則整體解析為NaN（此時不考慮minor和patch）
					if (Number.isNaN(majorVersion)) {
						return [coreName, NaN, NaN, NaN];
					}

					// 反之則將不為NaN的minor和patch解析為0
					return [coreName, majorVersion, parseInt(minor) || 0, parseInt(patch) || 0];
				}
			}
		}

		const UpdateReason = {
			DEBUG: 1,
			FALLBACK: 2,
			UNDERSUPPORT: 4,
		};

		const nonameInitialized = localStorage.getItem("noname_inited");
		const assetURL = "";
		const userAgent = navigator.userAgent
		const userAgentLowerCase = userAgent.toLowerCase();

		return {
			// @ts-expect-error TypeMust
			game: new GameCompatible(),
			get: new GetCompatible(),
			util: {
				// @ts-expect-error TypeMust
				nonameInitialized,
				assetURL,
				userAgent,
				userAgentLowerCase,
				compatibleEnvironment: true,
			},
			UpdateReason,
		};
	}
})();
