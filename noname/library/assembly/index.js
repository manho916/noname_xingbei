import * as buildin from "./buildin.js";

/**
 * > 這玩意因為狂神還得是數組
 * 
 * 這個就是一個存放函數的數組，實例化是時接受一個字符串，姑且叫做這個數組的名字的吧。然後
 * ，會自動的從buildin中找與這個名字相同的，把對應的函數，放入這個數組中。
 * 
 * 這個東西有個缺陷，就是還沒有對應的方法去調用所有保存的這些函數。
 * game.callHook(name)，只是調用的初始的，放在buildin.js 的文件裡的函數。
 * 也就是下面的defaultHookcompatition中的函數。
 * 
 * @example
 * const assembly = new NonameAssembly('myAssembly');//這裡會檢查buildin.js裡的寫的函數，當然也可以通過下面的方式添加。

// 添加命名函數
function myFunction() {
	console.log('Hello, world!');
}

assembly.add('myFunction', myFunction);

// 添加匿名函數
assembly.add(() => console.log('Anonymous function'));

// 檢查是否已添加
console.log(assembly.has('myFunction')); // 輸出: true
console.log(assembly.has('nonExistentFunction')); // 輸出: false

// 獲取函數
const myFunctionInstance = assembly.get('myFunction');
if (myFunctionInstance) {
	myFunctionInstance(); // 輸出: Hello, world!
}

// 更新函數
function updatedMyFunction() {
	console.log('Updated hello, world!');
}

assembly.update('myFunction', updatedMyFunction);
const updatedFunctionInstance = assembly.get('myFunction');
if (updatedFunctionInstance) {
	updatedFunctionInstance(); // 輸出: Updated hello, world!
}

// 使用 push 方法
assembly.push('anotherFunction', () => console.log('Another function'));
console.log(assembly.length); // 輸出: 3
 * 
 * 
 *
 * @template {NonameAssemblyType} AssemblyType
 * @template {keyof AssemblyType} Name
 * @extends {Array<AssemblyType[Name][keyof AssemblyType[Name]]>}
 */
export class NonameAssembly extends Array {
	/**
	 * @type {Name}
	 */
	#name;

	/**
	 * @type {Map<keyof AssemblyType[Name], number>}
	 */
	#record;

	/**
	 *
	 * @param {Name} name
	 */
	constructor(name) {
		super();
		this.#name = name;
		this.#record = new Map();

		if (name in buildin) {
			// @ts-ignore
			for (const [key, item] of Object.entries(buildin[name])) {
				// @ts-ignore
				this.add(key, item);
			}
		}
	}

	static get [Symbol.species]() {
		return Array;
	}

	get name() {
		return this.#name;
	}

	/**
	 *
	 * @param {keyof AssemblyType[Name]} name
	 * @param {AssemblyType[Name][keyof AssemblyType[Name]]} content
	 * @override
	 */
	// @ts-ignore
	add(name, content) {
		if (!content) {
			// @ts-expect-error A
			content = name;
			// @ts-expect-error A
			name = content.name;
		}
		if (typeof content !== "function") throw new Error("you can't add a non-function to assembly.");
		// if (typeof name !== "string" || name.length === 0) throw new Error("you can't add a anonymous function to assembly.")

		if (typeof name !== "string" || name.length === 0) {
			if (!this.includes(content)) Array.prototype.push.call(this, content);
		} else if (!this.has(name)) {
			this.#record.set(name, this.length);
			Array.prototype.push.call(this, content);
		}

		return this;
	}

	/**
	 *
	 * @param {keyof AssemblyType[Name]} name
	 * @param {AssemblyType[Name][keyof AssemblyType[Name]]} content
	 * @override
	 */
	// @ts-ignore
	push(name, content) {
		return this.add(name, content).length;
	}

	/**
	 *
	 * @param {keyof AssemblyType[Name]} name
	 */
	has(name) {
		return this.#record.has(name);
	}

	/**
	 *
	 * @param {keyof AssemblyType[Name]} name
	 * @returns {AssemblyType[Name][keyof AssemblyType[Name]] | undefined}
	 */
	get(name) {
		if (!this.has(name)) return void 0;
		// @ts-ignore
		return this[this.#record.get(name)];
	}

	/**
	 *
	 * @param {keyof AssemblyType[Name]} name
	 * @param {AssemblyType[Name][keyof AssemblyType[Name]]} content
	 */
	update(name, content) {
		if (!this.has(name)) return false;

		try {
			// @ts-ignore
			this[this.#record.get(name)] = content;
		} catch (e) {
			console.error(e);
			return false;
		}

		return true;
	}
}

/**
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts裡把類型補了
 * 
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts裡把類型補了
 * 
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts裡把類型補了
 */
export const defaultHookcompatition = {
	checkBegin: new NonameAssembly("checkBegin"),
	checkCard: new NonameAssembly("checkCard"),
	checkTarget: new NonameAssembly("checkTarget"),
	checkButton: new NonameAssembly("checkButton"),
	checkEnd: new NonameAssembly("checkEnd"),

	uncheckBegin: new NonameAssembly("uncheckBegin"),
	uncheckCard: new NonameAssembly("uncheckCard"),
	uncheckTarget: new NonameAssembly("uncheckTarget"),
	uncheckButton: new NonameAssembly("uncheckButton"),
	uncheckEnd: new NonameAssembly("uncheckEnd"),

	checkOverflow: new NonameAssembly("checkOverflow"),
	checkTipBottom: new NonameAssembly("checkTipBottom"),

	checkDamage1: new NonameAssembly("checkDamage1"),
	checkDamage2: new NonameAssembly("checkDamage2"),
	checkDamage3: new NonameAssembly("checkDamage3"),
	checkDamage4: new NonameAssembly("checkDamage4"),

	checkDie: new NonameAssembly("checkDie"),

	checkUpdate: new NonameAssembly("checkUpdate"),

	checkSkillAnimate: new NonameAssembly("checkSkillAnimate"),

	addSkillCheck: new NonameAssembly("addSkillCheck"),
	removeSkillCheck: new NonameAssembly("removeSkillCheck"),
};

export const defaultAssemblys = {
	...defaultHookcompatition,
};
