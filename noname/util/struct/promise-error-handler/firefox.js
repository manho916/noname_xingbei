/**
 * 關於`Mozilla Firefox`的異步錯誤處理
 *
 * 很幸運，Mozilla直接為`Firefox`的報錯提供了地址和行列號，故我們能直接獲取到要獲取的信息，不用像`v8`那樣通過棧堆獲取
 *
 * 雖然但是，我們還是需要判斷一下捕獲的報錯是否是錯誤
 *
 * @implements {PromiseErrorHandler}
 */
export class FirefoxPromiseErrorHandler {
	/**
	 * 在獲取報錯的時候，我們通過發生報錯的`Promise`來進行捕獲錯誤的操作
	 *
	 * 如果捕獲到的錯誤是`Error`，則能直接通過`Firefox`的特性來獲取地址和行列號
	 *
	 * @param {PromiseRejectionEvent} event
	 */
	onHandle(event) {
		event.promise.catch((error) => {
			if (typeof error === "object" && error instanceof Error) {
				if (/Failed to fetch/.test(error.message) || /The media resource indicated by the src attribute or assigned media provider object was not suitable/.test(error.message)) return;

				// Firefox在大環境下默認情況必須要那麼多ts-ignore
				// @ts-ignore
				window.onerror(
					error.message,
					// @ts-ignore
					error.fileName,
					// @ts-ignore
					error.lineNumber,
					// @ts-ignore
					error.columnNumber,
					error
				);
			}
		});
	}
}

/**
 * @typedef {import('../interface/promise-error-handler').PromiseErrorHandler} PromiseErrorHandler
 */
