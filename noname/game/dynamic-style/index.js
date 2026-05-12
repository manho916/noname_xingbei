export class DynamicStyle {
	/**
	 * Object of style
	 * 表示樣式的對象
	 *
	 * @typedef {Record<string, string | number>} StyleObject
	 */
	/**
	 * Rule to record style info.
	 * 用於記錄樣式信息的規則
	 *
	 * @typedef {[string, StyleObject]} Rule
	 */
	/**
	 * Type used to declare the place to store css info.
	 * 用來存CSS信息的空間的類型
	 *
	 * @typedef {object} DynamicStyleCache
	 * @property {Rule[]} rules 記錄的規則
	 * @property {HTMLStyleElement} style 全局Style標籤
	 * @property {CSSStyleSheet} sheet Style標籤的Sheet
	 */

	/**
	 * Place to store css info.
	 * 存CSS信息的空間
	 *
	 * @type {DynamicStyleCache}
	 */
	#cache;

	/**
	 * Initialize dynamicStyle.
	 * 初始化數據
	 */
	constructor() {
		/**
		 * @type {DynamicStyleCache}
		 */
		const cache = Object.create(null);
		cache.rules = [];
		cache.style = document.createElement("style");
		cache.style.id = "game.dynamicStyle";
		document.head.appendChild(cache.style);
		cache.sheet = cache.style.sheet;

		this.#cache = cache;
	}

	/**
	 * Turn the Object Style to string format.
	 * 將給定的對象樣式轉換成字符串的形式
	 *
	 * @param {StyleObject} style 給定的對象樣式
	 * @returns {string} 樣式的字符串形式
	 */
	translate(style) {
		return Object.entries(style)
			.map(
				(item) => `${item[0].replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)}: ${item[1]};`
			)
			.join(" ");
	}

	/**
	 * Generate the common css selector.
	 * 生成標準的CSS樣式
	 *
	 * @param {string} name 選擇器
	 * @param {StyleObject} style 對象樣式
	 * @returns {string} 標準的CSS樣式
	 */
	generate(name, style) {
		return `${name} { ${this.translate(style)} }`;
	}

	/**
	 * Determine the selector is in rules.
	 * 檢查是否存在對應選擇器的規則
	 *
	 * @param {string} name 選擇器
	 * @returns {boolean}
	 */
	has(name) {
		return this.#cache.rules.some((item) => item[0] === name);
	}

	/**
	 * Get the style of given selector, or return null.
	 * 獲得對應選擇器的樣式對象，若不存在，則返回`null`
	 *
	 * @param {string} name 選擇器
	 * @returns {?StyleObject}
	 */
	get(name) {
		const result = this.find((item) => item[0] === name);
		return result ? result[1] : null;
	}

	/**
	 * Callback of `DynamicStyle#find`, getting the rule wanted.
	 * `DynamicStyle#find`的回調函數，用於獲取符合要求的規則
	 *
	 * @callback FindCallback
	 * @param {Rule} rule 樣式規則
	 * @param {number} index 樣式編號
	 * @param {Rule[]} rules 規則集
	 * @returns {boolean}
	 */

	/**
	 * Get the rule wanted by given function.
	 * 通過給定的函數，獲取符合要求的規則
	 *
	 * @param {FindCallback} fn 用於檢查的函數
	 * @returns {Rule}
	 */
	find(fn) {
		return this.#cache.rules.find(fn);
	}

	/**
	 * Length of rules.
	 * 規則集的長度
	 *
	 * @returns {number}
	 */
	size() {
		return this.#cache.rules.length;
	}

	/**
	 * Get the index of given selector, or return `-1`.
	 * 獲得對應選擇器的位置，若不存在，則返回`-1`
	 *
	 * @param {string} name 選擇器
	 * @returns {number}
	 */
	indexOf(name) {
		for (let i = 0; i < this.#cache.rules.length; ++i) {
			if (name === this.#cache.rules[i][0]) return i;
		}
		return -1;
	}

	// 後面部分就不說明了，可以顧名思義
	/**
	 * @param {string} name 選擇器
	 * @param {StyleObject} style 要添加的樣式對象
	 * @returns {boolean} 添加的結果，為`true`則添加成功，為`false`則添加失敗
	 */
	add(name, style) {
		return this.update(name, this.has(name) ? Object.assign({}, this.get(name), style) : style);
	}

	/**
	 * @param {Record<string, StyleObject>} object 以`name: style`存儲的映射
	 * @returns {boolean[]} 添加的結果，為`true`則添加成功，為`false`則添加失敗
	 */
	addObject(object) {
		return Object.entries(object).map((item) => this.add(item[0], item[1]));
	}

	/**
	 * @param {string} name 要移除規則的選擇器
	 * @returns {boolean} 移除的結果，為`true`則移除成功，為`false`則移除失敗
	 */
	remove(name) {
		if (!this.has(name)) return false;
		try {
			const index = this.indexOf(name);
			this.#cache.rules.splice(index, 1);
			this.#cache.sheet.deleteRule(index);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	/**
	 * @param {string} name 要移除規則的選擇器
	 * @param {string[]} styles 要移除的樣式
	 * @returns {boolean} 移除的結果，為`true`則移除成功，為`false`則移除失敗
	 */
	removeStyles(name, styles) {
		if (!this.has(name)) return false;
		const style = this.get(name);
		styles.forEach((styleName) => {
			delete style[styleName];
		});
		return this.update(name, style);
	}

	/**
	 * 添加或修改一個規則所對應的樣式
	 *
	 * @param {string} name 要變更規則的選擇器
	 * @param {StyleObject} style 變更規則的樣式
	 * @returns {boolean} 更新的結果，為`true`則更新成功，為`false`則更新失敗
	 */
	update(name, style) {
		try {
			if (this.has(name)) {
				const index = this.indexOf(name);
				this.#cache.sheet.deleteRule(index);
				this.#cache.sheet.insertRule(this.generate(name, style), index);
				this.#cache.rules[index] = [name, style];
			} else {
				const index = this.#cache.rules.length;
				this.#cache.rules.push([name, style]);
				this.#cache.sheet.insertRule(this.generate(name, style), index);
			}
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}
