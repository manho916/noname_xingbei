import { game, get, lib, boot, onload } from "../noname.js";
import { canUseHttpProtocol, sendUpdate } from "../noname/init/index.js";

let [core, version] = get.coreInfo();

/**
 * @type {Promise<unknown>}
 */
let waitUpdate = Promise.resolve();
if (core === "chrome" && !isNaN(version) && version < 85) {
	/*
	const tip = "檢測到您的瀏覽器內核版本小於85，請及時升級瀏覽器或手機webview內核！";
	console.warn(tip);
	game.print(tip);
	const redirect_tip = `您使用的瀏覽器或無名殺客戶端內核版本過低，將在未來的版本被廢棄！\n目前使用的瀏覽器UA信息為：\n${userAgent}\n點擊“確認”以前往GitHub下載最新版無名殺客戶端（可能需要科學上網）。`;
	if (confirm(redirect_tip)) {
		window.open("https://github.com/libnoname/noname/releases/tag/chromium77-client");
	}
	*/
	waitUpdate = game.tryUpdateClient(/** UpdateReason.UNDERSUPPORT **/ 4);
}

waitUpdate
	.then(boot)
	.then(() => {
		// 判斷是否從file協議切換到http/s協議
		if (canUseHttpProtocol()) {
			// 保存協議的切換狀態
			const saveProtocol = () => {
				const url = sendUpdate();
				if (typeof url == "string") {
					if (typeof window.require == "function" && typeof window.process == "object") {
						// @ts-ignore
						const remote = require("@electron/remote");
						const thisWindow = remote.getCurrentWindow();
						thisWindow.loadURL(url);
					} else {
						location.href = url;
					}
				}
			};
			/*
		升級方法:
			1. 遊戲啟動後導出數據，然後以http/s協議重啟
			2. 以http/s協議導入數據
			3. 保存http/s協議的狀態，以後不再以file協議啟動
		*/
			// 導出數據到根目錄的noname.config.txt
			if (navigator.notification) {
				navigator.notification.activityStart("正在進行升級", "請稍候");
			}
			let data;
			let export_data = function (data) {
				if (navigator.notification) {
					navigator.notification.activityStop();
				}
				game.promises
					.writeFile(lib.init.encode(JSON.stringify(data)), "./", "noname.config.txt")
					.then(saveProtocol)
					.catch(e => {
						console.error("升級失敗:", e);
					});
			};
			// @ts-ignore
			if (!lib.db) {
				data = {};
				for (let i in localStorage) {
					if (i.startsWith(lib.configprefix)) {
						data[i] = localStorage[i];
					}
				}
				export_data(data);
			} else {
				game.getDB("config", null, function (data1) {
					game.getDB("data", null, function (data2) {
						export_data({
							config: data1,
							data: data2,
						});
					});
				});
			}
		} else {
			const readConfig = async () => {
				return game.promises
					.readFileAsText("noname.config.txt")
					.then(data => {
						if (navigator.notification) {
							navigator.notification.activityStart("正在導入數據", "請稍候");
						}
						return /** @type {Promise<void>} */ (
							// eslint-disable-next-line no-async-promise-executor
							new Promise(async (resolve, reject) => {
								if (!data) return reject(new Error("沒有數據內容"));
								try {
									data = JSON.parse(lib.init.decode(data));
									if (!data || typeof data != "object") {
										throw "err";
									}
									// @ts-ignore
									if (lib.db && (!data.config || !data.data)) {
										throw "err";
									}
								} catch (e) {
									console.log(e);
									if (e == "err") {
										reject(new Error("導入文件格式不正確"));
									} else {
										reject(new Error("導入失敗： " + e.message));
									}
									return;
								}
								// @ts-ignore
								if (!lib.db) {
									const noname_inited = localStorage.getItem("noname_inited");
									const onlineKey = localStorage.getItem(lib.configprefix + "key");
									localStorage.clear();
									if (noname_inited) {
										localStorage.setItem("noname_inited", noname_inited);
									}
									if (onlineKey) {
										localStorage.setItem(lib.configprefix + "key", onlineKey);
									}
									for (let i in data) {
										localStorage.setItem(i, data[i]);
									}
								} else {
									for (let i in data.config) {
										await game.putDB("config", i, data.config[i]);
										lib.config[i] = data.config[i];
									}
									for (let i in data.data) {
										await game.putDB("data", i, data.data[i]);
									}
								}
								lib.init.background();
								resolve();
							})
						);
					})
					.then(() => {
						return game.promises.removeFile("noname.config.txt").catch(() => void 0);
					})
					.then(() => {
						alert("數據導入成功, 即將自動重啟");
						const url = new URL(location.href);
						if (url.searchParams.get("sendUpdate")) {
							url.searchParams.delete("sendUpdate");
							location.href = url.toString();
						} else {
							location.reload();
						}
					})
					.catch(e => {
						console.log(e);
						if (window.FileError) {
							if (!(e instanceof window.FileError)) {
								alert(typeof e?.message == "string" ? e.message : JSON.stringify(e));
							} else {
								console.error(`noname.config.txt讀取失敗: ${Object.keys(window.FileError).find(msg => window.FileError[msg] === e.code)}`);
							}
						}
					})
					.finally(() => {
						if (navigator.notification) {
							navigator.notification.activityStop();
						}
					});
			};
			let searchParams = new URLSearchParams(location.search);
			for (let [key, value] of searchParams) {
				// 成功導入後刪除noname.config.txt
				if (key === "sendUpdate" && value === "true") {
					return readConfig();
				}
				// 新客戶端導入擴展
				else if (key === "importExtensionName") {
					lib.config.extensions.add(value);

					let waitings = [];

					waitings.push(game.promises.saveConfig("extensions", lib.config.extensions));
					waitings.push(game.promises.saveConfig(`extension_${value}_enable`, true));
					alert(`擴展${value}已導入成功，點擊確定重啟遊戲`);

					return Promise.allSettled(waitings).then(() => {
						const url = new URL(location.href);
						url.searchParams.delete("importExtensionName");
						location.href = url.toString();
					});
				}
			}
			readConfig();
		}
	})
	.then(onload);
