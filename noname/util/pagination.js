/*
 * https://github.com/accforgit/blog-data/blob/master/%E7%AE%80%E5%8D%95%E5%88%86%E9%A1%B5/demo/index.html
 */

import dedent from "../../game/dedent.js";
import { lib } from "../../noname.js";

/**
 * 簡單分頁類
 */
export class Pagination {
	/** 是否加載了分頁類對應的css文件 */
	static loaded = false;
	/** @type { HTMLUListElement } 渲染的dom元素 */
	element;
	/**
	 * @type { PaginationState }
	 */
	state = {
		data: [],
		pageNumber: 1,
		totalPageCount: 1,
		container: "body",
		maxShowBtnCount: 3,
		pCName: "page-li",
		activeCName: "page-active",
		dataNumberAttr: "data-number",
		prevCName: "page-prev",
		nextCName: "page-next",
		disbalePrevCName: "no-prev",
		disbaleNextCName: "no-next",
		pageNumberCName: "page-number",
		changePageEvent: "click",
		/** @type { Required<PaginationState> } */
		insertAfter: undefined,
		/** @type { Required<PaginationState> } */
		activePosition: undefined,
		/** @type { Required<PaginationState> } */
		pageNumberForCN: undefined,
		/** @type { Required<PaginationState> } */
		pageLimitForCN: undefined,
		/** @type { Required<PaginationState> } */
		pageRefuseChanged: undefined,
		/** @type { Required<PaginationState> } */
		pageElement: undefined,
	};
	/**
	 * @param { Partial<PaginationState> } paramsObj
	 */
	constructor(paramsObj = {}) {
		if (!Pagination.loaded) {
			Pagination.loaded = true;
			lib.init.css(lib.assetURL + "layout/default/pagination.css");
		}
		let { state } = this;
		for (const [key, value] of Object.entries(paramsObj)) {
			state[key] = value;
		}
		if (state.totalPageCount > state.maxShowBtnCount + 2) {
			state.activePosition = Math.ceil(state.maxShowBtnCount / 2);
		}
	}
	/** 切換頁碼並設置按鈕點擊事件 */
	switchPage() {
		let { state } = this;
		let pCNameList = this.selectorEle("." + state.pCName, true);
		let pageNumber;
		if (!pCNameList) {
			console.error(`未找到類名為${"." + state.pCName}的元素`);
			return;
		}
		pCNameList.forEach(item => {
			item.addEventListener(state.changePageEvent, (/** @type { Event } */ e) => {
				/** @type { HTMLElement } */
				// @ts-ignore
				const currentPageEle = e.target;
				// 點擊的是當前頁數不進行操作
				if (this.hasClass(currentPageEle, state.activeCName)) return;
				let dataNumberAttr = currentPageEle.getAttribute(state.dataNumberAttr);
				// 點擊數字按鈕
				if (dataNumberAttr) {
					pageNumber = +dataNumberAttr;
				}
				// 點擊上一頁按鈕
				else if (this.hasClass(currentPageEle, state.prevCName)) {
					state.pageNumber > 1 && (pageNumber = state.pageNumber - 1);
				}
				// 點擊下一頁按鈕
				else if (this.hasClass(currentPageEle, state.nextCName)) {
					state.pageNumber < state.totalPageCount && (pageNumber = state.pageNumber + 1);
				}
				if (pageNumber) {
					this.gotoPage(pageNumber);
				}
			});
		});
	}
	/**
	 * 跳轉頁數
	 * @param { number } pageNumber
	 */
	gotoPage(pageNumber) {
		let { state } = this;
		let evaNumberLi = this.selectorEle("." + state.pageNumberCName, true);
		if (!evaNumberLi) {
			console.error(`未找到類名為${"." + state.pageNumberCName}的元素`);
			return;
		}
		let len = evaNumberLi.length;
		// 不合法的頁數
		if (len === 0 || this.isIllegal(pageNumber)) {
			return;
		}
		if (state.pageNumber !== pageNumber) {
			// 清除 active 樣式
			const active = this.selectorEle(`.${state.pCName}.${state.activeCName}`);
			if (active) this.removeClass(active, state.activeCName);
			if (state.activePosition) {
				let rEllipseSign = state.totalPageCount - (state.maxShowBtnCount - state.activePosition) - 1;
				// 左邊不需要出現省略符號佔位
				if (pageNumber <= state.maxShowBtnCount && pageNumber < rEllipseSign) {
					if (+(evaNumberLi[1].getAttribute(state.dataNumberAttr) || 0) > 2) {
						for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
							let value = String(i + 1);
							// @ts-ignore
							evaNumberLi[i].innerText = state.pageNumberForCN?.[parseInt(value) - 1] ?? value;
							evaNumberLi[i].setAttribute(state.dataNumberAttr, value);
						}
					}
					this.hiddenEllipse(".ellipsis-head");
					this.hiddenEllipse(".ellipsis-tail", false);
					this.addClass(evaNumberLi[pageNumber - 1], state.activeCName);
				}
				// 兩邊都需要出現省略符號佔位
				if (pageNumber > state.maxShowBtnCount && pageNumber < rEllipseSign) {
					// 針對 maxShowBtnCount===1 的特殊處理
					this.hiddenEllipse(".ellipsis-head", pageNumber === 2 && state.maxShowBtnCount === 1);
					this.hiddenEllipse(".ellipsis-tail", false);
					for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
						let value = String(pageNumber + (i - state.activePosition));
						// @ts-ignore
						evaNumberLi[i].innerText = state.pageNumberForCN?.[parseInt(value) - 1] ?? value;
						evaNumberLi[i].setAttribute(state.dataNumberAttr, value);
					}
					this.addClass(evaNumberLi[state.activePosition], state.activeCName);
				}
				// 右邊不需要出現省略符號佔位
				if (pageNumber >= rEllipseSign) {
					this.hiddenEllipse(".ellipsis-tail");
					this.hiddenEllipse(".ellipsis-head", false);
					if (+(evaNumberLi[len - 2].getAttribute(state.dataNumberAttr) || 0) < state.totalPageCount - 1) {
						for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
							let value = String(state.totalPageCount - (state.maxShowBtnCount - i) - 1);
							// @ts-ignore
							evaNumberLi[i].innerText = state.pageNumberForCN?.[parseInt(value) - 1] ?? value;
							evaNumberLi[i].setAttribute(state.dataNumberAttr, value);
						}
					}
					const active = Array.from(evaNumberLi).find(item => item.getAttribute(state.dataNumberAttr) === String(pageNumber));
					if (active) this.addClass(active, state.activeCName);
				}
			} else {
				// 不需要省略符號佔位
				this.addClass(evaNumberLi[pageNumber - 1], state.activeCName);
			}
			state.pageNumber = pageNumber;
		}
		state.onPageChange && state.onPageChange(state);
		// 判斷 上一頁 下一頁 是否可使用
		this.switchPrevNextAble();
	}
	/** 設置上一頁下一頁按鈕合法性 */
	switchPrevNextAble() {
		let { state } = this;
		let prevBtn = this.selectorEle("." + state.prevCName);
		let nextBtn = this.selectorEle("." + state.nextCName);
		if (!prevBtn) {
			console.error(`未找到上一頁按鈕的元素`);
			return;
		}
		if (!nextBtn) {
			console.error(`未找到下一頁按鈕的元素`);
			return;
		}
		// 當前頁已經是第一頁，則禁止 上一頁 按鈕的可用性
		state.pageNumber > 1 ? this.hasClass(prevBtn, state.disbalePrevCName) && this.removeClass(prevBtn, state.disbalePrevCName) : !this.hasClass(prevBtn, state.disbalePrevCName) && this.addClass(prevBtn, state.disbalePrevCName);
		// 當前頁已經是最後一頁，則禁止 下一頁 按鈕的可用性
		state.pageNumber >= state.totalPageCount ? !this.hasClass(nextBtn, state.disbaleNextCName) && this.addClass(nextBtn, state.disbaleNextCName) : this.hasClass(nextBtn, state.disbaleNextCName) && this.removeClass(nextBtn, state.disbaleNextCName);
	}
	/** 渲染Dom */
	renderPageDOM() {
		let { state } = this;
		let pageContainer = state.container instanceof Element ? state.container : document.querySelector(state.container);
		if (!pageContainer) {
			console.error(`未根據配置找到父元素`);
			return;
		}

		if (this.element instanceof HTMLElement && pageContainer.contains(this.element)) {
			pageContainer.removeChild(this.element);
			// @ts-ignore
			this.element = void 0;
		}

		let { totalPageCount, pCName, prevCName, disbalePrevCName, pageNumber, pageNumberCName, activeCName, dataNumberAttr, maxShowBtnCount, nextCName, disbaleNextCName } = state;

		let paginationStr = dedent`
				<ul class="pagination">
					<li class="${pCName} ${prevCName} ${disbalePrevCName}">${state.pageLimitForCN?.[0] ?? "上一頁"}</li>
					<li class="${pCName} ${pageNumberCName} ${activeCName}" ${dataNumberAttr}='1'>${state.pageNumberForCN?.[0] ?? "1"}</li>
			`;
		if (totalPageCount - 2 > maxShowBtnCount) {
			paginationStr += `<li class="${pCName} number-ellipsis ellipsis-head" style="display: none;">...</li>`;
			for (let i = 2; i < maxShowBtnCount + 2; i++) {
				paginationStr += `<li class="${pCName} ${pageNumberCName} ${i === 1 ? activeCName : ""}" ${dataNumberAttr}='${i}'>${state.pageNumberForCN?.[i - 1] ?? i}</li>`;
			}
			paginationStr += dedent`
				<li class="${pCName} number-ellipsis ellipsis-tail">...</li>
				<li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${totalPageCount}'>${state.pageNumberForCN?.[totalPageCount - 1] ?? totalPageCount}</li>
			`;
		} else {
			for (let i = 2; i <= totalPageCount; i++) {
				paginationStr += `<li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${i}'>${state.pageNumberForCN?.[i - 1] ?? i}</li>`;
			}
		}
		paginationStr += `<li class="${pCName} ${nextCName}${totalPageCount === 1 ? " " + disbaleNextCName : ""}">${state.pageLimitForCN?.[1] ?? "下一頁"}</li></ul>`;

		if (state.insertAfter) {
			let afterElement = state.insertAfter instanceof Element ? state.insertAfter : document.querySelector(state.insertAfter);
			if (!afterElement || !pageContainer.contains(afterElement)) {
				console.error(`未根據配置找到兄弟元素，元素將添加到父元素結尾`);
				pageContainer.insertAdjacentHTML("beforeend", paginationStr);
				// @ts-ignore
				this.element = pageContainer.lastElementChild;
			} else {
				afterElement.insertAdjacentHTML("afterend", paginationStr);
				// @ts-ignore
				this.element = afterElement.nextElementSibling;
				// @ts-ignore
				this.element.style.position = "static";
			}
		} else {
			pageContainer.insertAdjacentHTML("beforeend", paginationStr);
			// @ts-ignore
			this.element = pageContainer.lastElementChild;
		}

		// 在dialog中使用分頁，將應用shadowed這個css類名以靠近dialog樣式
		let ele = this.element;
		while (ele !== null) {
			// @ts-ignore
			if (ele.classList.contains("dialog")) {
				// @ts-ignore
				Array.from(this.element.children).forEach(item => {
					if (item.classList.contains("number-ellipsis") || item.classList.contains("ellipsis-tail")) return;
					item.classList.add("shadowed");
				});
				break;
			}
			if (ele === document.body) break;
			// @ts-ignore
			ele = ele.parentNode;
		}
		this.switchPage();
		this.gotoPage(pageNumber);
	}
	/**
	 * 判斷按鈕合法性
	 * @param { number } pageNumber
	 */
	isIllegal(pageNumber) {
		let { state } = this;
		if (state.pageRefuseChanged) return true;
		return /*state.pageNumber === pageNumber || */ Math.ceil(pageNumber) !== pageNumber || pageNumber > state.totalPageCount || pageNumber < 1 || typeof pageNumber !== "number" || pageNumber !== pageNumber;
	}
	/**
	 * 隱藏/顯示省略符號佔位
	 * @param { string } selector
	 **/
	hiddenEllipse(selector, shouldHidden = true) {
		/** @type { HTMLElement } */
		// @ts-ignore
		const element = this.selectorEle(selector);
		if (element) {
			element.style.display = shouldHidden ? "none" : "";
		}
	}
	/**
	 * @overload
	 * @param { string } selector
	 * @returns { ReturnType<typeof document['querySelector']> }
	 */
	/**
	 * @overload
	 * @param { string } selector
	 * @param { boolean } [all]
	 * @returns { ReturnType<typeof document['querySelectorAll']> }
	 */
	selectorEle(selector, all = false) {
		// return all ? document.querySelectorAll(selector) : document.querySelector(selector);
		const dom = this.element || document;
		return all ? dom.querySelectorAll(selector) : dom.querySelector(selector);
	}
	/**
	 * @param { Element } eleObj
	 * @param { string } className
	 */
	hasClass(eleObj, className) {
		return eleObj.classList.contains(className);
	}
	/**
	 * @param { Element } eleObj
	 * @param { string } className
	 */
	addClass(eleObj, className) {
		eleObj.classList.add(className);
	}
	/**
	 * @param { Element } eleObj
	 * @param { string } className
	 */
	removeClass(eleObj, className) {
		if (this.hasClass(eleObj, className)) {
			eleObj.classList.remove(className);
		}
	}
	/**
	 * 自行添加的修改總頁數的方法
	 *
	 * @param { number } totalPageCount
	 */
	setTotalPageCount(totalPageCount) {
		let { state } = this;
		state.pageNumber = 1;
		state.totalPageCount = totalPageCount;
		if (state.totalPageCount > state.maxShowBtnCount + 2) {
			state.activePosition = Math.ceil(state.maxShowBtnCount / 2);
		}
		this.renderPageDOM();
	}
}
