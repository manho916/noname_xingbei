// 關於兼容環境
// （以後再補，總之兼容環境的代碼必須：不依賴coreJS，照顧低版本的瀏覽器）

export const rootURL = new URL("./", import.meta.url);

export { GetCompatible, get, setGetCompatible } from "./noname/get/compatible.js";
export { GameCompatible, game, setGameCompatible, UpdateReason } from "./noname/game/compatible.js";
export * as util from "./noname/util/index.js";
