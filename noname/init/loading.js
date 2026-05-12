/**
 * 從讀取的內容中獲取數據
 */

import { ai, setAI } from "../ai/index.js";
import { get, setGet } from "../get/index.js";
import { lib, Library, setLibrary } from "../library/index.js";
import { game, setGame } from "../game/index.js";
import { _status } from "../status/index.js";
import { setUI, ui } from "../ui/index.js";
import { gnc } from "../gnc/index.js";
import { importMode } from "./import.js";
import { Mutex } from "../util/mutex.js";
import { load } from "../util/config.js";
import { isClass } from "../util/index.js";

/**
 * 讀取導入的卡牌包信息
 *
 * @param {importCardConfig} cardConfig
 */
export function loadCard(cardConfig) {
	const cardConfigName = cardConfig.name;

	lib.cardPack[cardConfigName] ??= [];
	if (cardConfig.card) {
		for (let [cardPackName, cardPack2] of Object.entries(cardConfig.card)) {
			if (!(!cardPack2.hidden && cardConfig.translate[`${cardPackName}_info`])) continue;
			lib.cardPack[cardConfigName].add(cardPackName);
		}
	}

	for (const [configName, configItem] of Object.entries(cardConfig)) {
		switch (configName) {
			case "name":
			case "mode":
			case "forbid":
				break;
			case "connect":
				// @ts-ignore
				lib.connectCardPack.push(cardConfigName);
				break;
			case "list":
				if (lib.config.mode === "connect") {
					// @ts-ignore
					lib.cardPackList[cardConfigName] ??= [];
					// @ts-ignore
					lib.cardPackList[cardConfigName].addArray(configItem);
				} else if (lib.config.cards.includes(cardConfigName)) {
					/**
					 * @type {any[]}
					 */
					let pile = typeof configItem == "function" ? configItem() : configItem;

					lib.cardPile[cardConfigName] ??= [];
					lib.cardPile[cardConfigName].addArray(pile);

					if (lib.config.bannedpile[cardConfigName]) {
						pile = pile.filter((_value, index) => !lib.config.bannedpile[cardConfigName].includes(index));
					}

					if (lib.config.addedpile[cardConfigName]) {
						pile = [...pile, ...lib.config.addedpile[cardConfigName]];
					}

					lib.card.list.addArray(pile);
				}
				break;
			default:
				for (const [itemName, item] of Object.entries(configItem)) {
					if (configName === "skill" && itemName[0] === "_" && !item.forceLoad && (lib.config.mode !== "connect" ? !lib.config.cards.includes(cardConfigName) : !cardConfig.connect)) {
						continue;
					}

					if (configName === "translate" && itemName === cardConfigName) {
						lib[configName][`${itemName}_card_config`] = item;
					} else {
						if (lib[configName][itemName] == null) {
							if (configName === "skill" && !item.forceLoad && lib.config.mode === "connect" && !cardConfig.connect) {
								lib[configName][itemName] = {
									nopop: item.nopop,
									derivation: item.derivation,
								};
							} else {
								// @ts-ignore
								Object.defineProperty(lib[configName], itemName, Object.getOwnPropertyDescriptor(configItem, itemName));
							}
						} else {
							console.log(`duplicated ${configName} in card ${cardConfigName}:\n${itemName}:\nlib.${configName}.${itemName}`, lib[configName][itemName], `\ncard.${cardConfigName}.${configName}.${itemName}`, item);
						}

						if (configName === "card" && lib[configName][itemName].derivation) {
							// @ts-ignore
							lib.cardPack.mode_derivation ??= [];
							// @ts-ignore
							lib.cardPack.mode_derivation.push(itemName);
						}
					}
				}
				break;
		}
	}
}

/**
 * 讀取牌堆信息
 */
export function loadCardPile() {
	if (lib.config.mode === "connect") {
		// @ts-ignore
		lib.cardPackList = {};
	} else {
		let pilecfg = lib.config.customcardpile[get.config("cardpilename") || "當前牌堆"];
		if (pilecfg) {
			lib.config.bannedpile = get.copy(pilecfg[0] || {});
			lib.config.addedpile = get.copy(pilecfg[1] || {});
		} else {
			lib.config.bannedpile = {};
			lib.config.addedpile = {};
		}
	}
}

/**
 * 讀取導入的武將包信息
 *
 * @param {importCharacterConfig} character
 */
export function loadCharacter(character) {
	let name = character.name;

	if (character.character) {
		const characterPack = lib.characterPack[name];
		if (characterPack) {
			Object.assign(characterPack, character.character);
		} else {
			lib.characterPack[name] = character.character;
		}
	}

	// 擺了
	for (let key in character) {
		let value = character[key];

		switch (key) {
			case "name":
			case "mode":
			case "forbid":
				break;
			case "connect":
				// @ts-ignore
				if(value==true) lib.connectCharacterPack.push(name);
				break;
			case "disable":
				if(value==true){//角色包無法啟用，其中的角色也不會有禁用等選項
					lib.disableCharacterPack.push(name);
				}
				break;
			case "character":
				if (!lib.config.characters.includes(name) && lib.config.mode !== "connect") {
					if (lib.config.mode !== "boss" || name !== "boss") {
						break;
					}
				}
			// [falls through]
			default:
				if (Array.isArray(lib[key]) && Array.isArray(value)) {
					lib[key].addArray(value);
					break;
				}

				for (let key2 in value) {
					let value2 = value[key2];

					if (key === "character") {
						if (lib.config.forbidai_user && lib.config.forbidai_user.includes(key2)) {
							lib.config.forbidai.add(key2);
						}
						if (Array.isArray(value2)) {
							if (!value2[4]) {
								value2[4] = [];
							}
							if (value2[4].includes("boss") || value2[4].includes("hiddenboss")) {
								lib.config.forbidai.add(key2);
							}
							for (const skill of value2[3]) {
								lib.skilllist.add(skill);
							}
						} else {
							if (value2.isBoss || value2.isHiddenBoss) {
								lib.config.forbidai.add(key2);
							}
							if (value2.skills) {
								for (const skill of value2.skills) {
									lib.skilllist.add(skill);
								}
							}
						}
					}

					if (key === "skill" && key2[0] === "_" && (lib.config.mode !== "connect" ? !lib.config.characters.includes(name) : !character.connect)) {
						continue;
					}

					if (key === "translate" && key2 === name) {
						lib[key][`${key2}_character_config`] = value2;
					} else {
						if (lib[key][key2] == null) {
							if (key === "skill" && !value2.forceLoad && lib.config.mode === "connect" && !character.connect) {
								lib[key][key2] = {
									nopop: value2.nopop,
									derivation: value2.derivation,
								};
							} else if (key === "character") {
								lib.character[key2] = value2;
							} else {
								// @ts-ignore
								Object.defineProperty(lib[key], key2, Object.getOwnPropertyDescriptor(character[key], key2));
							}
							if (key === "card" && lib[key][key2].derivation) {
								// @ts-ignore
								if (!lib.cardPack.mode_derivation) {
									// @ts-ignore
									lib.cardPack.mode_derivation = [key2];
								} else {
									// @ts-ignore
									lib.cardPack.mode_derivation.push(key2);
								}
							}
						} else if (Array.isArray(lib[key][key2]) && Array.isArray(value2)) {
							lib[key][key2].addArray(value2);
						} else {
							console.log(`duplicated ${key} in character ${name}:\n${key2}:\nlib.${key}.${key2}`, lib[key][key2], `\ncharacter.${name}.${key}.${key2}`, value2);
						}
					}
				}
				break;
		}
	}
}

export async function loadExtension(extension) {
	if (!extension[5] && lib.config.mode === "connect") return;

	try {
		_status.extension = extension[0];
		// @ts-ignore
		_status.evaluatingExtension = extension[3];
		if (typeof extension[1] == "function") {
			try {
				await (gnc.is.coroutine(extension[1]) ? gnc.of(extension[1]) : extension[1]).call(extension, extension[2], extension[4]);
			} catch (e) {
				console.log(`加載《${extension[0]}》擴展的content時出現錯誤。`, e);
				// @ts-ignore
				if (!lib.config.extension_alert) alert(`加載《${extension[0]}》擴展的content時出現錯誤。\n該錯誤本身可能並不影響擴展運行。您可以在“設置→通用→無視擴展報錯”中關閉此彈窗。\n${decodeURI(e.stack)}`);
			}
		}

		if (extension[6]) {
			if (isClass(extension[6])) {
				const classInstance = new extension[6]();
				const proto = Object.getPrototypeOf(classInstance);
				const methods = Object.getOwnPropertyNames(proto).filter(methodName => typeof proto[methodName] === "function" && methodName !== "constructor"); //防止把他的屬性加進去了喵

				methods.forEach(methodName => {
					lib.arenaReady?.push(proto[methodName].bind(classInstance));
				});
			} else {
				lib.arenaReady?.push(extension[6]);
			}
		}
		if (extension[4] && !extension[4].nopack) {
			if (typeof extension[4].character?.character == "object" && Object.keys(extension[4].character.character).length > 0) {
				const content = { ...extension[4].character };
				content.name = extension[0];
				content.translate ??= {};
				content.translate[content.name] ??= extension[0];

				// ~~到最後，還得遍歷一遍~~
				// 我就是被拷打，成為新的1103，受到白鼠群的嘲笑謾罵，我也絕不再次遍歷！
				if (content.mode === "guozhan") {
					lib.characterGuozhanFilter.add(content.name);
				}
				for (const [charaName, character] of Object.entries(content.character)) {
					if (lib.config.forbidai_user && lib.config.forbidai_user.includes(charaName)) {
						lib.config.forbidai.add(charaName);
					}
					if (Array.isArray(character)) {
						if (!character[4]) {
							character[4] = [];
						}

						if (!character[4].some(str => typeof str == "string" && /^(?:db:extension-.+?|ext|img):.+/.test(str))) {
							const img = extension[3] ? `db:extension-${extension[0]}:${charaName}.jpg` : `ext:${extension[0]}/${charaName}.jpg`;
							character[4].add(img);
						}
						if (!character[4].some(str => typeof str == "string" && /^die:.+/.test(str))) {
							const audio = `die:ext:${extension[0]}/${charaName}.mp3`;
							character[4].add(audio);
						}

						if (character[4].includes("boss") || character[4].includes("hiddenboss")) {
							lib.config.forbidai.add(charaName);
						}
						for (const skill of character[3]) {
							lib.skilllist.add(skill);
						}
					} else {
						if (!character.img) {
							const characterImage = `extension/${extension[0]}/${charaName}.jpg`;
							character.img = characterImage;
						}
						if (!character.dieAudios) {
							character.dieAudios = [];
							const characterDieAudio = `ext:${extension[0]}/${charaName}.mp3`;
							character.dieAudios.push(characterDieAudio);
						}
						if (character.isBoss || character.isHiddenBoss) {
							lib.config.forbidai.add(charaName);
						}
						if (character.skills) {
							for (const skill of character.skills) {
								lib.skilllist.add(skill);
							}
						}
					}
				}
				if (typeof content.skill == "object") {
					for (const skillInfo of Object.values(content.skill)) {
						extSkillInject(extension[0], skillInfo);
					}
				}

				if (lib.imported.character) {
					lib.imported.character[extension[0]] = content;
				}

				if (!lib.config[`@Experimental.extension.${extension[0]}.character`]) {
					game.saveConfig(`@Experimental.extension.${extension[0]}.character`, true);
					lib.config.characters.add(extension[0]);
					await game.promises.saveConfigValue("characters");
				}

				loadCharacter(content);
			}
			if (typeof extension[4].card?.card == "object" && Object.keys(extension[4].card.card).length > 0) {
				const content = { ...extension[4].card };
				content.name = extension[0];
				content.translate ??= {};
				content.translate[content.name] ??= extension[0];

				// ~~到最後，還得遍歷一遍~~
				// 我就是被拷打，成為新的1103，受到白鼠群的嘲笑謾罵，我也絕不再次遍歷！
				for (const [cardName, card] of Object.entries(content.card)) {
					if (card.audio === true) {
						card.audio = `ext:${extension[0]}`;
					}
					if (!card.image) {
						if (card.fullskin || card.fullimage) {
							const suffix = card.fullskin ? "png" : "jpg";

							if (extension[3]) {
								card.image = `db:extension-${extension[0]}:${cardName}.${suffix}`;
							} else {
								card.image = `ext:${extension[0]}/${cardName}.${suffix}`;
							}
						}
					}
				}
				if (typeof content.skill == "object") {
					for (const skillInfo of Object.values(content.skill)) {
						extSkillInject(extension[0], skillInfo);
					}
				}

				if (lib.imported.card) {
					lib.imported.card[extension[0]] = content;
				}

				if (!lib.config[`@Experimental.extension.${extension[0]}.card`]) {
					game.saveConfig(`@Experimental.extension.${extension[0]}.card`, true);
					lib.config.cards.add(extension[0]);
					await game.promises.saveConfigValue("cards");
				}

				loadCard(content);
			}
			if (typeof extension[4].skill?.skill == "object" && Object.keys(extension[4].skill.skill).length > 0) {
				for (const [skillName, skillInfo] of Object.entries(extension[4].skill.skill)) {
					if (lib.skill[skillName]) {
						console.log(`duplicated skill in extension ${extension[0]}:\n${skillName}:\nlib.skill.${skillName}`, lib.skill[skillName], `\nextension.${extension[0]}.skill.skill.${skillName}`, skillInfo);
						continue;
					}

					extSkillInject(extension[0], skillInfo);
					lib.skill[skillName] = skillInfo;
				}

				if (typeof extension[4].skill.translate == "object") {
					for (const [transName, translate] of Object.entries(extension[4].skill.translate)) {
						if (lib.translate[transName]) {
							console.log(`duplicated translate in extension ${extension[0]}:\n${transName}:\nlib.translate.${transName}`, lib.translate[transName], `\nextension.${extension[0]}.skill.translate.${transName}`, translate);
							continue;
						}

						lib.translate[transName] = translate;
					}
				}
			}
		}
		delete _status.extension;
		// @ts-ignore
		delete _status.evaluatingExtension;
	} catch (e) {
		console.error(e);
	}
}

/**
 * 讀取當前的模式信息
 *
 * @param {importModeConfig} mode
 */
export function loadMode(mode) {
	mixinLibrary(mode, lib);
	mixinGeneral(mode, "game", game);
	mixinGeneral(mode, "ui", ui);
	mixinGeneral(mode, "get", get);
	mixinGeneral(mode, "ai", ai);

	// @ts-ignore
	delete window.noname_character_rank;
	delete window.noname_character_replace;

	["onwash", "onover"].forEach(name => {
		if (game[name]) {
			lib[name]?.push(game[name]);
			delete game[name];
		}
	});

	if (typeof mode.init == "function") {
		mode.init();
	}
}

/**
 * 讀取導入的play信息
 *
 * @param {importPlayConfig} playConfig
 */
export function loadPlay(playConfig) {
	const i = playConfig.name;

	if (lib.config.hiddenPlayPack.includes(i)) return;
	if (playConfig.forbid && playConfig.forbid.includes(lib.config.mode)) return;
	if (playConfig.mode && !playConfig.mode.includes(lib.config.mode)) return;

	// @ts-ignore
	lib.element = mixinElement(playConfig, lib.element);
	mixinGeneral(playConfig, "game", game);
	mixinGeneral(playConfig, "ui", ui);
	mixinGeneral(playConfig, "get", get);
	for (const [configName, configItem] of Object.entries(playConfig)) {
		switch (configName) {
			case "name":
			case "mode":
			case "forbid":
			case "init":
			case "element":
			case "game":
			case "get":
			case "ui":
			case "arenaReady":
				break;
			default:
				for (const [itemName, item] of Object.entries(configItem)) {
					if (configName !== "translate" || itemName !== i) {
						if (lib[configName][itemName] != null) {
							console.log(`duplicated ${configName} in play ${i}:\n${itemName}:\nlib.${configName}.${itemName}`, lib[configName][itemName], `\nplay.${i}.${configName}.${itemName}`, item);
						}
						lib[configName][itemName] = item;
					}
				}
				break;
		}
	}

	if (typeof playConfig.init == "function") playConfig.init();
	if (typeof playConfig.arenaReady == "function") lib.arenaReady?.push(playConfig.arenaReady);
}

function extSkillInject(extName, skillInfo) {
	if (typeof skillInfo.audio == "number" || typeof skillInfo.audio == "boolean") {
		skillInfo.audio = `ext:${extName}:${Number(skillInfo.audio)}`;
	}
}

/**
 * 通用形式的內容注入
 *
 * 由於歷史原因，故直接覆蓋對應的變量
 *
 * @template {Object} T
 * @param {importModeConfig | importPlayConfig} config
 * @param {string} name
 * @param {T} where
 * @return {void}
 */
function mixinGeneral(config, name, where) {
	if (!config[name]) return;

	for (let [key, value] of Object.entries(config[name])) {
		if (["ui", "ai"].includes(name)) {
			if (typeof value == "object") {
				// 我甚至不敢把這個雙等於改了，怕了
				// noinspection EqualityComparisonWithCoercionJS
				if (where[key] == undefined) where[key] = {};
				for (let [key2, value2] of Object.entries(value)) {
					where[key][key2] = value2;
				}
			} else {
				where[key] = value;
			}
		} else {
			where[key] = value;
		}
	}
}

/**
 * `lib`的內容注入
 *
 * @param {importModeConfig | importPlayConfig} config
 * @param {Library} lib
 * @return {void}
 */
function mixinLibrary(config, lib) {
	const KeptWords = ["name", "element", "game", "ai", "ui", "get", "config", "onreinit", "start", "startBefore"];

	// @ts-ignore
	lib.element = mixinElement(config, lib.element);
	lib.config.banned = lib.config[`${lib.config.mode}_banned`] || [];
	lib.config.bannedcards = lib.config[`${lib.config.mode}_bannedcards`] || [];
	// @ts-ignore
	lib.rank = window.noname_character_rank;
	Object.keys(window.noname_character_replace).forEach(i => (lib.characterReplace[i] = window.noname_character_replace[i]));

	for (let name in config) {
		if (KeptWords.includes(name)) continue;
		if (lib[name] == null) lib[name] = Array.isArray(config[name]) ? [] : {};

		Object.assign(lib[name], config[name]);
	}
}

/**
 * `lib.element`的內容注入
 *
 * @param {importModeConfig | importPlayConfig} config
 * @param {Record<string, Object>} element
 * @return {Record<string, Object>}
 */
function mixinElement(config, element) {
	let newElement = { ...element };

	if (config.element) {
		for (let name in config.element) {
			if (!newElement[name]) newElement[name] = [];

			let source = config.element[name];
			let target = newElement[name];

			for (let key in source) {
				if (key === "init") {
					if (!target.inits) target.inits = [];
					target.inits.push(source[key]);
				} else {
					target[key] = source[key];
				}
			}
		}
	}

	return newElement;
}
