import { lib, _status, game } from "../../noname.js";

export class GamePromises {
	/**
	 * 模仿h5的prompt，用於顯示可提示用戶進行輸入的對話框
	 *
	 * 注: 由於參數列表是隨意的，在這裡我準備限制一下這個函數的參數順序
	 *
	 * @param { string } [title] 設置prompt標題與input內容
	 * @param { boolean } [forced] 為true的話將沒有"取消按鈕"
	 * @param { string } alertOption 設置prompt是否模擬alert
	 * @example
	 * ```js
	 * // 只設置標題(但是input的初始值就變成了undefined)
	 * game.promises.prompt('###prompt標題').then(value => console.log(value));
	 * // 設置標題和input初始內容
	 * game.promises.prompt('###prompt標題###input初始內容').then(value => console.log(value));
	 * ```
	 * @returns { Promise<string> }
	 */
	/**
	 * @overload
	 * @param { string } title
	 * @returns { Promise<string | false> }
	 */
	/**
	 * @overload
	 * @param { string } title
	 * @param { boolean } [forced]
	 * @returns { Promise<string> }
	 *
	 */
	// @ts-ignore
	prompt(alertOption, title, forced) {
		return new Promise((resolve, reject) => {
			if (alertOption !== "alert") {
				// @ts-ignore
				forced = title || false;
				title = alertOption;
				game.prompt(title, forced, resolve);
			} else {
				game.prompt(title, alertOption, resolve);
			}
		});
	}
	/**
	 * 模仿h5的alert，用於顯示信息的對話框
	 *
	 * @param { string } title
	 * @example
	 * ```js
	 * await game.promises.alert('彈窗內容');
	 * ```
	 * @returns { Promise<true> }
	 */
	alert(title) {
		return new Promise((resolve, reject) => {
			game.prompt(title, "alert", resolve);
		});
	}
	// 讀寫函數promises化(不用考慮其對應函數是否存在)
	download(url, folder, dev, onprogress) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			game.download(url, folder, resolve, reject, dev, onprogress);
		});
	}
	/**
	 * @param {string} filename
	 * @returns {Promise<ArrayBuffer | Buffer>}
	 */
	readFile(filename) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			game.readFile(filename, resolve, reject);
		});
	}
	readFileAsText(filename) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			game.readFileAsText(filename, resolve, reject);
		});
	}
	writeFile(data, path, name) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			game.writeFile(data, path, name, resolve);
		}).then(result => {
			return new Promise((resolve, reject) => {
				if (result instanceof Error) {
					reject(result);
				} else {
					resolve(result);
				}
			});
		});
	}
	ensureDirectory(list, callback, file) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			game.ensureDirectory(list, resolve, file);
		});
	}
	createDir(directory) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			game.createDir(directory, resolve, reject);
		});
	}
	removeFile(filename) {
		return /** @type {Promise<void>} */ (
			new Promise((resolve, reject) => {
				// @ts-ignore
				game.removeFile(filename, err => {
					if (err) reject(err);
					else resolve();
				});
			})
		);
	}
	removeDir(directory) {
		return /** @type {Promise<void>} */ (
			new Promise((resolve, reject) => {
				// @ts-ignore
				game.removeDir(directory, resolve, reject);
			})
		);
	}

	/**
	 * 獲取文件列表
	 *
	 * @param { string } dir 目錄
	 * @returns { Promise<[string[], string[]]> } 返回一個數組，第一個元素是文件夾列表，第二個元素是文件列表
	 */
	getFileList(dir) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			game.getFileList(dir, (folders, files) => resolve([folders, files]), reject);
		});
	}

	/**
	 * @param { string } key
	 * @param { * } [value]
	 * @param { string | boolean } [local]
	 */
	saveConfig(key, value, local) {
		// @ts-ignore
		if (_status.reloading) return Promise.resolve();

		// @ts-ignore
		return new Promise(resolve => game.saveConfig(key, value, local, resolve));
	}
	/**
	 * @param { string } key
	 */
	saveConfigValue(key) {
		return game.promises.saveConfig(key, lib.config[key]);
	}
	/**
	 * @param { string } extension
	 * @param { string } key
	 * @param { * } [value]
	 */
	saveExtensionConfig(extension, key, value) {
		return game.promises.saveConfig(`extension_${extension}_${key}`, value);
	}
	/**
	 * @param { string } extension
	 * @param { string } key
	 */
	saveExtensionConfigValue(extension, key) {
		return game.promises.saveExtensionConfig(extension, key, game.getExtensionConfig(extension, key));
	}

	/**
	 * 檢查指定的路徑是否是一個文件
	 *
	 * @param {string} fileName - 需要查詢的路徑
	 * @return {Promise<(-1 | 0 | 1)>} - 返回值意義如下:
	 *  - `-1`: 路徑不存在或無法訪問
	 *  - `0`: 路徑的內容不是文件
	 *  - `1`: 路徑的內容是文件
	 */
	checkFile(fileName) {
		return new Promise((resolve, reject) => {
			game.checkFile(fileName, resolve, reject);
		});
	}

	/**
	 * 檢查指定的路徑是否是一個目錄
	 *
	 * @param {string} dir - 需要查詢的路徑
	 * @return {Promise<(-1 | 0 | 1)>} - 返回值意義如下:
	 *  - `-1`: 路徑不存在或無法訪問
	 *  - `0`: 路徑的內容不是目錄
	 *  - `1`: 路徑的內容是目錄
	 */
	checkDir(dir) {
		return new Promise((resolve, reject) => {
			game.checkDir(dir, resolve, reject);
		});
	}
}
