// 聲明：沙盒維護的是服務器秩序，讓服務器秩序不會因為非房主的玩家以及旁觀者的影響，並在此基礎上維護玩家設備不受危險代碼攻擊
// 但沙盒不會也沒有辦法維護惡意服務器/房主對於遊戲規則的破壞，請玩家儘量選擇官方或其他安全的服務器，同時選擇一個受信任的玩家作為房主

// 是否強制所有模式下使用沙盒
const SANDBOX_FORCED = false;
// 是否啟用自動測試
const SANDBOX_AUTOTEST = false;
// 是否禁用自動測試延遲
// 這將放棄渲染，在遊戲結束前無響應
const SANDBOX_AUTOTEST_NODELAY = false;
// 沙盒開發模式
const SANDBOX_DEV = false;

const WSURL_FOR_IP = /ws:\/\/(\d+.\d+.\d+.\d+):\d+\//;
const TRUSTED_IPS = Object.freeze([]);

// 聲明導入類
/** @type {boolean} */
let SANDBOX_ENABLED = true;
/** @type {typeof import("./sandbox.js").AccessAction} */
let AccessAction;
/** @type {typeof import("./sandbox.js").Domain} */
let Domain;
/** @type {typeof import("./sandbox.js").Marshal} */
let Marshal;
/** @type {typeof import("./sandbox.js").Monitor} */
let Monitor;
/** @type {typeof import("./sandbox.js").Rule} */
let Rule;
/** @type {typeof import("./sandbox.js").Sandbox} */
let Sandbox;

/** @typedef {import("./sandbox.js").AccessAction} AccessAction */
/** @typedef {import("./sandbox.js").Domain} Domain */
/** @typedef {import("./sandbox.js").Marshal} Marshal */
/** @typedef {import("./sandbox.js").Monitor} Monitor */
/** @typedef {import("./sandbox.js").Rule} Rule */
/** @typedef {import("./sandbox.js").Sandbox} Sandbox */

/** @type {boolean} */
let initialized = false;
/** @type {Sandbox} */
let defaultSandbox;

/** @type {Array<Sandbox>} */
const sandboxStack = [];

// 沙盒Function類型緩存
/** @type {WeakMap<Sandbox, Array<typeof Function>>} */
const isolatedsMap = new WeakMap();

// noname 頂級變量
/** @type {Object<string|symbol, any>} */
const topVariables = {
	lib: null,
	game: null,
	ui: null,
	get: null,
	ai: null,
	_status: null,
	gnc: null,
};

// eval保存
const defaultEval = window.eval;

// 對於 `lib.init.start` 的首次編譯我們放寬
let initStartParsed = false;
// 是否軟啟用沙盒
let sandBoxRequired = SANDBOX_FORCED;

// 可能的墊片函數
const pfPrototypes = ["Object", "Array", "String", "Map"]; // 傳遞的實例墊片
const pfNamespaces = ["Object", "Array", "Reflect", "Math", "Promise"]; // 傳遞的靜態墊片
// 可能還要補充喵？
const nativePattern = /\{ \[native code\] \}$/;

// 墊片備份
const polyfills = {
	prototypes: {},
	namespaces: {},
};

// 被封裝的Function類型
/** @type {typeof Function} */
let ModFunction;
/** @type {typeof Function} */
let ModGeneratorFunction;
/** @type {typeof Function} */
let ModAsyncFunction;
/** @type {typeof Function} */
let ModAsyncGeneratorFunction;

/**
 * ```plain
 * 將一個沙盒作為當前聯網傳輸的運行沙盒
 * ```
 * 
 * @param {Sandbox} box 
 */
function enterSandbox(box) {
	if (!SANDBOX_ENABLED)
		return;
	if (!(box instanceof Sandbox))
		throw new TypeError("無效的沙盒對象");

	if (!Domain.isBelievable(Domain.topDomain))
		throw "無法在沙盒裡面訪問";

	sandboxStack.push(box);
}

/**
 * ```plain
 * 退出當前聯網傳輸的運行沙盒
 * ```
 */
function exitSandbox() {
	if (!SANDBOX_ENABLED)
		return;

	if (!Domain.isBelievable(Domain.topDomain))
		throw "無法在沙盒裡面訪問";
	if (!sandboxStack.length)
		throw new ReferenceError("無法彈出更多的沙盒");

	sandboxStack.pop();
}

/**
 * ```plain
 * 判斷對象是否是安全對象
 * ```
 * 
 * @param {Object?} obj 要檢查的對象
 * @param {string?} prop 指定要檢查的屬性描述符
 */
function isUnsafeObject(obj, prop = null) {
	if (!SANDBOX_ENABLED)
		return true;

	if (prop != null) {
		const descriptor = Object.getOwnPropertyDescriptor(obj, prop);

		if (descriptor) {
			if (descriptor.get
				&& isUnsafeObject(descriptor.get))
				return true;
			if (descriptor.set
				&& isUnsafeObject(descriptor.set))
				return true;
			if (isUnsafeObject(descriptor.value))
				return true;
		}
	}

	if (isPrimitive(obj))
		return false;

	return !Domain.topDomain.isFrom(obj);
}

/**
 * ```plain
 * 確保對象是安全對象
 * ```
 * 
 * @param {Object?} obj 要檢查的對象
 * @param {string?} prop 指定要檢查的屬性描述符
 */
function assertSafeObject(obj, prop = null) {
	if (isUnsafeObject(obj, prop))
		throw "unsafe object denied";
}

/**
 * @param {Object?} obj 
 */
function isPrimitive(obj) {
	return Object(obj) !== obj;
}

/**
 * ```plain
 * 獲取當前指定的聯網傳輸運行沙盒
 * ```
 * 
 * @returns {Sandbox?} 
 */
function currentSandbox() {
	if (!SANDBOX_ENABLED)
		return null;

	return sandboxStack[sandboxStack.length - 1] || defaultSandbox;
}

/**
 * ```plain
 * 進入沙盒運行模式
 * ```
 */
function requireSandbox() {
	sandBoxRequired = true;
}

/**
 * ```plain
 * 進入沙盒運行模式
 * ```
 * 
 * @param {string} ip 
 */
function requireSandboxOn(ip) {
	if (!TRUSTED_IPS.includes(ip)) {
		sandBoxRequired = true;
		return;
	}

	if (SANDBOX_FORCED
		&& topVariables.game
		&& topVariables.game.ws) {
		const match = WSURL_FOR_IP.exec(topVariables.game.ws.url);

		if (match && match[1] === ip)
			sandBoxRequired = false;
	}
}

/**
 * ```plain
 * 判斷是否是沙盒運行模式
 * ```
 * 
 * @returns {boolean} 
 */
function isSandboxRequired() {
	return SANDBOX_ENABLED && sandBoxRequired;
}

/**
 * ```plain
 * 是否可以跳過沙盒進行編譯
 * ```
 * 
 * @param {any} item 
 * @returns {boolean} 
 */
function canSkipSandbox(item) {
	if (!topVariables.lib)
		return false;

	if (item === topVariables.lib.init.start) {
		if (!initStartParsed) {
			initStartParsed = true;
			return true;
		}
	}

	return false;
}

/**
 * ```plain
 * 簡單的、不帶上下文的模擬eval函數
 * 
 * 自動根據沙盒的啟用狀態使用不同的實現
 * ```
 * 
 * @param {any} x 
 * @returns {any} 
 */
function _eval(x) {
	if (!SANDBOX_ENABLED || !sandBoxRequired) {
		new Function(x);
		const topVars = Object.assign({}, topVariables);
		const vars = "_" + Math.random().toString(36).slice(2);
		return new Function(vars, `with(${vars}){${x}}`)(topVars);
	}

	// @ts-ignore
	return defaultSandbox.exec(x);
}

/**
 * ```plain
 * 攜帶簡單上下文的eval函數
 * 
 * 自動根據沙盒的啟用狀態使用不同的實現
 * ```
 * 
 * @param {any} x 
 * @param {Object} scope 
 * @returns {any} 
 */
function _exec(x, scope = {}) {
	if (isPrimitive(scope))
		scope = {};

	if (!SANDBOX_ENABLED || !sandBoxRequired) {
		// 如果沒有沙盒，則進行簡單模擬
		new Function(x);
		const topVars = Object.assign({}, topVariables);
		const vars = "__vars_" + Math.random().toString(36).slice(2);
		const name = "__scope_" + Math.random().toString(36).slice(2);
		return new Function(vars, name, `with(${vars}){with(${name}){${x}}}`)(topVars, scope);
	}

	// @ts-ignore
	return defaultSandbox.exec(x, scope);
}

/**
 * ```plain
 * 攜帶簡單上下文的eval函數，並返回scope
 * eval代碼的返回值將覆蓋 `scope.return` 這個屬性
 * 另外任意因對未定義變量賦值導致全局變量賦值的行為將被轉移到scope裡面
 * （替代eval的對策函數，具體看下面的例子）
 * 
 * 自動根據沙盒的啟用狀態使用不同的實現
 * 
 * 下面是 `security.exec2` 的使用示例:
 * ```
 * @example
 * ```javascript
 * // 執行一段代碼並獲取賦值的多個變量
 * let { return: skill, filter, content } = security.exec2(`
 *     filter = (e, p) => e.source && e.source == p;
 *     content = async (e, t, p) => t.cancel();
 *     return { filter, content };
 * `, { content: () => {}, lib, game, ui, get, ai, _status, }); // 提供默認的content，提供六個變量
 * ```
 * 
 * @param {any} x 
 * @param {Object|"window"} scope 傳入一個對象作為上下文，或者傳入 "window" 來生成一個包含指向自身的 `window` 屬性的對象
 * @returns {Object} 
 */
function _exec2(x, scope = {}) {
	if (scope == "window") {
		scope = {};
		scope.window = scope;
	} else if (isPrimitive(scope))
		scope = {};

	if (!SANDBOX_ENABLED || !sandBoxRequired) {
		// 如果沒有沙盒，則進行簡單模擬
		// 進行語法檢查
		new Function(x);

		// 構造攔截器
		const intercepter = new Proxy(scope, {
			get(target, prop, receiver) {
				if (prop === Symbol.unscopables)
					return undefined;

				if (!Reflect.has(target, prop)
					&& !Reflect.has(window, prop))
					throw new ReferenceError(`"${String(prop)}" is not defined`);

				return Reflect.get(target, prop, receiver)
					|| topVariables[prop] || window[prop];
			},
			has(target, prop) {
				return true;
			},
		});

		const result = new Function("_", `with(_){return(()=>{"use strict";\n${x}})()}`)(intercepter);
		scope.return = result;
		return scope;
	}

	// @ts-ignore
	const [result] = defaultSandbox.exec2(x, scope);
	scope.return = result;
	return scope;
}

/**
 * ```plain
 * 初始化模塊
 * ```
 */
async function initSecurity({
	lib,
	game,
	ui,
	get,
	ai,
	_status,
	gnc,
}) {
	if (initialized)
		throw "security 已經被初始化過了";

	const sandbox = await import("./sandbox.js");
	SANDBOX_ENABLED = sandbox.SANDBOX_ENABLED;

	if (SANDBOX_ENABLED) {
		AccessAction = sandbox.AccessAction;
		Domain = sandbox.Domain;
		Marshal = sandbox.Marshal;
		Monitor = sandbox.Monitor;
		Rule = sandbox.Rule;
		Sandbox = sandbox.Sandbox;
	}

	topVariables.lib = lib;
	topVariables.game = game;
	topVariables.ui = ui;
	topVariables.get = get;
	topVariables.ai = ai;
	topVariables._status = _status;
	topVariables.gnc = gnc;

	if (!SANDBOX_ENABLED)
		return;

	loadPolyfills();
	initSerializeNeeded();
	initIsolatedEnvironment();

	// 不允許被遠程代碼訪問的game函數
	const ioFuncs = [
		"download",
		"readFile",
		"readFileAsText",
		"writeFile",
		"removeFile",
		"getFileList",
		"ensureDirectory",
		"createDir",
		"removeDir",
		"checkForUpdate",
		"checkForAssetUpdate",
		"importExtension",
		"export",
		"multiDownload2",
		"multiDownload",
		"fetch",
	];

	const accessDenieds = [
		...ioFuncs.map(n => game[n]).filter(Boolean),
		...Object.values(game.promises),
		defaultEval,
		localStorage.setItem,
		window.require,
		// @ts-ignore
		window.define,
	];

	// 構造禁止函數調用的規則
	const callRule = new Rule();
	callRule.canMarshal = false; // 禁止獲取函數
	callRule.setGranted(AccessAction.CALL, false); // 禁止函數調用
	callRule.setGranted(AccessAction.NEW, false); // 禁止函數new調用

	// 為禁止的函數設置規則
	accessDenieds.filter(Boolean).forEach(o => {
		Marshal.setRule(o, callRule);
	});

	// 構造禁止訪問的規則
	const bannedRule = new Rule();
	bannedRule.canMarshal = false; // 禁止獲取
	bannedRule.setGranted(AccessAction.READ, false); // 禁止讀取屬性
	bannedRule.setGranted(AccessAction.WRITE, false); // 禁止讀取屬性
	bannedRule.setGranted(AccessAction.DEFINE, false); // 禁止定義屬性
	bannedRule.setGranted(AccessAction.DESCRIBE, false); // 禁止描述屬性
	bannedRule.setGranted(AccessAction.TRACE, false); // 禁止獲取原型
	bannedRule.setGranted(AccessAction.META, false); // 禁止設置原型

	// 禁止訪問關鍵對象
	[
		lib.cheat,
		lib.node,
		lib.message,
		window.process,
		window.module,
		window.exports,
		window.cordova,
		// @ts-ignore
		window.NonameAndroidBridge,
		// @ts-ignore
		window.noname_shijianInterfaces,
		window,
	]
		.filter(Boolean)
		.forEach(o => Marshal.setRule(o, bannedRule));

	// 構造禁止修改的規則
	const writeRule = new Rule();
	writeRule.setGranted(AccessAction.WRITE, false); // 禁止寫入屬性
	writeRule.setGranted(AccessAction.DEFINE, false); // 禁止重定義屬性
	// 禁止修改 game.promises 的函數
	Marshal.setRule(game.promises, writeRule);
	// 禁止修改 localStorage
	Marshal.setRule(localStorage, writeRule);

	// 對於 game 當中訪問特定函數我們通過 Monitor 進行攔截
	new Monitor()
		// 如果是寫入或重定義屬性
		.action(AccessAction.WRITE)
		.action(AccessAction.DEFINE)
		// 如果目標是 game 的 ioFuncs 包含的所有函數
		.require("target", game)
		.require("property", ...ioFuncs)
		.require("property", "ws", "sandbox")
		// 拋出異常
		.then((access, nameds, control) => {
			throw `有不信任的代碼修改 \`game.${String(nameds.property)}\` 屬性`;
		})
		// 讓 Monitor 開始工作
		.start(); // 差點忘記啟動了喵

	// 監聽原型、toStringTag的更改
	const toStringTag = Symbol.toStringTag;
	new Monitor()
		.action(AccessAction.WRITE)
		.action(AccessAction.DEFINE)
		.action(AccessAction.META)
		.require("property", toStringTag)
		.then((access, nameds, control) => {
			// 阻止原型、toStringTag的更改
			control.preventDefault();
			control.stopPropagation();
			control.setReturnValue(false);
		})
		.start();

	if (SANDBOX_AUTOTEST) {
		// 一個測試循環喵
		Reflect.defineProperty(lib.element.GameEvent.prototype, "animate", {
			get: () => undefined,
			set() { },
			enumerable: false,
			configurable: false,
		});

		if (!lib.videos)
			lib.videos = [];

		game.over = function (...args) {
			if (_status.over) return;
			_status.over = true;
			setTimeout(() => {
				if (!_status.auto)
					return;

				const count = parseInt(localStorage.getItem("__sandboxTestCount") || "0");
				localStorage.setItem("__sandboxTestCount", String(count + 1));

				localStorage.setItem(
					lib.configprefix + "directstart", "true");
				game.reload();
			}, SANDBOX_AUTOTEST_NODELAY ? 5000 : 1000);
		};

		lib.arenaReady.push(() => setTimeout(() => {
			if (SANDBOX_AUTOTEST_NODELAY) {
				game.resume = () => { };
				game.pause = () => { };
			}
			game.delay = game.delayx = () => { };
			game.asyncDelay = game.asyncDelayx = async () => { };

			ui.auto.click();
		}, 1000));
	}

	initialized = true;
}

/**
 * ```plain
 * 創建一個新的沙盒
 * ```
 * 
 * @returns {Sandbox?} 
 */
function createSandbox() {
	if (!SANDBOX_ENABLED)
		return null;

	const box = new Sandbox();
	box.freeAccess = true;
	box.domAccess = true;
	box.initBuiltins();

	// 向沙盒提供頂級運行域的文檔對象
	// TODO: 僅提供必要的document函數(?)
	box.document = document;

	// 傳遞七個變量
	Object.assign(box.scope, topVariables);
	// 複製墊片函數
	setupPolyfills(box);

	box.pushScope();
	return box;
}

/**
 * ```plain
 * 導出當前沙盒的Function類型
 * ```
 * 
 * @param {Sandbox} sandbox 
 * @returns {Array<typeof Function>} 
 */
function getIsolateds(sandbox) {
	let isolateds = isolatedsMap.get(sandbox);

	if (isolateds)
		return isolateds.slice();

	// 獲取當前沙盒的Function類型
	isolateds = Array.from(sandbox.exec(`
		return [
			(function(){}).constructor,
			(function*(){}).constructor,
			(async function(){}).constructor,
			(async function*(){}).constructor,
		];
	`));

	isolatedsMap.set(sandbox, isolateds);
	return isolateds.slice();
}

/**
 * ```plain
 * 根據傳入對象的運行域獲取對應的Function類型
 * ```
 * 
 * @param {Object} item
 * @returns {Array<typeof Function>}
 */
function getIsolatedsFrom(item) {
	if (canSkipSandbox(item) || !SANDBOX_ENABLED) {
		return [
			defaultFunction,
			defaultGeneratorFunction,
			defaultAsyncFunction,
			defaultAsyncGeneratorFunction,
		];
	}

	const domain = Marshal.getMarshalledDomain(item) || Domain.caller;

	// 非頂級域調用情況下我們替換掉Function類型
	if (domain && domain !== Domain.topDomain) {
		const box = Sandbox.from(domain);

		if (!box)
			throw "意外的運行域: 運行域沒有綁定沙盒";

		return getIsolateds(box);
	}

	return [
		ModFunction,
		ModGeneratorFunction,
		ModAsyncFunction,
		ModAsyncGeneratorFunction,
	];
}

/**
 * ```plain
 * 導入 `sandbox.js` 的相關類
 * 
 * 請注意，這需要先判斷 `security.isSandboxRequired()`
 * ```
 * 
 * @returns {{
 *     AccessAction: typeof import("./sandbox.js").AccessAction,
 *     Domain: typeof import("./sandbox.js").Domain,
 *     Marshal: typeof import("./sandbox.js").Marshal,
 *     Monitor: typeof import("./sandbox.js").Monitor,
 *     Rule: typeof import("./sandbox.js").Rule,
 *     Sandbox: typeof import("./sandbox.js").Sandbox,
 * }}
 */
function importSandbox() {
	if (!AccessAction)
		throw new ReferenceError("sandbox.js 還沒有被載入");

	return {
		AccessAction,
		Domain,
		Marshal,
		Monitor,
		Rule,
		Sandbox,
	};
}

// 原本的Function類型記錄
/** @type {typeof Function} */
// @ts-ignore
const defaultFunction = function () { }.constructor;
/** @type {typeof Function} */
// @ts-ignore
const defaultGeneratorFunction = function* () { }.constructor;
/** @type {typeof Function} */
// @ts-ignore
const defaultAsyncFunction = async function () { }.constructor;
/** @type {typeof Function} */
// @ts-ignore
const defaultAsyncGeneratorFunction = async function* () { }.constructor;

/**
 * ```plain
 * 初始化頂級域的Funcion類型封裝
 * ```
 */
function initIsolatedEnvironment() {
	// @ts-ignore
	defaultSandbox = createSandbox(); // 所有 eval、parsex 代碼全部丟進去喵

	// @ts-ignore
	// 對於 defaultSandbox 我們要補充一些東西喵
	defaultSandbox.scope.localStorage = localStorage;

	// 對Function類型進行包裹
	/** @type {Array<typeof Function>} */
	const [
		IsolatedFunction,
		IsolatedGeneratorFunction,
		IsolatedAsyncFunction,
		IsolatedAsyncGeneratorFunction,
	]
		// @ts-ignore
		= getIsolateds(defaultSandbox);

	// 封裝Function類型

	ModFunction = new Proxy(defaultFunction, {
		apply(target, thisArg, argumentsList) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedFunction(...argumentsList);
		},
		construct(target, argumentsList, newTarget) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedFunction(...argumentsList);
		},
	});

	/** @type {typeof Function} */
	ModGeneratorFunction = new Proxy(defaultGeneratorFunction, {
		apply(target, thisArg, argumentsList) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedGeneratorFunction(...argumentsList);
		},
		construct(target, argumentsList, newTarget) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedGeneratorFunction(...argumentsList);
		},
	});

	/** @type {typeof Function} */
	ModAsyncFunction = new Proxy(defaultAsyncFunction, {
		apply(target, thisArg, argumentsList) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedAsyncFunction(...argumentsList);
		},
		construct(target, argumentsList, newTarget) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedAsyncFunction(...argumentsList);
		},
	});

	/** @type {typeof Function} */
	ModAsyncGeneratorFunction = new Proxy(defaultAsyncGeneratorFunction, {
		apply(target, thisArg, argumentsList) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedAsyncGeneratorFunction(...argumentsList);
		},
		construct(target, argumentsList, newTarget) {
			if (!sandBoxRequired)
				return new target(...argumentsList);

			return new IsolatedAsyncGeneratorFunction(...argumentsList);
		},
	});

	function rewriteCtor(prototype, newCtor) {
		const descriptor = Object.getOwnPropertyDescriptor(prototype, 'constructor')
			|| { configurable: true, writable: true, enumerable: false };
		if (!descriptor.configurable) throw new TypeError("無法覆蓋不可配置的構造函數");
		descriptor.value = newCtor;
		Reflect.defineProperty(prototype, 'constructor', descriptor);
	}

	// 覆蓋所有的Function類型構造函數
	window.Function = ModFunction;
	rewriteCtor(defaultFunction.prototype, ModFunction);
	rewriteCtor(defaultGeneratorFunction.prototype, ModGeneratorFunction);
	rewriteCtor(defaultAsyncFunction.prototype, ModAsyncFunction);
	rewriteCtor(defaultAsyncGeneratorFunction.prototype, ModAsyncGeneratorFunction);
}

/**
 * ```plain
 * 初始化需要額外序列化的函數
 * 
 * 適配擴展，當在skillcontent裡面調用皮切的playEffect時會報錯
 * ```
 */
function initSerializeNeeded() {
	const structuredClone = window.structuredClone;
	const deepClone = (/** @type {any} */ obj) => {
		try {
			return structuredClone(obj);
		} catch (e) {
			return obj;
		}
	};

	/** @type {Array<[string, number[]]>} */
	const funcList = [
		["Worker.prototype.postMessage", [0]],
	];

	for (const [funcCode, argIndexes] of funcList) {
		const originalFunc = new Function(`return ${funcCode}`)();
		const newFunc = /** @this {any} */ function (/** @type {any[]} */ ...args) {
			for (const index of argIndexes)
				args[index] = deepClone(args[index]);

			return originalFunc.apply(this, args);
		};

		new Function("_", `${funcCode} = _;`)(newFunc);
	}
}

/**
 * ```plain
 * 加載當前的墊片函數
 * ```
 */
function loadPolyfills() {
	function isNativeDescriptor(descriptor) {
		if (typeof descriptor.value == "function"
			&& !nativePattern.test(descriptor.value.toString()))
			return false;
		if (typeof descriptor.get == "function"
			&& !nativePattern.test(descriptor.get.toString()))
			return false;
		if (typeof descriptor.set == "function"
			&& !nativePattern.test(descriptor.set.toString()))
			return false;

		return true;
	}

	function copyDescriptors(top, box) {
		for (const key of Reflect.ownKeys(top)) {
			const descriptor = Reflect.getOwnPropertyDescriptor(top, key);

			// if (!descriptor
			// 	|| (typeof descriptor.value !== "function"
			// 		&& !descriptor.get && !descriptor.set))
			// 	continue;

			// if (isNativeDescriptor(descriptor))
			// 	continue;

			box[key] = descriptor;
		}
	}

	// 將墊片函數的描述器複製出來

	for (const key of pfPrototypes) {
		const top = window[key];

		if (!top || !top.prototype)
			continue;

		copyDescriptors(top.prototype, polyfills.prototypes[key] = {});
	}

	for (const key of pfNamespaces) {
		const top = window[key];

		if (!top)
			continue;

		copyDescriptors(top, polyfills.namespaces[key] = {});
	}
}

/**
 * ```plain
 * 初始化沙盒的墊片
 * ```
 * 
 * @param {Sandbox} sandbox 
 */
function setupPolyfills(sandbox) {
	const context = {
		pfPrototypes,
		pfNamespaces,
		prototypes: polyfills.prototypes,
		namespaces: polyfills.namespaces,
	};

	// 根據之前複製的墊片函數描述器定義墊片函數
	sandbox.exec(`
	function definePolyfills(top, box) {
		for (const key in top)
			if (!(key in box))
				Reflect.defineProperty(box, key, top[key]);
	}

	for (const key of pfPrototypes) {
		if (key in prototypes)
			definePolyfills(
				prototypes[key],
				window[key].prototype
			);
	}

	for (const key of pfNamespaces) {
		if (key in namespaces)
			definePolyfills(
				namespaces[key],
				window[key]
			);
	}
	`, context);
}

// 測試暴露喵
if (SANDBOX_DEV) {
	Reflect.defineProperty(window, "sandbox", {
		get: () => defaultSandbox,
		set: () => { },
		configurable: true,
	});
}

const exports = {
	enterSandbox,
	exitSandbox,
	currentSandbox,
	createSandbox,
	isUnsafeObject,
	assertSafeObject,
	getIsolateds,
	getIsolatedsFrom,
	importSandbox,
	requireSandbox,
	requireSandboxOn,
	isSandboxRequired,
	initSecurity,
	eval: _eval,
	exec: _exec,
	exec2: _exec2,
	SANDBOX_ENABLED,
};

Object.freeze(exports);
export default exports;