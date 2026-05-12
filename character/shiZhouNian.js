import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shiZhouNian',
		connect:true,
        characterSort:{
            shiZhouNian:{
                "3xing":['fengZhiJianSheng','kuangZhanShi','shenJianShou','fengYinShi','anShaZhe','shengNv','tianShi','moFaShaoNv'],
                "3.5xing":['moJianShi','shengQiangQiShi','yuanSuShi','maoXianJia','wenYiFaShi','zhongCaiZhe','jingLingSheShou','nvWuShen'],
                "4xing":['shenGuan','yingLingRenXing','yinYangShi','moGong','xianZhe','lingFuShi','cangYanMoNv','moQiang','xueSeJianLing','qiDaoShi','hongLianQiShi'],
                "4.5xing":['lingHunShuShi','yongZhe','yinYouShiRen','geDouJia','shengGong','shouLingWuShi',"jianDi"],
                "5xing":["yueZhiNvShen",'xueZhiWuNv','dieWuZhe'],
            }
        },
		character:{
			fengZhiJianSheng:['fengZhiJianSheng_name','jiGroup',3,['fengNuZhuiJi','shengJian','lieFengJi','jiFengJi','jianYing'],],
            kuangZhanShi:['kuangZhanShi_name','xueGroup',3,['kuangHua','xueYingKuangDao','xueXingPaoXiao','siLie'],],
            shenJianShou:['shenJianShou_name','jiGroup',3,['shanDianJian','guanChuanSheJi','shanGuangXianJing','jingZhunSheJi','juJi'],],
            fengYinShi:['fengYinShi_name','huanGroup',3,['faShuJiDang','diZhiFengYin','shuiZhiFengYin','huoZhiFengYin','fengZhiFengYin','leiZhiFengYin','wuXiShuFu','fengYinPoSui'],],
            anShaZhe:['anShaZhe_name','jiGroup',3,['fanShi','shuiYing','qianXing'],],
            shengNv:['shengNv_name','shengGroup',3,['bingShuangDaoYan','zhiLiaoShu','zhiYuZhiGuang','lianMin','shengLiao'],],
            tianShi:['tianShi_name','shengGroup',3,['fengZhiJieJing','tianShiZhuFu','tianShiJiBan','tianShiZhiQiang','tianShiZhiGe','shenZhiBiHu'],],
            moFaShaoNv:['moFaShaoNv_name','yongGroup',3,['moBaoChongJi','moDanZhangWo','moDanRongHe','huiMieFengBao'],],
            moJianShi:['moJianShi_name','huanGroup','3/4',['xiuLuoLianZhan','anYingNingJu','anYingZhiLi','anYingKangJu','anYingLiuXing','huangQuanZhengChan'],],
            shengQiangQiShi:['shengQiangQiShi_name','shengGroup','3/4',['shenShengXinYang','huiYao','chengJie','shengJi','tianQiang','diQiang','shengGuangQiYu'],],
            yuanSuShi:['yuanSuShi_name','yongGroup','3/4',['yuanSuXiShou','yuanSuDianRan','yunShi','bingDong','huoQou','fengRen','leiJi','yueGuang','yuanSu'],],
            maoXianJia:['maoXianJia_name','huanGroup','3/4',['qiZha','qiangYun','diXiaFaZe','maoXianJiaTianTang','touTianHuanRi'],],
            wenYiFaShi:['wenYiFaShi_name','huanGroup','3/4',['buXiu','shengDu','wenYi','siWangZhiChu','juDuXinXing'],],
            zhongCaiZhe:['zhongCaiZhe_name','xueGroup','3/4',['zhongCaiFaZe','yiShiZhongDuan','moRiShenPan','shenPanLangChao','zhongCaiYiShi','panJueTianPing','shenPan'],],
            shenGuan:['shenGuan_name','shengGroup',4,['shenShengQiShi','shenShengQiFu','shuiZhiShenLi','shengShiShouHu','shenShengQiYue','shenShengLingYu'],],
            qiDaoShi:['qiDaoShi_name','yongGroup',4,['guangHuiXinYang','heiAnZuZhou','weiLiCiFu','xunJieCiFu','qiDao','faLiChaoXi','qiDaoFuWen'],],
            xianZhe:['xianZhe_name','yongGroup',4,['zhiHuiFaDian','faShuFanTan','moDaoFaDian','shengJieFaDian'],],
            lingFuShi:['lingFuShi_name','yongGroup',4,['lingFu_leiMing','lingFu_fengXing','nianZhou','baiGuiYeXing','lingLiBengJie','yaoLi'],],
            jianDi:['jianDi_name','jiGroup','4/5',['jianHunShouHu','yangGong','jianQiZhan','tianShiZhiHun','eMoZhiHun','buQuYiZhi','jianHun','jianQi'],],
            geDouJia:['geDouJia_name','jiGroup','4/5',['nianQiLiChang','xuLiYiji','nianDan','baiShiHuanLongQuan','qiJueBengJi','douShenTianQu','douQi'],],
            yongZhe:['yongZhe_name','xueGroup','4/5',['yongZheZhiXin','nuHou','jinPiLiJin','mingJingZhiShui','tiaoXin','jinDuanZhiLi','siDou','nuQi','zhiXing'],],
            lingHunShuShi:['lingHunShuShi_name','huanGroup','4/5',["lingHunTunShi","lingHunZhaoHuan",'lingHunZhuanHuan',"lingHunJingXiang","lingHunZhenBao","lingHunFuYu","lingHunLianJie","lingHunZengFu","huangSeLingHun","lanSeLingHun"],],
            xueZhiWuNv:['xueZhiWuNv_name','xueGroup',5,['xueZhiAiShang','liuXue','niLiu','xueZhiBeiMing','tongShengGongSi','xueZhiZuZhou'],],
            dieWuZhe:['dieWuZhe_name','yongGroup',5,['shengMingZhiHuo','wuDong','duFen','chaoSheng','jingHuaShuiYue','diaoLing','yongHua','daoNiZhiDie','jian','DWZyong'],],
            nvWuShen:['nvWuShen_name','shengGroup','3/4',['shenShengZhuiJi','zhiXuZhiYin','hePingXingZhe','junShenWeiGuang','yingLingZhaoHuan'],],
            moGong:['moGong_name','huanGroup',4,['moGuanChongJi','leiGuangSanShe','duoChongSheJi','chongNeng','moYan','chongNengPai'],],
            hongLianQiShi:['hongLianQiShi_name','xueGroup',4,['xingHongShengYue','xingHongXinYang','xueXingDaoYan','shaLuShengYan','reXueFeiTeng','jieJiaoJieZao','xingHongShiZi','xueYin'],],
            yingLingRenXing:['yingLingRenXing_name','yongGroup',4,['zhanWenZhangWo','nuHuoYaZhi','zhanWenSuiJi','moWenRongHe','fuWenGaiZao','shuangChongHuiXiang','zhanWen','moWen'],],
            moQiang:['moQiang_name','huanGroup',4,['anZhiJieFang','huanYingXingChen','heiAnShuFu','anZhiZhangBi','chongYing','qiHeiZhiQiang'],],
            cangYanMoNv:['cangYanMoNv_name','xueGroup',4,['cangYanFaDian','tianHuoDuanKong','moNvZhiNu','tiShenWanOu','yongShengYinShiJi','tongKuLianJie','moNengFanZhuan','chongSheng'],],
            yinYouShiRen:['yinYouShiRen_name','huanGroup','4/5',['chenLunXieZouQu','buXieHeXian','jinJiShiPian','yongHengYueZhangX','xiWangFuGeQu','lingGan'],],
            jingLingSheShou:['jingLingSheShou_name','jiGroup','3/4',['yuanSuSheJi','dongWuHuoBan','jingLingMiYi','chongWuQiangHua','zhuFu'],],
            yinYangShi:['yinYangShi_name','huanGroup',4,['shiShenJiangLin','yinYangZhanHuan','shiShenZhuanHuan','heiAnJiLi','shiShenZhouShu','shengMingJieJie','guiHuo'],],
            xueSeJianLing:['xueSeJianLing_name','xueGroup',4,['xueSeJingJi','chiSeYiShan','xueRanQiangWei','xueQiPingZhang','xueQiangWeiTingYuan','sanHuaLunWu','xianXue'],],
            yueZhiNvShen:['yueZhiNvShen_name','shengGroup',5,['xinYueBiHu','anYueZuZhou','meiDuShaZhiYan','yueZhiLunHui','yueDu','anYueZhan','cangBaiZhiYue','xinYue','shiHua','anYue'],],
            shouLingWuShi:['shouLingWuShi_name','jiGroup','4/5',['wuZheCanXin','yiJiWuNian','shouHunYiNian','shouHunJingJie','shouFan','yuHunLiuJuHeXingTai','niFanJuHeZhan','yuHunLiuJuHeShi','shouHun','canXin'],],
            shengGong:['shengGong_name','shengGroup','4/5',['tianZhiGong','shengXieJuBao','shengHuangJiangLin','shengGuangBaoLie','liuXingShengDan','shengHuangHuiGuangPao','ziDongTianChong','xinYang','shengHuangHuiGuangPaoX'],],

		},

        characterIntro: {
			fengZhiJianSheng:"風之劍聖有著極高的攻擊頻率，一旦得到了風的強力賜福，更可以讓他打出無數絢麗的連擊和傷害。再加上其本身擁有的“聖劍”，在傷害輸出上不容小覷，更是團隊【寶石】獲得的得力助手",
            kuangZhanShi:"狂戰士毋庸置疑的擁有本作最強大的物理攻擊輸出能力，特別是對於防禦力弱和擁有治療的角色更是能製造出絕對的碾壓和毀滅傷害。其唯一的弱點就是命中率，因此由隊友掩護攻擊或攻擊防禦薄弱的角色是狂戰取勝之道",
            shenJianShou:"其精準的射擊總是能令對手防不勝防。作為本作命中數一數二的職業，神箭手往往是團隊攻擊鏈最後致命一擊的締造者。她的必殺技更是控場神技，總是能令對方的如意算盤全部落空",
            fengYinShi:"封印師是唯一一個能將法術和攻擊如此完美結合在一起的職業，再加上她強有力的五種封印和“五系束縛”，相信所有與她敵對的角色都會痛苦不堪",
            anShaZhe:"沒有人會去主動惹暗殺者的麻煩，因為他的反擊總是會讓你後悔剛才做出的決定；也沒有人會把他當做一個默默無聞的路人甲，因為當他亮出匕首的時候，你就再也無法閃躲了",
            shengNv:`外表弱小的聖女有著極強的防禦和治療能力。在她的保護下，很多需要厚積薄發的職業能得到全面的呵護成長，更是許多爆發性職業的全職奶媽`,
            tianShi:`守護天使的治療能力雖不是聖類職業中最強的，但是她對於團隊的輔助作用卻是全職業中效果最為顯著的。“天使之牆”和“風之潔淨”能大大的提高團隊的防禦能力，而在其強大的必殺技“神之庇護”面前，法術系職業往往無可奈何`,
            moFaShaoNv:`小範圍的區域傷害是魔法少女的特長，她更可以把魔彈隨意的使用和施放。在積累了一定的能量之後，強大的“毀滅風暴”更是可以讓所有對手都品嚐到何為魔法的洗禮和衝擊`,
            moJianShi:"藉助暗影之力的魔劍士，既無法使用法術，更是會受到黑暗的侵蝕。但這種雙刃劍施放在對手身上的時候，又是無比的震撼和爽快，在烈火永生的黃泉面前，生與死只在一念之間",
            shengQiangQiShi:`治療對於聖槍騎士而言，既是優秀的防禦源泉，也是攻擊的傷害利器。強大的聖槍騎士總是能運用場上的所有治療為她所用，狠狠地發洩到她的對手身上。她的天槍和地槍總是讓每個對手都膽戰心驚`,
            yuanSuShi:`元素師對於元素有著近乎瘋狂的摯愛，他能從每種元素中提煉出獨特的能力並加以使用，在積累一定的元素能量後還能額外釋放出強大的追加效果`,
            maoXianJia:"在這樣一個危險的大陸還敢冒險的人一定具備著以下三種素質：近乎難以置信的運氣、讓大家都有利可圖的能力、遇到危險時跑的足夠快",
            wenYiFaShi:"擁有者不死之軀的瘟疫法師對於法術有著近乎免疫的強大抵抗能力，對人類意味著重生和保護的治療能在瘟疫法師的手裡轉變為死亡和毀滅的邪惡力量",
            zhongCaiZhe:"以眼還眼以牙還牙，仲裁者會把所有對她造成的傷害轉化為強大的審判力量，通過末日審判來裁決這一切。每一個她的敵人都設法逃脫，但審判終將到來",
            shenGuan:"神官作為一個擁有堅定信念的神職人員擁有者幾乎可以讓人起死回生的強大復生能力。在其堅定的神聖信仰下，她的敵人都終將被消滅而她的隊友一個都不會倒下",
            qiDaoShi:"祈禱師能激發出她隊友內心強大的力量和驚人的速度。此外，在她的祈禱之下，連光明與黑暗的力量都將為她所用",
            xianZhe:`睿智博學的賢者擁有能改變命運的三本魔法法典：智慧、聖潔和魔道。每一本都積攢著前人對奧術能量的深厚研究，而賢者是唯一一個能夠完全利用它們的人`,
            lingFuShi:"風與雷之中總是蘊含著能被靈符師利用的強大能量，甚至是在靈符使用完畢之後還能抽取其中的妖力為自己所用，在特定的情形下再度爆發",
            jianDi:`傳說中劍帝有一把可以相互轉化的符文劍：在幫助善良人的時候它會透出聖潔的光芒；而在斬殺惡魔時，那把劍會散發出比惡魔更邪惡的力量來`,
            geDouJia:`格鬥家天生的念氣體魄讓其擁有足以擊碎岩石的巨大力量，但其唯一的弱點就是需要積攢的時間和落空時對自己巨大的反噬傷害，不過幸好她還有強大的念氣力場來保護自己`,
            yongZhe:"怒氣與知性這一對彷彿不可調和的矛盾卻在勇者身上被煉化為一致。擁有怒氣時的超強爆發與使用知性時的百發百中讓勇者成為星杯傳說中的強者",
            lingHunShuShi:"控制並利用靈魂是靈魂術士一族所獨具的強大能力，錯綜多樣的靈魂類別會使得很多學徒級的靈魂術士手忙腳亂。而對於精通利用靈魂的大師級靈魂術士而言，卻能把每一個靈魂都發揮出最大的利用價值和使用效率",
            xueZhiWuNv:`被鮮血詛咒的血之巫女原本是一個試驗品，現在她帶著充滿毀滅的鮮血能力來進行她的復仇計劃。流淌在她全身的每一滴鮮血都是武器，這種武器有時候連她都完全沒法控制`,
            dieWuZhe:"蝶舞者是一位能夠操縱靈蝶的幻術師，從靈蝶身上散佈的毒粉會慢慢滲透到敵人的肌膚裡產生劇毒，它們有著強大的繁衍能力，隨著其數量的不斷增加，所有人都會被其吞噬殆盡",
            nvWuShen:`米涅瓦：力量對於她來說是一種藝術，每一種技巧和武藝對於她來說同樣是一種藝術，將各種各樣的藝術融會貫通，鑄就了女武神不敗的威名<br>
            栞蒂：作為“女武神計劃”的最終產物，她擁有的技巧和實力幾乎完美再現了當年女武神的威風`,
            moGong:`魔弓為了超越她的姐姐，捨棄了原本應當追尋技巧與速度的弓之奧義，而將所有的箭術魔化為強大的充能能量，力求在爆發力與AOE上做到極致與完美`,
            hongLianQiShi:"背棄原初信仰的紅蓮騎士，在被神詛咒著的同時也掌握了破壞力更為強大的墮落力量，讓敵人溺斃在自己的鮮血之中是令她最為愉悅的殺戮手段",
            yingLingRenXing:"純粹為戰鬥而生的人形，自誕生之日便掌握神秘的紋章力量，並運用這種力量將前進道路上的障礙統統粉碎",
            moQiang:`被幻之星塵同化的魔槍在獲得了新的意志和形態後，體內湧出一股無與倫比的力量。這種力量極大地提高了她的打擊能力和爆發力，但也使得她再也無法使用那些基本的法術了`,
            cangYanMoNv:`擁有千奇百怪魔法道具的她總是讓敵人無可奈何，然而蒼炎魔女真正的殺招，是隱藏於血脈之中的蒼炎之力<br>
            將身軀奉獻給蒼炎之力的蒼炎魔女，覺醒其體內完全的魔力。烈炎之痕烙印在她的身軀上，為了心中的執念，她已不顧任何毀滅性的後果。是什麼讓她如此奮不顧身？也許答案已不言而喻。。。`,
            yinYouShiRen:`吟遊詩人不僅僅依憑自己的直覺和靈感進行著戰鬥，他彈奏的一個個音符能大幅增強自身和隊友的實力，同樣也能對敵人造成極大的傷害`,
            jingLingSheShou:"穿梭於叢林之中，遊走於動物夥伴之間，精靈秘儀的力量祝福者她和她的動物夥伴在戰場上戰無不勝",
            yinYangShi:`陰陽師通過式神的幫助，於虛實之間轉移對手注意力並造成傷害。由於陰陽師與式神之間捉摸不定的特性，往往使得對手疲於奔命`,
            xueSeJianLing:`將鮮血之力與劍技完美融合，血色劍靈擁有著匹敵於魔劍的爆發性和機動性。任何敵人若踏進她的鮮血領域，那麼他將必死無疑”`,
            yueZhiNvShen:`月之女神以新月庇佑隊友，吸納隊友傷痛作為自己的力量。她是相信“力量即為一切”的對手的夢魘，會在積累足夠的傷痛後進行反擊。然而對於另一種不擅長以傷害取勝的對手，她還是疲於應付`,
            shouLingWuShi:`御魂流是一種奇妙的劍道，通過獸魂的不同，可以一擊必中，也可以卸掉對手的攻勢讓其無處使勁。最為奇妙的當屬其中奧義【逆反居合斬】，還沒有人能準確描述中了此招後的感受。。。因為。。。`,
            shengGong:"因尚未充填完畢，聖弓的傷害仍然受到束縛。然而即使如此，也能隱隱約約感受到其作為能量炮的恐怖之處。若給她足夠的時間積蓄力量，她能夠一瞬間重置戰場甚至逆轉戰局，是不可忽視的因素",
		},
		card:{
            diZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasJiChuXiaoGuo('diZhiFengYin_xiaoGuo');
                }
            },
            shuiZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasJiChuXiaoGuo('shuiZhiFengYin_xiaoGuo');
                }
            },
            huoZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasJiChuXiaoGuo('huoZhiFengYin_xiaoGuo');
                }
            },
            fengZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasJiChuXiaoGuo('fengZhiFengYin_xiaoGuo');
                }
            },
            leiZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasJiChuXiaoGuo('leiZhiFengYin_xiaoGuo');
                }
            },
            weiLiCiFu:{
                filterTarget:function(card,player,target){
                    return !target.hasJiChuXiaoGuo('weiLiCiFu_xiaoGuo');
                }
            },
            xunJieCiFu:{
                filterTarget:function(card,player,target){
                    return !target.hasJiChuXiaoGuo('xunJieCiFu_xiaoGuo');
                }
            }
        },

		skill:{
            //風之劍聖
            fengNuZhuiJi:{
                usable:1,
                trigger:{player:"gongJiAfter"},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.xiBie(card)!='feng'||get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        prompt:'風怒追擊：風系[攻擊行動]',
                    });
                },
                check:function(event,player){
                    var num=player.countCards('h',card=>get.xiBie(card)=='feng'&&get.type(card)=='gongJi');
                    return num>0
                },
                mod:{
                    aiOrder:function(player,card,num){
                        if(get.type(card)!='gongJi') return;
                        if(get.xiBie(card)=='feng') return num-0.3;
                    }
                }
            },
            shengJian:{
                forced:true,
                trigger:{player:"gongJiSheZhi"},
                group:['shengJian_drawAndDiscard'],
                priority:1,
                filter:function(event,player){
                    return event.yingZhan!=true&&player.getStat('gongJi').zhuDong.length==3;
                },
                content:function(){
                    trigger.qiangZhiMingZhong();
                    trigger.customArgs.shengJian=true;
                },
                subSkill:{
                    drawAndDiscard:{
                        direct:true,
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return event.customArgs.shengJian==true;
                        },
                        content:function(){
                            "step 0"
                            var list=[0,1,2,3];
                            player.chooseControl(list).set('prompt','聖劍：摸X張牌並棄置X張牌').set('ai',function(){
                                var player=_status.event.player;
                                var num=player.getHandcardLimit()-player.countCards('h');
                                if(num>3) num=3;
                                return num;
                            });
                            "step 1"
                            if(result.control==0){
                                event.finish();
                            }else{
                                event.number=result.control;
                            }
                            "step 2"
                            player.draw(event.number);
                            "step 3"
                            player.chooseToDiscard(event.number,true);
                        }
                    }
                },
            },
            lieFengJi:{
                duYou:'lieFengJi',
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.card.hasDuYou('lieFengJi')&&event.target.hasJiChuXiaoGuo('_shengDun');
                },
                content:function(){
                    'step 0'
                    trigger.wuFaShengDun();
                    trigger.wuFaYingZhan();
                },
            },
            jiFengJi:{
                duYou:'jiFengJi',
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.card.hasDuYou('jiFengJi')&&event.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    player.addGongJi();
                },
            },
            jianYing:{
                trigger:{player:'gongJiAfter'},
                usable:1,
                filter:function(event,player){
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addGongJi();
                },
                check:function(event,player){
                    if(player.getLastStat('gongJi').zhuDong.length>=3) return false;
                    return player.canGongJi();
                },
                ai:{
                    shuiJing:true,
                }
            },
            //狂戰士
            kuangHua:{
                trigger:{player:'gongJiSheZhi'},
                forced:true,
                group:['kuangHua_gongJiMingZhong'],
                content:function(){
                    'step 0'
                    trigger.changeDamageNum(1);
                },
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return player.countCards('h')>3;
                        },
                        content:function(){
                            'step 0'
                            trigger.changeDamageNum(1);
                        }
                    }
                }
            },
            xueYingKuangDao:{
                duYou:'xueYingKuangDao',
                trigger:{player:'gongJiShi'},
                group:['xueYingKuangDao_gongJiMingZhong'],
                filter:function(event,player){
                    return event.yingZhan!=true&&event.card.hasDuYou('xueYingKuangDao');
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.xueYingKuangDao=true;
                },
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        direct:true,
                        priority:0.5,
                        filter:function(event,player){
                            return event.customArgs.xueYingKuangDao==true&&(event.target.countCards('h')==2||event.target.countCards('h')==3);
                        },
                        content:function(){
                            'step 0'
                            if(trigger.target.countCards('h')==2){
                                trigger.changeDamageNum(2);
                            }else if(trigger.target.countCards('h')==3){
                                trigger.changeDamageNum(1);
                            }
                        }
                    }
                },
            },
            xueXingPaoXiao:{
                duYou:'xueXingPaoXiao',
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.card.hasDuYou('xueXingPaoXiao')&&event.yingZhan!=true;
                },
                content:function(){
                    if(trigger.target.zhiLiao==2) trigger.qiangZhiMingZhong();
                    
                }
            },
            siLie:{
                trigger:{source:'gongJiMingZhongAfter'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    trigger.changeDamageNum(2);
                }
            },
            //聖女
            bingShuangDaoYan:{
                trigger:{player:'daChuPai'},
                forced:true,
                filter:function(event,player){
                    return get.xiBie(event.card)=='shui' || event.card.name=='shengGuang';
                },
                content:function(){
                    'step 0'
                    var next=player.chooseTarget(true,'目標角色+1[治療]').set('ai',function(target){
                        var player=_status.event.player;
						return get.zhiLiaoEffect2(target,player,1);
					});
                    'step 1'
					if(result.bool){
						var target=result.targets[0];
						target.changeZhiLiao(1,player);
					}
                }
            },
            zhiLiaoShu:{
                enable:'faShu',
                type:'faShu',
                filterTarget:true,
                prompt:'目標角色+2[治療]',
                position:'h',
                duYou:'zhiLiaoShu',
                useCard:true,
                filterCard:function(card){
                    return card.hasDuYou('zhiLiaoShu');
                },
                filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.zhiLiaoShu.filterCard(card);
                    });
				},
                content:function(){
                    target.changeZhiLiao(2,player);
                },
                ai: {
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
					},
					order: 3.2,
				},
            },
            zhiYuZhiGuang:{
                type:'faShu',
                enable:'faShu',
                duYou:'zhiYuZhiGuang',
				filterCard:function(card){
                    return card.hasDuYou('zhiYuZhiGuang');
				},
				position:'h',
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.zhiYuZhiGuang.filterCard(card);
                    });
				},
				prompt:'指定最多3名角色各+1[治療]。',
                filterTarget:true,
                selectTarget:[1,3],
                useCard:true,
                content:function(){
                    if(target){
                        target.changeZhiLiao(1,player);
                    }
                },
                ai: {
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,1);
                        },
					},
					order: 3.2,
				},
            },
            lianMin:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    player.addNengLiang('shuiJing');
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 7
                    }
                },
                check:function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    return !player.isHengZhi();
                },
                ai:{
                    baoShi:true,
                    skillTagFilter:function(player,tag,arg){
                        if(tag=='baoShi'&&player.isHengZhi()) return false;
                    }
                }
            },
            shengLiao:{
                type:'faShu',
                usable:1,
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:[1,3],
                filterTarget:true,
                contentBefore:function(){
                    player.removeBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    if(targets.length==1){
                        target.changeZhiLiao(3,player);
                        event.finish();
                    }else if(targets.length==3||player.storage.shengLiao==2){
                        target.changeZhiLiao(1,player);
                        event.finish();
                    }else if(player.storage.shengLiao==1){
                        target.changeZhiLiao(2,player);
                        event.finish();
                    }else{
                        var list=[1,2];
                        var name=get.translation(target)
                        var next=player.chooseControl(list).set('prompt',name+'獲得X點[治療]');
                        var chaZhi=target.getZhiLiaoLimit()-target.zhiLiao;
                        if(chaZhi<=1) var num=0;
                        else var num=1;
                        next.set('num',num);
                        next.set('ai',function(){
                            return _status.event.num;
                        });
                    }
                    'step 1'
                    var num=result.control;
                    target.changeZhiLiao(num,player);
                    player.storage.shengLiao=num;
                },
                contentAfter:function(){
                    player.storage.shengLiao=0;
                    player.addGongJiOrFaShu();
                },
                ai: {
                    shuiJing:true,
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,1);
                        },
					},
					order: 3.5,
				},
            },
            //暗殺者
            fanShi:{
                trigger:{player:"chengShouShangHaiAfter"},
                forced:true,
                filter:function(event){
                    return event.faShu!=true;
                },
                logTarget:'source',
                content:function(){
                    trigger.source.draw(player);
                }
            },
            shuiYing:{
                trigger:{player:'drawBefore'},
                filter:function(event,player){
                    return event.cause!="teShuXingDong"&&player.countCards('h')>0;
                },
                async cost(event, trigger, player) {
					event.result = await player
						.chooseCard([1,Infinity],function(card){
                            return get.xiBie(card)=='shui';
                        })
                        .set('prompt',get.prompt('shuiYing'))
                        .set('prompt2',lib.translate.shuiYing_info)
						.set("ai",function(card){
							return 6 - get.value(card);
						})
						.forResult();
				},
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                    'step 2'
                    if(!player.isHengZhi()) event.finish();
                    'step 3'
                    var next=player.chooseToDiscard(1,'水影：選擇要棄置的法術牌',function(card){
                        return get.type(card)=='faShu';
                    });
                    next.set('ai',function(card){
                        return 6 - get.value(card);
                    });
                    next.set('showCards',true);
                }
            },
            qianXing:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.chooseDraw(1);
                    'step 3'
                    player.hengZhi();
                },
                mod:{
                    maxHandcardBase:function(player,num){
                        if(player.isHengZhi()) return num-1;
                    },
                    targetEnabled:function(card,player,target){
                        if(get.type(card)=='gongJi'&&target.isHengZhi()){
                            if(_status.event.yingZhan!=true) return false;
                        }
                    },
                    aiOrder:function(player,card,num){
                        if(player.isHengZhi()&&get.type(card)=='gongJi') return num+0.5;
                    }
                },
                group:['qianXing_chongZhi','qianXing_xiaoGuo'],
                subSkill:{
                    chongZhi:{
                        direct:true,
                        trigger:{player:'xingDongBegin'},
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    },
                    xiaoGuo:{
                        direct:true,
                        trigger:{player:"gongJiSheZhi"},
                        filter:function(event,player){
                            return event.yingZhan!=true&&player.isHengZhi();
                        },
                        content:function(){
                            var num=player.countNengLiangAll();
                            if(num>0) trigger.changeDamageNum(num);
                            trigger.wuFaYingZhan();
                        }
                    }
                },
                ai:{
                    baoShi:true,
                },
                check:function(event,player){
                    if(!player.canGongJi()) return false;
                    if(player.countCards('h')>=player.getHandcardLimit()) return false;
                    if(player.countNengLiangAll()<=1) return false;
                    return true;
                },
            },
            //封印師
            faShuJiDang:{
                trigger:{player:'faShuAfter'},
                content:function(){
                    player.addGongJi();
                }
            },
            diZhiFengYin:{
                type:'faShu',
                enable:'faShu',
				position:'h',
                duYou:'diZhiFengYin',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.diZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.diZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterCard:function(card){
                    return card.hasDuYou('diZhiFengYin');
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'diZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    target.addFengYin('diZhiFengYin_xiaoGuo',cards,player);
                },
                fengYinFilter:function(event,player,xiBie){
                    if(!player.hasJiChuXiaoGuo(`${xiBie}ZhiFengYin_xiaoGuo`)){
                        return false
                    }
                    for(var card of event.cards){
                        if(event.name!='showCards'){
                            if(card.original != "h") continue;
                        }
                        if(get.xiBie(card,player)==xiBie){
                            return true;
                        }
                    }
                    return false;
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"地",
                        intro:{
                            content:'jiChuXiaoGuo',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getJiChuXiaoGuo(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return lib.skill.diZhiFengYin.fengYinFilter(event,player,'di');
                        },
                        content:async function(event,trigger,player){
                            var fengYin=event.name;
                            var cards=player.getJiChuXiaoGuo(fengYin);
                            var source=player.storage[fengYin];
                            await player.discard(cards,fengYin).set('visible',true);
                            player.removeSkill(fengYin);
                            await player.faShuDamage(source,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            shuiZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'shuiZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('shuiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.shuiZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.shuiZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'shuiZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    target.addFengYin('shuiZhiFengYin_xiaoGuo',cards,player);
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"水",
                        intro:{
                            content:'jiChuXiaoGuo',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getJiChuXiaoGuo(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return lib.skill.diZhiFengYin.fengYinFilter(event,player,'shui');
                        },
                        content:async function(event,trigger,player){
                            var fengYin=event.name;
                            var cards=player.getJiChuXiaoGuo(fengYin);
                            var source=player.storage[fengYin];
                            await player.discard(cards,fengYin).set('visible',true);
                            player.removeSkill(fengYin);
                            await player.faShuDamage(source,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            huoZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'huoZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('huoZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.huoZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.huoZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'huoZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    target.addFengYin('huoZhiFengYin_xiaoGuo',cards,player);
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"火",
                        intro:{
                            content:'jiChuXiaoGuo',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getJiChuXiaoGuo(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return lib.skill.diZhiFengYin.fengYinFilter(event,player,'huo');
                        },
                        content:async function(event,trigger,player){
                            var fengYin=event.name;
                            var cards=player.getJiChuXiaoGuo(fengYin);
                            var source=player.storage[fengYin];
                            await player.discard(cards,fengYin).set('visible',true);
                            player.removeSkill(fengYin);
                            await player.faShuDamage(source,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            fengZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'fengZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('fengZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.fengZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.fengZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'fengZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    target.addFengYin('fengZhiFengYin_xiaoGuo',cards,player);
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"風",
                        intro:{
                            content:'jiChuXiaoGuo',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getJiChuXiaoGuo(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return lib.skill.diZhiFengYin.fengYinFilter(event,player,'feng');
                        },
                        content:async function(event,trigger,player){
                            var fengYin=event.name;
                            var cards=player.getJiChuXiaoGuo(fengYin);
                            var source=player.storage[fengYin];
                            await player.discard(cards,fengYin).set('visible',true);
                            player.removeSkill(fengYin);
                            await player.faShuDamage(source,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            leiZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'leiZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('leiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.leiZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.leiZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.hasJiChuXiaoGuo('leiZhiFengYin_xiaoGuo')) return false;
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'leiZhiFengYin'},player,target);
                },
                prepare:'useCard',
                discard:false,
                content:function(){
                    target.addFengYin('leiZhiFengYin_xiaoGuo',cards,player);
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"雷",
                        intro:{
                            content:'jiChuXiaoGuo',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getJiChuXiaoGuo(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return lib.skill.diZhiFengYin.fengYinFilter(event,player,'lei');
                        },
                        content:async function(event,trigger,player){
                            var fengYin=event.name;
                            var cards=player.getJiChuXiaoGuo(fengYin);
                            var source=player.storage[fengYin];
                            await player.discard(cards,fengYin).set('visible',true);
                            player.removeSkill(fengYin);
                            await player.faShuDamage(source,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            wuXiShuFu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(player.storage.wuXiShuFu) return false;
                    var bool1=player.canBiShaShuiJing();
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.wuXiShuFu.filterTarget('',player,current);
                    });
                    return bool1&&bool2
                },
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.addSkill('wuXiShuFu_xiaoGuo')
                    player.storage.wuXiShuFu=true;
                    target.storage.wuXiShuFuPlayer=player;
                    'step 2'
					target.addMark('wuXiShuFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        priority:2,
                        trigger:{player:'xingDongBefore'},
                        forced:true,
                        markimage:'image/card/zhuanShu/wuXiShuFu.png',
                        intro:{
                            content:`<span class='tiaoJian'>(將【五系束縛】放置於目標對手面前)</span>該對手跳過其下個行動階段。在其下個行動階段開始前他可以選擇摸(2+X)張牌來取消【五系束縛】的效果。X為場上封印的數量，X最高為2。無論效果是否發動，觸發後移除此牌。`,
                            nocount:true,
                        },
                        onremove:'storage',
                        filter:function(event,player){
                            return player.hasZhiShiWu('wuXiShuFu_xiaoGuo');
                        },
                        content:function(){
                            'step 0'
                            var x=0;
                            for(var p of game.players){
                                for(var xiaoGuo of game.jiChuXiaoGuo.fengYinShi_xiaoGuo){
                                    if(p.hasJiChuXiaoGuo(xiaoGuo)){
                                        x++;
                                    }
                                }
                                if(x>=2){
                                    x=2;
                                    break;
                                }
                            }
                            event.num;
                            event.num=2+x;

                            var list=[`摸2+${x}張牌`,'跳過行動階段'];
                            if(player.hasJiChuXiaoGuo('_xuRuo')){
                                list[0]=`摸2+3+${x}張牌`;
                                event.num+=3;
                            }
                            player.chooseControl().set('choiceList',list).set('prompt','五系束縛：選擇一項').set('ai',function(){
                                var player=_status.event.player;
                                var num=_status.event.num;
                                if(player.countCards('h')+num>player.getHandcardLimit()){
                                    return 1;
                                }else{
                                    return 0;
                                }
                            }).set('num',event.num);
                            'step 1'
                            if(result.index==1){
                                trigger.xuRuo=true;
                            }else if(result.index==0){
                                player.draw(event.num); 
                            }
                            'step 2'
                            delete player.storage.wuXiShuFuPlayer.storage.wuXiShuFu;
                            delete player.storage.wuXiShuFuPlayer;
                            player.removeZhiShiWu('wuXiShuFu_xiaoGuo');
                            'step 3'
                            if(player.hasJiChuXiaoGuo('_xuRuo')){
                                player.discard(player.getJiChuXiaoGuo('_xuRuo'),'_xuRuo').set('visible',true); 
                            }
                            'step 4'
                            player.removeSkill('wuXiShuFu_xiaoGuo');
                        },
                    }
                },
                ai:{
                    shuiJing:true,
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>4) return -3;
                            return -1;
                        }
                    }
                }
            },
            fengYinPoSui:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool1=player.canBiShaShuiJing();
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.fengYinPoSui.filterTarget('','',current)
                    });
                    return bool1&&bool2;
                },
                filterTarget:function(card,player,target){
                    return target.hasJiChuXiaoGuo();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.gainJiChuXiaoGuo(target);
                },
                ai:{
                    shuiJing:true,
                    order:3.5,
                    result:{
                        target:function(player,target){
                            var shiQi=get.shiQi(player.side);
                            if(shiQi<=5&&player.countEmptyCards<=0) return false; 

                            return get.jiChuXiaoGuoEffect(target);
                        }
                    }
                }
            },
            //天使
            fengZhiJieJing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.fengZhiJieJing.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.fengZhiJieJing.filterTarget('','',current);
                    });
                    return bool1&&bool2;
                },
                filterCard:function(card){
                    return get.xiBie(card)=='feng';
                },
                discard:true,
                showCards:true,
                filterTarget:function(card,player,target){
                    return target.hasJiChuXiaoGuo();
                },
                content:function(){
                    'step 0'
                    player.removeJiChuXiaoGuo(target);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.jiChuXiaoGuoEffect(target);
                        }
                    }
                }
            },
            tianShiZhuFu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.tianShiZhuFu.filterCard(card);
                    });
                },
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                discard:true,
                showCards:true,
                selectTarget:[1,2],
                filterTarget:true,
                content:function(){
                    'step 0'
                    if(targets.length==1){
                        if(target.countCards('h')>=2){
                            target.chooseToGive('交給守護天使2張牌',true,2,player);
                        }else if(target.countCards('h')==1){
                            target.chooseToGive('交給守護天使1張牌',true,1,player);
                        }else if(target.countCards('h')==0){
                            event.finish();
                        }
                    }else if(targets.length==2){
                        if(target.countCards('h')>=1){
                            target.chooseToGive('交給守護天使1張牌',true,1,player);
                        }else{
                            event.finish();
                        }
                    }
                },
                ai:{
                    order:3,
                    result:{
                        target:function(player,target){
                            return 1;
                        },
                        player:0,
                    }
                }
            },
            tianShiJiBan:{
                trigger:{player:['removeJiChuXiaoGuo','daChuPai']},
                forced:true,
                filter:function(event,player){
                    if(event.name == 'useCard') return event.card.name=='shengDun';
                    else return true;
                },
                content:function(){
                    'step 0'
                    player.chooseTarget('天使羈絆：選擇一名角色+1[治療]',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 1'
                    if(result.bool){
                        var target=result.targets[0];
                        target.changeZhiLiao(1,player);
                    }
                },
            },
            tianShiZhiQiang:{
                type:'faShu',
                enable:'faShu',
                duYou:'tianShiZhiQiang',
				filterCard:function(card){
                    return card.hasDuYou('tianShiZhiQiang');
				},
				position:'h',
				viewAs:{name:'shengDun'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.tianShiZhiQiang.filterCard(card);
                    });
				},
                ai:{
                    order:3.8,
                }
            },
            tianShiZhiGe:{
                trigger:{player:'phaseBefore'},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    return game.hasPlayer(function(current){
                        return current.hasJiChuXiaoGuo();
                    });
                },
                async cost(event, trigger, player) {
                    event.result = await player.chooseTarget(function(card,player,target){
                        return target.hasJiChuXiaoGuo();
                    })
                    .set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side){
                            return get.jiChuXiaoGuoEffect(target);
                        }else{
                            return -get.jiChuXiaoGuoEffect(target);
                        }
                    })
                    .set('prompt',get.prompt('tianShiZhiGe'))
                    .set('prompt2',lib.translate.tianShiZhiGe_info)
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.removeJiChuXiaoGuo(event.targets[0]);
                },
                check:function(event,player){
                    var hasPlayer=game.hasPlayer(function(current){
                        if(player.side==current.side) return get.jiChuXiaoGuoEffect(target)>0;
                        else return -get.jiChuXiaoGuoEffect()>0;
                    });
                    return hasPlayer;
                },
                ai:{
                    shuiJing:true,
                }
            },
            shenZhiBiHu:{
                trigger:{global:'changeShiQiBefore'},
                filter:function(event,player){
                    if(event.side!=player.side) return false;
                    return player.canBiShaShuiJing()&&event.num<0&&event.cause=='damage'&&event.faShu==true;
                },
                async cost(event, trigger, player) {
                    var list=[];
                    for(var i=0;i<player.countNengLiang('baoShi');i++){
                        list.push(['baoShi','寶石']);
                    }
                    for(var i=0;i<player.countNengLiang('shuiJing');i++){
                        list.push(['shuiJing','水晶']);
                    }
                    var result = await player.chooseButton(['是否發動【神之庇護】<br>'+lib.translate.shenZhiBiHu_info,[list,'tdnodes']])
                    .set('selectButton',[1,-trigger.num])
                    .forResult();
                    event.result = {
						bool: result.bool,
						cost_data: result.links,
					};
                },
                content:function(){
                    'step 0'
                    var links=event.cost_data;
                    var num=links.length;
                    if(num>0){
                        trigger.num+=num;
                        var dict={baoShi:0,shuiJing:0};
                        for(var i=0;i<links.length;i++){
                            if(links[i]=='baoShi'){
                                dict['baoShi']++;
                            }else if(links[i]=='shuiJing'){
                                dict['shuiJing']++;
                            }
                        }
                        if(dict['baoShi']>0) player.changeNengLiang('baoShi',-dict['baoShi']);
                        if(dict['shuiJing']>0) player.changeNengLiang('shuiJing',-dict['shuiJing']);
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            //神箭手
            shanDianJian:{
                forced:true,
                trigger:{player:"gongJiSheZhi"},
                filter:function(event){
                    return get.xiBie(event.card)=='lei';
                },
                content:function(){
                    trigger.wuFaYingZhan();
                }
            },
            guanChuanSheJi:{
                trigger:{source:"gongJiWeiMingZhong"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.countCards('h')>0;
                },
                logTarget:'target',
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt(event.skill))
                    .set('prompt2',lib.translate[event.skill+'_info'])
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                    'step 1'
                    trigger.player.faShuDamage(2,player);
                }
            },
            shanGuangXianJing:{
                type:'faShu',
                enable:'faShu',
                duYou:'shanGuangXianJing',
				filterCard:function(card){
                    return card.hasDuYou('shanGuangXianJing');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return lib.skill.shanGuangXianJing.filterCard(card);
                    });
				},
                filterTarget:true,
                useCard:true,
                content:function(){
                    target.faShuDamage(2,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            jingZhunSheJi:{
                trigger:{player:'gongJiShi'},
                duYou:'jingZhunSheJi',
                filter:function(event,player){
                    return event.card.hasDuYou('jingZhunSheJi');
                },
                content:function(){
                    trigger.qiangZhiMingZhong();
                    trigger.changeDamageNum(-1);
                },
                check:function(event,player){
                    return event.targets[0].countCards('h')>3;
                }
            },
            juJi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.drawTo(5);
                    player.addGongJi();
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            var num=target.countCards('h');
                            if(num<5&&player.canGongJi()) return -5;
                            else return 0;
                        },
                    }
                }
            },
            //魔法少女
            moBaoChongJi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.moBaoChongJi.filterCard(card));
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                contentBefore:function(){
                    player.changeZhanJi('baoShi',1);
                },
                content:function(){
                    'step 0'
                    var name=get.colorName(player);
                    target.chooseToDiscard(`棄置1張法術牌，否則${name}對你造成2點法術傷害③、${name}棄一張牌`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                        if(player.countCards('h')>=1){
                            player.chooseToDiscard(1,true);
                        }
                    }
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            var chaZhi=target.getHandcardLimit()-target.countCards('h');
                            if(chaZhi<=1) return -2;
                            else return -0.1;
                        }
                    }
                }
            },
            moDanZhangWo:{
                trigger:{player:'useCardBefore'},
                forced:true,
                filter:function(event,player){
                    if(player.hasMark('_moDan')) return false;
                    if(get.name(event.card)!='moDan') return false;
                    var range_l=0,range_r=0;
                    var target=player;
                    while(target!=event.targets[0]){
                        target=target.getPrevious();
                        range_l++;
                    }
                    target=player;
                    while(target!=event.targets[0]){
                        target=target.getNext();
                        range_r++;
                    }
                    if(range_l==range_r){
                        return !(player.side==player.getNext().side);
                    }
                    return range_l<range_r;
                },
                content:function(){
                    game.broadcastAll(function(){
                        game.moDanFangXiang='zuo';
                    });
                },
                mod:{
                    playerEnabled:function(card,player,target){
                        if(player.hasMark('_moDan')) return;
                        if(get.name(card)=='moDan'){
                            var mubiao=player.getPrevious();
                            while(mubiao.side==player.side){
                                mubiao=mubiao.getPrevious();
                                while(mubiao.hasMark('_moDan')){
                                    mubiao=mubiao.getPrevious();
                                }
                            }
						    if(target==mubiao) return true;
                        }
                    }
                }
            },
            moDanRongHe:{
                enable:['faShu','moDan'],
				filterCard:function(card){
                    return get.xiBie(card)=='di'||get.xiBie(card)=='huo';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.moDanRongHe.filterCard(card);
                    });
				},
                ai:{
                    order:3.5,
                }
            },
            huiMieFengBao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                contentBefore:function(){
                    player.removeBiShaBaoShi();
                },
                content:function(){
                    target.faShuDamage(2,player);
                },
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,player,2);
                        }
                    }
                }
            },
            //女武神
            shenShengZhuiJi:{
                trigger:{player:['gongJiAfter','faShuAfter']},
                filter:function(event,player){
                    return player.zhiLiao>0&&event.yingZhan!=true;
                },
                content:function(){
                    player.changeZhiLiao(-1);
                    player.addGongJi();
                }
            },
            zhiXuZhiYin:{
                type:'faShu',
                enable:'faShu',
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.changeZhiLiao(1);
                    player.addNengLiang('shuiJing');
                },
                ai:{
                    order:4,
                    result:{
                        player:function(player, target){
                            if(player.isHengZhi()) return -1;
                            if(player.countCards('h')+2>player.getHandcardLimit()) return -1;
                            else return 1;
                        },
                    }
                }
            },
            hePingXingZhe:{
                group:'hePingXingZhe_chongZhi',
                forced:true,
                trigger:{player:"yingLingZhaoHuan"},
                filter:function(event,player){
                    if(_status.currentPhase!=player) return false;
                    return !player.isHengZhi();
                },
                content:function(){
                    player.hengZhi();
                },
                subSkill:{
                    chongZhi:{
                        forced:true,
                        trigger:{player:'gongJiShi'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            if(event.yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            player.chongZhi();
                            
                        }
                    }
                }
            },
            junShenWeiGuang:{
                forced:true,
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    var choiceList=['你+1[治療]，[重置]脫離【英靈形態】','(移除我方【戰績區】X個星石，X<3)目標角色+X[治療]'];
                    var choices=['選項一'];
                    var list=get.zhanJi(player.side);
                    if(list.length>=1){
                        choices.push('選項二');
                    }
                    player.chooseControl(choices).set('prompt','軍神威光：選擇一項').set('choiceList',choiceList);
                    'step 1'
                    if(result.index==0){
                        player.changeZhiLiao(1);
                        player.chongZhi();
                        event.finish();
                    }else if(result.index==1){
                        var list=get.zhanJi(player.side);
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }
                        var next=player.chooseButton([
                            '移除X個星石，X<3',
                            [listx,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('selectButton',[1,2]);
                    }
                    'step 2'
                    event.number=result.links.length;
                    var number=event.number;
                    var dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='baoShi'){
                            dict['baoShi']++;
						}else if(result.links[i]=='shuiJing'){
                            dict['shuiJing']++;
						}
					}
                    if(dict['baoShi']>0){
                        var next=player.removeZhanJi('baoShi',dict['baoShi']);
                    }
                    if(dict['shuiJing']>0){
                        var next=player.removeZhanJi('shuiJing',dict['shuiJing']);
                    }
                    'step 3'
                    var number=event.number;
                    player.chooseTarget(1,true,'選擇一個目標角色+'+number+'點[治療]').set('ai',function(target){
                        var player=_status.event.player;
                        var number=_status.event.number;
                        return get.zhiLiaoEffect2(target,player,number);
                    }).set('number',number);
                    'step 4'
                    result.targets[0].changeZhiLiao(event.number,player);
                }
            },
            yingLingZhaoHuan:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    trigger.changeDamageNum(1);
                    'step 2'
                    player.chooseCardTarget({
                        filterCard:function(card){
                            return get.type(card)=='faShu';
                        },
                        filterTarget:true,
                        prompt:"<span class='tiaoJian'>(若你額外棄置1張法術牌[展示])</span>目標角色+1[治療]",
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2(target) {
                            return get.zhiLiaoEffect2(target,player,1);
                        },
                    });
                    'step 3'
                    if(result.bool){
                        player.discard(result.cards).set('showCards',true);
                        event.target=result.targets[0];
                    }else{
                        event.goto(5);
                    }
                    'step 4'
                    event.target.changeZhiLiao(1);
                    'step 5'
                    event.trigger('yingLingZhaoHuan')
                },
                ai:{
                    shuiJing:true,

                }
            },
            //元素師
            yuanSuXiShou:{
                trigger:{source:'zaoChengShangHai'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(event.yuanSuDianRan==true) return false;
                    return true;
                },
                content:function(){
                    player.addZhiShiWu('yuanSu');
                }
            },
            yuanSuDianRan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countMark('yuanSu')>=3
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('yuanSu',3);
                    'step 1'
                    target.damage(2,player).set('faShu',true).set('yuanSuDianRan',true);
                    'step 2'
                    player.addFaShu();
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            yunShi:{
                type:'faShu',
                enable:'faShu',
                selectCard:[1,2],
                duYou:'yunShi',
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('yunShi');
                    }else{
                        return get.xiBie(card)=='di'
                    }
                },
                discard:false,
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('yunShi')
                },
                complexCard:true,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.yunShi.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.addFaShu();
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            bingDong:{
                type:'faShu',
                enable:'faShu',
                duYou:'bingDong',
                selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('bingDong');
                    }else{
                        return get.xiBie(card)=='shui'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('bingDong');
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.bingDong.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.chooseTarget(1,'冰凍：選擇1名角色+1點[治療]',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 3'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1,player);
                    }
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            huoQou:{
                type:'faShu',
                enable:'faShu',
                duYou:'huoQou',
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('huoQou');
                    }else{
                        return get.xiBie(card)=='huo'
                    }
                },
                filterOk:function(){
                    if(ui.selected.cards[0].hasDuYou('huoQou')){
                        return true;
                    }else{
                        return false;
                    }
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.huoQou.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=2;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            fengRen:{
                type:'faShu',
                enable:'faShu',
                duYou:'fengRen',
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('fengRen');
                    }else{
                        return get.xiBie(card)=='feng'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('fengRen')
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.fengRen.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.addGongJi();
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            leiJi:{
                type:'faShu',
                enable:'faShu',
                duYou:'leiJi',
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('leiJi');
                    }else{
                        return get.xiBie(card)=='lei'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('leiJi')
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);;
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.leiJi.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.changeZhanJi('baoShi',1);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            yueGuang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var num=player.countNengLiangAll()+1;
                    event.num=num;
                    'step 2'
                    target.faShuDamage(event.num,player);
                },
                ai:{
                    baoShi:true,
                    order:function(item,player){
                        return 3.4+(player.countNengLiangAll()-1)*0.1;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            yuanSu:{
                intro:{
                    name:'元素',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //月之女神
            xinYueBiHu:{
                trigger:{global:'changeShiQiBefore'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    if(event.side!=player.side) return false;
                    if(event.num>=0) return false;
                    if(event.cause!='damage') return false;
                    if(!event.cards) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    var cards=trigger.cards;
                    if(cards){
                        player.addGaiPai('anYue',cards);
                    }
                    'step 2'
                    trigger.cancel();
                }
            },
            anYueZuZhou:{
                trigger:{player:'discard'},
                forced:true,
                filter:function(event,player){
                    return event.cards.length>0&&event.gaiPai=='anYue';
                },
                content:function(){
                    'step 0'
                    player.changeShiQi(-1);
                    'step 1'
                    if(player.getGaiPai('anYue').length==0){
                        player.chongZhi();
                    }
                }
            },
            meiDuShaZhiYan:{
                trigger:{global:'gongJiShi'},
                filter:function(event,player){
                    if(event.player.side==player.side) return false;
                    if(!event.card.isCard) return false;
                    var anYue=player.getGaiPai('anYue');
                    return anYue.length>0;
                },
                async cost(event, trigger, player) {
                    var result = await player.chooseCardButton(player.getGaiPai('anYue'),'是否發動【美杜莎之眼】<br>'+lib.translate.meiDuShaZhiYan_info)
                    .set('filterButton',function(button){
                        return get.xiBie(button.link)==_status.event.xiBie;
                    })
                    .set('xiBie',get.xiBie(trigger.card)).forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    }
                },
                content:function(){
                    'step 0'
                    var card=event.cost_data[0];
                    event.card=card;
                    player.discard(card,'anYue').set('showHiddenCards',true);
                    'step 1'
                    player.changeZhiLiao(1);
                    'step 2'
                    player.addZhiShiWu('shiHua');
                    'step 3'
                    if(get.type(event.card)=='faShu'){
                        if(player.countCards('h')>0){
                            player.chooseToDiscard('h',true);
                        }
                    }else event.finish();
                    'step 4'
                    var next=player.chooseTarget(1,'美杜莎之眼：目標對手造成1點法術傷害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 5'
                    if(result.bool){
                        result.targets[0].damage(1,player).set('faShu',true);
                    }
                }

            },
            yueZhiLunHui:{
                trigger:{player:'phaseEnd'},
                priority:1,
                filter:function(event,player){
                    return player.zhiLiao>0||player.getGaiPai('anYue').length>0;
                },
                async cost(event, trigger, player) {
                    var choices=[];
                    var choiceList=['<span class="tiaoJian">(移除1個【暗月】)</span>目標角色+1[治療]',"<span class='tiaoJian'>(移除你的1[治療])</span>你+1<span class='hong'>【</span>新月<span class='hong'>】</span>"];
                    if(player.getGaiPai('anYue').length>0){
                        choices.push('選項一');
                    }
                    if(player.zhiLiao>0){
                        choices.push("選項二");
                    }
                    choices.push('cancel2');
                    var result=await player.chooseControl(choices).set('prompt',"月之輪迴：選擇以下一項發動").set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.zhiLiao>0) return "選項二";
                        if(player.getGaiPai('anYue').length>0) return "選項一";
                        return 'cancel2';
                    }).forResult();
                    event.result = {
                        bool: result.control!='cancel2',
                        cost_data: result.control,
                    };
                },
                content:async function(event, trigger, player){
                    if(event.cost_data=='選項一'){
                        var anYue=player.getGaiPai('anYue');
                        var links=await player.chooseCardButton(anYue,true,'移除1個【暗月】目標角色+1[治療]').forResult('links');
                        await player.discard(links,'anYue');
                        var targets=await player.chooseTarget(1,'月之輪迴：選擇1名目標角色+1[治療]',true).forResult('targets');
                        targets[0].changeZhiLiao(1,player);
                    }else if(event.cost_data=="選項二"){
                        await player.changeZhiLiao(-1);
                        await player.addZhiShiWu('xinYue');
                    }
                }
            },
            yueDu:{
                usable:1,
                trigger:{source:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    return event.faShu==true&&player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-1);
                    'step 1'
                    player.chooseTarget(1,true,'對目標對手造成1點法術傷害③',function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    if(result.bool){
                        result.targets[0].faShuDamage(1,player);
                    }
                }
            },
            anYueZhan:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.isHengZhi()&&player.canBiShaShuiJing()&&player.getGaiPai('anYue').length>0;
                },
                async cost(event, trigger, player) {
                    var result=await player.chooseCardButton(player.getGaiPai('anYue'),'是否發動【暗月斬】<br>'+lib.translate.anYueZhan_info,[1, 2]).forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 2'
                    event.num=event.cost_data.length;
                    player.discard(event.cost_data,'anYue');
                    'step 3'
                    trigger.changeDamageNum(event.num);
                },
                ai:{
                    shuiJing:true,
                }
            },
            cangBaiZhiYue:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaBaoShi();

                    var choiceList=["<span class='tiaoJian'>(移除3個</span><span class='lan'>【石化】</span><span class='tiaoJian'>)</span>你的下次主動攻擊對手無法應戰，額外+1[攻擊行動]。你額外獲得一個回合","移除X點<span class='hong'>【新月】</span>，你+1點<span class='lan'>【石化】</span>，棄1張牌，對目標對手造成(X+1)點法術傷害③"];
                    var choices=['選項二']
                    if(player.countZhiShiWu('shiHua')>=3){
                        choices.unshift('選項一');
                    }
                    var control=await player.chooseControl(choices).set('prompt','蒼白之月：選擇以下一項發動').set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countZhiShiWu('shiHua')>=3) return "選項一";
                        return "選項二";
                    }).forResult('control');
                    if(control=='選項一'){
                        await player.removeZhiShiWu('shiHua',3);
                        player.addSkill('cangBaiZhiYue_wuFaYingZhan');
                        player.addGongJi();
                        player.insertPhase();
                    }else if(control=="選項二"){
                        var list=[];
                        var xinYue=player.countZhiShiWu('xinYue');
                        for(var i=0;i<=xinYue;i++){
                            list.push(i);
                        }
                        var num=await player.chooseControl(list).set('prompt',"移除X點<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1點<span class='lan'>【</span>石化<span class='lan'>】</span>，棄1張牌，對目標對手造成(X+1)點法術傷害③").set('ai',function(){return _status.event.num;}).set('num',list.length-1).forResult('control');
                        if(num>0){
                            await player.removeMark('xinYue',num);
                        }
                        await player.addZhiShiWu('shiHua');
                        if(player.countCards('h')>0){
                            await player.chooseToDiscard(1,'h',true);
                        }
                        var targets=await player.chooseTarget(1,`對目標對手造成${num+1}點法術傷害③`,true,function(card,player,target){
                            return target.side!=player.side;
                        }).forResult('targets');
                        await targets[0].faShuDamage(num+1,player);
                    }
                },
                subSkill:{
                    wuFaYingZhan:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            'step 0'
                            trigger.wuFaYingZhan();
                            'step 1'
                            player.removeSkill('cangBaiZhiYue_wuFaYingZhan');
                        }
                    }
                },
                ai:{
                    baoShi:true,
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            xinYue:{
                intro:{
                    name:'新月',
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            shiHua:{
                intro:{
                    name:'石化',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            anYue:{
                intro:{
                    name:'暗月',
                    content:'gaiPai',
                    markcount:'gaiPai',
                },
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            //仲裁者
            zhongCaiFaZe:{
                trigger:{global:"gameStart"},
                forced:true,
                content:function(){
                    player.changeNengLiang('shuiJing',2);
                }
            },
            yiShiZhongDuan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.chongZhi();
                    'step 1'
                    player.addZhanJi('baoShi',1)
                },
                check:function(event,player){
                    return player.countZhiShiWu('shenPan')>=3;
                }
            },
            moRiShenPan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('shenPan')>0;
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    event.num=player.countZhiShiWu('shenPan');
                    player.removeZhiShiWu('shenPan',event.num);
                    'step 1'
                    target.faShuDamage(event.num,player);
                },
                group:'moRiShenPan_sheZhi',
                subSkill:{
                    sheZhi:{
                        trigger:{player:'xingDongBegin'},
                        direct:true,
                        priority:1,
                        filter:function(event,player){
                            return player.countZhiShiWu('shenPan')>=get.info('shenPan').intro.max;
                        },
                        content:function(){
                            trigger.canTeShu=false;
                            player.addTempSkill('moRiShenPan_biXu',{player:'useSkill'});
                        }
                    },
                    biXu:{
                        init:function(player,skill){
                            player.addSkillBlocker(skill);
                        },
                        onremove:function(player,skill){
                            player.removeSkillBlocker(skill);
                        },
                        skillBlocker:function(skill,player){
                            var info=get.info(skill);
                            return skill!='moRiShenPan'&&info.type=='faShu';
                        },
                        mod:{
                            cardEnabled:function(card,player){
                                return false;
                            }
                        },

                    }
                },
                ai:{
					order:function(item,player){
						return 1.5+player.countZhiShiWu('shenPan');
					},
					result:{
						target:function(player,target){
							return get.damageEffect(target,player.countZhiShiWu('shenPan'));
						}
					},
				},
            },
            shenPanLangChao:{
                forced:true,
                trigger:{player:'chengShouShangHaiAfter'},
                content:function(){
                    player.addZhiShiWu('shenPan',1);
                },
            },
            zhongCaiYiShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(event.qiDong==true) return false;
                    return player.canBiShaBaoShi()&&!player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 5;
                    }
                },
                group:'zhongCaiYiShi_shenPan',
                subSkill:{
                    shenPan:{
                        trigger:{player:'phaseBegin'},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            player.addZhiShiWu('shenPan',1);
                        }
                    }
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    baoShi:true,
                }
            },
            panJueTianPing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('shenPan',1);
                    var list=['棄掉所有手牌','將你的手牌補到上限[強制]，我方【戰績區】+1[寶石]'];
                    player.chooseControl().set('prompt','判決天平：選擇一項').set('choiceList',list).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')>3) return '選項一';
                        return '選項二';
                    });
                    'step 2'
                    if(result.control=='選項一'){
                        player.discard(player.getCards('h'));
                    }
                    else if(result.control=='選項二'){
                        var num=player.getHandcardLimit();
                        player.drawTo(num);
                        player.addZhanJi('baoShi',1);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.6,
                    result:{
                        player:1,
                    }
                }
            },
            shenPan:{
                intro:{
                    name:'審判',
                    content:'mark',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //冒險家
            qiZha:{
                enable:'gongJi',
                filter:function(event,player){
                    var bool1=player.countTongXiPai()>=2;
                    var bool2=game.hasPlayer(current=>lib.skill.qiZha.filterTarget('',player,current));
                    return bool1&&bool2;
                },
                selectCard:[2,3],
                showCards:true,
                discard:true,
                filterCard:function(card){
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                filterTarget:function(card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
                content:async function(event, trigger, player){
                    await event.trigger('qiZha');
                    var length=event.cards.length;
                    var xiBie,name;
                    if(length==2){
                        var list=['shui','huo','feng','lei','di'];
                        var random=list.randomGet();
                        var control=await player.chooseControl(list).set('prompt','選擇攻擊系別').set('ai',function(){
                            return _status.event.random;
                        }).set('random',random).forResult('control');
                        xiBie=control;
                        switch(xiBie){
                            case'shui':name='shuiLianZhan';break;
                            case 'huo':name='huoYanZhan';break;
                            case 'feng':name='fengShenZhan';break;
                            case 'lei':name='leiGuangZhan';break;
                            case 'di':name='diLieZhan';break;
                        }
                    }else if(length==3){
                        xiBie='an';
                        name='anMie';
                    }
                    var card={name:name,xiBie:xiBie};
                    await player.useCard(card,event.target).set('action',true);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:-1,
                    }
                },
                check: function (card) {
					return 6 - get.value(card);
				},
            },
            qiangYun:{
                trigger:{player:'qiZha'},
                forced:true,
                content:function(){
                    player.addNengLiang('shuiJing');
                }
            },
            diXiaFaZe:{
                trigger:{player:'gouMai'},
                forced:true,
                content:function(){
                    'step 0'
                    player.draw(3).set('cause','teShuXingDong');
                    'step 1'
                    player.addZhanJi('baoShi',2);
                    trigger.finish();
                }
            },
            maoXianJiaTianTang:{
                enable:'xingDong',
                type:'teShu',
                filter:function(event,player){
                    var side=player.side;
                    var zhanJi=get.zhanJi(side);
                    if(zhanJi.length==0) return false;
                    for(var i=0;i<game.players.length;i++){
                        if(side!=game.players[i].side) continue;
                        if(game.players[i].countNengLiangAll()<game.players[i].getNengLiangLimit()){
                            return true;
                        }
                    }
                },
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return player.side==target.side&&target.countNengLiangAll()<target.getNengLiangLimit();
                },
                content:function(){
                    'step 0'
                    var num=target.getNengLiangLimit()-target.countNengLiangAll();
                    num=Math.min(num,2);
                    var list=get.zhanJi(player.side);
                    var listx=[];
                    for(var i=0;i<list.length;i++){
                        listx.push([list[i],get.translation(list[i])]);
                    };
					var next=player.chooseButton([
                        '選擇提煉的星石',
                        [listx,'tdnodes'],
                    ]);
                    next.set('forced',true);
                    next.set('selectButton',[1,num]);
                    next.set('ai',function(button){
                        var player=_status.event.target;
						if(player.hasSkillTag('baoShi')&&!player.hasSkillTag('shuiJing')){
							if(button.link=='baoShi') return 5;
							else return -1;
						}
						if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
							if(button.link=='shuiJing') return 5;
							else return 2;
						}
						//既有水晶也有寶石
						return 2;
                    });
                    next.set('target',target);
                    'step 1'
                    event.dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<result.links.length;i++){
                        if(result.links[i]=='baoShi') event.dict.baoShi++;
                        else if(result.links[i]=='shuiJing') event.dict.shuiJing++;
                    }
                    if(event.dict.baoShi>0) player.changeZhanJi('baoShi',-event.dict.baoShi);
                    if(event.dict.shuiJing>0) player.changeZhanJi('shuiJing',-event.dict.shuiJing);
                    'step 2'
                    if(event.dict.baoShi>0) target.addNengLiang('baoShi',event.dict.baoShi);
                    if(event.dict.shuiJing>0) target.addNengLiang('shuiJing',event.dict.shuiJing);
                    'step 3'
                    if(player.countNengLiangAll()>0){
                        player.removeBiShaShuiJing();
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            if(!(target.hasSkillTag('baoShi')||target.hasSkillTag('shuiJing'))) return 0;
                            var list=get.zhanJi(player.side);
                            if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')&&!list.includes('baoShi')){
                                return 0;
                            }
							var num=target.getNengLiangLimit()-target.countNengLiangAll();
							if(num>=2) return 2;
							return 0;
                        },
                    }
                }
            },
            touTianHuanRi:{
                type:'faShu',
                usable:1,
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('偷天換日','hidden');
                        var list=[['tou','將對方【戰績區】的1[寶石]轉移到我方【戰績區】'],['huan','將我方【戰績區】的[水晶]全部轉換為[寶石]']]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='tou'){
                            var zhanJi=get.zhanJi(!player.side);
                            return zhanJi.includes('baoShi');
                        }
                        if(link=='huan'){
                            return true;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='tou'){
                            var next=get.copy(lib.skill['touTianHuanRi_tou']);
                        }else if(links[0]=='huan'){
                            var next=get.copy(lib.skill['touTianHuanRi_huan']);
                        }
						return next;
					},
                    check:function(button){
                        var player=_status.event.player;
                        if(button.link=='tou'){
                            var zhanJi=get.zhanJi(!player.side);
                            return zhanJi.includes('baoShi')?1:0;
                        }
                        if(button.link=='huan'){
                            return Math.random()*2;
                        }
                    }
                },
                subSkill:{
                    tou:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            'step 1'
                            var side=player.side;
                            player.changeZhanJi('baoShi',-1,!side)
                            'step 2'
                            player.addZhanJi('baoShi',1);
                            'step 3'
                            player.addGongJiOrFaShu();
                        }
                    },
                    huan:{
                        type:'faShu',
                        content:async function(event, trigger, player){
                            await player.removeBiShaShuiJing();
                            var zhanJi=get.zhanJi(player.side).slice();
                            var num=0;
                            for(var xingShi of zhanJi){
                                if(xingShi == 'shuiJing') num++;
                            }
                            if(num>0){
                                await player.changeZhanJi('shuiJing',-num);
                                await player.changeZhanJi('baoShi',num);
                            }
                            player.addGongJiOrFaShu();
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:function(player){
                            if(player.side==true){
                                if(game.hongZhanJi.includes('shuiJing')||game.lanZhanJi.includes('baoShi')) return 1;
                                else return 0;
                            }else{
                                if(game.lanZhanJi.includes('shuiJing')||game.hongZhanJi.includes('baoShi')) return 1;
                                else return 0;
                            }
                        },
                    }
                }

            },
            //聖槍騎士
            shenShengXinYang:{
                mod:{
                    maxZhiLiao:function(player,num){
                        var side=player.side;
                        if(side==true){
                            if(game.hongXingBei>=game.lanXingBei) return num+1;
                        }else if(side==false){
                            if(game.lanXingBei>=game.hongXingBei) return num+1;
                        }
                    }
                }
            },
            huiYao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.huiYao.filterCard(card));
                },
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                discard:true,
                showCards:true,
                selectTarget:-1,
                filterTarget:true,
                content:function(){
                    target.changeZhiLiao(1);
                },
                contentAfter:function(){
                    player.addGongJi();
                },
                ai:{
                    order:3.6,
                    result:{
                        target:1,
                    }
                }
            },
            chengJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.hasCard(card=>lib.skill.chengJie.filterCard(card))) return false;
                    var bool=game.hasPlayer(current=>lib.skill.chengJie.filterTarget('',player,current));
                    return bool;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                selectTarget:1,
				filterTarget:function(card,player,target){
                    if(target.zhiLiao<1) return false;
					return target!=player;
				},
                content:function(){
                    'step 0'
                    target.changeZhiLiao(-1);
                    'step 1'
                    player.changeZhiLiao(1);
                },
                contentAfter:function(){
                    player.addGongJi();
                },
                ai:{
                    order:3.8,
                    result:{
                        target:-1,
                        player:2,
                    }
                }
            },
            shengJi:{
                trigger:{source:'gongJiMingZhong'},
                forced:true,
                filter:function(event,player){
                    return event.customArgs.shengJi!=false;
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            tianQiang:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(event.getParent('xingDong').tianQiang===false) return false;
                    return event.yingZhan!=true&&player.zhiLiao>=2;
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-2);
                    'step 1'
                    trigger.wuFaYingZhan();
                    trigger.customArgs.shengJi=false;
                },
                check:function(event,player){
                    var num=Math.random();
                    return num>0.25;
                }
            },
            diQiang:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    return event.yingZhan!=true&&player.zhiLiao>=1;
                },
                priority:1,
                async cost(event, trigger, player) {
                    var zhiLiao=player.zhiLiao;
                    var list=[];
                    for(var i=1;i<=zhiLiao;i++){
                        if(i>4) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var result=await player.chooseControl(list).set('prompt',"是否發動【地槍】<br>"+lib.translate.diQiang_info).set('ai',function(){
                        var num=_status.event.num;
                        if(num==2) return 'cancel2';
                        else return num-2;
                    }).set('num',list.length).forResult();
                    event.result = {
                        bool: result.control!='cancel2',
                        cost_data: result.control,
                    }
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-event.cost_data);
                    trigger.changeDamageNum(event.cost_data);
                    trigger.customArgs.shengJi=false;
                },
            },
            shengGuangQiYu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.changeZhiLiao(2,5);
                    event.getParent('xingDong').tianQiang=false;
                    'step 2'
                    player.addGongJi();
                },
                ai:{
                    baoShi:true,
                    order:4,
                    result:{
                        player:2.5,
                    }
                }
            },
            //精靈射手
            yuanSuSheJi:{
                trigger:{player:'gongJiShi'},
                usable:1,
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.xiBie(event.card)=='an') return false;
                    return player.countCards('h')>0||player.getCards('s',card=>card.hasGaintag('zhuFu')).length>0;
                },
                async cost(event, trigger, player) {
                    var prompt2="棄1張法術牌[展示]或移除1個【祝福】";
                    switch(get.xiBie(trigger.card)){
                        case 'huo':
                            prompt2+='本次攻擊傷害額外+1';
                            break;
                        case'shui':
                            prompt2+="<span class='tiaoJian'>(主動攻擊命中時)</span>目標角色+1[治療]";
                            break;
                        case 'feng':
                            prompt2+="<span class='tiaoJian'>([攻擊行動]結束後)</span>額外+1[攻擊行動]";
                            break;
                        case 'lei':
                            prompt2+="本次攻擊無法應戰";
                            break;
                        case 'di':
                            prompt2+="<span class='tiaoJian'>(主動攻擊命中時②)</span>對目標角色造成1點法術傷害③";
                            break;
                    }
                    event.result=await player.chooseCard('hs',function(card){
                        if(get.position(card)=='h'){
                            return get.type(card)=='faShu';
                        }else if(get.position(card)=='s'){
                            return card.hasGaintag('zhuFu');
                        }
                    })
                    .set('prompt',get.prompt('yuanSuSheJi'))
                    .set('prompt2',prompt2)
                    .forResult();
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.yuanSuSheJi=true;
                    if(get.position(event.cards[0])=='h'){
                        var flag=true;
                    }    
                    if(flag){
                        player.discard(event.cards).set('showCards',true);
                    }else{
                        player.discard(event.cards,'zhuFu');
                    }
                    switch(get.xiBie(trigger.card)){
                        case 'huo':
                            player.logSkill('yuanSuSheJi_huo');
                            trigger.changeDamageNum(1);
                            break;
                        case'shui':
                            player.addTempSkill('yuanSuSheJi_shui');
                            break;
                        case 'feng':
                            player.addTempSkill('yuanSuSheJi_feng');
                            break;
                        case 'lei':
                            player.logSkill('yuanSuSheJi_lei');
                            trigger.wuFaYingZhan();
                            break;
                        case 'di':
                            player.addTempSkill('yuanSuSheJi_di');
                            break;
                    }

                },
                subSkill:{
                    huo:{},
                    lei:{},
                    shui:{
                        trigger:{source:'gongJiMingZhong'},
                        //direct:true,
                        filter:function(event,player){
                            return event.customArgs.yuanSuSheJi==true&&event.yingZhan!=true;
                        },
                        async cost(event, trigger, player){
                            event.result=await player.chooseTarget('水之矢：目標角色+1[治療]',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            event.targets[0].changeZhiLiao(1);
                        }
                    },
                    feng:{
                        trigger:{player:'gongJiAfter'},
                        forced:true,
                        filter:function(event,player){
                            return event.customArgs.yuanSuSheJi==true;
                        },
                        content:function(){
                            player.addGongJi();
                        }
                    },
                    di:{
                        trigger:{source:'gongJiMingZhong'},
                        //direct:true,
                        filter:function(event,player){
                            return event.customArgs.yuanSuSheJi==true&&event.yingZhan!=true;
                        },
                        async cost(event, trigger, player){
                            event.result=await player.chooseTarget('地之矢：對目標角色造成1點法術傷害',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            event.targets[0].faShuDamage(1,player);
                        }
                    }
                }

            },
            dongWuHuoBan:{
                trigger:{source:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    return _status.currentPhase==player;
                },
                content:async function(event, trigger, player){
                    await event.trigger('dongWuHuoBan');
                    var target=player;
                    if(event.chongWuQiangHua){
                        var targets=await player.chooseTarget('目標角色摸1張牌[強制]，棄1張牌',true).set('ai',function(target){
                            var player=_status.event.player;
                            var num=target.countCards('h')-target.getHandcardLimit();
                            return target.side!=player.side&&num>=0;
                        }).forResult('targets');
                        target=targets[0];
                    }
                    await target.draw(1);
                    await target.chooseToDiscard(1,'h',true);
                },
                check:function(event,player){
                    if(player.canBiShaShuiJing()){
                        var bool=game.hasPlayer(function(current){
                            if(current.side==player.side) return false;
                            let num=current.countCards('h')-current.getHandcardLimit();
                            return num>=0;
                        });
                        if(bool) return true;
                    }
                    var num=player.getHandcardLimit()-player.countCards('h');
                    return num>0;
                }
            },
            jingLingMiYi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi()&&!player.isHengZhi(); 
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    game.log(player,'將牌堆頂3張牌作為','【祝福】');
                    var cards=get.cards(3);
                    player.loseToSpecial(cards,'zhuFu',player);
                    player.markSkill('zhuFu');
                },
                group:['jingLingMiYi_chongZhi','jingLingMiYi_wuFaXingDongBefore','jingLingMiYi_wuFaXingDongAfter'],
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        //forced:true,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            return cards.length==0;
                        },
                        async cost(event, trigger, player) {
                            event.result=await player.chooseTarget("精靈秘儀：對目標角色造成2點法術傷害",true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,2);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            player.unmarkSkill('zhuFu');
                            'step 1'
                            event.targets[0].faShuDamage(2,player); 
                        }
                    },
                    wuFaXingDongBefore:{
                        trigger:{player:'wuFaXingDongBefore'},
                        direct:true,
                        filter:function(event,player){
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            return cards.length>0;
                        },
                        content:function(){
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            trigger.contentx[1].concat(cards);
                        },
                    },
                    wuFaXingDongAfter:{
                        trigger:{player:'wuFaXingDongAfter'},
                        direct:true,
                        filter:function(event,player){
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            return cards.length>0;
                        },
                        content:async function(event, trigger, player){
                            var zhuFu=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            await player.discard(zhuFu,'zhuFu');
                            game.log(player,`將牌堆頂${zhuFu.length}張牌作為`,'【祝福】');
                            var cards=get.cards(zhuFu.length);
                            await player.loseToSpecial(cards,'zhuFu',player);
                        }
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            chongWuQiangHua:{
                trigger:{player:'dongWuHuoBan'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    trigger.chongWuQiangHua=true;
                },
                check:function(event,player){
                    var bool=game.hasPlayer(function(current){
                        var num=current.countCards('h')-current.getHandcardLimit();
                        return current.side!=player.side&&num>=0;
                    });
                    return bool;
                }
            },
            zhuFu:{
                intro:{
                    mark:function(dialog,storage,player){
						var cards=player.getCards('s',function(card){
							return card.hasGaintag('zhuFu');
						});
                        if(!cards||!cards.length) return ;
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'張牌';
					},
					markcount:function(storage,player){
						var cards=player.getCards('s',function(card){
							return card.hasGaintag('zhuFu');
						});
                        return cards.length;
					},
                    
                },
                onremove:function(player, skill) {
                    const cards = player.getCards('s',function(card){
                        return card.hasGaintag('zhuFu');
                    });
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            //瘟疫法師
            buXiu:{
                trigger:{player:'faShuEnd'},
                filter:function(event,player){
                    return event.skill!='siWangZhiChu_backup';
                },
                content:function(){
                    player.changeZhiLiao(1);
                },
            },
            shengDu:{
                trigger:{player:'zhiLiao'},
                filter:function(event,player){
                    return !event.faShu;
                },
                forced:true,
                content:function(){
                    trigger.cancel();
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+3;
                    }
                }
            },
            wenYi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.wenYi.filterCard(card));
                },
                discard:true,
                showCards:true,
                filterCard:function(card){
                    return get.xiBie(card)=='di';
                },
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                content:async function(event, trigger, player){
                    await event.target.faShuDamage(1,player).set('wenYi',true);
                },
                group:'wenYi_shiQiXiaJiang',
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        content:function(){
                            player.changeZhiLiao(1);
                            player.removeSkill('wenYi_zhiLiao');
                        }
                    },
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').wenYi==true&&event.num<0;
                        },
                        content:function(){
                            if(!player.hasSkill('wenYi_zhiLiao')){
                                player.addTempSkill('wenYi_zhiLiao');
                            }
                        }
                    },
                },
                ai:{
                    order:3.6,
                    result:{
                        target:-0.5,
                    }
                }
            },
            siWangZhiChu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(player.zhiLiao<2) return false;
                    return player.countTongXiPai()>=2;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog('死亡之觸：移除X點[治療]','hidden');
                        var list=[];
                        for(var i=0;i<=player.zhiLiao;i++){
                            if(i<2) continue;
                            list.push(i);
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
					},
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
                            filterTarget:true,
                            selectCard:[2,Infinity],
                            lose:false,
                            discard:false,
                            filterCard:function(card){
                                return get.xuanZeTongXiPai(card);
                            },
                            complexCard:true,
							content:function(){
								'step 0'
								event.links=lib.skill.siWangZhiChu_backup.links;
                                event.a=event.links[0];
                                event.b=cards.length;
                                player.changeZhiLiao(-event.a);
                                'step 1'
                                player.discard(cards).set('showCards',true);
                                'step 2'
                                target.faShuDamage(event.a+event.b-3,player);
							},
                            ai:{
                                result:{
                                    target:function(player, target){
                                        return get.damageEffect(target,2);
                                    }
                                }
                            }
						}
					},
                    prompt:function(links,player){
                        var num=links[0];
						return `棄置Y張同系牌[展示]至少2張，對目標角色造成(${num}+Y-3)點傷害`;
					},
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 1.3+player.zhiLiao;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            juDuXinXing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                contentBefore:function(){
                    player.removeBiShaBaoShi();
                },
                content:function(){
                    target.faShuDamage(2,player);
                },
                contentAfter:function(){
                    player.changeZhiLiao(1);
                },
                ai:{
                    baoShi:true,
                    order:3.7,
                    result:{
                        target:function(player, target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            //魔劍士
            xiuLuoLianZhan:{
                usable:1,
                trigger:{player:"gongJiAfter"},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.xiBie(card)!='huo'||get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        prompt:'修羅連斬：火系[攻擊行動]',
                    });
                },
                check:function(event,player){
                    return player.hasCard(card=>get.xiBie(card)=='huo');
                },
                mod:{
                    aiUseful(player, card, num) {
                        if (get.xiBie(card, player) === "huo"&&get.type(card) === "gongJi") {
                            return num + 1;
                        }
                    },
                    aiOrder:function(player,card,num){
                        if(get.xiBie(card,player)=='huo'&&get.type(card)=='gongJi'){
                            return num-0.2;
                        }
                    }
                }
            },
            anYingNingJu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return !player.isHengZhi(); 
                },
                content:function(){
                    'step 0'
                    player.faShuDamage(1,player);
                    'step 1'
                    player.hengZhi();                 
                },
                check:function(event,player){
                    if(player.countCards('h',card=>get.type(card)=='faShu')==player.countCards('h')) return true;
                    var num=player.getHandcardLimit()-player.countCards('h');
                    return num>0;
                },
                group:'anYingNingJu_chongZhi',
                subSkill:{
                    chongZhi:{
                        direct:true,
                        trigger:{player:'xingDongBegin'},
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            player.chongZhi();
                        }
                    }
                }
            },
            anYingZhiLi:{
                forced:true,
                trigger:{player:'gongJiShi'},
				filter:function(event,player){
                   return player.isHengZhi();
				},
				content:function(){
					trigger.changeDamageNum(1);
				},
            },
            anYingKangJu:{
                mod:{
                    cardEnabled:function(card,player){
                        if(_status.currentPhase==player&&get.type(card)=='faShu'){
                            return false;
                        }
                    }
                }
            },
            anYingLiuXing:{
                type:'faShu',
                enable:'faShu',
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectTarget:1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    return player.countCards('h',card=>lib.skill.anYingLiuXing.filterCard(card))>=2;
                },
                discard:true,
                showCards:true,
                content:async function(event, trigger, player){
                    await event.target.faShuDamage(2,player);
                    var list=get.zhanJi(player.side);
                    if(list.length<2) return;
                    var listx=[];
                    for(var i=0;i<list.length;i++){
                        listx.push([list[i],get.translation(list[i])]);
                    }
                    var bool=list.includes('shuiJing')||list.length>=3;
                    var result=await player.chooseButton([
                        '是否額外移除2個星石',
                        [listx,'tdnodes'],
                    ])
                    .set('bool',bool)
                    .set('selectButton',[2,2])
                    .set('ai',function(button){
                        var bool=_status.event.bool;
                        if(!bool) return 0;
                        if(button.link=='shuiJing'){
                            return 5;
                        }else{
                            return 2;
                        }
                    }).forResult();
                    if(!result.bool) return;

                    var dict={shuiJing:0,baoShi:0};
                    for(var i=0;i<result.links.length;i++){
                        dict[result.links[i]]++;
                    }
                    if(dict.shuiJing>0) await player.changeZhanJi('shuiJing',-dict.shuiJing);
                    if(dict.baoShi>0) await player.changeZhanJi('baoShi',-dict.baoShi);
                    await player.chongZhi();
                    await player.addNengLiang('baoShi');
                },
                group:'anYingLiuXing_wuFaXingDong',
                subSkill:{
                    wuFaXingDong:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='anYingLiuXing_wuFaXingDong') return false;//需要排除自身，防止嵌套
                            if(player.countCards('h',card=>get.type(card)=='faShu')!=player.countCards('h')) return false;
                            return get.info('_wuFaXingDong').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                },
                ai:{
					order:function(item,player){
                        return 1.5+player.countCards('h');
                    },
					result:{
						target:function(player,target){
							return get.damageEffect(target,2);
						}
					},
				},
            },
            huangQuanZhengChan:{
                usable:1,
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    trigger.customArgs.huangQuanZhengChan=true;
                    trigger.wuFaYingZhan();
                },
                group:'huangQuanZhengChan_mingZhong',
                subSkill:{
                    mingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return event.customArgs.huangQuanZhengChan==true;
                        },
                        content:function(){
                            'step 0'
                            var num=player.getHandcardLimit();
                            player.drawTo(num);
                            'step 1'
                            player.chooseToDiscard('h',true,2);
                        }
                    }
                },
                check:function(event,player){
                    if(get.xiBie(event.card)=='an') return false;
                    var target=event.targets[0];
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length<get.zhanJiMax(player.side)) return true;
                    var minus=target.getHandcardLimit()-target.countCards('h');
                    var num=Math.random();
                    if(minus<2) return num>0.1;
                    else return num>0.5;
                },
                ai:{
                    baoShi:true,
                }
            },
            //血色劍靈
            xueSeJingJi:{
                trigger:{source:'gongJiMingZhong'},
                forced:true,
                content:function(){
                    player.addZhiShiWu('xianXue');
                }
            },
            chiSeYiShan:{
                trigger:{player:'gongJiAfter'},
                filter:function(event,player){
                    return player.countZhiShiWu('xianXue')>=1&&event.yingZhan!=true;
                },
                content:async function(event, trigger, player){
                    await player.removeZhiShiWu('xianXue');
                    await player.faShuDamage(2,player);
                    player.addGongJi();
                },
                check:function(event,player){
                    if(player.countZhiShiWu('xianXue')>=2) return true;
                    if(player.countCards('h',card=>get.xiBie(card)=='an')>0) return true;

                    if(player.countCards('h')+2>player.getHandcardLimit()) return false;
                    else return true;
                }

            },
            xueRanQiangWei:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('xianXue')>=2;
                },
                filterTarget:true,
                contentBefore:function(){
                    player.removeZhiShiWu('xianXue',2);
                },
                content:function(){
                    'step 0'
                    target.changeZhiLiao(-2);
                    'step 1'
                    player.chooseTarget('將我方角色[能量區]的1[水晶]翻面為[寶石]',true,function(card,player,target){
                        return player.side==target.side;
                    }).set('ai',function(target){
                        if(target.countNengLiang('shuiJing')>0) return 2;
                        else return 1;
                    });
                    'step 2'
                    if(result.bool){
                        event.target=result.targets[0];
                        if(result.targets[0].countNengLiang('shuiJing')){
                            event.target.removeNengLiang('shuiJing');
                        }else event.finish();
                    }else event.finish()
                    'step 3'
                    event.target.addNengLiang('baoShi');
                },
                contentAfter:function(){
                    'step 0'
                    if(player.hasMark('xueQiangWeiTingYuan')){
                        event.flag=true;
                        event.num=0;
                        event.targets=game.filterPlayer().sortBySeat(player);
                    }
                    'step 1'
                    if(event.flag){
                        if(event.num<event.targets.length){
                            event.targets[event.num].faShuDamage(1,player);
                            event.num++;
                            event.redo();
					    }
                    }
                },
                ai:{
                    order:function(item,player){
                        return 6-player.countCards('h');
                    },
                    result:{
                        target:function(player,target){
                            if(target.zhiLiao) return -target.zhiLiao;
                            return -0.1;
                        }
                    }
                }
            },
            xueQiPingZhang:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    return player.countZhiShiWu('xianXue')>=1;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('xianXue');
                    trigger.num--;
                    'step 1'
                    player.chooseTarget('對目標對手造成1點法術傷害③',true,function(card,player,target){
                        return target.side!=player.side;
                    }).set('ai',function(target){
                        return -get.damageEffect(target,1);
                    })
                    'step 2'
                    if(result.bool){
                        result.targets[0].faShuDamage(1,player);
                    }
                },
                check:function(event,player){
                    return player.countZhiShiWu('xianXue')>1;
                }
            },
            xueQiangWeiTingYuan:{
                intro:{
                    content:"<span class='tiaoJian'>(此卡在場時)</span>所有角色的[治療]無法用於抵禦傷害；<span class='tiaoJian'>(血色劍靈的回合結束時)</span>移除此卡。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/xueQiangWeiTingYuan.png',
                trigger:{global:'zhiLiao'},
                filter:function(event,player){
                    return player.hasZhiShiWu('xueQiangWeiTingYuan');
                },
                forced:true,
                firstDo:true,
                content:function(){
                    trigger.cancel();
                },
                group:'xueQiangWeiTingYuan_yiChu',
                subSkill:{
                    yiChu:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.hasZhiShiWu('xueQiangWeiTingYuan');
                        },
                        content:function(){
                            player.removeZhiShiWu('xueQiangWeiTingYuan');
                        },
                    }
                }
            },
            sanHuaLunWu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    var list=["[水晶]將【血薔薇庭院】放置於場上，你+2<span class='hong'>【</span>鮮血<span class='hong'>】</span>","[寶石]將【血薔薇庭院】放置於場上，無視你的<span class='hong'>【</span>鮮血<span class='hong'>】</span>上限為你+2<span class='hong'>【</span>鮮血<span class='hong'>】</span>但你的<span class='hong'>【</span>鮮血<span class='hong'>】</span>數最高為4，你棄到4張牌。"];
                    var choices=['選項一'];
                    if(player.canBiShaBaoShi()){
                        choices.push('選項二');
                    }
                    var result=await player.chooseControl(choices).set('choiceList',list).set('ai',function(){
                        var player=_status.event.player;
                        if(player.canBiShaBaoShi()) return '選項二';
                        return '選項一';
                    }).forResult();
                    if(result.control=='選項一'){
                        await player.removeBiShaShuiJing();
                        await player.addZhiShiWu('xueQiangWeiTingYuan');
                        await player.addZhiShiWu('xianXue',2);
                    }else if(result.control=='選項二'){
                        await player.removeBiShaBaoShi();
                        await player.addZhiShiWu('xueQiangWeiTingYuan');
                        await player.addZhiShiWu('xianXue',2,4);
                        if(player.countCards('h')>4){
                            var num=player.countCards('h')-4;
                            await player.chooseToDiscard('h',true,num);
                        }
                    }
                },
                check:function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    if(player.countZhiShiWu('xianXue')+2>=3&&!player.canBiShaBaoShi()) return false;
                    return true;
                },
                ai:{
                    baoShi:true,
                    shuiJing:true,
                }
            },
            xianXue:{
                intro:{
                    name:'鮮血',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //祈禱師
            guangHuiXinYang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return target.side==player.side;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('qiDaoFuWen');
                    'step 1'
                    if(player.countCards('h')>=2){
                        player.chooseToDiscard('h',true,2);
                    }else if(player.countCards('h')==1){
                        player.chooseToDiscard('h',true,1);
                    }
                    'step 2'
                    player.addZhanJi('baoShi',1);
                    'step 3'
                    target.changeZhiLiao(1);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.zhiLiaoEffect2(target,player,1);
                        },
                        player:function(player){
                            if(player.countCards('h')>=4) return 2;
                            else return 1;
                        }
                    }
                }
            },
            heiAnZuZhou:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('qiDaoFuWen');
                    'step 1'
                    target.faShuDamage(2,player);
                    'step 2'
                    player.faShuDamage(2,player);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        },
                        player:function(player){
                            if(player.countCards('h')+2-player.zhiLiao>=player.getHandcardLimit()) return -1;
                            else return 1;
                        }
                    }
                }
            },
            weiLiCiFu:{
                type:'faShu',
                enable:'faShu',
                duYou:'weiLiCiFu',
                filter:function(event,player){
                    var bool1=player.hasCard(card=>lib.skill.weiLiCiFu.filterCard(card));
                    var bool2=game.hasPlayer(current=>lib.skill.weiLiCiFu.filterTarget("",player,current));
                    return bool1&&bool2;
                },
                selectCard:1,
                filterCard:function(card){
                    return card.hasDuYou('weiLiCiFu');
                },
                useCard:true,
                filterTarget:function(card,player,target){
                    if(target==player || target.side!=player.side) return false;
                    return lib.filter.targetEnabled({name:'weiLiCiFu'},player,target);
                },
                content:function(){
                    'step 0'
                    if(!target.hasSkill('weiLiCiFu_xiaoGuo')){
                        target.addSkill('weiLiCiFu_xiaoGuo');
                    }
                    'step 1'
                    target.addJiChuXiaoGuo('weiLiCiFu_xiaoGuo',cards);
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"威",
                        intro:{
                            content:'jiChuXiaoGuo',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getGaiPai(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{source:'gongJiMingZhong'},
                        priority:-1,
                        filter:function(event,player){
                            return player.hasGaiPai('weiLiCiFu_xiaoGuo');
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getGaiPai('weiLiCiFu_xiaoGuo'),'weiLiCiFu_xiaoGuo').set('visible',true);
                            trigger.changeDamageNum(2);
                            'step 1'
                            player.removeSkill('weiLiCiFu_xiaoGuo');
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        target:1,
                    }
                }
            },
            xunJieCiFu:{
                type:'faShu',
                enable:'faShu',
                duYou:"xunJieCiFu",
                filter:function(event,player){
                    var bool1=player.hasCard(card=>lib.skill.xunJieCiFu.filterCard(card));
                    var bool2=game.hasPlayer(current=>lib.skill.xunJieCiFu.filterTarget("",player,current));
                    return bool1&&bool2;
                },
                filterCard:function(card){
                    return card.hasDuYou('xunJieCiFu');
                },
                useCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player || target.side!=player.side) return false;
                    return lib.filter.targetEnabled({name:'xunJieCiFu'},player,target);
                },
                content:function(){
                    'step 0'
                    if(!target.hasSkill('xunJieCiFu_xiaoGuo')){
                        target.addSkill('xunJieCiFu_xiaoGuo');
                    }
                    'step 1'
                    target.addJiChuXiaoGuo('xunJieCiFu_xiaoGuo',cards);
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"迅",
                        intro:{
                            content:'jiChuXiaoGuo',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getGaiPai(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        //priority:1,
                        trigger:{player:['gongJiEnd','faShuEnd']},
                        filter:function(event,player){
                            if(event.yingZhan==true) return false;
                            return player.hasJiChuXiaoGuo('xunJieCiFu_xiaoGuo');
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getJiChuXiaoGuo('xunJieCiFu_xiaoGuo'),'xunJieCiFu_xiaoGuo').set('visible',true);
                            player.addGongJi();
                            'step 1'
                            player.removeSkill('xunJieCiFu_xiaoGuo');
                        },
                        check:function(event,player){
                            return player.canGongJi();
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        target:1,
                    }
                }
            },
            qiDao:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                },
                group:'qiDao_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        forced:true,
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            player.addZhiShiWu('qiDaoFuWen',2);
                        }
                    }
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    baoShi:true,
                    skillTagFilter:function(player,tag,arg){
                        if(tag=='baoShi'&&player.isHengZhi()) return false;
                    }
                }
            },
            faLiChaoXi:{
                trigger:{player:['faShuEnd']},
                usable:1,
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    player.addFaShu();
                },
                ai:{
                    shuiJing:true,
                },
                check:function(event,player){
                    return player.canFaShu();
                }
            },
            qiDaoFuWen:{
                intro:{
                    name:'祈禱符文',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //紅蓮騎士
            xingHongShengYue:{
                usable:1,
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            xingHongXinYang:{
                trigger:{player:'zhiLiao'},
                forced:true,
                filter:function(event,player){
                    return event.source!=player;
                },
                content:function(){
                    trigger.cancel();
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+2;
                    }
                }
            },
            xueXingDaoYan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    var list=[];
                    for(var i=1;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','血腥禱言：移除X點[治療]，對自己造成X點法術傷害');
                    'step 1'
                    player.changeZhiLiao(-result.control);
                    player.faShuDamage(result.control,player);
                    player.storage.xueXingDaoYan=result.control;
                    'step 2'
                    event.links=[player.storage.xueXingDaoYan];
                    if(event.links[0]>1){
                        var num=2;
                        var prompt='選擇1~2個目標隊友';
                    }else{
                        var num=1;
                        var prompt='選擇1個目標隊友';
                    }
                    prompt+=`+${event.links[0]}點[治療]`;
                    player.chooseTarget(function(card,player,target){
                        if(target==player) return false;
                        return target.side==player.side;
                    },[1,num],true,prompt).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 3'
                    if(result.targets.length==1){
                        result.targets[0].changeZhiLiao(event.links[0]);
                        event.goto(7);
                    }else{
                        result.targets.sortBySeat(player);
                        event.targets=result.targets;
                        event.target=event.targets[0];
                    }
                    'step 4'
                    var list=[];
                    for(var i=1;i<=event.links[0]-1;i++){
                        list.push(i);
                    }
                    var name=get.translation(event.target);
                    var str=name+'獲得幾點[治療]';
                    player.chooseControl(list).set('prompt',str);
                    'step 5'
                    event.target.changeZhiLiao(result.control);
                    event.links[0]-=result.control;
                    'step 6'
                    event.target=event.targets[1];
                    event.target.changeZhiLiao(event.links[0]);
                    'step 7'
                    player.addZhiShiWu('xueYin');
                },
                check:function(event,player){
                    if(player.countZhiShiWu('xueYin')>=lib.skill.xueYin.intro.max) return false;
                    var zhiLiaoPlayer=game.filterPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.zhiLiao<current.getZhiLiaoLimit();
                    });
                    return zhiLiaoPlayer.length>0;
                }
            },
            shaLuShengYan:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.countZhiShiWu('xueYin')>0;
                },
                content:function(){
                    player.removeZhiShiWu('xueYin');
                    player.faShuDamage(4,player);
                    trigger.changeDamageNum(2);
                }
            },
            reXueFeiTeng:{
                forced:true,
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;//是否已經橫置
                    if(event.player!=player) return false;
                    if(event.num>=0) return false;//增加士氣無法發發動
                    if(event.cause!='damage') return false;//判斷原因
                    return true;
                },
                content:function(){
                    player.hengZhi();
                },
                group:['reXueFeiTeng_xiaoGuo','reXueFeiTeng_chongZhi'],
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'chengShouShangHai'},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            trigger.shiQiXiaJiang=false;
                        },
                        ai:{
                            noShiQiXiaJiang:true,
                            skillTagFilter:function(player,tag,arg){
                                if(tag=='noShiQiXiaJiang'&&!player.isHengZhi()) return false;
                            }
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.changeZhiLiao(2);
                        }
                    }
                }
            },
            jieJiaoJieZao:{
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(!player.canBiShaShuiJing()) return false;
                    if(!player.isHengZhi()) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chongZhi();
                    'step 2'
                    player.addGongJiOrFaShu();
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }
                
            },
            xingHongShiZi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(player.countZhiShiWu('xueYin')<1) return false;
                    if(player.countCards('h',card=>lib.skill.xingHongShiZi.filterCard(card))<2) return false;
                    return true;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:false,
                lose:false,
                filterTarget:true,
                contentBefore:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.removeZhiShiWu('xueYin');
                    'step 1'
                    player.discard(cards).set('showCards',true);
                },
                content:function(){
                    'step 0'
                    player.faShuDamage(4,player);
                    'step 1'
                    target.faShuDamage(3,player);
                },
                check:function(card){
                    return 7-get.value(card);
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        var num=3.1;
                        if(player.isHengZhi()) num+=2;
                        return num;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        },
                        player:function(player){
                            return get.damageEffect(player,4);
                        },
                    }
                }
            },
            xueYin:{
                intro:{
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //英靈人形
            zhanWenZhangWo:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    player.addZhiShiWu('zhanWen',3);
                },
                fanZhuanZhanWen:function(player,num){
                    var num=num||1;
                    if(!player.hasZhiShiWu('zhanWen')) return;
                    var next=game.createEvent('fanZhuanZhanWen');
                    next.player=player;
                    if(num>player.countZhiShiWu('zhanWen')) num=player.countZhiShiWu('zhanWen');
                    next.num=num;
                    next.setContent(function(){
                        'step 0'
                        player.removeZhiShiWu('zhanWen',event.num);
                        'step 1'
                        player.addZhiShiWu('moWen',event.num);
                    });
                    return next;
                },
                fanZhuanMoWen:function(player,num){
                    var num=num||1;
                    if(!player.hasZhiShiWu('moWen')) return;
                    var next=game.createEvent('fanZhuanMoWen');
                    next.player=player;
                    if(num>player.countZhiShiWu('moWen')) num=player.countZhiShiWu('moWen');
                    next.num=num;
                    next.setContent(function(){
                        'step 0'
                        player.removeZhiShiWu('moWen',event.num);
                        'step 1'
                        player.addZhiShiWu('zhanWen',event.num);
                    });
                    return next;
                }

            },
            nuHuoYaZhi:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(event.nuHuoYaZhi==false) return false;
                    return player.countZhiShiWu('zhanWen')>=1;
                },
                content:function(){
                    lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player,1);
                    trigger.moWenRongHe=false
                },
                check:function(event,player){
                    var moWen=player.countZhiShiWu('moWen');
                    if(moWen==0) return true;
                    if(player.countYiXiPai()>=1) return false;
                    var zhanWen=player.countZhiShiWu('zhanWen');
                    if(zhanWen==1) return false;
                    return true;
                }
            },
            zhanWenSuiJi:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(player.countZhiShiWu('zhanWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    return player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',[2,Infinity],card=>get.xuanZeTongXiPai(card))
                        .set('complexCard',true)
                        .set('prompt',get.prompt('zhanWenSuiJi'))
                        .set('prompt2',lib.translate.zhanWenSuiJi_info)
                        .set('ai',function(card){
                            return 1;
                        })
                        .forResult();
                },
                content:async function(event, trigger, player){
                    var num=event.cards.length-1;
                    var zhanWenNum=1;
                    if(player.isHengZhi()&&player.countZhiShiWu('zhanWen')>1){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('zhanWen')-1;i++){
                            list.push(i);
                        }
                        var control=await player.chooseControl(list).set('prompt',`額外翻轉Y個【戰紋】，本次攻擊傷害額外+(${num}+Y)`).set('ai',function(){
                            return list.length;
                        }).set('num',list.length).forResultControl();
                        if(control>0){
                            num+=control;
                            zhanWenNum+=control;
                        }
                    }
                    await lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player,zhanWenNum);
                    await player.discard(event.cards).set('showCards',true);
                    trigger.changeDamageNum(num);
                }
            },
            moWenRongHe:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.moWenRongHe==false) return false;
                    if(player.countZhiShiWu('moWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    return player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',[2,Infinity],card=>get.xuanZeYiXiPai(card))
                        .set('complexCard',true)
                        .set('prompt',get.prompt('moWenRongHe'))
                        .set('prompt2',lib.translate.moWenRongHe_info)
                        .set('ai',function(card){
                            return 1;
                        })
                        .forResult();
                },
                content:async function(event, trigger, player){
                    trigger.nuHuoYaZhi=false;
                    var num=event.cards.length-1;
                    var moWenNum=1;
                    if(player.isHengZhi()&&player.countZhiShiWu('moWen')>1){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('moWen')-1;i++){
                            list.push(i);
                        }
                        var control=await player.chooseControl(list).set('prompt',`額外翻轉Y個【魔紋】，本次法術傷害為${num}+Y`).set('ai',function(){
                            return list.length;
                        }).set('num',list.length).forResultControl();
                        if(control>0){
                            num+=control;
                            moWenNum+=control;
                        }
                    }
                    await lib.skill.zhanWenZhangWo.fanZhuanMoWen(player,moWenNum);
                    await player.discard(event.cards).set('showCards',true);
                    await trigger.player.faShuDamage(num,player);
                }
            },
            fuWenGaiZao:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    player.draw(1);
                    'step 3'
                    var list=[];
                    for(var i=0;i<=3;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','選擇【戰紋】數量').set('ai',function(){
                        var num=Math.random();
                        if(num>0.5) return 1;
                        else return 2;
                    });
                    'step 4'
                    var num=result.control;
                    if(player.countZhiShiWu('zhanWen')>num){
                        lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player,player.countZhiShiWu('zhanWen')-num);
                    }else if(player.countZhiShiWu('zhanWen')<num){
                        lib.skill.zhanWenZhangWo.fanZhuanMoWen(player,num-player.countZhiShiWu('zhanWen'));
                    }
                },
                check:function(event,player){
                    return player.canGongJi();
                },
                group:['fuWenGaiZao_chongZhi'],
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isHengZhi()) return num+1;
                    },
                    aiOrder:function(player,card,num){
                        if(get.type(card)=='gongJi'&&player.isHengZhi()) return num+1;
                    }
                },
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    },
                },
                ai:{
                    baoShi:true,
                }
            },
            shuangChongHuiXiang:{
                usable:1,
                trigger:{source:'zaoChengShangHai'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(trigger.num>3){
                        event.num=3;
                    }else{
                        event.num=trigger.num;
                    }
                    'step 2'
                    var str='對另一名目標角色造成'+event.num+'點法術傷害';
                    player.chooseTarget(str,true,function(card,player,target){
                        return target!=_status.event.trigger_player;
                    }).set('trigger_player',trigger.player).set('ai',function(target){
                        return -get.attitude(player, target);
                    });
                    'step 3'
                    if(result.bool){
                        var next=result.targets[0].faShuDamage(event.num,player);
                        next.set('shiQiXiaJiang',false);
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            zhanWen:{
                intro:{
                    name:'戰紋',
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/zhanWen.png',
            },
            moWen:{
                intro:{
                    name:'魔紋',
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/moWen.png',
            },
            //神官
            shenShengQiShi:{
                trigger:{player:'teShuEnd'},
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            shenShengQiFu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.shenShengQiFu.filterCard(card))>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                content:function(){
                    player.changeZhiLiao(2);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.6,
                    result:{
                        player:function(player){
                            return get.zhiLiaoEffect(player,2);
                        },
                    }
                }
            },
            shuiZhiShenLi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.shuiZhiShenLi.filterCard(card))>=1;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                discard:true,
                showCards:true,
                filterTarget:function(card,player,target){
                    return target.side==player.side&&target!=player;
                },
                content:function(){
                    'step 0'
                    if(player.countCards('h')>0){
                        player.chooseCard('h','交給目標隊友1張牌',true,1);
                    }
                    'step 1'
                    if(result.bool){
                        player.give(result.cards[0],target);
                    }
                    'step 2'
                    player.changeZhiLiao(1);
                    'step 3'
                    target.changeZhiLiao(1,player);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')+1<=target.getHandcardLimit()){
                                return 1.5;
                            }else{
                                return -1;
                            }
                        },
                        player:1,
                    }
                }
            },
            shengShiShouHu:{
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+4;
                    }
                },
                trigger:{player:'zhiLiaoSheZhi'},
                forced:true,
                content:function(){
                    trigger.zhiLiaoLimit=1;
                }
                
            },
            shenShengQiYue:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.zhiLiao>0;
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    var list=[];
                    for(var i=1;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    //ai相關
                    var num=0;
                    var target;
                    for(var cur of game.players){
                        if(cur.side==player.side&&cur!=player){
                            let empty=4-cur.zhiLiao;
                            if(cur.hasSkillTag('zhiLiaoYiChu')) empty+=1;
                            if(cur.hasSkillTag('noZhiLiao')) empty=0;
                            if(empty>0&&empty>num) {
                                num=empty;
                                target=cur;
                            }
                        }
                    }
                    var result=await player.chooseButtonTarget({
                        num: num,
                        target:target,
                        forced:true,
                        createDialog:[
                            `轉移[治療]數量及轉移隊友`,
							[
								list,
								"tdnodes",
							],
                        ],
                        filterTarget:lib.filter.teammate,
                        ai1:function(button){
                            if(button.link==_status.event.num) return 5;
                            else return 1;
                        },
                        ai2:function(target){
                            if(target==_status.event.target) return 10;
                            else if(target.side==_status.event.player.side) return 1;
                            return 0;
                        },
                    }).forResult();

                    var target=result.targets[0];
                    var control=result.links[0];
					if(control>0){
						await player.changeZhiLiao(-control);
                        await target.changeZhiLiao(control,4,player).set('zhuanYi',true);
					}
                },
                ai:{
                    shuiJing:true,
                },
                check:function(event,player){
                    if(player.zhiLiao<=1) return false;
                    if(player.getCards('h')==0&&player.countNengLiangAll()<=1) return false;
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    return game.hasPlayer(function(current){
                        if(current==player) return false;
                        if(current.side!=player.side) return false;
                        if(current.hasSkillTag('noZhiLiao')) return false;
                        if(current.zhiLiao+2<=4) return true;
                        return false;
                    });
                }
            },
            shenShengLingYu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard(2,true,'h');
                    var choiceList=["<span class='tiaoJian'>(移除你的1[治療])</span>對目標角色造成2點法術傷害③","你+2[治療]，目標隊友+1[治療]"];
                    var list=['選項二'];
                    if(player.zhiLiao>0){
                        list.unshift('選項一');
                    }
                    var control=await player.chooseControl(list).set('prompt','神聖領域').set('choiceList',choiceList).set('ai',function(event,player){
                        if(player.zhiLiao+2>=player.getZhiLiaoLimit()) return '選項一';
                        else return '選項二';
                    }).forResultControl();
                    'step 2'
                    if(control=='選項一'){
                        await player.changeZhiLiao(-1);
                        var targets=await player.chooseTarget('對目標角色造成2點法術傷害③',true).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,2);
                        }).forResultTargets();
                        var target=targets[0];
                        await target.faShuDamage(2,player);
                    }else if(control=='選項二'){
                        await player.changeZhiLiao(2);
                        var targets=await player.chooseTarget('目標隊友+1[治療]',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        }).set('ai',function(target){
                            var player=_status.event.player;
                            return get.zhiLiaoEffect2(target,player,1);
                        }).forResultTargets();
                        var target=targets[0];
                        await target.changeZhiLiao(1,player);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }       
            },
            //陰陽師
            shiShenJiangLin:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.countTongMingPai()>=2;
                },
                discard:true,
                showCards:true,
                selectCard:2,
                filterCard:function(card,player){
                    return get.xuanZeTongMingPai(card);
                },
                complexCard:true,
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    player.addZhiShiWu('guiHuo');
                    player.addGongJi();
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            yinYangZhanHuan:{
                enable:['yingZhan'],
                filter:function(event,player){
                    var event=_status.event;
                    if(event.canYingZhan==false) return false;
                    var mingGe=get.mingGe(event.card);
                    return player.hasCard(card=>get.mingGe(card)==mingGe&&get.type(card)=='gongJi');
                },
                filterCard:function(card,player,event){
                    var event=_status.event;
                    var mingGe=get.mingGe(event.card);
                    return get.mingGe(card)==mingGe&&get.type(card)=='gongJi';
                },
                position:'h',
                viewAs:function(cards,player){
                    var event=_status.event;
					return {name:get.name(event.card),xiBie:get.xiBie(event.card),isCard:true};
				},
                group:['yinYangZhanHuan_xiaoGuo'],
                ai:{
                    order:5,
                },
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'gongJiBefore'},
                        firstDo:true,
                        direct:true,
                        priority:1,
                        filter:function(event,player){
                            return event.skill=='yinYangZhanHuan';
                        },
                        content:function(){
                            'step 0'
                            player.addZhiShiWu('guiHuo');
                            game.setXiBie(trigger.card,get.xiBie(trigger.cards[0]));
                            'step 1'
                            event.trigger('yinYangZhanHuan');
                            'step 2'
                            if(player.isHengZhi()){
                                player.chongZhi();
                            }else{
                                event.finish();
                            }
                            'step 3'
                            trigger.damageNum=player.countZhiShiWu('guiHuo');
                        }
                   } 
                }
            },
            shiShenZhuanHuan:{
                trigger:{player:'yinYangZhanHuan'},
                content:function(){
                    player.draw(1);
                    player.addZhiShiWu('guiHuo');
                },
                check:function(event,player){
                    if(player.countZhiShiWu('guiHuo')>2) return false;
                    if(player.countCards('h')+1<=player.getHandcardLimit()) return true;
                    return false;
                }
            },
            heiAnJiLi:{
                trigger:{player:'phaseEnd'},
                forced:true,
                filter:function(event,player){
                    return player.countZhiShiWu('guiHuo')>=get.info('guiHuo').intro.max;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('guiHuo',player.countZhiShiWu('guiHuo'));
                    'step 1'
                    player.chooseTarget('對目標角色造成2點法術傷害③',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target, player, 2);
                    });
                    'step 2'
                    if(result.bool){
                        result.targets[0].faShuDamage(2,player);
                    }
                }
            },
            shiShenZhouShu:{
                trigger:{global:'shouDaoGongJiBefore'},
                filter:function(event,player){
                    if(player.countCards('h')==0) return false;
                    if(event.yingZhan==true) return false;
                    if(event.target.side!=player.side) return false;
                    if(event.target==player) return false;
                    if(event.canYingZhan==false) return false;
                    if(!player.isHengZhi()) return false;
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length<2) return false;
                    var count=zhanJi.filter(xingShi=>xingShi=='baoShi').length;
                    if(count==0) return false;
                    return true;
                },
                popup:false,
                async cost(event,trigger,player){
                    event.source=trigger.player;
					event.yingZhan=trigger.yingZhan;
					event.card=trigger.card;
					var name=get.colorName(event.source);
                    var name2=get.colorName(trigger.target);
					var propmt=get.prompt('shiShenZhouShu');
					propmt+=get.translation(get.xiBie(event.card))+'系主動攻擊，';
					propmt+=`${name2}受到${name}的`;
					event.result=await player.yingZhan(propmt)
                    .set('filterCard',function(card,player,event){
						if(get.type(card)=='gongJi'){
                            if(_status.event.canYingZhan==false) return false;//不能應戰設置
                            if(_status.event.canAnMie==false){
                                if(get.xiBie(card)!=get.xiBie(_status.event.card)) return false;
                            }else{
                                if(get.name(card)!='anMie'&&get.xiBie(card)!=get.xiBie(_status.event.card)) return false;
                            }
                        }else if(get.type(card)=='faShu'){
                            return false;//法術牌不能應戰
                        }
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					})
					.set('filterTarget',function(card,player,target){
						if(target==_status.event.source) return false;
						if(target.side==player.side) return false;
						return lib.filter.targetEnabled(card,player,target);
                    })
					.set('card',event.card)
                    .set('source',event.source)
                    .set('yingZhan',true)
				    .set('canYingZhan',trigger.canYingZhan)
				    .set('canShengGuang',trigger.canShengGuang)
				    .set('canAnMie',trigger.canAnMie)
                    .set('prompt2',lib.translate.shiShenZhouShu_info)
                    .set('oncard',function(card,player){
                        _status.event.yingZhan=true;//設置本次攻擊為應戰攻擊
                    })
                    .set('shiShenZhouShu',true)
                    .forResult();
                },
                content:function(){
                    trigger.weiMingZhong();
                },
                group:'shiShenZhouShu_tiaoJian',
                subSkill:{
                    tiaoJian:{
                        trigger:{player:'gongJiBefore'},
                        direct:true,
                        firstDo:true,
                        filter:function(event,player){
                            return event.getParent().shiShenZhouShu==true;
                        },
                        content:function(){
                            'step 0'
                            player.logSkill('shiShenZhouShu');
                            var list=get.zhanJi(player.side);
                            var listx=[];
                            for(var i=0;i<list.length;i++){
                                listx.push([list[i],get.translation(list[i])]);
                            }
                            var next=player.chooseButton([
                                '式神咒束：移除1[寶石]1[水晶]',
                                [listx,'tdnodes'],
                            ]);
                            next.set('forced',true);
                            next.set('selectButton',2);
                            next.set('filterOk',function(){
                                for(var i in ui.selected.buttons){
                                    if(ui.selected.buttons[i].link=='baoShi') return true;
                                }
                            });
                            'step 1'
                            event.dict={baoShi:0,shuiJing:0};
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='baoShi'){
                                    event.dict.baoShi++;
                                }else if(result.links[i]=='shuiJing'){
                                    event.dict.shuiJing++;
                                }
                            }
                            if(event.dict.baoShi>0){
                                player.removeZhanJi('baoShi',event.dict.baoShi);
                            }
                            if(event.dict.shuiJing>0){
                                player.removeZhanJi('shuiJing',event.dict.shuiJing);
                            }
                        }
                    }
                }
            },
            shengMingJieJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('生命結界','hidden');
                        var list=[['1',"目標隊友+1[寶石]並+1[治療]；然後對自己造成X點法術傷害③，X為你的<span class='hong'>【鬼火】</span>數。(若X為3)本次法術傷害③不會造成我方士氣下降"],['2',"<span class='tiaoJian'>(僅【式神形態】下，棄2張命格相同的手牌[展示])</span>[重置]脫離【式神形態】目標隊友棄1張牌"]]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return true;
                        }
                        if(link=='2'){
                            if(!player.isHengZhi()) return false;
                            return player.countTongMingPai()>=2;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['shengMingJieJie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['shengMingJieJie_2']);
                        }
						return next;
					},
                    prompt:function(links,player){
                        if(links[0]=='1'){
                            return '目標隊友+1[寶石]並+1[治療]'
                        }else{
                            return '棄2張命格相同的手牌[展示]，目標隊友棄1張牌'
                        }  
                    },
                    check:function(button){
                        return Math.random();
                    }
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        content:async function(event, trigger, player){
                            await player.removeBiShaShuiJing();
                            await player.addZhiShiWu('guiHuo');
                            var target=event.target;
                            await target.addNengLiang('baoShi');
                            await target.changeZhiLiao(1);
                            var num=player.countZhiShiWu('guiHuo');
                            if(num==3){
                                await player.faShuDamage(num,player)
                                .set('shiQiXiaJiang',false);
                            }else{
                                await player.faShuDamage(num,player);
                            }
                        },
                        ai:{
                            result:{
                                target:function(player,target){
                                    return target.getNengLiangLimit()-target.countNengLiangAll();
                                }
                            }
                        }
                    },
                    2:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        selectCard:2,
                        filterCard:function(card,player){
                            return get.xuanZeTongMingPai(card);
                        },
                        complexCard:true,
                        discard:false,
                        lose:false,
                        content:async function(event, trigger, player){
                            await player.removeBiShaShuiJing();
                            await player.addZhiShiWu('guiHuo');
                            await player.discard(event.cards).set('showCards',true);
                            await player.chongZhi();
                            await event.target.chooseToDiscard(1,true);
                        },
                        check:function(card){
                            return 7-get.value(card);
                        },
                        ai:{
                            result:{
                                target:function(player,target){
                                    return target.countCards('h')-1;
                                }
                            }
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            guiHuo:{
                intro:{
                    name:'鬼火',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //蒼炎魔女
            cangYanFaDian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.cangYanFaDian.filterCard(card));
                },
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                discard:true,
                showCards:true,
                content:function(){
                    'step 0'
                    target.faShuDamage(2,player);
                    'step 1'
                    player.faShuDamage(2,player);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            tianHuoDuanKong:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(player.countZhiShiWu('chongSheng')<1&&!player.isHengZhi()) return false;
                    return player.countCards('h',card=>lib.skill.tianHuoDuanKong.filterCard(card))>1;
                },
                selectCard:2,
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectTarget:1,
                filterTarget:true,
                discard:true,
                showCards:true,
                content:function(){
                    'step 0'
                    if(!player.isHengZhi()){
                        player.removeZhiShiWu('chongSheng');
                    }
                    event.num=3;
                    var shiQi1=get.shiQi(player.side);
                    var shiQi2=get.shiQi(target.side);
                    if(shiQi1<shiQi2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.faShuDamage(event.num,player);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        }
                    }
                }
            },
            moNvZhiNu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.countCards('h')<4;
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    player.chooseDraw(2,true);
                },
                check:function(event,player){
                    var num=player.countCards('h',function(card){
                        if(get.type(card)!='gongJi') return false;
                        var xiBie=get.xiBie(card);
                        if(xiBie=='shui'||xiBie=='an') return false;
                        return true;
                    });
                    if(num>=2){
                        var players=game.filterPlayer(function(current){
                            if(current.side==player.side) return false;
                            let num=current.getHandcardLimit()-current.countCards('h');
                            return num<=2;
                        });
                        return players.length>0;
                    }
                    return false;
                },
                group:['moNvZhiNu_chongZhi','moNvZhiNu_showCards','moNvZhiNu_mod'],
                subSkill:{
                    mod:{
                        mod:{
                            maxHandcard:function(player,num){
                                if(player.isHengZhi()){
                                    return num+player.countZhiShiWu('chongSheng')-2;
                                }
                            },
                            cardXiBie:function(card,player,xiBie){
                                if(get.type(card)!='gongJi'||!player.isHengZhi()) return;
                                if(xiBie=='an' ||xiBie=='shui') return;
                                return 'huo';
                            }
                        },
                    },
                    chongZhi:{
                        trigger:{player:'xingDongBefore'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    },
                    showCards:{
                        trigger:{player:'showCardsBefore'},
                        filter:function(event,player){
                            return event.cards.length>0&&player.isHengZhi()&&event.getParent().name=='discard'&&event.getParent().player==player;
                        },
                        direct:true,
                        content:async function(event, trigger, player){
                            var cards=[];
                            for(var card of trigger.cards){
                                if (get.type(card,player) != 'gongJi' || ['shui', 'an', 'huo'].includes(get.xiBie(card,player))) {
                                    cards.push(card);
                                    continue;
                                }
                                var tempCard=game.createCard(card.name,'huo',get.mingGe(card,player),card.duYou);
                                cards.push(tempCard);
                            }
                            trigger.cards=cards;
                        }
                    }
                }
            },
            tiShenWanOu:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return event.faShu!=true&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCardTarget({
                        filterCard:function(card){
                            return get.type(card)=='faShu';
                        },
                        selectCard:1,
                        filterTarget:function(card,player,target){
                            return target!=player&&target.side==player.side;
                        },
                        prompt:get.prompt('tiShenWanOu'),
                        prompt2:lib.translate.tiShenWanOu_info,
                        ai1:function(card){
                            return 6-get.value(card);
                        },
                        ai2:function(target){
                            if(target.getHandcardLimit()-target.countCards('h')>=1){
                                return 1;
                            }else{
                                return 0;
                            }
                        }
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                    event.target=event.targets[0];
                    'step 2'
                    event.target.draw(1);
                }
            },
            yongShengYinShiJi:{
                forced:true,
                trigger:{player:'changeShiQiEnd'},
                filter:function(event,player){
                    if(event.player!=player) return false;
                    if(event.num>=0) return false;
                    if(event.faShu!=true) return false;
                    return true;
                },
                content:function(){
                    player.addZhiShiWu('chongSheng');
                }
            },
            tongKuLianJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.faShuDamage(1,player);
                    'step 2'
                    player.faShuDamage(1,player);
                    'step 3'
                    if(player.countCards('h')>3){
                        player.chooseToDiscard(true,player.countCards('h')-3);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,1);
                        },
                        player:function(player){
                            if(player.countCards('h')>3) return 1;
                        },
                    }
                }
            },
            moNengFanZhuan:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(player.countCards('h')<2) return false;
                    return player.canBiShaShuiJing()&&player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCardTarget({
                        selectCard:[2,Infinity],
                        filterCard:function(card){
                            return get.type(card)=='faShu'
                        },
                        filterTarget:function(card,player,target){
                            return target.side!=player.side;
                        },
                        prompt:get.prompt('moNengFanZhuan'),
                        prompt2:lib.translate.moNengFanZhuan_info,
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    event.num=event.cards.length-1;
                    player.discard(event.cards).set('showCards',true);
                    event.target=event.targets[0];
                    'step 2'
                    event.target.faShuDamage(event.num,player);
                },
                ai:{
                    shuiJing:true,
                }
            },
            chongSheng:{
                intro:{
                    content:'mark',
                    name:'重生',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',

            },
            //賢者
            zhiHuiFaDian:{
                mod:{
                    maxNengLiang:function(player,num){
                        return num+1;
                    }
                },
                forced:true,
                trigger:{player:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    return event.num>3;
                },
                content:function(){
                    'step 0'
                    player.addNengLiang('baoShi',2);
                    'step 1'
                    if(player.countCards('h')>0){
                        player.chooseToDiscard('h',true);
                    }
                }
            },
            faShuFanTan:{
                trigger:{player:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(event.num!=1) return false;
                    return player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCardTarget({
                        filterCard:function(card){
                            if(ui.selected.cards.length==0) return true;
                            if(get.xiBie(card)==get.xiBie(ui.selected.cards[0])) return true;
                            return false;
                        },
                        selectCard:[2,Infinity],
                        filterTarget:true,
                        complexCard:true,
                        prompt:get.prompt('faShuFanTan'),
                        prompt2:lib.translate.faShuFanTan_info,
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2:function(target){
							var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
						},
                    }).forResult();
                },
                content:function(){
                   'step 0'
                    player.discard(event.cards).set('showCards',true);
                    event.num=event.cards.length;
                    event.target=event.targets[0];
                    'step 2'
                    event.target.faShuDamage(event.num-1,player);
                    'step 3'
                    player.faShuDamage(event.num,player);
                },
                ai:{
                    oneDamage:true,
                }
            },
            moDaoFaDian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return player.countYiXiPai()>1;
                },
                selectTarget:1,
                filterTarget:true,
                selectCard:[2,Infinity],
                filterCard:function(card,player){
                    return get.xuanZeYiXiPai(card);
                },
                complexCard:true,
                discard:false,
                lose:false,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.discard(cards).set('showCards',true);
                    'step 2'
                    target.damageFaShu(cards.length-1,player);
                    'step 3'
                    player.damageFaShu(cards.length-1,player);
                },
                check:function(card){
                    return 8-get.value(card);
                },
                ai:{
                    baoShi:true,
                    order:3.5,
                    result:{
                        target:function(player,target){
                            if(player.countYiXiPai()<3) return 0;
                            return get.damageEffect(target,player.countYiXiPai()-1);
                        },
                    }
                }
            },
            shengJieFaDian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return player.countYiXiPai()>2;
                },
                filterCard:function(card,player){
                    return get.xuanZeYiXiPai(card);
                },
                selectCard:[3,Infinity],
                complexCard:true,
                discard:false,
                lose:false,
                selectTarget:function(){
                    return [1,ui.selected.cards.length-2];
                },
                filterTarget:true,
                filterOk:function(event,player){
                    return ui.selected.targets.length<=ui.selected.cards.length-2;
                },
                contentBefore:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.discard(cards).set('showCards',true);
                },
                content:function(){
                    if(target){
                        target.changeZhiLiao(2);
                    }
                },
                contentAfter:function(){
                    player.faShuDamage(cards.length-1,player);
                },
                check:function(card){
                    return 7-get.value(card);
                },
                ai:{
                    baoShi:true,
                    order:3.3,
                    result:{
                        target:function(player,target){
                            if(player.side!=target.side) return 0;
                            return get.zhiLiaoEffect(target,2);
                        },
                    }
                }
            },
            //魔弓
            moGuanChongJi:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    var cards=player.getGaiPai('chongNengPai');
                    if(cards.length==0) return false;
                    if(event.yingZhan==true) return false;
                    if(event.getParent('xingDong').moGuanChongJi==false) return false;
                    if(event.targets[0].countCards('h')>=event.targets[0].getHandcardLimit()) return false;
                    return true;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('chongNengPai');
                    var result=await player.chooseCardButton(cards,'是否發動【魔貫衝擊】，棄1張火系【充能】,本次攻擊傷害額外+1')
                        .set('filterButton',function(button){
                            return get.xiBie(button.link)=='huo';
                        })
                        .set('ai',function(button){
                            if(get.xiBie(button.link)=='huo') return 1;
                            return 0;
                        }).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'chongNengPai').set('showHiddenCards',true);
                    trigger.changeDamageNum(1);
                    trigger.customArgs.moGuanChongJi=true;
                    trigger.getParent('xingDong').duoChongSheJi=false;
                },
                group:['moGuanChongJi_mingZhong','moGuanChongJi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            if(event.customArgs.moGuanChongJi!=true) return false;
                            var cards=player.getGaiPai('chongNengPai');
                            if(cards.length==0) return false;
                            return true; 
                        },
                        async cost(event,trigger,player){
                            var cards=player.getGaiPai('chongNengPai');
                            var result=await player.chooseCardButton(cards,'是否發動【魔貫衝擊】，移除1張火系【充能】,本次攻擊傷害額外+1')
                                .set('filterButton',function(button){
                                    return get.xiBie(button.link)=='huo';
                                })
                                .set('ai',function(button){
                                    if(get.xiBie(button.link)=='huo') return 1;
                                    return 0;
                                }).forResult();
                            event.result={
                                bool:result.bool,
                                cost_data:result.links,
                            };
                        },
                        content:function(){
                            'step 0'
                            player.discard(event.cost_data,'chongNengPai').set('showHiddenCards',true);
                            trigger.changeDamageNum(1);
                        }
                    },
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return event.customArgs.moGuanChongJi;
                        },
                        direct:true,
                        content:function(){
                            trigger.player.faShuDamage(3,player);
                        }
                    }
                }

            },
            leiGuangSanShe:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(event.getParent('xingDong').leiGuangSanShe==false) return false;
                    var cards=player.getGaiPai('chongNengPai');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.xiBie(cards[i])=='lei') return true;
                    }
                    return false;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('雷光散射：移除1+X個雷系【充能】[展示]','hidden');
                        var cards=player.getGaiPai('chongNengPai');
                        dialog.add(cards);
                        return dialog;
                    },
                    select:[1,Infinity],
                    filter:function(button,player){
                        return get.xiBie(button.link)=='lei';
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:-1,
                            filterTarget:function(card,player,target){
                                return player.side!=target.side;
                            },
                            contentBefore:function(){
                                'step 0'
                                event.links=lib.skill.leiGuangSanShe_backup.links;
                                player.discard(event.links,'chongNengPai').set('showHiddenCards',true);
                                for(var target of targets){
                                    target.storage.leiGuangSanShe=1;
                                }
                                'step 1'
                                event.num=event.links.length-1;
                                if(event.num>0){
                                    player.chooseTarget('對其造成的傷害額外+'+event.num,true,function(card,player,target){
                                        return target.side!=player.side;
                                    }).set('ai',function(target){
                                        return -get.damageEffect(target,2);
                                    });
                                }else{
                                    event.finish();
                                }
                                'step 2'
                                game.log(player,'選擇了',result.targets[0],'傷害額外+'+event.num);
                                result.targets[0].storage.leiGuangSanShe+=event.num;
                            },
                            content:function(){
                                target.faShuDamage(target.storage.leiGuangSanShe,player);

                            },
                            contentAfter:function(){
                                for(var target of targets){
                                    delete target.storage.leiGuangSanShe;
                                }
                            }
                        }
                    },
                    check:function(button){
                        if(get.xiBie(button.link)=='lei') return 1;
                        return 0;
                    }
                },
                ai:{
                    order:function(item,player){
                        var cards=player.getGaiPai('chongNengPai');
                        var num=1.5;
                        for(var i=0;i<cards.length;i++){
                            if(get.xiBie(cards[i])=='lei') num+=0.7;
                        }
                        return num;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            duoChongSheJi:{
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    var cards=player.getGaiPai('chongNengPai');
                    if(cards.length==0) return false;
                    if(event.yingZhan==true) return false;
                    if(event.getParent('xingDong').duoChongSheJi==false) return false;
                    return true;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('chongNengPai');
                    var result=await player.chooseCardButton(cards,'是否發動【多重射擊】')
                        .set('filterButton',function(button){
                            return get.xiBie(button.link)=='feng';
                        })
                        .set('ai',function(button){
                            if(get.xiBie(button.link)=='feng') return 1;
                            return 0;
                        }).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'chongNengPai').set('showHiddenCards',true);
                    trigger.getParent('xingDong').moGuanChongJi=false;
                    var bool=game.hasPlayer(function(current){
                        if(current==trigger.oriTarget) return false;
                        return player.canUse('anMie',current);
                    });
                    if(bool){
                        player.chooseTarget(true,function(card,player,target){
                            if(target==_status.event.trigger_target) return false;
                            return player.canUse('anMie',target);
                        }).set('trigger_target',trigger.oriTarget);
                    }else event.finish();
                    'step 1'
                    if(result.targets){
                        player.useCard({name:'anMie',xiBie:'an'},result.targets[0]).set('duoChongSheJi',true);
                    }
                },
                group:['duoChongSheJi_1'],
                subSkill:{
                    1:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return event.duoChongSheJi==true;
                        },
                        content:function(){
                            trigger.changeDamageNum(-1);
                        }
                    }

                }
            },
            chongNeng:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(player.countCards('h')>4){
                        player.chooseToDiscard(true,player.countCards('h')-4);
                    }
                    'step 2'
                    player.chooseDraw(4,true);
                    'step 3'
                    event.num=result.control;
                    if(event.num==0){
                        event.goto(6);
                    }
                    'step 4'
                    player.chooseCard('h',[1,event.num]).set('prompt',`將至多${event.num}張手牌作為充能`).set('ai',function(card){
                        var player=_status.event.player;
                        if(ui.selected.cards.length+1>=player.countCards('h')) return 0;
                        var xiBie=get.xiBie(card);
                        if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return 1;
                        return 0;
                    });
                    'step 5'
                    if(result.cards){
                        player.addGaiPai('chongNengPai',result.cards);
                    }
                    'step 6'
                    trigger.moGuanChongJi=false;
                    trigger.leiGuangSanShe=false;
                },
                check:function(event,player){
                    if(player.countNengLiang('baoShi')>0) return false;
                    if(player.countCards('h',function(card){
                        var xiBie=get.xiBie(card);
                        if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return true;
                        return false;
                    })<3) return true;
                    return true;
                },
                ai:{
                    shuiJing:true,
                }
            },
            moYan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var choiceList=['目標角色棄1張牌','你摸3張牌[強制]'];
                    player.chooseControl().set('prompt','魔眼').set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')<=1) return '選項二';
                        if(!(player.canGongJi()||player.canFaShu())){
                            return '選項二';
                        }else{
                            return '選項一';
                        }
                    });
                    'step 2'
                    if(result.control=='選項一'){
                        event.goto(3);
                    }else{
                        event.goto(5);
                    }
                    'step 3'
                    player.chooseTarget(true,'目標角色棄1張牌').set('ai',function(target){
                        var player=_status.event.player;
                        if(target==player&&player.countCards('h')==1) return -1;
                        if(target.side==player.side){
                            return 15-(target.getHandcardLimit()-target.countCards('h'));
                        }
                        return target.countCards('h')*0.5;
                    });
                    'step 4'
                    result.targets[0].chooseToDiscard('h',true);
                    event.goto(6);

                    'step 5'
                    player.draw(3);
                    'step 6'
                    if(player.countCards('h')>0){
                        player.chooseCard('h',1,true).set('prompt','將自己1張手牌作為充能').set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return 1;
                            return 0;
                        });
                    }else{
                        event.goto(8);
                    }
                    'step 7'
                    player.addGaiPai('chongNengPai',result.cards);
                    'step 8'
                    player.addNengLiang('shuiJing',1);
                },
                check:function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())){
                        if(player.countCards('h')+3<=player.getHandcardLimit()){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    return true;
                },
                ai:{
                    baoShi:true,
                }
            },
            chongNengPai:{
                intro:{
                    name:'充能',
                    content:'gaiPai',
                    markcount:'gaiPai',
                },
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                trigger:{player:'addGaiPaiAfter'},
                filter:function(event,player){
                    return event.gaiPai=='chongNengPai'&&player.getGaiPai('chongNengPai').length>8;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getGaiPai('chongNengPai');
                    player.chooseCardButton(cards,'捨棄'+(cards.length-8)+'張【充能】',true,cards.length-8);
                    'step 1'
                    if(result.links){
                        player.discard(result.links,'chongNengPai').set('sheQi',true);
                    }
                }
            },
            //魔槍
            anZhiJieFang:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return !player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addTempSkill('anZhiJieFang_shangHai');
                    trigger.qiHeiZhiQiang=false;
                    trigger.chongYing=false;
                    player.storage.anZhiJieFang=false;
                },
                check:function(event,player){
					return player.canGongJi();
				},
                subSkill:{
                    shangHai:{
                        trigger:{player:"gongJiShi"},
                        direct:true,
                        filter:function(event,player){
                            if(player.storage.anZhiJieFang==true) return false;
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            trigger.changeDamageNum(1);
                            player.storage.anZhiJieFang=true;
                        }
                    }
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 5;
                    }
                }
            },
            huanYingXingChen:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.storage.huanYingXingChen=true;
                    player.addTempSkill('huanYingXingChen_shiQiXiaJiang');
                    player.faShuDamage(2,player).set('huanYingXingChen',true);
                    'step 1'
                    player.chongZhi();
                    'step 2'
                    if(player.storage.huanYingXingChen){
                        player.chooseTarget('對目標角色造成2點法術傷害③',true).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,2);
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    result.targets[0].faShuDamage(2,player);
                },
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{player:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').huanYingXingChen==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.huanYingXingChen=false;
                        }
                    },
                },
                check:function(event,player){
                    if(get.shiQi(player.side)<=4) return false;
                    if(game.hasPlayer(function(current){
                        if(current.side==player.side) return false;
                        var num=current.countCards('h');
                        var bool=(num==1||num==2)&&player.canUse('anMie',current)&&player.canBiShaShuiJing()&&current.getGaiPai('_shengDun').length==0;
                        return bool;
                    })) return false;
                    if(player.getHandcardLimit()-player.countCards('h')>=2) return true;
                    return false;
                }
            },
            heiAnShuFu:{
                mod:{
                    cardEnabled:function(card,player){
                        if(get.type(card)=='faShu') return false;
                    }
                }
            },
            anZhiZhangBi:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([1,Infinity],function(card){
                        if(ui.selected.cards.length==0) return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                        var dict={'faShu':0,'lei':0};
                        for(var i=0;i<ui.selected.cards.length;i++){
                            if(get.type(ui.selected.cards[i])=='faShu') dict[get.type(ui.selected.cards[i])]++;
                            if(get.xiBie(ui.selected.cards[i])=='lei') dict[get.xiBie(ui.selected.cards[i])]++;
                        }
                        if(dict['faShu']==dict['lei']){
                            return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                        }else if(dict['faShu']>dict['lei']){
                            return get.type(card)=='faShu'
                        }else if(dict['lei']>dict['faShu']){
                            return get.xiBie(card)=='lei';
                        }
                        
                    })
                    .set('complexCard',true)
                    .set('prompt',get.prompt('anZhiZhangBi'))
                    .set('prompt2',lib.translate.anZhiZhangBi_info)
                    .set('ai',function(card){
                        if(get.type(card)=='faShu') return 10;
                        return 1;
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                }
            },
            chongYing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(event.getParent('xingDong').chongYing==false) return false;
                    return player.countCards('h',card=>lib.skill.chongYing.filterCard(card))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                },
                selectTarget:-1,
                filterTarget:true,
                discard:true,
                showCards:true,
                contentBefore:function(){
                    player.storage.chongYing=0;
                },
                content:function(){
                    'step 0'
                    if(target.countCards('h')>0){
                        if(player.side==target.side){
                            target.chooseToDiscard('h','充盈：是否棄1張牌').set('ai',function(card){
                                if(get.type(card)=='faShu'||get.xiBie(card)=='lei') return 6;
                                return 6-get.value(card);
                            }).set('showCards',true); 
                        }else{
                            target.chooseToDiscard('h','充盈：棄1張牌',true).set('ai',function(card){
                                if(get.type(card)=='faShu'||get.xiBie(card)=='lei') return 0;
                                return 6-get.value(card);
                            }).set('showCards',true);
                        }
                    }
                    'step 1'
                    if(result.bool){
                        if((get.type(result.cards[0])=='faShu'||get.xiBie(result.cards[0])=='lei')&&target!=player){
                            player.storage.chongYing+=1;
                        }
                    }
                },
                contentAfter:function(){
                    player.addTempSkill('chongYing_shangHai');
                    player.addGongJi();
                },
                subSkill:{
                    shangHai:{
                        trigger:{player:"gongJiBefore"},
                        direct:true,
                        filter:function(event,player){
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            trigger.changeDamageNum(player.storage.chongYing);
                            player.removeSkill('chongYing_shangHai');
                        }   
                    }
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
					order:4,
					result:{
						player:2,
					},
				},
            },
            qiHeiZhiQiang:{
                trigger:{source:"gongJiMingZhong"},
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(event.getParent('xingDong').qiHeiZhiQiang==false) return false;
                    if(!player.canBiShaShuiJing()) return false;
                    if(event.yingZhan==true) return false;
                    return event.target.countCards('h')==1||event.target.countCards('h')==2;
                },
                async cost(event,trigger,player){
                    var list=[];
                    for(var i=0;i<player.countNengLiang('baoShi');i++){
                        list.push(['baoShi',get.translation('baoShi')]);
                    }
                    for(var i=0;i<player.countNengLiang('shuiJing');i++){
                        list.push(['shuiJing',get.translation('shuiJing')]);
                    }
                    var result=await player.chooseButton(['本次攻擊傷害額外+(X+2)',[list,'tdnodes']])
                    .set('selectButton',[1,Infinity]).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    var num=event.cost_data.length;
                    trigger.changeDamageNum(num+2);
                    event.dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<event.cost_data.length;i++){
                        event.dict[event.cost_data[i]]++;
                    }
                    if(event.dict.baoShi>0) player.removeNengLiang('baoShi',event.dict.baoShi);
                    if(event.dict.shuiJing>0) player.removeNengLiang('shuiJing',event.dict.shuiJing);
                },
                ai:{
                    shuiJing:true,
                }
            },
            //靈符師
            lingFu_leiMing:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.lingFu_leiMing.filterCard(card))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='lei';
                },
                selectTarget:2,
                filterTarget:true,
                discard:true,
                showCards:true,
                contentBefore:function(){
                    'step 0'
                    player.storage.lingFu_leiMing=1;
                    'step 1'
                    event.trigger('lingFu');
                    'step 2'
                    event.trigger('lingFu_leiMing');
                },
                content:function(){
                    target.faShuDamage(player.storage.lingFu_leiMing,player);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:function(item,player){
                        var num=2.5;
                        num+=player.countCards('h',card=>get.xiBie(card)=='lei')*0.4;
                        if(player.countCards('h')>2) num+=0.3;
                        return num;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,1);
                        },
                    }
                }
            },
            lingFu_fengXing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.lingFu_fengXing.filterCard(card))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='feng';
                },
                selectTarget:2,
                filterTarget:true,
                discard:true,
                showCards:true,
                contentBefore:function(){
                    event.trigger('lingFu');
                },
                content:function(){
                    target.chooseToDiscard('h',true);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:function(item,player){
                        var num=2.5;
                        num+=player.countCards('h',card=>get.xiBie(card)=='feng')*0.4;
                        if(player.countCards('h')>3) num+=0.3;
                        return num;
                    },
                    result:{
                        target:1,
                    }
                }
            },
            nianZhou:{
                trigger:{player:'lingFu'},
                filter:function(event,player){
                    return player.countCards('h')>0&&player.getGaiPai('yaoLi').length<2;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h')
                        .set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            if(xiBie=='huo') return 2;
                            else return 1;
                        })
                        .set('prompt',get.prompt('nianZhou'))
                        .set('prompt2',lib.translate.nianZhou_info)
                        .forResult();
                },
                content:function(){
                    player.addGaiPai('yaoLi',event.cards);
                }
            },
            baiGuiYeXing:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.getGaiPai('yaoLi').length>0;
                },
                async cost(event,trigger,player){
                    var result=await player.chooseCardButton(player.getGaiPai('yaoLi'),'是否發動【百鬼夜行】，移除1張【妖力】,對目標角色造成1點法術傷害③').forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:async function(event,trigger,player){
                    var card=event.cost_data[0];
                    await player.discard(card,'yaoLi');

                    player.storage.baiGuiYeXing=1;
                    await event.trigger('baiGuiYeXing');

                    var bool=await player.chooseCardButton([card],`是否展示火系【妖力】,改為指定2名角色，對除他們以外的其他所有角色各造成${player.storage.baiGuiYeXing}點法術傷害③`,1).set('filterButton',function(button){
                        return get.xiBie(button.link)=='huo';
                    }).set('ai',function(){
                        return 1;
                    }).forResultBool();
                    if(bool){
                        await player.showHiddenCards(card);
                        var targets=await player.chooseTarget('選取不受傷害的2名角色',2,true).set('ai',function(target){
                            var player=_status.event.player;
                            var num=_status.event.num;
                            return -get.damageEffect2(target,player,num);
                        }).set('num',player.storage.baiGuiYeXing).forResultTargets();
                        targets=game.filterPlayer(function(current){
                            return !targets.includes(current);
                        }).sortBySeat(player);
                    }else{
                        var targets=await  player.chooseTarget(`對目標角色造成${player.storage.baiGuiYeXing}點法術傷害③`,1,true).set('ai',function(target){
                            var player=_status.event.player;
                            var num=_status.event.num;
                            return get.damageEffect2(target,player,num);
                        }).set('num',player.storage.baiGuiYeXing).forResultTargets();
                    }
                    for(var target of targets){
                        target.faShuDamage(player.storage.baiGuiYeXing,player);
                    }
                }
            },
            lingLiBengJie:{
                trigger:{player:['baiGuiYeXing','lingFu_leiMing']},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.storage.baiGuiYeXing++;
                    player.storage.lingFu_leiMing++;
                },
                ai:{
                    shuiJing:true,
                }
            },
            yaoLi:{
                intro:{
                    name:'妖力',
                    content:'gaiPai',
                    markcount:'gaiPai',
                },
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            //吟遊詩人
            chenLunXieZouQu:{
                trigger:{global:'damageAfter'},//該時機不會因為治療而被抵消
                priority:-1,
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    if(event.faShu!=true) return false;
                    if(player.countCards('h')<2) return false;
                    if(!(event.player.side!=player.side&&event.source.side==player.side)) return false; 
                    return player.storage.chenLunXieZouQu.length>=2;
                },
                usable:1,
                async cost(event,trigger,player){
                    if(trigger.getParent().name=='yongHengYueZhang_jiAngKuangXiangQu'){
                        await event.trigger('yongHengYueZhang');
                        trigger.getParent().bool=true;
                        if(player.isHengZhi()) return event.result={bool:false};
                    }
                    event.result=await player.chooseCard('h',2)
                    .set('complexCard',true)
                    .set('filterCard',function(card){return get.xuanZeTongXiPai(card)})
                    .set('prompt',get.prompt('chenLunXieZouQu'))
                    .set('prompt2',lib.translate.chenLunXieZouQu_info)
                    .set('ai',function(card){return 6-get.value(card)})
                    .forResult();
                },
                content:async function(event,trigger,player){
                    await player.discard(event.cards).set('showCards',true);
                    await player.addZhiShiWu('lingGan');
                    var flag=false;
                    for(var i=0;i<event.cards.length;i++){
                        if(get.type(event.cards[i])=='faShu'){
                            flag=true;
                            break;
                        }
                    }
                    if(flag){
                        var targets=await player.chooseTarget('對目標對手造成1點法術傷害',true,function(card,player,target){
                            return player.side!=target.side;
                        })
                        .set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
                        })
                        .forResultTargets();
                        await targets[0].faShuDamage(1,player);
                    }
                },
                group:['chenLunXieZouQu_chongZhi','chenLunXieZouQu_jiShu'],
                subSkill:{
                    chongZhi:{
                        trigger:{global:'phaseBefore'},
                        direct:true,
                        priority:1,
                        content:function(){
                            player.storage.chenLunXieZouQu=[];
                        }
                    },
                    jiShu:{
                        trigger:{global:'zaoChengShangHai'},
                        filter:function(event,player){
                            if(event.faShu!=true) return false;
                            if(player.storage.chenLunXieZouQu.includes(event.player)) return false;
                            return event.player.side!=player.side&&event.source.side==player.side;
                        },
                        direct:true,
                        content:function(){
                            player.storage.chenLunXieZouQu.add(trigger.player);
                        }
                    }
                }
            },
            buXieHeXian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('lingGan')>1;
                },
                chooseButton:{
                    check:function (button) {
                        var player = _status.event.player;
                        if(typeof button.link=="number"){
                            var num=player.getHandcardLimit()-player.countCards('h');
                            if(num>=button.link-1) return button.link;
                        }else if(typeof button.link=="string"){
                            var num=player.getHandcardLimit()-player.countCards('h');
                            if(num>=2&&button.link=='摸'){
                                return 1;
                            }
                            if(num<2&&button.link=='棄'){
                                return 1;
                            }
                        }
                        return 0.5;
                    },

                    dialog:function(event,player){
						var dialog=ui.create.dialog(`不諧和絃：移除X點<span class='hong'>【靈感】</span>,摸/棄(X-1)張牌`,'hidden');
                        var list=[];
                        for(var i=2;i<=player.countZhiShiWu('lingGan');i++){
                            list.push(i);
                        }
						dialog.add([list,'tdnodes']);
                        dialog.add([['摸','棄'],'tdnodes'])
						return dialog;
					},
                    filter:function(button,player){
                        if (ui.selected.buttons.length>0) return typeof ui.selected.buttons[0].link != typeof button.link;
                        else return true;
                    },
                    select:2,
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
                            selectTarget:1,
                            filterTarget:true,
                            selectCard: 0,
                            filterCard: true,
                            contentBefore:async function(event,trigger,player){
                                var links=lib.skill.buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        var num=links[i];
                                        break
                                    }
                                }
                                if(player.isHengZhi()) await player.chongZhi();
                                await player.removeZhiShiWu('lingGan',num);
                            },
							content:async function(event,trigger,player){
                                var links=lib.skill.buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        var num=links[i]-1;
                                    }else if(typeof links[i]=='string'){
                                        var action=links[i];
                                    }
                                }
								if(action=='摸'){
                                    await player.draw(num);
                                    await event.target.draw(num);
                                }else{
                                    await player.chooseToDiscard('h',num,true);
                                    await event.target.chooseToDiscard('h',num,true); 
                                }
							},
                            ai:{
                                result:{
                                    target:function(player,target){

                                        var num=player.getHandcardLimit()-player.countCards('h');
                                        if(num>=2) return -target.countCards('h');
                                        else return target.countCards('h');
                                    }
                                }
                            }
						}
					},
                    prompt:function(links,player){
                        for(var i=0;i<links.length;i++){
                            if(typeof links[i]=='number'){
                                var num=links[i]-1;
                            }else if(typeof links[i]=='string'){
                                var action=links[i];
                            }
                        }
                        if(action=='摸'){
                            return `你和目標角色各摸${num}張牌[強制]`
                        }else{
                            return `你和目標角色各棄${num}張牌[強制]`
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var num=3+player.countZhiShiWu('lingGan')*0.5;
                        return num;
                    },
                    result:{
                        player:1,
                    }
                }
                
            },
            jinJiShiPian:{
                trigger:{global:'yongHengYueZhang'},
                forced:true,
                content:async function(event,trigger,player){
                    var info=get.info('lingGan');
                    if(player.countZhiShiWu('lingGan')<info.intro.max){
                        await player.addZhiShiWu('lingGan');
                        if(player.storage.yongHengYueZhang_target){
                            await player.storage.yongHengYueZhang_target.removeZhiShiWu('yongHengYueZhang');
                            delete player.storage.yongHengYueZhang_target;
                        }
                    }else{
                        await player.faShuDamage(3,player);
                        await player.hengZhi();
                    }
                }
            },
            xiWangFuGeQu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.chooseDraw(1,true);

                    var players=game.filterPlayer((function(current){
                        return current.side==player.side&&current.hasZhiShiWu('yongHengYueZhang');
                    }));

                    if(players.length>0){
                        var targets=await player.chooseTarget('將【永恆樂章】轉移給我方另一名目標角色',true,function(card,player,target){
                            var targetx=_status.event.targetx;
                            return target.side==player.side&&targetx!=target;
                        }).set('targetx',players[0]).forResultTargets();
                    }else{
                        var targets=await player.chooseTarget('將【永恆樂章】放置於目標隊友面前',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        }).forResultTargets();
                    }

                    if(players.length>0) await players[0].removeZhiShiWu('yongHengYueZhang');
                    var target=targets[0];
                    if(!target.hasSkill('yongHengYueZhang')){
                        await target.addSkill('yongHengYueZhang');
                    }

                    await target.addZhiShiWu('yongHengYueZhang');
                    player.storage.yongHengYueZhang_target=target;
                    target.storage.yongHengYueZhang_player=player;
                    
                    if(players.length>0){
                        if(player.countCards('h')>0){
                            await player.chooseToDiscard(1,true);
                        }
                        var list=['zhiLiao','lingGan'];
                        var control=await player.chooseControl(list).set('prompt',`選擇+1[治療]或<span class='hong'>【靈感】</span>`).forResultControl();
                        if(control=='zhiLiao') await player.changeZhiLiao();
                        else if(control=='lingGan') await player.addZhiShiWu('lingGan');
                    }
                },
                check:function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    return player.hasZhiShiWu('lingGan')<3;
                },
                ai:{
                    shuiJing:true,
                }
            },
            lingGan:{
                intro:{
                    name:'靈感',
                    markcount:'mark',
                    max:3,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png'
            },
            yongHengYueZhangX:{},
            yongHengYueZhang:{
                intro:{
                    name:'(專)永恆樂章',
                    content:"[響應]激昂狂想曲：<span class='tiaoJian'>(回合開始時若你擁有【永恆樂章】)</span>選擇以下一項執行：<br>·吟遊詩人對2名目標對手各造成1點法術傷害③。 <br>·你棄2張牌。<br>[響應]勝利交響詩：<span class='tiaoJian'>(回合結束時若你擁有【永恆樂章】)</span>選擇以下一項執行<br>·將我方【戰績區】的1個星石提煉成為你的能量。<br>·為我方【戰績區】+1[寶石]，你+1[治療]。",
                    nocount:true,
                },
                onremove:'storage',
                group:['yongHengYueZhang_jiAngKuangXiangQu','yongHengYueZhang_shengLiJiaoXiangShi'],
                markimage:'image/card/zhuanShu/yongHengYueZhang.png',
                subSkill:{
                    jiAngKuangXiangQu:{
                        trigger:{player:'phaseBegin'},
                        filter:function(event,player){
                            return player.hasZhiShiWu('yongHengYueZhang');
                        },
                        content:function(){
                            'step 0'
                            var choiceList=['吟遊詩人對2名目標對手各造成1點法術傷害③','你棄2張牌'];
                            player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                                var player=_status.event.player;
                                if(player.storage.yongHengYueZhang_player.countCards('h')>2) return '選項一';
                                else return '選項二';
                            });
                            'step 1'
                            if(result.control=='選項一'){
                                player.storage.yongHengYueZhang_player.chooseTarget(2,'對2名目標對手各造成1點法術傷害③',true,function(card,player,target){
                                    return target.side!=player.side;
                                });
                            }else{
                                player.chooseToDiscard(2,true);
                                event.goto(4);
                            }
                            'step 2'
                            event.targets=result.targets.sortBySeat(player);
                            event.targets[0].faShuDamage(1,player.storage.yongHengYueZhang_player);
                            'step 3'
                            event.targets[1].faShuDamage(1,player.storage.yongHengYueZhang_player);
                            'step 4'
                            if(!event.bool) event.trigger('yongHengYueZhang');
                        },
                        check:function(event,player){
                            var bool1=player.storage.yongHengYueZhang_player.countCards('h')>2;
                            var bool2=player.countCards('h')>=5;
                            return bool1||bool2;
                        }
                    },
                    shengLiJiaoXiangShi:{
                        trigger:{player:'phaseEnd'},
                        filter:function(event,player){
                            return player.hasZhiShiWu('yongHengYueZhang');
                        },
                        content:async function(event,trigger,player){
                            var zhanJi=get.zhanJi(player.side);
                            if(zhanJi.length>0&&player.countEmptyNengLiang()>0){
                                var list=[];
                                for(var i=0;i<zhanJi.length;i++){
                                    list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                }
                                var result=await player.chooseButton([
                                    '提煉我方【戰績區】的1個星石或者為我方【戰績區】+1[寶石]、你+1[治療]',
                                    [list,'tdnodes'],
                                ]).set('selectButton',[1,1]).set('ai',function(button){
                                    var player=_status.event.player;
                                    var zhanJi=get.zhanJi(player.side);
                                    if(zhanJi.length>3){
                                        if(player.hasSkillTag('baoShi')&&!player.hasSkillTag('shuiJing')){
                                            if(button.link=='baoShi') return 5;
                                            else return -1;
                                        }else if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
                                            if(button.link=='shuiJing') return 5;
                                            else return 2;
                                        }else if(player.hasSkillTag('shuiJing')&&player.hasSkillTag('baoShi')){
                                            return 2;
                                        }
                                    }else{
                                        return -1;
                                    }
                                }).forResult();
                            }else var result={bool:false};

                            if(result.bool){
                                await player.changeZhanJi(result.links[0],-1);
                                await player.addNengLiang(result.links[0],1);
                            }else{
                                await player.addZhanJi('baoShi');
                                await player.changeZhiLiao(1);
                            }
                            await event.trigger('yongHengYueZhang');
                        }
                    }
                }
            },
            //勇者
            yongZheZhiXin:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    player.addNengLiang('shuiJing',2);
                }
            },
            nuHou:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('nuQi')) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('nuQi');
                    trigger.changeDamageNum(2);
                    trigger.customArgs.nuHou=true;
                    'step 1'
                    player.chooseDraw();
                },
                group:"nuHou_weiMingZhong",
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        priority:0.1,
                        filter:function(event,player){
                            return event.customArgs.nuHou;
                        },
                        direct:true,
                        content:function(){
                            player.addZhiShiWu('zhiXing');
                        }
                    }
                }
            },
            jinPiLiJin:{
                trigger:{player:'jinDuanZhiLi'},
                forced:true,
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addGongJi();
                },
                group:'jinPiLiJin_chongZhi',
                subSkill:{
                    chongZhi:{
                        trigger:{player:'xingDongBegin'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.faShuDamage(3,player);
                        },
                    }
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 4;
                    }
                }
            },
            mingJingZhiShui:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(player.countZhiShiWu('zhiXing')<4) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.removeZhiShiWu('zhiXing',4);
                    trigger.wuFaYingZhan();
                    trigger.customArgs.mingJingZhiShui=true;
                },
                group:'mingJingZhiShui_jieShu',
                subSkill:{
                    jieShu:{
                        trigger:{player:'gongJiEnd'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.mingJingZhiShui;
                        },
                        content:function(){
                           player.addNengLiang('shuiJing');
                        },
                    }
                }
            },
            tiaoXin:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool=game.hasPlayer(function(current){
                        return player.side!=current.side&&current.hasZhiShiWu('tiaoXinX');
                    });
                    return player.hasZhiShiWu('nuQi')&&!bool;
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return player.side!=target.side;
                },
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('nuQi');
                    await player.addZhiShiWu('zhiXing');
                    var target=event.target;
                    if(!target.hasSkill('tiaoXinX')){
                        target.addSkill('tiaoXinX');
                    }
                    await target.addZhiShiWu('tiaoXinX');
                    target.storage.tiaoXinX_player=player;
                },
                ai:{
                    order:3.8,
                    result:{
                        target:-1,
                    }
                }
            },
            tiaoXinX:{
                intro:{
                    name:"(專)[法術]挑釁",
                    content:'你在下個行動階段必須且只能主動攻擊勇者，否則你跳過該行動階段，觸發後移除此牌。',
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/tiaoXin.png',

                filterx:function(event,player,num){
                    //無可啟動技，跳過啟動前後挑釁
                    if(event.name=='xingDong'&&num==1){
						if(event.canQiDong==false) return false;
					}
					return player.hasZhiShiWu('tiaoXinX');
				},
                filter:function(event,player){
                    return lib.skill.tiaoXinX.filterx(event,player);
                },
                enable:'wuFaXingDong',
				type:'wuFaXingDong',
                content:function(){
                    player.removeZhiShiWu('tiaoXinX')
                    var evt=_status.event.getParent('xingDong');
					if(evt&&evt.name=='xingDong'){
						evt.skipped=true;
					}
                    player.removeSkill('tiaoXinX');
                },
                group:['tiaoXinX_qiDongQian','tiaoXinX_qiDongHou','tiaoXinX_sheZhi','tiaoXinX_yiChu','tiaoXinX_wuFaXingDong'],
                subSkill:{
                    qiDongQian:{
						trigger:{player:'qiDong'},
						priority:2,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player,1);
						},
                        direct:true,
                        content:async function(event,trigger,player){
                            var list=['繼續回合','跳過回合'];
                            var control=await player.chooseControl(list).set('prompt','啟動前：你被挑釁了').forResultControl();
                            if(control=='跳過回合'){
                                await player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    qiDongHou:{
						trigger:{player:'qiDong'},
                        priority:-1,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player,1);
						},
                        direct:true,
                        content:async function(event,trigger,player){
                            var list=['繼續回合','跳過回合'];
                            var control=await player.chooseControl(list).set('prompt','啟動後：你被挑釁了').forResultControl();
                            if(control=='跳過回合'){
                                await player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    sheZhi:{
                        trigger:{player:'xingDongBegin'},
						lastDo:true,
                        direct:true,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        content:function(){
                            trigger.canTeShu=false;
                            player.addTempSkill('tiaoXinX_xianZhi');
                        },
                    },
                    yiChu:{
                        trigger:{player:'xingDongAfter'},
                        filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        direct:true,
                        content:async function(event,trigger,player){
                            await player.removeZhiShiWu('tiaoXinX')
                            player.removeSkill('tiaoXinX');
                        },
                    },
                    xianZhi:{
                        init:function(player,skill){
                            player.addSkillBlocker(skill);
                        },
                        onremove:function(player,skill){
                            player.removeSkillBlocker(skill);
                        },
                        skillBlocker:function(skill,player){
                            var info=get.info(skill);
                            return info.type=='faShu'||info.type=='teShu';
                        },
                        mod:{
                            playerEnabled:function(card,player,target){
                                if(!player.hasZhiShiWu('tiaoXinX')) return;
                                if(_status.event.yingZhan==true) return;
                                if(player.storage.tiaoXinX_player!=target) return false;
                            },
                            cardEnabled:function(card,player){
                                if(!player.hasZhiShiWu('tiaoXinX')) return;
                                if(_status.event.yingZhan==true) return;
                                if(get.type(card)=='faShu') return false;
                            },
                        }
                    },
                    wuFaXingDong:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='tiaoXinX_wuFaXingDong') return false;//需要排除自身，防止嵌套
                            return get.info('_wuFaXingDong').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                }, 
            },
            jinDuanZhiLi:{
                group:['jinDuanZhiLi_mingZhong','jinDuanZhiLi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        prompt2:"棄掉你所有手牌[展示]，其中每有1張法術牌，你+1<span class='hong'>【怒氣】</span>；其中每有1張火系牌，本次攻擊傷害額外+1，並對自己造成等同於火系牌數量的法術傷害③",
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            if(!player.canBiShaShuiJing()) return false;
                            return event.yingZhan!=true;
                        },
                        content:async function(event,trigger,player){
                            await player.removeBiShaShuiJing();
                            var cards=player.getCards('h');
                            await player.discard(cards).set('showCards',true);
                            var num=0;
                            var nuQi=0;
                            for(var i=0;i<cards.length;i++){
                                if(get.type(cards[i])=='faShu'){
                                    nuQi++;
                                }
                                if(get.xiBie(cards[i])=='huo'){
                                    num++;
                                }
                            };
                            if(nuQi>0){
                                await player.addZhiShiWu('nuQi',nuQi);
                            }
                            if(num>0){
                                trigger.changeDamageNum(num);
                                await player.faShuDamage(num,player);
                            }
                            await event.trigger('jinDuanZhiLi');
                        },
                        check:function(event,player){
                            var num=player.countCards('h',card=>get.xiBie(card)=='huo');
                            return num>0;
                        }
                    },
                    weiMingZhong:{
                        prompt2:"棄掉你所有手牌[展示]，其中每有1張法術牌，你+1<span class='hong'>【怒氣】</span>；其中每有1張水系牌，你+1<span class='lan'>【知性】</span>",
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            if(!player.canBiShaShuiJing()) return false;
                            if(event.yingZhan==true) return false;
                            return true;
                        },
                        content:async function(event,trigger,player){
                            await player.removeBiShaShuiJing();
                            var cards=player.getCards('h');
                            await player.discard(cards).set('showCards',true);
                            var nuQi=0;
                            var zhiXing=0;
                            for(var i=0;i<cards.length;i++){
                                if(get.type(cards[i])=='faShu'){
                                    nuQi++;
                                }
                                if(get.xiBie(cards[i])=='shui'){
                                    zhiXing++;
                                }
                            };
                            if(nuQi>0) await player.addZhiShiWu('nuQi',nuQi);
                            if(zhiXing>0) await player.addZhiShiWu('zhiXing',zhiXing);
                            await event.trigger('jinDuanZhiLi');
                        },
                        check:function(event,player){
                            var nuQi=player.isZhiShiWuMax('nuQi');
                            var zhiXing=player.isZhiShiWuMax('zhiXing');
                            var num1=player.countCards('h',card=>get.type(card)=='faShu');
                            var num2=player.countCards('h',card=>get.xiBie(card)=='shui');
                            return (num1>0&&num2>0)&&(!(nuQi&&zhiXing));
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                }
            },
            siDou:{
                trigger:{player:'chengShouShangHai'},
                lastDo:true,
                filter:function(event,player){
                    return event.faShu&&player.canBiShaBaoShi();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await player.addZhiShiWu('nuQi',3);
                    trigger.shiQiMax=-1;
                },
                check:function(event,player){
                    if(event.num+player.countCards('h')>player.getHandcardLimit()){
                        return true;
                    }else{
                        return player.countZhiShiWu('nuQi')<=2;
                    }
                },
                ai:{
                    baoShi:true
                }
            },
            nuQi:{
                intro:{
                    max:4,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            zhiXing:{
                intro:{
                    max:4,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            //格鬥家
            nianQiLiChang:{
                trigger:{player:"zaoChengShangHai"},
                filter:function(event,player){
                    return event.num>4;
                },
                forced:true,
                content:function(){
                    trigger.zaoChengShangHaiMax=4
                }
            },
            xuLiYiji:{
                trigger:{player:"gongJiBefore"},
                filter:function(event,player){
                    if(!player.hasSkill('douQi')) return false;
                    if(player.countZhiShiWu('douQi')>=lib.skill.douQi.intro.max) return false;
                    if(event.customArgs.qiJueBengJi) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.addZhiShiWu('douQi');
                    trigger.changeDamageNum(1);
                    trigger.customArgs.xuLiYiji=true;
                },
                check:function(event,player){
                    if(!player.isHengZhi()) return true;
                    if(event.target.countCards('h')>3) return false;
                    if(player.countZhiShiWu('douQi')>=3) return false;
                    var num=Math.random();
                    return num>0.5;
                },
                group:'xuLiYiji_weiMingZhong',
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.xuLiYiji;
                        },
                        content:function(){
                            player.faShuDamage(player.countZhiShiWu('douQi'),player);
                        }
                    },
                    
                }
            },
            nianDan:{
                trigger:{player:['faShuEnd']},
                filter:function(event,player){
                    if(!player.hasSkill('douQi')) return false;
                    if(player.countZhiShiWu('douQi')>=lib.skill.douQi.intro.max) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.addZhiShiWu('douQi');
                    'step 1'
                    player.chooseTarget('對目標對手造成1點法術傷害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    event.target=result.targets[0];
                    if(event.target.zhiLiao==0){
                        event.flag=true;
                    }
                    'step 3'
                    event.target.faShuDamage(1,player);
                    'step 4'
                    if(event.flag){
                        player.faShuDamage(player.countZhiShiWu('douQi'),player);
                    }
                    
                },
                check:function(event,player){
                    return player.countZhiShiWu('douQi')+player.countCards('h')<=player.getHandcardLimit();
                },
            },
            baiShiHuanLongQuan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.countZhiShiWu('douQi')>=3;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('douQi',3);
                    'step 1'
                    if(!player.isHengZhi()) player.storage.baiShiHuanLongQuan=[];
                    player.hengZhi();
                },
                group:['baiShiHuanLongQuan_zhuDong','baiShiHuanLongQuan_yingZhan','baiShiHuanLongQuan_faShuAndTeShu','baiShiHuanLongQuan_gongJi','baiShiHuanLongQuan_xuLiYiji'],
                mod:{
                    aiOrder:function(player,card,num){
                        if(get.type(card)=='gongJi'&&player.isHengZhi()) return num+1;
                    }
                },
                subSkill:{
                    zhuDong:{
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan!=true;
                        },
                        priority:-1,
                        direct:true,
                        content:function(){
                            trigger.changeDamageNum(2);
                        }
                    },
                    yingZhan:{
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan==true;
                        },
                        priority:-1,
                        direct:true,
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    faShuAndTeShu:{
                        trigger:{player:['faShuBefore','teShuBefore']},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return true;
                        }, 
                        direct:true,
                        content:function(){
                            player.chongZhi();
                            player.storage.baiShiHuanLongQuan=[];
                        }
                    },
                    gongJi:{
                        trigger:{player:'gongJiBefore'},
                        direct:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            if(player.storage.baiShiHuanLongQuan.length==0){
                                player.storage.baiShiHuanLongQuan.push(trigger.targets[0]);
                            }else{
                                if(!player.storage.baiShiHuanLongQuan.includes(trigger.targets[0])){
                                    player.chongZhi();
                                    player.storage.baiShiHuanLongQuan=[];
                                }
                            }
                        }
                    },
                    xuLiYiji:{
                        trigger:{player:"xuLiYijiBegin"},
                        direct:true,
                        content:function(){
                            player.chongZhi();
                            player.storage.baiShiHuanLongQuan=[];
                        }
                    }
                },
                check:function(event,player){
                    return player.canGongJi();
                }


            },
            qiJueBengJi:{
                trigger:{player:"gongJiBefore"},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('douQi')) return false;
                    if(event.customArgs.xuLiYiji) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.qiJueBengJi=true;
                    player.removeZhiShiWu('douQi');
                    trigger.wuFaYingZhan();
                    'step 1'
                    //player.faShuDamage(player.countZhiShiWu('douQi'),player);
                },
                group:'qiJueBengJi_gongJiJieShu',
                subSkill:{
                    gongJiJieShu:{
                        trigger:{player:'gongJiAfter'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.qiJueBengJi;
                        },
                        content:function(){
                            player.faShuDamage(player.countZhiShiWu('douQi'),player);
                        }
                    },
                },
                check:function(event,player){
                    if(event.canYingZhan==false) return false;
                    if(player.countZhiShiWu('douQi')-1+player.countCards('h')>=player.getHandcardLimit()) return false;
                    else return true;
                }
            },
            douShenTianQu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(player.countCards('h')>3){
                        player.chooseToDiscard(true,'h',player.countCards('h')-3);
                    };
                    'step 2'
                    player.changeZhiLiao(2);
                },
                ai:{
                    shuiJing:true,
                },
                check:function(event,player){
                    if(player.zhiLiao>=player.getZhiLiaoLimit()) return false;
                    if(player.countCards('h')<=4) return false;
                    return player.canXingDong();
                }
            },
            douQi:{
                intro:{
                    content:'mark',
                    max:6,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //聖弓
            tianZhiGong:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    'step 0'
                    player.addZhiShiWu('shengHuangHuiGuangPaoX');
                    'step 1'
                    player.addNengLiang('shuiJing',2);
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                },
                group:['tianZhiGong_zhuDongGongJi','tianZhiGong_zhuDongGongJiMingZhong'],
                subSkill:{
                    zhuDongGongJi:{
                        trigger:{player:'gongJiShi'},
                        forced:true,
                        filter:function(event,player){
                            return event.yingZhan!=true&&get.mingGe(event.card)!='sheng';
                        },
                        content:function(){
                            trigger.changeDamageNum(-1);
                        }
                    },
                    zhuDongGongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return event.yingZhan!=true&&get.mingGe(event.card)=='sheng';
                        },
                        content:function(){
                            player.addZhiShiWu('xinYang')
                        }
                    }
                }
            },
            shengXieJuBao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countTongXiPai('gongJi')>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    if(get.type(card)!='gongJi') return false;
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                discard:true,
                showCards:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return player.canUseXingBei('anMie',target);
                },
                content:function(){
                    var xiBie=get.xiBie(cards[0],player);
                    if(!xiBie) xiBie=get.xiBie(cards[1],player);
                    var name;
                    switch(xiBie){
                        case 'shui':name='shuiLianZhan';break;
                        case 'huo':name='huoYanZhan';break;
                        case 'feng':name='fengShenZhan';break;
                        case 'lei':name='leiGuangZhan';break;
                        case 'di':name='diLieZhan';break;
                        case 'an':name='anMie';break;
                    }
                    player.useCard({name:name,xiBie:xiBie,mingGe:'sheng',shengXieJuBao:true},target);
                },
                check(card) {
					return 4- get.value(card);
				},
                group:'shengXieJuBao_gongJiWeiMingZhong',
                subSkill:{
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return player.zhiLiao>0&&event.card.shengXieJuBao;
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            if(player.zhiLiao>1){
                                var list=[1,2,'cancel2'];
                            }else{
                                var list=[1,'cancel2'];
                            }
                            var next=player.chooseControl(list);
                            next.set('prompt','是否移除X點[治療]，目標隊友棄X張牌');
                            next.set('ai',function(){
                                return 'cancel2';
                            });
                            'step 1'
                            if(result.control=='cancel2'){
                                event.finish();
                            }else{
                                event.num=result.control;
                                player.changeZhiLiao(-event.num);
                                player.chooseTarget(true,function(card,player,target){
                                    return target!=player&&target.side==player.side;
                                });
                            }
                            'step 2'
                            result.targets[0].chooseToDiscard('h',true,event.num);
                        }
                    }
                },
                ai:{
                    order:3.4,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            shengHuangJiangLin:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.zhiLiao>=2||player.countZhiShiWu('xinYang')>=2;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog(`聖煌降臨：移除2點[治療]或2點<span class='hong'>【信仰】</span>`,'hidden');
                        var list=[];
                        if(player.zhiLiao>=2){
                            list.push('治療');
                        }
                        if(player.countZhiShiWu('xinYang')>=2){
                            list.push('信仰');
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
					},
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
							content:function(){
                                'step 0'
								event.links=lib.skill.shengHuangJiangLin_backup.links;
                                if(event.links[0]=='治療'){
                                    player.changeZhiLiao(-2);
                                }else if(event.links[0]=='信仰'){
                                    player.removeZhiShiWu('xinYang',2);
                                }
                                'step 1'
                                player.hengZhi();
                                player.addFaShu();
							},
						}
					},
                    mod:{
                        aiaiOrder:function(player,item,num){
                            if(get.info(item).type=='teShu'&&player.isHengZhi()) return num-0.5;
                        },
                    }
                },
                group:"shengHuangJiangLin_chongZhi",
                subSkill:{
                    chongZhi:{
                        trigger:{player:'teShuBefore'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return true;
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            var list=['治療','信仰'];
                            player.chooseControl(list).set('prompt',`+1點[治療]或<span class='hong'>【信仰】</span>`);
                            'step 2'
                            if(result.control=='治療'){
                                player.changeZhiLiao(1);
                            }else if(result.control=='信仰'){
                                player.addZhiShiWu('xinYang',1);
                            }
                        }
                    }
                },
                ai:{
                    order:7,
                    result:{
                        player:1,
                    }
                }
            },
            shengGuangBaoLie:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.isHengZhi();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('聖光爆裂','hidden');
                        var list=[['1',"摸1張牌[強制]，移除你的1點[治療]，你+1<span class='hong'>【信仰】</span>，目標隊友+1[治療]"],['2',"<span class='tiaoJian'>(移除你的X[治療]，選擇最多X名手牌數不大於你手牌數-X的對手)</span>你棄X張牌，然後對他們各造成(Y+2)點攻擊傷害。 Y為目標數中擁有[治療]的人數"]];
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return true;
                        }
                        if(link=='2'){
                            var bool=game.hasPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')<=player.countCards('h')-1;
                            });
                            return player.zhiLiao>0&&bool;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['shengGuangBaoLie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['shengGuangBaoLie_2']);
                        }
						return next;
					},
                    prompt:function(links,player){
                        if(links[0]=='1'){
                            return '目標隊友+1[治療]';
                        }else if(links[0]=='2'){
                            return;
                        }
                    },
                    check:function(button){
                        var player=_status.event.player;
                        var link=button.link;
                        if(link=='1'){
                            return player.countEmptyCards();
                        }else if(link=='2'){
                            return 1.1;
                        }
                        return 0.1;
                    },
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        filterCard:true,
                        selectCard:0,//讓ai可以發動
                        content:function(){
                            'step 0'
                            player.draw(1);
                            'step 1'
                            if(player.zhiLiao>0){
                                player.changeZhiLiao(-1);
                            }
                            'step 2'
                            player.addZhiShiWu('xinYang');
                            'step 3'
                            target.changeZhiLiao(1);
                        },
                        ai:{
                            result:{
                                target:function(target,player){
                                    return get.zhiLiaoEffect(target,1);
                                }
                            }
                        }
                    },
                    2:{
                        type:'faShu',
                        content:async function(event,trigger,player){
                            var targets=game.filterPlayer(function(current){
                                return current.side!=player.side;
                            });
                            //獲取對手中手牌數最小的角色的手牌數
                            var num=Infinity;
                            for(var i=0;i<targets.length;i++){
                                if(targets[i].countCards('h')<num) num=targets[i].countCards('h');
                            }
                            var cha=player.countCards('h')-num;
                            var list=[];
                            for(var i=1;i<=player.zhiLiao;i++){
                                if(i>cha) break;
                                list.push(i);
                            }

                            var result=await player.chooseButtonTarget({
                                createDialog:[
                                    `<span class='tiaoJian'>(移除你的X[治療]，選擇最多X名手牌數不大於你手牌數-X的對手)</span>你棄X張牌，然後對他們各造成(Y+2)點攻擊傷害， Y為目標數中擁有[治療]的人數，你+X<span class='hong'>【信仰】</span>。`,
                                    [list,'tdnodes'],
                                ],
                                forced:true,
                                selectTarget(){
                                    if(!ui.selected.buttons.length) return 0;
                                    else return [1,ui.selected.buttons[0].link];
                                },
                                filterTarget:function(card,player,target){
                                    return target.countCards('h')<=player.countCards('h')-ui.selected.buttons[0].link&&target.side!=player.side;
                                },
                                ai1:function(button){
                                    return button.link;
                                },
                                ai2:function(target){
                                    var damageEffect= get.damageEffect2(target,player,2);
                                    if(target.zhiLiao>0) damageEffect+=0.5;
                                    return damageEffect;
                                },
                            }).forResult();

                            var num=result.links[0];
                            var targets=result.targets.sortBySeat(player);
                            await player.changeZhiLiao(-num);
                            game.log(player,'選擇了',targets);
                            await player.chooseToDiscard(true,'h',num);

                            var damageNum=2;
                            for(var i=0;i<targets.length;i++){
                                if(targets[i].zhiLiao>0) damageNum++;
                            }
                            for(var i=0;i<targets.length;i++){
                                await targets[i].damage(damageNum,player);
                            }
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var bool=game.hasPlayer(function(current){
                            return current.side!=player.side&&current.countCards('h')<=player.countCards('h')-1;
                        });
                        if(bool&&player.zhiLiao>0){
                            return player.countCards('h')-2;
                        }else return 8-player.countCards('h');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            liuXingShengDan:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    return event.yingZhan!=true&&(player.zhiLiao>0||player.countZhiShiWu('xinYang')>0);
                },
                async cost(event,trigger,player){
                    var list=[];
                    if(player.zhiLiao>0){
                        list.push('zhiLiao');
                    }
                    if(player.countZhiShiWu('xinYang')>0){
                        list.push('xinYang');
                    }
                    list.push('cancel2');
                    var bool=game.hasPlayer(function(current){
                        return current.side==player.side&&current.zhiLiao<current.getZhiLiaoLimit();
                    });

                    var control=await player.chooseControl(list).set('prompt',get.prompt('liuXingShengDan')).set('prompt2','移除1點[治療]或1點<span class="hong">【信仰】</span>，我方目標角色+1[治療]').set('ai',function(){
                        var player=_status.event.player;
                        var bool=_status.event.bool;
                        if(player.hasZhiShiWu('shengHuangHuiGuangPaoX')){
                            if(player.zhiLiao==0) return 'cancel2';
                            else return 'zhiLiao';
                        }else{
                            if(player.countZhiShiWu('xinYang')>0) return 'xinYang';
                            if(player.zhiLiao>0) return 'zhiLiao';
                            return 'cancel2';
                        }
                    }).set('bool',bool).forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:function(){
                    'step 0'
                    if(event.cost_data=='zhiLiao'){
                        player.changeZhiLiao(-1);
                    }else if(event.cost_data=='xinYang'){
                        player.removeZhiShiWu('xinYang',1);
                    }
                    'step 1'
                    player.chooseTarget(true,function(card,player,target){
                        return target.side==player.side;
                    }).set('prompt','我方目標角色+1[治療]').set('ai',function(target){
                        return get.zhiLiaoEffect(target,1);
                    });
                    'step 2'
                    result.targets[0].changeZhiLiao(1,player);
                }
            },
            shengHuangHuiGuangPao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(player.countZhiShiWu('shengHuangHuiGuangPaoX')<1) return false;
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi;
                        num+=Math.max(0,shiQiCha);
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                        num+=Math.max(0,shiQiCha);
                    }
                    return player.countZhiShiWu('xinYang')>=num;
                },
                selectTarget:-1,
                filterTarget:true,
                contentBefore:function(){
                    'step 0'
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi;
                        num+=Math.max(0,shiQiCha);
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                        num+=Math.max(0,shiQiCha);
                    }
                    event.num=num;
                    'step 1'
                    player.removeZhiShiWu('shengHuangHuiGuangPaoX',1);
                    'step 2'
                    player.removeZhiShiWu('xinYang',event.num);
                },
                content:function(){
                    target.tiaoZhengShouPai(4);
                },
                contentAfter:function(){
                    'step 0'
                    player.changeXingBei(1);
                    'step 1'
                    var choiceList=['紅方士氣設置為藍方士氣','藍方士氣設置為紅方士氣'];
                    var list=['選項一','選項二']
                    player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return '選項一';
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return '選項二';
                        }
                        var num=Math.random();
                        if(num<0.5) return '選項一';
                        else return '選項二';
                    });
                    'step 2'
                    if(result.control=='選項一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                },
                ai:{
                    order:function(item,player){
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return 10;
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return 10;
                        }
                        return 2;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            ziDongTianChong:{
                forced:true,
                trigger:{player:'phaseEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&!event.teShu;
                },
                content:async function(event,trigger,player){
                    var choiceList=[`[水晶]你+1<span class='hong'>【信仰】</span>或+1[治療]`,`[寶石]你+1[水晶]，+2<span class='hong'>【信仰】</span>或+2[治療]`];
                    var list=['選項一'];
                    if(player.canBiShaBaoShi()){
                        list.push('選項二');
                    }
                    var control=await player.chooseControl(list).set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.canBiShaBaoShi()) return '選項二';
                        return '選項一';
                    }).forResultControl();
                    if(control=='選項一'){
                        await player.removeBiShaShuiJing();
                        var num=1;
                    }else{
                        await player.removeBiShaBaoShi();
                        await player.addNengLiang('shuiJing',1);
                        var num=2;
                    }
                    var list=['信仰','治療'];
                    control=await player.chooseControl(list).set('prompt','+'+num+"點<span class='hong'>【信仰】</span>或[治療]").forResultControl();
                    'step 3'
                    if(control=='治療'){
                        await player.changeZhiLiao(num);
                    }else if(control=='信仰'){
                        await player.addZhiShiWu('xinYang',num);
                    }
                },
                group:'ziDongTianChong_teShu',
                subSkill:{
                    teShu:{
                        trigger:{player:'teShuAfter'},
                        direct:true,
                        content:function(){
                            trigger.getParent('phase').teShu=true;
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    baoShi:true,
                }
            },
            xinYang:{
                intro:{
                    content:'mark',
                    max:10,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            shengHuangHuiGuangPaoX:{
                intro:{
                    content:'mark',
                    max:1,
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            //劍帝
            jianHunShouHu:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.customArgs.tianShiZhiHun) return false;
                    if(event.customArgs.eMoZhiHun) return false;
                    return event.yingZhan!=true&&player.getGaiPai('jianHun').length<lib.skill.jianHun.intro.max;
                },
                forced:true,
                content:function(){
                    player.addGaiPai('jianHun',trigger.card.cards);
                }
            },
            yangGong:{
                trigger:{source:'gongJiWeiMingZhong'},
                forced:true,
                priority:-1,
                filter:function(event,player){
                    return !event.yingZhan;
                },
                content:function(){
                    player.addZhiShiWu('jianQi');
                }
            },
            jianQiZhan:{
                trigger:{source:'gongJiMingZhongAfter'},
                filter:function(event,player){
                    return event.yingZhan!=true&&player.countZhiShiWu('jianQi')>0;
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('jianQi');
                    for(var i=1;i<=num;i++){
                        if(i>3) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var result=await player.chooseControl(list)
                    .set('prompt',get.prompt('jianQiZhan'))
                    .set('prompt2',lib.translate.jianQiZhan_info)
                    .set('ai',function(){
                        return _status.event.num;
                    })
                    .set('num',list.length-2)
                    .forResultControl();
                    event.result={
                        bool:result!='cancel2',
                        cost_data:result,
                    }
                },
                content:function(){
                    'step 0'
                    event.num=event.cost_data;
                    player.removeZhiShiWu('jianQi',event.num);
                    'step 1'
                    var targetx=trigger.target;
                    var name=get.translation(targetx);
                    var next=player.chooseTarget(`對除${name}以外的任意一名角色造成${event.num}點法術傷害③`,true,function(card,player,target){
                        return target!=_status.event.targetx;
                    });
                    next.set('targetx',targetx);
                    next.set('num',event.num);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        var num=_status.event.num;
                        return get.damageEffect2(target,player,num);
                    });
                    'step 2'
                    result.targets[0].faShuDamage(event.num,player);
                }

            },
            tianShiZhiHun:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return event.yingZhan!=true&&lib.skill.jianHun.tianShiZhiHun(player)>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('jianHun');
                    var result=await player.chooseCardButton(cards,'是否發動【天使之魂】').forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jianHun');
                    trigger.customArgs.tianShiZhiHun=true;
                },
                group:['tianShiZhiHun_gongJiMingZhong','tianShiZhiHun_gongJiWeiMingZhong'],
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            return event.customArgs.tianShiZhiHun;
                        },
                        direct:true,
                        content:function(){
                            player.changeZhiLiao(2);
                        }
                    },
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.tianShiZhiHun;
                        },
                        content:function(){
                            player.changeShiQi(1);
                        }
                    },
                }
            },
            eMoZhiHun:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return event.yingZhan!=true&&lib.skill.jianHun.eMoZhiHun(player)>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('jianHun');
                    var result=await player.chooseCardButton(cards,'是否發動【惡魔之魂】').forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jianHun');
                    trigger.customArgs.eMoZhiHun=true;
                    trigger.changeDamageNum(1);
                },
                group:['eMoZhiHun_gongJiWeiMingZhong'],
                subSkill:{
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.eMoZhiHun;
                        },
                        content:function(){
                           player.addZhiShiWu('jianQi',2);
                        }
                    },
                }
            },
            buQuYiZhi:{
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.draw();
                    'step 2'
                    player.addZhiShiWu('jianQi',1);
                    player.addGongJi();
                },
            },
            jianHun:{
                intro:{
                    content:'gaiPai',
                    markcount:'gaiPai',
                    max:3,
                },
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                tianShiZhiHun:function(player){
                    if(player.countNengLiangAll()==0) return 0;
                    else if(player.countNengLiangAll()%2==1) return player.getGaiPai('jianHun').length;
                    else return 0;
                },
                eMoZhiHun:function(player){
                    if(player.countNengLiangAll()==0) return 0;
                    else if(player.countNengLiangAll()%2==0) return player.getGaiPai('jianHun').length;
                    else return 0;
                },
                mod:{
                    aiaiOrder:function(player,item,num){
                        if(item=='_tiLian'&&player.countNengLiangAll()<=1) return num+0.3;
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            jianQi:{
                intro:{
                    content:'mark',
                    max:5,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //獸靈武士
            wuZheCanXin:{
                usable:1,
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    return get.is.gongJiXingDong(event);
                },
                content:function(){
                    player.addZhiShiWu('canXin',1);
                }
            },
            yiJiWuNian:{
                trigger:{player:'gongJiAfter'},
                filter:function(event,player){
                    return get.is.gongJiXingDong(event)&&player.countZhiShiWu('canXin')>=4;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('canXin',4);
                    player.addGongJi();
                    player.storage.yiJiWuNian=false;
                    player.addTempSkill('yiJiWuNian_1');
                },
                subSkill:{
                    1:{
                        trigger:{player:'gongJiSheZhi'},
                        filter:function(event,player){
                            return player.storage.yiJiWuNian==false&&get.is.gongJiXingDong(event);
                        },
                        direct:true,
                        content:function(){
                            player.storage.yiJiWuNian=true;
                            if(get.mingGe(trigger.card)=='ji'){
                                trigger.qiangZhiMingZhong();
                            }else{
                                trigger.wuFaShengDun();
                                trigger.wuFaShengGuang();
                            }
                        }
                    }
                }
            },
            shouHunYiNian:{
                forced:true,
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function(event,player){
                    return event.zhiShiWu=='shouHun'&&event.num<0;
                },
                content:function(){
                    player.addZhiShiWu('canXin',-trigger.num);
                },
                group:'shouHunYiNian_zhuDongGongJiMingZhong',
                subSkill:{
                    zhuDongGongJiMingZhong:{
                        forced:true,
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            return (!player.isHengZhi())&&get.is.zhuDongGongJi(event);
                        },
                        content:function(){
                            player.addZhiShiWu('shouHun',1);
                        }
                    }
                }

            },
            shouHunJingJie:{
                trigger:{global:'hengZhiAfter'},
                filter:function(event,player){
                    if(player.storage.shouHunJingJie_insert==true) return false;
                    return event.player!=player&&player.countZhiShiWu('shouHun')>0&&(!player.isHengZhi());
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('shouHun');
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    var next=player.chooseTarget(true,"目標角色棄1張牌[展示]").set('ai',function(target){return Math.random();});
                    'step 3'
                    event.target=result.targets[0];
                    event.target.chooseToDiscard('h',true).set('showCards',true);
                    'step 4'
                    if(get.type(result.cards[0])=='faShu'){
                        player.addZhiShiWu('shouHun');
                    }
                },

            },
            shouFan:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return get.is.faShuShangHai(event)&&player.countZhiShiWu('shouHun')>0&&event.source;
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('shouHun');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list)
                    .set('prompt',get.prompt('shouFan'))
                    .set('prompt2',lib.translate.shouFan_info)
                    .forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                logTarget:'source',
                content:function(){
                    'step 0'
                    event.num=event.cost_data;
                    player.removeZhiShiWu('shouHun',event.num);
                    'step 1'
                    player.chooseToDiscard('h',true,event.num);
                    'step 2'
                    if(trigger.source.countCards('h')>0) trigger.source.chooseToDiscard('h',true).set('showCards',true);
                    else event.finish();
                    'step 3'
                    if(get.type(result.cards[0])=='faShu'){
                        player.addZhiShiWu('shouHun');
                    }
                }

            },
            yuHunLiuJuHeXingTai:{
                group:['yuHunLiuJuHeXingTai_shangHai','yuHunLiuJuHeXingTai_shouHunJianShao','yuHunLiuJuHeXingTai_shangHaiTuoLi','yuHunLiuJuHeXingTai_shouHunTuoLi'],
                subSkill:{
                    shangHai:{
                        trigger:{source:'zaoChengShangHai'},
                        filter:function(event,player){
                            return player.isHengZhi()&&event.player.isHengZhi()&&event.faShu!=true;
                        },
                        forced:true,
                        content:function(){
                            trigger.num++;
                        }
                    },
                    shouHunJianShao:{
                        trigger:{player:'phaseEndBefore'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi()&&player.countZhiShiWu('shouHun')>0;
                        },
                        content:function(){
                            player.removeZhiShiWu('shouHun');
                        }
                    },
                    shangHaiTuoLi:{
                        trigger:{source:'chengShouShangHai'},
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        forced:true,
                        content:function(){
                            player.chongZhi();
                        }
                    },
                    shouHunTuoLi:{
                        trigger:{player:'phaseEnd'},
                        priority:0,
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi()&&player.countZhiShiWu('shouHun')==0;
                        },
                        content:function(){
                            player.chongZhi();
                        }
                    }
                }
            },
            niFanJuHeZhan:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return player.isHengZhi()&&event.target.countCards('h')<4;
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('shouHun');
                    for(var i=0;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list)
                    .set('prompt',get.prompt('niFanJuHeZhan'))
                    .set('prompt2',lib.translate.niFanJuHeZhan_info)
                    .forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.niFanJuHeZhan_num=event.cost_data;
                    if(event.cost_data>0){
                        player.removeZhiShiWu('shouHun',event.cost_data);
                    }
                },
                group:'niFanJuHeZhan_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        trigger:{source:'gongJiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return typeof event.customArgs.niFanJuHeZhan_num=='number';
                        },
                        content:function(){
                            'step 0'
                            trigger.target.chooseToDiscard('h',true,trigger.customArgs.niFanJuHeZhan_num+2);
                            'step 1'
                            if(result.cards.length<trigger.customArgs.niFanJuHeZhan_num+2){
                                trigger.target.changeShiQi(-1);
                            }
                            'step 2'
                            trigger.weiMingZhong();
                        }
                    }
                }
            },
            yuHunLiuJuHeShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('shouHun',1,Infinity);
                    'step 2'
                    var list=['摸','棄','放棄'];
                    player.chooseControl(list).set('prompt','摸或棄1張牌').set('ai',function(){
                        var player=_status.event.player;
                        var cards=player.getCards('h');
                        var bool=false;
                        for(var card of cards){
                            if(player.hasUseTargetXingBei(card)) bool=true;
                            if(bool) break;
                        }
                        if(!bool) return '摸';
                        if(player.countCards('h')+1>=player.getHandcardLimit()) return '棄';
                        if(player.countCards('h')<player.getHandcardLimit()-2) return '摸';
                        return '放棄';
                    });
                    'step 3'
                    if(result.control=='摸'){
                        player.draw();
                    }else if(result.control=='棄'){
                        player.chooseToDiscard('h',true,1);
                    }
                    'step 4'
                    if(player.isHengZhi()){
                        player.addZhiShiWu('canXin');
                    }else{
                        player.hengZhi();
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            shouHun:{
                intro:{
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            canXin:{
                intro:{
                    content:'mark',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //靈魂術士
            lingHunTunShi:{
                forced:true,
                trigger:{global:'changeShiQiAfter'},
                filter:function(event,player){
                    return player.side==event.side&&event.num<0;
                },
                content:function(){
                    player.addZhiShiWu('huangSeLingHun',Math.abs(trigger.num));
                }
            },
            lingHunZhaoHuan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.lingHunZhaoHuan.filterCard(card))>0;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectCard:[1,Infinity],
                discard:true,
                showCards:true,
                content:function(){
                    player.addZhiShiWu('lanSeLingHun',cards.length);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:function(item,player){
                        return 2.1+player.countCards('h',card=>lib.skill.lingHunZhaoHuan.filterCard(card))*0.7;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            lingHunZhuanHuan:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&(player.hasZhiShiWu('huangSeLingHun')||player.hasZhiShiWu('lanSeLingHun'));
                },
                content:async function(event,trigger,player){
                    var lanSe=player.hasZhiShiWu('lanSeLingHun');
                    var huangSe=player.hasZhiShiWu('huangSeLingHun');
                    if(lanSe&&huangSe){
                        var list=['黃色->藍色','藍色->黃色'];
                        var control=await player.chooseControl(list).set('prompt','選擇轉換的靈魂').set('ai',function(){
                            var player=_status.event.player;
                            if(player.countZhiShiWu('lanSeLingHun')>=player.countZhiShiWu('huangSeLingHun')) return '黃色->藍色';
                            else return '藍色->黃色';
                        }).forResultControl();
                        if(control=='黃色->藍色'){
                            await player.removeZhiShiWu('huangSeLingHun');
                            await player.addZhiShiWu('lanSeLingHun');
                        }else if(control=='藍色->黃色'){
                            await player.removeZhiShiWu('lanSeLingHun');
                            await player.addZhiShiWu('huangSeLingHun');
                        }
                    }else if(lanSe){
                        await player.removeZhiShiWu('lanSeLingHun');
                        await player.addZhiShiWu('huangSeLingHun');
                    }else if(huangSe){
                        await player.removeZhiShiWu('huangSeLingHun');
                        await player.addZhiShiWu('lanSeLingHun');
                    }
                }
            },
            lingHunJingXiang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('huangSeLingHun')>=2;
                },
                selectTarget:1,
                filterTarget:true,
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('huangSeLingHun',2);
                    await player.chooseToDiscard('h',true,2);

                    var chaZhi=event.target.getHandcardLimit()-event.target.countCards('h');
                    var num=Math.min(2,chaZhi);
                    await event.target.draw(num);
                },
                ai:{
                    order:function(item,player){
                        return 4-(player.getHandcardLimit()-player.countCards('h'))*0.6;
                    },
                    result:{
                        target:-1,
                    }
                }
            },
            lingHunZhenBao:{
                type:'faShu',
                enable:['faShu'],
                duYou:'lingHunZhenBao',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.lingHunZhenBao.filterCard(card))&&player.countZhiShiWu('huangSeLingHun')>=3;
                },
                useCard:true,
                filterCard:function(card){
                    return card.hasDuYou('lingHunZhenBao');
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('huangSeLingHun',3);
                    'step 1'
                    var num=3;
                    if(target.countCards('h')<3&&target.getHandcardLimit()>5){
                        num+=2;
                    }
                    target.faShuDamage(num,player);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        },
                    }
                }
            },
            lingHunFuYu:{
                type:'faShu',
                enable:['faShu'],
                duYou:'lingHunFuYu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.lingHunFuYu.filterCard(card))&&player.countZhiShiWu('lanSeLingHun')>=3
                },
                useCard:true,
                filterCard:function(card){
                    return card.hasDuYou('lingHunFuYu');
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('lanSeLingHun',3);
                    'step 1'
                    target.addNengLiang('baoShi',2);
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.getHandcardLimit()-target.countNengLiangAll()>=2){
                                return 2;
                            }else if(target.getHandcardLimit()-target.countNengLiangAll()>=1){
                                return 1;
                            }else{
                                return 0;
                            }
                        }
                    }
                }
            },
            lingHunLianJie:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(game.players.length==4) return false;
                    if(player.storage.lingHunLianJieTarget) return false;
                    return player.hasZhiShiWu('huangSeLingHun')&&player.hasZhiShiWu('lanSeLingHun');
                },
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('huangSeLingHun');
                    await player.removeZhiShiWu('lanSeLingHun'); 
                    var target=await player.chooseTarget('將【靈魂鏈接】放置於一名隊友面前',true,function(card,player,target){
                        return target!=player&&target.side==player.side;
                    }).forResultTargets();
                    target=target[0];

                    player.storage.lingHunLianJieTarget=target;
                    await target.addZhiShiWu('lingHunLianJie',true);
                },
                intro:{
                    name:'[專屬]靈魂鏈接',
                    content:"<span class='tiaoJian'>(每當你們之間有人承受傷害時⑥，移除X點</span><span class='lan'>【藍色靈魂】</span><span class='tiaoJian'>)</span>將X點傷害轉移給另1人，轉移後的傷害為法術傷害⑥。",  
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/lingHunLianJie.png',
                group:'lingHunLianJie_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        trigger:{global:'chengShouShangHai'},
                        filter:function(event,player){
                            if(event.lingHunLianJie) return false;
                            if(!player.storage.lingHunLianJieTarget) return false;
                            if(!(event.player==player.storage.lingHunLianJieTarget||event.player==player)) return false;
                            return player.hasZhiShiWu('lanSeLingHun');
                        },
                        async cost(event,trigger,player){
                            var num=player.countZhiShiWu('lanSeLingHun');
                            var list=[];
                            for(var i=1;i<=num;i++){
                                if(i>trigger.num) break;
                                list.push(i);
                            }
                            list.push('cancel2');
                            //計算移除量
                            var num1=player.getHandcardLimit()-player.countCards('h');
                            var num2=player.storage.lingHunLianJieTarget.getHandcardLimit()-player.storage.lingHunLianJieTarget.countCards('h');
                            if(trigger.player==player){
                                var yiChu=trigger.num-num1;
                                yiChu=Math.min(yiChu,list.length-1);
                                yiChu=Math.min(yiChu,num2);
                            }else{
                                var yiChu=trigger.num-num2;
                                yiChu=Math.min(yiChu,list.length-1);
                                yiChu=Math.min(yiChu,num1);
                            }
                            yiChu=Math.max(yiChu,1);

                            if(event.player.name=='xianZhe'&&event.faShu==true){
                                if(event.num==1||event.num==4) yiChu='cancel2';
                            }
                            var num1=player.getHandcardLimit()-player.countCards('h');
                            var num2=player.storage.lingHunLianJieTarget.getHandcardLimit()-player.storage.lingHunLianJieTarget.countCards('h');
                            if(event.player==player){ 
                                if(event.num<=num1) yiChu='cancel2';
                            }else{
                                if(event.num<=num2) yiChu='cancel2';
                            }


                            var name=get.translation(trigger.player);
                            var str=`<br>${name}承受了${trigger.num}點傷害`;
                            var control=await player.chooseControl(list)
                            .set('prompt',get.prompt('lingHunLianJie')+str)
                            .set('prompt2',lib.translate.lingHunLianJie_info)
                            .set('ai',function(player){
                                var yiChu=_status.event.yiChu;
                                if(yiChu=='cancel2') return 'cancel2';
                                else return yiChu-1;
                            })
                            .set('yiChu',yiChu)
                            .forResultControl();
                            event.result={
                                bool:control!='cancel2',
                                cost_data:control,
                            }
                        },
                        content:function(){
                            'step 0'
                            event.num=event.cost_data;
                            player.removeZhiShiWu('lanSeLingHun',event.num)
                            trigger.num-=event.num;
                            'step 1'
                            var list=[player,player.storage.lingHunLianJieTarget];
                            list.sortBySeat(_status.currentPhase);
                            if(list[0]==player){
                                if(trigger.player==player){
                                    trigger.insertAfter(function(){
                                        player.faShuDamage(num,source).set('step',5).set('lingHunLianJie',true);
                                    },{
                                        player:player.storage.lingHunLianJieTarget,
                                        num:event.num,
                                        source:player,
                                    });
                                }else{
                                    player.faShuDamage(event.num,player).set('step',5).set('lingHunLianJie',true);
                                }
                            }else{
                                if(trigger.player==player){
                                    player.storage.lingHunLianJieTarget.faShuDamage(event.num,player).set('step',5).set('lingHunLianJie',true);
                                }else{
                                    trigger.insertAfter(function(){
                                        player.faShuDamage(num,player).set('step',5).set('lingHunLianJie',true);
                                    },{
                                        player:player,
                                        num:event.num,
                                    }) 
                                }
                            }
                        },
                    }
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                }
            },
            lingHunZengFu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('huangSeLingHun',2);
                    'step 2'
                    player.addZhiShiWu('lanSeLingHun',2);
                },
                ai:{
                    baoShi:true,
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                }
            },
            huangSeLingHun:{
                intro:{
                    content:'mark',
                    max:6
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            lanSeLingHun:{
                intro:{
                    content:'mark',
                    max:6
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            //血之巫女
            xueZhiAiShang:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.storage.tongShengGongSi_use;
                },
                content:async function(event,trigger,player){
                    await player.faShuDamage(2,player);

                    var result=await player.chooseTarget('轉移【同生共死】目標，取消則移除【同生共死】',function(card,player,target){
                        return target!=_status.event.targetX;
                    })
                    .set('targetX',player.storage.tongShengGongSi_target)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        if(target==player) return -1;
                        if(target.side==player.side) return -1;
                        else return 1;
                    }).forResult();
                    
                    if(result.bool){
                        lib.skill.tongShengGongSi.removeTongShengGongSiSkill(player,player.storage.tongShengGongSi_target);
                        var target=result.targets[0];
                        lib.skill.tongShengGongSi.addTongShengGongSiSkill(player,target);
                        await player.storage.tongShengGongSi_target.removeZhiShiWu('tongShengGongSi_xiaoGuo');
                        player.storage.tongShengGongSi_target=target;
                        await target.addZhiShiWu('tongShengGongSi_xiaoGuo');                       
                    }else{
                        lib.skill.tongShengGongSi.removeTongShengGongSiSkill(player,player.storage.tongShengGongSi_target);
                        await player.storage.tongShengGongSi_target.removeZhiShiWu
                        ('tongShengGongSi_xiaoGuo');
                        delete player.storage.tongShengGongSi_target;
                        player.storage.tongShengGongSi_use=false;
                    }
                },
                check:function(event,player){
                    if(player.isHengZhi()&&player.storage.tongShengGongSi_target&&player.storage.tongShengGongSi_target.side==player.side) return false;
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    var minus=player.getHandcardLimit()-player.countCards('h');
                    return minus>=2;
                }
            },
            liuXue:{
                forced:true,
                trigger:{player:'changeShiQiEnd'},
                filter:function(event,player){
                    return event.num<0&&event.cause=='damage'&&!player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    player.changeZhiLiao(1);
                },
                group:['liuXue_shangHai','liuXue_chongZhi'],
                subSkill:{
                    shangHai:{
                        trigger:{player:'phaseBegin'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            player.faShuDamage(1,player);
                        }
                    },
                    chongZhi:{
                        trigger:{
                            player:'loseAfter',
                            global:['gainAfter'],
                        },
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            if(event.name=='gain'&&event.player==player) return false;
                            var evt=event.getl(player);
                            return evt&&evt.cards2&&evt.cards2.length>0&&player.countCards('h')<3;
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    }
                }
            },
            niLiu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.isHengZhi();
                },
                selectCard:2,
                filterCard:true,
                discard:true,
                content:function(){
                    'step 0'
                    player.changeZhiLiao(1);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.6,
                    result:{
                        player:2,
                    }
                }
            },
            xueZhiBeiMing:{
                type:'faShu',
                enable:['faShu'],
                duYou:'xueZhiBeiMing',
                filter:function(event,player){
                    return player.isHengZhi()&&player.hasCard(card=>lib.skill.xueZhiBeiMing.filterCard(card));
                },
                filterCard:function(card){
                    return card.hasDuYou('xueZhiBeiMing');
                },
                selectCard:1,
                useCard:true,
                filterTarget:true,
                selectTarget:1,
                contentBefore:function(){
                    'step 0'
                    var list=[0,1,2];
                    player.chooseControl(list).set('prompt','對目標角色和自己各造成(X+1)點法術傷害③').set('ai',function(){
                        var num=Math.random();
                        if(num>0.5) return 1;
                        else if(num>0.2) return 2;
                        else return 0;
                    });
                    'step 1'
                    player.storage.xueZhiBeiMin=result.control+1;
                },
                content:function(){
                    'step 0'
                    target.faShuDamage(player.storage.xueZhiBeiMin,player);
                    'step 1'
                    player.faShuDamage(player.storage.xueZhiBeiMin,player);
                },
                ai:{
                    order:function(card,player){
                        return 7-player.countCards('h');
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2)
                        }
                    }
                }
            },
            tongShengGongSi:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return !player.storage.tongShengGongSi_use;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.storage.tongShengGongSi_use=true;
                    player.storage.tongShengGongSi_target=target;

                    lib.skill.tongShengGongSi.addTongShengGongSiSkill(player,target);
                    target.addZhiShiWu('tongShengGongSi_xiaoGuo');
                },
                global:'tongShengGongSi_xiaoGuo',
                group:'tongShengGongSi_hengZhiChongZhi',
                subSkill:{
                    hengZhiChongZhi:{
                        trigger:{player:['hengZhiEnd','chongZhiEnd']},
                        direct:true,
                        priority:-0.1,
                        filter:function(event,player){
                            return player.storage.tongShengGongSi_use;
                        },
                        content:function(){
                            'step 0'
                            lib.skill.tongShengGongSi.removeTongShengGongSiSkill(player,player.storage.tongShengGongSi_target);
                            lib.skill.tongShengGongSi.addTongShengGongSiSkill(player,player.storage.tongShengGongSi_target);
                            'step 1'
                            player.qiPai();
                            'step 2'
                            player.storage.tongShengGongSi_target.qiPai();

                        }
                    },

                    xiaoGuo:{
                        intro:{
                            content:"<span class='tiaoJian'>(在【普通形態】下)</span>你和他手牌上限各-2。 <span class='tiaoJian'>(在【流血形態】下)</span>你和他手牌上限各+1。",
                            nocount:true,
                        },
                        onremove:'storage',
                        markimage:'image/card/zhuanShu/tongShengGongSi.png',
                    },
                    jiangDi:{
                        mod:{
                            maxHandcard:function(player,num){
                                return num-2;
                            }
                        }
                    },
                    zengJia:{
                        mod:{
                            maxHandcard:function(player,num){
                                return num+1;
                            }
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var num=0;
                        if(player.isHengZhi()) num+=2;
                        return 7-player.countCards('h')+num;
                    },
                    result:{
                        target:function(player,target){
                            return -target.countCards('h');
                        },
                    }
                },
                addTongShengGongSiSkill:function(player,target){
                    if(target!=player){
                        if(player.isHengZhi()){
                            player.addSkill('tongShengGongSi_zengJia');
                            target.addSkill('tongShengGongSi_zengJia');
                        }else{
                            player.addSkill('tongShengGongSi_jiangDi');
                            target.addSkill('tongShengGongSi_jiangDi');
                        }
                        player.update();
                        target.update();
                    }
                },
                removeTongShengGongSiSkill:function(player,target){
                    if(target!=player){
                        player.removeSkill('tongShengGongSi_zengJia');
                        target.removeSkill('tongShengGongSi_zengJia');
                        player.removeSkill('tongShengGongSi_jiangDi');
                        target.removeSkill('tongShengGongSi_jiangDi');
                        player.update();
                        target.update();
                    }
                }
            },
            xueZhiZuZhou:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                filterTarget:true,
                selectTarget:1,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    target.faShuDamage(2,player);
                    'step 2'
                    player.chooseToDiscard(3,true,'h');
                },
                ai:{
                    baoShi:true,
                    order:function(card,player){
                        return 1.7+player.countCards('h')*0.5;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2)
                        }
                    }
                }
            },
            //蝶舞者
            shengMingZhiHuo:{
                mod:{
                    maxHandcardFinal:function(player,num){
                        var x=player.countZhiShiWu('DWZyong');
                        var n=num-x;
                        if(n<=3){
                            return 3;
                        }else{
                            return n
                        }
                    }
                }
            },
            wuDong:{
                type:"faShu",
                enable:['faShu'],
                selectCard:[0,1],
                filterCard:true,
                content:function(){
                    'step 0'
                    if(cards.length==0){
                        player.draw();
                    }
                    'step 1'
                    var cards=get.cards();
                    player.addGaiPai(cards,'jian');
                },
                check:function(card){
                    var player = _status.event.player;
                    if(player.countCards('h')>2) return 7-get.value(card);
                    else return 0;
                },
                ai:{
                    order:3.4,
                    result:{
                        player:function(player){
                            return player.getGaiPai('jian').length<=6?1:0;
                        },
                    }
                },
                mod:{
                    aiOrder:function(player,item,num){
                        if(item=='_tiLian'&&player.getGaiPai('jian').length>4) return num+1;
                    }
                }
            },
            duFen:{
                trigger:{global:'chanShengShangHai'},
                filter:function(event,player){
                    return event.num==1&&event.faShu==true&&player.getGaiPai('jian').length>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('jian');
                    var name=get.colorName(trigger.player);
                    var result=await player.chooseCardButton(cards,"是否發動【毒粉】,移除1個【繭】,該次傷害額外+1，目標"+name)
                    .set('ai',function(button){
                        if(_status.event.bool) return 0;
                        return 1;
                    })
                    .set('bool',trigger.player.side==player.side)
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jian').set('jian',true);
                    'step 1'
                    trigger.changeDamageNum(1);
                },
            },
            chaoSheng:{
                trigger:{player:'chengShouShangHai'},
                filter:function(event,player){
                    return event.num>0&&player.getGaiPai('jian').length>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('jian');
                    var result=await player.chooseCardButton(cards,"是否發動【朝聖】,移除1個【繭】,抵禦1點該來源的傷害,目前傷害量"+trigger.num)
                    .set('ai',function(button){
                        var player=_status.event.player;
                        var num=_status.event.num;
                        var shiQiXiaJiang=_status.event.shiQiXiaJiang;
                        if(shiQiXiaJiang!=false&&player.countCards('h')+num>player.getHandcardLimit()){
                            if(get.type(button.link)=='faShu') return 1;
                            else return 2;
                        }else return 0;
                    }).set('num',trigger.num).set('shiQiXiaJiang',trigger.shiQiXiaJiang)
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jian').set('jian',true);
                    'step 2'
                    trigger.changeDamageNum(-1);
                }
            },
            jingHuaShuiYue:{
                trigger:{global:'chengShouShangHaiBefore'},
                filter:function(event,player){
                    return event.num==2&&event.faShu==true&&player.getGaiPai('jian').length>1;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('jian');
                    var name=get.colorName(trigger.player);
                    var result=await player.chooseCardButton(cards,2,"是否發動【鏡花水月】，移除2張同系【繭】，目標"+name)
                    .set('filterButton',function(button){
                        if(ui.selected.buttons.length==0) return true;
                        var xiBie=get.xiBie(button.link);
                        if(xiBie==get.xiBie(ui.selected.buttons[0].link)) return true;
                        else return false;
                    })
                    .set('ai',function(button){
                        if(_status.event.bool) return 0;
                        return 1;
                    })
                    .set('bool',trigger.player.side==player.side)
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jian').set('jian',true).set('showHiddenCards',true);
                    'step 1'
                    trigger.num=0;
                    'step 2'
                    trigger.player.faShuDamage(1,player);
                    'step 3'
                    trigger.player.faShuDamage(1,player);
                },
            },
            diaoLing:{
                trigger:{player:'discard'},
                filter:function(event,player){
                    return event.jian;
                },
                async cost(event,trigger,player){
                    var cards=trigger.cards;
                    var result=await player.chooseCardButton(cards,[1,Infinity],"是否發動【凋零】,展示法術【繭】")
                    .set('filterButton',function(button){
                        return get.type(button)=='faShu';
                    })
                    .set('ai',function(button){
                        var player=_status.event.player;
                        if(player.countSkill('diaoLing')==1) return 0;
                        var num=player.getHandcardLimit()-player.countCards('h');
                        if(num>2) return 1;
                        else return 0;
                    })
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:async function(event,trigger,player){
                    if(!player.hasSkill('diaoLing_xiaoGuo')) player.addTempSkill('diaoLing_xiaoGuo',{player:'phaseBefore'});
                    await player.showHiddenCards(event.cost_data);
                    var target,targets;
                    for(var i=0;i<event.cost_data.length;i++){
                        targets=await player.chooseTarget('對目標角色造成1點法術傷害',true)
                        .set('ai',function(target){
                            var player=_status.event.player;
                            return target.side!=player.side;
                        }).forResultTargets();
                        target=targets[0];
                        await target.faShuDamage(1,player);
                        await player.faShuDamage(2,player);    
                    }
                },
                subSkill:{
                    xiaoGuo:{
                        trigger:{global:'changeShiQiJudge'},
                        filter:function(event,player){
                            if(event.num>0) return false;
                            if(player.side==event.side) return false;
                            var shiQi=get.shiQi(!player.side);
                            return shiQi+event.num<1;
                        },
                        direct:true,
                        content:function(){
                            var shiQi=get.shiQi(!player.side);
                            var num=1-shiQi;
                            trigger.num=num;
                        }
                    }
                }
            },
            yongHua:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    if(!player.hasSkill('DWZyong')) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('DWZyong');
                    'step 2'
                    var card=get.cards(4);
                    player.addGaiPai(card,'jian');
                },
                ai:{
                    baoShi:true,
                    order:function(card,player){
                        return 9-player.getGaiPai('jian').length;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            daoNiZhiDie:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard(2,true);
                    var choiceList=['對目標角色造成1點法術傷害③，該傷害不能用[治療]抵禦',"<span class='tiaoJian'>(移除2個【繭】或對自己造成4點法術傷害③)</span>移除1個<span class='hong'>【蛹】</span>"];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        return '選項一';
                    }).forResultControl();

                    if(control=='選項一'){
                        var targets=await player.chooseTarget("對目標角色造成1點法術傷害③，該傷害不能用[治療]抵禦",true)
                        .set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
                        }).forResultTargets();
                        var target=targets[0];
                        await target.faShuDamage(1,player).set('canZhiLiao',false);
                    }else if(control=='選項二'){
                        var cards=player.getGaiPai('jian');
                        if(cards.length>0){
                            var result=await player.chooseCardButton(cards,2,'移除2個【繭】或對自己造成4點法術傷害③').forResult();
                        }else{
                            var result={bool:false};
                        }
                        if(result.bool){
                            await player.discard(result.links,'jian').set('jian',true);
                        }else{
                            await player.faShuDamage(4,player);
                        }
                        await player.removeZhiShiWu('DWZyong');
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.3,
                    result:{
                        player:1,
                    }
                }
            },
            jian:{
                intro:{
                    markcount:'gaiPai',
                    content:'gaiPai',
                },
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                trigger:{player:'addGaiPaiAfter'},
                filter:function(event,player){
                    return event.gaiPai=='jian'&&player.getGaiPai('jian').length>8;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var num=player.getGaiPai('jian').length;
                    var cards=player.getGaiPai('jian');
                    player.chooseCardButton(num-8,true,cards,`捨棄${num-8}張【繭】`);
                    'step 1'
                    player.discard(result.links,'jian').set('sheQi',true);
                }
            },
            DWZyong:{
                intro:{
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png'
            },
        },
		
		translate:{
            //角色名字
			fengZhiJianSheng:"風之劍聖",
            kuangZhanShi:"狂戰士",
            shenJianShou:"神箭手",
            fengYinShi:"封印師",
            anShaZhe:"暗殺者",
            shengNv:"聖女",
            tianShi:"天使",
            moFaShaoNv:"魔法少女",
            moJianShi:"魔劍士",
            shengQiangQiShi:"聖槍騎士",
            yuanSuShi:"元素師",
            maoXianJia:"冒險家",
            wenYiFaShi:"瘟疫法師",
            zhongCaiZhe:"仲裁者",
            shenGuan:"神官",
            qiDaoShi:"祈禱師",
            xianZhe:"賢者",
            lingFuShi:"靈符師",
            jianDi:"劍帝",
            geDouJia:"格鬥家",
            yongZhe:"勇者",
            lingHunShuShi:"靈魂術士",
            xueZhiWuNv:"血之巫女",
            dieWuZhe:"蝶舞者",
            nvWuShen:"女武神",
            moGong:"魔弓",
            hongLianQiShi:"紅蓮騎士",
            yingLingRenXing:"英靈人形",
            moQiang:"魔槍",
            cangYanMoNv:"蒼炎魔女",
            yinYouShiRen:"吟遊詩人",
            jingLingSheShou:"精靈射手",
            yinYangShi:"陰陽師",
            xueSeJianLing:"血色劍靈",
            yueZhiNvShen:"月之女神",
            shouLingWuShi:"獸靈武士",
            shengGong:"聖弓",

            fengZhiJianSheng_name:"威斯特姆",
            kuangZhanShi_name:"阿基特",
            shenJianShou_name:"安娜",
            fengYinShi_name:"帕蒂",
            anShaZhe_name:"無念",
            shengNv_name:"艾麗卡",
            tianShi_name:"瑪利亞",
            moFaShaoNv_name:"妮婭",
            moJianShi_name:"美狄亞",
            shengQiangQiShi_name:"斯庇爾",
            yuanSuShi_name:"索爾斯",
            maoXianJia_name:"莉莉安娜",
            wenYiFaShi_name:"塔格奧",
            zhongCaiZhe_name:"賽爾娜",
            shenGuan_name:"麗格蕾朵",
            qiDaoShi_name:"琺珞",
            xianZhe_name:"諾雷傑",
            lingFuShi_name:"風音",
            jianDi_name:"卡特琳娜",
            geDouJia_name:"凌薇",
            yongZhe_name:"尤里烏斯",
            lingHunShuShi_name:"狄亞娜",
            xueZhiWuNv_name:"紫苑",
            dieWuZhe_name:"華胥",
            nvWuShen_name:"米涅瓦/栞蒂",
            moGong_name:"泰羅莎",
            hongLianQiShi_name:"斯卡雷特",
            yingLingRenXing_name:"零",
            moQiang_name:"菲歐娜",
            cangYanMoNv_name:"莉莉絲",
            yinYouShiRen_name:"詹姆",
            jingLingSheShou_name:"波阿狄西亞",
            yinYangShi_name:"輪&環",
            xueSeJianLing_name:"羅絲菲莉",
            yueZhiNvShen_name:"尤瑞艾莉",
            shouLingWuShi_name:"菖蒲",
            shengGong_name:"薩哈魁爾",

            
            
            //風之劍聖
            fengNuZhuiJi:'[響應]風怒追擊[回合限定]',
            fengNuZhuiJi_info:"<span class='tiaoJian'>([攻擊行動]結束後發動)</span>額外+1風系[攻擊行動]",
            shengJian:'[被動]聖劍',
            shengJian_info:"若你的主動攻擊為本次行動階段的第3次[攻擊行動]，則此攻擊強制命中。本次[攻擊行動]結束時，你摸X張牌，棄X張牌(X<4)。",
            lieFengJi:"(獨)[響應]烈風技",
            lieFengJi_info:"<span class='tiaoJian'>(攻擊的目標擁有聖盾時發動)</span>無視對手聖盾的效果,且此攻擊對手無法應戰。",
            jiFengJi:"(獨)[響應]疾風技",
            jiFengJi_info:"<span class='tiaoJian'>(作為主動攻擊打出後發動)</span>額外+1[攻擊行動]。",
            jianYing:"[響應]劍影[回合限定]",
            jianYing_info:"[水晶]<span class='tiaoJian'>([攻擊行動]結束後發動)</span>額外+1[攻擊行動]。",

            //狂戰士
            kuangHua:"[被動]狂化",
            kuangHua_info:"你發動的所有攻擊傷害額外+1；<span class='tiaoJian'>(攻擊命中時②，若你的手牌數>3)</span>本次攻擊傷害額外+1。",
            xueYingKuangDao:"(獨)[響應]血影狂刀",
            xueYingKuangDao_info:"<span class='tiaoJian'>(作為主動攻擊打出時發動)</span><br>·若命中手牌為2的對手②，本次攻擊傷害額外+2；<br>·若命中手牌為3的對手②，本次攻擊傷害額外+1。",
            xueXingPaoXiao:"(獨)[響應]血腥咆哮",
            xueXingPaoXiao_info:'<span class="tiaoJian">(作為主動攻擊打出時發動)</span>若攻擊的目標擁有的[治療]為2，則本次攻擊強制命中。',
            siLie:"[響應]撕裂",
            siLie_info:"[寶石]<span class='tiaoJian'>(攻擊命中後發動②)</span>本次攻擊傷害額外+2。",

            //聖女
            bingShuangDaoYan:"[被動]冰霜禱言",
            bingShuangDaoYan_info:"<span class='tiaoJian'>(每當你使用水系牌或【聖光】時發動)</span>目標角色+1[治療]。",
            zhiLiaoShu:"(獨)[法術]治療術",
            zhiLiaoShu_info:"目標角色+2[治療]。",
            zhiYuZhiGuang:"(獨)[法術]治癒之光",
            zhiYuZhiGuang_info:"指定最多3名角色各+1[治療]。",
            lianMin:"[啟動]憐憫[持續]",
            lianMin_info:"[寶石][橫置]你的手牌上限恆定為7[恆定]，你+1[水晶]。",
            shengLiao:"[法術]聖療[回合限定]",
            shengLiao_info:"[水晶]任意分配3[治療]給1~3名角色，額外+1[攻擊行動]或[法術行動]。",

            //暗殺者
            fanShi:"[被動]反噬",
            fanShi_info:"<span class='tiaoJian'>(承受攻擊傷害後發動⑥)</span>攻擊你的對手摸1張牌[強制]。",
            shuiYing:"[響應]水影",
            shuiYing_info:"<span class='tiaoJian'>(除【特殊行動】外，當你摸牌前發動)</span>棄X張水系牌[展示]；<span class='tiaoJian'>(若你處於【潛行】效果下)</span>你可額外棄1張法術牌[展示]。",
            qianXing:"[啟動]潛行",
            qianXing_info:"[寶石]你可選擇摸1張牌，[橫置]持續到你的下個行動階段開始，你的手牌上限-1；你不能成為主動攻擊的目標；你的主動攻擊對手無法應戰且傷害額外+X，X為你剩餘的【能量】數。【潛行】的效果結束時[重置]。",

            //封印師
            faShuJiDang:"[響應]法術激盪",
            faShuJiDang_info:"<span class='tiaoJian'>([法術行動]結束後發動)</span>額外+1[攻擊行動]。",
            diZhiFengYin:"(獨)[法術]地之封印",
            diZhiFengYin_xiaoGuo:'地之封印',
            diZhiFengYin_info:"<span class='tiaoJian'>(將【地之封印】放置於目標對手面前)</span>該對手獲得(直到他從手中打出或展示出地系牌時強制觸發)：對他造成3點法術傷害③，觸發後移除此牌。",
            shuiZhiFengYin:"(獨)[法術]水之封印",
            shuiZhiFengYin_xiaoGuo:"水之封印",
            shuiZhiFengYin_info:"<span class='tiaoJian'>(將【水之封印】放置於目標對手面前)</span>該對手獲得(直到他從手中打出或展示出水系牌時強制觸發)：對他造成3點法術傷害③，觸發後移除此牌。",
            huoZhiFengYin:"(獨)[法術]火之封印",
            huoZhiFengYin_xiaoGuo:"火之封印",
            huoZhiFengYin_info:"<span class='tiaoJian'>(將【火之封印】放置於目標對手面前)</span>該對手獲得(直到他從手中打出或展示出火系牌時強制觸發)：對他造成3點法術傷害③，觸發後移除此牌。",
            fengZhiFengYin:"(獨)[法術]風之封印",
            fengZhiFengYin_xiaoGuo:'風之封印',
            fengZhiFengYin_info:"<span class='tiaoJian'>(將【風之封印】放置於目標對手面前)</span>該對手獲得(直到他從手中打出或展示出風系牌時強制觸發)：對他造成3點法術傷害③，觸發後移除此牌。",
            leiZhiFengYin:"(獨)[法術]雷之封印",
            leiZhiFengYin_xiaoGuo:'雷之封印',
            leiZhiFengYin_info:"<span class='tiaoJian'>(將【雷之封印】放置於目標對手面前)</span>該對手獲得(直到他從手中打出或展示出雷系牌時強制觸發)：對他造成3點法術傷害③，觸發後移除此牌。",
            wuXiShuFu:"(專)[法術]五系束縛",
            wuXiShuFu_xiaoGuo:"五系束縛",
            wuXiShuFu_info:"[水晶]<span class='tiaoJian'>(將【五系束縛】放置於目標對手面前)</span>該對手跳過其下個行動階段。在其下個行動階段開始前他可以選擇摸(2+X)張牌來取消【五系束縛】的效果。X為場上封印的數量，X最高為2。無論效果是否發動，觸發後移除此牌。",
            fengYinPoSui:"[法術]封印破碎",
            fengYinPoSui_info:"[水晶]將場上任意一張基礎效果牌收入自己手中。",

            
            //天使
            fengZhiJieJing:'[法術]風之潔淨',
            fengZhiJieJing_info:"<span class='tiaoJian'>(棄1張風系牌[展示])</span>移除場上任意一個基礎效果。",
            tianShiZhuFu:"[法術]天使祝福",
            tianShiZhuFu_info:"<span class='tiaoJian'>(棄1張水系牌[展示])</span>目標角色給你2張牌或指定2名角色各給你1張牌。",
            tianShiJiBan:"[被動]天使羈絆",
            tianShiJiBan_info:"<span class='tiaoJian'>(每當你移除場上任意一個基礎效果或使用【聖盾】時)</span>目標角色+1[治療]。",
            tianShiZhiQiang:"(獨)[法術]天使之牆",
            tianShiZhiQiang_info:"可作為【聖盾】使用。",
            tianShiZhiGe:"[響應]天使之歌[回合限定]",
            tianShiZhiGe_info:"[水晶]<span class='tiaoJian'>(在你的回合開始前發動)</span>移除場上任意一個基礎效果。",
            shenZhiBiHu:"[響應]神之庇護",
            shenZhiBiHu_info:"X[水晶]為我方抵禦X點因法術傷害而造成的士氣下降。",

            //神箭手
            shanDianJian:"[被動]閃電箭",
            shanDianJian_info:"你的雷系攻擊對手無法應戰。",
            guanChuanSheJi:"[響應]貫穿射擊",
            guanChuanSheJi_info:"<span class='tiaoJian'>(主動攻擊未命中時發動①，棄1張法術牌[展示])</span>對你所攻擊的目標造成2點法術傷害③。",
            shanGuangXianJing:'(獨)[法術]閃光陷阱',
            shanGuangXianJing_info:"對目標角色造成2點法術傷害③。",
            jingZhunSheJi:"(獨)[響應]精準射擊",
            jingZhunSheJi_info:"此攻擊強制命中，但本次攻擊傷害-1。",
            juJi:"[法術]狙擊",
            juJi_info:"[水晶]目標角色手牌補到5張[強制]，額外+1[攻擊行動]",

            //魔法少女
            moBaoChongJi:'[法術]魔爆衝擊',
            moBaoChongJi_info:'<span class="tiaoJian">(棄1張法術牌[展示])</span>我方【戰績區】+1[寶石]。2名目標對手各棄一張法術牌[展示]，每有人不如此做，你對他造成2點法術傷害③、你棄1張牌。',
            moDanZhangWo:'[響應]魔彈掌握',
            moDanZhangWo_info:'你主動使用【魔彈】時可以選擇逆向傳遞。',
            moDanRongHe:'[響應]魔彈融合',
            moDanRongHe_info:'你的地系或火系牌可以當【魔彈】使用。',
            huiMieFengBao:'[法術]毀滅風暴',
            huiMieFengBao_info:'[寶石]對2名目標對手各造成2點法術傷害③。',

            //女武神
            shenShengZhuiJi:"[響應]神聖追擊",
            shenShengZhuiJi_info:"<span class='tiaoJian'>([攻擊行動]或[法術行動]結束後，移除你的1[治療])</span>額外+1[攻擊行動]。",
            zhiXuZhiYin:"[法術]秩序之印",
            zhiXuZhiYin_info:"<span class='tiaoJian'>(摸2張牌[強制])</span>你加+1[治療]並+1[水晶]。",
            hePingXingZhe:"[被動]和平行者",
            hePingXingZhe_info:"<span class='tiaoJian'>(你的回合內，發動【英靈召喚】後強制觸發[強制])</span>[橫置]，轉入【英靈形態】；<span class='tiaoJian'>(每當你執行主動攻擊時發動①)</span>[重置]脫離【英靈形態】。",
            junShenWeiGuang:"[被動]軍神威光",
            junShenWeiGuang_info:"<span class='tiaoJian'>(回合開始時，若你處於【英靈形態】)</span>選擇以下1項發動：<br>·你+1[治療]，[重置]脫離【英靈形態】；<br>·<span class='tiaoJian'>(移除我方【戰績區】X個星石，X<3)</span>目標角色+X[治療]。",
            yingLingZhaoHuan:"[響應]英靈召喚",
            yingLingZhaoHuan_info:"[水晶]<span class='tiaoJian'>(攻擊命中時發動②)</span>本次攻擊傷害額外+1，<span class='tiaoJian'>(若你額外棄置1張法術牌[展示])</span>目標角色+1[治療]。",   

            //元素師
            yuanSuXiShou:'[響應]元素吸收',
            yuanSuXiShou_info:'<span class="tiaoJian">(對目標角色造成法術傷害時發動③)</span>你+1<span class="hong">【元素】</span>。',
            yuanSuDianRan:'[法術]元素點燃',
            yuanSuDianRan_info:'<span class="tiaoJian">(移除3點</span><span class="hong">【元素】</span><span class="tiaoJian">)</span>對目標角色造成2點法術傷害③，額外+1[法術行動]；不能與【元素吸收】同時發動。',
            yunShi:'(獨)[法術]隕石',
            yunShi_info:'對目標角色造成1點法術傷害③，額外+1[法術行動]；<span class="tiaoJian">(若你額外棄1張地系牌[展示]①)</span>本次傷害額外+1。',
            bingDong:'(獨)[法術]冰凍',
            bingDong_info:'對目標角色造成1點法術傷害③，並指定1名角色+1[治療]<span class="tiaoJian">(若你額外棄1張水系牌[展示]①)</span>本次傷害額外+1。',
            huoQou:'(獨)[法術]火球',
            huoQou_info:'對目標角色造成2點法術傷害③，<span class="tiaoJian">(若你額外棄1張火系牌[展示]①)</span>本次傷害額外+1。',
            fengRen:'(獨)[法術]風刃',
            fengRen_info:'對目標角色造成1點法術傷害③，額外+1[攻擊行動]；<span class="tiaoJian">(若你額外棄1張風系牌[展示]①)</span>本次傷害額外+1。',
            leiJi:'(獨)[法術]雷擊',
            leiJi_info:'對目標角色造成1點法術傷害③，我方【戰績區】+1[寶石]；<span class="tiaoJian">(若你額外棄1張雷系牌[展示]①)</span>本次傷害額外+1。',
            yueGuang:'[法術]月光',
            yueGuang_info:'[寶石]對目標角色造成(X+1)點法術傷害③，X為你剩餘的【能量】數。',
            yuanSu:'元素',
            yuanSu_info:'</span><span class="hong">【元素】</span>為元素師專有指示物，上限為3。',

            //月之女神
            xinYueBiHu:"[響應]新月庇護[持續]",
            xinYueBiHu_info:"<span class='tiaoJian'>(我方角色因承受傷害造成手牌數超過手牌上限，導致士氣即將下降時)</span>[橫置]轉為【暗月形態】，將因此而造成的棄牌面朝下放置於角色旁，作為【暗月】。本次士氣不會下降。",
            anYueZuZhou:"[被動]暗月詛咒",
            anYueZuZhou_info:"<span class='tiaoJian'>(你每次移除【暗月】)</span>我方士氣-1；<span class='tiaoJian'>(你的【暗月】數為0時)</span>[重置]脫離【暗月形態】。",
            meiDuShaZhiYan:"[響應]美杜莎之眼",
            meiDuShaZhiYan_info:"<span class='tiaoJian'>(目標對手攻擊時①，移除1個與攻擊牌系別相應的系別的【暗月】[展示])</span>你+1[治療]，你+1<span class='lan'>【石化】</span>。<span class='tiaoJian'>(若該【暗月】為法術牌)</span>你棄1張牌，對目標對手造成1點法術傷害③。",
            yueZhiLunHui:"[響應]月之輪迴",
            yueZhiLunHui_info:"<span class='tiaoJian'>(你的回合結束時)</span>選擇以下一項發動：<br>·<span class='tiaoJian'>(移除1個【暗月】)</span>目標角色+1[治療]；<br>·<span class='tiaoJian'>(移除你的1[治療])</span>你+1<span class='hong'>【新月】</span>。",
            yueDu:"[響應]月瀆[回合限定]",
            yueDu_info:"<span class='tiaoJian'>(目標角色承受你造成的法術傷害⑥後，移除你的1[治療])</span>對目標對手造成1點法術傷害③。",
            anYueZhan:"[響應]暗月斬",
            anYueZhan_info:"[水晶]<span class='tiaoJian'>(僅【暗月形態】下可發動，主動攻擊命中時②，移除X個【暗月】(x<3))</span>本次攻擊傷害額外+X。",
            cangBaiZhiYue:"[法術]蒼白之月",
            cangBaiZhiYue_info:"[寶石]選擇以下一項發動：<br>·<span class='tiaoJian'>(移除3點</span><span class='lan'>【石化】</span><span class='tiaoJian'>)</span>你的下次主動攻擊對手無法應戰，額外+1[攻擊行動]。你額外獲得一個回合；<br>·移除X點<span class='hong'>【新月】</span>，你+1點<span class='lan'>【石化】</span>，棄1張牌，對目標對手造成(X+1)點法術傷害③。",
            xinYue:"新月",
            xinYue_info:"<span class='hong'>【新月】</span>為月之女神專有指示物，上限為2。",
            shiHua:"石化",
            shiHua_info:"<span class='lan'>【石化】</span>為月之女神專有指示物，上限為3。",
            anYue:"暗月",
            anYue_info:"【暗月】為月之女神專用蓋牌，無上限。",
            
            //仲裁者
            zhongCaiFaZe:"[被動]仲裁法則",
            zhongCaiFaZe_info:"遊戲初始時。你加+2[水晶]。",
            yiShiZhongDuan:"[啟動]儀式中斷",
            yiShiZhongDuan_info:"<span class='tiaoJian'>(僅【審判形態】下發動)</span>[重置]脫離【審判形態】，我方【戰績區】+1[寶石]。",
            moRiShenPan:"[法術]末日審判",
            moRiShenPan_info:"<span class='tiaojian'>(移除所有</span><span class='hong'>【審判】</span><span class='tiaojian'>)</span>對目標角色造成等量的法術傷害③；在你的行動階段開始時，若<span class='hong'>【審判】</span>已達到上限，該行動階段你必須發動【末日審判】。",
            shenPanLangChao:"[被動]審判浪潮",
            shenPanLangChao_info:"<span class='tiaoJian'>(你每承受一次傷害後⑥)</span>你+1<span class='hong'>【審判】</span>。",
            zhongCaiYiShi:"[啟動]仲裁儀式[持續]",
            zhongCaiYiShi_info:"[寶石][橫置]轉為【審判形態】，你的手牌上限恆定為5[恆定]；每次你的回合開始時，你+1<span class='hong'>【審判】</span>。",
            panJueTianPing:"[法術]判決天平",
            panJueTianPing_info:"[水晶]你+1<span class='hong'>【審判】</span>，再選擇一下一項發動：<br>·棄掉所有手牌。<br>·將你的手牌補到上限[強制]，我方【戰績區】+1[寶石]。",
            shenPan:"審判",
            shenPan_info:"<span class='hong'>【審判】</span>為仲裁者專有指示物，上限為4。",

            //冒險家
            qiZha:"[響應]欺詐",
            qiZha_info:"<span class='tiaoJian'>(棄2張同系牌[展示])</span>視為一次除暗系以外的任意系的主動攻擊，該系由你決定；或<span class='tiaoJian'>(棄3張同系牌[展示])</span>視為一次暗系的主動攻擊。",
            qiangYun:"[被動]強運",
            qiangYun_info:"<span class='tiaoJian'>(當你發動【欺詐】時)</span>你+1[水晶]。",
            diXiaFaZe:"[被動]地下法則",
            diXiaFaZe_info:"<span class='tiaoJian'>(你執行【購買】時)</span>改為【戰績區】+2[寶石]。",
            maoXianJiaTianTang:"[響應]冒險者天堂",
            maoXianJiaTianTang_info:"<span class='tiaoJian'>(你執行【提煉】時)</span>將提煉出的[寶石]和[水晶]全部交給目標隊友，然後移除你的1[能量]。",
            touTianHuanRi:"[法術]偷天換日[回合限定]",
            touTianHuanRi_backup:"[法術]偷天換日[回合限定]",
            touTianHuanRi_info:"[水晶]將對方【戰績區】的1[寶石]轉移到我方【戰績區】，或將我方【戰績區】的[水晶]全部轉換為[寶石]。額外+1[攻擊行動]或[法術行動]。",

            //聖槍騎士
            shenShengXinYang:"[被動]神聖信仰",
            shenShengXinYang_info:"<span class='tiaoJian'>(我方[星杯區]的[星杯]數不小於對方時)</span>你的[治療]上限+1。",
            huiYao:"[法術]輝耀",
            huiYao_info:"<span class='tiaoJian'>(棄1張水系牌[展示])</span>所有角色各+1[治療]，額外+1[攻擊行動]。",
            chengJie:"[法術]懲戒",
            chengJie_info:"<span class='tiaoJian'>(棄1張法術牌[展示])</span>將其他角色的1[治療]轉移給你，額外+1[攻擊行動]。",
            shengJi:"[被動]聖擊",
            shengJi_info:"<span class='tiaoJian'>(攻擊命中後發動②)</span>你+1[治療]。",
            tianQiang:"[響應]天槍",
            tianQiang_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除你的2[治療])</span>本次攻擊對手無法應戰，不能和【聖擊】同時發動。",
            diQiang:"[響應]地槍",
            diQiang_info:"<span class='tiaoJian'>(主動攻擊命中後發動②，移除你的X[治療])</span>本次攻擊傷害額外+X，X最高為4；不能和【聖擊】同時發動。",
            shengGuangQiYu:"[法術]聖光祈愈",
            shengGuangQiYu_info:"[寶石]無視你的[治療]上限為你+2[治療]，但你的[治療]最高為5，額外+1[攻擊行動]；本回合你不能再發動【天槍】。",
            
            //精靈射手
            yuanSuSheJi:"[響應]元素射擊[回合限定]",
            yuanSuSheJi_info:"<span class='tiaoJian'>(主動攻擊時①，若攻擊牌非暗系，棄1張法術牌[展示]或移除1個【祝福】)</span>根據攻擊牌類別附加以下【元素箭】效果：<br>【火之矢】：本次攻擊傷害額外+1。<br>【水之矢】：<span class='tiaoJian'>(主動攻擊命中時②)</span>目標角色+1[治療]。<br>【風之矢】：<span class='tiaoJian'>([攻擊行動]結束後)</span>額外+1[攻擊行動]。<br>【雷之矢】：本次攻擊無法應戰。<br>【地之矢】：<span class='tiaoJian'>(主動攻擊命中時②)</span>對目標角色造成1點法術傷害③。",
            yuanSuSheJi_huo:"火之矢",
            yuanSuSheJi_shui:"水之矢",
            yuanSuSheJi_feng:"風之矢",
            yuanSuSheJi_lei:"雷之矢",
            yuanSuSheJi_di:"地之矢",
            dongWuHuoBan:"[響應]動物夥伴",
            dongWuHuoBan_info:"<span class='tiaoJian'>(你的回合內，目標角色承受你造成的傷害⑥後)</span>你摸1張牌[強制]，你棄1張牌。",
            jingLingMiYi:"[啟動]精靈秘儀[持續]",
            jingLingMiYi_info:"[寶石][橫置]轉為【精靈祝福形態】，將牌堆頂的3張牌面朝下放置於角色旁作為【祝福】。此形態下你的【祝福】可視為手牌使用或打出。<span class='tiaoJian'>(你的回合結束時，若你未擁有【祝福】)</span>[重置]脫離【精靈祝福形態】，對目標角色造成2點法術傷害。",
            chongWuQiangHua:"[響應]寵物強化",
            chongWuQiangHua_info:"[水晶]<span class='tiaoJian'>(觸發【動物夥伴】時)</span>效果改為“目標角色摸1張牌[強制]，棄1張牌”。",
            zhuFu:"祝福",
            zhuFu_info:"【祝福】為精靈射手專有蓋牌，上限為3。",

            //瘟疫法師
            buXiu:"[響應]不朽",
            buXiu_info:"<span class='tiaoJian'>([法術行動]結束時發動)</span>你+1[治療]。",
            shengDu:"[被動]聖瀆",
            shengDu_info:"你的[治療]不能抵禦攻擊傷害，你的[治療]上限+3。",
            wenYi:"[法術]瘟疫",
            wenYi_info:"<span class='tiaoJian'>(棄1張地系牌[展示])</span>對所有其他角色各造成1點法術傷害③；<span class='tiaoJian'>(若因此造成士氣下降)</span>回合結束時，你+1[治療]。",
            siWangZhiChu:"[法術]死亡之觸",
            siWangZhiChu_info:"<span class='tiaoJian'>(移除你的X[治療]並棄Y張同系牌[展示]，X，Y的數值由你決定，但每項最少為2)</span>對目標角色造成(X+Y-3)點傷害③，不能和【不朽】同時發動。",
            siWangZhiChu_backup:"[法術]死亡之觸",
            juDuXinXing:"[法術]劇毒新星",
            juDuXinXing_info:"[寶石]對其他角色各造成2點法術傷害③，你+1[治療]。",

            //魔劍士
            xiuLuoLianZhan:"[響應]修羅連斬[回合限定]",
            xiuLuoLianZhan_info:"<span class='tiaoJian'>([攻擊行動]結束後發動)</span>額外+1火系[攻擊行動]。",
            anYingNingJu:"[啟動]暗影凝聚",
            anYingNingJu_info:"<span class='tiaoJian'>(對自己造成1點法術傷害③)</span>[橫置]持續到你的下個行動階段開始，你都處於【暗影形態】，脫離【暗影形態】時[重置]。",
            anYingZhiLi:"[被動]暗影之力",
            anYingZhiLi_info:"<span class='tiaoJian'>(僅【暗影形態】下發動)</span>你發動的所有攻擊傷害額外+1。",
            anYingKangJu:"[被動]暗影抗拒",
            anYingKangJu_info:"在你的行動階段你始終不能使用法術牌。",
            anYingLiuXing:"[法術]暗影流星",
            anYingLiuXing_info:"<span class='tiaoJian'>(僅【暗影形態】下發動，棄2張法術牌[展示])</span>對目標角色造成2點法術傷害③；<span class='tiaoJian'>(若你額外移除我方【戰績區】2星石)</span>[重置]脫離【暗影形態】，你+1[寶石]。",
            huangQuanZhengChan:"[響應]黃泉震顫[回合限定]",
            huangQuanZhengChan_info:"[寶石]<span class='tiaoJian'>(主動攻擊前發動①)</span>本次攻擊對手不能應戰，<span class='tiaoJian'>(若命中②)</span>你將手牌補至上限[強制]，然後棄2張牌。",

            //血色劍靈
            xueSeJingJi:"[被動]血色荊棘",
            xueSeJingJi_info:"<span class='tiaoJian'>(攻擊命中時②)</span>你+1<span class='hong'>【鮮血】</span>。",
            chiSeYiShan:"[響應]赤色一閃",
            chiSeYiShan_info:"<span class='tiaoJian'>([攻擊行動]結束後，移除1點</span><span class='hong'>【鮮血】</span><span class='tiaoJian'>，對自己造成2點法術傷害③)</span>額外+1[攻擊行動]。",
            xueRanQiangWei:"[法術]血染薔薇",
            xueRanQiangWei_info:"<span class='tiaoJian'>(移除2點</span><span class='hong'>【鮮血】</span><span class='tiaoJian'>)</span>移除目標角色2[治療]，將我方角色[能量區]的1[水晶]翻面為[寶石]。<span class='tiaoJian'>(若【血薔薇庭院】在場)</span>額外對所有角色造成1點法術傷害。",
            xueQiPingZhang:"[響應]血氣屏障",
            xueQiPingZhang_info:"<span class='tiaoJian'>(目標角色對你造成法術傷害③時，移除1點</span><span class='hong'>【鮮血】</span><span class='tiaoJian'>)</span>本次法術傷害-1③，對目標對手造成1點法術傷害③。",
            xueQiangWeiTingYuan:"(專)[被動]血薔薇庭院",
            xueQiangWeiTingYuan_info:"<span class='tiaoJian'>(此卡在場時)</span>所有角色的[治療]無法用於抵禦傷害；<span class='tiaoJian'>(血色劍靈的回合結束時)</span>移除此卡。",
            sanHuaLunWu:"[啟動]散華輪舞",
            sanHuaLunWu_info:"你選擇以下一項發動：<br>·[水晶]將【血薔薇庭院】放置於場上，你+2<span class='hong'>【鮮血】</span>；<br>·[寶石]將【血薔薇庭院】放置於場上，無視你的<span class='hong'>【鮮血】</span>上限為你+2<span class='hong'>【鮮血】</span>但你的<span class='hong'>【鮮血】</span>數最高為4，你棄到4張牌。",
            xianXue:"鮮血",
            xianXue_info:"<span class='hong'>【鮮血】</span>為血色劍靈專有指示物，上限為3。",

            //祈禱師
            guangHuiXinYang:"[法術]光輝信仰",
            guangHuiXinYang_info:"<span class='tiaoJian'>(僅在【祈禱形態】下發動，移除1點</span><span class='hong'>【祈禱符文】</span><span class='tiaoJian'>)</span>你棄2張牌，我方【戰績區】+1[寶石]，目標隊友+1[治療]。",
            heiAnZuZhou:"[法術]黑暗詛咒",
            heiAnZuZhou_info:"<span class='tiaoJian'>(僅在【祈禱形態】下發動，移除1點</span><span class='hong'>【祈禱符文】</span><span class='tiaoJian'>)</span>對目標角色和自己各造成2點法術傷害③。",
            weiLiCiFu:"(獨)[法術]威力賜福",
            weiLiCiFu_info:"<span class='tiaoJian'>(將威力賜福放置於目標隊友面前)</span>該隊友獲得<span class='tiaoJian'>(攻擊命中後可以移除此牌發動②)</span>本次攻擊傷害額外+2。",
            xunJieCiFu:"(獨)[法術]迅捷賜福",
            xunJieCiFu_info:"<span class='tiaoJian'>(將迅捷賜福放置於目標隊友面前)</span>該隊友獲得<span class='tiaoJian'>([法術行動]或[攻擊行動]結束時可以移除此牌發動)</span>額外+1[攻擊行動]。",
            qiDao:"[啟動]祈禱[持續]",
            qiDao_info:"[寶石][橫置]轉為【祈禱形態】，在此形態下，你每發動一次主動攻擊①，你+2<span class='hong'>【祈禱符文】</span>。",
            faLiChaoXi:"[響應]法力潮汐[回合限定]",
            faLiChaoXi_info:"[水晶]<span class='tiaoJian'>([法術行動]結束時發動)</span>額外+1[法術行動]。",
            qiDaoFuWen:"祈禱符文",
            qiDaoFuWen_info:"<span class='hong'>【祈禱符文】</span>為祈禱師專有指示物，其上限為3。",
            
            //紅蓮騎士
            xingHongShengYue:"[響應]腥紅聖約[回合限定]",
            xingHongShengYue_info:"<span class='tiaoJian'>(主動攻擊時發動①)</span>你+1[治療]。",
            xingHongXinYang:"[被動]猩紅信仰",
            xingHongXinYang_info:"你的[治療]只能抵禦自己造成的傷害，你的[治療]上限+2。",
            xueXingDaoYan:"[啟動]血腥禱言",
            xueXingDaoYan_info:"<span class='tiaoJian'>(移除你的X[治療]，對自己造成X點法術傷害③)</span>任意分配X[治療]給1~2名隊友，你+1<span class='hong'>【血印】</span>。",
            shaLuShengYan:"[響應]殺戮盛宴",
            shaLuShengYan_info:"<span class='tiaoJian'>(主動攻擊命中後發動②，移除1點</span><span class='hong'>【血印】</span><span class='tiaoJian'>對自己造成4點法術傷害③)</span>本次攻擊傷害額外+2。",
            reXueFeiTeng:"[被動]熱血沸騰",
            reXueFeiTeng_info:"<span class='tiaoJian'>(當你因承受傷害而導致我方士氣下降時強制發動[強制])</span>[橫置]轉發【熱血沸騰狀態】，該形態你因承受傷害不會導致我方士氣下降[強制]。在你的回合結束階段，若你處於此形態，[重置]並脫離此形態[強制],你+2[治療]。",
            jieJiaoJieZao:"[響應]戒驕戒躁",
            jieJiaoJieZao_info:"[水晶]<span class='tiaoJian'>(僅【熱血沸騰狀態】下，[攻擊行動]或[法術行動]結束時發動)</span>[重置]並脫離此形態，額外+1[攻擊行動]或[法術行動]。",
            xingHongShiZi:"[法術]猩紅十字",
            xingHongShiZi_info:"[水晶]<span class='tiaoJian'>(移除1點</span><span class='hong'>【血印】</span><span class='tiaoJian'>棄2張法術牌[展示]，對自己造成4點法術傷害)</span>對目標角色造成3點法術傷害③。",
            xueYin:"血印",
            xueYin_info:"<span class='hong'>【血印】</span>為紅蓮騎士專有指示物，其上限為2。",

            //英靈人形
            zhanWenZhangWo:"[被動]戰紋掌握",
            zhanWenZhangWo_info:"遊戲初始時，你擁有3個【戰紋】。【戰紋】和【魔紋】是英靈人性的專屬指示物，上限之和為3。",
            nuHuoYaZhi:"[響應]怒火壓制",
            nuHuoYaZhi_info:"<span class='tiaoJian'>(主動攻擊未命中時②)</span>翻轉1個【戰紋】，不能與【魔紋融合】同時發動。",
            zhanWenSuiJi:"[響應]戰紋碎擊",
            zhanWenSuiJi_info:"<span class='tiaoJian'>(主動攻擊命中時②，翻轉1個【戰紋】，棄X張同系牌[展示](X>1))</span>本次攻擊傷害額外+(X-1)，<span class='tiaoJian'>(若你處於【蓄勢迸發形態】下，額外翻轉Y個【戰紋】)</span>本次攻擊傷害額外+Y。",
            moWenRongHe:"[響應]魔紋融合",
            moWenRongHe_info:"<span class='tiaoJian'>(主動攻擊未命中時②，翻轉1個【魔紋】，棄X張異系牌[展示](X>1))</span>對本次攻擊的角色造成(X-1)點法術傷害③，<span class='tiaoJian'>(若你處於【蓄勢迸發形態】下，額外翻轉Y個【魔紋】)</span>本次法術傷害額外+Y。",
            fuWenGaiZao:"[啟動]符文改造",
            fuWenGaiZao_info:"[寶石][橫置]轉為【蓄勢迸發形態】，在此形態下你的手牌上限+1；摸1張牌[強制]並任意調整你的【戰紋】和【魔紋】，在你回合結束階段，[重置]並脫離此形態。",
            shuangChongHuiXiang:"[響應]雙重回響[回合限定]",
            shuangChongHuiXiang_info:"[水晶]<span class='tiaoJian'>(對目標角色造成攻擊或法術傷害時發動③)</span>對另一目標角色造成X點法術傷害③，X與本次傷害相同但最高為3。【雙重回響】的傷害不會造成士氣下降。",
            
            //神官
            shenShengQiShi:"[響應]神聖啟示",
            shenShengQiShi_info:"<span class='tiaoJian'>(【特殊行動】結束時發動)</span>你+1[治療]。",
            shenShengQiFu:"[法術]神聖祈福",
            shenShengQiFu_info:"<span class='tiaoJian'>(棄2張法術牌[展示])</span>你+2[治療]。",
            shuiZhiShenLi:"[法術]水之神力",
            shuiZhiShenLi_info:"<span class='tiaoJian'>(棄1張水系牌[展示])</span>將手中的1張牌交給目標隊友[強制]，你和他各加+1[治療]。",
            shengShiShouHu:"[被動]聖使守護",
            shengShiShouHu_info:"你的[治療]上限+4，每當你用[治療]抵擋傷害時，最多隻能使用1點。",
            shenShengQiYue:"[啟動]神聖契約",
            shenShengQiYue_info:"[水晶]將你的X[治療]轉移給目標隊友，以此法所轉移的[治療]無視他的[治療]上限，但他的[治療]最高為4。",
            shenShengLingYu:"[法術]神聖領域",
            shenShengLingYu_info:"[水晶]你棄2張牌，再選擇以下一項發動：<br>·<span class='tiaoJian'>(移除你的1[治療])</span>對目標角色造成2點法術傷害③。<br>·你+2[治療]，目標隊友+1[治療]。",
            
            //陰陽師
            shiShenJiangLin:"[法術]式神降臨[持續]",
            shiShenJiangLin_info:"<span class='tiaoJian'>(棄2張命格相同的手牌[展示])</span>[橫置]轉為【式神形態】，你+1<span class='hong'>【鬼火】</span>，額外+1[攻擊行動]。",
            yinYangZhanHuan:"[響應]陰陽轉換",
            yinYangZhanHuan_info:"<span class='tiaoJian'>(應戰攻擊時①，打出1張與攻擊牌命格相同的攻擊牌[展示])</span>你應戰此次攻擊，並將本次攻擊系別轉為與此牌相同，你+1<span class='hong'>【鬼火】</span>。<span class='tiaoJian'>(若處於【式神形態】，[重置]脫離【式神形態】)</span>本次攻擊傷害為X，X為你的<span class='hong'>【鬼火】</span>數。",
            shiShenZhuanHuan:"[響應]式神轉換",
            shiShenZhuanHuan_info:"<span class='tiaoJian'>(與【陰陽轉換】同時發動)</span>你摸1張牌[強制]，你+1<span class='hong'>【鬼火】</span>。",
            heiAnJiLi:"[被動]黑暗祭禮",
            heiAnJiLi_info:"<span class='tiaoJian'>(你的回合結束時，若</span><span class='hong'>【鬼火】</span><span class='tiaoJian'>達到上限)</span>移除所有<span class='hong'>【鬼火】</span>，對目標角色造成2點法術傷害③。",
            shiShenZhouShu:"[響應]式神咒束",
            shiShenZhouShu_info:"<span class='tiaoJian'>(目標隊友受到主動攻擊時①，若此攻擊可應戰且你處於【式神形態】，打出1張合理的應戰攻擊牌[展示]，移除我方【戰績區】1[寶石]1[水晶])</span>將本次攻擊目標變更為你，且視為你使用此牌執行應戰攻擊。",
            shengMingJieJie:"[法術]生命結界",
            shengMingJieJie_backup:"[法術]生命結界",
            shengMingJieJie_info:"[水晶]你+1<span class='hong'>【鬼火】</span>，選擇以下一項發動：<br>·目標隊友+1[寶石]並+1[治療]；然後對自己造成X點法術傷害③，X為你的<span class='hong'>【鬼火】</span>數。(若X為3)本次法術傷害③不會造成我方士氣下降。<br>·<span class='tiaoJian'>(僅【式神形態】下，棄2張命格相同的手牌[展示])</span>[重置]脫離【式神形態】目標隊友棄1張牌。",
            guiHuo:"鬼火",
            guiHuo_info:"<span class='hong'>【鬼火】</span>為陰陽師專有指示物，上限為3。",
            
            //蒼炎魔女
            cangYanFaDian:"[法術]蒼炎法典",
            cangYanFaDian_info:"<span class='tiaoJian'>(棄1張火系牌[展示])</span>對目標角色和自己造成2點法術傷害③。",
            tianHuoDuanKong:"[法術]天火斷空",
            tianHuoDuanKong_info:"<span class='tiaoJian'>(棄2張火系牌[展示]，移除1點</span><span class='hong'>【重生】</span><span class='tiaoJian'>)</span>對目標角色和自己造成3點法術傷害③，<span class='tiaoJian'>(若我方士氣落後於該目標)</span>本次法術傷害額外+1[強制]。",
            moNvZhiNu:"[啟動]魔女之怒",
            moNvZhiNu_info:"<span class='tiaoJian'>(手牌<4張時)</span>[橫置]摸0-2張牌，數值由你決定，持續到你的下個行動階段開始前，你都處於【烈焰形態】，在此形態下你的所有除水系和暗系外的攻擊牌均視為火系[強制]，你釋放【天火斷空】時無需消耗<span class='hong'>【重生】</span>，你的手牌上限+(X-2)(X為你的<span class='hong'>【重生】</span>數量)；脫離【烈焰形態】時[重置]。",
            tiShenWanOu:"[響應]替身玩偶",
            tiShenWanOu_info:"<span class='tiaoJian'>(任何人對你造成攻擊傷害時③，棄1張法術牌[展示])</span>，目標隊友摸1張牌[強制]。",
            yongShengYinShiJi:"[被動]永生銀時計",
            yongShengYinShiJi_info:"<span class='tiaoJian'>(當你因承受法術傷害而造成士氣下降時)</span>，你+1<span class='hong'>【重生】</span>",
            tongKuLianJie:"[法術]痛苦鏈接",
            tongKuLianJie_info:"[水晶]對目標對手和自己各造成1點法術傷害③，然後你棄到3張牌。",
            moNengFanZhuan:"[響應]魔能反轉",
            moNengFanZhuan_info:"[水晶]<span class='tiaoJian'>(任何人對你造成法術傷害時③，棄X張法術牌[展示](X>1))</span>，對目標對手造成(X-1)點法術傷害。",
            chongSheng:"重生",
            chongSheng_info:"<span class='hong'>【重生】</span>為蒼炎魔女專有指示物，上限為4。",

            //賢者
            zhiHuiFaDian:"[被動]智慧法典",
            zhiHuiFaDian_info:"你的【能量】上限+1；<span class='tiaoJian'>(你每次承受法術傷害後⑥，若該傷害>3)</span>你+2[寶石]並棄1張牌。",
            faShuFanTan:"[響應]法術反彈",
            faShuFanTan_info:"<span class='tiaoJian'>(你每次承受法術傷害後⑥，若該傷害僅為1點，則可以棄X張同系牌[展示](X>1))</span>對目標角色造成(X-1)點法術傷害③，並對自己造成X點法術傷害③。",
            moDaoFaDian:"[法術]魔道法典",
            moDaoFaDian_info:"[寶石]<span class='tiaoJian'>(棄X張異系牌[展示](X>1))</span>對目標角色和自己各造成(X-1)點法術傷害③。",
            shengJieFaDian:"[法術]聖潔法典",
            shengJieFaDian_info:"[寶石]<span class='tiaoJian'>(棄X張異系牌[展示](X>2))</span>最多(X-2)名角色各+2[治療]，並對自己造成(X-1)點法術傷害③。",

            //魔弓
            moGuanChongJi:"[響應]魔貫衝擊",
            moGuanChongJi_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除1個火系【充能】[展示])</span>本次攻擊傷害額外+1，不能攻擊手牌達到上限的對手；<span class='tiaoJian'>(若命中②，額外移除1個火系【充能】[展示])</span>，本次攻擊傷害額外+1；<span class='tiaoJian'>(若未命中②)</span>對對手造成3點法術傷害③。本回合你不能發動【多重射擊】。",
            leiGuangSanShe:"[法術]雷光散射",
            leiGuangSanShe_backup:"[法術]雷光散射",
            leiGuangSanShe_info:"<span class='tiaoJian'>(移除1個雷系【充能】[展示])</span>對所有對手造成1點法術傷害③；<span class='tiaoJian'>(若你額外移除X個雷系【充能】[展示])</span>指定一名對手，本次對其攻擊傷害額外+X③。",
            duoChongSheJi:"[響應]多重射擊",
            duoChongSheJi_info:"<span class='tiaoJian'>([攻擊行動]結束時發動，移除1個風系【充能】[展示])</span>視為一次暗系的主動攻擊，但不能攻擊上次的目標且本次攻擊傷害-1；本回合你不能發動【魔貫衝擊】。",
            chongNeng:"[啟動]充能",
            chongNeng_info:"[水晶]你棄到4張牌，摸X張牌[強制]，可將自己至多X張手牌面朝下放置在你的角色旁，作為【充能】(X<5)；本回合你不能發動【魔貫衝擊】和【雷光散射】。",
            moYan:"[啟動]魔眼",
            moYan_info:"[寶石]目標角色棄1張牌或你摸3張牌[強制]，將自己1張手牌作為【充能】，你+1[水晶]。",
            chongNengPai:"充能",
            chongNengPai_info:"【充能】為魔弓專有蓋牌，上限為8",

            //魔槍
            anZhiJieFang:"[啟動]暗之解放",
            anZhiJieFang_info:"[橫置]轉為【幻影形態】，你的手牌上限恆定為5[恆定]；本回合你的下次主動攻擊傷害額外+1，但不能發動【漆黑之槍】和【充盈】。",
            huanYingXingChen:"[啟動]幻影星辰",
            huanYingXingChen_info:"<span class='tiaoJian'>(僅【幻影形態】下發動，對自己造成2點法術傷害③)</span>[重置]脫離【幻影形態】；若沒有因此造成我方士氣下降，則對目標角色造成2點法術傷害③。",
            heiAnShuFu:"[被動]黑暗束縛",
            heiAnShuFu_info:"你始終不能使用法術牌。",
            anZhiZhangBi:"[響應]暗之障壁",
            anZhiZhangBi_info:"<span class='tiaoJian'>(任何人對你造成傷害時發動③)</span>棄X張法術牌或雷系牌[展示]。",
            chongYing:"[法術]充盈",
            chongYing_info:"<span class='tiaoJian'>(棄1張法術牌或雷系牌[展示])</span>所有人各棄1張牌[展示]，我方角色可選擇不如此做，除你以外每以此法棄1張法術牌或雷系牌，本回合你的下次主動攻擊傷害額外+1；額外+1[攻擊行動]。",
            qiHeiZhiQiang:"[響應]漆黑之槍",
            qiHeiZhiQiang_info:"X[水晶]<span class='tiaoJian'>(僅【幻影形態】下，主動攻擊手牌為1或2的對手並命中後發動②)</span>本次攻擊傷害額外+(X+2)。",

            //靈符師
            lingFu_leiMing:"[法術]靈符-雷鳴",
            lingFu_leiMing_info:"<span class='tiaoJian'>(棄1張雷系牌[展示])</span>對任意2名角色各造成1點法術傷害③。",
            lingFu_fengXing:"[法術]靈符-風行",
            lingFu_fengXing_info:"<span class='tiaoJian'>(棄1張風系牌[展示])</span>指定2名角色各棄1張牌。",
            nianZhou:"[響應]唸咒",
            nianZhou_info:"每當你發動【靈符】，可將自己的1張手牌面朝下放置在你的角色旁，作為【妖力】。",
            baiGuiYeXing:"[響應]百鬼夜行",
            baiGuiYeXing_info:"<span class='tiaoJian'>(主動攻擊命中後發動②，移除1個【妖力】)</span>對目標角色造成1點法術傷害③；<span class='tiaoJian'>(若【妖力】為火系牌，可展示之[展示])</span>改為指定2名角色，對除他們以外的其他所有角色各造成1點法術傷害③。",
            lingLiBengJie:"[響應]靈力崩解",
            lingLiBengJie_info:"[水晶]<span class='tiaoJian'>(和【靈符-雷鳴】或【百鬼夜行】同時發動)</span>你的本次【靈符-雷鳴】或【百鬼夜行】每次造成的傷害額外+1。",
            yaoLi:"妖力",
            yaoLi_info:"【妖力】為靈符師專有蓋牌，上限為2；若【妖力】達到上限，則不能發動【唸咒】。",

            //吟遊詩人
            chenLunXieZouQu:"[響應]沉淪協奏曲[回合限定]",
            chenLunXieZouQu_info:"<span class='tiaoJian'>(僅【普通形態】下，一回合內我方對至少2名對手造成法術傷害③且結算之後，棄2張同系牌[展示])</span>你+1<span class='hong'>【靈感】</span>。<span class='tiaoJian'>(若棄牌中有法術牌)</span>對目標對手造成1點法術傷害③。",
            buXieHeXian:"[法術]不諧和絃",
            buXieHeXian_backup:"[法術]不諧和絃",
            buXieHeXian_info:"<span class='tiaoJian'>(移除X點</span><span class='hong'>【靈感】</span><span class='tiaoJian'>，X>1)(若你處於【永恆囚徒形態】，[重置]脫離【永恆囚徒形態】)</span>你選擇以下一項發動：<br>·你和目標角色各摸(X-1)張牌[強制]。<br>·你和目標角色各棄(X-1)張牌。",
            jinJiShiPian:"[被動]禁忌詩篇",
            jinJiShiPian_info:"<span class='tiaoJian'>(【激昂狂想曲】或【勝利交響詩】的效果結算完後)</span>根據<span class='hong'>【靈感】</span>數量：<br>·(<span class='hong'>【靈感】</span>未達上限)你+1<span class='hong'>【靈感】</span>，移除【永恆樂章】。<br> ·(<span class='hong'>【靈感】</span>已達上限)對自己造成3點法術傷害③。<span class='tiaoJian'>(若你處於【普通形態】)</span>[橫置]轉為【永恆囚徒形態】。",
            yongHengYueZhangX:"(專)永恆樂章",
            yongHengYueZhangX_info:`
            <span class="greentext">[響應]激昂狂想曲</span><br>
            <span class='tiaoJian'><span class='tiaoJian'>(回合開始時若你擁有【永恆樂章】)</span>選擇以下一項執行：<br>·吟遊詩人對2名目標對手各造成1點法術傷害③。 <br>·你棄2張牌。<br>
            <span class="greentext">[響應]勝利交響詩</span><br>
            <span class='tiaoJian'><span class='tiaoJian'>(回合結束時若你擁有【永恆樂章】)</span>選擇以下一項執行<br>·將我方【戰績區】的1個星石提煉成為你的能量。<br>·為我方【戰績區】+1[寶石]，你+1[治療]。
            `,
            yongHengYueZhang_jiAngKuangXiangQu:"[響應]激昂狂想曲",
            yongHengYueZhang_shengLiJiaoXiangShi:"[響應]勝利交響詩",
            xiWangFuGeQu:"[啟動]希望賦格曲",
            xiWangFuGeQu_info:"[水晶]你可以選擇摸1張牌，如果【永恆樂章】不在場，則將【永恆樂章】放置於目標隊友面前；否則將【永恆樂章】轉移給我方另一名目標角色，你棄1張牌，+1[治療]或+1<span class='hong'>【靈感】</span>。",
            lingGan:"靈感",
            lingGan_info:"<span class='hong'>【靈感】</span>為吟遊詩人的專有指示物，上限為3。",

            //勇者
            yongZheZhiXin:"[被動]勇者之心",
            nuHou:"[響應]怒吼",
            jinPiLiJin:"[被動]精疲力竭",
            mingJingZhiShui:"[響應]明鏡止水",
            tiaoXin:"(專)[法術]挑釁",
            tiaoXinX:"挑釁-結束回合",
            tiaoXinX_kaiShi:"挑釁-開始",
            tiaoXinX_qiDongQian:"挑釁-啟動前",
            tiaoXinX_qiDongHou:"挑釁-啟動後",
            jinDuanZhiLi:"[響應]禁斷之力",
            siDou:"[響應]死鬥",
            nuQi:"怒氣",
            zhiXing:"知性",
            yongZheZhiXin_info:"遊戲初始時，你+2[水晶]。",
            nuHou_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除1點</span><span class='hong'>【怒氣】</span><span class='tiaoJian'>)</span>你可以摸1張牌，本次攻擊傷害額外+2；<span class='tiaoJian'>(若未命中②)</span>你+1<span class='lan'>【知性】</span>。",
            jinPiLiJin_info:"<span class='tiaoJian'>(發動【禁斷之力】後強制觸發[強制])</span>[橫置]額外+1[攻擊行動]；持續到你的下個行動階段開始，你的手牌上限恆定為4[恆定]。 【精疲力竭】的效果結束時[重置]，並對自己造成3點法術傷害③。",
            mingJingZhiShui_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除4點</span><span class='lan'>【知性】</span><span class='tiaoJian'>)</span>本次攻擊對手無法應戰。<span class='tiaoJian'>(本次攻擊結束時)</span>你+1[水晶]。",
            tiaoXin_info:"<span class='tiaoJian'>(移除1點</span><span class='hong'>【怒氣】</span><span class='tiaoJian'>)</span>將【挑釁】放置於目標對手面前，你+1<span class='lan'>【知性】</span>；該對手在其下個行動階段必須且只能主動攻擊你，否則他跳過該行動階段，觸發後移除此牌。",
            jinDuanZhiLi_info:"[水晶]<span class='tiaoJian'>(主動攻擊命中或未命中後發動②)</span>棄掉你所有手牌[展示]，其中每有1張法術牌，你+1<span class='hong'>【怒氣】</span>；<span class='tiaoJian'>(若未命中②)</span>其中每有1張水系牌，你+1<span class='lan'>【知性】</span>；<span class='tiaoJian'>(若命中②)</span>其中每有1張火系牌，本次攻擊傷害額外+1，並對自己造成等同於火系牌數量的法術傷害③。",
            siDou_info:"[寶石](每當你承受法術傷害時發動⑥)你+3<span class='hong'>【怒氣】</span>；<span class='tiaoJian'>(若此傷害造成士氣實際下降)</span>本次的士氣下降值恆定為1[強制]。",
            nuQi_info:"<span class='hong'>【怒氣】</span>為勇者專有指示物，上限為4。",
            zhiXing_info:"<span class='lan'>【知性】</span>為勇者專有指示物，上限為4。",

            //格鬥家
            nianQiLiChang:"[被動]念氣立場",
            xuLiYiji:"[響應]蓄力一擊",
            nianDan:"[響應]念彈",
            baiShiHuanLongQuan:"[啟動]百式幻龍拳",
            qiJueBengJi:"[響應]氣絕崩擊",
            douShenTianQu:"[啟動]鬥神天驅",
            douQi:"鬥氣",
            nianQiLiChang_info:"所有對你造成的傷害每次最高為4點③。",
            xuLiYiji_info:"<span class='tiaoJian'>(主動攻擊前發動①，+1</span><span class='hong'>【鬥氣】</span><span class='tiaoJian'>)</span>本次攻擊傷害額外+1；<span class='tiaoJian'>(若未命中②)</span>對自己造成X點法術傷害③，X為你所擁有的<span class='hong'>【鬥氣】</span>數；<span class='tiaoJian'>(若</span><span class='hong'>【鬥氣】</span><span class='tiaoJian'>已經達到上限)</span>你不能發動【蓄力一擊】。",
            nianDan_info:"<span class='tiaoJian'>([法術行動]結束時發動，+1</span><span class='hong'>【鬥氣】</span><span class='tiaoJian'>)</span>，對目標對手造成1點法術傷害③，<span class='tiaoJian'>(若發動前對方的[治療]為0)</span>對自己造成X點法術傷害③，X為你擁有的<span class='hong'>【鬥氣】</span>數；<span class='tiaoJian'>(若</span><span class='hong'>【鬥氣】</span><span class='tiaoJian'>已達到上限)</span>你不能發動【念彈】。",
            baiShiHuanLongQuan_info:"[持續]<span class='tiaoJian'>(移除3點</span><span class='hong'>【鬥氣】</span><span class='tiaoJian'>)</span>[橫置]你的所有主動攻擊傷害額外+2，所有應戰攻擊傷害額外+1 ；在你接下來的行動階段，你不能執行[法術行動]和[特殊行動]；你的主動攻擊必須以同一名角色為目標，並且不能發動【蓄力一擊】；若不如此做，則取消【百式幻龍拳】的效果並[重置]。",
            qiJueBengJi_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除1點</span><span class='hong'>【鬥氣】</span><span class='tiaoJian'>)</span>本次攻擊對方無法應戰，然後對自己造成X點法術傷害③，X為你的<span class='hong'>【鬥氣】</span>數；不能和【蓄力一擊】同時發動。",
            douShenTianQu_info:"[水晶]你棄到3張牌，+2[治療]。",
            douQi_info:"<span class='hong'>【鬥氣】</span>為格鬥家專有指示物，上限為6",

            //聖弓
            tianZhiGong:"[被動]天之弓",
            shengXieJuBao:"[法術]聖屑颶暴",
            shengHuangJiangLin:"[法術]聖煌降臨[持續]",
            shengHuangJiangLin_backup:"[法術]聖煌降臨[持續]",
            shengGuangBaoLie:"[法術]聖光爆裂",
            shengGuangBaoLie_backup:"[法術]聖光爆裂",
            liuXingShengDan:"[響應]流星聖彈",
            shengHuangHuiGuangPao:"[法術]聖煌輝光炮",
            ziDongTianChong:"[被動]自動填充",
            xinYang:"信仰",
            shengHuangHuiGuangPaoX:"聖煌輝光炮",
            
            tianZhiGong_info:"遊戲初始時，你+2[水晶]，你+1【聖煌輝光炮】。你的[治療]上限+1。 <span class='tiaoJian'>(主動攻擊時，若攻擊牌不為聖類命格)</span>本次攻擊傷害-1；<span class='tiaoJian'>(主動攻擊命中時，若攻擊牌為聖類命格)</span>你+1<span class='hong'>【信仰】</span>。",
            shengXieJuBao_info:"<span class='tiaoJian'>(棄2張同系攻擊牌[展示])</span>視為一次聖類命格的該系主動攻擊。 <span class='tiaoJian'>(若攻擊未命中②，移除X點[治療]，X最高為2)</span>目標隊友棄X張牌。",
            shengHuangJiangLin_info:"<span class='tiaoJian'>(移除你的2個[治療]或2點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>)</span>[橫置]，轉為【聖煌形態】，額外+1[法術行動]。此形態下，你若執行【特殊行動】，則[重置]脫離【聖煌形態】並+1[治療]或+1<span class='hong'>【信仰】</span>。",
            shengGuangBaoLie_info:"<span class='tiaoJian'>(僅【聖煌形態】下可發動)</span>你選擇以下一項發動：<br>·摸1張牌[強制]，移除你的1點[治療]，你+1<span class='hong'>【信仰】</span>，目標隊友+1[治療]。 <br>·<span class='tiaoJian'>(移除你的X[治療]，選擇最多X名手牌數不大於你手牌數-X的對手)</span>你棄X張牌，然後對他們各造成(Y+2)點攻擊傷害。 Y為目標數中擁有[治療]的人數。",
            liuXingShengDan_info:"<span class='tiaoJian'>(僅【聖煌形態】下，主動攻擊前①，移除你的1點[治療]或是1點<span class='hong'>【信仰】</span>)</span>我方目標角色+1[治療]。",
            shengHuangHuiGuangPao_info:"<span class='tiaoJian'>(僅【聖煌形態】下可發動，移除1點</span><span class='lan'>【聖煌輝光炮】</span><span class='tiaoJian'>，移除4點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，並額外移除等同我方落後士氣的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>數)</span>所有角色將手牌調整為4張，我方【星杯區】+1[星杯]，然後將一方[士氣]調整與另一方相同。",
            ziDongTianChong_info:"<span class='tiaoJian'>(你的回合結束時，若你未執行【特殊行動】)</span>你選擇以下一項發動：<br>·[水晶]你+1<span class='hong'>【信仰】</span>或+1[治療]。 <br>·[寶石]你+1[水晶]，+2<span class='hong'>【信仰】</span>或+2[治療]。",
            xinYang_info:"<span class='hong'>【信仰】</span>為聖弓專有指示物，上限為10。",
            shengHuangHuiGuangPaoX_info:"<span class='lan'>【聖煌輝光炮】</span>為聖弓專有指示物，上限為1。",

            //劍帝
            jianHunShouHu:"[被動]劍魂守護",
            yangGong:"[被動]佯攻",
            jianQiZhan:"[響應]劍氣斬",
            tianShiZhiHun:"[響應]天使之魂",
            eMoZhiHun:"[響應]惡魔之魂",
            buQuYiZhi:"[響應]不屈意志",
            jianHun:"劍魂",
            jianQi:"劍氣",
            jianHunShouHu_info:"<span class='tiaoJian'>(主動攻擊未命中時發動②)</span>將本次打出的攻擊牌作為面朝下放置在你的角色旁，作為【劍魂】。若你現有能量為單數，你的所有【劍魂】視為【天使之魂】；若為雙數，視為【惡魔之魂】；若沒有能量，則不屬於任何一種。 <span class='tiaoJian'>(若【劍魂】達到上限)</span>你不能發動【劍魂守護】。",
            yangGong_info:"<span class='tiaoJian'>(主動攻擊未命中時發動②)</span>你+1<span class='hong'>【劍氣】</span>。",
            jianQiZhan_info:"<span class='tiaoJian'>(主動攻擊命中後發動②，移除X點<span class='hong'>【劍氣】</span>，X最高為3)</span>對除你所攻擊的目標以外的任意一名角色造成X點法術傷害③。",
            tianShiZhiHun_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除1張【天使之魂】)</span>本次攻擊若命中②，你+2[治療]；若未命中②，我方+1士氣；不能和【劍魂守護】同時發動。",
            eMoZhiHun_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除1張【惡魔之魂】)</span>本次攻擊傷害額外+1；若未命中②，你+2<span class='hong'>【劍氣】</span>；不能和【劍魂守護】同時發動。",
            buQuYiZhi_info:"[水晶]<span class='tiaoJian'>([攻擊行動]結束時發動)</span>你摸1張[強制]，+1<span class='hong'>【劍氣】</span>，額外+1[攻擊行動]。",
            jianHun_info:"【劍魂】為劍帝專有蓋牌，上限為3。",
            jianQi_info:"<span class='hong'>【劍氣】</span>為劍帝專有指示物，上限為5。",
          
            //獸靈武士
            wuZheCanXin:"[響應]武者殘心[回合限定]",
            yiJiWuNian:"[響應]一擊無念",
            shouHunYiNian:"[被動]獸魂意念",
            shouHunJingJie:"[響應]獸魂警戒[持續]",
            shouFan:"[響應]獸反",
            yuHunLiuJuHeXingTai:"[被動]御魂流居合形態",
            niFanJuHeZhan:"[響應]逆反居合斬",
            yuHunLiuJuHeShi:"[啟動]御魂流居合形態[持續]",
            shouHun:"獸魂",
            canXin:"殘心",
            
            wuZheCanXin_info:"<span class='tiaoJian'>([攻擊行動]結束時)</span>你+1<span class='hong'>【殘心】</span>。",
            yiJiWuNian_info:"<span class='tiaoJian'>([攻擊行動]結束後，移除4點</span><span class='hong'>【殘心】</span><span class='tiaoJian'>)</span>額外+1[攻擊行動]，本次攻擊無視【聖盾】且無法用【聖光】抵擋。 <span class='tiaoJian'>(若攻擊牌為技類命格)</span>本次攻擊強制命中。",
            shouHunYiNian_info:"<span class='tiaoJian'>(你每移除1點</span><span class='lan'>【獸魂】</span><span class='tiaoJian'>)</span>你+1<span class='hong'>【殘心】</span>；<span class='tiaoJian'>(僅【普通形態】下，主動攻擊命中時②)</span>你+1<span class='lan'>【獸魂】</span>。",
            shouHunJingJie_info:"<span class='tiaoJian'>(其他角色的[橫置]效果結算完成後，移除1點</span><span class='lan'>【獸魂】</span><span class='tiaoJian'>，[橫置]轉為【御魂流居合形態】)</span>目標角色棄1張牌[展示]；<span class='tiaoJian'>(若棄牌為法術牌)</span>你+1<span class='lan'>【獸魂】</span>。",
            shouFan_info:"<span class='tiaoJian'>(目標角色對你造成法術傷害③時，移除X點</span><span class='lan'>【獸魂】</span><span class='tiaoJian'>)</span>你棄X張牌，他棄1張牌；<span class='tiaoJian'>(若他的棄牌為法術牌)</span>你+1<span class='lan'>【獸魂】</span>。",
            yuHunLiuJuHeXingTai_info:"在此形態下，你對[橫置]的目標角色攻擊傷害+1。你回合結束前-1<span class='lan'>【獸魂】</span>。 <span class='tiaoJian'>(其他角色承受你造成的傷害時⑥，或你的回合結束時</span><span class='lan'>【獸魂】</span><span class='tiaoJian'>為0)</span>[轉正]脫離御魂流居合形態。",
            niFanJuHeZhan_info:"<span class='tiaoJian'>(僅【御魂流居合形態】下，攻擊手牌<4的對手前①發動)</span>移除X點<span class='lan'>【獸魂】</span>。本次攻擊命中時②，改為攻擊目標棄置<span class='tiaoJian'>(X+2)</span>張手牌。 <span class='tiaoJian'>(若因此棄牌數小於X+2)</span>對方士氣-1。",
            yuHunLiuJuHeShi_info:"[寶石]無視你的<span class='lan'>【獸魂】</span>上限+1<span class='lan'>【獸魂】</span>，你可選擇摸或棄1張牌；<span class='tiaoJian'>(若你處於【御魂流居合形態】)</span>你+1<span class='hong'>【殘心】</span>；<span class='tiaoJian'>(若你處於[普通型態])</span>[橫置]轉為【御魂流居合形態】。",
            shouHun_info:"<span class='lan'>【獸魂】</span>為獸靈武士專有指示物，上限為2。",
            canXin_info:"<span class='hong'>【殘心】</span>為獸靈武士專有指示物，上限為4。",

            //靈魂術士
            lingHunTunShi:"[被動]靈魂吞噬",
            lingHunZhaoHuan:"[法術]靈魂召還",
            lingHunZhuanHuan:"[響應]靈魂轉換",
            lingHunJingXiang:"[法術]靈魂鏡像",
            lingHunZhenBao:"(獨)[法術]靈魂震爆",
            lingHunFuYu:"(獨)[法術]靈魂賦予",
            lingHunLianJie:"(專)[啟動]靈魂鏈接",
            lingHunLianJie_xiaoGuo:"(專)靈魂鏈接",
            lingHunZengFu:"[啟動]靈魂增幅",
            huangSeLingHun:"黃色靈魂",
            lanSeLingHun:"藍色靈魂",

            lingHunTunShi_info:"<span class='tiaoJian'>(我方每有1點士氣下降)</span>你+1<span class='hong'>【黃色靈魂】</span>。",
            lingHunZhaoHuan_info:"<span class='tiaoJian'>(棄X張法術牌[展示])</span>你+X點<span class='lan'>【藍色靈魂】</span>。",
            lingHunZhuanHuan_info:"<span class='tiaoJian'>(你每發動1次主動攻擊①)</span>可轉換1點你擁有的[靈魂]的顏色。",
            lingHunJingXiang_info:"<span class='tiaoJian'>(移除2點</span><span class='hong'>【黃色靈魂】</span><span class='tiaoJian'>)</span>你棄2張牌，目標角色摸2張牌[強制]，但最多補到其手牌上限。",
            lingHunZhenBao_info:"<span class='tiaoJian'>(移除3點</span><span class='hong'>【黃色靈魂】</span><span class='tiaoJian'>)</span>對目標角色造成3點法術傷害③，若他手牌<3且手牌上限>5，則本次傷害額外+2。",
            lingHunFuYu_info:"<span class='tiaoJian'>(移除3點</span><span class='lan'>【藍色靈魂】</span><span class='tiaoJian'>)</span>目標角色+2[寶石]。",
            lingHunLianJie_info:"<span class='tiaoJian'>(若你隊友數>1時可發動,移除1點</span><span class='hong'>【黃色靈魂】</span><span class='tiaoJian'>和1點【藍色靈魂】)</span>將【靈魂鏈接】放置於一名隊友面前，<span class='tiaoJian'>(每當你們之間有人承受傷害時⑥，移除X點</span><span class='lan'>【藍色靈魂】</span><span class='tiaoJian'>)</span>將X點傷害轉移給另1人，轉移後的傷害為法術傷害⑥。",
            lingHunZengFu_info:"[寶石]你+2<span class='hong'>【黃色靈魂】</span>和2<span class='lan'>【藍色靈魂】</span>。",
            huangSeLingHun_info:"<span class='hong'>【黃色靈魂】</span>為靈魂術士專有指示物，上限為6。",
            lanSeLingHun_info:"<span class='lan'>【藍色靈魂】</span>為靈魂術士專有指示物，上限為6。",
            
            //血之巫女
            xueZhiAiShang:"[啟動]血之哀傷",
            liuXue:"[被動]流血[持續]",
            niLiu:"[法術]逆流",
            xueZhiBeiMing:"(獨)[法術]血之悲鳴",
            tongShengGongSi:"(專)[法術]同生共死",
            xueZhiZuZhou:"[法術]血之詛咒",

            xueZhiAiShang_info:"<span class='tiaoJian'>(對自己造成2點法術傷害③)</span>轉移同生共死的目標或是移除【同生共死】。",
            liuXue_info:"[持續]<span class='tiaoJian'>(當你在【普通形態】下，因承受傷害而導致我方士氣減少時強制發動[強制])</span>[橫置]轉為【流血形態】，你+1[治療]。此形態下在你的每次回合開始時，對自己造成1點法術傷害③。 <span class='tiaoJian'>(自身手牌<3時強制發動[強制])</span>[重置]脫離【流血形態】。",
            niLiu_info:"<span class='tiaoJian'>(僅【流血形態】下發動)</span>你棄2張牌，你+1[治療]。",
            xueZhiBeiMing_info:"<span class='tiaoJian'>(僅【流血形態】下發動)</span>對目標角色和自己各造成(X+1)點法術傷害③，X<3。",
            tongShengGongSi_info:"<span class='tiaoJian'>(你摸2張牌[強制])</span>將【同生共死】放置於目標角色面前。<span class='tiaoJian'>(在【普通形態】下)</span>你和他手牌上限各-2。<span class='tiaoJian'>(在【流血形態】下)</span>你和他手牌上限各+1。",
            xueZhiZuZhou_info:"[寶石]對目標角色造成2點法術傷害③，你棄3張牌。",

            //蝶舞者
            shengMingZhiHuo:"[被動]生命之火",
            wuDong:"[法術]舞動",
            duFen:"[響應]毒粉",
            chaoSheng:"[響應]朝聖",
            jingHuaShuiYue:"[響應]鏡花水月",
            diaoLing:"[響應]凋零",
            diaoLing2:"[響應]凋零",
            yongHua:"[法術]蛹化",
            daoNiZhiDie:"[法術]倒逆之蝶",
            jian:"繭",
            DWZyong:"蛹",

            shengMingZhiHuo_info:"你的手牌上限-X，X為你擁有的<span class='hong'>【蛹】</span>的數量，但你的手牌上限最少為3。",
            wuDong_info:"<span class='tiaoJian'>(摸1張牌[強制]或棄 1 張牌[強制])</span>將牌庫頂的1張牌面朝下放置在你角色旁，作為【繭】。",
            duFen_info:"<span class='tiaoJian'>(每當有角色產生1點實際法術傷害時發動⑤，移除1個【繭】)</span>該次傷害額外+1。",
            chaoSheng_info:"<span class='tiaoJian'>(每當你承受傷害時發動⑥，移除1個【繭】)</span>抵禦1點該來源的傷害。",
            jingHuaShuiYue_info:"<span class='tiaoJian'>(每當有角色承受2點實際法術傷害前發動⑤，移除2張同系【繭】[展示])</span>抵禦該次傷害，你對他造成2次法術傷害③，每次傷害為1點。",
            diaoLing_info:"<span class='tiaoJian'>(你每次移除【繭】時，若為法術牌，可展示之[展示])</span>你對目標角色造成1點法術傷害③，再對自己造成2點法術傷害③；此技能發動後，直到你下個回合開始前，對方的士氣最少為1[強制]。",
            yongHua_info:"[寶石]<span class='tiaoJian'>(你+1</span><span class='hong'>【蛹】</span><span class='tiaoJian'>)</span>將牌庫頂的4張牌面朝下放置在你角色旁，作為【繭】。",
            daoNiZhiDie_info:"[水晶]你棄2張牌，再選擇以下1項發動：<br>·對目標角色造成1點法術傷害③，該傷害不能用[治療]抵禦。<br> ·<span class='tiaoJian'>(移除2個【繭】或對自己造成4點法術傷害③)</span>移除1個<span class='hong'>【蛹】</span>。",
            jian_info:"【繭】為蝶舞者專有蓋牌，上限為8。",
            DWZyong_info:"<span class='hong'>【蛹】</span>為蝶舞者專有指示物，無上限。",
		},
	};
});
