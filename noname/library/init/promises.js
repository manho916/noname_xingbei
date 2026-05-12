import { lib } from "../../../noname.js";

export class LibInitPromises {
	/**
	 * Promise版的`lib.init.js`
	 *
	 * @param {string} path - 文件路徑
	 * @param {string | string[]} [file] - 文件名或文件名組，忽略則直接讀取`path`的內容
	 * @returns {Promise<Event>}
	 */
	js(path, file) {
		return new Promise((resolve, reject) => lib.init.js(path, file, resolve, reject));
	}

	/**
	 * Promise版的`lib.init.css`
	 *
	 * @param {string} path - 文件路徑
	 * @param {string | string[]} [file] - 文件名或文件名組，忽略則直接讀取`path`的內容
	 * @param {Element} [before] - 新樣式dom的位置
	 * @param {boolean} [noerror = false] - 是否忽略報錯
	 * @returns {Promise<HTMLLinkElement>}
	 */
	css(path, file, before, noerror = false) {
		return new Promise((resolve, reject) => {
			const style = lib.init.css(path, file, before);
			const success = () => resolve(style);
			style.addEventListener("load", success);
			style.addEventListener("error", noerror ? success : reject);
		});
	}

	/**
	 * Promise版的`lib.init.req`
	 *
	 * @param {string} str - 要讀取的地址
	 * @param {string} [master]
	 * @returns {Promise<ProgressEvent>}
	 */
	req(str, master) {
		return new Promise((resolve, reject) => lib.init.req(str, resolve, reject, master));
	}

	/**
	 * Promise版的`lib.init.json`
	 *
	 * @param {string} url - 要讀取的地址
	 * @returns {Promise<object>}
	 */
	json(url) {
		return new Promise((resolve, reject) => lib.init.json(url, resolve, reject));
	}

	/**
	 * Promise版的`lib.init.sheet`
	 *
	 * @returns {Promise<HTMLStyleElement>}
	 */
	sheet() {
		return new Promise((resolve, reject) => {
			const style = lib.init.sheet.apply(lib.init, arguments);
			style.addEventListener("load", () => resolve(style));
			style.addEventListener("error", reject);
		});
	}

	/**
	 * @async
	 * @param {string | URL} link - 需要解析的路徑
	 * @param {((item: string) => string) | null} [defaultHandle] - 在給定路徑不符合可用情況（或基於無名殺相關默認情況）時，處理路徑的函數，返回的路徑應是相對於根目錄的相對路徑，默認為`null`，當且僅當無法解析成`URL`時會調用該回調
	 * @param {boolean} [forceLoadAsDataUrl] - 是否將資源加載為[Data URL](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)，默認為`false`
	 * @returns {Promise<URL>}
	 */
	parseResourceAddress(link, defaultHandle = null, forceLoadAsDataUrl = false) {
		if (!forceLoadAsDataUrl) return Promise.resolve(lib.init.parseResourceAddress(link, defaultHandle));
		let { promise, resolve } = Promise.withResolvers();

		lib.init.parseResourceAddress(link, defaultHandle, result => resolve(result));
		return promise;
	}

	/**
	 * @async
	 * @param {string | URL} link - 需要解析的路徑
	 * @param {((item: string) => string) | null} [defaultHandle] - 在給定路徑不符合可用情況（或基於無名殺相關默認情況）時，處理路徑的函數，返回的路徑應是相對於根目錄的相對路徑，默認為`null`，當且僅當無法解析成`URL`時會調用該回調
	 * @returns {Promise<[origin: URL, data: URL]>}
	 */
	async parseResourceAddressExt(link, defaultHandle = null) {
		let { promise, resolve } = Promise.withResolvers();

		let origin = lib.init.parseResourceAddress(link, defaultHandle, result => resolve(result));
		return [origin, await promise];
	}
}
