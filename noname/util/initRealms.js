import { CodeSnippet, ErrorReporter, ErrorManager } from "./error.js";

// 方便開關確定沙盒的問題喵
// 當此處為true、debug模式未啟用、設備非蘋果時，沙盒生效
let SANDBOX_ENABLED = false;

// 執行上下文傳遞函數，請勿動喵
// 用於傳遞頂級execute context

/** @type {(target: Function, thiz: Object, args: Array) => any} */
// @ts-ignore
const ContextInvoker1 = (function (apply, target, thiz, args) {
    return apply(target, thiz, args);
}).bind(null, Reflect.apply);

/** @type {(target: Function, args: Array, newTarget: Function) => any} */
// @ts-ignore
const ContextInvoker2 = (function (construct, target, args, newTarget) {
    return construct(target, args, newTarget);
}).bind(null, Reflect.construct);

/** @type {(closure: Object, target: Function) => ((...args: any[]) => any)} */
// @ts-ignore
const ContextInvokerCreator = (function (apply, closure, target) {
    return function (...args) {
        return apply(target, closure,
            // @ts-ignore
            [this === window ? null : this, args, new.target]);
    };
}).bind(null, Reflect.apply);

/**
 * @param {string} path
 * @param {string} name
 */
function replaceName(path, name) {
    const index = path.lastIndexOf("/");
    return path.slice(0, index + 1) + name;
}

const TARGET_URL = replaceName(import.meta.url, "sandbox.js");
const SANDBOX_EXPORT = {};

async function initializeSandboxRealms(enabled) {
    if (!enabled) {
        SANDBOX_ENABLED = false;
        return;
    }

    const document = window.document;
    const createElement = document.createElement.bind(document);
    const appendChild = document.body.appendChild.bind(document.body);

    // 通過構造 iframe 來創建新的變量域
    // 我們需要確保頂級運行域的原型鏈不暴露
    // 為此我們從新的變量域重新載入當前腳本
    // 然後就可以直接凍結當前變量域的原型鏈
    const iframe = createElement("iframe");
    iframe.style.display = "none";
    const firefoxLoaded = new Promise(resolve => {
        iframe.onload = resolve;
    });
    appendChild(iframe);

    // Firefox 的 appendChild 居然還是異步的喵_(:з」∠)_
    await firefoxLoaded;

    if (!iframe.contentWindow)
        throw new ReferenceError("無法載入運行域");

    // 定義 createRealms 函數
    Reflect.defineProperty(iframe.contentWindow, "createRealms", {
        value() {
            // 通過構造 iframe 來創建新的變量域
            const iframe = createElement("iframe");
            iframe.style.display = "none";
            appendChild(iframe);

            const window = iframe.contentWindow;
            if (!window)
                throw new ReferenceError("頂級域已經被卸載");

            iframe.remove();
            return window;
        },
    });

    // 傳遞頂級變量域、上下文執行器、錯誤管理器
    // @ts-ignore
    iframe.contentWindow.replacedGlobal = window;
    // @ts-ignore
    iframe.contentWindow.replacedCI1 = ContextInvoker1;
    // @ts-ignore
    iframe.contentWindow.replacedCI2 = ContextInvoker2;
    // @ts-ignore
    iframe.contentWindow.replacedCIC = ContextInvokerCreator;
    // @ts-ignore
    iframe.contentWindow.replacedErrors = { CodeSnippet, ErrorReporter, ErrorManager };

    // 重新以新的變量域載入當前腳本
    const script = iframe.contentWindow.document.createElement("script");
    script.src = TARGET_URL;
    script.type = "module";

    const promise = new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
    });
    iframe.contentWindow.document.head.appendChild(script);
    await promise; // Top Await Required Chrome 89

    // @ts-ignore
    delete iframe.contentWindow.replacedGlobal;
    // @ts-ignore
    delete iframe.contentWindow.replacedCI1;
    // @ts-ignore
    delete iframe.contentWindow.replacedCI2;
    // @ts-ignore
    delete iframe.contentWindow.replacedCIC;
    // @ts-ignore
    delete iframe.contentWindow.replacedErrors;

    // @ts-ignore
    Object.assign(SANDBOX_EXPORT, iframe.contentWindow.SANDBOX_EXPORT);
    iframe.remove();
}

function isSandboxEnabled() {
    return SANDBOX_ENABLED;
}

export {
    initializeSandboxRealms,
    isSandboxEnabled,
    SANDBOX_EXPORT,
};
