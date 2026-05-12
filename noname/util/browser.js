import { PromiseErrorHandler } from "./struct/index.js";

/**
 * 從瀏覽器名到不同瀏覽器下異步處理方式的映射
 *
 * `key`的值同`get.coreInfo`函數返回值的第一個元素
 *
 * @type {Record<"firefox" | "chrome" | "safari" | "other", new () => PromiseErrorHandler>}
 */
export const promiseErrorHandlerMap = {
	chrome: PromiseErrorHandler.ChromePromiseErrorHandler,
	firefox: PromiseErrorHandler.FirefoxPromiseErrorHandler,
	safari: PromiseErrorHandler.UnknownPromiseErrorHandler,
	other: PromiseErrorHandler.UnknownPromiseErrorHandler,
};

/**
 * @typedef {import('./struct/interface/promise-error-handler.js').PromiseErrorHandler} PromiseErrorHandler
 */
