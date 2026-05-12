// 喵喵！step寫法的content全在這裡處理喵！
import { _status, ai, game, get, lib, ui } from "../../../../../noname.js";
import { AsyncFunction, GeneratorFunction, AsyncGeneratorFunction } from "../../../../util/index.js";
import ContentCompilerBase from "./ContentCompilerBase.js";
import ContentCompiler from "./ContentCompiler.js";
import security from "../../../../util/security.js";
import { CodeSnippet, ErrorManager } from "../../../../util/error.js";
export default class StepCompiler extends ContentCompilerBase {
	type = "step";
	filter(content) {
		return typeof content === "function" && ![AsyncFunction, GeneratorFunction, AsyncGeneratorFunction].some(parent => content instanceof parent);
	}
	compile(content) {
		if (typeof content != "function") throw new Error("StepCompiler只能接受函數");
		return new StepParser(content).getResult();
	}
}
/**
 * @author 詩箋 & Tipx-L
 */
class StepParser {
	static deconstructs = ["step", "source", "target", "targets", "card", "cards", "skill", "forced", "num", "_result: result"];
	static topVars = ["_status", "lib", "game", "ui", "get", "ai"];
	static params = ["topVars", "event", "trigger", "player"];
	/**
	 * 雖然現在 parsex 被控制到了沙盒，
	 * 但是因為默認沙盒還是可以額外操作東西，
	 * 故而對不同的運行域做了區分
	 */
	functionConstructor;
	str;
	stepHead = "";
	//func中要寫步驟的話，必須要寫step 0
	step = 0;
	contents = [];
	originals = [];
	constructor(func) {
		if (typeof func !== "function") throw new TypeError("為確保安全禁止用parsex/parseStep解析非函數");
		// ModAsyncFunction
		this.functionConstructor = security.getIsolatedsFrom(func)[2];
		this.str = this.formatFunction(func);
		if (lib.config.dev) this.replaceDebugger();
	}
	getResult() {
		this.parseStep();
		const result = ContentCompiler.compile(this.contents);
		result.originals = this.originals;
		return result;
	}
	parseStep() {
		let skipIndex = 0;
		//去除99個step的限制
		while (true) {
			const result = this.str.slice(skipIndex).match(new RegExp(`\\(?['"]step ${this.step}['"]\\)?;?`));
			if (result == null || result.index == null) {
				this.packStep(this.str);
				break;
			}
			const head = this.str.slice(0, skipIndex + result.index);
			if (this.step === 0) {
				this.stepHead = head.trim();
			} else {
				try {
					this.packStep(head);
				} catch (e) {
					skipIndex = result.index + result[0].length;
					continue;
				}
			}
			this.str = this.str.slice(head.length + result[0].length);
			skipIndex = 0;
			this.step++;
		}
	}
	packStep(code) {
		const compiled = new this.functionConstructor(
			...StepParser.params,
			`
            var { ${StepParser.deconstructs.join(", ")} } = event;
            var { ${StepParser.topVars.join(", ")} } = topVars;

            ${this.stepHead}
            {
                ${code}
            }
        `
		);
		ErrorManager.setCodeSnippet(compiled, new CodeSnippet(code, 3)); // 記錄編譯後函數的原代碼片段
		this.originals.push(compiled);
		this.contents.push(function (event, trigger, player) {
			//@ts-ignore
			return compiled.apply(this, [{ _status, ai, game, get, lib, ui }, event, trigger, player]);
		});
	}
	formatFunction(func) {
		// 沙盒在封裝函數時，為了保存源代碼會另外存儲函數的源代碼
		const decompileFunction = security.isSandboxRequired() ? security.importSandbox().Marshal.decompileFunction : Function.prototype.call.bind(Function.prototype.toString);
		//移除所有註釋
		const code = decompileFunction(func)
			.replace(/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|(?:\r?\n|[\s\S])[^/"'\\\s]*)/gm, "$2")
			.trim();
		//移除兩邊括號
		return code
			.slice(0, code.lastIndexOf("}"))
			.slice(code.indexOf("{") + 1)
			.trimEnd();
	}
	replaceDebugger() {
		let regex = /event\.debugger\(\)/;
		// let hasDebugger = false;
		let insertDebugger = `await event.debugger()`; // yield code=>eval(code) 唔唔不是我乾的喵
		let debuggerSkip = 0;
		let debuggerResult;
		while ((debuggerResult = this.str.slice(debuggerSkip).match(regex)) != null) {
			if (debuggerResult.index == null) throw new Error("匹配到了debugger但是沒有索引值");
			let debuggerCopy = this.str;
			debuggerCopy = debuggerCopy.slice(0, debuggerSkip + debuggerResult.index) + insertDebugger + debuggerCopy.slice(debuggerSkip + debuggerResult.index + debuggerResult[0].length, -1);
			try {
				new this.functionConstructor(debuggerCopy);
				this.str = debuggerCopy + "}";
				debuggerSkip += debuggerResult.index + insertDebugger.length;
				// hasDebugger = true;
			} catch (error) {
				debuggerSkip += debuggerResult.index + debuggerResult[0].length;
			}
		}
	}
}
