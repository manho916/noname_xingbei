/**
 * 關於除已實現瀏覽器外其餘瀏覽器的異步錯誤處理
 *
 * 很遺憾，對於這類瀏覽器，因為標準未涉及報錯棧堆或地址及行列號，故我們只能直接，暴力地throw出我們捕獲到的錯誤，
 *
 * 儘管我們還是會為了這類瀏覽器判斷是不是捕獲到了一個`Error`
 *
 * 總之，雖然這裡跟Safari無關，但我們還是為新時代IE默哀一秒
 *
 * @implements {PromiseErrorHandler}
 */
export class UnknownPromiseErrorHandler {
	/**
	 * 在獲取報錯的時候，我們通過發生報錯的`Promise`來進行捕獲錯誤的操作
	 *
	 * 如果捕獲到的錯誤是`Error`，則...我們只能暴力的將`Error`再次`throw`出去
	 *
	 * @param {PromiseRejectionEvent} event
	 */
	onHandle(event) {
		event.promise.catch((error) => {
			if (typeof error === "object" && error instanceof Error) {
				if (/Failed to fetch/.test(error.message)) return;
				// 很遺憾，因瀏覽器問題，你只能看到這一段
				throw error;
			}
		});
	}
}

/**
 * @typedef {import('../interface/promise-error-handler').PromiseErrorHandler} PromiseErrorHandler
 */
