// noinspection ES6PreferShortImport

import { game } from "../game/index.js";
import { lib, Library } from "../library/index.js";

/**
 * @param {string} name - 卡牌包名
 * @returns {Promise<void>}
 */
export const importCardPack = generateImportFunction("card", name => `../../card/${name}.js`);

/**
 * @param {string} name - 武將包名
 * @returns {Promise<void>}
 */
export const importCharacterPack = generateImportFunction("character", name => {
	const alreadyModernCharacterPack = lib.config.moderned_chracters || [];

	return alreadyModernCharacterPack.includes(name) ? `../../character/${name}/index.js` : `../../character/${name}.js`;
});

/**
 * @param {string} name - 擴展名
 * @returns {Promise<void>}
 */
export const importExtension = generateImportFunction("extension", name => `../../extension/${name}/extension.js`);

/**
 * @param {string} name - 模式名
 * @returns {Promise<void>}
 */
export const importMode = generateImportFunction("mode", name => `../../mode/${name}.js`);

/**
 * 生成導入
 *
 * @param { 'card' | 'character' | 'extension' | 'mode' } type
 * @param {(name: string) => string} pathParser
 * @returns {(name: string) => Promise<void>}
 */
function generateImportFunction(type, pathParser) {
	return async name => {
		if (type == "extension" && !game.hasExtension(name) && !lib.config.all.stockextension.includes(name)) {
			// @ts-ignore
			await game.import(type, await createEmptyExtension(name));
			return;
		}
		if (type == "mode" && lib.mode[name] && lib.mode[name].fromextension) {
			let loadModeMethod = lib.init["setMode_" + name];
			if (typeof loadModeMethod === "function") {
				await Promise.resolve(loadModeMethod());
				return;
			}
		}
		let path = pathParser(name);
		// 通過瀏覽器自帶的script標籤導入可直接獲取報錯信息，且不會影響JS運行
		// 此時代碼內容也將緩存在瀏覽器中，故再次import後將不會重新執行代碼內容（測試下來如此）
		const [status, script] = await new Promise(resolve => {
			const createScript = () => {
				const script = document.createElement("script");
				script.type = "module";
				script.src = `${lib.assetURL}noname/init/${path}`;
				script.onload = () => resolve(["ok", script]);
				return script;
			};
			let script = createScript();
			script.onerror = e => {
				if (path.endsWith(".js") && window.isSecureContext) {
					path = path.slice(0, -3) + ".ts";
					script.remove();
					let ts = createScript();
					ts.onerror = e2 => {
						if (lib.path.basename(path) === "extension.js" && lib.path.dirname(path).endsWith("/extension")) {
							console.error(`擴展《${name}》加載失敗`, e, e2);
							let remove = confirm(`擴展《${name}》加載失敗，是否移除此擴展？此操作不會移除目錄下的文件。`);
							if (remove) {
								lib.config.extensions.remove(name);
								if (lib.config[`@Experimental.extension.${name}.character`]) {
									game.saveConfig(`@Experimental.extension.${name}.character`);
								}
								if (lib.config[`@Experimental.extension.${name}.card`]) {
									game.saveConfig(`@Experimental.extension.${name}.card`);
								}
								game.saveConfig("extensions", lib.config.extensions);
							}
						}
						resolve(["error", ts]);
					};
					document.head.appendChild(ts);
				} else {
					resolve(["error", script]);
				}
			};
			document.head.appendChild(script);
		});
		script.remove();
		if (status === "error") {
			if (type === "character") {
				console.warn("如果您在擴展中使用了game.import創建角色包，可將以下代碼刪除: lib.config.all.characters.push('角色包名');");
			}
			return;
		}
		const modeContent = await import(path);
		if (!modeContent.type) return;
		if (modeContent.type !== type) throw new Error(`Loaded Content doesn't conform to "${type}" but "${modeContent.type}".`);
		// @ts-ignore
		await game.import(type, modeContent.default);
	};
}

async function createEmptyExtension(name) {
	const extensionInfo = await lib.init.promises.json(`${lib.assetURL}extension/${name}/info.json`).then(info => info, () => {
		return {
			name,
			intro: `擴展<b>《${name}》</b>尚未開啟，請開啟後查看信息。（建議擴展添加info.json以在關閉時查看信息）`,
			author: "未知",
			diskURL: "",
			forumURL: "",
			version: "1.0",
		};
	});
	return {
		name: extensionInfo.name,
		editable: false,
		arenaReady() {},
		content(config, pack) {},
		prepare() {},
		precontent() {},
		config: {},
		help: {},
		package: {
			nopack: true,
			intro: extensionInfo.intro ? extensionInfo.intro.replace("${assetURL}", lib.assetURL) : "",
			author: extensionInfo.author ? extensionInfo.author : "未知",
			diskURL: extensionInfo.diskURL ? extensionInfo.diskURL : "",
			forumURL: extensionInfo.forumURL ? extensionInfo.forumURL : "",
			version: extensionInfo.version ? extensionInfo.version : "1.0.0",
		},
		files: {
			character: [],
			card: [],
			skill: [],
			audio: [],
		},
	};
}
