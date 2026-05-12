import { get } from "../../get/index.js";
import { game } from "../../game/index.js";
import { lib } from "../index.js";
import { _status } from "../../status/index.js";
import { ui } from "../../ui/index.js";

import { LibInitPromises } from "./promises.js";
import { rootURL } from "../../../noname.js";

import security from "../../util/security.js";
import { ContentCompiler } from "../element/gameEvent.js";

export class LibInit {
	/**
	 * 部分函數的Promise版本
	 */
	promises = new LibInitPromises();

	init() {
		throw new Error("lib.init.init is moved to noname/init");
	}

	reset() {
		if (window.inSplash) return;
		if (window.resetExtension) {
			if (confirm("遊戲似乎未正常載入，有可能因為部分擴展未正常載入，或者因為部分擴展未載入完畢。\n是否禁用擴展並重新打開？")) {
				window.resetExtension();
				window.location.reload();
			}
		} else {
			if (lib.device) {
				if (navigator.notification) {
					navigator.notification.confirm(
						"遊戲似乎未正常載入，是否重置遊戲？",
						function (index) {
							if (index == 2) {
								localStorage.removeItem("noname_inited");
								window.location.reload();
							} else if (index == 3) {
								var noname_inited = localStorage.getItem("noname_inited");
								var onlineKey = localStorage.getItem(lib.configprefix + "key");
								localStorage.clear();
								if (noname_inited) {
									localStorage.setItem("noname_inited", noname_inited);
								}
								if (onlineKey) {
									localStorage.setItem(lib.configprefix + "key", onlineKey);
								}
								if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
								setTimeout(function () {
									window.location.reload();
								}, 200);
							}
						},
						"確認退出",
						["取消", "重新下載", "重置設置"]
					);
				} else {
					if (confirm("遊戲似乎未正常載入，是否重置遊戲？")) {
						localStorage.removeItem("noname_inited");
						window.location.reload();
					}
				}
			} else {
				if (confirm("遊戲似乎未正常載入，是否重置遊戲？")) {
					var onlineKey = localStorage.getItem(lib.configprefix + "key");
					localStorage.clear();
					if (onlineKey) {
						localStorage.setItem(lib.configprefix + "key", onlineKey);
					}
					if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
					setTimeout(function () {
						window.location.reload();
					}, 200);
				}
			}
		}
	}

	// 現在改lib.init.onload的都給我無報錯被創
	async onload() {
		throw new Error("lib.init.onload is moved to noname/init/onload");
	}

	startOnline() {
		"step 0";
		event._resultid = null;
		event._result = null;
		game.pause();
		"step 1";
		if (result) {
			if (event._resultid) {
				result.id = event._resultid;
			}
			game.send("result", result);
		}
		event.goto(0);
	}

	onfree() {
		if (lib.onfree) {
			clearTimeout(window.resetGameTimeout);
			delete window.resetGameTimeout;
			if (!game.syncMenu) {
				delete window.resetExtension;
				localStorage.removeItem(lib.configprefix + "disable_extension");
			}

			if (game.removeFile && lib.config.brokenFile.length) {
				while (lib.config.brokenFile.length) {
					game.removeFile(lib.config.brokenFile.shift());
				}
				game.saveConfigValue("brokenFile");
			}

			var onfree = lib.onfree;
			delete lib.onfree;
			var loop = function () {
				if (onfree.length) {
					onfree.shift()();
					setTimeout(loop, 100);
				}
			};
			setTimeout(loop, 500);
			if (!_status.new_tutorial) game.saveConfig("menu_loadondemand", true, lib.config.mode);
		}
	}

	connection(ws) {
		const client = new lib.element.Client(ws);
		lib.node.clients.push(client);
		if (window.isNonameServer) {
			document.querySelector("#server_count").innerHTML = lib.node.clients.length;
		}
		ws.on("message", function (messagestr) {
			var message;
			try {
				if (typeof messagestr !== "string") {
					messagestr =
						typeof messagestr === "object" && messagestr !== null
							? JSON.stringify(messagestr)
							: String(messagestr);
				}
				message = JSON.parse(messagestr);
				if (!Array.isArray(message) || typeof lib.message.server[message[0]] !== "function") {
					throw "err";
				}
				// @ts-ignore
				if (client.sandbox) security.enterSandbox(client.sandbox);
				try {
					for (var i = 1; i < message.length; i++) {
						message[i] = get.parsedResult(message[i]);
					}
				} finally {
					// @ts-ignore
					if (client.sandbox) security.exitSandbox();
				}
			} catch (e) {
				console.log(e);
				console.log("invalid message: " + messagestr);
				return;
			}
			lib.message.server[message.shift()].apply(client, message);
		});
		ws.on("close", function () {
			client.close();
		});
		client.send("opened");
	}

	sheet() {
		var style = document.createElement("style");
		document.head.appendChild(style);
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "string") {
				style.sheet.insertRule(arguments[i], 0);
			}
		}
		return style;
	}

	css(path, file, before) {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		if (path) {
			if (path[path.length - 1] == "/") path = path.slice(0, path.length - 1);
			if (file) path = `${path}${/^db:extension-[^:]*$/.test(path) ? ":" : "/"}${file}.css`;
			(path.startsWith("db:") ? game.getDB("image", path.slice(3)).then(get.objectURL) : new Promise(resolve => resolve(path))).then(resolvedPath => {
				style.href = resolvedPath;
				if (typeof before == "function") {
					style.addEventListener("load", before);
					document.head.appendChild(style);
				} else if (before) document.head.insertBefore(style, before);
				else document.head.appendChild(style);
			});
		}
		return style;
	}

	//在擴展的precontent中調用，用於加載擴展必需的JS文件。
	//If any of the parameters is an Array, corresponding files will be loaded in order
	//如果任意參數為數組，則按順序加載加載相應的文件
	jsForExtension(path, file, onLoad, onError) {
		if (!_status.javaScriptExtensions) _status.javaScriptExtensions = [];
		_status.javaScriptExtensions.push({
			path: path,
			file: file,
			onLoad: onLoad,
			onError: onError,
		});
	}

	js(path, file, onLoad, onError) {
		if (path[path.length - 1] == "/") path = path.slice(0, path.length - 1);
		if (path == `${lib.assetURL}mode` && lib.config.all.stockmode.indexOf(file) == -1) {
			lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
			return;
		}
		if (Array.isArray(file)) {
			file.forEach(value => lib.init.js(path, value, onLoad, onError));
			return;
		}
		let scriptSource = file ? `${path}${/^db:extension-[^:]*$/.test(path) ? ":" : "/"}${file}.js` : path;
		if (path.startsWith("http")) scriptSource += `?rand=${get.id()}`;
		else if (lib.config.fuck_sojson && !_status.connectMode && scriptSource.includes("extension") != -1 && scriptSource.startsWith(lib.assetURL)) {
			const pathToRead = scriptSource.slice(lib.assetURL.length);
			const alertMessage = `檢測到您安裝了使用免費版sojson進行加密的擴展。請謹慎使用這些擴展，避免遊戲數據遭到破壞。\n擴展文件：${pathToRead}`;
			if (typeof game.readFileAsText == "function")
				game.readFileAsText(
					pathToRead,
					result => {
						if (result.includes("sojson") || result.includes("jsjiami") || result.includes("var _0x")) alert(alertMessage);
					},
					() => void 0
				);
			else if (location.origin != "file://")
				lib.init.reqSync(
					pathToRead,
					function () {
						const result = this.responseText;
						if (result.includes("sojson") || result.includes("jsjiami") || result.includes("var _0x")) alert(alertMessage);
					},
					() => void 0
				);
		}
		const script = document.createElement("script");
		(scriptSource.startsWith("db:") ? game.getDB("image", scriptSource.slice(3)).then(get.objectURL) : new Promise(resolve => resolve(scriptSource))).then(resolvedScriptSource => {
			script.src = resolvedScriptSource;
			if (path.startsWith("http")) script.addEventListener("load", () => script.remove());
			document.head.appendChild(script);
			if (typeof onLoad == "function") script.addEventListener("load", onLoad);
			if (typeof onError == "function") script.addEventListener("error", onError);
		});
		return script;
	}

	/**
	 * 同步lib.init.js
	 * @returns { void }
	 */
	jsSync(path, file, onLoad, onError) {
		if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
			const e = new Error("瀏覽器file協議下無法使用此api，請在http/https協議下使用此api");
			if (typeof onError == "function") onError(e);
			else throw e;
			return;
		}
		if (path[path.length - 1] == "/") path = path.slice(0, path.length - 1);
		if (path == `${lib.assetURL}mode` && lib.config.all.stockmode.indexOf(file) == -1) {
			lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
			return;
		}
		if (Array.isArray(file)) {
			return file.forEach(value => lib.init.jsSync(path, value, onLoad, onError));
		}
		let scriptSource;
		if (!file) scriptSource = path;
		else scriptSource = `${path}/${file}.js`;
		if (path.startsWith("http")) scriptSource += `?rand=${get.id()}`;
		const xmlHttpRequest = new XMLHttpRequest();
		let data;
		xmlHttpRequest.addEventListener("load", () => {
			if (![0, 200].includes(xmlHttpRequest.status)) {
				// @ts-ignore
				if (typeof onError == "function") onError(new Error(oReq.statusText || oReq.status));
				return;
			}
			data = xmlHttpRequest.responseText;
			if (!data) {
				if (typeof onError == "function") onError(new Error(`${scriptSource}加載失敗！`));
				return;
			}
			if (lib.config.fuck_sojson && scriptSource.includes("extension") != -1 && scriptSource.startsWith(lib.assetURL)) {
				const pathToRead = scriptSource.slice(lib.assetURL.length);
				if (data.includes("sojson") || data.includes("jsjiami") || data.includes("var _0x")) alert(`檢測到您安裝了使用免費版sojson進行加密的擴展。請謹慎使用這些擴展，避免遊戲數據遭到破壞。\n擴展文件：${pathToRead}`);
			}
			try {
				security.eval(data);
				if (typeof onLoad == "function") onLoad();
			} catch (error) {
				if (typeof onError == "function") onError(error);
			}
		});
		if (typeof onError == "function") xmlHttpRequest.addEventListener("error", onError);
		xmlHttpRequest.open("GET", scriptSource, false);
		xmlHttpRequest.send();
	}

	req(str, onload, onerror, master) {
		let sScriptURL;
		if (str.startsWith("http")) sScriptURL = str;
		else if (str.startsWith("local:")) {
			if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
				const e = new Error("瀏覽器file協議下無法使用此api，請在http/https協議下使用此api");
				if (typeof onerror == "function") onerror(e);
				else throw e;
				return;
			}
			sScriptURL = lib.assetURL + str.slice(6);
		} else {
			let url = get.url(master);
			if (url[url.length - 1] != "/") url += "/";
			sScriptURL = url + str;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function")
			oReq.addEventListener("load", result => {
				if (![0, 200].includes(oReq.status)) {
					// @ts-ignore
					if (typeof onerror == "function") onerror(new Error(oReq.statusText || oReq.status));
					return;
				}
				onload.call(oReq, result);
			});
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", sScriptURL);
		oReq.send();
	}

	/**
	 * 同步lib.init.req
	 */
	reqSync(str, onload, onerror, master) {
		let sScriptURL;
		if (str.startsWith("http")) sScriptURL = str;
		else if (str.startsWith("local:")) {
			if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
				const e = new Error("瀏覽器file協議下無法使用此api，請在http/https協議下使用此api");
				if (typeof onerror == "function") onerror(e);
				else throw e;
				return;
			}
			sScriptURL = lib.assetURL + str.slice(6);
		} else {
			let url = get.url(master);
			if (url[url.length - 1] != "/") url += "/";
			sScriptURL = url + str;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function")
			oReq.addEventListener("load", result => {
				if (![0, 200].includes(oReq.status)) {
					// @ts-ignore
					if (typeof onerror == "function") onerror(new Error(oReq.statusText || oReq.status));
					return;
				}
				onload(result);
			});
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", sScriptURL, false);
		oReq.send();
		if (typeof onload !== "function") return oReq.responseText;
	}

	json(url, onload, onerror) {
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function")
			oReq.addEventListener("load", () => {
				if (![0, 200].includes(oReq.status)) {
					// @ts-ignore
					if (typeof onerror == "function") onerror(new Error(oReq.statusText || oReq.status));
					return;
				}
				let result;
				try {
					result = JSON.parse(oReq.responseText);
					if (!result) throw "err";
				} catch (e) {
					if (typeof onerror == "function") onerror(e);
					return;
				}
				onload(result);
			});
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", url);
		oReq.send();
	}

	/**
	 * 同步lib.init.json
	 */
	jsonSync(url, onload, onerror) {
		if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
			const e = new Error("瀏覽器file協議下無法使用此api，請在http/https協議下使用此api");
			if (typeof onerror == "function") onerror(e);
			else throw e;
			return;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function")
			oReq.addEventListener("load", () => {
				if (![0, 200].includes(oReq.status)) {
					// @ts-ignore
					if (typeof onerror == "function") onerror(new Error(oReq.statusText || oReq.status));
					return;
				}
				let result;
				try {
					result = JSON.parse(oReq.responseText);
					if (!result) throw "err";
				} catch (e) {
					if (typeof onerror == "function") onerror(e);
					return;
				}
				onload(result);
			});
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", url, false);
		oReq.send();
	}

	cssstyles() {
		if (ui.css.styles) {
			ui.css.styles.remove();
		}
		ui.css.styles = lib.init.sheet();
		ui.css.styles.sheet.insertRule("#arena .player>.name,#arena .button.character>.name {font-family: " + (lib.config.name_font || "xinwei") + ",xinwei}", 0);
		ui.css.styles.sheet.insertRule("#arena .player>.name,.button.character>.name {font-family: " + (lib.config.name_font || "xinwei") + ",xinwei}", 0);
		ui.css.styles.sheet.insertRule("#arena .player .identity>div {font-family: " + (lib.config.identity_font || "huangcao") + ",xinwei}", 0);
		ui.css.styles.sheet.insertRule(".button.character.newstyle>.identity {font-family: " + (lib.config.identity_font || "huangcao") + ",xinwei}", 0);
		if (lib.config.cardtext_font && lib.config.cardtext_font != "default") {
			ui.css.styles.sheet.insertRule(".card div:not(.info):not(.background) {font-family: " + lib.config.cardtext_font + ";}", 0);
		}
		if (lib.config.global_font && lib.config.global_font != "default") {
			ui.css.styles.sheet.insertRule("#window {font-family: " + lib.config.global_font + ",xinwei}", 0);
			ui.css.styles.sheet.insertRule("#window #control{font-family: STHeiti,SimHei,Microsoft JhengHei,Microsoft YaHei,WenQuanYi Micro Hei,Suits,Helvetica,Arial,sans-serif}", 0);
		}
		switch (lib.config.glow_phase) {
			case "yellow":
				ui.css.styles.sheet.insertRule("#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(217, 152, 62) 0 0 15px, rgb(217, 152, 62) 0 0 15px !important;}", 0);
				break;
			case "green":
				ui.css.styles.sheet.insertRule("#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgba(10, 155, 67, 1) 0 0 15px, rgba(10, 155, 67, 1) 0 0 15px !important;}", 0);
				break;
			case "purple":
				ui.css.styles.sheet.insertRule("#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(189, 62, 170) 0 0 15px, rgb(189, 62, 170) 0 0 15px !important;}", 0);
				break;
		}
	}

	layout(layout, nosave) {
		const loadingScreen = ui.create.div(".loading-screen", document.body),
			loadingScreenStyle = loadingScreen.style;
		loadingScreenStyle.animationDuration = "1s";
		loadingScreenStyle.animationFillMode = "forwards";
		loadingScreenStyle.animationName = "opacity-0-1";
		if (layout == "default") layout = "mobile";
		if (!nosave) game.saveConfig("layout", layout);
		game.layout = layout;
		ui.arena.hide();
		new Promise(resolve => setTimeout(resolve, 500))
			.then(() => {
				if (game.layout == "default") {
					ui.css.layout.href = "";
				} else {
					ui.css.layout.href = lib.assetURL + "layout/" + game.layout + "/layout.css";
				}
				if (game.layout == "mobile" || game.layout == "long") {
					ui.arena.classList.add("mobile");
				} else {
					ui.arena.classList.remove("mobile");
				}
				if (game.layout == "mobile" || game.layout == "long" || game.layout == "long2" || game.layout == "nova") {
					if (game.me && game.me.node.handcards2.childNodes.length) {
						while (game.me.node.handcards2.childNodes.length) {
							game.me.node.handcards1.appendChild(game.me.node.handcards2.firstChild);
						}
					}
				}
				if (game.layout == "default") {
					ui.arena.classList.add("oldlayout");
				} else {
					ui.arena.classList.remove("oldlayout");
				}
				if (lib.config.cardshape == "oblong" && (game.layout == "long" || game.layout == "mobile" || game.layout == "long2" || game.layout == "nova")) {
					ui.arena.classList.add("oblongcard");
					ui.window.classList.add("oblongcard");
				} else {
					ui.arena.classList.remove("oblongcard");
					ui.window.classList.remove("oblongcard");
				}
				//if(lib.config.textequip=='text'&&(game.layout=='long'||game.layout=='mobile')){
				if (game.layout == "long" || game.layout == "mobile") {
					ui.arena.classList.add("textequip");
				} else {
					ui.arena.classList.remove("textequip");
				}
				if (get.is.phoneLayout()) {
					ui.css.phone.href = lib.assetURL + "layout/default/phone.css";
					ui.arena.classList.add("phone");
				} else {
					ui.css.phone.href = "";
					ui.arena.classList.remove("phone");
				}
				for (var i = 0; i < game.players.length; i++) {
					if (get.is.linked2(game.players[i])) {
						if (game.players[i].classList.contains("linked")) {
							game.players[i].classList.remove("linked");
							game.players[i].classList.add("linked2");
						}
					} else {
						if (game.players[i].classList.contains("linked2")) {
							game.players[i].classList.remove("linked2");
							game.players[i].classList.add("linked");
						}
					}
				}
				if (game.layout == "long" || game.layout == "long2") {
					ui.arena.classList.add("long");
				} else {
					ui.arena.classList.remove("long");
				}
				if (lib.config.player_border != "wide" || game.layout == "long" || game.layout == "long2") {
					ui.arena.classList.add("slim_player");
				} else {
					ui.arena.classList.remove("slim_player");
				}
				if (lib.config.player_border == "normal" && lib.config.mode != "brawl" && (game.layout == "long" || game.layout == "long2")) {
					ui.arena.classList.add("lslim_player");
				} else {
					ui.arena.classList.remove("lslim_player");
				}
				if (lib.config.player_border == "slim") {
					ui.arena.classList.add("uslim_player");
				} else {
					ui.arena.classList.remove("uslim_player");
				}
				if (lib.config.player_border == "narrow") {
					ui.arena.classList.add("mslim_player");
				} else {
					ui.arena.classList.remove("mslim_player");
				}
				ui.updatej();
				ui.updatem();
				return new Promise(resolve => setTimeout(resolve, 100));
			})
			.then(() => {
				ui.arena.show();
				if (game.me) game.me.update();
				return new Promise(resolve => setTimeout(resolve, 500));
			})
			.then(() => {
				ui.updatex();
				ui.updatePlayerPositions();
				return new Promise(resolve => setTimeout(resolve, 500));
			})
			.then(() => {
				ui.updatec();
				loadingScreenStyle.animationName = "opacity-1-0";
				loadingScreen.addEventListener("animationend", animationEvent => animationEvent.target.remove());
			});
	}

	background() {
		if (lib.config.image_background_random) {
			var list = [];
			for (var i in lib.configMenu.appearence.config.image_background.item) {
				if (i == "default") continue;
				list.push(i);
			}
			list.remove(lib.config.image_background);
			localStorage.setItem(lib.configprefix + "background", JSON.stringify(list));
		} else if (lib.config.image_background && lib.config.image_background != "default" && !lib.config.image_background.startsWith("custom_")) {
			localStorage.setItem(lib.configprefix + "background", lib.config.image_background);
		} else if (lib.config.image_background == "default" && lib.config.theme == "simple") {
			localStorage.setItem(lib.configprefix + "background", "ol_bg");
		} else {
			localStorage.removeItem(lib.configprefix + "background");
		}
	}

	/**
	 *
	 * @param {*} item
	 * @param {Function} [scope] 作用域
	 * @returns
	 */
	parsex(item, scope) {
		if (scope) throw new Error("parsex已經被拆分，不再支持scope的使用");
		// parsex 的 Legacy 主體移動到 noname/library/event/compilers/StepCompiler.ts
		return ContentCompiler.compile(item);
	}

	eval(func) {
		if (typeof func == "function") {
			return security.eval(`return (${func.toString()});`);
		} else if (typeof func == "object") {
			for (var i in func) {
				if (Object.prototype.hasOwnProperty.call(func, i)) {
					if (typeof func[i] == "function") {
						let checkObject = {};
						checkObject[i] = func[i];
						return security.eval(`return ${get.stringify(checkObject)};`)[i];
					} else {
						func[i] = lib.init.eval(func[i]);
					}
				}
			}
		}
		return func;
	}

	encode(strUni) {
		var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function (c) {
			var cc = c.charCodeAt(0);
			return String.fromCharCode(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
		});
		strUtf = strUtf.replace(/[\u0800-\uffff]/g, function (c) {
			var cc = c.charCodeAt(0);
			return String.fromCharCode(0xe0 | (cc >> 12), 0x80 | ((cc >> 6) & 0x3f), 0x80 | (cc & 0x3f));
		});
		return btoa(strUtf);
	}

	decode(str) {
		var strUtf = atob(str);
		var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
			var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
			return String.fromCharCode(cc);
		});
		strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
			var cc = ((c.charCodeAt(0) & 0x1f) << 6) | (c.charCodeAt(1) & 0x3f);
			return String.fromCharCode(cc);
		});
		return strUni;
	}

	stringify(obj) {
		var str = "{";
		for (var i in obj) {
			str += '"' + i + '":';
			if (Object.prototype.toString.call(obj[i]) == "[object Object]") {
				str += lib.init.stringify(obj[i]);
			} else if (typeof obj[i] == "function") {
				str += obj[i].toString();
			} else {
				str += JSON.stringify(obj[i]);
			}
			str += ",";
		}
		str += "}";
		return str;
	}

	stringifySkill(obj) {
		var str = "";
		for (var i in obj) {
			str += i + ":";
			if (Object.prototype.toString.call(obj[i]) == "[object Object]") {
				str += "{\n" + lib.init.stringifySkill(obj[i]) + "}";
			} else if (typeof obj[i] == "function") {
				str += obj[i].toString().replace(/\t/g, "");
			} else {
				str += JSON.stringify(obj[i]);
			}
			str += ",\n";
		}
		return str;
	}

	/**
	 * 在返回當前加載的esm模塊相對位置。
	 * @param {*} url 傳入import.meta.url
	 */
	getCurrentFileLocation(url) {
		let head = window.location.href.slice(0, window.location.href.lastIndexOf("/") + 1);
		let ret = url.replace(head, "");
		return decodeURIComponent(ret);
	}

	/**
	 * @param {string | URL} link - 需要解析的路徑
	 * @param {((item: string) => string) | null} [defaultHandle] - 在給定路徑不符合可用情況（或基於無名殺相關默認情況）時，處理路徑的函數，返回的路徑應是相對於根目錄的相對路徑，默認為`null`，當且僅當無法解析成`URL`時會調用該回調
	 * @param {((item: URL) => unknown) | null} [loadAsDataUrlCallback] - 若存在值，則將資源加載為[Data URL](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)，然後傳入進回調函數
	 * @param {boolean} [dbNow] - 此刻是否在解析數據庫中的內容，請勿直接使用
	 * @returns {URL}
	 */
	parseResourceAddress(link, defaultHandle = null, loadAsDataUrlCallback = null, dbNow = false) {
		// 適當的擺了，中文錯誤應該沒人會反對
		if (!link) throw new Error(dbNow ? "傳入的數據庫鏈接中不存在內容" : "請傳入需要解析的鏈接");

		let linkString = link instanceof URL ? link.href : link;

		// 如果傳入值為Data URL，經過分析可知無需處理，故直接返回成品URL
		if (linkString.startsWith("data:")) {
			let result = new URL(linkString);
			if (loadAsDataUrlCallback) loadAsDataUrlCallback(result);
			return result;
		}

		/**
		 * @type {URL}
		 */
		let resultUrl;
		if (linkString.startsWith("ext:")) {
			let resultLink = `extension/${linkString.slice(4)}`;
			resultUrl = new URL(resultLink, rootURL);
		} else if (URL.canParse(linkString)) {
			resultUrl = new URL(linkString);
		} else if (dbNow) {
			let content = new Blob([linkString], { type: "text/plain" });
			get.dataUrlAsync(content).then(loadAsDataUrlCallback);
			// @ts-expect-error 此處的返回值無任何用處
			return;
		} else {
			let resultLink = defaultHandle == null ? linkString : defaultHandle(linkString);
			resultUrl = new URL(resultLink, rootURL);
		}

		if (loadAsDataUrlCallback != null) {
			if (resultUrl.protocol == "db:") {
				// 我思索了一下，如果這玩意能造成無限遞歸
				// 那麼我只能說，你贏了
				game.getDB("image", linkString.slice(3)).then(storeResult => this.parseResourceAddress(storeResult, defaultHandle, loadAsDataUrlCallback, true));
			} else {
				get.blobFromUrl(resultUrl)
					.then(blob => get.dataUrlAsync(blob))
					.then(loadAsDataUrlCallback);
			}
		}

		return resultUrl;
	}
}
