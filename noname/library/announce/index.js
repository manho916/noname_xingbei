// TODO: 補充一點描述

/**
 * @type {WeakMap<AnnounceSubscriber, EventTarget>}
 */
const vm = new WeakMap();
/**
 * 發佈-訂閱者模式
 * 使用方法
 * @example
 * //使用前先實例化一個announce實例，本體的lib.announce為已經實例化好的一個Announce實例，我們可以直接用
 * const eventTarget = new EventTarget();
 * const records = new WeakMap();
 * const announce = new Announce(eventTarget, records);
 * 
 * //訂閱一個事件，直接使用lib.annouce也行
 * announce.subscribe('newEvent', data => {
	console.log('Received:', data.message);
});

//發佈事件，發佈事件時，會執行所有訂閱了這個事件的回調
announce.publish('newEvent', { message: 'Hello World!' });

//取消訂閱，method是之前註冊時的回調函數
announce.unsubscribe('newEvent', method);


 */
export class Announce {
	/**
	 * @type {EventTarget}
	 */
	#eventTarget;

	/**
	 * @type {WeakMap<function(any): void, IAnnounceSubscriber>}
	 */
	#records;

	/**
	 * @type {AnnounceSubscriberType<any>}
	 */
	#SubscriberType;

	/**
	 *
	 * @param {EventTarget} eventTarget
	 * @param {WeakMap<function(any): void, IAnnounceSubscriber>} records
	 * @param {AnnounceSubscriberType<any>} [SubscriberType]
	 */
	constructor(eventTarget, records, SubscriberType = AnnounceSubscriber) {
		this.#eventTarget = eventTarget;
		this.#records = records;
		this.#SubscriberType = SubscriberType;
	}

	/**
	 * 推送任意數據給所有監聽了指定事件的訂閱者，並返回給定的數據
	 *
	 * 若不存在訂閱指定事件的訂閱者，則推送的數據將無意義
	 *
	 * @template T
	 * @param {string} name - 要推送事件的名稱
	 * @param {T} values - 要推送的數據
	 * @returns {T}
	 */
	publish(name, values) {
		this.#eventTarget.dispatchEvent(
			new CustomEvent(name, {
				detail: [values, name],
			})
		);
		return values;
	}

	/**
	 * 訂閱給定名字的事件，並返回給定的函數
	 *
	 * 在事件觸發時執行給定的函數
	 *
	 * 給定的函數將被存儲至當前實例中，用於取消訂閱時獲取
	 *
	 * @template T
	 * @param {string} name - 要訂閱事件的名稱
	 * @param {(values: T) => void} method - 事件觸發時執行的函數
	 * @returns {(values: T) => void}
	 */
	subscribe(name, method) {
		let subscriber;
		if (this.#records.has(method)) subscriber = this.#records.get(method);
		else {
			subscriber = new this.#SubscriberType(method, this.#eventTarget);
			this.#records.set(method, subscriber);
		}
		if (!subscriber) throw new Error();
		subscriber.subscribe(name);
		return method;
	}

	/**
	 * 取消指定事件某一個函數的訂閱，並返回該函數
	 *
	 * 給定的函數將不再於事件觸發時執行，其餘同事件需觸發的函數不受限制
	 *
	 * @template T
	 * @param {string} name - 要取消訂閱事件的名稱
	 * @param {(values: T) => void} method - 訂閱指定事件的函數
	 * @returns {(values: T) => void}
	 */
	unsubscribe(name, method) {
		if (this.#records.has(method)) {
			const subscriber = this.#records.get(method);
			if (!subscriber) throw new Error();
			subscriber.unsubscribe(name);
			if (subscriber.isEmpty) this.#records.delete(method);
		}
		return method;
	}
}

/**
 * @template T
 */
/**
 * 
 * 訂閱者類，該類的構造函數需要一個處理函數和一個事件目標對象作為參數
 * @example
 * let subscriber = new AnnounceSubscriber(()=>{console.log('我被點擊了')},div)
 * subscriber.subscribe('click') //即當點擊這個div時，會執行傳入的回調。
 */
export class AnnounceSubscriber {
	/**
	 * @type {function(CustomEvent): void}
	 */
	#content;

	/**
	 * @type {string[]}
	 */
	#listening;

	/**
	 *
	 * @param {function(T, string): void} content
	 * @param {EventTarget} target
	 */
	constructor(content, target) {
		this.#content = function (event) {
			content(event.detail[0], event.detail[1]);
		};
		this.#listening = [];

		vm.set(this, target);
	}

	get isEmpty() {
		return this.#listening.length <= 0;
	}

	/**
	 * @param {string} name
	 */
	subscribe(name) {
		// @ts-expect-error MustHave
		vm.get(this).addEventListener(name, this.#content);
		this.#listening.add(name);
	}

	/**
	 * @param {string} name
	 */
	unsubscribe(name) {
		// @ts-expect-error MustHave
		vm.get(this).removeEventListener(name, this.#content);
		this.#listening.remove(name);
	}
}
