import { game } from "../game/index.js";
import { lib } from "../library/index.js";
import { jumpToCatchBlock } from "./index.js";

/**
 * @param {string} name
 * @returns {any}
 */
export function get(name) {
	const config = Reflect.get(lib, "config");
	if (!config) return null;
	return Reflect.get(config, name);
}

/**
 * @param {string} name
 * @param {any} value
 * @returns {void}
 */
export function set(name, value) {
	const config = Reflect.get(lib, "config");
	if (!config) return;
	Reflect.set(config, name, value);
}

/**
 * @param {string} name
 * @returns {boolean}
 */
export function has(name) {
	const config = Reflect.get(lib, "config");
	if (!config) return false;
	return Reflect.has(config, name);
}

/**
 * 從數據庫中讀取數據，根據目前可用情況自動選擇相應地數據庫
 *
 * 此函數僅用於讀取一個“數據庫”形式的數據：即無論如何，`localStorage`存的必然是對象
 *
 * @async
 * @param {string} name - 要讀取數據的`key`
 * @param {string} type - `indexedDB`所使用的`storeName`和`localStorage`的`key`，當`type`為`"data"`時僅用於`indexedDB`
 * @param {boolean} [reinitLocalStorage=true] - 是否在用`localStorage`讀取失敗時將對應鍵的值初始化為空對象
 * @param {any} [reinitIndexedDB=undefined] - 是否在用`indexedDB`讀取失敗時將對應鍵的值初始化；若給定值，則初始化為給定的值
 * @return {Promise<any>}
 */
export function load(name, type, reinitLocalStorage = true, reinitIndexedDB = undefined) {
	if (lib.db) {
		let result = game.getDB(type, name);

		if (typeof reinitIndexedDB != "undefined") {
			result = result.catch(() => game.putDB(type, name, reinitIndexedDB).then(() => reinitIndexedDB));
		}

		return result;
	}

	let config;
	try {
		let json = localStorage.getItem(`${lib.configprefix}${type === "data" ? name : type}`);
		if (!json) jumpToCatchBlock();
		config = JSON.parse(json);
		if (typeof config != "object" || config == null) jumpToCatchBlock();
	} catch (err) {
		config = {};
		if (reinitLocalStorage) localStorage.setItem(`${lib.configprefix}${name}`, "{}");
	}
	return Promise.resolve(type === "data" ? config : config[name]);
}

/**
 * 向數據庫中保存數據，根據目前可用情況自動選擇相應地數據庫
 *
 * 此函數僅用於保存一個“數據庫”形式的數據：即無論如何，`localStorage`存的必然是對象
 *
 * @async
 * @param {string} name - 要保存數據的`key`
 * @param {string} type - `indexedDB`所使用的`storeName`和`localStorage`的`key`，當`type`為`"data"`時僅用於`indexedDB`
 * @param {any} value - 需要保存的數據；當`type`為`"data"`時必須為`object`類型
 * @return {Promise<void>}
 */
export function save(name, type, value) {
	let noValue = typeof value == "undefined";

	if (lib.db) {
		return noValue ? game.deleteDB(type, name) : game.putDB(type, name, value);
	}

	let database = type === "data";
	let key = database ? name : type;

	let config;
	if (database) {
		if (noValue) {
			localStorage.removeItem(`${lib.configprefix}${key}`);
			return Promise.resolve();
		} else {
			config = value;
		}
	} else {
		try {
			let json = localStorage.getItem(`${lib.configprefix}${key}`);
			if (!json) jumpToCatchBlock();
			config = JSON.parse(json);
			if (typeof config != "object" || config == null) jumpToCatchBlock();
		} catch (err) {
			config = {};
		}

		if (noValue) delete config[name];
		else config[name] = value;
	}

	localStorage.setItem(`${lib.configprefix}${key}`, JSON.stringify(config));
	return Promise.resolve();
}
