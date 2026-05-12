import { lib } from "../../../../../noname.js";
import StepCompiler from "./StepCompiler.js";
import YieldCompiler from "./YieldCompiler.js";
import AsyncCompiler from "./AsyncCompiler.js";
import ArrayCompiler from "./ArrayCompiler.js";
class ContentCompiler {
	#compilerTypes = new Set();
	#compilers = new Set();
	#compiledContent = new WeakMap();
	/**
	 * ```plain
	 * 註冊一個編譯器實例
	 *
	 * 如果後面開始全面遷移到 TypeScript，那麼請使用依賴注入代替這個方法喵
	 * ```
	 *
	 * @todo 應該使用依賴注入替代
	 * @param compiler 編譯器實例對象
	 */
	addCompiler(compiler) {
		const type = compiler.constructor;
		if (typeof type !== "function") throw new TypeError("content編譯器沒有明確的類型");
		if (this.#compilerTypes.has(type)) throw new TypeError("相同的content編譯器類型不能重複註冊");
		this.#compilerTypes.add(type);
		this.#compilers.add(compiler);
	}
	/**
	 * ```plain
	 * 對無法直接編譯的數據做處理
	 * ```
	 *
	 * @param content
	 * @returns
	 */
	regularize(content) {
		// 無法直接編譯的數據做處理
		if (typeof content === "string") {
			return lib.element.content[content] || lib.element.contents[content];
		} else if (Symbol.iterator in content) {
			return Array.from(content);
		}
		return content;
	}
	/**
	 * ```plain
	 * 集成的編譯函數
	 * 通過責任鏈模式將content分發給所有註冊的編譯器喵
	 * ```
	 *
	 * @param content
	 */
	compile(content) {
		if (content.compiled) return content;
		const target = this.regularize(content);
		const cached = this.#compiledContent.get(target);
		if (cached) return cached;
		for (const compiler of this.#compilers) {
			if (!compiler.filter(target)) continue;
			const compiled = compiler.compile(target);
			compiled.compiled = true;
			compiled.type = compiler.type;
			compiled.original = content;
			// 對編譯結果進行緩存
			this.#compiledContent.set(target, compiled);
			return compiled;
		}
		// 無家可歸的可憐孩子喵
		throw new Error(`不受支持的content: \n ${String(target)}`);
	}
}
const compiler = new ContentCompiler();
compiler.addCompiler(new ArrayCompiler());
compiler.addCompiler(new AsyncCompiler());
compiler.addCompiler(new StepCompiler());
compiler.addCompiler(new YieldCompiler());
export default compiler;
