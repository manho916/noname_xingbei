import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
/**
 * @type { () => importModeConfig }
 */
export default () => {
	return {
		name: "connect",
		start() {
			var directstartmode = lib.config.directstartmode;
			ui.create.menu(true);
			var createNode = function () {
				if (event.created) return;
				if (directstartmode && lib.node) {
					ui.exitroom = ui.create.system(
						"退出房間",
						function () {
							game.saveConfig("directstartmode");
							game.reload();
						},
						true
					);
					game.switchMode(directstartmode);
					return;
				}
				if (lib.node && window.require) {
					ui.startServer = ui.create.system(
						"啟動服務器",
						function (e) {
							ui.click.shortcut(false);
							e.stopPropagation();
							ui.click.connectMenu();
						},
						true
					);
				}

				event.created = true;

				var stack = ui.create.div(".connect-landing-stack", ui.window);
				ui.connectLandingStack = stack;

				var ipBlock = ui.create.div(".shadowed.connect-landing-ip-block", stack);
				ui.create.div(".connect-landing-field-label", "聯機地址", ipBlock);
				var node = ui.create.div(".shadowed.connect-landing-ip", ipBlock);
				node.textContent = lib.config.last_ip || lib.hallURL;
				node.contentEditable = true;
				node.style.webkitUserSelect = "text";
				ui.ipnode = node;

				var button;
				var connect = function (e) {
					button.textContent = "正在連接...";
					clearTimeout(event.timeout);
					if (e) e.preventDefault();
					const ip = node.textContent.replace(/<br>/g, "").trim();
					game.saveConfig("last_ip", ip);
					game.connect(ip, function (success) {
						if (success) {
							game.requireSandboxOn(ip);
							var info = lib.config.reconnect_info;
							if (info && info[0] == _status.ip) {
								game.onlineID = info[1];
								if (typeof (game.roomId = info[2]) == "string") game.roomIdServer = true;
							}
							return;
						}
						if (button) {
							alert("連接失敗");
							button.textContent = "連接";
						}
					});
				};
				node.addEventListener("keydown", function (e) {
					if (e.keyCode == 13) connect(e);
				});

				var markConnectProfileSet = function () {
					if (lib.config.connect_profile_initialized) return;
					game.saveConfig("connect_profile_initialized", true);
					game.saveConfig("connect_profile_initialized", true, "connect");
				};
				var ensureConnectProfile = function () {
					if (lib.config.connect_profile_initialized) return;
					var defaultAvatar = lib.mode.connect.config.connect_avatar.init || "fengZhiJianSheng";
					var nick = lib.config.connect_nickname;
					var customized =
						(typeof nick == "string" && nick != "無" && nick != "無名玩家") ||
						(typeof lib.config.connect_avatar == "string" && lib.config.connect_avatar != defaultAvatar);
					if (customized) {
						markConnectProfileSet();
						return;
					}
					var items = lib.mode.connect.config.connect_avatar.item;
					var keys = Object.keys(items);
					if (!keys.length) keys = Object.keys(lib.character);
					if (keys.length) {
						var pick = keys[Math.floor(Math.random() * keys.length)];
						game.saveConfig("connect_avatar", pick);
						game.saveConfig("connect_avatar", pick, "connect");
					}
					markConnectProfileSet();
				};
				ensureConnectProfile();

				var profile = ui.create.div(".shadowed.connect-landing-profile", stack);
				var avatarNode = ui.create.div(".connect-landing-avatar.pointerdiv", profile);
				avatarNode.setBackground(lib.config.connect_avatar || "fengZhiJianSheng", "character");
				var refreshConnectAvatar = function (id) {
					avatarNode.setBackground(id || lib.config.connect_avatar || "fengZhiJianSheng", "character");
				};
				ui.create.div(".connect-landing-field-label", "暱稱", profile);
				var nameNode = ui.create.div(".connect-landing-nickname", profile);
				nameNode.contentEditable = true;
				nameNode.textContent = get.connectNickname();
				var saveConnectNickname = function () {
					var text = nameNode.textContent.replace(/<br>/g, "").trim();
					if (!text || get.is.banWords(text)) text = "無名玩家";
					text = text.slice(0, 12);
					nameNode.textContent = text;
					game.saveConfig("connect_nickname", text);
					game.saveConfig("connect_nickname", text, "connect");
					markConnectProfileSet();
				};
				nameNode.addEventListener("blur", saveConnectNickname);
				nameNode.addEventListener("keydown", function (e) {
					if (e.keyCode == 13) {
						e.preventDefault();
						nameNode.blur();
					}
				});
				lib.setPopped(
					avatarNode,
					function () {
						var uiintro = ui.create.dialog("hidden", "notouchscroll");
						uiintro.classList.add("connect-landing-avatar-popup");
						uiintro.listen(function (e) {
							e.stopPropagation();
						});
						var list = ui.create.div(".caption");
						var items = lib.mode.connect.config.connect_avatar.item;
						var pickAvatar = function () {
							var id = this.link;
							game.saveConfig("connect_avatar", id);
							game.saveConfig("connect_avatar", id, "connect");
							refreshConnectAvatar(id);
							markConnectProfileSet();
						};
						var randomRow = ui.create.div(".text.textlink", list, function () {
							var keys = Object.keys(items);
							if (!keys.length) return;
							var id = keys[Math.floor(Math.random() * keys.length)];
							game.saveConfig("connect_avatar", id);
							game.saveConfig("connect_avatar", id, "connect");
							refreshConnectAvatar(id);
							markConnectProfileSet();
						});
						randomRow.textContent = "隨機頭像";
						for (var id in items) {
							var row = ui.create.div(".text.textlink", list, pickAvatar);
							row.link = id;
							row.textContent = items[id] || lib.translate[id] || id;
						}
						uiintro.add(list);
						if (lib.config.touchscreen) lib.setScroll(uiintro.contentContainer);
						return uiintro;
					},
					220
				);
				ui.connectProfile = profile;

				button = ui.create.div(".menubutton.highlight.large.pointerdiv.connect-landing-connect-btn", stack);
				button.textContent = "連接";
				ui.ipbutton = button;
				button.listen(connect);

				ui.hall_button = ui.create.system(
					"聯機大廳",
					function () {
						node.textContent = get.config("hall_ip") || lib.hallURL;
						connect();
					},
					true
				);
				if (!get.config("hall_button")) {
					ui.hall_button.style.display = "none";
				}
				ui.recentIP = ui.create.system("最近連接", null, true);
				var clickLink = function () {
					node.textContent = this.textContent;
					connect();
				};
				lib.setPopped(
					ui.recentIP,
					function () {
						if (!lib.config.recentIP.length) return;
						var uiintro = ui.create.dialog("hidden");
						uiintro.listen(function (e) {
							e.stopPropagation();
						});
						var list = ui.create.div(".caption");
						for (var i = 0; i < lib.config.recentIP.length; i++) {
							ui.create.div(".text.textlink", list, clickLink).textContent = get.trimip(lib.config.recentIP[i]);
						}
						uiintro.add(list);
						var clear = uiintro.add('<div class="text center">清除</div>');
						clear.style.paddingTop = 0;
						clear.style.paddingBottom = "3px";
						clear.listen(function () {
							lib.config.recentIP.length = 0;
							game.saveConfig("recentIP", []);
							uiintro.delete();
						});
						return uiintro;
					},
					220
				);
				if (get.config("read_clipboard", "connect")) {
					var ced = false;
					var read = text => {
						try {
							var text2 = text.split("\n")[2];
							var ip = text2.slice(5);
							if (ip.length > 0 && text2.startsWith("聯機地址:") && (ced || confirm("是否根據剪貼板的邀請鏈接以進入聯機地址和房間？"))) {
								node.textContent = ip;
								button.textContent = "正在連接...";
								clearTimeout(event.timeout);
								game.saveConfig("last_ip", ip);
								game.connect(ip, function (success) {
									if (!success && button) {
										alert("邀請鏈接解析失敗");
										button.textContent = "連接";
									}
									if (success) _status.read_clipboard_text = text;
								});
							}
						} catch (e) {
							console.log(e);
						}
					};
					window.focus();
					if (navigator.clipboard && lib.node) {
						navigator.clipboard
							.readText()
							.then(read)
							.catch(_ => {});
					} else {
						var input = ui.create.node("textarea", ui.window, { opacity: "0" });
						input.select();
						var result = document.execCommand("paste");
						input.blur();
						ui.window.removeChild(input);
						if (result || input.value.length > 0) read(input.value);
						else if (confirm("是否輸入邀請鏈接以進入聯機地址和房間？")) {
							ced = true;
							var text = prompt("請輸入邀請鏈接");
							if (typeof text == "string" && text.length > 0) read(text);
						}
					}
				}
				ui.updateSortCardButton();
				lib.init.onfree();
			};
			if (window.isNonameServer) {
				game.connect(window.isNonameServerIp || "localhost");
			} else {
				createNode();
			}
			if (!game.onlineKey) {
				game.onlineKey = localStorage.getItem(lib.configprefix + "key");
				if (!game.onlineKey) {
					game.onlineKey = get.id();
					localStorage.setItem(lib.configprefix + "key", game.onlineKey);
				}
			}
			_status.connectDenied = function () {
				event.created = false;
				createNode();
			};
			setTimeout(lib.init.onfree, 1000);
		},
	};
};
