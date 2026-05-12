import {
	menuContainer,
	popupContainer,
	updateActive,
	setUpdateActive,
	updateActiveCard,
	setUpdateActiveCard,
	menux,
	menuxpages,
	menuUpdates,
	openMenu,
	clickToggle,
	clickSwitcher,
	clickContainer,
	clickMenuItem,
	createMenu,
	createConfig,
} from "../index.js";
import { ui, game, get, ai, lib, _status } from "../../../../../noname.js";

export const characterPackMenu = function (connectMenu) {
	/**
	 * 由於聯機模式會創建第二個菜單，所以需要緩存一下可變的變量
	 */
	// const cacheMenuContainer = menuContainer;
	// const cachePopupContainer = popupContainer;
	const cacheMenux = menux;
	const cacheMenuxpages = menuxpages;
	/** @type { HTMLDivElement } */
	// @ts-ignore
	var start = cacheMenuxpages.shift();
	// 用於切換顯示對應武將包所有武將的界面
	var rightPane = start.lastChild;

	var clickMode = function () {
		var active = this.parentNode.querySelector(".active");
		if (active) {
			if (active === this) {
				return;
			}
			active.classList.remove("active");
			active.link.remove();
		}
		this.classList.add("active");
		updateActive(this);
		if (this.link) rightPane.appendChild(this.link);
		else {
			this._initLink();
			rightPane.appendChild(this.link);
		}
	};
	setUpdateActive(function (node) {
		if (!node) {
			node = start.firstChild.querySelector(".active");
			if (!node) {
				return;
			}
		}
		if (!node.link) {
			node._initLink();
		}
		for (var i = 0; i < node.link.childElementCount; i++) {
			if (node.link.childNodes[i].updateBanned) {
				node.link.childNodes[i].updateBanned();
			}
		}
	});
	var updateNodes = function () {
		for (var i = 0; i < start.firstChild.childNodes.length; i++) {
			var node = start.firstChild.childNodes[i];
			if (node.mode) {
				if (node.mode.startsWith("mode_")) {
					// 擴展武將包開啟邏輯
					if (node.mode.startsWith("mode_extension")) {
						const extName = node.mode.slice(15);
						if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) continue;
						if (lib.config[`extension_${extName}_characters_enable`] == true) {
							node.classList.remove("off");
							if (node.link) node.link.firstChild.classList.add("on");
						} else {
							node.classList.add("off");
							if (node.link) node.link.firstChild.classList.remove("on");
						}
					}
					continue;
				}
				if (node.mode == "custom") continue;
				if (connectMenu) {
					if (!lib.config.connect_characters.includes(node.mode)) {
						node.classList.remove("off");
						if (node.link) node.link.firstChild.classList.add("on");
					} else {
						node.classList.add("off");
						if (node.link) node.link.firstChild.classList.remove("on");
					}
				} else {
					if (lib.config.characters.includes(node.mode)) {
						node.classList.remove("off");
						if (node.link) node.link.firstChild.classList.add("on");
					} else {
						node.classList.add("off");
						if (node.link) node.link.firstChild.classList.remove("on");
					}
				}
			}
		}
	};
	var togglePack = function (bool) {
		var name = this._link.config._name;
		// 擴展武將包開啟邏輯
		if (name.startsWith("mode_extension")) {
			const extName = name.slice(15);
			if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) return false;
			game.saveExtensionConfig(extName, "characters_enable", bool);
		}
		// 原邏輯
		else {
			if (connectMenu) {
				if (!bool) {
					lib.config.connect_characters.add(name);
				} else {
					lib.config.connect_characters.remove(name);
				}
				game.saveConfig("connect_characters", lib.config.connect_characters);
			} else {
				if (bool) {
					lib.config.characters.add(name);
				} else {
					lib.config.characters.remove(name);
				}
				game.saveConfig("characters", lib.config.characters);
			}
		}
		updateNodes();
	};

	var createModeConfig = function (mode, position, position2) {
		var _info = lib.characterPack[mode];
		var page = ui.create.div("");
		var node = ui.create.div(
			".menubutton.large",
			lib.translate[mode + "_character_config"],
			position,
			clickMode
		);
		if (node.innerHTML.length >= 5) {
			node.classList.add("smallfont");
		}
		if (position2) {
			position.insertBefore(node, position2);
		}
		node.mode = mode;
		node._initLink = function () {
			node.link = page;
			page.node = node;
			var list = [];
			var boolAI = true;
			var alterableSkills = [];
			var alterableCharacters = [];
			var charactersToAlter = [];
			for (var i in _info) {
				const characterInfo = _info[i];
				if (characterInfo.isUnseen) continue;
				if (connectMenu && lib.connectBanned.includes(i)) continue;
				list.push(i);
				if (boolAI && !lib.config.forbidai_user.includes(i)) boolAI = false;
				for (var j = 0; j < characterInfo.skills.length; j++) {
					if (!lib.skill[characterInfo.skills[j]]) {
						continue;
					}
					if (lib.skill[characterInfo.skills[j]].alter) {
						alterableSkills.add(characterInfo.skills[j]);
						alterableCharacters.add(i);
						if (lib.config.vintageSkills.includes(characterInfo.skills[j])) {
							charactersToAlter.add(i);
						}
					}
				}
			}
			alterableCharacters.sort();
			list.sort(lib.sort.character);
			var list2 = list.slice(0);
			var cfgnode = createConfig({
				name: "開啟",
				_name: mode,
				init: (() => {
					// 擴展武將包開啟邏輯
					if (mode.startsWith("mode_extension")) {
						const extName = mode.slice(15);
						if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) return false;
						// 這塊或許應該在加載擴展時候寫
						if (lib.config[`extension_${extName}_characters_enable`] === undefined) {
							game.saveExtensionConfig(extName, "characters_enable", true);
						}
						return lib.config[`extension_${extName}_characters_enable`] === true;
					}
					// 原邏輯
					else {
						return connectMenu
							? !lib.config.connect_characters.includes(mode)
							: lib.config.characters.includes(mode);
					}
				})(),
				onclick: togglePack,
			});
			var cfgnodeAI = createConfig({
				name: "僅點角可用",
				_name: mode,
				init: boolAI,
				intro: "將該角色包內的角色全部設置為僅點角可用",
				onclick(bool) {
					if (bool) {
						for (var i = 0; i < list.length; i++) {
							lib.config.forbidai_user.add(list[i]);
						}
					} else {
						for (var i = 0; i < list.length; i++) {
							lib.config.forbidai_user.remove(list[i]);
						}
					}
					game.saveConfig("forbidai_user", lib.config.forbidai_user);
				},
			});
			//不啟用的角色包不增加開啟選項
			if(lib.disableCharacterPack.includes(mode)){
				page.style.paddingTop = "8px";
			}else if (!mode.startsWith("mode_")) {
				cfgnodeAI.style.marginTop = "0px";
				page.appendChild(cfgnode);
				page.appendChild(cfgnodeAI);
				if (alterableCharacters.length) {
					var cfgnode2 = createConfig({
						name: "新版替換",
						_name: mode,
						init: charactersToAlter.length == 0,
						intro: "以下武角色被修改：" + get.translation(alterableCharacters),
						onclick(bool) {
							if (bool) {
								for (var i = 0; i < alterableSkills.length; i++) {
									lib.config.vintageSkills.remove(alterableSkills[i]);
									lib.translate[alterableSkills[i] + "_info"] =
										lib.translate[alterableSkills[i] + "_info_alter"];
								}
							} else {
								for (var i = 0; i < alterableSkills.length; i++) {
									lib.config.vintageSkills.add(alterableSkills[i]);
									lib.translate[alterableSkills[i] + "_info"] =
										lib.translate[alterableSkills[i] + "_info_origin"];
								}
							}
							game.saveConfig("vintageSkills", lib.config.vintageSkills);
						},
					});
					cfgnode2.style.marginTop = "0px";
					page.appendChild(cfgnode2);
				}
			} else if (mode.startsWith("mode_extension")) {
				// 排除4個基本擴展，再排除劍閣武將包
				// 給擴展的武將包加一個開啟關閉的功能
				if (
					!lib.config.all.stockextension.includes(mode.slice(15)) &&
					mode != "mode_extension_jiange"
				) {
					page.appendChild(cfgnode);
					cfgnodeAI.style.marginTop = "0px";
				}
				page.appendChild(cfgnodeAI);
			} else {
				page.style.paddingTop = "8px";
			}
			var banCharacter = function (e) {
				if (_status.clicked) {
					_status.clicked = false;
					return;
				}
				if (
					mode.startsWith("mode_") &&
					!mode.startsWith("mode_extension_") &&
					mode != "mode_favourite" &&
					mode != "mode_banned"
				) {
					if (!connectMenu && lib.config.show_charactercard) {
						ui.click.charactercard(this.link, this, mode == "mode_guozhan" ? "guozhan" : true);
					}
					return;
				}
				ui.click.touchpop();
				this._banning = connectMenu ? "online" : "offline";
				if (!connectMenu && lib.config.show_charactercard) {
					ui.click.charactercard(this.link, this);
				} else {
					ui.click.intro.call(this, e);
				}
				_status.clicked = false;
				delete this._banning;
			};
			var updateBanned = function () {
				var _list;
				if (connectMenu) {
					var mode = cacheMenux.pages[0].firstChild.querySelector(".active");
					if (mode && mode.mode) {
						_list = lib.config["connect_" + mode.mode + "_banned"];
					}
				} else {
					_list = lib.config[get.mode() + "_banned"];
				}
				if (_list && _list.includes(this.link)) {
					this.classList.add("banned");
				} else {
					this.classList.remove("banned");
				}
			};
			if (lib.characterSort[mode]) {
				var listb = [];
				if (!connectMenu) {
					listb = lib.config[get.mode() + "_banned"] || [];
				} else {
					var modex = cacheMenux.pages[0].firstChild.querySelector(".active");
					if (modex && modex.mode) {
						listb = lib.config["connect_" + modex.mode + "_banned"];
					}
				}
				for (var pak in lib.characterSort[mode]) {
					var info = lib.characterSort[mode][pak];
					var listx = [];
					var boolx = false;
					for (var ii = 0; ii < list2.length; ii++) {
						if (info.includes(list2[ii])) {
							listx.add(list2[ii]);
							if (!listb.includes(list2[ii])) boolx = true;
							list2.splice(ii--, 1);
						}
					}
					if (listx.length) {
						var cfgnodeY = {
							name: lib.translate[pak],
							intro: lib.translate[pak + '_info'] || false,
							_name: pak,
							init: boolx,
							onclick(bool) {
								var banned = [];
								if (connectMenu) {
									var modex = cacheMenux.pages[0].firstChild.querySelector(".active");
									if (modex && modex.mode) {
										banned = lib.config["connect_" + modex.mode + "_banned"];
									}
								} else if (_status.connectMode) return;
								else banned = lib.config[get.mode() + "_banned"] || [];
								var listx = lib.characterSort[mode][this._link.config._name];
								if (bool) {
									for (var i = 0; i < listx.length; i++) {
										banned.remove(listx[i]);
									}
								} else {
									for (var i = 0; i < listx.length; i++) {
										banned.add(listx[i]);
									}
								}
								game.saveConfig(
									connectMenu
										? "connect_" + modex.mode + "_banned"
										: get.mode() + "_banned",
									banned
								);
								updateActive();
							},
						};
						if (
							mode.startsWith("mode_") &&
							!mode.startsWith("mode_extension_") &&
							!mode.startsWith("mode_guozhan")
						) {
							cfgnodeY.clear = true;
							delete cfgnodeY.onclick;
						}
						var cfgnodeX = createConfig(cfgnodeY);
						page.appendChild(cfgnodeX);
						var buttons = ui.create.buttons(listx, "character", page);
						for (var i = 0; i < buttons.length; i++) {
							buttons[i].classList.add("noclick");
							buttons[i].listen(banCharacter);
							ui.create.rarity(buttons[i]);
							buttons[i].node.hp.style.transition = "all 0s";
							buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
							if (mode != "mode_banned") {
								buttons[i].updateBanned = updateBanned;
							}
						}
					}
				}
				if (list2.length) {
					var cfgnodeX = createConfig({
						name: "其他",
						_name: "others",
						clear: true,
					});
					page.appendChild(cfgnodeX);
					var buttons = ui.create.buttons(list2, "character", page);
					for (var i = 0; i < buttons.length; i++) {
						buttons[i].classList.add("noclick");
						buttons[i].listen(banCharacter);
						ui.create.rarity(buttons[i]);
						buttons[i].node.hp.style.transition = "all 0s";
						buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
						if (mode != "mode_banned") {
							buttons[i].updateBanned = updateBanned;
						}
					}
				}
			} else {
				var buttons = ui.create.buttons(list, "character", page);
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].classList.add("noclick");
					ui.create.rarity(buttons[i]);
					buttons[i].listen(banCharacter);
					buttons[i].node.hp.style.transition = "all 0s";
					buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
					if (mode != "mode_banned") {
						buttons[i].updateBanned = updateBanned;
					}
				}
			}
			page.classList.add("menu-buttons");
			page.classList.add("leftbutton");
			if (!connectMenu) {
				if (lib.config.all.sgscharacters.includes(mode)) {
					ui.create.div(
						".config.pointerspan",
						'<span style="opacity:0.5">該角色包不可被隱藏</span>',
						page
					);
				} else if (!mode.startsWith("mode_")) {
					ui.create.div(".config.pointerspan", "<span>隱藏角色包</span>", page, function () {
						if (this.firstChild.innerHTML == "隱藏角色包") {
							if (
								confirm(
									"真的要隱藏“" +
										get.translation(mode + "_character_config") +
										"”角色包嗎？\n建議使用“關閉”而不是“隱藏”功能，否則將會影響其他相關角色包的正常運行！"
								)
							) {
								this.firstChild.innerHTML = "角色包將在重啟後隱藏";
								lib.config.hiddenCharacterPack.add(mode);
								if (!lib.config.prompt_hidepack) {
									alert("隱藏的擴展包可通過選項-其它-重置隱藏內容恢復");
									game.saveConfig("prompt_hidepack", true);
								}
							}
						} else {
							this.firstChild.innerHTML = "隱藏角色包";
							lib.config.hiddenCharacterPack.remove(mode);
						}
						game.saveConfig("hiddenCharacterPack", lib.config.hiddenCharacterPack);
					});
				}
			}
		};
		if (!get.config("menu_loadondemand")) node._initLink();
		return node;
	};
	if (lib.config.show_favourite_menu && !connectMenu && Array.isArray(lib.config.favouriteCharacter)) {
		lib.characterPack.mode_favourite = {};
		for (var i = 0; i < lib.config.favouriteCharacter.length; i++) {
			var favname = lib.config.favouriteCharacter[i];
			if (lib.character[favname]) {
				lib.characterPack.mode_favourite[favname] = lib.character[favname];
			}
		}
		var favouriteCharacterNode = createModeConfig("mode_favourite", start.firstChild);
		if (!favouriteCharacterNode.link) favouriteCharacterNode._initLink();
		ui.favouriteCharacter = favouriteCharacterNode.link;
		if (get.is.empty(lib.characterPack.mode_favourite)) {
			ui.favouriteCharacter.node.style.display = "none";
		}
		delete lib.characterPack.mode_favourite;
	}
	if (!connectMenu && lib.config.show_ban_menu) {
		lib.characterPack.mode_banned = {};
		for (var i = 0; i < lib.config.all.mode.length; i++) {
			var banned = lib.config[lib.config.all.mode[i] + "_banned"];
			if (banned) {
				for (var j = 0; j < banned.length; j++) {
					if (lib.character[banned[j]]) {
						lib.characterPack.mode_banned[banned[j]] = lib.character[banned[j]];
					}
				}
			}
		}
		var bannednode = createModeConfig("mode_banned", start.firstChild);
		if (get.is.empty(lib.characterPack.mode_banned)) {
			bannednode.style.display = "none";
		}
		delete lib.characterPack.mode_banned;
	}
	var characterlist = connectMenu ? lib.connectCharacterPack : lib.config.all.characters;
	for (var i = 0; i < characterlist.length; i++) {
		createModeConfig(characterlist[i], start.firstChild);
	}
	if (!connectMenu)
		Object.keys(lib.characterPack).forEach((key) => {
			// 單機模式下顯示不在lib.config.all.characters裡的武將包
			if (!characterlist.includes(key)) createModeConfig(key, start.firstChild);
			if (connectMenu) lib.connectCharacterPack.add(key);
		});
	var active = start.firstChild.querySelector(".active");
	if (!active) {
		active = start.firstChild.firstChild;
		if (active.style.display == "none") {
			active = active.nextSibling;
			if (active.style.display == "none") {
				active = active.nextSibling;
			}
		}
		active.classList.add("active");
		updateActive(active);
	}
	if (!active.link) active._initLink();
	rightPane.appendChild(active.link);

	if (!connectMenu) {
		// 下面使用了var的特性，請不要在這裡直接改為let
		var node1 = ui.create.div(".lefttext", "全部開啟", start.firstChild, function () {
			game.saveConfig("characters", lib.config.all.characters);
			updateNodes();
		});
		var node2 = ui.create.div(".lefttext", "恢復默認", start.firstChild, function () {
			game.saveConfig("characters", lib.config.defaultcharacters);
			updateNodes();
		});
		node1.style.marginTop = "12px";
		node2.style.marginTop = "7px";
	}

	updateNodes();

	/**
	 * 在菜單欄初始化完成後，如果又加載了武將包，進行刷新
	 *
	 * @param { string } packName
	 */
	return function (packName) {
		// 判斷菜單欄有沒有加載過這個武將包
		if ([...start.firstChild.children].map((node) => node.mode).includes(packName)) return;
		// 顯示不是無名殺自帶的武將包
		if (!lib.connectCharacterPack.includes(packName) && !lib.config.all.characters.includes(packName)) {
			createModeConfig(packName, start.firstChild, node1);
			if (connectMenu) lib.connectCharacterPack.add(packName);
		}
	};
};
