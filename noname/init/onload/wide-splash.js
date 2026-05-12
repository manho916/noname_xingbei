import { DefaultSplash } from "./default-splash.js";

/**
 * @typedef {import("./onload-splash.js").OnloadSplash} IOnloadSplash
 * @interface IOnloadSplash
 */
export class WideSplash extends DefaultSplash {
	id = "style2";
	name = "樣式二";

	path = "image/splash/style2/";
}
