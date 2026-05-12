import { lib } from "../index.js";
import { game } from "../../game/index.js";
import { get } from "../../get/index.js";
import { _status } from "../../status/index.js";
import { hex_md5 } from "../crypt/md5.js";
/**
 * 緩存上下文，用於在各種方法中暫時緩存值，以第一次獲取的緩存值為準。
 */
export class CacheContext {
	constructor() {
		this.lib = this._createCacheProxy(lib);
		this.game = this._createCacheProxy(game);
		this.get = this._createCacheProxy(get);
		this.sourceMap = new Map();
		this.storageMap = new Map();
	}

	/**
	 * 設置當前是否處於緩存環境。當使用inject對類進行注入時，只在緩存環境下會返回緩存值。
	 * @param {boolean} cache
	 */
	static setInCacheEnvironment(cache) {
		_status.cacheEnvironment = cache;
	}

	/**
	 * 設置一個公有的緩存上下文。緩存上下文持有期間，假設所緩存的函數在參數相同時，絕對不會（注意是絕對不會）返回不同的返回值。
	 * 使用inject對類進行注入時，將應用公有的緩存上下文。
	 * @param {CacheContext} context
	 */
	static setCacheContext(context) {
		_status.cacheContext = context;
	}

	/**
	 * 返回當前公有的緩存上下文。
	 * @returns {CacheContext} 緩存上下文
	 */
	static getCacheContext() {
		return _status.cacheContext;
	}

	/**
	 * 移除當前公有的緩存上下文。
	 */
	static removeCacheContext() {
		delete _status.cacheContext;
	}

	/**
	 * 返回公有的緩存上下文，沒有就創建一個新的返回（不會設置為新的公有緩存上下文）。
	 * @returns {CacheContext} 緩存上下文
	 */
	static requireCacheContext() {
		let cache = CacheContext.getCacheContext();
		if (!cache) {
			return new CacheContext();
		}
		return cache;
	}

	/**
	 * 對一個對象進行代理，對象的所有函數都將按條件返回緩存結果。
	 * 注意：以cache開頭的方法依然保持原來的調用。
	 * 如果所代理的對象擁有cacheSupportFunction方法（返回一個方法名數組），只有允許的方法才會返回緩存結果，剩餘方法依然保持原來的調用。
	 * @param {any} source 需要代理的對象
	 * @returns
	 */
	delegate(source) {
		if (source === null || source === undefined) return source;
		if (source._cacheDelegateSource) return source;
		let proxy = this.sourceMap.get(source);
		if (proxy) {
			return proxy;
		}
		proxy = this._createCacheProxy(source);
		this.sourceMap.set(source, proxy);
		return proxy;
	}

	/**
	 * 對一個類進行注入。methods為可以返回緩存的所有方法。注入後，此類的相關方法會在公有緩存上下文下返回緩存值。
	 * @param {any} source
	 * @param {Array<string>} methods
	 * @returns
	 */
	static inject(source, methods) {
		if (source == null || source === undefined) return null;
		for (let method of methods) {
			let func = source[method];
			if (typeof func != "function") continue;
			source[method] = function () {
				try {
					if (!_status.cacheEnvironment) {
						return func.call(this, ...arguments);
					}
					return CacheContext._getCacheValueFromObject(
						CacheContext.requireCacheContext()._requireStorage(this),
						method,
						arguments,
						this,
						func
					);
				} catch (e) {
					return func.call(this, ...arguments);
				}
			};
		}
	}

	_requireStorage(obj) {
		let storage = this.storageMap.get(obj);
		if (!storage) {
			storage = {};
			this.storageMap.set(obj, storage);
		}
		return storage;
	}

	/**
	 * @template T
	 * @param {T} delegateObject
	 * @returns {T}
	 */
	_createCacheProxy(delegateObject) {
		const cacheFuncObj = {};
		const cacheStorage = {};
		return new Proxy(delegateObject, {
			get: (target, key) => {
				if (key == "_cacheDelegateSource") return delegateObject;
				let value = target[key];
				if (key.indexOf("cache") == 0) {
					return value;
				}
				if (typeof target.cacheSupportFunction == "function") {
					if (!target.cacheSupportFunction().includes(key)) {
						return value;
					}
				}
				if (typeof value == "function") {
					let wrapFunc = cacheFuncObj[key];
					if (typeof wrapFunc != "function") {
						wrapFunc = function () {
							try {
								return CacheContext._getCacheValueFromObject(
									cacheStorage,
									key,
									arguments,
									target
								);
							} catch (e) {
								return value.call(target, ...arguments);
							}
						};
						cacheFuncObj[key] = wrapFunc;
					}
					return wrapFunc;
				}
				return value;
			},
		});
	}

	static _getCacheValueFromObject(storage, key, params, source, func) {
		let cache = storage;
		let funcCache = CacheContext._ensureMember(cache, key);
		let cacheKey = CacheContext._wrapParametersToCacheKey(params);
		let ret = funcCache[cacheKey];
		if (ret === undefined) {
			ret = (typeof func == "function" ? func : source[key]).call(source, ...params);
			funcCache[cacheKey] = ret;
			//console.log('緩存未命中!'+key+":"+cacheKey+":"+params.length+":ret:"+ret);
		} else {
			//console.log(key+":"+cacheKey+":"+params.length+":ret:"+ret);
		}
		return ret;
	}

	static _ensureMember(obj, key) {
		let mem = obj[key];
		if (!mem) {
			mem = {};
			obj[key] = mem;
		}
		return mem;
	}

	static _wrapParametersToCacheKey(params) {
		return Array.from(params)
			.filter((p) => !(p instanceof CacheContext))
			.map((param) => CacheContext._wrapParameterToCacheKey(param))
			.join("-");
	}

	static _wrapParameterToCacheKey(param) {
		if (param === null) return "null";
		if (param === undefined) return "undefined";
		if (typeof param === "string") return `[str:${param}]`;
		if (typeof param === "number") return `[d:${param}]`;
		if (typeof param === "boolean") return `[bl:${param}]`;
		if (typeof param.getCacheKey == "function") return param.getCacheKey();
		if (Array.isArray(param)) {
			return `[arr:[${param
				.filter((p) => !(p instanceof CacheContext))
				.map((p) => CacheContext._wrapParameterToCacheKey(p))
				.join("-")}]]`;
		}
		if (typeof param === "function") return `[f:${hex_md5(param.toString())}]`;
		let entries = Object.entries(param);
		entries.sort((a, b) => (a[0] < b[0] ? -1 : 1));
		return `[obj:{${entries
			.map((e) => e[0] + ":" + CacheContext._wrapParameterToCacheKey(e[1]))
			.join(",")}}]`;
	}
}
