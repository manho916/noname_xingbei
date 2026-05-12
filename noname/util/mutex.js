/**
 * 一個非常普通的“鎖”
 */
export class Mutex {
	/**
	 * 鎖目前的狀態，只有“unlocked”和“locked”兩種情況
	 *
	 * @type {'locked' | 'unlocked'}
	 */
	#status;

	/**
	 * 上鎖後用於等待的鎖Promise
	 *
	 * @type {null | Promise<void>}
	 */
	#promise;

	/**
	 * 上鎖後用於觸發鎖Promise的resolve函數
	 *
	 * @type {null | function(): void}
	 */
	#resolve;

	constructor() {
		this.#status = "unlocked";
		this.#promise = null;
		this.#resolve = null;
	}

	/**
	 * 上鎖
	 *
	 * 請時刻記住使用`await Mutex#lock()`來使鎖正常工作
	 */
	async lock() {
		switch (this.#status) {
			case "locked":
				await this.#promise;
			// [falls through]
			case "unlocked":
				this.#status = "locked";
				// @ts-ignore
				({ promise: this.#promise, resolve: this.#resolve } = Promise.withResolvers());
				break;
		}
	}

	/**
	 * 解鎖
	 *
	 * 請不要在未上鎖的情況下解鎖
	 */
	unlock() {
		if (this.#status === "unlocked") throw new Error("This Mutex is not locked.");

		this.#status = "unlocked";
		if (this.#resolve) this.#resolve();
	}

	/**
	 * 啟用鎖的try-finally封裝，用於在函數執行完後自動解放鎖的控制權（就算發生錯誤）
	 *
	 * @param {function(): void | Promise<void>} content
	 */
	async scoped(content) {
		try {
			await this.lock();
			await content();
		} finally {
			this.unlock();
		}
	}
}
