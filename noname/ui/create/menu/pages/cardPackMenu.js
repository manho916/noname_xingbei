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

export const cardPackMenu = function (connectMenu) {
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
	var rightPane = start.lastChild;
	var pileCreated = false;
	var recreatePile = function () {
		lib.config.customcardpile["當前牌堆"] = [lib.config.bannedpile, lib.config.addedpile];
		game.saveConfig("customcardpile", lib.config.customcardpile);
		game.saveConfig("cardpilename", "當前牌堆", true);
		pileCreated = false;
	};

	var clickMode = function () {
		var active = this.parentNode.querySelector(".active");
		if (active === this) {
			return;
		}
		active.classList.remove("active");
		active.link.remove();
		active = this;
		this.classList.add("active");
		updateActiveCard(this);
		if (this.mode == "cardpile") {
			this.create();
		}
		if (this.link) rightPane.appendChild(this.link);
		else {
			this._initLink();
			rightPane.appendChild(this.link);
		}
	};
	setUpdateActiveCard(function (node) {
		if (!node) {
			node = start.firstChild.querySelector(".active");
			if (!node) {
				return;
			}
		}
		if (!node.link) node._initLink();
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
					// 擴展卡牌包開啟邏輯
					if (node.mode.startsWith("mode_extension")) {
						const extName = node.mode.slice(15);
						if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) continue;
						if (lib.config[`extension_${extName}_cards_enable`] == true) {
							node.classList.remove("off");
							node.link?.firstChild?.classList.add('on');
						} else {
							node.classList.add("off");
							if (node.link) node.link.firstChild.classList.remove("on");
						}
					}
					continue;
				}
				if (node.mode == "custom") continue;
				if (node.mode == "cardpile") continue;
				if (connectMenu) {
					if (!lib.config.connect_cards.includes(node.mode)) {
						node.classList.remove("off");
						if (node.link) node.link.firstChild.classList.add("on");
					} else {
						node.classList.add("off");
						if (node.link) node.link.firstChild.classList.remove("on");
					}
				} else {
					if (lib.config.cards.includes(node.mode)) {
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
		// 擴展卡牌包開啟邏輯
		if (name.startsWith("mode_extension")) {
			const extName = name.slice(15);
			if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) return false;
			game.saveExtensionConfig(extName, "cards_enable", bool);
		}
		// 原邏輯
		else {
			if (connectMenu) {
				if (!bool) {
					lib.config.connect_cards.add(name);
				} else {
					lib.config.connect_cards.remove(name);
				}
				game.saveConfig("connect_cards", lib.config.connect_cards);
			} else {
				if (bool) {
					lib.config.cards.add(name);
				} else {
					lib.config.cards.remove(name);
				}
				game.saveConfig("cards", lib.config.cards);
			}
		}
		updateNodes();
	};
	var toggleCardPile = function (bool) {
		var name = this._link.config._name;
		var number = this._link.config._number;
		if (!lib.config.bannedpile[name]) {
			lib.config.bannedpile[name] = [];
		}
		if (bool) {
			lib.config.bannedpile[name].remove(number);
		} else {
			lib.config.bannedpile[name].add(number);
		}
		recreatePile();
	};

	var createModeConfig = function (mode, position) {
		var info = lib.cardPack[mode];
		let cardPack = lib.cardPackInfo[mode];
		if (!lib.cardPile[mode] && cardPack && cardPack.list && Array.isArray(cardPack.list))
			lib.cardPile[mode] = cardPack.list;
		var page = ui.create.div("");
		var node = ui.create.div(
			".menubutton.large",
			lib.translate[mode + "_card_config"],
			position,
			clickMode
		);
		if (node.innerHTML.length >= 5) {
			node.classList.add("smallfont");
		}
		node.mode = mode;
		node._initLink = function () {
			node.link = page;
			var list = [];
			for (var i = 0; i < info.length; i++) {
				if (!lib.card[info[i]]) continue;
				list.push([get.translation(get.type(info[i])), "", info[i]]);
			}
			var sortCard = function (card) {
				var type = lib.card[card[2]].type;
				var subtype = lib.card[card[2]].subtype;
				if (lib.cardType[subtype]) {
					return lib.cardType[subtype];
				}
				if (lib.cardType[type]) {
					return lib.cardType[type];
				}
				switch (type) {
					case "gongJi":
						return 0;
					case "faShu":
						return 1;
					default:
						return 2;
					/*
					case "basic":
						return 0;
					case "chess":
						return 1.5;
					case "trick":
						return 2;
					case "delay":
						return 3;
					case "equip": {
						switch (lib.card[card[2]].subtype) {
							case "equip1":
								return 4.1;
							case "equip2":
								return 4.2;
							case "equip3":
								return 4.3;
							case "equip4":
								return 4.4;
							case "equip5":
								return 4.5;
							default:
								return 4;
						}
					}
					case "zhenfa":
						return 5;
					default:
						return 6;
					*/
				}
			};
			list.sort(function (a, b) {
				var sort1 = sortCard(a);
				var sort2 = sortCard(b);
				if (sort1 == sort2) {
					return b[2] < a[2] ? 1 : -1;
				} else if (sort1 > sort2) {
					return 1;
				} else {
					return -1;
				}
			});
			var cfgnode = createConfig({
				name: "開啟",
				_name: mode,
				init: (() => {
					// 擴展卡牌包開啟邏輯
					if (mode.startsWith("mode_extension")) {
						const extName = mode.slice(15);
						if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) return false;
						// 這塊或許應該在加載擴展時候寫
						if (lib.config[`extension_${extName}_cards_enable`] === undefined) {
							game.saveExtensionConfig(extName, "cards_enable", true);
						}
						return lib.config[`extension_${extName}_cards_enable`] === true;
					}
					// 原邏輯
					else return lib.config.cards.includes(mode);
				})(),
				onclick: togglePack,
			});
			if (!mode.startsWith("mode_") || (cardPack && cardPack.closeable)) {
				page.appendChild(cfgnode);
			} else {
				page.style.paddingTop = "8px";
			}
			var banCard = function (e) {
				if (_status.clicked) {
					_status.clicked = false;
					return;
				}
				if (
					mode.startsWith("mode_") &&
					!mode.startsWith("mode_extension_") &&
					mode != "mode_banned"
				) {
					return;
				}
				ui.click.touchpop();
				this._banning = connectMenu ? "online" : "offline";
				ui.click.intro.call(this, e);
				_status.clicked = false;
				delete this._banning;
			};
			var updateBanned = function () {
				var list;
				if (connectMenu) {
					var mode = cacheMenux.pages[0].firstChild.querySelector(".active");
					if (mode && mode.mode) {
						list = lib.config["connect_" + mode.mode + "_bannedcards"];
					}
				} else {
					list = lib.config[get.mode() + "_bannedcards"];
				}
				if (list && list.includes(this.link[2])) {
					this.classList.add("banned");
				} else {
					this.classList.remove("banned");
				}
			};
			var buttons = ui.create.buttons(list, "vcard", page);
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].classList.add("noclick");
				buttons[i].listen(banCard);
				if (mode != "mode_banned") {
					buttons[i].updateBanned = updateBanned;
				}
			}
			page.classList.add("menu-buttons");
			page.classList.add("leftbutton");
			if (!connectMenu && !lib.config.all.sgscards.includes(mode) && !mode.startsWith("mode_")) {
				ui.create.div(".config.pointerspan", "<span>隱藏卡牌包</span>", page, function () {
					if (this.firstChild.innerHTML == "隱藏卡牌包") {
						this.firstChild.innerHTML = "卡牌包將在重啟後隱藏";
						lib.config.hiddenCardPack.add(mode);
						if (!lib.config.prompt_hidepack) {
							alert("隱藏的擴展包可通過選項-其它-重置隱藏內容恢復");
							game.saveConfig("prompt_hidepack", true);
						}
					} else {
						this.firstChild.innerHTML = "隱藏卡牌包";
						lib.config.hiddenCardPack.remove(mode);
					}
					game.saveConfig("hiddenCardPack", lib.config.hiddenCardPack);
				});
			}
			if ((!mode.startsWith("mode_") || (cardPack && cardPack.closeable)) && lib.cardPile[mode]) {
				var cardpileNodes = [];
				var cardpileexpanded = false;
				if (!lib.config.bannedpile[mode]) {
					lib.config.bannedpile[mode] = [];
				}
				if (!lib.config.addedpile[mode]) {
					lib.config.addedpile[mode] = [];
				}
				ui.create.div(".config.more.pile", "編輯牌堆 <div>&gt;</div>", page, function () {
					if (cardpileexpanded) {
						this.classList.remove("on");
						for (var k = 0; k < cardpileNodes.length; k++) {
							cardpileNodes[k].style.display = "none";
						}
					} else {
						this.classList.add("on");
						for (var k = 0; k < cardpileNodes.length; k++) {
							cardpileNodes[k].style.display = "";
						}
					}
					cardpileexpanded = !cardpileexpanded;
				});
				var cfgnode = ui.create.div(page, ".config.pointerspan.cardpilecfg.toggle");
				var cfgaddcard = ui.create.node("button", "", "添加卡牌", cfgnode, function () {
					this.parentNode.nextSibling.classList.toggle("hidden");
				});
				var cfgbancard = ui.create.node("button", "", "全部關閉", cfgnode, function () {
					for (var i = 0; i < cardpileNodes.length; i++) {
						if (
							cardpileNodes[i].type == "defaultcards" &&
							cardpileNodes[i].classList.contains("on")
						) {
							clickToggle.call(cardpileNodes[i]);
						}
					}
				});
				var cfgenablecard = ui.create.node("button", "", "全部開啟", cfgnode, function () {
					for (var i = 0; i < cardpileNodes.length; i++) {
						if (
							cardpileNodes[i].type == "defaultcards" &&
							!cardpileNodes[i].classList.contains("on")
						) {
							clickToggle.call(cardpileNodes[i]);
						}
					}
				});
				cfgbancard.style.marginLeft = "5px";
				cfgenablecard.style.marginLeft = "5px";
				cardpileNodes.push(cfgnode);
				cfgnode.style.display = "none";
				cfgnode.classList.add("cardpilecfg");
				cfgnode.classList.add("toggle");
				cfgnode.style.marginTop = "5px";
				page.appendChild(cfgnode);

				var cardpileadd = ui.create.div(".config.toggle.hidden.cardpilecfg.cardpilecfgadd", page);
				var pileaddlist = [];
				for (var i = 0; i < lib.config.cards.length; i++) {
					if (!lib.cardPack[lib.config.cards[i]]) continue;
					for (var j = 0; j < lib.cardPack[lib.config.cards[i]].length; j++) {
						var cname = lib.cardPack[lib.config.cards[i]][j];
						pileaddlist.push([cname, get.translation(cname)]);
						if (cname == "sha") {
							pileaddlist.push(["huosha", "火殺"]);
							pileaddlist.push(["leisha", "雷殺"]);
							pileaddlist.push(["icesha", "冰殺"]);
							pileaddlist.push(["cisha", "刺殺"]);
						}
					}
				}
				var cardpileaddname = ui.create.selectlist(pileaddlist, null, cardpileadd);
				cardpileaddname.style.width = "75px";
				cardpileaddname.style.marginRight = "2px";
				cardpileaddname.style.marginLeft = "-1px";
				var cardpileaddsuit = ui.create.selectlist(
					[
						['an', '暗'],
						["di", "地"],
						['lei', '雷'],
						['huo', '火'],
						['shui', '水'],
						['feng', '風'],
						['guang','光'],
					],
					null,
					cardpileadd
				);
				cardpileaddsuit.style.width = "53px";
				cardpileaddsuit.style.marginRight = "2px";
				var cardpileaddnumber = ui.create.selectlist(
					[
						['xue','血'],
						['ji','技'],
						['yong','詠'],
						['huan','幻'],
						['sheng', '聖'],
					],
					null,
					cardpileadd
				);
				cardpileaddnumber.style.width = "43px";
				cardpileaddnumber.style.marginRight = "2px";
				var button = document.createElement("button");
				button.innerHTML = "確定";
				button.style.width = "40px";
				var deletecard = function () {
					this.parentNode.remove();
					var info = this.parentNode._info;
					var list = lib.config.addedpile[mode];
					for (var i = 0; i < list.length; i++) {
						if (list[i][0] == info[0] && list[i][1] == info[1] && list[i][2] == info[2]) {
							list.splice(i, 1);
							break;
						}
					}
					recreatePile();
				};
				button.onclick = function () {
					var card = [cardpileaddsuit.value, cardpileaddnumber.value, cardpileaddname.value];
					lib.config.addedpile[mode].push(card);
					recreatePile();
					var cfgnode = ui.create.div(".config.toggle.cardpilecfg");
					cfgnode._info = card;
					cfgnode.innerHTML =
						get.translation(card[2]) + " " + get.translation(card[0]) + get.translation(card[1]);
						//get.translation(card[2]) + " " + get.translation(card[0]) + get.strNumber(card[1]);
					var cfgnodedelete = document.createElement("span");
					cfgnodedelete.classList.add("cardpiledelete");
					cfgnodedelete.innerHTML = "刪除";
					cfgnodedelete.onclick = deletecard;
					cfgnode.appendChild(cfgnodedelete);
					page.insertBefore(cfgnode, cardpileadd.nextSibling);
				};
				cardpileadd.appendChild(button);
				cardpileadd.style.whiteSpace = "nowrap";
				cardpileNodes.push(cardpileadd);

				for (var i = 0; i < lib.config.addedpile[mode].length; i++) {
					var card = lib.config.addedpile[mode][i];
					var cfgnode = ui.create.div(".config.toggle.cardpilecfg");
					cfgnode._info = card;
					cfgnode.innerHTML =
						(card[2] === "sha" && card[3] ? get.translation(card[3]) : "") +
						get.translation(card[2]) +
						" " +
						get.translation(card[0]) +
						get.translation(card[1]);
						//card[1];
					var cfgnodedelete = document.createElement("span");
					cfgnodedelete.classList.add("cardpiledelete");
					cfgnodedelete.innerHTML = "刪除";
					cfgnodedelete.onclick = deletecard;
					cfgnode.appendChild(cfgnodedelete);
					cfgnode.style.display = "none";
					cardpileNodes.push(cfgnode);
					page.appendChild(cfgnode);
				}

				for (var i = 0; i < lib.cardPile[mode].length; i++) {
					var card = lib.cardPile[mode][i];
					var cfgnode = createConfig({
						name:
							(card[2] == "sha" && card[3] ? get.translation(card[3]) : "") +
							get.translation(card[2]) +
							" " +
							get.translation(card[0]) +
							get.translation(card[1]),
							//get.strNumber(card[1]),
						_number: i,
						_name: mode,
						init: !lib.config.bannedpile[mode].includes(i),
						onclick: toggleCardPile,
					});
					cfgnode.type = "defaultcards";
					cardpileNodes.push(cfgnode);
					cfgnode.style.display = "none";
					cfgnode.classList.add("cardpilecfg");
					page.appendChild(cfgnode);
				}
				ui.create.div(".menuplaceholder", page);
			}
		};
		if (!get.config("menu_loadondemand")) node._initLink();
		return node;
	};
	if (!connectMenu && lib.config.show_ban_menu) {
		lib.cardPack.mode_banned = [];
		for (var i = 0; i < lib.config.all.mode.length; i++) {
			var banned = lib.config[lib.config.all.mode[i] + "_bannedcards"];
			if (banned) {
				for (var j = 0; j < banned.length; j++) {
					lib.cardPack.mode_banned.add(banned[j]);
				}
			}
		}
		var bannednode = createModeConfig("mode_banned", start.firstChild);
		if (lib.cardPack.mode_banned.length == 0) {
			bannednode.style.display = "none";
		}
		delete lib.cardPack.mode_banned;
	}
	for (var i = 0; i < lib.config.all.cards.length; i++) {
		if (connectMenu && !lib.connectCardPack.includes(lib.config.all.cards[i])) continue;
		createModeConfig(lib.config.all.cards[i], start.firstChild);
	}
	if (!connectMenu)
		Object.keys(lib.cardPack).forEach((key) => {
			if (!lib.config.all.cards.includes(key)) createModeConfig(key, start.firstChild);
			if (connectMenu) lib.connectCardPack.add(key);
		});
	var active = start.firstChild.querySelector(".active");
	if (!active) {
		active = start.firstChild.firstChild;
		if (active.style.display == "none") {
			active = active.nextSibling;
		}
		active.classList.add("active");
		updateActiveCard(active);
	}
	if (!active.link) active._initLink();
	rightPane.appendChild(active.link);

	(function () {
		if (connectMenu) return;
		var page = ui.create.div(".menu-buttons");
		var node = ui.create.div(".menubutton.large", "牌堆", clickMode);
		start.firstChild.insertBefore(node, start.firstChild.querySelector(".lefttext"));
		node.link = page;
		node.mode = "cardpile";
		node.create = function () {
			if (pileCreated) return;
			pileCreated = true;
			page.innerHTML = "";

			var pileList = null;
			var createList = function () {
				if (pileList) {
					pileList.remove();
				}
				var list = ["默認牌堆"];
				if (lib.config.customcardpile["當前牌堆"]) {
					list.push("當前牌堆");
				}
				for (var i in lib.config.customcardpile) {
					list.add(i);
				}
				var currentpile = get.config("cardpilename");
				if (!currentpile) {
					if (list.includes("當前牌堆")) {
						currentpile = "當前牌堆";
					} else {
						currentpile = "默認牌堆";
					}
				}
				pileList = ui.create.selectlist(list, currentpile, pileChoose, function (e) {
					game.saveConfig("cardpilename", this.value, true);
					restart.style.display = "";
				});
				pileList.style.float = "right";
			};
			var pileChoose = ui.create.div(".config.toggle.cardpilecfg.nomarginleft", "選擇牌堆", page);
			createList();

			var pileDel = function () {
				delete lib.config.customcardpile[this.parentNode.link];
				this.parentNode.remove();
				game.saveConfig("customcardpile", lib.config.customcardpile);
				for (var i in lib.config.mode_config) {
					if (i == "global") continue;
					if (lib.config.mode_config[i].cardpilename == this.parentNode.link) {
						game.saveConfig("cardpilename", null, i);
					}
				}
				createList();
			};

			var restart = ui.create.div(".config.more", "重新啟動", game.reload, page);
			restart.style.display = "none";
			var createPileNode = function (name) {
				var node = ui.create.div(".config.toggle.cardpilecfg.nomarginleft", name);
				node.link = name;
				var del = document.createElement("span");
				del.innerHTML = "刪除";
				del.classList.add("cardpiledelete");
				del.onclick = pileDel;
				node.appendChild(del);
				if (name == "當前牌堆") {
					page.insertBefore(node, pileChoose.nextSibling);
				} else {
					page.insertBefore(node, restart);
				}
			};
			for (var i in lib.config.customcardpile) {
				createPileNode(i);
			}
			var exportCardPile;
			ui.create.div(".config.more", "保存當前牌堆 <div>&gt;</div>", page, function () {
				this.classList.toggle("on");
				if (this.classList.contains("on")) {
					exportCardPile.classList.remove("hidden");
				} else {
					exportCardPile.classList.add("hidden");
				}
			});
			exportCardPile = ui.create.div(".config.cardpileadd.indent", page);
			exportCardPile.classList.add("hidden");
			ui.create.div("", '名稱：<input type="text"><button>確定</button>', exportCardPile);
			var input = exportCardPile.firstChild.lastChild.previousSibling;
			input.value = "自定義牌堆";
			input.style.marginRight = "3px";
			input.style.width = "120px";
			exportCardPile.firstChild.lastChild.onclick = function () {
				var name = input.value;
				var ok = true;
				if (lib.config.customcardpile[name] || name == "默認牌堆" || name == "當前牌堆") {
					for (var i = 1; i <= 1000; i++) {
						if (!lib.config.customcardpile[name + "(" + i + ")"]) {
							name = name + "(" + i + ")";
							break;
						}
					}
				}
				lib.config.customcardpile[name] = [lib.config.bannedpile, lib.config.addedpile];
				delete lib.config.customcardpile["當前牌堆"];
				for (var i in lib.mode) {
					if (
						lib.config.mode_config[i] &&
						(lib.config.mode_config[i].cardpilename == "當前牌堆" ||
							!lib.config.mode_config[i].cardpilename)
					) {
						game.saveConfig("cardpilename", name, i);
					}
				}
				for (var i = 0; i < page.childElementCount; i++) {
					if (page.childNodes[i].link == "當前牌堆") {
						page.childNodes[i].remove();
						break;
					}
				}
				game.saveConfig("customcardpile", lib.config.customcardpile);
				createPileNode(name);
				createList();
			};
		};
	})();

	if (!connectMenu) {
		// 下面使用了var的特性，請不要在這裡直接改為let
		var node1 = ui.create.div(".lefttext", "全部開啟", start.firstChild, function () {
			game.saveConfig("cards", lib.config.all.cards);
			updateNodes();
		});
		var node2 = ui.create.div(".lefttext", "恢復默認", start.firstChild, function () {
			game.saveConfig("cards", lib.config.defaultcards);
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
		// 判斷菜單欄有沒有加載過這個卡牌包
		if ([...start.firstChild.children].map((node) => node.mode).includes(packName)) return;
		// 顯示不是無名殺自帶的卡牌包
		if (!lib.connectCardPack.includes(packName) && !lib.config.all.cards.includes(packName)) {
			if (!(connectMenu && ["mode_derivation", "mode_banned"].includes(packName))) {
				createModeConfig(packName, start.firstChild, node1);
			}
			if (connectMenu) lib.connectCardPack.add(packName);
		}
	};
};
