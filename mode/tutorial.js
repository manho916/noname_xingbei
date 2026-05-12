import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
/**
 * @type { () => importModeConfig }
 */
export default () => {
	return {
		name:'tutorial',
		start:function(){
			"step 0"
			if (!lib.config.new_tutorial) {
				ui.arena.classList.add("only_dialog");
			}
			"step 1"
            if (!lib.config.new_tutorial) {
                game.delay();
            }
			"step 2"
            if (!lib.config.new_tutorial) {
				_status.new_tutorial = true;
				lib.init.onfree();
				game.saveConfig("version", lib.version);
				var clear = function () {
					ui.dialog.close();
					while (ui.controls.length) ui.controls[0].close();
				};
				var clear2 = function () {
					ui.auto.show();
					ui.arena.classList.remove("only_dialog");
				};
				var finish=function () {
					clear();
					clear2();
					game.saveConfig('mode','xingBei');
					game.reload();
				};
				var step1 = function () {
					ui.create.dialog("歡迎來到無名星杯，是否進入新手嚮導？");
					game.saveConfig("new_tutorial", true);
					ui.dialog.add('<div class="text center">跳過後，你可以在選項-其它中重置新手嚮導');
					ui.auto.hide();
					ui.create.control("跳過嚮導", function () {
						finish();
					});
					ui.create.control("繼續", step2);
				};
				var step2 = function () {
					if (lib.config.touchscreen) {
						clear();
						ui.create.dialog("觸屏模式中，下劃可以顯示菜單，上劃可以切換託管，雙指單擊可以暫停");
						ui.dialog.add('<div class="text center">你可以在選項-通用-中更改手勢設置');
						ui.create.control("繼續", step4);
					} else {
						step3();
					}
				};
				var step3 = lib.genAsync(function* () {
					clear();
					ui.window.classList.add("noclick_important");
					ui.click.configMenu();
					ui.control.classList.add("noclick_click_important");
					ui.control.style.top = "calc(100% - 105px)";
					yield new Promise(resolve => ui.create.control("在菜單中，可以進行各項設置", resolve));
					ui.click.menuTab("選項");
					yield new Promise(resolve => ui.controls[0].replace("如果你感到遊戲較卡，可以開啟流暢模式", resolve));
					ui.click.menuTab("角色");
					yield new Promise(resolve => ui.controls[0].replace("在角色或卡牌一欄中，單擊角色/卡牌可以將其禁用", resolve));
					ui.click.menuTab("擴展");
                    yield new Promise(resolve => ui.controls[0].replace("在擴展中，可以下載和導入擴展", resolve));
                    ui.click.menuTab("其它");
					yield new Promise(resolve => ui.controls[0].replace("在其它中可以更新遊戲，或者管理錄像，查看幫助", resolve));
					ui.click.configMenu();
					ui.window.classList.remove("noclick_important");
					ui.control.classList.remove("noclick_click_important");
					ui.control.style.top = "";
					step4();
				});
				var step4 = function () {
					clear();
					ui.create.dialog("是否查看星杯傳說的視頻教學，可在選項-其他-幫助-關於遊戲中再次查看");
					ui.create.control("查看", function () {
						window.open("https://www.bilibili.com/video/BV1Mo4y1q717/", "_blank");
					});
					ui.create.control("繼續", step5);
				};
				var step5 = function () {
					clear();
					ui.create.dialog("如果還有其它問題，歡迎來到QQ群966951007進行交流");
					ui.create.control("完成", function () {
						finish();
					});
				};
				game.pause();
				step1();
			} else {
				game.showChangeLog();
			}
			"step 3"
			game.saveConfig('mode','xingBei');
			game.reload();
		},
	};
};
