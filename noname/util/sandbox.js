// 給擴展開發者的的提示:
// 如果你在調試時啟用了類似 `在出現異常時中斷` 的選項，
// 如果你不想頻繁進入此文件，那麼你可以在調試窗口中 `右鍵-將此文件添加到忽略列表/black box script` 來屏蔽此文件
// 另外由於封送的原因，如果當前模式啟用了沙盒，會導致編譯後的本地或遠程代碼創建的對象使用代理包裝
// 你在調試器中需要通過 `[[Target]].target` 查看原始對象，在此導致的不便對開發者表示歉意
// 不過沙盒默認只在聯機實際，實際影響已經降到最低，對於不接觸聯機模式的開發者來說，應該沒有太大問題

// 最後為安全考慮，請遵守規範，儘量不要使用 `eval` 函數而是使用 `security.exec2` 來替代

import { SANDBOX_EXPORT, isSandboxEnabled } from "./initRealms.js";

// 很重要的事情！
// 請不要在在其他文件中import sandbox.js！
// 如果需要沙盒相關的類請用security.importSandbox()導入！！！
// 什麼時候支持頂級await(Chrome 89)就可以改回去了，現在好麻煩哦

/** @typedef {any} Window */

// 新的開關放到了 "./initRealms.js" 裡面，請不要改動此處！
const SANDBOX_ENABLED = isSandboxEnabled();

// 暴露方法Symbol，用於類之間通信
const SandboxExposer = Symbol("Sandbox.Exposer"); // 實例暴露
const SandboxExposer2 = Symbol("Sandbox.Exposer2"); // 靜態暴露

// 暴露方法Signal，類間通信信號
const SandboxSignal_InitDomain = Symbol("InitDomain");
const SandboxSignal_GetMarshalledProxy = Symbol("GetMarshalledProxy");
const SandboxSignal_SetMarshalledProxy = Symbol("SetMarshalledProxy");
const SandboxSignal_GetWindow = Symbol("GetWindow");
const SandboxSignal_GetPromise = Symbol("GetPromise");
const SandboxSignal_EnterDomain = Symbol("EnterDomain");
const SandboxSignal_ExitDomain = Symbol("ExitDomain");
const SandboxSignal_ListDomain = Symbol("ListDomain");
const SandboxSignal_UnpackProxy = Symbol("UnpackProxy");
const SandboxSignal_Marshal = Symbol("Marshal");
const SandboxSignal_MarshalArray = Symbol("MarshalArray");
const SandboxSignal_TrapDomain = Symbol("TrapDomain");
const SandboxSignal_DiapatchMonitor = Symbol("DiapatchMonitor");
const SandboxSignal_ListMonitor = Symbol("ListMonitor");
const SandboxSignal_ExposeInfo = Symbol("ExposeInfo");
const SandboxSignal_TryFunctionRefs = Symbol("TryFunctionRefs");

/** @type {typeof import("./error.js").CodeSnippet} */
let CodeSnippet;
/** @type {typeof import("./error.js").ErrorReporter} */
let ErrorReporter;
/** @type {typeof import("./error.js").ErrorManager} */
let ErrorManager;

// 用於適配 < Chrome 84 的設備
const WeakRef = window.WeakRef || class WeakRef {
	/**
	 * @param {any} target
	 */
	constructor(target) {
		this.target = target;
	}

	/**
	 * @returns {any} 
	 */
	deref() {
		return this.target;
	}

	/**
	 * @type {"WeakRef"} 
	 */
	[Symbol.toStringTag] = "WeakRef";
};

/** @type {typeof Function} */
// @ts-ignore
const GeneratorFunction = (function* () { }).constructor;
/** @type {typeof Function} */
// @ts-ignore
const AsyncFunction = (async function () { }).constructor;
/** @type {typeof Function} */
// @ts-ignore
const AsyncGeneratorFunction = (async function* () { }).constructor;

/**
 * ```plain
 * 判斷是否為基元類型
 * ```
 * 
 * @param {any} obj 
 * @returns {boolean} 
 */
function isPrimitive(obj) {
	return Object(obj) !== obj;
}

/**
 * ```plain
 * AccessAction枚舉
 * 提供給Rule類作為權限ID
 * 對應 Proxy 的12種攔截器
 * ```
 */
class AccessAction {
	// static CALL     = 0;  // apply
	// static NEW      = 1;  // construct
	// static READ     = 2;  // get
	// static WRITE    = 3;  // set
	// static DESCRIBE = 4;  // getOwnPropertyDescriptor
	// static DEFINE   = 5;  // defineProperty
	// static TRACE    = 6;  // getPrototypeOf
	// static META     = 7;  // setPrototypeOf
	// static SEAL     = 8;  // preventExtensions
	// static EXISTS   = 9;  // has
	// static LIST     = 10; // ownKeys
	// static DELETE   = 11; // delete

	/** ```Reflect.apply``` */
	static CALL = 0;
	/** ```Reflect.construct``` */
	static NEW = 1;
	/** ```Reflect.get``` */
	static READ = 2;
	/** ```Reflect.set ``` */
	static WRITE = 3;
	/** ```Reflect.getOwnPropertyDescriptor``` */
	static DESCRIBE = 4;
	/** ```Reflect.defineProperty``` */
	static DEFINE = 5;
	/** ```Reflect.getPrototypeOf``` */
	static TRACE = 6;
	/** ```Reflect.setPrototypeOf``` */
	static META = 7;
	/** ```Reflect.preventExtensions``` */
	static SEAL = 8;
	/** ```Reflect.has``` */
	static EXISTS = 9;
	/** ```Reflect.ownKeys``` */
	static LIST = 10;
	/** ```Reflect.delete``` */
	static DELETE = 11

	/**
	 * 判斷給定的action是否是AccessAction
	 * 
	 * @param {number} action 
	 * @returns 
	 */
	static isAccessAction(action) {
		return typeof action == "number"
			&& action >= 0 && action < 12;
	}
}

/**
 * ```plain
 * 指定一個對象的封送規則
 * 
 * 是否允許對象進行封送
 * 是否允許對象封送到某個具體的運行域
 * 是否允許封送的對象進行特定的操作
 * ```
 */
class Rule {
	/** @type {Domain} */
	#domain;
	/** @type {boolean} */
	#allowMarshal = true;

	/** @type {WeakSet<Domain>?} */
	#allowMarshalTo = null;
	/** @type {WeakSet<Domain>?} */
	#disallowMarshalTo = null;

	/** @type {boolean[]} */
	#permissions = new Array(12).fill(true);

	/** @type {((...args: any[]) => boolean)?} */
	#accessControl = null;

	/**
	 * ```plain
	 * 創建一個封送規則
	 * ```
	 * 
	 * @param {Rule?} rule 
	 */
	constructor(rule = null) {
		this.#domain = Domain.current;

		if (rule instanceof Rule) {
			this.#allowMarshal = rule.#allowMarshal;
			this.#allowMarshalTo = rule.#allowMarshalTo;
			this.#disallowMarshalTo = rule.#disallowMarshalTo;
			this.#permissions = rule.#permissions.slice();
			this.#accessControl = rule.#accessControl;
		}
	}

	/**
	 * ```plain
	 * 檢查當前是否是 Rule 所屬的運行域
	 * ```
	 * 
	 * @param {Rule} thiz 
	 */
	static #assertOperator = function (thiz) {
		if (thiz.#domain !== Domain.current)
			throw new Error("當前不是 Rule 所屬的運行域");
	}

	/**
	 * ```plain
	 * 是否允許對象進行封送
	 * ```
	 * 
	 * @type {boolean}
	 */
	get canMarshal() {
		Rule.#assertOperator(this);
		return this.#allowMarshal;
	}

	/**
	 * ```plain
	 * 是否允許對象進行封送
	 * ```
	 * 
	 * @type {boolean}
	 */
	set canMarshal(newValue) {
		Rule.#assertOperator(this);
		this.#allowMarshal = !!newValue;
	}

	/**
	 * ```plain
	 * 檢查當前的規則是否允許封送到指定的運行域
	 * ```
	 * 
	 * @param {Domain} domain 
	 * @returns {boolean} 
	 */
	canMarshalTo(domain) {
		Rule.#assertOperator(this);

		if (!this.#allowMarshal)
			return false;

		// 存在於封送白名單或不存在於封送黑名單
		if (this.#allowMarshalTo)
			return this.#allowMarshalTo.has(domain);
		else if (this.#disallowMarshalTo)
			return !this.#disallowMarshalTo.has(domain);

		return true;
	}

	/**
	 * ```plain
	 * 將特定的運行域添加到當前對象的封送白名單
	 * 
	 * 請注意，封送白名單與黑名單不能同時指定
	 * ```
	 * 
	 * @param {Domain} domain 
	 */
	allowMarshalTo(domain) {
		Rule.#assertOperator(this);

		if (!this.#allowMarshalTo) {
			if (this.#disallowMarshalTo)
				throw new TypeError("封送黑名單與封送白名單不能同時存在");

			this.#allowMarshalTo = new WeakSet();
		}

		this.#allowMarshalTo.add(domain);
	}

	/**
	 * ```plain
	 * 將特定的運行域添加到當前對象的封送黑名單
	 * 
	 * 請注意，封送白名單與黑名單不能同時指定
	 * ```
	 * 
	 * @param {Domain} domain 
	 */
	disallowMarshalTo(domain) {
		Rule.#assertOperator(this);

		if (!this.#disallowMarshalTo) {
			if (this.#allowMarshalTo)
				throw new TypeError("封送黑名單與封送白名單不能同時存在");

			this.#disallowMarshalTo = new WeakSet();
		}

		this.#disallowMarshalTo.add(domain);
	}

	/**
	 * ```plain
	 * 檢查給定的AccessAction是否被允許
	 * ```
	 * 
	 * @param {number} action 
	 * @returns {boolean} 
	 */
	isGranted(action) {
		Rule.#assertOperator(this);

		if (!AccessAction.isAccessAction(action))
			throw new TypeError("參數 action 不是一個有效的操作");

		return this.#permissions[action];
	}

	/**
	 * ```plain
	 * 指定給定的AccessAction是否被允許
	 * ```
	 * 
	 * @param {number} action 
	 * @param {boolean} granted 
	 */
	setGranted(action, granted) {
		Rule.#assertOperator(this);

		if (!AccessAction.isAccessAction(action))
			throw new TypeError("參數 action 不是一個有效的操作");

		this.#permissions[action] = !!granted;
	}

	/**
	 * ```plain
	 * 判斷在給定的AccessAction與指定的參數下是否允許訪問
	 * ```
	 * 
	 * @param {number} action 
	 * @param  {...any} args 
	 * @returns {boolean} 
	 */
	canAccess(action, ...args) {
		Rule.#assertOperator(this);

		// 判斷行為是否允許
		if (!this.isGranted(action))
			return false;

		// 通過權限控制器判斷是否允許
		if (this.#accessControl
			&& !this.#accessControl(action, ...args))
			return false;

		return true;
	}

	/**
	 * ```plain
	 * 設置當前的權限控制器
	 * 
	 * 權限控制器形參是攔截器的對應參數
	 * 返回值則控制本次訪問是否允許
	 * ```
	 * 
	 * @param {(action: number, ...args: any[]) => boolean} accessControl 
	 */
	setAccessControl(accessControl) {
		Rule.#assertOperator(this);

		if (typeof accessControl != "function")
			throw new TypeError("無效的權限控制器");
		if (this.#accessControl)
			throw new TypeError("權限控制器已經被設置");

		this.#accessControl = accessControl;
	}
}

/**
 * ```plain
 * 全局變量映射表
 * 
 * 在下表中標記的全局變量，
 * 封送時將不使用代理封送，
 * 而是直接映射成另一個運行域對應的全部變量
 * 
 * 映射表項格式:
 * string: 全局變量路徑
 * 例如: /Object/assign 指向 window.Object.assign
 * 同時路徑也是映射的鍵名
 * array: [全局變量名稱, 對應的獲取代碼]
 * 例如: [/AsyncFunction, (async()=>{}).constructor]
 * 指向異步函數的構造函數，使用/AsyncFunction作為映射鍵名
 * 
 * 請注意，映射鍵名不得相同，不然會導致相互覆蓋
 * 全局變量映射表應該用於JavaScript的內建對象
 * 因為只有內建對象才會在所有運行域同時都有
 * ```
 */
const GLOBAL_PATHES = Object.freeze([
	"/Object",
	"/Array",
	"/Promise",
	"/Date",
	"/String",
	"/Number",
	"/Boolean",
	"/BigInt",
	"/RegExp",
	"/Symbol",
	"/Error",
	"/TypeError",
	"/SyntaxError",
	"/RangeError",
	"/EvalError",
	"/ReferenceError",
	"/Map",
	"/Set",
	"/WeakRef",
	"/WeakMap",
	"/WeakSet",
	["/Object/Symbol(Symbol.hasInstance)", "Object[Symbol.hasInstance]"],
	"/Object/prototype",
	"/Array/prototype",
	"/Function/prototype",
	"/Promise/prototype",
	"/Date/prototype",
	"/String/prototype",
	"/Number/prototype",
	"/Boolean/prototype",
	"/BigInt/prototype",
	"/RegExp/prototype",
	"/Symbol/prototype",
	"/Error/prototype",
	"/TypeError/prototype",
	"/SyntaxError/prototype",
	"/RangeError/prototype",
	"/EvalError/prototype",
	"/ReferenceError/prototype",
	"/Map/prototype",
	"/Set/prototype",
	"/WeakRef/prototype",
	"/WeakMap/prototype",
	"/WeakSet/prototype",
	["/Generator", "(function*(){})().constructor"],
	["/AsyncGenerator", "(async function*(){})().constructor"],
	["/Generator/prototype", "(function*(){})().constructor.prototype"],
	["/AsyncGenerator/prototype", "(async function*(){})().constructor.prototype"],
	["/GeneratorFunction/prototype", "(function*(){}).constructor.prototype"],
	["/AsyncFunction/prototype", "(async()=>{}).constructor.prototype"],
	["/AsyncGeneratorFunction/prototype", "(async function*(){}).constructor.prototype"],
	"/JSON",
	"/Proxy",
	"/Math",
	"/Reflect",
	"/parseInt",
	"/parseFloat",
	"/isNaN",
	"/isFinite",

	// 危險對象不傳遞
	// "/Function",
	// ["/GeneratorFunction", "(function*(){}).constructor"],
	// ["/AsyncFunction", "(async()=>{}).constructor"],
	// ["/AsyncGeneratorFunction", "(async function*(){}).constructor"],
	// "/eval",
]);

/**
 * ```plain
 * 初始化內建對象時就需要封送的全局變量
 * 
 * 這些函數的成功執行依賴於browser context
 * 必須要頂級域來提供給其他運行域
 * ```
 */
const MARSHALLED_LIST = Object.freeze([
	"/setTimeout",
	"/clearTimeout",
	"/setInterval",
	"/clearInterval",
	"/setImmediate",
	"/clearImmediate",
	"/requestAnimationFrame",
	"/cancelAnimationFrame",
	"/requestIdleCallback",
	"/cancelIdleCallback",
	"/queueMicrotask",
	"/MutationObserver",
	// 根據狂神喵提供的問題
	// 我們對console進行遷移
	...Object.keys(console)
		.map(key => `/console/${key}`),
	// 另外補充這兩個可能的函數哦
	"/alert",
	"/confirm",
]);

/**
 * ```plain
 * 為每個運行域的全局對象提供封送映射
 * 
 * 非暴露類
 * ```
 */
class Globals {
	/** @type {[WeakMap, Object, Object]} */
	static #topGlobals;
	/** @type {WeakMap<Domain, [WeakMap, Object]>} */
	static #globals = new WeakMap();
	/** @type {Record<string|symbol, true>} */
	static #builtinKeys = {};

	/**
	 * ```plain
	 * 判斷是否是頂級域的內建對象
	 * ```
	 * 
	 * @param {string|symbol} key 
	 * @returns {boolean} 
	 */
	static isBuiltinKey(key) {
		return key in Globals.#builtinKeys; // 基於hash的存在性檢查效率最高喵
	}

	/**
	 * ```plain
	 * 解析映射路徑
	 * 
	 * 如: /a/b/c => ["/a/b/c", window.a.b.c]
	 * ```
	 *
	 * @param {string|string[]} path 
	 * @param {Window} window 
	 * @returns {[string, any]} [映射鍵名, 映射值]
	 */
	static parseFrom(path, window) {
		if (typeof path == "string") {
			const items = path.split("/").filter(Boolean);
			let obj = window;

			for (const item of items)
				if (!(obj = obj[item]))
					break;

			return [path, obj];
		} else
			return [path[0], window.eval(path[1])];
	}

	/**
	 * ```plain
	 * 解析映射路徑為索引
	 * 
	 * 如: /a/b/c => [window.a.b, "c"]
	 * ```
	 *
	 * @param {string} path 
	 * @param {Window} window 
	 * @returns {[Object, string]} [索引對象, 索引鍵名]
	 */
	static parseIndex(path, window) {
		const items = path.split("/").filter(Boolean);
		const last = items.pop();
		let obj = window;

		for (const item of items)
			if (!(obj = obj[item]))
				break;

		// @ts-ignore
		return [obj, last];
	}

	/**
	 * ```plain
	 * 初始化運行域的全局對象映射
	 * ```
	 * 
	 * @param {Domain} domain 
	 */
	static ensureDomainGlobals(domain) {
		if (!Globals.#globals.has(domain)) {
			const window = domain[SandboxExposer](SandboxSignal_GetWindow);
			const globals = [new WeakMap(), {}];
			// @ts-ignore
			Globals.#globals.set(domain, globals);

			// 檢查是否是頂級域
			if (Globals.#topGlobals) {
				// 不是頂級域則封送 `MARSHALLED_LIST` 的對象
				const marshalleds = Globals.#topGlobals[2];

				for (const path of MARSHALLED_LIST) {
					const [obj, key] = Globals.parseIndex(path, window);
					obj[key] = trapMarshal(Domain.topDomain, domain, marshalleds[path]);
				}
			} else {
				// 否則將 `MARSHALLED_LIST` 的對象保存
				// @ts-ignore
				Globals.#topGlobals = globals;
				globals.push({});

				for (const path of MARSHALLED_LIST) {
					const [key, obj] = Globals.parseFrom(path, window);

					if (obj == null)
						continue;

					globals[2][key] = obj;
				}

				// 另外構造內建對象表
				for (const key of Reflect.ownKeys(window))
					Globals.#builtinKeys[key] = true;
			}

			// 構建全局變量映射
			for (const path of GLOBAL_PATHES) {
				const [key, obj] = Globals.parseFrom(path, window);

				if (obj == null)
					continue;

				globals[0].set(obj, key);
				globals[1][key] = obj;
			}
		}
	}

	/**
	 * ```plain
	 * 將一個對象映射為全局鍵
	 * ```
	 * 
	 * @param {Domain} domain 
	 * @param {Object} obj 
	 */
	static findGlobalKey(domain, obj) {
		Globals.ensureDomainGlobals(domain);
		const globals = Globals.#globals.get(domain);
		// @ts-ignore
		return globals[0].get(obj);
	}

	/**
	 * ```plain
	 * 將一個全局鍵映射為對象
	 * ```
	 * 
	 * @param {Domain} domain 
	 * @param {string} key 
	 */
	static findGlobalObject(domain, key) {
		Globals.ensureDomainGlobals(domain);
		const globals = Globals.#globals.get(domain);
		// @ts-ignore
		return globals[1][key];
	}

	/**
	 * ```plain
	 * 將一個運行域的全局對象映射為另一個運行域的全局對象
	 * ```
	 * 
	 * @param {Object} obj 
	 * @param {Domain} sourceDomain 
	 * @param {Domain} targetDomain 
	 */
	static mapTo(obj, sourceDomain, targetDomain) {
		const key = Globals.findGlobalKey(sourceDomain, obj);

		if (!key)
			return undefined;

		return Globals.findGlobalObject(targetDomain, key);
	}
}

/**
 * ```plain
 * 需要封裝傳遞ExecuteContext的函數
 * 
 * 根據HTML現有函數設置
 * 請不要改動下面的列表
 * ```
 */
const wrappingFunctions = [
	"/setTimeout",
	"/setInterval",
	"/setImmediate",
	"/requestAnimationFrame",
	"/requestIdleCallback",
	"/queueMicrotask",
	"/EventTarget/prototype/addEventListener",
	"/EventTarget/prototype/removeEventListener",
	[/^HTML\w*?Element$/, "prototype", /^on[a-z0-9]+$/, "*"],
	["IDBRequest", "prototype", /^on[a-z0-9]+$/, "*"],
	["XMLHttpRequestEventTarget", "prototype", /^on[a-z0-9]+$/, "*"],
	"/MutationObserver",

	// 對於 cordova 的特殊處理
	"/document/addEventListener",
	"/document/removeEventListener",
	"/window/addEventListener",
	"/window/removeEventListener",

	// "/HTMLCanvasElement/prototype/toBlob",
	// "/DataTransferItem/prototype/getAsString",
	// "/LaunchQueue/prototype/setConsumer",
	// "/ResizeObserver",
	// "/ReportingObserver",
	// "/PerformanceObserver",
	// "/IntersectionObserver",
];

// 不支持的：
// customElements / CustomElementRegistry, 太抽象了喵，太多東西了喵，太麻煩了喵，太複雜了喵（用這個的要被狠狠的打皮鼓喵！

/**
 * ```plain
 * 對於原生函數進行封裝
 * 
 * 非暴露類
 * ```
 */
class NativeWrapper {
	static #unboxedFunction = Symbol("NativeWrapper.unboxedFunction");

	/** @type {WeakMap<Proxy, Function>} */
	static #boxedMap = new WeakMap();
	/** @type {WeakSet<Function>} */
	static #boxedSet = new WeakSet();

	/** @type {typeof Function?} */
	static #topFunction = null;
	/** @type {typeof Function?} */
	static #currentFunction = null;

	/**
	 * ```plain
	 * 初始化頂級運行域的Function
	 * ```
	 * 
	 * @param {Window} topGlobal 
	 */
	static initTopDomain(topGlobal) {
		if (NativeWrapper.#topFunction)
			throw new Error("NativeWrapper 已經初始化過了");

		NativeWrapper.#topFunction = topGlobal.Function;
	}

	/**
	 * ```plain
	 * 對某個域的原生函數進行封裝
	 * ```
	 * 
	 * @param {Window} global 
	 */
	static wrapInDomains(global) {
		// 保存當前域的Function構造函數用於後續構建原型鏈
		NativeWrapper.#currentFunction = global.Function;

		// 封裝所有函數
		for (const selector of wrappingFunctions)
			NativeWrapper.wrapFunctions(global, selector);

		NativeWrapper.#currentFunction = null;
	}

	/**
	 * ```plain
	 * 根據選擇器對原生函數進行封裝
	 * ```
	 * 
	 * @param {Window} global 
	 * @param {string|Array<string|symbol|RegExp>} selector 
	 */
	static wrapFunctions(global, selector) {
		/** @type {Array} */
		const items = Array.isArray(selector)
			? selector : selector.split("/").filter(Boolean);

		let flags = 2; // 默認裝箱了喵

		if (items[items.length - 1] === "*") {
			flags |= 1;
			items.pop();
		}

		items.unshift(global);

		const pathes = [items];
		const indexes = [];

		// 將所有路徑轉換為索引
		// 如: /a/b/c => [window.a.b, "c"]
		while (pathes.length) {
			/** @type {Array} */
			// @ts-ignore
			const path = pathes.shift();

			// 如果已經是長度為二了
			if (path.length == 2) {
				// 最後一項如果不是正則表達式直接添加為索引
				if (!(path[1] instanceof RegExp)) {
					if (path[1] in path[0])
						indexes.push(path);

					continue;
				}

				// 否則需要遍歷添加索引
				const root = path[0];
				const pattern = path[1];
				indexes.push(...Reflect.ownKeys(root)
					.filter(k => pattern.test(
						typeof k == "string"
							? k : `@${k.description}`))
					.filter(k => k in root)
					.map(k => [root, k]));

				continue;
			}

			// 如果下一個鍵不是正則表達式
			if (!(path[1] instanceof RegExp)) {
				const root = path.shift();

				// 向下索引，並將 `__proto__` 改為原型獲取
				if (path[0] === "__proto__")
					path[0] = Reflect.getPrototypeOf(root);
				else
					path[0] = root[path[0]];

				if (!path[0])
					continue;

				// 添加新的路徑
				pathes.push(path);
				continue;
			}

			// 如果下一個鍵是正則表達式
			// 此時需要遍歷向下索引
			const root = path.shift();
			const pattern = path.shift();
			const keys = Reflect.ownKeys(root)
				.filter(k => pattern.test(
					typeof k == "string"
						? k : `@${k.description}`))
				.filter(k => root[k]);

			if (!keys.length)
				continue;

			// 添加新的路徑
			pathes.push(...keys
				.map(k => [root[k], ...path]));
		}

		// 根據索引進行封裝
		for (const index of indexes)
			// @ts-ignore
			NativeWrapper.wrapFunction(global, ...index, flags);
	}

	/**
	 * ```plain
	 * 對於具體的原生函數進行封裝
	 * ```
	 * 
	 * @param {Window} global 
	 * @param {Object} parent 
	 * @param {string|symbol} name 
	 * @param {number} flags 
	 */
	static wrapFunction(global, parent, name, flags) {
		if (flags & 1) {
			// 如果路徑結尾是 `*`，代表需要封裝訪問器(getter與setter)
			const descriptor = Reflect.getOwnPropertyDescriptor(parent, name);

			if (!descriptor
				|| typeof descriptor.get != "function"
				|| typeof descriptor.set != "function")
				throw new TypeError("不支持的HTML實現");

			// 封裝訪問器
			descriptor.get = NativeWrapper.wrapGetter(descriptor.get);
			descriptor.set = NativeWrapper.wrapSetter(descriptor.set);
			Reflect.defineProperty(parent, name, descriptor);
		} else {
			const defaultFunction = parent[name];

			if (!defaultFunction)
				return;

			if (defaultFunction.prototype) {
				// 如果此函數是一個構造函數
				const wrappedApply = NativeWrapper.wrapApply(defaultFunction, flags);
				const wrappedConstruct = NativeWrapper.wrapConstruct(defaultFunction, flags);

				// 使用代理封裝
				parent[name] = new Proxy(defaultFunction, {
					apply(target, thisArg, argArray) {
						return Reflect.apply(wrappedApply, thisArg, argArray);
					},
					construct(target, argArray, newTarget) {
						return Reflect.construct(wrappedConstruct, argArray, newTarget);
					},
				});
			} else {
				// 否則直接進行封裝
				parent[name] = NativeWrapper.wrapApply(
					global === parent
						? defaultFunction.bind(null)
						: defaultFunction, flags);
			}
		}
	}

	/**
	 * ```plain
	 * 將原生函數進行調用封裝
	 * ```
	 * 
	 * @param {Function} func 
	 * @param {number} flags 
	 * @returns {Function} 
	 */
	static wrapApply(func, flags = 0) {
		// @ts-ignore
		const prototype = NativeWrapper.#currentFunction.prototype;
		// 根據是否裝箱進行不同的封裝
		const wrapped = (flags & 2)
			? function (/** @type {any[]} */ ...args) {
				const list = args.map(a =>
					NativeWrapper.boxCallback(a, prototype));
				// @ts-ignore
				return ContextInvoker1(func, this, list);
			}
			: function (/** @type {any[]} */ ...args) {
				// @ts-ignore
				return ContextInvoker1(func, this, args);
			};

		// 構造原型鏈
		Reflect.setPrototypeOf(wrapped, prototype);
		return wrapped;
	}

	/**
	 * ```plain
	 * 將原生函數進行構造封裝
	 * ```
	 * 
	 * @param {Function} func 
	 * @param {number} flags 
	 * @returns {Function} 
	 */
	static wrapConstruct(func, flags = 0) {
		// @ts-ignore
		const prototype = NativeWrapper.#currentFunction.prototype;
		// 根據是否裝箱進行不同的封裝
		const wrapped = (flags & 2)
			? function (/** @type {any[]} */ ...args) {
				const list = args.map(a =>
					NativeWrapper.boxCallback(a, prototype));
				return ContextInvoker2(func, list, new.target);
			}
			: function (/** @type {any[]} */ ...args) {
				return ContextInvoker2(func, args, new.target);
			};

		// 構造原型鏈
		Reflect.setPrototypeOf(wrapped, prototype);
		return wrapped;
	}

	/**
	 * ```plain
	 * 將原生GETTER進行調用封裝
	 * ```
	 * 
	 * @param {Function} func 
	 * @returns {(...args: any[]) => any} 
	 */
	static wrapGetter(func) {
		// @ts-ignore
		const prototype = NativeWrapper.#currentFunction.prototype;
		const wrapped = function () {
			// @ts-ignore
			return NativeWrapper.unboxCallback(ContextInvoker1(func, this, []));
		};

		// 構造原型鏈
		Reflect.setPrototypeOf(wrapped, prototype);
		return wrapped;
	}

	/**
	 * ```plain
	 * 將原生SETTER進行調用封裝
	 * ```
	 * 
	 * @param {Function} func 
	 * @returns {(...args: any[]) => any} 
	 */
	static wrapSetter(func) {
		// @ts-ignore
		const prototype = NativeWrapper.#currentFunction.prototype;
		const wrapped = function (/** @type {ProxyConstructor} */ value) {
			// @ts-ignore
			return ContextInvoker1(func, this,
				[NativeWrapper.boxCallback(value, prototype)]);
		};

		// 構造原型鏈
		Reflect.setPrototypeOf(wrapped, prototype);
		return wrapped;
	}

	/**
	 * ```plain
	 * 將回調函數進行裝箱
	 * ```
	 * 
	 * @param {Proxy} unboxed 
	 * @param {Function} prototype 
	 * @returns 
	 */
	static boxCallback(unboxed, prototype) {
		if (typeof unboxed != "function")
			return unboxed;

		// 讀取緩存
		let wrapped = NativeWrapper.#boxedMap.get(unboxed);

		if (!wrapped) {
			// 緩存不存在則創建
			wrapped = ContextInvokerCreator({
				unboxed, // 向封裝函數提供unboxed函數
			}, function (/** @type {any} */ thiz, /** @type {readonly any[]} */ args, /** @type {(new (...args: any) => any) | undefined} */ newTarget) {
				return newTarget
					// @ts-ignore
					? Reflect.construct(this.unboxed, args, newTarget)
					// @ts-ignore
					: Reflect.apply(this.unboxed, thiz, args);
			});

			// 設置暴露器
			wrapped[SandboxExposer] = (/** @type {symbol} */ signal) => {
				if (signal === NativeWrapper.#unboxedFunction)
					return unboxed;
			};

			// 構造原型鏈
			Reflect.setPrototypeOf(wrapped, prototype);
			NativeWrapper.#boxedMap.set(unboxed, wrapped);
		}

		NativeWrapper.#boxedSet.add(wrapped);
		return wrapped;
	}

	/**
	 * ```plain
	 * 將回調函數進行拆箱
	 * ```
	 * 
	 * @param {Function} boxed 
	 * @returns 
	 */
	static unboxCallback(boxed) {
		if (!NativeWrapper.#boxedSet.has(boxed))
			return boxed;

		// 通過暴露器獲取原始函數
		return boxed[SandboxExposer]
			(NativeWrapper.#unboxedFunction);
	}
}

// 執行上下文傳遞函數，請勿動喵
// 用於傳遞頂級execute context

/** @type {(target: Function, thiz: Object, args: Array) => any} */
// @ts-ignore
const ContextInvoker1 = window.replacedCI1;

/** @type {(target: Function, args: Array, newTarget: Function) => any} */
// @ts-ignore
const ContextInvoker2 = window.replacedCI2;

/** @type {(closure: Object, target: Function) => ((...args: any[]) => any)} */
// @ts-ignore
const ContextInvokerCreator = window.replacedCIC;

/**
 * ```plain
 * 管理每個運行域對於其封送對象的 Monitor
 * 
 * 非暴露類
 * ```
 */
class DomainMonitors {
	/** @type {WeakMap<Domain, DomainMonitors>} */
	static #domainMonitors = new WeakMap();

	/** @type {WeakMap<Object, Record<number, Set<Monitor>>>} */
	#targetMonitorsMap = new WeakMap();
	/** @type {WeakMap<Domain, Record<number, Set<Monitor>>>} */
	#monitorsMap = new WeakMap();

	/**
	 * ```plain
	 * 在當前運行域安裝一個 Monitor
	 * ```
	 * 
	 * @param {DomainMonitors} thiz 
	 * @param {Monitor} monitor 
	 */
	static #installMonitor = function (thiz, monitor) {
		// 解構 Monitor 相關條件
		// @ts-ignore
		const [
			actions,
			allowDomains,
			disallowDomains,
			targets,
		] = Monitor[SandboxExposer2]
				(SandboxSignal_ExposeInfo, monitor);

		/**
		 * @param {{ [x: number]: Set<Monitor>; }} actionMap
		 */
		function addToActionMap(actionMap) {
			for (const action of actions) {
				let monitorMap = actionMap[action];

				if (!monitorMap)
					monitorMap = actionMap[action] = new Set();

				monitorMap.add(monitor);
			}
		}

		// 如果指定了目標，使用目標 Monitor 集合
		// 以此對於特定對象的 Monitor 進行性能優化
		if (targets) {
			for (const target of targets) {
				let actionMap = thiz.#targetMonitorsMap.get(target);

				if (!actionMap)
					thiz.#targetMonitorsMap.set(target, actionMap = {});

				// 根據 actions 添加到不同的觸發器集合
				addToActionMap(actionMap);
			}

			return;
		}

		const domainList = [];

		if (!allowDomains) {
			// 取運行域補集
			// @ts-ignore
			const totalDomains = new Set(Domain[SandboxExposer2]
				(SandboxSignal_ListDomain));
			totalDomains.delete(monitor.domain);

			if (disallowDomains)
				for (const domain of disallowDomains)
					totalDomains.delete(domain);

			domainList.push(...totalDomains);
		} else
			domainList.push(...allowDomains);

		// 根據允許的運行域安裝 Monitor
		for (const domain of domainList) {
			let actionMap = thiz.#monitorsMap.get(domain);

			if (!actionMap)
				thiz.#monitorsMap.set(domain, actionMap = {});

			// 根據 actions 添加到不同的觸發器集合
			addToActionMap(actionMap);
		}
	}

	/**
	 * ```plain
	 * 從當前運行域卸載一個 Monitor
	 * ```
	 *
	 * @param {DomainMonitors} thiz 
	 * @param {Monitor} monitor 
	 */
	static #uninstallMonitor = function (thiz, monitor) {
		// 解構 Monitor 相關條件
		// @ts-ignore
		const [
			actions,
			allowDomains,
			disallowDomains,
			targets,
		] = Monitor[SandboxExposer2]
				(SandboxSignal_ExposeInfo, monitor);

		/**
		 * @param {{ [x: number]: Set<Monitor>; }} actionMap
		 */
		function removeFromActionMap(actionMap) {
			for (const action of actions) {
				const monitorMap = actionMap[action];

				if (!monitorMap)
					continue;

				monitorMap.delete(monitor);
			}
		}

		// 對於指定了目標的 Monitor 特殊處理
		if (targets) {
			for (const target of targets) {
				const actionMap = thiz.#targetMonitorsMap.get(target);

				if (!actionMap)
					continue;

				// 根據 actions 從不同的觸發器集合移除
				removeFromActionMap(actionMap);
			}

			return;
		}

		const domainList = [];

		if (!allowDomains) {
			// 取運行域補集
			// @ts-ignore
			const totalDomains = new Set(Domain[SandboxExposer2]
				(SandboxSignal_ListDomain));

			if (disallowDomains)
				for (const domain of disallowDomains)
					totalDomains.delete(domain);

			domainList.push(...totalDomains);
		} else
			domainList.push(...allowDomains);

		// 根據允許的運行域卸載 Monitor
		for (const domain of domainList) {
			const actionMap = thiz.#monitorsMap.get(domain);

			if (!actionMap)
				continue;

			// 根據 actions 從不同的觸發器集合移除
			removeFromActionMap(actionMap);
		}
	}

	/**
	 * ```plain
	 * 獲取當前運行域封送到目標運行域的所有符合條件的 Monitor
	 * ```
	 * 
	 * @param {Domain} sourceDomain 
	 * @param {Domain} targetDomain 
	 * @param {number} action 
	 * @param {Object} target 
	 * @returns {Array<Monitor>?} 
	 */
	static #getMonitorsBy = function (sourceDomain, targetDomain, action, target) {
		const instance = DomainMonitors.#domainMonitors.get(sourceDomain);

		if (!instance)
			return null;

		const targetActionMap = instance.#targetMonitorsMap.get(target);
		const targetMonitors = targetActionMap && targetActionMap[action];
		const actionMap = instance.#monitorsMap.get(targetDomain);
		const actionMonitors = actionMap && actionMap[action];

		let array = null;

		if (targetMonitors)
			array = [...targetMonitors]; // 優先執行指定目標的 Monitor

		if (actionMonitors) {
			if (!array)
				array = [...actionMonitors];
			else
				array.push(...actionMonitors);
		}

		return array;
	}

	/**
	 * ```plain
	 * 對新的運行域進行 Monitor 安裝
	 * ```
	 * 
	 * @param {DomainMonitors} thiz 
	 * @param {Domain} domain 
	 */
	static #handleNewDomain = function (thiz, domain) {
		let actionMap = thiz.#monitorsMap.get(domain);

		// 遍歷所有啟用的 Monitor
		for (const monitor of
			// @ts-ignore
			Monitor[SandboxExposer2](SandboxSignal_ListMonitor)) {
			if (monitor.domain === domain)
				continue;

			// 解構 Monitor 相關條件
			const [
				actions,
				allowDomains,
				disallowDomains,
				targets,
			] = Monitor[SandboxExposer2]
					(SandboxSignal_ExposeInfo, monitor);

			// 指定了目標的 Monitor 不參與新運行域處理
			if (targets)
				continue;

			// 判斷新增的 Domain 是否是 Monitor 監聽的目標
			if (allowDomains
				&& !allowDomains.has(domain))
				continue;
			if (disallowDomains
				&& disallowDomains.has(domain))
				continue;

			// 根據 actions 添加到不同的觸發器集合
			if (!actionMap)
				thiz.#monitorsMap.set(domain, actionMap = {});

			for (const action of actions) {
				let monitors = actionMap[action];

				if (!monitors)
					monitors = actionMap[action] = new Set();

				monitors.add(monitor);
			}
		}
	}

	/**
	 * ```plain
	 * 處理新的運行域
	 * ```
	 * 
	 * @param {Domain} newDomain 
	 */
	static handleNewDomain(newDomain) {
		// @ts-ignore
		const totalDomains = new Set(Domain[SandboxExposer2]
			(SandboxSignal_ListDomain));

		for (const domain of totalDomains) {
			const instance = DomainMonitors.#domainMonitors.get(domain);

			if (!instance)
				continue;

			DomainMonitors.#handleNewDomain(instance, newDomain);
		}
	}

	/**
	 * ```plain
	 * 分發 Monitor 監聽事件
	 * ```
	 *
	 * @param {Domain} sourceDomain 
	 * @param {Domain} targetDomain 
	 * @param {number} action 
	 * @param {Array} args 
	 * @returns 
	 */
	static dispatch(sourceDomain, targetDomain, action, args) {
		const nameds = {};
		let indexMap;

		// 構造命名參數
		switch (action) {
			case AccessAction.CALL:
				indexMap = {
					target: 0,
					thisArg: 1,
					arguments: 2,
				};
				break;
			case AccessAction.NEW:
				indexMap = {
					target: 0,
					arguments: 1,
					newTarget: 2,
				};
				break;
			case AccessAction.DEFINE:
				indexMap = {
					target: 0,
					property: 1,
					descriptor: 2,
				};
				break;
			case AccessAction.DELETE:
			case AccessAction.DESCRIBE:
			case AccessAction.EXISTS:
				indexMap = {
					target: 0,
					property: 1,
				};
				break;
			case AccessAction.READ:
				indexMap = {
					target: 0,
					property: 1,
					receiver: 2,
				};
				break;
			case AccessAction.TRACE:
			case AccessAction.LIST:
			case AccessAction.SEAL:
				indexMap = {
					target: 0,
				};
				break;
			case AccessAction.WRITE:
				indexMap = {
					target: 0,
					property: 1,
					value: 2,
					receiver: 3,
				};
				break;
			case AccessAction.META:
				indexMap = {
					target: 0,
					prototype: 1,
				};
				break;
			default:
				throw new TypeError("不支持的訪問操作");
		}

		for (const key in indexMap)
			nameds[key] = args[indexMap[key]];

		Object.freeze(indexMap);
		Object.freeze(nameds);

		// 獲取可能的 Monitor 集合
		const monitorMap = DomainMonitors.#getMonitorsBy(
			sourceDomain, targetDomain, action, args[0]);

		const result = {
			preventDefault: false,
			stopPropagation: false,
			returnValue: undefined,
		};

		if (!monitorMap || !monitorMap.length)
			return result;

		const access = {
			domain: targetDomain,
			action,
		};

		const control = Object.freeze({
			preventDefault() {
				result.preventDefault = true;
			},
			stopPropagation() {
				result.stopPropagation = true;
			},
			/**
			 * @param {string} name
			 * @param {any} value
			 */
			overrideParameter(name, value) {
				if (!(name in indexMap))
					throw new TypeError(`參數 ${name} 沒有找到`);

				args[indexMap[name]] = value;
			},
			/**
			 * @param {undefined} value
			 */
			setReturnValue(value) {
				result.returnValue = value;
			},
			throwDenied(message = null) {
				throw new RangeError(message || "封送對象的源運行域禁止了此項操作");
			},
		});

		// 遍歷並嘗試分發監聽事件
		for (const monitor of monitorMap) {
			Monitor[SandboxExposer2]
				(SandboxSignal_DiapatchMonitor, monitor, access, nameds, control);

			if (result.stopPropagation)
				break;
		}

		return result;
	}

	/**
	 * ```plain
	 * 安裝一個 Monitor 監控
	 * ```
	 * 
	 * @param {Monitor} monitor 
	 */
	static installMonitor(monitor) {
		const domain = monitor.domain;
		let instance = DomainMonitors.#domainMonitors.get(domain);

		if (!instance)
			DomainMonitors.#domainMonitors
				.set(domain, instance = new DomainMonitors());

		DomainMonitors.#installMonitor(instance, monitor);
	}

	/**
	 * ```plain
	 * 卸載一個 Monitor 監控
	 * ```
	 *
	 * @param {Monitor} monitor 
	 */
	static uninstallMonitor(monitor) {
		const domain = monitor.domain;
		const instance = DomainMonitors.#domainMonitors.get(domain);

		if (instance)
			DomainMonitors.#uninstallMonitor(instance, monitor);
	}
}

/**
 * ```plain
 * 提供封送對象的行為監控
 * 
 * 可以對具體的行為、訪問的屬性進行監控並更改行為
 * 
 * 例如監聽 dummy 這個對象的 value 屬性在運行域 domain 的修改行為:
 * ```
 * ```javascript
 * const monitor = new Monitor();
 * monitor.allow(domain); // 指定監聽 domain 運行域
 * monitor.action(AccessAction.WRITE); // 指定監聽 Reflect.set 行為
 * monitor.require("target", dummy); // 指定監聽 dummy 對象
 * monitor.require("property", "value"); // 指定監聽 value 屬性
 * monitor.filter((access, nameds) => nameds.value >= 0); // 過濾掉大於等於 0 的修改
 * monitor.then((access, nameds, control) => {
 *     control.overrideParameter("value", 0); // 將要修改的新值改回 0
 * });
 * monitor.start(); // 啟動Monitor
 * ```
 */
class Monitor {
	/** @type {Set<Monitor>} */
	static #monitorSet = new Set();

	/** @type {Domain} */
	#domain;
	/** @type {Set<Domain>?} */
	#allowDomains = null;
	/** @type {Set<Domain>?} */
	#disallowDomains = null;
	/** @type {Set<number>} */
	#actions = new Set();
	/** @type {Record<string, Set>} */
	#checkInfo = {};
	/** @type {Function?} */
	#filter = null;
	/** @type {Function?} */
	#handler = null;

	constructor() {
		this.#domain = Domain.current;
	}

	/**
	 * ```plain
	 * 檢查當前是否是 Monitor 所屬的運行域
	 * ```
	 * 
	 * @param {Monitor} thiz 
	 */
	static #assertOperator = function (thiz) {
		if (thiz.#domain !== Domain.current)
			throw new Error("當前不是 Monitor 所屬的運行域");
	}

	/**
	 * ```plain
	 * 獲取 Monitor 所屬的運行域
	 * ```
	 */
	get domain() {
		return this.#domain;
	}

	/**
	 * ```plain
	 * 指定 Monitor 可以監聽的運行域
	 * 默認監聽封送到的所有運行域
	 * ```
	 * 
	 * @param  {...Domain} domains 
	 * @returns {this} 
	 */
	allow(...domains) {
		Monitor.#assertOperator(this);

		// 參數檢查
		if (this.isStarted)
			throw new Error("Monitor 在啟動期間不能修改");
		if (!domains.length)
			throw new TypeError("運行域至少要有一個");

		for (const domain of domains) {
			if (!(domain instanceof Domain))
				throw new TypeError("無效的運行域");
			if (domain === this.#domain)
				throw new TypeError("Monitor 不能監聽自己");
		}

		// 使用黑白名單
		if (this.#allowDomains) {
			for (const domain of domains)
				this.#allowDomains.add(domain);
		} else if (this.#disallowDomains) {
			for (const domain of domains)
				this.#disallowDomains.delete(domain);
		} else
			this.#allowDomains = new Set(domains);

		return this;
	}

	/**
	 * ```plain
	 * 指定 Monitor 不可監聽的運行域
	 * 默認監聽封送到的所有運行域
	 * ```
	 * 
	 * @param  {...Domain} domains 
	 * @returns {this} 
	 */
	disallow(...domains) {
		Monitor.#assertOperator(this);

		// 參數檢查
		if (this.isStarted)
			throw new Error("Monitor 在啟動期間不能修改");
		if (!domains.length)
			throw new TypeError("運行域至少要有一個");

		for (const domain of domains)
			if (!(domain instanceof Domain))
				throw new TypeError("無效的運行域");

		// 使用黑白名單
		if (this.#disallowDomains) {
			for (const domain of domains)
				this.#disallowDomains.add(domain);
		} else if (this.#allowDomains) {
			for (const domain of domains)
				this.#allowDomains.delete(domain);
		} else
			this.#disallowDomains = new Set(domains);

		return this;
	}

	/**
	 * ```plain
	 * 指定 Monitor 監聽的訪問動作
	 * ```
	 * 
	 * @param  {...number} action 
	 * @returns {this} 
	 */
	action(...action) {
		Monitor.#assertOperator(this);

		// 參數檢查
		if (this.isStarted)
			throw new Error("Monitor 在啟動期間不能修改");
		if (action.length == 0
			|| !action.every(AccessAction.isAccessAction))
			throw new TypeError("無效的訪問動作");

		for (const item of action)
			this.#actions.add(item);

		return this;
	}

	/**
	 * 
	 * @typedef {"target" | "thisArg" | "arguments" 
	 *     | "newTarget" | "property" | "descriptor" 
	 *     | "receiver" | "prototype" | "value"
	 * } PropertyKey
	 * 
	 * @typedef {{
	 *     domain: Domain,
	 *     action: number,
	 * }} Access
	 * 
	 * @typedef {{
	 *     target: Object,
	 *     thisArg?: Object,
	 *     arguments?: Array<any>,
	 *     newTarget?: Function,
	 *     property?: string | symbol,
	 *     descriptor?: {
	 *         value?: any,
	 *         writable?: boolean,
	 *         get?: () => any,
	 *         set?: (value: any) => void,
	 *         enumerable?: boolean,
	 *         configurable?: boolean,
	 *     },
	 *     receiver?: Object,
	 *     prototype?: Object,
	 *     value?: any,
	 * }} Nameds
	 * 
	 * @typedef {{
	 *     preventDefault: () => void,
	 *     stopPropagation: () => void,
	 *     overrideParameter: (name: PropertyKey, value: any) => void,
	 *     setReturnValue: (value: any) => void,
	 *     throwDenied: (message?: string) => never,
	 * }} Control
	 * 
	 */

	/**
	 * ```plain
	 * 指定 Monitor 監聽的命名參數
	 * 
	 * 命名參數可能如下:
	 * target: 監聽的對象，訪問動作：所有
	 * thisArg: 調用的this對象，訪問動作：CALL
	 * arguments: 調用的參數，訪問動作：CALL, NEW
	 * newTarget: 構造的new.target，訪問動作：NEW
	 * property: 訪問的屬性，訪問動作：DEFINE, DELETE, DESCRIBE, EXISTS, READ, WRITE
	 * descriptor: 定義的屬性描述符，訪問動作：DEFINE
	 * receiver: 設置或讀取的this對象，訪問動作：READ, WRITE
	 * prototype: 定義的原型，訪問動作：META
	 * value: 設置的新值，訪問動作：WRITE
	 * ```
	 * 
	 * @param {PropertyKey} name 命名參數名稱
	 * @param  {...any} values 命名參數可能的值
	 * @returns {this} 
	 */
	require(name, ...values) {
		Monitor.#assertOperator(this);

		if (this.isStarted)
			throw new Error("Monitor 在啟動期間不能修改");
		if (typeof name != "string")
			throw new TypeError("無效的檢查名稱");
		if (!values.length)
			return this;

		let info = this.#checkInfo[name];

		if (!info)
			info = this.#checkInfo[name] = new Set();

		for (const value of values)
			info.add(value);

		return this;
	}

	/**
	 * ```plain
	 * 指定 Monitor 監聽的過濾器
	 * 
	 * 回調參數 nameds 是一個對象，包含了 Monitor 監聽的命名參數
	 * ```
	 * 
	 * @param {(access: Access, nameds: Nameds) => boolean} filter 要指定的過濾器
	 * @returns {this} 
	 */
	filter(filter) {
		Monitor.#assertOperator(this);

		if (this.isStarted)
			throw new Error("Monitor 在啟動期間不能修改");
		if (typeof filter != "function")
			throw new TypeError("無效的過濾器");

		this.#filter = filter;
		return this;
	}

	/**
	 * ```plain
	 * 指定 Monitor 監聽的回調函數
	 * 
	 * 回調參數 nameds 是一個對象，包含了 Monitor 監聽的命名參數
	 * 回調參數 control 是一個對象，提供本次監聽的控制函數
	 * control.preventDefault(value) 阻止默認的行為，並將設定的返回值作為本次代理訪問的返回值
	 * control.stopPropagation() 阻斷後續的監聽器，但不會阻止默認行為
	 * control.overrideParameter(name, value) 覆蓋本次監聽的命名參數
	 * control.setReturnValue(value) 設置本次代理訪問的返回值，可以覆蓋之前監聽器設置的返回值
	 * ```
	 * 
	 * @param {(access: Access, nameds: Nameds, control: Control) => void} handler 
	 * @returns {this} 
	 */
	then(handler) {
		Monitor.#assertOperator(this);

		if (this.isStarted)
			throw new Error("Monitor 在啟動期間不能修改");
		if (typeof handler != "function")
			throw new TypeError("無效的回調");

		this.#handler = handler;
		return this;
	}

	/**
	 * ```plain
	 * 判斷 Monitor 是否已經啟動
	 * ```
	 * 
	 * @type {boolean}
	 */
	get isStarted() {
		return Monitor.#monitorSet.has(this);
	}

	/**
	 * ```plain
	 * 啟動 Monitor
	 * ```
	 */
	start() {
		Monitor.#assertOperator(this);

		if (this.isStarted)
			throw new Error("Monitor 已經啟動");
		if (typeof this.#handler != "function")
			throw new Error("Monitor 未指定回調函數");

		Monitor.#monitorSet.add(this);
		DomainMonitors.installMonitor(this);
	}

	/**
	 * ```plain
	 * 停止 Monitor
	 * ```
	 */
	stop() {
		Monitor.#assertOperator(this);

		if (!this.isStarted)
			throw new Error("Monitor 還未啟動");

		DomainMonitors.uninstallMonitor(this);
		Monitor.#monitorSet.delete(this);
	}

	/**
	 * ```plain
	 * 向外暴露 Monitor 監聽的相關數據
	 * ```
	 * 
	 * @param {Monitor} thiz 
	 */
	static #exposeInfo = function (thiz) {
		return [
			thiz.#actions,
			thiz.#allowDomains,
			thiz.#disallowDomains,
			thiz.#checkInfo["target"],
		];
	}

	/**
	 * ```plain
	 * 檢查 Monitor 監聽的命名參數是否符合要求
	 * ```
	 * 
	 * @param {Record<string, any>} nameds 
	 * @param {Record<string, Set>} checkInfo 
	 */
	static #check = function (nameds, checkInfo) {
		for (const [key, value] of Object.entries(nameds)) {
			if (key in checkInfo) {
				if (!checkInfo[key].has(value))
					return false;
			}
		}

		return true;
	}

	/**
	 * ```plain
	 * 處理 Monitor 監聽事件
	 * ```
	 * 
	 * @param {Monitor} thiz
	 * @param {number} access
	 * @param {Nameds} nameds 
	 * @param {Control} control 
	 */
	static #handle = function (thiz, access, nameds, control) {
		if (!Monitor.#check(nameds, thiz.#checkInfo))
			return;

		const filter = thiz.#filter;
		if (typeof filter === 'function' && !filter(access, nameds))
			return;

		if (typeof thiz.#handler !== 'function')
			throw new TypeError("Monitor 未指定回調函數");

		thiz.#handler(access, nameds, control);
	}

	/**
	 * @param {Symbol} signal 
	 * @param  {...any} args 
	 */
	static [SandboxExposer2](signal, ...args) {
		switch (signal) {
			case SandboxSignal_DiapatchMonitor:
				// @ts-ignore
				return Monitor.#handle(...args);
			case SandboxSignal_ListMonitor:
				return Monitor.#monitorSet;
			case SandboxSignal_ExposeInfo:
				// @ts-ignore
				return Monitor.#exposeInfo(...args);
		}
	}
}

/**
 * ```plain
 * 提供運行域之間的對象封送
 * ```
 */
class Marshal {
	static #revertTarget = Symbol("Marshal.revertTarget");
	static #sourceDomain = Symbol("Marshal.sourceDomain");

	static #marshalRules = new WeakMap();
	static #marshalledProxies = new WeakSet();

	constructor() {
		throw new TypeError("Marshal 類無法被構造");
	}

	/**
	 * ```plain
	 * 判斷是否應該封送
	 * ```
	 * 
	 * @param {any} obj 
	 * @returns {boolean} 
	 */
	static #shouldMarshal = function (obj) {
		if (obj === Marshal
			|| obj === Rule
			|| obj === AccessAction
			|| obj === Domain
			|| obj === Sandbox
			|| obj instanceof Domain)
			return false;

		return true;
	}

	/**
	 * ```plain
	 * 判斷是否禁止封送
	 * ```
	 *
	 * @param {any} obj 
	 * @returns {boolean} 
	 */
	static #strictMarshal = function (obj) {
		return obj instanceof Sandbox
			|| obj instanceof Rule
			|| obj instanceof Monitor;
	}

	/**
	 * ```plain
	 * 拆除封送代理
	 * ```
	 * 
	 * @typedef {[ 
	 *     Domain,
	 *     Object,
	 * ]} Reverted
	 * 
	 * @param {any} proxy 
	 * @returns {Reverted}
	 */
	static #revertProxy = function (proxy) {
		return [
			proxy[Marshal.#sourceDomain],
			proxy[Marshal.#revertTarget],
		];
	}

	/**
	 * ```plain
	 * 檢查封送緩存
	 * ```
	 * 
	 * @param {Object} obj 
	 * @param {Domain} domain 
	 * @returns {Object?} 
	 */
	static #cacheProxy = function (obj, domain) {
		return domain[SandboxExposer]
			(SandboxSignal_GetMarshalledProxy, obj);
	}

	/**
	 * ```plain
	 * 獲取指定對象的封送規則引用
	 * ```
	 * 
	 * @param {Object} obj 
	 * @returns {{rule: Rule}} 
	 */
	static #ensureRuleRef = function (obj) {
		let rule = Marshal.#marshalRules.get(obj);

		if (!rule)
			Marshal.#marshalRules.set(obj, rule = { rule: null });

		return rule;
	}

	/**
	 * ```plain
	 * 判斷某個對象是否指定了封送規則
	 * ```
	 * 
	 * @param {Object} obj 
	 * @returns {boolean} 
	 */
	static hasRule(obj) {
		return Marshal.#marshalRules.has(obj);
	}

	/**
	 * ```plain
	 * 指定某個對象的封送規則
	 * ```
	 * 
	 * @param {Object} obj 
	 * @param {Rule} rule 
	 */
	static setRule(obj, rule) {
		if (Marshal.#marshalledProxies.has(obj))
			throw new ReferenceError("無法為封送對象設置封送規則");

		const ref = Marshal.#ensureRuleRef(obj);

		if (ref.rule)
			throw new ReferenceError("對象的封送規則已經被設置");

		ref.rule = rule;
	}

	/**
	 * ```plain
	 * 判斷某個對象是否是其他運行域被封送的對象
	 * ```
	 * 
	 * @param {Object} obj 
	 * @returns {boolean} 
	 */
	static isMarshalled(obj) {
		return Marshal.#marshalledProxies.has(obj);
	}

	/**
	 * ```plain
	 * 獲取封送對象的源運行域
	 * ```
	 * 
	 * @param {Object} obj 
	 * @returns {Domain?} 
	 */
	static getMarshalledDomain(obj) {
		if (!Marshal.#marshalledProxies.has(obj))
			return null;

		const [domain,] = Marshal.#revertProxy(obj);
		return domain;
	}

	/**
	 * ```plain
	 * 對於封送或未封送的函數執行轉字符串操作
	 * ```
	 * 
	 * @param {Function} func 
	 */
	static decompileFunction(func) {
		if (typeof func !== "function")
			throw new TypeError("無效的函數對象");

		if (Marshal.#marshalledProxies.has(func))
			[, func] = Marshal.#revertProxy(func);

		const refs = Sandbox[SandboxExposer2]
			(SandboxSignal_TryFunctionRefs, func);

		if (refs)
			return refs;

		return Function.prototype.toString.call(func);
	}

	/**
	 * ```plain
	 * 判斷給定的參數列表和函數體字符串是否可以構造一個合法的函數
	 * ```
	 * 
	 * @typedef {"async"|"generator"|"agenerator"|"any"|null} FunctionType
	 * 
	 * @param {string|string[]} paramList 
	 * @param {string} funcBody 
	 * @param {FunctionType} [type = null]
	 */
	static canCreateFunction(paramList, funcBody, type = null) {
		if (Array.isArray(paramList))
			paramList = paramList.join(",");

		if (type == "any") {
			return (
				["async", "generator", "agenerator", null]
					// @ts-ignore // 突然發現ts-ignore也挺方便的喵
					.some(t => Marshal.canCreateFunction(t, paramList, funcBody))
			);
		}

		try {
			switch (type) {
				default:
					new Function(paramList, funcBody);
					break;
				case "generator":
					new GeneratorFunction(paramList, funcBody);
					break;
				case "async":
					new AsyncFunction(paramList, funcBody);
					break;
				case "agenerator":
					new AsyncGeneratorFunction(paramList, funcBody);
					break;
			}
		} catch (e) {
			return false;
		}

		return true;
	}

	/**
	 * ```plain
	 * 陷入某個運行域並執行代碼
	 * ```
	 * 
	 * @param {Domain} domain 
	 * @param {() => any} action 
	 */
	static #trapDomain = function (domain, action) {
		const prevDomain = Domain.current;

		// 如果可能，應該儘量避免陷入相同運行域
		if (prevDomain === domain)
			return console.warn("trapDomain 處於相同 domain"), action();

		Domain[SandboxExposer2](SandboxSignal_EnterDomain, domain);

		try {
			return action();
		} catch (e) {
			throw Marshal.#marshal(e, prevDomain);
		} finally {
			Domain[SandboxExposer2](SandboxSignal_ExitDomain);
		}
	}

	/**
	 * ```plain
	 * 封送數組
	 * ```
	 * 
	 * @param {Array} array 
	 * @param {Domain} targetDomain 
	 * @returns {Array} 
	 */
	static #marshalArray = function (array, targetDomain) {
		if (isPrimitive(array))
			return array;

		// 構造目標域的數組，並逐個元素封送
		const window = targetDomain[SandboxExposer](SandboxSignal_GetWindow);
		const newArray = new window.Array(array.length);

		for (let i = 0; i < newArray.length; i++)
			newArray[i] = Marshal.#marshal(array[i], targetDomain);

		return newArray;
	}

	/**
	 * ```plain
	 * 封送對象
	 * ```
	 * 
	 * @param {Object} object 
	 * @param {Domain} targetDomain 
	 * @returns {Object} 
	 */
	static #marshalObject = function (object, targetDomain) {
		if (isPrimitive(object))
			return object;

		// 構造目標域的對象，並逐個屬性封送
		const window = targetDomain[SandboxExposer](SandboxSignal_GetWindow);
		const newObject = new window.Object();

		for (const key of Reflect.ownKeys(object))
			newObject[key] = Marshal.#marshal(object[key], targetDomain);

		return newObject;
	}

	/**
	 * ```plain
	 * 根據目標對象的特徵複製一個基本對象
	 * ```
	 * 
	 * @param {Object} src 
	 * @returns {any} 
	 */
	static #clonePureObject = function (src) {
		let cloned;

		if (typeof src === "function") {
			const descriptor = Reflect.getOwnPropertyDescriptor(src, "prototype");
			if (descriptor
				&& descriptor.value
				&& !descriptor.enumerable
				&& !descriptor.configurable)
				cloned = function () { };
			else
				cloned = () => { };
		} else if (Array.isArray(src))
			cloned = [];
		else
			cloned = {};

		Reflect.setPrototypeOf(cloned, null);
		return cloned;
	}

	/**
	 * ```plain
	 * 封送核心函數
	 * ```
	 * 
	 * @param {Object} obj 
	 * @param {Domain} targetDomain 
	 * @returns {Object} 
	 */
	static #marshal = function (obj, targetDomain) {
		// 基元封送
		if (isPrimitive(obj))
			return obj;

		// 嘗試拆除代理
		let [sourceDomain, target] =
			Marshal.#marshalledProxies.has(obj)
				? Marshal.#revertProxy(obj)
				: [Domain.current, obj];

		// target: 確保拆除了封送代理的對象
		// sourceDomain: target所屬的運行域
		// targetDomain: 要封送到的運行域

		if (sourceDomain === targetDomain)
			return target;

		// 檢查基本封送條件
		if (Marshal.#strictMarshal(target)
			|| sourceDomain.isUnsafe(target))
			throw new TypeError("對象無法封送");
		if (!Marshal.#shouldMarshal(target))
			return target;

		// 全局變量封送
		const mapped = Globals.mapTo(target, sourceDomain, targetDomain);

		if (mapped != null)
			return mapped;

		// 錯誤封送
		if (sourceDomain.isError(target)) {
			// 把源錯誤對象克隆到目標運行域
			const errorCtor = target.constructor;
			const mappedCtor = Globals.mapTo(errorCtor, sourceDomain, targetDomain);

			// // 立即報告錯誤，而不是通過封送報錯
			// const window = Domain.topDomain[SandboxExposer](SandboxSignal_GetWindow);
			// window.onunhandledrejection && window.onunhandledrejection({ promise: Promise.reject(target) });

			if (mappedCtor) {
				const newError = new mappedCtor();
				const silentAccess = (o, p, d) => {
					try {
						if (typeof p == "function")
							return p(o);
						else
							return o[p];
					} catch (e) {
						return d;
					}
				};
				const pinValue = (o, p, v) => {
					Reflect.defineProperty(o, p, {
						get: () => v,
						set: () => { },
						configurable: false,
					});
				};

				const name = String(silentAccess(target, "name", "#無法獲取錯誤名#"));
				const message = String(silentAccess(target, "message", "#無法獲取錯誤消息#"));
				const stack = String(silentAccess(target, "stack", "#無法獲取調用棧#"));
				const string = silentAccess(target, String, "#無法獲取錯誤信息#");

				pinValue(newError, "name", name);
				pinValue(newError, "message", message);
				pinValue(newError, "stack", stack);
				pinValue(newError, "toString", () => string);

				// 繼承原本的錯誤信息
				const errorReporter = ErrorManager.getErrorReporter(target);
				ErrorManager.setErrorReporter(newError,
					errorReporter || new ErrorReporter(target)); // 無論有沒有都捕獲當前的錯誤信息

				return newError;
			}
		}

		// 檢查封送權限
		const ruleRef = Marshal.#ensureRuleRef(target); // 為加快訪問速度使用了引用
		const rule = ruleRef.rule;

		if (rule && !rule.canMarshalTo(targetDomain))
			throw new TypeError("無法將對象封送到目標運行域");

		// 檢查封送緩存
		const cached = Marshal.#cacheProxy(target, targetDomain);

		if (cached)
			return cached;

		// 創建一個空白對象，防止JavaScript的一些奇怪錯誤
		const pure = Marshal.#clonePureObject(target);

		// 創建封送代理
		const proxy = new Proxy(pure, {
			// 設置屬性方便調試
			// @ts-ignore
			$target: target,
			$sourceDomain: sourceDomain,
			$targetDomain: targetDomain,
			apply(_, thisArg, argArray) {
				const defaultApply = () => {
					const marshalledThis = Marshal.#marshal(thisArg, sourceDomain);
					const marshalledArgs = Marshal.#marshalArray(argArray, sourceDomain);

					return Marshal.#trapDomain(sourceDomain, () => {
						const rule = ruleRef.rule;

						if (rule && !rule.canAccess(AccessAction.CALL,
							target, marshalledThis, marshalledArgs))
							throw new ReferenceError("封送對象的源運行域禁止了此項操作");

						const args = [target, marshalledThis, marshalledArgs];
						const dispatched = DomainMonitors.dispatch(
							sourceDomain, targetDomain, AccessAction.CALL, args);

						if (dispatched.preventDefault)
							return Marshal.#marshal(dispatched.returnValue, targetDomain);

						// @ts-ignore
						const result = Reflect.apply(...args);
						return Marshal.#marshal(result, targetDomain);
					});
				};

				// 此處處理異步封送
				// 如果沒有逃逸情況，此處代表著當前是異步調用
				if (Domain.current !== targetDomain)
					return Marshal.#trapDomain(targetDomain, defaultApply);

				return defaultApply();
			},
			construct(_, argArray, newTarget) {
				const marshalledArgs = Marshal.#marshalArray(argArray, sourceDomain);
				const marshalledNewTarget = Marshal.#marshal(newTarget, sourceDomain);

				return Marshal.#trapDomain(sourceDomain, () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.NEW,
						target, argArray, newTarget))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target, marshalledArgs, marshalledNewTarget];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.NEW, args);

					if (dispatched.preventDefault)
						return Marshal.#marshal(dispatched.returnValue, targetDomain);

					// @ts-ignore
					const result = Reflect.construct(...args);
					return Marshal.#marshal(result, targetDomain);
				});
			},
			defineProperty(_, property, attributes) {
				const isSourceDomain = sourceDomain === Domain.current;

				if (!isSourceDomain) {
					let getter = attributes.get;
					let setter = attributes.set;

					if (typeof getter == "function")
						getter = Marshal.#marshal(getter, sourceDomain);
					if (typeof setter == "function")
						setter = Marshal.#marshal(setter, sourceDomain);

					const window = sourceDomain[SandboxExposer](SandboxSignal_GetWindow);
					const descriptor = new window.Object();

					if ("value" in attributes)
						descriptor.value = Marshal.#marshal(attributes.value, sourceDomain);
					if ("get" in attributes)
						descriptor.get = getter;
					if ("set" in attributes)
						descriptor.set = setter;
					if ("writable" in attributes)
						descriptor.writable = !!attributes.writable;
					if ("enumerable" in attributes)
						descriptor.enumerable = !!attributes.enumerable;
					if ("configurable" in attributes)
						descriptor.configurable = !!attributes.configurable;

					attributes = descriptor;
				}

				const domainTrapAction = () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.DEFINE,
						target, property, attributes))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target, property, attributes];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.DEFINE, args);

					if (dispatched.preventDefault)
						return !!dispatched.returnValue;

					// @ts-ignore
					const success = Reflect.defineProperty(...args);

					if (success && target === args[0]) {
						// 為適配JavaScript對於代理的強制要求
						// 我們要對空白對象模擬不可配置
						// @ts-ignore
						attributes = Reflect.getOwnPropertyDescriptor(...args);

						if (!attributes.configurable)
							Reflect.defineProperty(pure, args[1], attributes);
					}

					return success;
				};

				// `defineProperty`、`getOwnPropertyDescriptor`、`has` 都可能被JavaScript引擎重複調用
				// 故在執行之前，為避免 `trapDomain` 的警告，我們先進行一次判斷
				return isSourceDomain
					? domainTrapAction()
					: Marshal.#trapDomain(sourceDomain, domainTrapAction);
			},
			deleteProperty(_, p) {
				return Marshal.#trapDomain(sourceDomain, () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.DELETE, target, p))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target, p];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.DELETE, args);

					if (dispatched.preventDefault)
						return !!dispatched.returnValue;

					// @ts-ignore
					return Reflect.deleteProperty(...args);
				});
			},
			get(_, p, receiver) {
				// 因為 get 的東西最多，所以對此追加註釋
				// 其他的攔截器都是與 get 類似

				// 向外暴露封送
				switch (p) {
					case Marshal.#revertTarget:
						return target;
					case Marshal.#sourceDomain:
						return sourceDomain;
				}

				// 默認封送
				const marshalledReceiver = Marshal.#marshal(receiver, sourceDomain);

				// 陷入源運行域執行
				return Marshal.#trapDomain(sourceDomain, () => {
					// 獲取封送規則並檢查
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.READ,
						target, p, marshalledReceiver))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					// 通知 Monitor
					const args = [target, p, marshalledReceiver];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.READ, args);

					// 處理 Monitor 的結果
					if (dispatched.preventDefault)
						return Marshal.#marshal(dispatched.returnValue, targetDomain);

					// 執行默認流程
					// @ts-ignore
					const result = Reflect.get(...args);
					return Marshal.#marshal(result, targetDomain);
				});
			},
			getOwnPropertyDescriptor(_, p) {
				const isSourceDomain = Domain.current === sourceDomain;

				const domainTrapAction = () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.DESCRIBE, target, p))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target, p];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.DESCRIBE, args);

					if (dispatched.preventDefault)
						return dispatched.returnValue;

					// @ts-ignore
					return Reflect.getOwnPropertyDescriptor(...args);
				};

				if (isSourceDomain)
					return domainTrapAction();

				return Marshal.#trapDomain(sourceDomain, () => {
					const descriptor = domainTrapAction();
					return Marshal.#marshalObject(descriptor, targetDomain);
				});
			},
			getPrototypeOf(_) {
				return Marshal.#trapDomain(sourceDomain, () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.TRACE, target))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.TRACE, args);

					if (dispatched.preventDefault)
						return Marshal.#marshal(dispatched.returnValue, targetDomain);

					// @ts-ignore
					const result = Reflect.getPrototypeOf(...args);
					const marshalledResult = Marshal.#marshal(result, targetDomain);

					if (Marshal.#marshalledProxies.has(marshalledResult))
						return null; // 沒有實裝hasInstance喵，只能折中處理喵

					return marshalledResult;
				});
			},
			has(_, p) {
				const isSourceDomain = Domain.current === sourceDomain;
				const domainTrapAction = () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.EXISTS, target, p))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target, p];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.EXISTS, args);

					if (dispatched.preventDefault)
						return !!dispatched.returnValue;

					// @ts-ignore
					return Reflect.has(...args);
				};

				if (isSourceDomain)
					return domainTrapAction();

				return Marshal.#trapDomain(sourceDomain, domainTrapAction);
			},
			isExtensible(_) {
				return Reflect.isExtensible(target);
			},
			ownKeys(_) {
				return Marshal.#trapDomain(sourceDomain, () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.LIST, target))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.LIST, args);

					/** @type {Array} */
					let keys;

					if (dispatched.preventDefault) {
						if (!Array.isArray(dispatched.returnValue))
							throw new TypeError("`Reflect.ownKeys` 必須返回一個數組");

						keys = dispatched.returnValue;
					} else
						// @ts-ignore
						keys = Reflect.ownKeys(...args);

					return Marshal.#marshalArray(keys, targetDomain);
				});

			},
			preventExtensions(_) {
				return Marshal.#trapDomain(sourceDomain, () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.SEAL, target))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.SEAL, args);

					if (dispatched.preventDefault)
						return !!dispatched.returnValue;

					// @ts-ignore
					const success = Reflect.preventExtensions(...args);

					if (success && target === args[0]) {
						// 為適配JavaScript對於代理的強制要求
						// 我們要對空白對象進行模擬鍵
						Reflect.ownKeys(target).forEach(key => {
							pure[key] = undefined;
						});
						Reflect.preventExtensions(pure);
					}

					return success;
				});
			},
			set(_, p, newValue, receiver) {
				const marshalledNewValue = Marshal.#marshal(newValue, sourceDomain);
				const marshalledReceiver = Marshal.#marshal(receiver, sourceDomain);

				return Marshal.#trapDomain(sourceDomain, () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.WRITE,
						target, p, marshalledNewValue, marshalledReceiver))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target, p, marshalledNewValue, marshalledReceiver];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.WRITE, args);

					if (dispatched.preventDefault)
						return !!dispatched.returnValue;

					// @ts-ignore
					return Reflect.set(...args);
				});
			},
			setPrototypeOf(_, v) {
				const marshalledV = Marshal.#marshal(v, sourceDomain);

				if (Marshal.#marshalledProxies.has(marshalledV))
					return false; // 沒有實裝hasInstance喵，只能折中處理喵

				return Marshal.#trapDomain(sourceDomain, () => {
					const rule = ruleRef.rule;

					if (rule && !rule.canAccess(AccessAction.META, target, marshalledV))
						throw new ReferenceError("封送對象的源運行域禁止了此項操作");

					const args = [target, marshalledV];
					const dispatched = DomainMonitors.dispatch(
						sourceDomain, targetDomain, AccessAction.META, args);

					if (dispatched.preventDefault)
						return !!dispatched.returnValue;

					// @ts-ignore
					return Reflect.setPrototypeOf(...args);
				});
			},
		});

		Marshal.#marshalledProxies.add(proxy);
		targetDomain[SandboxExposer]
			(SandboxSignal_SetMarshalledProxy, target, proxy);
		return proxy;
	}

	/**
	 * @param {Symbol} signal 
	 * @param {...any} args 
	 */
	static [SandboxExposer2](signal, ...args) {
		switch (signal) {
			case SandboxSignal_Marshal:
				// @ts-ignore
				return Marshal.#marshal(...args);
			case SandboxSignal_MarshalArray:
				// @ts-ignore
				return Marshal.#marshalArray(...args);
			case SandboxSignal_UnpackProxy:
				// @ts-ignore
				return Marshal.#revertProxy(...args);
			case SandboxSignal_TrapDomain:
				// @ts-ignore
				return Marshal.#trapDomain(...args);
		}
	}
}

/**
 * ```plain
 * 運行域對象
 * 
 * 提供運行域的創建以及週期管理
 * ```
 */
class Domain {
	static #hasInstance = Object[Symbol.hasInstance];

	/** @type {Array<Domain>} */
	static #domainStack = [];
	/** @type {Domain} */
	static #currentDomain;
	/** @type {Domain} */
	static #topDomain;

	/** @type {Array<WeakRef<Domain>>} */
	static #domainLinks = [];

	#domainName = "top";

	/** @type {typeof Object} */
	#domainObject;
	/** @type {typeof Error} */
	#domainError;
	/** @type {typeof Promise} */
	#domainPromise;
	/** @type {typeof HTMLIFrameElement} */
	#domainIFrame;
	/** @type {Navigator} */
	#domainNavigator;
	/** @type {ServiceWorker} */
	#domainServiceWorker;
	/** @type {Location} */
	#domainLocation;
	/** @type {Function} */
	#domainOpen;
	/** @type {Function} */
	#domainClose;
	/** @type {typeof Worker} */
	#domainWorker;
	/** @type {Object} */
	#domainCSS;
	/** @type {typeof SharedWorker} */
	#domainSharedWorker;
	/** @type {Window} */
	#domainRoot;
	/** @type {WeakMap<Object, Proxy>} */
	#marshalledCached = new WeakMap();

	/** @type {(array: any) => boolean} */
	#domainIsArray;

	/**
	 * ```plain
	 * 創建運行域
	 * 
	 * 一般不直接使用，
	 * 請考慮使用直接創建沙盒
	 * ```
	 */
	constructor() {
		// @ts-ignore
		let global = window.replacedGlobal || window;

		if (Domain.#currentDomain) {
			// @ts-ignore
			if (!window.createRealms)
				throw new ReferenceError("Sandbox 載入時處於不安全運行域");

			// 創建新的運行變量域
			// @ts-ignore
			global = createRealms();
			this.#domainName = Math.random().toString(36).slice(2);
		} else
			NativeWrapper.initTopDomain(global);

		this.#domainRoot = global;
		this.#domainObject = global.Object;
		this.#domainError = global.Error;
		this.#domainPromise = global.Promise;
		this.#domainIFrame = global.HTMLIFrameElement;
		this.#domainNavigator = global.navigator;
		this.#domainServiceWorker = global.navigator.serviceWorker;
		this.#domainLocation = global.location;
		this.#domainOpen = global.open;
		this.#domainClose = global.close;
		this.#domainWorker = global.Worker;
		this.#domainCSS = global.CSS;
		this.#domainSharedWorker = global.SharedWorker;

		NativeWrapper.wrapInDomains(global);
		Globals.ensureDomainGlobals(this);
		DomainMonitors.handleNewDomain(this);
		Domain.#domainLinks.push(new WeakRef(this));
		sealObjectTree(this);
	}

	// 實裝這個要代理Object喵
	// static #hasInstanceMarshalled = function (obj) {
	//     if (Marshal.isMarshalled(obj))
	//         [, obj] = Marshal[SandboxExposer2]
	//             (SandboxSignal_UnpackProxy, obj);

	//     return Domain.#hasInstance.call(this, obj);
	// }

	/**
	 * ```plain
	 * 檢查對象是否來自於當前的運行域
	 * ```
	 * 
	 * @param {Object?} obj 
	 * @returns {boolean} 
	 */
	isFrom(obj) {
		if (Marshal.isMarshalled(obj)) {
			const [domain,] = Marshal[SandboxExposer2]
				(SandboxSignal_UnpackProxy, obj);
			return domain === this;
		}

		return Domain.#hasInstance
			.call(this.#domainObject, obj);
	}

	/**
	 * ```plain
	 * 檢查對象是否來自於當前的運行域的Promise
	 * ```
	 * 
	 * @param {Promise?} promise 
	 * @returns {boolean} 
	 */
	isPromise(promise) {
		if (Marshal.isMarshalled(promise))
			[, promise] = Marshal[SandboxExposer2]
				(SandboxSignal_UnpackProxy, promise);

		return Domain.#hasInstance
			.call(this.#domainPromise, promise);
	}

	/**
	 * ```plain
	 * 檢查對象是否來自於當前的運行域的Error
	 * ```
	 * 
	 * @param {Error?} error 
	 * @returns {boolean} 
	 */
	isError(error) {
		if (Marshal.isMarshalled(error))
			[, error] = Marshal[SandboxExposer2]
				(SandboxSignal_UnpackProxy, error);

		return Domain.#hasInstance
			.call(this.#domainError, error);
	}

	/**
	 * ```plain
	 * 檢查對象是否來自於當前的運行域的危險對象
	 * ```
	 * 
	 * @param {Object?} obj 
	 * @returns {boolean} 
	 */
	isUnsafe(obj) {
		if (Marshal.isMarshalled(obj))
			[, obj] = Marshal[SandboxExposer2]
				(SandboxSignal_UnpackProxy, obj);

		if (obj === this.#domainRoot)
			return true;
		if (Domain.#hasInstance.call(this.#domainIFrame, obj))
			return true;
		if (obj === this.#domainNavigator)
			return true;
		if (obj === this.#domainServiceWorker)
			return true;
		if (obj === this.#domainLocation)
			return true;
		if (obj === this.#domainOpen)
			return true;
		if (obj === this.#domainClose)
			return true;
		if (Domain.#hasInstance.call(this.#domainWorker, obj))
			return true;
		if (obj === this.#domainCSS)
			return true;
		if (Domain.#hasInstance.call(this.#domainSharedWorker, obj))
			return true;

		return false;
	}

	toString() {
		return `[Domain ${this.#domainName}]`;
	}

	/**
	 * ```plain
	 * 檢查對象是否是Promise對象
	 * ```
	 * 
	 * @param {Error?} error 
	 * @returns {boolean} 
	 */
	static isError(error) {
		if (error instanceof Error)
			return true;
		if (!Marshal.isMarshalled(error))
			return Domain.current.isError(error);

		const [domain, target] = Marshal[SandboxExposer2]
			(SandboxSignal_UnpackProxy, error);

		return target instanceof Error || domain.isError(target);
	}

	/**
	 * @param {Domain} domain 
	 */
	static #enterDomain = function (domain) {
		Domain.#domainStack.push(Domain.#currentDomain);
		Domain.#currentDomain = domain;
	}

	static #exitDomain = function () {
		if (Domain.#domainStack.length < 1)
			throw new ReferenceError("無法彈出更多的運行域");

		// @ts-ignore
		Domain.#currentDomain = Domain.#domainStack.pop();
	}

	/**
	 * @returns {Array<Domain>}
	 */
	static #listDomain = function () {
		const links = Domain.#domainLinks;
		const list = [];

		// 遍歷查詢並清除無效的運行域
		for (let i = links.length - 1; i >= 0; i--) {
			const link = links[i].deref();

			if (!link)
				links.splice(i, 1);

			list.push(link);
		}

		// @ts-ignore
		return list;
	}

	/**
	 * ```plain
	 * 獲取當前運行域
	 * ```
	 * 
	 * @type {Domain}
	 */
	static get current() {
		return Domain.#currentDomain;
	}

	/**
	 * ```plain
	 * 獲取調用鏈中上一個運行域
	 * ```
	 * 
	 * @type {Domain?}
	 */
	static get caller() {
		for (let i = Domain.#domainStack.length; i >= 0; i--) {
			const domain = Domain.#domainStack[i];

			if (domain !== Domain.#currentDomain)
				return domain;
		}

		return null;
	}

	/**
	 * ```plain
	 * 獲取頂級運行域
	 * ```
	 * 
	 * @type {Domain}
	 */
	static get topDomain() {
		return Domain.#topDomain;
	}

	/**
	 * ```plain
	 * 檢查當前的調用是否來自可信的運行域
	 * 
	 * 如果檢查頂級運行域，則要求沒有進行任何其他運行域的陷入
	 * 如果檢查非頂級運行域，則要求只有頂級運行域與給定運行域的陷入
	 * ```
	 * 
	 * @param {Domain} domain 
	 */
	static isBelievable(domain) {
		if (domain === Domain.#topDomain)
			return !Domain.#domainStack.length;

		return Domain.#domainStack.concat([Domain.#currentDomain])
			.every(d => d === Domain.#topDomain || d === domain);
	}

	/**
	 * @param {Symbol} signal 
	 * @param {...any} args 
	 */
	[SandboxExposer](signal, ...args) {
		switch (signal) {
			case SandboxSignal_GetMarshalledProxy:
				// @ts-ignore
				return this.#marshalledCached.get(...args);
			case SandboxSignal_SetMarshalledProxy:
				// @ts-ignore
				return void this.#marshalledCached.set(...args);
			case SandboxSignal_GetWindow:
				return this.#domainRoot;
			case SandboxSignal_GetPromise:
				return this.#domainPromise;
		}
	}

	/**
	 * @param {Symbol} signal 
	 * @param {...any} args 
	 */
	static [SandboxExposer2](signal, ...args) {
		switch (signal) {
			case SandboxSignal_InitDomain:
				if (Domain.#currentDomain)
					throw new TypeError("頂級運行域已經被初始化");

				Domain.#currentDomain = new Domain();
				Domain.#topDomain = Domain.#currentDomain;
				return;
			case SandboxSignal_EnterDomain:
				// @ts-ignore
				return Domain.#enterDomain(...args);
			case SandboxSignal_ExitDomain:
				return Domain.#exitDomain();
			case SandboxSignal_ListDomain:
				return Domain.#listDomain();
		}
	}
}

/**
 * ```plain
 * 將對象從源運行域封送到目標運行域
 * ```
 * 
 * @param {Domain} srcDomain 
 * @param {Domain} dstDomain 
 * @param {any} obj 
 * @returns 
 */
function trapMarshal(srcDomain, dstDomain, obj) {
	if (srcDomain === dstDomain)
		return obj;

	const domain = Domain.current;

	// 如果不需要陷入，則直接封送
	if (domain === srcDomain)
		return Marshal[SandboxExposer2](SandboxSignal_Marshal, obj, dstDomain);

	// 否則先陷入，然後再封送
	return Marshal[SandboxExposer2](SandboxSignal_TrapDomain, srcDomain, () => {
		return Marshal[SandboxExposer2](SandboxSignal_Marshal, obj, dstDomain);
	});
}

/**
 * ```plain
 * 向JavaScript提供類似於Python的exec的自帶上下文的eval功能
 * 同時自動排除原有作用域以沙盒方式來執行部分代碼
 * ```
 */
class Sandbox {
	// @ts-ignore
	static #topWindow = window.replacedGlobal || window;
	// @ts-ignore
	static #topWindowHTMLElement = (window.replacedGlobal || window).HTMLElement;
	/** @type {WeakMap<Domain, Sandbox>} */
	static #domainMap = new WeakMap();
	/** @type {Array} */
	static #executingScope = [];
	/** @type {WeakMap<Function, string>} */
	static #functionRefCodes = new WeakMap();

	/** @type {Object} */
	#scope;
	/** @type {Array<Object>} */
	#scopeStack = [];

	/** @type {Domain} */
	#sourceDomain;
	/** @type {Domain} */
	#domain;
	/** @type {Window} */
	#domainWindow;
	/** @type {Document?} */
	#domainDocument;
	/** @type {typeof Object} */
	#domainObject;
	/** @type {typeof Function} */
	#domainFunction;
	/** @type {typeof Function} */
	#domainEval;

	/**
	 * ```plain
	 * 當在當前scope中訪問不到變量時，
	 * 是否允許沙盒代碼可以穿透到頂級域的全局變量域中
	 * 去讀取部分非內建的全局變量（僅讀取）
	 * 
	 * 此開關有風險，請謹慎使用
	 * ```
	 * 
	 * @type {boolean} 
	 */
	#freeAccess = false;

	/**
	 * ```plain
	 * 當在當前scope中訪問不到變量時，
	 * 是否允許沙盒代碼可以穿透到頂級域的全局變量域中
	 * 去讀取DOM類型的構造函數（僅讀取）
	 * （包括Image、Audio等）
	 * 
	 * 此開關有風險，請謹慎使用
	 * ```
	 * 
	 * @type {boolean} 
	 */
	#domAccess = false;

	/**
	 * 創建一個新的沙盒
	 */
	constructor() {
		this.#sourceDomain = Domain.current;
		this.#domain = new Domain();
		this.#domainWindow = this.#domain[SandboxExposer](SandboxSignal_GetWindow);
		this.#domainDocument = null; // 默認不開放DOM，而且我們也缺少BrowserContext
		this.#domainObject = this.#domainWindow.Object;
		this.#domainFunction = this.#domainWindow.Function;
		this.#domainEval = this.#domainWindow.eval;
		Sandbox.#domainMap.set(this.#domain, this);
		Sandbox.#initDomainFunctions(this, this.#domainWindow);
		Sandbox.#createScope(this);
	}

	/**
	 * ```plain
	 * 檢查沙盒操作運行域
	 * ```
	 * 
	 * @param {Sandbox} thiz 
	 */
	static #assertOperator = function (thiz) {
		if (thiz.#sourceDomain !== Domain.current)
			throw new TypeError("當前運行域不是沙盒的所有運行域");
	}

	/**
	 * ```plain
	 * 封裝沙盒的 Function 函數
	 * ```
	 * 
	 * @param {Sandbox} thiz 
	 * @param {Window} global
	 */
	static #initDomainFunctions = function (thiz, global) {
		/** @type {typeof Function} */
		const defaultFunction = global.Function;
		/** @type {typeof Function} */
		const defaultGeneratorFunction = global.eval("(function*(){}).constructor");
		/** @type {typeof Function} */
		const defaultAsyncFunction = global.eval("(async function(){}).constructor");
		/** @type {typeof Function} */
		const defaultAsyncGeneratorFunction = global.eval("(async function*(){}).constructor");

		/**
		 * @param {typeof Function} target 
		 * @param {Array} argArray 
		 * @returns 
		 */
		function functionCtor(target, argArray) {
			if (!argArray.length)
				return new target();

			argArray = Array.from(argArray);

			const code = argArray.slice(-1)[0];
			const params = argArray.slice(0, -1);

			const compiled = Sandbox.#compileCore(thiz, code, null, params, true);
			Sandbox.#functionRefCodes.set(compiled,
				`function (${params.join(", ")}) {\n${code}\n}`);
			return compiled;
		}

		const handler = {
			/**
			 * @param {FunctionConstructor} target
			 * @param {any} thisArg
			 * @param {any[]} argArray
			 */
			apply(target, thisArg, argArray) {
				return functionCtor(target, argArray);
			},
			/**
			 * @param {FunctionConstructor} target
			 * @param {any[]} argArray
			 * @param {any} newTarget
			 */
			construct(target, argArray, newTarget) {
				return functionCtor(target, argArray);
			},
		};

		/**
		 * @param {object} prototype
		 * @param {any} newCtor
		 */
		function rewriteCtor(prototype, newCtor) {
			const descriptor = Object.getOwnPropertyDescriptor(prototype, 'constructor')
				|| { configurable: true, writable: true, enumerable: false };
			if (!descriptor.configurable) throw new TypeError("無法覆蓋不可配置的構造函數");
			descriptor.value = newCtor;
			Reflect.defineProperty(prototype, 'constructor', descriptor)
		}

		// 封裝當前運行域所有Function類型的構造函數
		// 確保沙盒代碼無法訪問真正的 Window 對象
		// (不過理論上說訪問了也基本上沒什麼東西喵)
		rewriteCtor(defaultFunction.prototype, global.Function = new Proxy(defaultFunction, handler));
		rewriteCtor(defaultGeneratorFunction.prototype, new Proxy(defaultGeneratorFunction, handler));
		rewriteCtor(defaultAsyncFunction.prototype, new Proxy(defaultAsyncFunction, handler));
		rewriteCtor(defaultAsyncGeneratorFunction.prototype, new Proxy(defaultAsyncGeneratorFunction, handler));
	}

	// /**
	//  * ```plain
	//  * 替代原本的eval函數，阻止訪問原生的 window 對象
	//  * ```
	//  * 
	//  * @param {Window} trueWindow
	//  * @param {(x: string) => any} _eval 
	//  * @param {Proxy} intercepter 
	//  * @param {Window} global 
	//  * @param {any} x 
	//  */
	// static #wrappedEval = function (trueWindow, _eval, intercepter, global, x) {
	// 	const intercepterName = Sandbox.#makeName("_", trueWindow);
	// 	const evalName = Sandbox.#makeName("_", global);
	// 	const codeName = Sandbox.#makeName("_", global);
	// 	trueWindow[intercepterName] = intercepter;
	// 	global[evalName] = _eval;
	// 	global[codeName] = x;
	// 	const result = _eval(`with(${intercepterName}){with(window){${evalName}(\`"use strict";\${${codeName}}\`)}}`);
	// 	delete global[codeName];
	// 	delete global[evalName];
	// 	delete trueWindow[intercepterName];
	// 	return result;
	// }

	/**
	 * ```plain
	 * 替代原本的eval函數，阻止訪問原生的 window 對象
	 * ```
	 * 
	 * @param {Sandbox} thiz 
	 * @param {any} x 
	 * @returns 
	 */
	static #wrappedEval = function (thiz, x) {
		let code = String(x).trim();

		while (code.endsWith(";"))
			code = code.slice(0, -1);

		if (!/[;\n\r]$/.test(code)) {
			const newCode = `return (${code})`;
			try {
				new Function(newCode);
				code = newCode;
			} catch (e) { }
		}

		return thiz.exec(code);
	}

	/**
	 * ```plain
	 * 獲取當前的scope
	 * ```
	 * 
	 * @type {Object}
	 */
	get scope() {
		Sandbox.#assertOperator(this);
		return trapMarshal(this.#domain, Domain.current, this.#scope);
	}

	/**
	 * ```plain
	 * 獲取當前沙盒內的運行域
	 * ```
	 * 
	 * @type {Domain}
	 */
	get domain() {
		return this.#domain;
	}

	/**
	 * ```plain
	 * 獲取當前沙盒內的document對象
	 * ```
	 * 
	 * @type {Document}
	 */
	get document() {
		Sandbox.#assertOperator(this);
		return trapMarshal(this.#domain, Domain.current, this.#domainDocument);
	}

	/**
	 * ```plain
	 * 設置當前沙盒內的document對象
	 * ```
	 * 
	 * @type {Document}
	 */
	set document(value) {
		Sandbox.#assertOperator(this);
		this.#domainDocument = Marshal[SandboxExposer2]
			(SandboxSignal_Marshal, value, this.#domain);
	}

	/**
	 * ```plain
	 * 當在當前scope中訪問不到變量時，
	 * 是否允許沙盒代碼可以穿透到頂級域的全局變量域中
	 * 去讀取部分非內建的全局變量（僅讀取）
	 * 
	 * 此開關有風險，請謹慎使用
	 * ```
	 * 
	 * @type {boolean} 
	 */
	get freeAccess() {
		Sandbox.#assertOperator(this);
		return this.#freeAccess;
	}

	/**
	 * ```plain
	 * 當在當前scope中訪問不到變量時，
	 * 是否允許沙盒代碼可以穿透到頂級域的全局變量域中
	 * 去讀取部分非內建的全局變量（僅讀取）
	 * 
	 * 此開關有風險，請謹慎使用
	 * ```
	 * 
	 * @type {boolean} 
	 */
	set freeAccess(value) {
		Sandbox.#assertOperator(this);
		this.#freeAccess = !!value;
	}

	/**
	 * ```plain
	 * 當在當前scope中訪問不到變量時，
	 * 是否允許沙盒代碼可以穿透到頂級域的全局變量域中
	 * 去讀取DOM類型的構造函數（僅讀取）
	 * （包括Image、Audio等）
	 * 
	 * 此開關有風險，請謹慎使用
	 * ```
	 * 
	 * @type {boolean} 
	 */
	get domAccess() {
		Sandbox.#assertOperator(this);
		return this.#domAccess;
	}

	/**
	 * ```plain
	 * 當在當前scope中訪問不到變量時，
	 * 是否允許沙盒代碼可以穿透到頂級域的全局變量域中
	 * 去讀取DOM類型的構造函數（僅讀取）
	 * （包括Image、Audio等）
	 * 
	 * 此開關有風險，請謹慎使用
	 * ```
	 * 
	 * @type {boolean} 
	 */
	set domAccess(value) {
		Sandbox.#assertOperator(this);
		this.#domAccess = !!value;
	}

	/**
	 * ```plain
	 * 向當前域注入內建對象
	 * 
	 * 如果使用在使用了 `initBuiltins` 之後進行 `pushScope`，
	 * 則將自動繼承前面的內建對象，無需再次調用 `initBuiltins`
	 * ```
	 */
	initBuiltins() {
		Sandbox.#assertOperator(this);

		/**
		 * ```plain
		 * 如果要擴充沙盒的內建函數或類，請在此增加喵
		 * ```
		 */
		const builtins = {
			Object: this.#domainWindow.Object,
			Function: this.#domainWindow.Function,
			Array: this.#domainWindow.Array,
			Math: this.#domainWindow.Math,
			Date: this.#domainWindow.Date,
			String: this.#domainWindow.String,
			Number: this.#domainWindow.Number,
			Boolean: this.#domainWindow.Boolean,
			RegExp: this.#domainWindow.RegExp,
			Error: this.#domainWindow.Error,
			TypeError: this.#domainWindow.TypeError,
			RangeError: this.#domainWindow.RangeError,
			SyntaxError: this.#domainWindow.RangeError,
			EvalError: this.#domainWindow.EvalError,
			ReferenceError: this.#domainWindow.ReferenceError,
			Promise: this.#domainWindow.Promise,
			Map: this.#domainWindow.Map,
			Set: this.#domainWindow.Set,
			WeakMap: this.#domainWindow.WeakMap,
			WeakSet: this.#domainWindow.WeakSet,
			WeakRef: this.#domainWindow.WeakRef,
			Symbol: this.#domainWindow.Symbol,
			Proxy: this.#domainWindow.Proxy,
			Reflect: this.#domainWindow.Reflect,
			BigInt: this.#domainWindow.BigInt,
			JSON: this.#domainWindow.JSON,
			// eval: this.#domainWindow.eval, // 我們另外定義 `eval` 函數
			setTimeout: this.#domainWindow.setTimeout,
			clearTimeout: this.#domainWindow.clearTimeout,
			setInterval: this.#domainWindow.setInterval,
			clearInterval: this.#domainWindow.clearInterval,
			setImmediate: this.#domainWindow.setImmediate,
			clearImmediate: this.#domainWindow.clearImmediate,
			requestAnimationFrame: this.#domainWindow.requestAnimationFrame,
			cancelAnimationFrame: this.#domainWindow.cancelAnimationFrame,
			requestIdleCallback: this.#domainWindow.requestIdleCallback,
			cancelIdleCallback: this.#domainWindow.cancelIdleCallback,
			queueMicrotask: this.#domainWindow.queueMicrotask,
			MutationObserver: this.#domainWindow.MutationObserver,
			alert: this.#domainWindow.alert,
			confirm: this.#domainWindow.confirm,
			console: this.#domainWindow.console,
			parseInt: this.#domainWindow.parseInt,
			parseFloat: this.#domainWindow.parseFloat,
			isFinite: this.#domainWindow.isFinite,
			isNaN: this.#domainWindow.isNaN,
			Domain: Domain,
		};

		const hardBuiltins = {
			NaN: NaN,
			Infinity: Infinity,
			undefined: undefined,
		};

		// 放置內建函數或類
		Marshal[SandboxExposer2](SandboxSignal_TrapDomain, this.#domain, () => {
			for (const [k, v] of Object.entries(builtins)) {
				if (!v)
					delete builtins[k];

				// 非類的函數應該要綁定 this 為 null
				if (typeof v == "function" && !("prototype" in v))
					builtins[k] = v.bind(null);
			}
		});

		Object.assign(this.#scope, builtins);

		// 對於常量我們需要重定義
		for (const [k, v] of Object.entries(hardBuiltins)) {
			Reflect.defineProperty(this.#scope, k, {
				value: v,
				writable: false,
				enumerable: false,
				configurable: false,
			});
		}
	}

	/**
	 * ```plain
	 * 基於當前的scope克隆一個新的scope
	 * 然後將原本的scope壓入棧中
	 * ```
	 */
	pushScope() {
		Sandbox.#assertOperator(this);
		this.#scopeStack.push(this.#scope);
		Sandbox.#createScope(this);
	}

	/**
	 * ```plain
	 * 丟棄當前的scope並從棧中彈出原本的scope
	 * ```
	 */
	popScope() {
		Sandbox.#assertOperator(this);

		if (!this.#scopeStack)
			throw new ReferenceError("沒有更多的scope可以彈出");

		this.#scope = this.#scopeStack.pop();
	}

	/**
	 * ```plain
	 * 核心編譯函數
	 * ```
	 * 
	 * @param {Sandbox} thiz 當前沙盒實例
	 * @param {string} code 代碼字符串
	 * @param {Object?} context 額外的執行上下文
	 * @param {Array<string>?} paramList 參數名列表，以此來創建可以傳遞參數的函數
	 * @param {boolean?} inheritScope 是否繼承當前正在執行的scope而不是當前沙盒的scope（為封裝Function類型而提供的參數）
	 * @param {"exists"|"extend"|"all"} writeContext 當執行的代碼嘗試為未聲明的變量賦值時，應該 根據context與window的變量寫入(默認行為)|默認行為並且新的變量寫入context|全部寫入context
	 * @returns 
	 */
	static #compileCore = function (thiz, code, context = null,
		paramList = null, inheritScope = false, writeContext = 'exists') {
		if (typeof code != "string")
			throw new TypeError("代碼需要是一個字符串");

		if (isPrimitive(context))
			context = {};

		// 進行語法檢查，防止注入
		new thiz.#domainFunction(code);

		const passThis = !("this" in context);
		const executingScope = Sandbox.#executingScope[Sandbox.#executingScope.length - 1];
		const scope = inheritScope && executingScope || thiz.#scope;
		const contextName = Sandbox.#makeName("_", scope);
		const argsName = Sandbox.#makeName("_", scope);
		const applyName = Sandbox.#makeName("_", scope);
		const parameters = paramList
			? paramList.join(", ") : "";
		const writeContextAction = { exists: 0, extend: 1, all: 2 }[writeContext] || 0;

		let argumentList;
		let wrappedEval;

		const raw = new thiz.#domainFunction("_", `with(_){with(window){with(${contextName}){return(${applyName}(function(${parameters}){"use strict";\n// 沙盒代碼起始\n${code}\n// 沙盒代碼結束\n},${contextName}.this,${argsName}))}}}`);
		const snippet = new CodeSnippet(code, 5); // 錯誤信息的行號從 5 開始 (即錯誤信息的前 5 行是不屬於 `code` 的範圍)

		const domain = thiz.#domain;
		const domainWindow = thiz.#domainWindow;
		const marshalledContext = Marshal[SandboxExposer2]
			(SandboxSignal_Marshal, context, domain);

		// 構建上下文攔截器
		const intercepter = new Proxy(scope, {
			has() {
				return true;
			},
			get(target, p) {
				switch (p) {
					case contextName:
						return marshalledContext;
					case argsName:
						return argumentList;
					case applyName:
						return Reflect.apply;
				}

				// 防止逃逸
				if (p === Symbol.unscopables)
					return undefined;

				if (!(p in target)) {
					if (p === "eval")
						return wrappedEval; // 返回我們封裝的 `eval` 函數

					throw new domainWindow.ReferenceError(`${String(p)} is not defined`);
				}

				return target[p];
			},
			set(target, p, v) {
				if (writeContextAction == 2
					|| (writeContextAction == 1 && !(p in target)))
					return Reflect.set(marshalledContext, p, v);

				return Reflect.set(target, p, v);
			},
		});

		// wrappedEval = Sandbox.#wrappedEval.bind(null,
		// 	thiz.#domainWindow, thiz.#domainEval, intercepter, scope);
		wrappedEval = Sandbox.#wrappedEval.bind(null, thiz);

		// 構建陷入的沙盒閉包
		// 同時對返回值進行封送
		return /** @this {any} */ function (/** @type {any} */ ...args) {
			const prevDomain = Domain.current;
			const domainAction = () => {
				// 指定執行域
				// 方便後續新的函數來繼承
				Sandbox.#executingScope.push(scope);
				// 指定當前的代碼片段
				CodeSnippet.pushSnippet(snippet);

				try {
					// 傳遞 `this`、以及函數參數
					if (passThis)
						context.this = Marshal[SandboxExposer2]
							(SandboxSignal_Marshal, this, domain);
					argumentList = Marshal[SandboxExposer2]
						(SandboxSignal_MarshalArray, args, domain);

					// 調用閉包函數
					const result = raw.call(null, intercepter);

					// 封送返回結果
					return Marshal[SandboxExposer2]
						(SandboxSignal_Marshal, result, prevDomain);
				} catch (e) {
					// @ts-ignore
					if (!Domain.isError(e))
						throw e; // 非錯誤對象無法讀取堆棧，繼續向上拋出

					// 保存當前錯誤信息
					// 這樣無論幾次重拋都可以復現最原始的錯誤信息
					ErrorManager.setErrorReporter(e);
					throw e; // 繼續向上拋出(由於JS不支持rethrow只能這樣喵)
				} finally {
					CodeSnippet.popSnippet();
					Sandbox.#executingScope.pop();
				}
			};

			if (prevDomain === domain)
				return domainAction();

			return Marshal[SandboxExposer2]
				(SandboxSignal_TrapDomain, domain, domainAction);
		};
	}

	/**
	 * ```plain
	 * 基於給定的代碼與當前的scope來構造一個閉包函數
	 * 
	 * 參數context指定臨時上下文，類似與scope但是裡面的變量優先級高於scope
	 * 另外可以通過context.this屬性來指定函數的this
	 * 
	 * 請注意，當沙盒閉包函數構造後，scope將被閉包固定
	 * 這意味著pushScope與popScope不會影響到構造好的函數
	 * ```
	 * 
	 * @param {string} code 沙盒閉包函數的代碼
	 * @param {Object?} context 臨時上下文
	 * @returns {(...args: any[]) => any} 構造的沙盒閉包函數
	 */
	compile(code, context = null) {
		return Sandbox.#compileCore(this, code, context);
	}

	/**
	 * ```plain
	 * 基於當前的scope在沙盒環境下執行給定的代碼
	 * 
	 * 參數context指定臨時上下文，類似與scope但是裡面的變量優先級高於scope
	 * 另外可以通過context.this屬性來指定函數的this
	 * ```
	 * 
	 * @param {string} code 沙盒閉包函數的代碼
	 * @param {Object?} context 臨時上下文
	 * @returns 執行代碼的返回值
	 */
	exec(code, context = null) {
		return this.compile(code, context)();
	}

	/**
	 * ```plain
	 * 基於當前的scope在沙盒環境下執行給定的代碼
	 * 
	 * 參數context指定臨時上下文，類似與scope但是裡面的變量優先級高於scope
	 * 另外可以通過context.this屬性來指定函數的this
	 * 
	 * 與exec的區別在於，此函數可以指定未定義變量賦值行為
	 * 當 `readonly` 為false時，不存在的全局變量的賦值行為將被轉移到context裡面
	 * 當 `readonly` 為true(默認)時，任何全局變量的賦值行為將被轉移到context裡面
	 * ```
	 * 
	 * @param {string} code 沙盒閉包函數的代碼
	 * @param {Object?} context 臨時上下文(沒有給出將自動創建)
	 * @param {boolean} readonly 是否攔截所有全局變量的賦值
	 * @returns {[any, Object]} [執行代碼的返回值, 參數context]
	 */
	exec2(code, context = null, readonly = true) {
		if (isPrimitive(context))
			context = {};

		const compiled = Sandbox.#compileCore(this, code, context,
			null, false, readonly ? "all" : "extend");
		return [compiled(), context];
	}

	/**
	 * ```plain
	 * 根據運行域獲取沙盒對象
	 * ```
	 * 
	 * @param {Domain} domain 
	 * @returns {Sandbox?} 
	 */
	static from(domain) {
		const sandbox = Sandbox.#domainMap.get(domain);

		if (!sandbox)
			return null;

		if (sandbox.#sourceDomain !== Domain.current)
			throw new TypeError("當前運行域不是沙盒的所有運行域");

		return sandbox;
	}

	/**
	 * ```plain
	 * 創建一個被代理的 Window 對象
	 * 
	 * （為什麼一定要指名道姓選window的東西喵）
	 * ```
	 * 
	 * @param {Sandbox} thiz 
	 */
	static #createScope = function (thiz) {
		let baseScope = thiz.#scope;
		const rawScope = new thiz.#domainObject();

		thiz.#scope = new Proxy(rawScope, {
			get(target, p, receiver) {
				if (p in target)
					return Reflect.get(target, p, receiver);

				// 暴露非內建的頂級全局變量
				if (thiz.#freeAccess
					&& !Globals.isBuiltinKey(p)) {
					const topWindow = Sandbox.#topWindow;

					if (p in topWindow)
						return trapMarshal(Domain.topDomain, thiz.#domain, topWindow[p]);
				} else if (thiz.#domAccess) {
					const topWindow = Sandbox.#topWindow;
					const accessTarget = topWindow[p];

					if (typeof accessTarget == "function"
						&& "prototype" in accessTarget
						&& accessTarget.prototype instanceof Sandbox.#topWindowHTMLElement)
						return trapMarshal(Domain.topDomain, thiz.#domain, accessTarget);
				}

				return undefined;
			},
			has(target, p) {
				if (p in target)
					return true;

				if (thiz.#freeAccess
					&& !Globals.isBuiltinKey(p)) {
					const topWindow = Domain.topDomain[SandboxExposer](SandboxSignal_GetWindow);
					return p in topWindow;
				} else if (thiz.#domAccess) {
					const topWindow = Sandbox.#topWindow;
					const accessTarget = topWindow[p];

					if (typeof accessTarget == "function"
						&& "prototype" in accessTarget
						&& accessTarget.prototype instanceof Sandbox.#topWindowHTMLElement)
						return true;
				}

				return false;
			},
		});

		// 定義三個超級變量
		Reflect.defineProperty(rawScope, "window", {
			get: (function () {
				// @ts-ignore
				return this;
			}).bind(thiz.#scope),
			enumerable: false,
			configurable: false,
		});
		Reflect.defineProperty(rawScope, "self", {
			get: (function () {
				// @ts-ignore
				return this;
			}).bind(thiz.#scope),
			enumerable: false,
			configurable: false,
		});
		Reflect.defineProperty(rawScope, "document", {
			get: (function () {
				// @ts-ignore
				return this.#domainDocument;
			}).bind(thiz),
			enumerable: false,
			configurable: false,
		});

		if (!baseScope)
			return;

		// 繼承之前的變量域
		const descriptors = Object.getOwnPropertyDescriptors(baseScope);
		delete descriptors.window;
		delete descriptors.self;
		delete descriptors.document;
		Object.defineProperties(rawScope, descriptors);
	}

	static #makeName = function (/** @type {string} */ prefix, /** @type {any} */ conflict) {
		let builtName;

		do {
			builtName = prefix + Math.random().toString(36).slice(2);
		} while (builtName in conflict);

		return builtName;
	}

	/**
	 * @param {Symbol} signal 
	 * @param  {...any} args 
	 * @returns 
	 */
	static [SandboxExposer2](signal, ...args) {
		switch (signal) {
			case SandboxSignal_TryFunctionRefs:
				return Sandbox.#functionRefCodes.get(args[0]);
		}
	}
}

/**
 * @param {any} clazz
 */
function sealClass(clazz) {
	sealObjectTree(clazz);

	if (typeof clazz == "function")
		sealObjectTree(clazz.prototype);
	else if (clazz.constructor)
		sealObjectTree(clazz.constructor);
}

// FREEZE FROM SOUL!
/**
 * @param {any} obj
 */
function sealObjectTree(obj) {
	// @ts-ignore
	sealObject(obj, (/** @type {object} */ o) => {
		if (!Reflect.isExtensible(o))
			return;
		if (o === obj)
			return void Object.freeze(o);

		sealObjectTree(o);
	});
}

/**
 * @param {any} obj
 */
function sealObject(obj, freeze = Object.freeze) {
	if (isPrimitive(obj))
		return;

	const descriptors = Object.getOwnPropertyDescriptors(obj);

	freeze(obj);

	// 防止通過函數屬性傳值
	for (const [key, descriptor] of Object.entries(descriptors)) {
		if (descriptor.get)
			freeze(descriptor.get);
		if (descriptor.set)
			freeze(descriptor.set);
		if (!isPrimitive(descriptor.value))
			freeze(descriptor.value);
	}
}

if (SANDBOX_ENABLED) {
	// 確保頂級運行域的原型鏈不暴露
	if (window.top === window) {
		({
			// @ts-ignore
			AccessAction,
			// @ts-ignore
			Rule,
			// @ts-ignore
			Monitor,
			// @ts-ignore
			Marshal,
			// @ts-ignore
			Domain,
			// @ts-ignore
			Sandbox,
		} = SANDBOX_EXPORT);
	} else {
		// 防止被不信任代碼更改
		sealClass(AccessAction);
		sealClass(Rule);
		sealClass(Globals);
		sealClass(DomainMonitors);
		sealClass(Monitor);
		sealClass(Marshal);
		sealClass(Domain);
		sealClass(Sandbox);

		sealClass(Object);
		sealClass(Array);
		sealClass(Function);
		sealClass(Promise);
		sealClass(RegExp);
		sealClass(String);
		sealClass(Number);
		sealClass(Boolean);
		sealClass(Symbol);
		sealClass(Reflect);
		sealClass(Proxy);
		sealClass(Date);
		sealClass(Math);
		sealClass(Error);
		sealClass(TypeError);
		sealClass(ReferenceError);
		sealClass(RangeError);
		sealClass(EvalError);
		sealClass(SyntaxError);

		sealClass(function* () { }.constructor);
		sealClass(async function () { }.constructor);
		sealClass(async function* () { }.constructor);

		// 改為此處初始化，防止多次初始化
		Domain[SandboxExposer2](SandboxSignal_InitDomain);

		// 獲取頂級域的錯誤管理器
		// @ts-ignore
		({
			CodeSnippet,
			ErrorReporter,
			ErrorManager,
		}
			// @ts-ignore
			= window.replacedErrors);

		// 向頂級運行域暴露導出
		// @ts-ignore
		window.SANDBOX_EXPORT = {
			AccessAction,
			Rule,
			Monitor,
			Marshal,
			Domain,
			Sandbox,
		};
	}
}

export {
	AccessAction,
	Rule,
	Monitor,
	Marshal,
	Domain,
	Sandbox,
	SANDBOX_ENABLED,
};