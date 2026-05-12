/**
 * 關於不同瀏覽器下對異步錯誤的處理方式
 *
 * 目前已實現的瀏覽器如下：
 *
 * - `Google Chrome`（包括`electron`、`cordova`以及`crosswalk`）
 * - `Mozilla Firefox`
 *
 */

export { ChromePromiseErrorHandler } from "./chrome.js";
export { FirefoxPromiseErrorHandler } from "./firefox.js";
export { UnknownPromiseErrorHandler } from "./unknown.js";
