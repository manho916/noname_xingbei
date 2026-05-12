import { userAgentLowerCase, compatibleEnvironment, androidNewStandardApp, device } from "../util/index.js";
import { get } from "../get/compatible.js";

export class GameCompatible {
	/**
	 * `game/game.js`中退出客戶端用到的代碼
	 *
	 * @author Spmario233
	 */
	exit() {
		const ios = userAgentLowerCase.includes("iphone") || userAgentLowerCase.includes("ipad") || userAgentLowerCase.includes("macintosh");
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
		 * @param {typeof import("../library/update.js")} param1
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
					let tips = ["您使用的無名殺客戶端已達到最新，但目前的瀏覽器內核版本過低，未來可能將無法使用！", "目前使用的瀏覽器UA信息為: ", userAgentLowerCase, "新版本的客戶端在機器存在Chrome的情況下會直接使用Chrome的內核", "請前往下載最新版的Chrome，以獲取最佳的體驗！", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");

					let packageName = window.NonameAndroidBridge.getPackageName();
					if (!(packageName.includes("shijian") || packageName.includes("yuri"))) {
						tips = ["您使用的無名殺客戶端已達到最新，但目前的瀏覽器內核版本過低，未來可能將無法使用！", "目前使用的瀏覽器UA信息為: ", userAgentLowerCase, "檢測到你現在使用的是第三方客戶端，請聯繫客戶端製作者尋求幫助！", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");
					}

					alert(tips);
				}
				// 使用舊版安卓客戶端，提示更新，在版本號為77時識別為兼容版
				// 此時將先考慮能不能加載更新代碼
				else if (device == "android") {
					let tips = ["你使用的無名殺客戶端版本號未達到最新無名殺需要的要求，未來可能將無法正常運行無名殺！", "目前使用的瀏覽器UA信息為: ", userAgentLowerCase, "如果你使用的是第三方客戶端，請聯繫客戶端製作者更新或尋求解決方法！", "點擊“確認”將開始下載最新版客戶端（如果你使用的是第三方客戶端，請不要點擊“確認”）", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");
					let fallbacks = ["你使用的無名殺客戶端版本號未達到最新無名殺需要的要求，已無法正常運行無名殺！", "目前使用的瀏覽器UA信息為: ", userAgentLowerCase, "如果你使用的是第三方客戶端，請聯繫客戶端製作者更新或尋求解決方法！", "點擊“確認”以前往GitHub下載最新版無名殺客戶端（可能需要科學上網）"].join("\n");

					/**
					 * @param {typeof import("../library/update.js")} module
					 * @returns {Promise<void>}
					 */
					function callback(module) {
						// 此時已經加載了update.js，可以嘗試更新
						if (confirm(tips)) {
							let url = "https://ghproxy.cc/https://github.com/libnoname/noname/releases/download/chromium85-client/Noname-yuri-v1.9.3.apk";

							if (coreVersion == 77) {
								let compatibleTips = ["檢測到你現在的版本號為上版本兼容版的版本號，由於當前版本無法確認是否為兼容版，特此在此再次詢問", "請問你是否需要下載最新的兼容版？", "（目前由理版可直接使用已安裝的Chrome內核，但如果無法安裝最新的Chrome，依然需要兼容版）"].join("\n");
								if (confirm(compatibleTips)) {
									url = "https://ghproxy.cc/https://github.com/libnoname/noname/releases/download/chromium85-client/Noname-yuri-compatible-v1.8.4.apk";
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
					let tips = ["你使用的無名殺客戶端版本號未達到最新無名殺需要的要求，未來可能將無法正常運行無名殺！", "目前使用的瀏覽器UA信息為: ", userAgentLowerCase, "如果你使用的是第三方客戶端，請聯繫客戶端製作者更新或尋求解決方法！", "點擊“確認”以前往GitHub下載最新版無名殺客戶端（可能需要科學上網）", "稍後遊戲將繼續正常運行，但我們不保證不會出現任何報錯"].join("\n");
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

export let game = new GameCompatible();

/**
 * @param { InstanceType<typeof GameCompatible> } [instance]
 */
export function setGameCompatible(instance) {
	game = instance || new GameCompatible();
}

/**
 * @enum {number}
 * @constant
 */
export const UpdateReason = {
	DEBUG: 1,
	FALLBACK: 2,
	UNDERSUPPORT: 4,
};
