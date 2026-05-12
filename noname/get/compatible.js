import { userAgentLowerCase } from "../util/index.js";

/**
 * 用於老版本能用的`get`
 */
export class GetCompatible {
	// require是需求的版本號，current是瀏覽器環境本身的版本號
	/**
	 *
	 * @param {[majorVersion: number, minorVersion: number, patchVersion: number]} require
	 * @param {[majorVersion: number, minorVersion: number, patchVersion: number]} current
	 * @returns
	 */
	checkVersion(require, current) {
		// 防止不存在的意外，提前截斷當前版本號的長度
		if (current.length > require.length) current.length = require.length;

		// 考慮到玄學的NaN情況，記錄是否存在NaN
		let flag = false;
		// 從主版本號遍歷到修訂版本號，只考慮當前版本號的長度
		for (let i = 0; i < current.length; ++i) {
			// 當前環境版本號當前位若是NaN，則記錄後直接到下一位
			if (isNaN(current[i])) {
				flag = true;
				continue;
			}
			// 如果此時flag為true且current[i]不為NaN，版本號則不合法，直接否
			if (flag) return false;
			// 上位版本號未達到要求，直接否決
			if (require[i] > current[i]) return false;
			// 上位版本號已超過要求，直接可行
			if (current[i] > require[i]) return true;
		}
		return true;
	}

	/**
	 * 獲取當前內核版本信息
	 *
	 * 目前僅考慮`chrome`, `firefox`和`safari`三種瀏覽器的信息，其餘均歸於其他範疇
	 *
	 * > 其他後續或許會增加，但`IE`永無可能
	 *
	 * @returns {["firefox" | "chrome" | "safari" | "other", number, number, number]}
	 */
	coreInfo() {
		// 如果存在process並且存在process.versions，則默認為node環境
		if (typeof window.process != "undefined" && typeof window.process.versions == "object") {
			// 如果存在versions.chrome，默認為electron的versions.chrome
			if (window.process.versions.chrome) {
				return parseVersion("chrome", window.process.versions.chrome);
			}
		}

		// Chrome/Chromium下的實驗性特性，具體可參見
		// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
		// @ts-ignore
		if (typeof navigator.userAgentData != "undefined") {
			// @ts-ignore
			const userAgentData = navigator.userAgentData;
			if (userAgentData.brands && userAgentData.brands.length) {
				const brand = userAgentData.brands.find(({ brand }) => {
					let str = brand.toLowerCase();
					// 當前支持的瀏覽器中只有chrome支持userAgentData，故只判斷chrome的情況
					return str.includes("chrome") || str.includes("chromium");
				});

				// 如果能通過userAgentData找到對應的瀏覽器信息，則直接返回
				// 反之則繼續通過正則表達式匹配userAgent
				if (brand) {
					return ["chrome", parseInt(brand.version), 0, 0];
				}
			}
		}

		// 目前僅考慮Firefox, Chrome和Safari三種瀏覽器
		// 其餘瀏覽器均歸於other
		const regex = /(firefox|chrome|safari)\/(\d+(?:\.\d+)+)/;
		let result = userAgentLowerCase.match(regex);
		if (result == null) {
			return ["other", NaN, NaN, NaN];
		}

		// 非Safari情況可直接返回結果
		if (result[1] !== "safari") {
			// @ts-expect-error Type must be right
			return parseVersion(result[1], result[2]);
		}

		// 以下是所有Safari平臺的判斷方法
		// macOS以及以桌面顯示的移動端則直接判斷
		if (/macintosh/.test(userAgentLowerCase)) {
			result = userAgentLowerCase.match(/version\/(\d+(?:\.\d+)+).*safari/);
			if (result == null) {
				return ["other", NaN, NaN, NaN];
			}
		}
		// 不然則通過OS後面的版本號來獲取內容
		else {
			let safariRegex = /(?:iphone|ipad); cpu (?:iphone )?os (\d+(?:_\d+)+)/;
			result = userAgentLowerCase.match(safariRegex);
			if (result == null) {
				return ["other", NaN, NaN, NaN];
			}
		}
		// result = userAgent.match(/version\/(\d+(?:\.\d+)+).*safari/)
		return parseVersion("safari", result[1]);

		/**
		 * 通用解析版本號方法
		 *
		 * @param {"firefox" | "chrome" | "safari" | "other"} coreName
		 * @param {string} versions
		 * @returns {["firefox" | "chrome" | "safari" | "other", number, number, number]}
		 */
		function parseVersion(coreName, versions) {
			const [major, minor, patch] = versions.split(".");
			const majorVersion = parseInt(major);

			// 如果major解析為NaN，則整體解析為NaN（此時不考慮minor和patch）
			if (Number.isNaN(majorVersion)) {
				return [coreName, NaN, NaN, NaN];
			}

			// 反之則將不為NaN的minor和patch解析為0
			return [coreName, majorVersion, parseInt(minor) || 0, parseInt(patch) || 0];
		}
	}
}

export let get = new GetCompatible();

/**
 * @param { InstanceType<typeof GetCompatible> } [instance]
 */
export function setGetCompatible(instance) {
	get = instance || new GetCompatible();
}
