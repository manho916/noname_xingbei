import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
    return {
        name:'poXiao',
        connect:true,
        characterSort:{
            poXiao:{
                "1xing":['youXia','tianmaqishi','shengtangcike','dasiji','lianjinshushi','xuetianshi','shouwangzhe'],
                "1.5xing":['fengbaozhizhengguan','longqitongshuai'],
                "2xing":['zhanXingJia','jianwuzhe','wudoujia','qumozhe','xingwenshi','anzhiwangnv','huangjiashiwei','zhoushushi','beifangzhuzhe','youhunfashi','dadiwushi'],
                "2.5xing": ['longzhiqiyuezhe','zhangejisi'],
                "3xing":['shuangxuegongzhu','longyuzhe'],
                "3.5xing":['caijuezhe'],
                "4xing":['xinlingsushi','zhenLongNvWang'],
            }
        },
        character: {
            youXia: ["youXia_name","jiGroup",1,["zhuiFengJi","zhuRiJian","lingDongZhiWu"]],
            zhanXingJia: ["zhanXingJia_name","yongGroup",2,["zhanPuWeiLai","lieHuoFenShen","hanBingHuTi","leiTingZhiNu","guangYingJiaoCuo","daYuYanShu"]],
            tianmaqishi: ["tianmaqishi_name","jiGroup",1,["jianta","zhuixing"]],
            shengtangcike: ["shengtangcike_name","jiGroup",1,["zhuiYingJi","tiGu"]],
            dasiji: ["dasiji_name","shengGroup",1,["shengGuangShanYao","jiuShu","shenShengCaiJue"]],
            lianjinshushi: ["lianjinshushi_name","yongGroup",1,["tanLanZhiXin","wanWuYanMie"]],
            xuetianshi: ["xuetianshi_name","xueGroup",1,["lieDiMaiChong","lianLeiDiYu","shiXueZhiXin"]],
            xinlingsushi: ["xinlingsushi_name","huanGroup",4,["huanXiangChongJi","xinLingFengBao","zhenShiHuanJue","gaiBianShiJie"]],
            zhenLongNvWang: ["zhenLongNvWang_name","longGroup",4,["yuanGuJinZhi","zhenLongJueXing","longHunShouHu","longShenEnHui","longWangZhiLi","shengLongWeiYa","baiWanLongYan","longZuFuXing","longKuangMiSuo","longMaiShuFu","longYuFengYin","yuLongJieJie"]],
            caijuezhe: ["caijuezhe_name","shengGroup","3/4",["zhengYiZhuiJi","caiJueZhiXin","zhenLiCaiJue","songZhongDaoFeng","wuJinZhiRen"]],
            jianwuzhe: ["jianwuzhe_name","yongGroup",2,["weiJianErSheng","duiJianErShi","jianWuYiShi"]],
            shuangxuegongzhu: ["shuangxuegongzhu_name","shengGroup",3,["bingShuangLingYu","shuiJingDaoQiang","lingFengZhuFu","shuangYuZhiHuan"]],
            shouwangzhe: ["shouwangzhe_name","shengGroup",1,["huJiaoZhiXin","wuJinZhuiJi","jingZhunJuJi"]],
            wudoujia: ["wudoujia_name","jiGroup",2,["zhiYueZhiHuan","sheShenZhiDao","jianRenZhiZhi"]],
            fengbaozhizhengguan: ["fengbaozhizhengguan_name","jiGroup","1/2",["baoFengLingYu","yiZheng","jiFengZhouYu"]],
            longzhiqiyuezhe: ["longzhiqiyuezhe_name","longGroup","2/3",["juLongZhiLi","longZuZunYan","longXueQinYe","longXueZhuoShao","xingHongBaiLongBa"]],
            longqitongshuai: ["longqitongshuai_name","longGroup","1/2",["xiaoTianLongQiang","juLongBenTeng"]],
            qumozhe: ["qumozhe_name","huanGroup",2,["xieMoXiaoSan","jingHuaDaDi","yuanSuChongSheng"]],
            longyuzhe: ["longyuzhe_name","longGroup",3,["longZuZhenYan","shangGuMiYu","longHunNingShi"]],
            youhunfashi: ["youhunfashi_name","huanGroup",2,["zhaiBian","mingHuo","fuShi","youHunFenShen"]],
            dadiwushi: ["dadiwushi_name","xueGroup",2,["diMaiZhiLi","poXieZhan","shengShengBuXi","gaiYaHuaShen"]],
            beifangzhuzhe: ['beifangzhuzhe_name',"huanGroup",2,["xiaoChouDeBaXi","wuTaiMoShuShi","guiPai"]],
            xingwenshi: ["xingwenshi_name","huanGroup",2,["xingChenShouHu","mingYunDiaoKe","xingWenYongDong"]],
            anzhiwangnv: ["anzhiwangnv_name","xueGroup",2,["anZhiWanGe","zhenHunQu","eShaGuangMing"]],
            huangjiashiwei: ["huangjiashiwei_name","shengGroup",2,["xiSheng","shenShengHuWei","shenShengBiHu","jueDiFanJi"]],
            zhoushushi: ["zhoushushi_name","xueGroup",2,["lingHunShouGe","zhouShuJiDang","zhouFu"]],
            zhangejisi: ["zhangejisi_name","yongGroup","2/3",["zhanZhengGeYao","zhanYiGongMing","xiWangZhiGe","yingXiongZhanGe"]]
        },
        characterIntro: {
            youXia: "與活躍於正面戰場之上的其他作戰部隊不同，人數不多的叢林守護者作為戰技殿堂的特種精英部隊基本都是擔負著特種作戰和游擊偵查的任務，極夜之戰中恰恰是這支不起眼的力量反而成為了敵人後方夢魘般的存在。因為作戰的特殊性質，這支部隊在快速機動和單兵作戰能力上非常突出，溫蒂斯作為叢林守護者部隊的首領更是將這種特點發揮到了極致，同時繼承了精靈血脈和神兵弗雷斯特的她就像一柄最鋒利的匕首，每次都能毫無偏差的插入敵人最薄弱的地方。",
            zhanXingJia: "作為詠歌城的首席占星家，蒂雅擁有著令人難以想象的天賦，由他所創造的快速占卜法術讓占星家真正有了在戰場上正面作戰的能力，這對於星象法術的貢獻可謂是居功至偉。但由於深知關於命運法術的難測與危險性，與其兄斯通的分歧日益嚴重，並最終因他錯誤的決定導致了兩人反目成仇。而斯通的叛逃，一直是蒂雅心中最大的陰影。",
            tianmaqishi: "騎士，一個古老的稱號，比起這個稱號所具有的實際意義，更重要的是對於這個稱號被授予人的肯定和讚揚。雖然隨著古老帝國的沒落和衰亡，這個名詞似乎已經只能在歷史書中見到了，但無論從任何方面來說，伊莎貝拉都是能夠而且應當承擔的起這個古老而又光榮的稱號的，為人正直，鋤強扶弱，對部下愛護有加，信奉公平與正義的信念，最重要的是在戰場上身先士卒的精神和百戰不殆的意志，讓她成為了戰技殿堂無比堅實的利刃，碾碎一切敢於阻擋在她面前的敵人。",
            shengtangcike: "殘月明面上作為類似外交官的存在，暗地裡卻執行著裁決者一樣的任務，作為戰技殿堂最高戰力之一，本身卻是出身於神聖教廷這種奇怪的問題，其中的知情者卻都對此諱莫如深，殘月的真實身份這也成為了兩個超級勢力之間最頂級的機密之一。殘月在暗殺術上的天賦和造詣高的驚人，加上她本身作為聖戰士時便練就的高超技藝，以及擅長正面戰鬥的風格，為刺客這個職業開創了一個嶄新的時代。",
            dasiji: "羅德里格斯是神聖教廷中極為罕見的另類天才，他作為一名聖戰士在教廷的戰場上立下赫赫戰功，但在少年得意時突然轉職為純粹的神職人員，在經過十幾年的默默無聞之後，他又在教廷危難之際挺身而出，一齣手便發揮了決定性的逆轉作用，並被教皇授予“聖·羅德里格斯”的封號。如今的他雖然退居幕後，成為了神聖教廷的神職者們導師一般的角色，但大家依然相信，在教廷遭遇危機之時，他必然會毫不猶豫地再次出手，締造新的傳奇。",
            lianjinshushi: "詠歌城向來以怪才層出著名，但即使這樣，被成為怪異學者的“陶”也是其中極為特殊的存在。單獨一人研習上次大戰之中，由異次元傳入的被稱為科學的奇異法術，並且成功開發了像萬物湮滅這樣的超越禁咒的法術，讓人不禁懷疑他那沉靜靦腆的外表之下究竟有著多麼瘋狂而躁動的內心。",
            xuetianshi: "對於神聖教廷來說，希拉的墮落是個徹頭徹尾的悲劇，沒有誰比曾經作為最傑出的戰鬥天使的她更瞭解神聖教廷戰鬥序列的弱點和缺陷了。雖然就連她的召喚者也不敢相信自己能夠召喚這位經歷過那場傳奇戰役的傳說般的存在，但這件事情就是這樣毫無邏輯的發生了。希拉在平靜的狀態下幾乎看不出一丁點墮落天使的樣子，但在戰鬥的時候那濃郁的毀滅氣息幾乎都能夠讓她的對手直接窒息。",
            xinlingsushi: "對於勝利為主要目的而不擇手段的人，被稱之為勝負師，而將這一切運用到極致的艾莉西婭，完全無愧於命運勝負師的這一稱號。對於心靈魔法下屬的魅惑魔法、暗示魔法、命令魔法以及支配魔法全部精通的她來說，利用這些能力將他人操縱於鼓掌之中甚至已經成為了一種習慣。對於這次的龍族入侵，艾西莉婭自然不會放棄這個為自己和幻影聯盟謀取利益的絕好機會，沒人知道她究竟有什麼打算，但所有人都相信，她的所作所為會永遠的改變整個世界。",
            zhenLongNvWang: "通過血統革命推翻龍族長老會的統治的領軍人物，並且擔任龍魂帝國的第一任女王，雖然是人類和龍族的混血種，但她卻擁有著連純血種龍族也無可比擬的天賦，讓帝國達到了前所未有的昌盛，為了給帝國帶來新的繁榮，決定跨越祖先所設置的界線，重新向帝國的發源地，阿斯特萊雅大陸進軍。索菲亞本質上是個非常單純的人，戰鬥所取得的輝煌戰果讓民眾對她十分信賴，但進軍阿斯特萊雅的決定和這種不顧一切的性格也讓很多人感到十分的不滿。",
            caijuezhe: "仲裁廳一直是神聖教廷內部最為神秘的部門，如果說光輝神殿的使命是向世人散佈神的榮光和憐憫，那麼仲裁廳便是他冷酷而無情的另一面。仲裁廳的執行人員，主要負責處理『神秘遺物』以及處理相關的事件以及清除擁有危險力量的瀆神者和叛教者。仲裁廳所屬的人員包括聖殿騎士和戰爭祭司，總人數極少，由被稱為『裁決者』的十餘名特別騎士所管轄。面對突如其來的龍族入侵，這個神秘而特殊的機構終於將他的面目展露在世人面前，這次事件中帶隊的裁決者的代號為“路西菲爾”。",
            jianwuzhe: "來自極北荒原上的古老劍舞者部落，為了尋找早年失散的弟弟，獨身一人的她不顧族內的禁律，在經過血腥的試煉之後，孤身南下來到阿斯特萊雅。黛循著一路上零星的消息南下來到了埃格塔爾，大陸上智者雲集的詠歌城，希望在這裡能夠找到自己弟弟的消息。在詠歌城她意外地遭遇了龍族入侵的突發狀況，劍舞者血脈中靈敏的直覺讓她意識到對於急需援手的她來說這無疑是一個大好時機，當機立斷之下黛加入了詠歌城的衛戍部隊，憑藉著驚豔絕倫的劍舞和傳承的劍詠力量，在這個危機萬分的時機成為了詠歌城不可或缺的核心戰力。",
            shuangxuegongzhu: "性格活潑天然，從來不知道懷疑別人，像是大自然所孕育出的妖精一般。她在幼年的時候被羅格所救，因此很親近人類。後來，更是在羅格的指導下學會了將神聖能量融入了自己所熟悉的冰霜之中，薩紋蕾緹的善良和純潔得到了神聖教廷的認可，並被大家親切地稱為“霜雪公主”。 在這次龍族入侵的危機之中，為營救出訪詠歌城而意外被困的大司祭羅格，加入了路西菲爾所帶領的特別隊伍，決心為報答羅格的恩情而貢獻出自己的力量。",
            fengbaozhizhengguan: "萊茵哈特作為伊瑞西亞傳奇英雄劍帝卡特琳娜的得意弟子，並沒有完全繼承他的師父在劍術之道上的精深造詣，但是卻近乎完美地繼承了師父的政治理念和治國之道，擁有著完美的政治嗅覺和執行力的他在作為伊瑞西亞行政主體的執政議會中，擔任權力金字塔頂尖的執政官這一職務，這對於他的年齡來說幾乎是個不可能的奇蹟。作為伊瑞西亞新興一代的代表人物，萊茵哈特既繼承著如他師父一般準確而又精妙的判斷和決策能力，又沒有像卡特琳娜一樣在風雲突變的混亂生涯中所結下的諸多羈絆和顧慮。",
            qumozhe: "即使是在幻影聯盟之中，來歷不明的克里歐斯也是一個格格不入的獨行者，他擁有驅動強大的力量，卻過著苦行僧一般的生活，人們對他的瞭解僅僅限於那個沉默寡言和對於魔法的極端厭惡的身影，在這片戰火紛飛的大陸上，沒有人知道他在哪裡能夠找到自己的歸宿。",
            longyuzhe: "龍魂帝國元帥崔凡克的獨生女，作為擁有稀有的才能“完全記憶能力”的天才，在龍魂帝國中她也是已知的“龍語者”這個神秘職業唯一傳承者。因為曾見聞過的事物就絕對不會忘記的記憶力，使得在那次天翻地覆的血統革命中在自己眼前慘死的母親的一幕一直清晰地留在她記憶裡，一直封閉著自己的過去，不過最終因為洛薩溫柔而直率的性格重新打開了自己的心靈，因此決定一輩子都跟隨洛薩，現在作為他的副官，與洛薩同甘共苦，一道作為進軍阿斯特萊雅的先鋒而戰鬥著。",
            youhunfashi: "艾莉西婭的貼身法師，作為艾莉西婭的影子而存在著。對於她是如何和在召喚法術上沒有什麼造詣的艾莉西婭相遇並且心甘情願的侍奉她這個問題，從來沒有人能夠一探究竟。",
            xingwenshi: "斯通本來被譽為詠歌城有史以來最具有天賦的占星家，他和其胞妹蒂雅在星辰法術上的傑出造詣，讓他們獲得了命運的雙子星這個稱號，但他最終也因為和蒂雅在星紋法術上的分歧和誤解而分道揚鑣，在一次意外事故中被蒂雅認為是使用了禁用法術而導致大半個星辰聖所崩塌的理由監禁起來。最終他利用偽造的星紋法術躲開了監視叛逃到幻影聯盟，並在那裡完善著自己的星紋法術，沒有人願意和自己的命運作對，因此他也成為了絕大多數人最想擁有的隊友和最不願面對的敵人。",
            anzhiwangnv: "如同大部分鮮血議會的成員一樣，辛德蕾拉的過去是完全的不為人知的禁忌，身為夜之眷族的她雖然外貌是個清秀弱氣的女孩子，但是這幅容貌已經有一百多年沒有絲毫變化了。作為鮮血議會的元老成員，辛德蕾拉從來只是自己單獨行動，而且從未失手，傳聞她的那把“哀慟悲歌”是死神曾經所使用過的。",
            huangjiashiwei: "皇家侍衛自從帝國覆滅之後便再也未曾出現過，直到貝拉維恩，這位帝國曆史上最強大的皇家侍衛長，被王室的後裔所召喚，在新一輪的大陸爭霸中為神聖教廷而戰，英靈化的貝拉維拉能用星石維持自己的形態和日常消耗，在戰鬥中作為教廷最堅固的盾永遠衝鋒在戰場的最前線。",
            zhoushushi: "沉睡百年的少女，不變的是那顆執著於仇恨的心，雖然她的仇人早已消失在歷史之中，但被仇恨矇蔽了雙眼的奈落卻將復仇的對象轉向了他們的後裔。奈落使用傳承自部落的古老邪惡巫術，在與現代的魔法體系格格不入的同時也異常難以破解，無論敵人是誰，奈落都會讓他們體會到深淵一般的痛苦與絕望。",
            zhangejisi: "戰歌祭司是一種將魔力融入自己的歌聲之中，從而提高隊友的戰鬥力量的職業，雖然自身孱弱，但卻十分被隊友所依賴。在法師眾多的詠歌城之中法芙娜一直被狂熱的歌迷所追捧，但作為歌姬的她更希望能夠在戰場上展現自己所擁有的力量，當龍族入侵發生時，法芙娜第一時間趕到受災最重的重災區，加入了對抗龍魂帝國的一線部隊。"
        },
        skill: {
            zhuiFengJi: {
                forced: true,
                trigger: {
                    player: "gongJiSheZhi",
                },
                filter: function(event, player) {
                    return get.xiBie(event.card) === 'feng';
                },
                content: function() {
                    trigger.wuFaYingZhan();
                },
                mod: {
                    aiOrder: function(player, card, num) {
                        if (get.xiBie(card) === 'feng' && get.type(card) === 'gongJi') {
                            return num - 0.3;
                        }
                    },
                },
                "_priority": 0,
            },
            zhuRiJian: {
                type: "faShu",
                enable: "faShu",
                filter: function(event, player) {
                    return player.hasCard(function(card) {
                        return get.xiBie(card) === 'huo';
                    });
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card) === 'huo';
                },
                selectTarget: 1,
                filterTarget: function(card, player, target) {
                    return target.side !== player.side;
                },
                discard: true,
                showCards: true,
                content: function() {
                    // 對目標造成2點法術傷害
                    target.faShuDamage(2, player);
                },
                ai: {
                    order: 3.5,
                    result: {
                        target: function(player, target) {
                            // 基礎傷害收益
                            let value = get.damageEffect(target, 2);
                            // 如果目標沒有治療，優先選擇
                            if (target.zhiLiao == 0) value += 0.3;
                            // 如果目標手牌多，優先選擇（可以爆士氣）
                            if (target.countCards('h') > 4) value += 0.5;
                            return value;
                        },
                    },
                },
                "_priority": 0,
            },
            lingDongZhiWu: {
                usable: 1,  // 回合限定
                trigger: {
                    player: "gongJiAfter",
                },
                filter: function(event, player) {
                    return player.canBiShaShuiJing() && !event.yingZhan;
                },
                content: function() {
                    'step 0'
                    // 消耗水晶
                    player.removeBiShaShuiJing();
                    
                    'step 1'
                    // 獲得額外法術行動
                    player.addFaShu();
                },
                ai: {
                    order: 9.5,
                    useful: function(player) {
                        // 有可用法術牌時優先使用
                        if (player.hasCard(card => get.type(card) === 'faShu')) {
                            return true;
                        }
                        // 手牌多優先跑牌
                        if (player.countCards('h') > 3) {
                            return true;
                        }
                        // 中後期必用
                        if (get.shiQi(player.side) < 10) {
                            return true;
                        }
                        return false;
                    },
                    shuiJing: true,
                },
                "_priority": 0,
            },
            jianta: {
                trigger: {
                    player: "gongJiSheZhi",
                },
                charlotte: true,
                forced: true,
                filter: function (event, player) {
                    return get.type(event.card) === 'gongJi'; // 所有攻擊傷害
                },
                content: function () {
                    trigger.changeDamageNum(1);
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.type(card) === 'gongJi') return [1, 2]; // 提升攻擊威脅
                        },
                    },
                },
                "_priority": 0,
            },
            zhuixing: {
                trigger: {
                    player: "gongJiBefore",
                },
                filter: function (event, player) {
                    return get.type(event.card) === 'gongJi' && player.canBiShaShuiJing();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    trigger.wuFaYingZhan();
                },
                ai: {
                    order: 10,
                    result: {
                        target: function (player, target) {
                            return -1; // 傾向壓制敵方
                        },
                    },
                },
                "_priority": 0,
            },
            zhuiYingJi: {
                trigger: {
                    player: "gongJiAfter",
                },
                usable: 1,
                filter: function (event, player) {
                    if (event.yingZhan) return false;
                    return event.targets && event.targets.length > 0;
                },
                content: function () {
                    // 記錄本回合已主動攻擊過的目標
                    if (!player.storage.zhuiYingJiTargets) {
                        player.storage.zhuiYingJiTargets = [];
                    }
                    player.storage.zhuiYingJiTargets.addArray(trigger.targets);

                    player.storage.extraXingDong.push({
                        xingDong: 'gongJi',
                        filterTarget: function (card, player, target) {
                            return player.storage.zhuiYingJiTargets.includes(target);
                        },
                        prompt: '追影擊：攻擊本回合主動攻擊過的對手',
                    });
                },
                group: "zhuiYingJi_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseAfter",
                        },
                        silent: true,
                        content: function () {
                            delete player.storage.zhuiYingJiTargets;
                        },
                        sub: true,
                        sourceSkill: "zhuiYingJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                ai: {
                    combo: "gongJi",
                    order: 10,
                },
                "_priority": 0,
            },
            tiGu: {
                trigger: {
                    source: "gongJiMingZhong",
                },
                usable: 1,
                filter: function (event, player) {
                    return player.countNengLiang('baoShi') > 0;
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi(); // 移除1個寶石
                    'step 1'
                    trigger.changeDamageNum(2); // 額外+2傷害
                },
                ai: {
                    baoShi: true,
                    skillTagFilter: function (player, tag, arg) {
                        if (tag == 'baoShi' && player.countNengLiang('baoShi') == 0) return false;
                    },
                    effect: {
                        target: function (card, player, target, current) {
                            if (card.name == 'gongJi' && get.attitude(player, target) < 0) {
                                return [1, 3];
                            }
                        },
                    },
                },
                "_priority": 0,
            },
            tanLanZhiXin: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card, player, selected) {
                    return get.xuanZeTongXiPai(card)
                },
                position: "h",
                selectCard: 2,
                discard: true,
		        showCards: true,
                selectTarget: 1,
                filter: function (event, player) {
                    return player.countTongXiPai() >= 2;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.isEnemyOf(player);
                },
                content: function () {
                    'step 0'
                    const result = target.chooseToDiscard(1,'棄置一張【暗滅】或【聖光】，否則受到2點法術傷害', 'h', "showCards", function (card) {
                        return get.name(card) === 'anMie' || get.name(card) === 'shengGuang';
                    }).set('ai', function (card) {
                        return 100 - get.value(card);;
                    });
                    'step 1'
                    if (!result.bool) {
                        target.faShuDamage(2, player);
                    }
                },
                ai: {
                    order: 6,
                    result: {
                        target: function (player, target) {
                            return -2;
                        },
                    },
                },
                "_priority": 0,
            },
            wanWuYanMie: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaBaoShi();
                },
                content: async function (event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    let nextPlayer = player.getNext();
                    while (nextPlayer != player) {
                        if (nextPlayer.isEnemyOf(player)) {
                            await nextPlayer.faShuDamage(2, player);
                        }
                        nextPlayer = nextPlayer.getNext();
                    }
                },
                ai: {
                    baoShi: true,
                    order: 8,
                    result: {
                        player: function (player) {
                            return 6;
                        },
                    },
                },
                "_priority": 0,
            },
            zhanPuWeiLai: {
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                content: async function (event,trigger,player) {
                    var cards = get.cards(2);
                    await player.showHiddenCards(cards, '展示預兆牌');
                    game.cardsGotoOrdering(cards);
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        game.log(player, '翻開', card, '作為【預兆】');
                        game.broadcastAll(function (card) {
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                            card.style.display = 'block';
                            card.style.transform = 'none';
                        }, card);
                        player.loseToSpecial([card], '預兆', player);
                        if(get.xiBie(card)=="shui"){
                            await event.trigger("yuZhaoCardAdded")
                        }else if(["guang","an"].includes(get.xiBie(card))){
                            await event.trigger("guangAnYuZhaoCardAdded")
                        }
                    }
                },
                group: "zhanPuWeiLai_endClear",
                subSkill: {
                    endClear: {
                        trigger: {
                            player: "phaseEnd",
                        },
                        forced: true,
                        content: function () {
                            var cards = player.getCards('s');
                            if (cards.length) {
                                player.discard(cards, '預兆');
                                game.log(player, '棄置全部【預兆】');
                            }
                        },
                        sub: true,
                        sourceSkill: "zhanPuWeiLai",
                        "_priority": 0,
                    },
                },
                mod: {
                    "cardEnabled2": function (card, player) {
                        if (card.hasGaintag('預兆')) return false;
                    },
                    cardUsable: function (card, player) {
                        if (card.hasGaintag('預兆')) return false;
                    },
                    cardRespondable: function (card, player) {
                        if (card.hasGaintag('預兆')) return false;
                    },
                    cardSavable: function (card, player) {
                        if (card.hasGaintag('預兆')) return false;
                    },
                },
                "_priority": 0,
            },
            lieHuoFenShen: {
                forced: true,
                trigger: {
                    player: "gongJiMingZhong",
                },
                filter: function(event, player) {
                    return !event.yingZhan && player.getCards('s', card => card.hasGaintag('預兆') && get.xiBie(card) == 'huo'); // 僅主動攻擊
                },
                content: function() {
                    // 計算火系預兆數量
                    var huo_count = player.getCards('s', card => card.hasGaintag('預兆') && get.xiBie(card) == 'huo').length;
                    if (huo_count > 0) {
                        trigger.changeDamageNum(huo_count);
                        game.log(player, `烈焰焚身：火系預兆${huo_count}個，傷害+${huo_count}`);
                    }
                },
                "_priority": 0,
            },
            hanBingHuTi: {
                trigger: {
                    global: "yuZhaoCardAdded",
                },
                forced: true,
                content: function() {
                    'step 0'
                    player.chooseTarget(true,'【寒冰護體】：選擇1名角色增加1點[治療]').set('ai', function (target) {
                        var player = _status.event.player;
                        let value = get.zhiLiaoEffect2(target, player, 1);
                        return get.zhiLiaoEffect2(target, player, 1);
                    });
                    'step 1'
                    if (result.bool && result.targets.length) {
                        result.targets[0].changeZhiLiao(1, player);
                    }
                },
                "_priority": 0,
            },
            leiTingZhiNu: {
                trigger: {
                    player: "phaseEnd",
                },
                forced: true,
                filter: function (event, player) {
                    return player.getCards('s', card => card.hasGaintag('預兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card))).length > 0;
                },
                content: function () {
                    'step 0'
                    var count = player.getCards('s', card => {
                        return card.hasGaintag('預兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card));
                    }).length;
                    player.chooseTarget(true,'雷霆之怒：選擇一名對手造成' + count + '點法術傷害③', function (card, player, target) {
                        return target.side != player.side;
                    }).set('ai', function (target) {
                        var player=_status.event.player;
                        let value = get.damageEffect(target,player,count);
                        // 如果目標沒有治療，優先選擇
                        if (target.zhiLiao == 0) value += 0.3;
                        // 如果目標手牌多，優先選擇（可以爆士氣）
                        if (target.countCards('h') > 4) value += 0.5;
                        return value;
                    });
                    'step 1'
                    var count = player.getCards('s', card => {
                        return card.hasGaintag('預兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card));
                    }).length;
                    if (result.bool && result.targets.length) {
                        result.targets[0].faShuDamage(count, player);
                    }
                },
                "_priority": 1,
            },
            guangYingJiaoCuo: {
                trigger: {
                    global: "guangAnYuZhaoCardAdded",
                },
                forced: true,
                content: async function (event,trigger,player) {
                    var card = get.cards(1)[0];
                    await player.showHiddenCards(card, '展示預兆牌');
                    game.log(player, '因【光影交錯】額外翻開', card, '作為【預兆】');
                    game.broadcastAll(function (card) {
                        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                        card.style.display = 'block';
                        card.style.transform = 'none';
                    }, card);
                    player.loseToSpecial([card], '預兆', player);
                    if(get.xiBie(card)=="shui"){
                        await event.trigger("yuZhaoCardAdded")
                    }else if(["guang","an"].includes(get.xiBie(card))){
                        await event.trigger("guangAnYuZhaoCardAdded")
                    }
                },
                "_priority": 0,
            },
            daYuYanShu: {
                type: "faShu",
                enable: "faShu",
                filter: function(event, player) {
                    return player.canBiShaBaoShi();
                },
                content: async function (event,trigger,player) {
                    // 消耗寶石
                    await player.removeBiShaBaoShi();
                    var cards = get.cards(2);
                    await player.showHiddenCards(cards, '展示預兆牌');
                    game.cardsGotoOrdering(cards);
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        game.log(player, '翻開', card, '作為【預兆】');
                        game.broadcastAll(function (card) {
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                            card.style.display = 'block';
                            card.style.transform = 'none';
                        }, card);
                        player.loseToSpecial([card], '預兆', player);
                        if(get.xiBie(card)=="shui"){
                            await event.trigger("yuZhaoCardAdded")
                        }else if(["guang","an"].includes(get.xiBie(card))){
                            await event.trigger("guangAnYuZhaoCardAdded")
                        }
                    }
                    await player.addGongJiOrFaShu();
                },
                ai: {
                    baoShi: true,
                    order: 4,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            shengGuangShanYao: {
                type: "faShu",
                enable: "faShu",
                duYou: "shengGuangShanYao",
                filterCard: function (card) {
                    return get.type(card) == 'faShu';
                },
                position: "h",
                filter: function (event, player) {
                    return player.countCards('h', card => get.type(card) == 'faShu') > 0;
                },
                selectCard: 1,
                discard: true,
                showCards: true,
                prompt: "任意分配3點[治療]給目標角色",
                content: function () {
                    'step 0'
                    event.count = 0;
                    event.nextStep = function () {
                        if (event.count >= 3) return event.finish();
                        player.chooseTarget('第' + (event.count + 1) + '次：選擇治療目標（剩餘' + (3 - event.count) + '）', true,function(card, player, target){
                            return target.side == player.side;
                        }).set('ai', function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        });
                    };
                    event.nextStep();
                    'step 1'
                    if (result.bool && result.targets && result.targets.length) {
                        result.targets[0].changeZhiLiao(1, player);
                    }
                    event.count++;
                    if (event.count < 3) {
                        event.nextStep();
                        event.goto(1);
                    }
                },
                ai: {
                    order: 4,
                    result: {
                        target: function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        },
                        player: function (player) {
                            let zhiliao_num = 0;
                            let targets = game.filterPlayer(p => !p.isEnemyOf(player));
                            for (let target of targets) {
                                let num = target.getZhiLiaoLimit()-target.ZhiLiao;
                                zhiliao_num += num;
                            }
                            console.log(zhiliao_num - 2);
                            return zhiliao_num - 2;
                        },
                    },
                },
                "_priority": 0,
            },
            jiuShu: {
                type: "faShu",
                enable: "faShu",
                filterTarget: function (card, player, target) {
                    return target != player && target.side == player.side;
                },
                selectTarget: 1,
                content: function () {
                    'step 0'
                    player.draw();
                    'step 1'
                    player.changeZhiLiao(1);
                    target.changeZhiLiao(1);
                },
                ai: {
                    order: 3.6,
                    result: {
                        target: function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        },
                        player: function (player) {
                            if(player.countCards("h")>5) {
                                console.log("滿手，不發動")
                                return -1;
                            }
                            // 
                            if(player.ZhiLiao==2) {
                                console.log("自己滿治療，不發動")
                                return -1;
                            }
                            return get.zhiLiaoEffect(player, 1);
                        },
                    },
                },
                "_priority": 0,
            },
            shenShengCaiJue: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                selectTarget: 1,
                filterTarget: function (card, player, target) {
                    return true;
                },
                content: async function (event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    var options = ['你們各棄2張牌', '你們各摸2張牌'];
                    var res = await player.chooseControl(['選項一', '選項二'])
                        .set('choiceList', options)
                        .set('prompt', '選擇神聖裁決的效果')
                        .set('ai', function(target) {
                            var player = _status.event.player;
                            if (player.countCards('h') > 4) return '選項一';
                            return '選項二';
                        })
                        .forResult();

                    event.effect = res.control;
                    var target = _status.event.target;
                    if (event.effect == '選項一') {
                        await player.chooseToDiscard('h', 2, true);
                        await target.chooseToDiscard('h', 2, true);
                    } else {
                        await player.draw(2);
                        await target.draw(2);
                    }
                },
                ai: {
                    shuiJing: true,
                    order: 4,
                    result: {
                        target: function (player, target) {
                            if (player.countCards('h') <= 4 && target.countCards('h') > 4) return -2;
                            if (player.countCards('h') > 4) return 1;
                            return -1;
                        },
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            lieDiMaiChong: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return get.xiBie(card) == 'lei' || get.xiBie(card) == 'di';
                },
                selectCard: 1,
                discard: true,
                showCards: true,
                selectTarget: 1,
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'lei' || get.xiBie(card) == 'di') > 0;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.side != player.side;
                },
                content: function () {
                    target.faShuDamage(1, player);
                },
                ai: {
                    order: 3,
                    result: {
                        target: function (target) {
                            return get.damageEffect(target, player, 1);
                        },
                    },
                },
                "_priority": 0,
            },
            lianLeiDiYu: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return (get.xiBie(card) === 'lei' || get.xiBie(card) === 'di') && get.xuanZeTongXiPai(card);  // 兩張必須同系
                },
                position: "h",
                selectCard: 2,
                discard: true,
                showCards: true,
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'lei') >= 2 || player.countCards('h', card => get.xiBie(card) == 'di') >= 2;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.side != player.side;
                },
                selectTarget: 1,
                content: function () {
                    target.faShuDamage(2, player);
                },
                ai: {
                    order: 6,
                    result: {
                        target: function (player, target) {
                            return get.damageEffect(target, player, 2);
                        },
                    },
                },
                "_priority": 0,
            },
            shiXueZhiXin: {
                trigger: {
                    source: "zaoChengShangHai",
                },
                filter: function (event, player) {
                    return !player.storage._shiXueUsed && event.faShu && player.canBiShaBaoShi();
                },
                content: async function (event,trigger,player) {
                    await player.removeBiShaBaoShi();  // 消耗1顆寶石
                    await trigger.changeDamageNum(2);  //增加兩點法術傷害
                    player.storage._shiXueUsed = true;
                },
                group: "shiXueZhiXin_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        silent: true,
                        content: function () {
                            player.storage._shiXueUsed = false;
                        },
                        sub: true,
                        sourceSkill: "shiXueZhiXin",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                ai: {
                    baoShi: true,
                    effect: {
                        target: function (player, target) {
                            return get.damageEffect(target, player, 2);
                        },
                    },
                },
                "_priority": 0,
            },
            huanXiangChongJi: {
                enable: "gongJi",
                filter: function(event, player) {
                    // 手牌至少要有3張才能發動
                    return player.countCards('h') >= 3;
                },
                selectCard: 3,
                filterCard:function(card){
                    return true;
                },
                discard:true,
                selectTarget: 1,
                filterTarget: function(card, player, target){
                    return target.side != player.side;
                },
                content: async function(event, trigger, player) {
                    player.storage.hiddenCards = event.cards;
                    var target = event.target;
                    var options = ['翻開', '不翻開'];
                    var fankai = await target.chooseControl(['選項一', '選項二'])
                        .set('choiceList', options)
                        .set('prompt', '受到3點暗滅傷害，是否選擇翻開暗置牌？<br>翻開對方的暗置牌，若為同系，對方額外選擇一名隊友+1寶石<br>若否，本次攻擊無效且對方受到5點法術傷害，你+1治療。')
                        .set('ai',function(){
                            //ai隨機選擇翻開和不翻開
                            var num=Math.random();
                            if(num>0.5) return "選項一";
                            else return "選項二";
                        }).forResult('control');
                    game.log(target, '選擇了', '選項一'==fankai ? '翻開' : '不翻開');
                    event.effect = fankai;

                    if(event.effect == '選項二') await event.trigger("anZhiSuccess");

                    if (event.effect == '選項一') {
                        // 選擇翻開，先將暗置的牌展示出來
                        await player.showHiddenCards(player.storage.hiddenCards);
                        // 判斷三同系
                        const xiBie = get.xiBie(player.storage.hiddenCards[0]);
                        if(event.tongXi || player.storage.hiddenCards.every(card => get.xiBie(card) === xiBie)){
                            // 三同系，玩家選擇一個隊友加1寶石，正常結算三點暗滅傷害
                            var card={name:'anMie',xiBie:'an'};
                            await player.useCard(card,target).set('damageNum',3).set('action',true);
                            var xingshi = await player.chooseTarget(1,true,'選擇1個隊友加1]【寶石】',true,function(card, player, target){
                                return player != target && target.side == player.side;
                            }).forResult();
                            var xingshi_target = xingshi.targets[0];
                            await xingshi_target.changeNengLiang('baoShi',1);
                        }else{
                            //否，傷害無效，玩家受到5點法術傷害，目標加1治療
                            await player.faShuDamage(5,player);
                            await event.trigger("anZhiFail");
                            await target.changeZhiLiao(1);
                        }
                    } else {
                        // 不選擇翻開，正常結算三點暗滅傷害
                        var card={name:'anMie',xiBie:'an'};
                        await player.useCard(card,target).set('damageNum',3).set('action',true);
                    }
                },
                "_priority": 0,
            },
            xinLingFengBao: {
                type: "faShu",
                enable: "faShu",
                selectCard: 2,
                filterCard: function(card) {
                    return true;
                },
                filterTarget: function(card, player, target){
                    return target.side != player.side;
                },
                filter: function(event, player) {
                    // 手牌至少要有2張才能發動
                    return player.countCards('h') >= 2;
                },
                content: async function(event, trigger, player) {
                    player.storage.hiddenCards = event.cards;
                    var target = event.target;
                    var options = ['翻開', '不翻開'];
                    var fankai = await target.chooseControl(['選項一', '選項二'])
                        .set('choiceList', options)
                        .set('prompt', '受到1點法術傷害，是否選擇翻開暗置牌？<br>翻開對方的暗置牌，若都為法術，本次法術傷害額外+1，對方額外為目標角色+1治療<br>若否，本次法術無效且對方受到5點法術傷害，我方戰績區+1寶石。')
                        .set('ai',function(){
                            //ai隨機選擇翻開和不翻開
                            var num=Math.random();
                            if(num>0.5) return "選項一";
                            else return "選項二";
                        }).forResult('control');
                    game.log(target, '選擇了', '選項一'==fankai ? '翻開' : '不翻開');
                    event.effect = fankai;
                    
                    if(event.effect == '選項二') await event.trigger("anZhiSuccess");

                    if (event.effect == '選項一') {
                        // 選擇翻開，先將暗置的牌展示出來
                        await player.showHiddenCards(player.storage.hiddenCards);
                        // 判斷是否都為法術，allFaShu由改變世界設置
                        if(event.allFaShu || player.storage.hiddenCards.every(card => get.type(card) === 'faShu')){
                            // 都為法術，結算2點法術傷害
                            await target.faShuDamage(2,player);                            var zhiliao = await player.chooseTarget([1,2],"分配2點[治療]給1-2名目標角色", true).forResult();
                            if(zhiliao.targets.length==1) await zhiliao.targets[0].changeZhiLiao(2,player);
                            else {
                                await zhiliao.targets[0].changeZhiLiao(1,player);
                                await zhiliao.targets[1].changeZhiLiao(1,player);
                            }
                        }else{
                            //否，傷害無效，玩家受到5點法術傷害，目標戰績區加1寶石
                            await player.faShuDamage(5,player);
                            await event.trigger("anZhiFail");
                            await target.changeZhanJi('baoShi',1,target.side);
                        }
                    } else {
                        // 不選擇翻開，結算1點法術傷害
                        await target.faShuDamage(1, player);
                        var zhiliao = await player.chooseTarget(1,"選擇目標角色+1治療", true).forResult();
                        await zhiliao.targets[0].changeZhiLiao(1,player);
                    }
                },
                "_priority": 0,
            },
            zhenShiHuanJue: {
                trigger: {
                    player: "anZhiFail",
                },
                filter: function(event, player) {
                    return !player.storage._huanJueUsed;
                },
                content: function() {
                    player.addGongJiOrFaShu();
                    player.storage._huanJueUsed = true;
                },
                group: "zhenShiHuanJue_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        silent: true,
                        content: function () {
                            player.storage._huanJueUsed = false;
                        },
                        sub: true,
                        sourceSkill: "zhenShiHuanJue",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                "_priority": 0,
            },
            gaiBianShiJie: {
                trigger: {
                    player: "anZhiSuccess",
                },
                filter: function(event, player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    var trigger_name = event.getTrigger().name;
                    if(trigger_name === "huanXiangChongJi"){
                        trigger.effect = '選項一';
                        trigger.tongXi = true; // 標記三同系
                    }else if(trigger_name === "xinLingFengBao"){
                        trigger.effect = '選項一';
                        trigger.allFaShu=true;
                    }
                },
                "_priority": 0,
            },
            yuanGuJinZhi: {
                trigger:{
                    global: "gameStart"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    if (!player.storage.longZuFuXing_removed)
                        player.storage.longZuFuXing_removed = [];
                    await player.addZhiShiWu("longKuangMiSuo");
                    await player.addZhiShiWu("longMaiShuFu");
                    await player.addZhiShiWu("longYuFengYin");
                    await player.addZhiShiWu("yuLongJieJie");
                },
                "_priority": 0,
            },
            zhenLongJueXing: {
                trigger: {
                    global: ["changeShiQiAfter","heCheng"]
                },
                forced: true,
                filter:function(event,player){
                    // 四張全翻就無需再詢問
                    if(player.hasZhiShiWu("baiWanLongYan") &&
                    player.hasZhiShiWu("longWangZhiLi") &&
                    player.hasZhiShiWu("longShenEnHui") &&
                    player.hasZhiShiWu("shengLongWeiYa")) return false;
                    // 改變士氣增加判斷是否我方士氣下降
                    if(event.name === "changeShiQi") return player.side==event.side && event.num<0;
                    // 合杯則一定執行
                    else return true;
                },
                content: async function(event,trigger,player) {
                    var skillMap = {
                        "龍狂迷鎖": {
                            id: "baiWanLongYan",
                            text: "龍狂迷鎖=>百萬龍炎:(摸0-2張牌，棄X張同系牌)對自己和任一對手各造成X點法術傷害"
                        },
                        "龍脈束縛": {
                            id: "longWangZhiLi",
                            text: "龍脈束縛=>龍王之力:(攻擊命中後棄X張異系牌)本次傷害額外+X"
                        },
                        "龍語封印": {
                            id: "longShenEnHui",
                            text: "龍語封印=>龍神恩惠:(攻擊行動結束後發動)額外獲得1個法術行動"
                        },
                        "馭龍結界": {
                            id: "shengLongWeiYa",
                            text: "馭龍結界=>聖龍威壓:你的攻擊不能被應戰，你也不能應戰攻擊"
                        }
                    };
                    var options = [];
                    var buttons = [];
                    for (var key in skillMap) {
                        if (!player.hasZhiShiWu(skillMap[key].id)) {
                            options.push(skillMap[key].text);
                            buttons.push(key);
                        }
                    }
                    var jinzhi = await player.chooseControl(buttons)
                        .set('choiceList', options)
                        .set('prompt', '翻轉任意一張【禁制】牌')
                        .set('ai',function(){
                            //優先龍狂迷鎖和龍脈束縛，其次龍語封印，最後馭龍結界
                            var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                            for (var id of ids) {
                                if (!player.hasZhiShiWu(id)) {
                                    if(id == "baiWanLongYan") return "龍狂迷鎖";
                                    if(id == "longWangZhiLi") return "龍脈束縛";
                                    if(id == "longShenEnHui") return "龍語封印";
                                    if(id == "shengLongWeiYa") return "馭龍結界";
                                }
                            }
                        }).forResult('control');
                    
                    if (jinzhi == '龍狂迷鎖') {
                        await player.setZhiShiWu("longKuangMiSuo",0);
                        await player.setZhiShiWu("baiWanLongYan",1);
                    }else if(jinzhi == '龍脈束縛') {
                        await player.setZhiShiWu("longMaiShuFu",0);
                        await player.setZhiShiWu("longWangZhiLi",1);
                    }else if(jinzhi == '龍語封印') {
                        await player.setZhiShiWu("longYuFengYin",0);
                        await player.setZhiShiWu("longShenEnHui",1);
                    }else if(jinzhi == '馭龍結界') {
                        await player.setZhiShiWu("yuLongJieJie",0);
                        await player.setZhiShiWu("shengLongWeiYa",1);
                    }
                },
                group: "zhenLongJueXing_clear",
                subSkill: {
                    //回合結束強制翻回所有禁制牌
                    clear: {
                        trigger:{
                            player: "phaseEnd"
                        },
                        forced: true,
                        content: async function(event,trigger,player) {
                            if (!player.storage.longZuFuXing_removed.includes("baiWanLongYan")) {
                                await player.setZhiShiWu("baiWanLongYan",0);
                                await player.setZhiShiWu("longKuangMiSuo",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("longWangZhiLi")) {
                                await player.setZhiShiWu("longWangZhiLi",0);
                                await player.setZhiShiWu("longMaiShuFu",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("longShenEnHui")) {
                                await player.setZhiShiWu("longShenEnHui",0);
                                await player.setZhiShiWu("longYuFengYin",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("shengLongWeiYa")) {
                                await player.setZhiShiWu("shengLongWeiYa",0);
                                await player.setZhiShiWu("yuLongJieJie",1);
                            }
                        },
                        silent: true,
                        sub: true,
                        sourceSkill: "zhenLongJueXing",
                        popup: false,
                        "_priority": 0,
                    }
                },
                "_priority": 0,
            },
            longHunShouHu: {
                trigger: {
                    player: "faShuEnd"
                },
                forced: true,
                content: function() {
                    player.changeZhiLiao(1);
                },
                "_priority": 0,
            },
            longShenEnHui: {
                intro:{
                    name:'龍神恩惠',
                    content:"<span class='tiaoJian'>(攻擊行動結束後發動)</span>額外獲得1個法術行動，<span class='greentext'>【龍語封印】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longShenEnHui.jpg',
                trigger:{
                    player: "gongJiEnd"
                },
                forced: true,
                filter: function(event, player) {
                    return player.hasZhiShiWu('longShenEnHui') && !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    await player.addFaShu();
                },
                "_priority": 0,
            },
            longWangZhiLi: {
                intro:{
                    name:'龍王之力',
                    content:"<span class='tiaoJian'>(攻擊命中後棄X張異系牌)</span>本次傷害額外+X，<span class='greentext'>【龍脈束縛】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longWangZhiLi.jpg',
                trigger:{
                    player: "gongJiMingZhong"
                },
                filter: function(event, player) {
                    return player.hasZhiShiWu('longWangZhiLi') && player.countYiXiPai() >=2;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([2,Infinity],'h', card => get.xuanZeYiXiPai(card))
                    .set('prompt',"龍王之力：攻擊命中後棄X張異系牌,本次傷害額外+X")
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    if(event.cards){
                        await player.discard(event.cards).set('showCards',true);
                        await trigger.changeDamageNum(event.cards.length);
                    }
                },
                "_priority": 0,
            },
            shengLongWeiYa: {
                intro:{
                    name:'聖龍威壓',
                    content:"你的攻擊不能被應戰，你也不能應戰攻擊，<span class='greentext'>【馭龍結界】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/shengLongWeiYa.jpg',
                trigger:{
                    global: "gongJiShi"
                },
                forced: true,
                filter: function(event, player) {
                    if(!player.hasZhiShiWu('shengLongWeiYa')) return false;
                    return event.source==player || event.target==player;
                },
                content: function() {
                    trigger.wuFaYingZhan();
                },
                "_priority": 0,
            },
            baiWanLongYan: {
                intro:{
                    name:'百萬龍炎',
                    content:"<span class='tiaoJian'>(摸0-2張牌，棄X張同系牌)</span>對自己和任一對手各造成X點法術傷害，<span class='greentext'>【龍狂迷鎖】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/baiWanLongYan.jpg',
                type: 'faShu',
                enable: 'faShu',
                filter: function(event, player) {
                    return player.hasZhiShiWu('baiWanLongYan');
                },
                content: async function(event,trigger,player) {
                    // 選擇摸0-2張牌
                    var list=[];
                    for(var i=0;i<3;i++){
                        list.push(i);
                    }
                    var mopai_num = await player.chooseControl(list).set('prompt','選擇摸0-2張牌').set('ai',function(){
                        if(player.countCards('h')<=4) return 2;
                        else if(player.countCards('h') == 5) return 1;
                        else return 0;
                    }).forResult('control');
                    await player.draw(mopai_num);
                    if(player.countTongXiPai()<2) return;
                    // 棄X張同系
                    var qiPai = await player.chooseCard([2,Infinity],'h', card => get.xuanZeTongXiPai(card))
                    .set('prompt',"百萬龍炎：棄X張同系牌,對自己和任一對手各造成X點法術傷害")
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                    // 各造成X點法術傷害
                    if(qiPai.bool){
                        await player.discard(qiPai.cards).set('showCards',true);
                        var duishou = await player.chooseTarget(1,'選擇任意對手，各造成X點法術傷害',true,function(card, player, target){
                                return player != target && target.side != player.side;
                        }).forResult();
                        var target = duishou.targets[0];
                        await target.faShuDamage(qiPai.cards.length,player);
                        await player.faShuDamage(qiPai.cards.length,player);
                    }
                },
                "_priority": 0,
            },
            longZuFuXing: {
                trigger: {
                    player: "phaseEnd"
                },
                filter: function(event, player) {
                    if (player.canBiShaBaoShi()) {
                        var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                        for (var id of ids) {
                            if (player.hasZhiShiWu(id) && !player.storage.longZuFuXing_removed.includes(id)) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var skillMap = {
                        "龍狂迷鎖": {
                            id: "baiWanLongYan",
                            text: "龍狂迷鎖=>百萬龍炎:(摸0-2張牌，棄X張同系牌)對自己和任一對手各造成X點法術傷害"
                        },
                        "龍脈束縛": {
                            id: "longWangZhiLi",
                            text: "龍脈束縛=>龍王之力:(攻擊命中後棄X張異系牌)本次傷害額外+X"
                        },
                        "龍語封印": {
                            id: "longShenEnHui",
                            text: "龍語封印=>龍神恩惠:(攻擊行動結束後發動)額外獲得1個法術行動"
                        },
                        "馭龍結界": {
                            id: "shengLongWeiYa",
                            text: "馭龍結界=>聖龍威壓:你的攻擊不能被應戰，你也不能應戰攻擊"
                        }
                    };
                    var options = [];
                    var buttons = [];
                    for (var key in skillMap) {
                        if (player.hasZhiShiWu(skillMap[key].id) && !player.storage.longZuFuXing_removed.includes(skillMap[key].id)) {
                            options.push(skillMap[key].text);
                            buttons.push(key);
                        }
                    }
                    var toRemove = await player.chooseControl(buttons)
                    .set('choiceList', options)
                    .set('prompt', '選擇一張【禁制】永久移除')
                    .set('ai', function(){
                        var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                        for (var id of ids) {
                            if (player.hasZhiShiWu(id) && !player.storage.longZuFuXing_removed.includes(id)) {
                                if(id == "baiWanLongYan") return "龍狂迷鎖";
                                if(id == "longWangZhiLi") return "龍脈束縛";
                                if(id == "longShenEnHui") return "龍語封印";
                                if(id == "shengLongWeiYa") return "馭龍結界";
                            }
                        }
                    }).forResult('control');
                    player.storage.longZuFuXing_removed.push(skillMap[toRemove].id);
                    lib.skill[skillMap[toRemove].id].intro.name = lib.skill[skillMap[toRemove].id].intro.name + "  <span class='hong'>【禁制】已永久移除</span>";
                },
                "_priority": 1,
            },
            longKuangMiSuo:{
                intro:{
                    name:'龍狂迷鎖',
                    content:"<span class='tiaoJian'>(摸0-2張牌，棄X張同系牌)</span>對自己和任一對手各造成X點法術傷害，<span class='greentext'>【龍狂迷鎖】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longKuangMiSuo.jpg'
            },
            longMaiShuFu:{
                intro:{
                    name:'龍脈束縛',
                    content:"<span class='tiaoJian'>(攻擊命中後棄X張異系牌)</span>本次傷害額外+X，<span class='greentext'>【龍脈束縛】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longMaiShuFu.jpg'
            },
            longYuFengYin:{
                intro:{
                    name:'龍語封印',
                    content:"<span class='tiaoJian'>(攻擊行動結束後發動)</span>額外獲得1個法術行動，<span class='greentext'>【龍語封印】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longYuFengYin.jpg'
            },
            yuLongJieJie:{
                intro:{
                    name:'馭龍結界',
                    content:"你的攻擊不能被應戰，你也不能應戰攻擊，<span class='greentext'>【馭龍結界】</span>存在時不能發動該技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/yuLongJieJie.jpg'
            },
            zhengYiZhuiJi: {
                trigger: {
                    global: "changeShiQiAfter"
                },
                forced: true,
                filter: function(event, player) {
                    if(event.getParent().name =="_heCheng_backup" && event.getParent().player==player) 
                        return true; //合杯必定掉對面士氣，先觸發
                    //正常打傷害的觸發判定
                    if(event.side==player.side) return false;    //改變自己方士氣不發動
                    if(event.num>=0) return false;  //增加士氣不發動
                    return player.storage._zhuiJi;
                },
                group: ["zhengYiZhuiJi_start","zhengYiZhuiJi_end"],
                subSkill: {
                    start: {
                        trigger: {
                            player: "phaseBegin"
                        },
                        silent: true,
                        content: function () {
                            player.storage._zhuiJi = true;
                        },
                        sub: true,
                        sourceSkill: "zhengYiZhuiJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                    end: {
                        trigger: {
                            player: "phaseEnd"
                        },
                        silent: true,
                        content: function () {
                            player.storage._zhuiJi = false;
                        },
                        sub: true,
                        sourceSkill: "zhengYiZhuiJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    }
                },
                content: function() {
                    player.insertPhase();
                },
                "_priority": 0
            },
            caiJueZhiXin: {
                trigger: {
                    global: "gameStart",
                    player: "changeXingBeiBegin"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    if(event.triggername === "gameStart"){
                        player.changeNengLiang("shuiJing",2)
                    }else if (event.triggername === "changeXingBeiBegin"){
                        trigger.cancel();
                    }
                },
                "_priority": 0

            },
            zhenLiCaiJue: {
                trigger: {
                    global: "zhiLiaoSheZhi"
                },
                forced: true,
                filter: function(event, player){
                    var damage_event = event.getParent("damage");   //獲取造成此次治療的傷害事件
                    return damage_event.source == player;   // 並判斷傷害是否玩家產生
                },
                content: function(){
                    trigger.zhiLiaoLimit = 1;   // 限制治療使用量為1
                },
                "_priority": 0
            },
            songZhongDaoFeng: {
                trigger: {
                    player: "gongJiBefore"
                },
                filter:function(event,player){
                    return player.canBiShaShuiJing() && !event.yingZhan;
                }, 
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards('h') + 1 <= trigger.target.countCards('h')){
                        trigger.changeDamageNum(1);
                    }
                    if(player.countCards('h') + 1 >= trigger.target.countCards('h')){
                        trigger.wuFaYingZhan();
                    }
                },
                "_priority": 0
            },
            wuJinZhiRen: {
                type: "faShu",
                enable: "faShu",
                filter:function(event,player){
                    return player.canBiShaShuiJing() && (player.countCards('h',card => get.type(card)=="faShu")>=2 || player.countTongXiPai()>=3);
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards('h',card => get.type(card)=="faShu")>=2 && player.countTongXiPai()>=3){
                        event.qiPaiWay = await player.chooseControl(["棄2張法術","棄3張同系"])
                        .set('prompt', '棄2張法術牌或3張同系牌')
                        .set('ai', function(){
                            return "棄3張同系";
                        }).forResult('control');
                    }else if (player.countCards('h',card => get.type(card)=="faShu")>=2){
                        event.qiPaiWay = "棄2張法術";
                    }else if (player.countTongXiPai()>=3){
                        event.qiPaiWay = "棄3張同系";
                    }
                    if(event.qiPaiWay == "棄2張法術"){
                        event.qipai = await player.chooseToDiscard(2,'h', "showCards", true, card => get.type(card)=="faShu")
                        .set('prompt',"棄2張法術牌")
                        .set('complexCard',true)
                        .set('ai',function(card){
                                return 1;
                        }).forResult();
                    }else if (event.qiPaiWay == "棄3張同系") {
                        event.qipai = await player.chooseToDiscard(3,'h', "showCards", true, card => get.xuanZeTongXiPai(card))
                        .set('prompt',"棄3張同系牌")
                        .set('complexCard',true)
                        .set('ai',function(card){
                                return 1;
                        }).forResult();
                    }
                    var duishou = await player.chooseTarget(1,'選擇任意玩家，各造成2點法術傷害',true).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(2,player);
                    await player.faShuDamage(2,player);
                },
                "_priority": 0
            },
            weiJianErSheng: {
                trigger:{
                    source: "gongJiWeiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.countCards('h',card => get.type(card)=='faShu') > 0;
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[1,Infinity],function(card){
                        return get.type(card) == 'faShu';
                    })
                    .set('prompt',get.prompt('weiJianErSheng'))
                    .set('prompt2',lib.translate.weiJianErSheng_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set('showCards',true);
                    var choose = await player.chooseTarget(1,"選擇除本次攻擊的角色以外的另一角色造成X點傷害", true, function(card, player, target) {
                        const targetx = _status.event.targetx;
                        return targetx != target && player.side != target.side;
                    }).set("targetx",trigger.player).forResult();
                    await choose.targets[0].faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            duiJianErShi: {
                trigger:{
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.countTongXiPai() >=2;
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[2,Infinity],function(card){
                        return get.xuanZeTongXiPai(card);
                    })
                    .set('prompt',get.prompt('duiJianErShi'))
                    .set('prompt2',lib.translate.duiJianErShi_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set('showCards',true);
                    var choose = await player.chooseTarget(1,"選擇除本次攻擊的角色以外的另一角色造成X點傷害", true, function(card, player, target) {
                        const targetx = _status.event.targetx;
                        return targetx != target && player.side !=target.side;
                    }).set("targetx",trigger.target).forResult();
                    await choose.targets[0].faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            jianWuYiShi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                    await player.draw(3);
                    await player.addGongJi();
                },
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isHengZhi()) return num+3;
                    },
                    aiOrder:function(player,card,num){
                        if(get.type(card)=='gongJi') return num+1;
                    }
                },
                group:['jianWuYiShi_clear'],
                subSkill:{
                    clear:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:async function(event,trigger,player) {
                            await player.chongZhi();
                            await player.qiPai();
                        },
                        "_priority": 1
                    },
                },
                ai:{
                    baoShi:true,
                },
                "_priority": 0
            },
            bingShuangLingYu: {
                trigger: {
                    global: "gameStart"
                },
                forced: true,
                content: function() {
                    var targets = game.filterPlayer(p => p.side == player.side);
                    for (let i = 0; i < targets.length; i++) {
                        targets[i].changeZhiLiao(1, player);
                    }
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                },
                "_priority": 0
            },
            shuiJingDaoQiang: {
                trigger: {
                    source: "gongJiEnd"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.zhiLiao > 0 && event.gongJiMingZhong;
                },
                content: async function(event,trigger,player){
                    // 選擇消耗的治療量
                    var list=[];
                    for(var i=0;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    var zhiLiao_num = await player.chooseControl(list).set('prompt','選擇移除X點治療,額外造成X點法術傷害').set('ai',function(){
                        return player.zhiLiao;
                    }).forResult('control');
                    await player.changeZhiLiao(zhiLiao_num*(-1));
                    await trigger.target.faShuDamage(zhiLiao_num,player);
                },
                "_priority": 0
            },
            lingFengZhuFu: {
                trigger: {
                    source: "gongJiWeiMingZhong"
                },
                forced: true,
                filter: function(event,player) {
                    return ['feng','shui'].includes(get.xiBie(event.card));
                },
                content: async function(event,trigger,player){
                    var zhiliao = await player.chooseTarget(1,"攻擊未命中，選擇任意角色+1治療，若其沒有治療，額外+1治療", true).forResult();
                    if(zhiliao.targets[0].zhiLiao == 0) {
                        await zhiliao.targets[0].changeZhiLiao(2,player);
                    }else{
                        await zhiliao.targets[0].changeZhiLiao(1,player);
                    }
                },
                "_priority": 0
            },
            shuangYuZhiHuan: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    var targets = game.filterPlayer(p => p.side == player.side && p.zhiLiao == 0);
                    for (let i = 0; i < targets.length; i++) {
                        await targets[i].changeZhiLiao(2, player);
                    }
                    await player.addGongJiOrFaShu();
                },
                "_priority": 0
            },
            huJiaoZhiXin: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: function() {
                    player.changeZhiLiao(1);
                },
                "_priority": 0
            },
            wuJinZhuiJi: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return player.zhiLiao > 0 && !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    await player.changeZhiLiao(-1);
                    await player.addGongJi();
                },
                "_priority": 1
            },
            jingZhunJuJi: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.addSkill('jingZhunJuJi_wuFaYingZhan');
                    await player.addGongJi();
                },
                subSkill:{
                    wuFaYingZhan:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return !event.yingZhan;
                        },
                        content:function(){
                            'step 0'
                            trigger.wuFaYingZhan();
                            'step 1'
                            player.removeSkill('jingZhunJuJi_wuFaYingZhan');
                        }
                    }
                },
                "_priority": 0
            },
            zhiYueZhiHuan: {
                trigger: {
                    source: "gongJiBefore"
                },
                filter: function(event,player){
                    return player.countCards('h') >=2;
                },
                cost: async function(event,trigger,player) {
                    event.result = await player.chooseCard(2, 'h', card => get.xuanZeTongXiPai(card))
                    .set('prompt',get.prompt('zhiYueZhiHuan'))
                    .set('prompt2',lib.translate.zhiYueZhiHuan_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 6-get.value(card);
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.addSkill('zhiYueZhiHuan_weiMingZhong');
                    await player.discard(event.cards).set('showCards',true);
                },
                group: "zhiYueZhiHuan_mingZhong",
                subSkill:{
                    mingZhong: {
                        trigger: {
                            source: "gongJiMingZhong"
                        },
                        forced: true,
                        content: async function(event,trigger,player) {
                            await player.removeSkill('zhiYueZhiHuan_weiMingZhong');
                        },
                        "_priority": 1
                    },
                    weiMingZhong: {
                        trigger: {
                            source: "gongJiWeiMingZhong"
                        },
                        forced: true,
                        content: async function(event,trigger,player) {
                            await player.faShuDamage(4);
                            await player.removeSkill('zhiYueZhiHuan_weiMingZhong');
                        },
                        "_priority": 1
                    }
                },
                "_priority": 1
            },
            sheShenZhiDao: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    // 選擇摸2-4張牌
                    var list=[];
                    for(var i=2;i<=4;i++){
                        list.push(i);
                    }                       // [0] 2  [1] 3 [2] 4
                    var mopai_num = await player.chooseControl(list).set('prompt','摸2-4張牌，本次攻擊傷害額外+X-1').set('ai',function(){
                        if(player.countCards('h')<=2) return 2;
                        else if(player.countCards('h') == 3) return 1;
                        else return 0;
                    }).forResult('control');
                    await player.draw(mopai_num);
                    await trigger.changeDamageNum(mopai_num-1);
                },
                ai: {
                    order(item,player){
                        if(player.countCards('h') > 4) return 1;
                        else return 4;
                    }
                },
                "_priority": 0
            },
            jianRenZhiZhi: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                filter: function(event,player) {
                    return player.canBiShaBaoShi() && event.faShu;
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    trigger.num = 0;
                },
                "_priority": 0
            },
            baoFengLingYu: {
                forced: true,
                trigger: {
                    source: "gongJiSheZhi"
                },
                filter: function(event,player) {
                    return ['feng','lei'].includes(get.xiBie(event.card));
                },
                content: function(){
                    trigger.changeDamageNum(1);
                },
                "_priority": 0
            },
            yiZheng: {
                enable: "faShu",
                type: "faShu",
                selectTarget: 1,
                filterTarget: function(card,player,target) {
                    return player.side == target.side && player != target;
                },
                content: async function(event,trigger,player) {
                    event.giveWay = await player.chooseControl(["你給目標1張牌","目標給你1張牌"])
                    .set('prompt', '你選擇一項發動：<br>將1張牌交給目標隊友<br>目標隊友給你1張牌')
                    .set('ai', function(){
                        return "你給目標1張牌";
                    }).forResult('control');
                    if(event.giveWay == "你給目標1張牌") {
                        if(player.countCards('h')>0){
                            const giveCard = await player.chooseCard('h',"將1張牌交給目標隊友",true,1).forResult();
                            await player.give(giveCard.cards[0],event.target);
                        }
                    }else {
                        if(event.target.countCards('h')>0) {
                            const giveCard = await event.target.chooseCard('h',"將1張牌交給目標隊友",true,1).forResult()
                            await event.target.give(giveCard.cards[0],player);
                        }
                    }
                    await player.addGongJi();
                },
                "_priority": 0
            },
            jiFengZhouYu: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.addGongJi();
                },
                "_priority": 0
            },
            juLongZhiLi: {
                trigger: {
                    source: "gongJiSheZhi"
                },
                forced: true,
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: function() {
                    const handCardNum = player.countCards("h");
                    trigger.changeDamageNum(handCardNum-1);
                },
                "_priority": 0
            },
            longZuZunYan: {
                trigger:{global:'gameStart'},
                forced: true,
                content: function() {

                },
                mod:{
                    playerEnabled:function(card,player,target){
                        if(get.type(card)=='gongJi' && player.countCards("h")<target.countCards("h") && !player.isHengZhi()){
                            if(_status.event.yingZhan!=true) return false;
                        }
                    }
                },
                "_priority": 0
            },
            longXueQinYe: {
                enable: "faShu",
                type: "faShu",
                content: async function(event,trigger,player) {
                    await player.draw(1);
                    var duishou = await player.chooseTarget(1,'選擇任意角色造成1點法術傷害',true)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    })
                    .forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(1,player);
                },
                check: function(event,player) {
                    if(player.countCards("h") == 6) return false;
                    return true;
                },
                ai: {
                    order: 3,
                    result:{
                        player: 1
                    }
                },
                "_priority": 0
            },
            longXueZhuoShao: {
                enable: "faShu",
                type: "faShu",
                content: async function(event,trigger,player) {
                    await player.draw(3);
                    var duishou = await player.chooseTarget(1,'選擇任意角色造成2點法術傷害',true).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(2,player);
                    if(player.isHengZhi()){
                        await player.addGongJi();
                    }
                },
                check: function(event,player) {
                    if(player.countCards("h") > 3) return false;
                    return true;
                },
                ai: {
                    order: 3,
                    target:function(player,target){
                        return get.damageEffect(target, 2);
                    }
                },
                "_priority": 0
            },
            xingHongBaiLongBa: {
                trigger: {
                    player: "phaseBegin"
                },
                filter: function(event,player) {
                    return player.canBiShaBaoShi() && !player.isHengZhi();
                },
                content: async function(event,trigger,player) {
                    player.storage.huaLongFlag = true;
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                },
                group: ["xingHongBaiLongBa_tag","xingHongBaiLongBa_clear"],
                subSkill: {
                    tag: {
                        trigger:{player:['faShuBefore','teShuBefore']},
                        direct:true,
                        content:function(){
                            player.storage.huaLongFlag = false;
                        },
                        "_priority": 0
                    },
                    clear: {
                        trigger:{player:['phaseEnd']},
                        filter:function(event,player){
                            return player.isHengZhi() && !player.storage.huaLongFlag;
                        }, 
                        direct:true,
                        content:function(){
                            player.chongZhi();
                        },
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            xiaoTianLongQiang: {
                trigger: {
                    source: "gongJiWeiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([1,2],'h', function(card) {
                        if(ui.selected.cards.length==0) return get.type(card) =="gongJi";
                        // 接法術牌
                        else
                            return get.type(card) =="faShu";
                    }).set('filterOk',function(){
                        return ui.selected.cards.some(card => get.type(card)=="gongJi");
                    })
                    .set('prompt',get.prompt('xiaoTianLongQiang'))
                    .set('prompt2',lib.translate.xiaoTianLongQiang_info)
                    .set('complexCard',true).forResult();
                },
                content: async function(event,trigger,player) {
                    if(event.cards){
                        await player.discard(event.cards).set("showCards",true);
                        if(event.cards.length == 2) {
                            await trigger.player.faShuDamage(3,player);
                        } else {
                            await trigger.player.faShuDamage(2,player);
                        }
                        await player.faShuDamage(2,player);
                    }
                },
                "_priority": 0
            },
            juLongBenTeng: {
                enable: "faShu",
                type: "faShu",
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    const duishou = await player.chooseTarget(2,true)
                    .set('prompt',get.prompt('juLongBenTeng'))
                    .set('prompt2',lib.translate.juLongBenTeng_info)
                    .set('filterTarget',function(card,player,target){
                        if(ui.selected.targets.length == 0) return true;
                        else return target.side != ui.selected.targets[0].side;
                    }).set('complexTarget',true).forResult();
                    for(let target of duishou.targets) {
                        if(target.countCards('h')>5){
                            await target.chooseToDiscard(true,target.countCards('h')-5);
                        }else if(target.countCards('h')<5){
                            await target.draw(5-target.countCards('h'));
                        }
                    }
                    await player.addGongJiOrFaShu();
                },
                "_priority": 0
            },
            xieMoXiaoSan: {
                enable: "faShu",
                type: "faShu",
                filter: function(event,player) {
                    const bool1 = game.hasPlayer(function(current){
                        return lib.skill.xieMoXiaoSan.filterTarget('','',current);
                    });
                    const bool2 = player.hasCard(card => ["feng","shui"].includes(get.xiBie(card)))
                    return bool1 && bool2;
                },
                selectCard: 1,
                filterCard: function(card) {
                    return ["feng","shui"].includes(get.xiBie(card));
                },
                discard: true,
                showCards: true,
                filterTarget:function(card,player,target){
                    return target.hasJiChuXiaoGuo() || target.zhiLiao > 0;
                },
                content: async function(event,trigger,player) {
                    if(event.target.hasJiChuXiaoGuo() && event.target.zhiLiao > 0) {
                        // 選擇
                        event.yiChuWay = await player.chooseControl(["基礎效果","治療"])
                        .set('prompt', '選擇移除基礎效果或治療')
                        .set('ai', function(){
                            return "基礎效果";
                        }).forResult('control');
                    }else if(event.target.hasJiChuXiaoGuo()){
                        event.yiChuWay = "基礎效果";
                    }else if(event.target.zhiLiao > 0){
                        event.yiChuWay = "治療";
                    }
                    if(event.yiChuWay == "基礎效果"){
                        player.removeJiChuXiaoGuo(event.target);
                    }else if (event.yiChuWay == "治療") {
                        event.target.removeZhiLiao(1);
                    }
                    var duishou = await player.chooseTarget(1,'對一名對手造成2點法術傷害',true,function(card,player,target){
                        return player!=target && player.side != target.side;
                    }).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(2,player);
                },
                "_priority": 0
            },
            jingHuaDaDi: {
                enable: "faShu",
                type: "faShu",
                filter: function(event,player) {
                    return player.hasCard(card => get.xiBie(card)=="di");
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card)=="di";
                },
                discard: true,
                showCards: true,
                content: async function(event,trigger,player) {
                    const enemy_targets = game.filterPlayer(p => p.side != player.side);
                    for (let target of enemy_targets) {
                        await target.faShuDamage(1,player);
                    }
                    const friend_targets = game.filterPlayer(p => p != player && p.side == player.side);
                    for (let target of friend_targets) {
                        await target.changeZhiLiao(1);
                    }
                },
                "_priority": 0
            },
            yuanSuChongSheng: {
                enable: "faShu",
                type: "faShu",
                usable: 1,
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard('h',true,3);
                    await player.draw(3);
                    await player.addFaShu();
                },
                "_priority": 0
            },
            longZuZhenYan: {
                trigger: {
                    player: "gongJiEnd"
                },
                usable: 1,
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    if(event.gongJiMingZhong) {
                        player.storage.lastTarget = trigger.target;
                    } else {
                        player.storage.lastTarget = trigger.targets[0];
                    }
                    await player.addGongJi();
                },
                mod: {
                    playerEnabled: function(card,player,target){
                        if(target == player.storage.lastTarget) return false;
                    }
                },
                group: "longZuZhenYan_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseEnd",
                        },
                        silent: true,
                        content: function () {
                            if(player.storage.lastTarget){
                                player.storage.lastTarget = undefined;
                            }
                        },
                        sub: true,
                        sourceSkill: "longZuZhenYan",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                "_priority": 0
            },
            shangGuMiYu: {
                trigger: {
                    player: "gongJiSheZhi"
                },
                forced: true,
                filter: function(event,player) {
                    if(event.yingZhan) return false;
                    return player.storage.damageFaShu || player.storage.damageGongJi;
                },
                content: function() {
                    // 本回合造成過法術傷害，攻擊無法應戰
                    if(player.storage.damageFaShu) trigger.wuFaYingZhan();
                    // 本回合造成過攻擊傷害，本次攻擊傷害+1
                    if(player.storage.damageGongJi) trigger.changeDamageNum(1);
                },
                group: ["shangGuMiYu_damage","shangGuMiYu_clear"],
                subSkill: {
                    damage: {
                        trigger: {
                            source:'zaoChengShangHai'
                        },
                        direct: true,
                        content: async function(event,trigger,player){
                            if(trigger.faShu) {
                                player.storage.damageFaShu = true;
                            } else {
                                player.storage.damageGongJi = true;
                            }
                        },
                    },
                    clear: {
                        trigger: {
                            player: ["phaseBegin","phaseEnd"]
                        },
                        direct: true,
                        content: function() {
                            player.storage.damageFaShu = false;
                            player.storage.damageGongJi = false;
                        },
                        silent: true,
                        popup: false
                    }
                },
            },
            longHunNingShi: {
                trigger: {
                    source: "gongJiBefore"
                },
                filter: function(event,player){
                    return get.zhanJi(player.side).length > 0 && !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    var list=[];
                    const zhanJi = get.zhanJi(player.side);
                    for(var i=0;i<zhanJi.length;i++){
                        list.push([zhanJi[i],get.translation(zhanJi[i])]);
                    }
                    var next=player.chooseButton([
                        `龍魂凝視：移除我方【戰績區】1星石`,
                        [list,'tdnodes'],
                    ]);
                    next.set('forced',true);
                    next.set('ai',function(button){
                        if(button.link=='baoShi') return 0.5;
                        else return 1;
                    });
                    var links=await next.forResultLinks();
                    await player.removeZhanJi(links[0],1);
                    await player.addTempSkill('longHunNingShi_gongJi');
                },
                subSkill:{
                    gongJi:{
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return !event.yingZhan;
                        },
                        direct:true,
                        content: async function(event,trigger,player){
                            // 攻擊命中造成1點法術傷害
                            if(trigger.gongJiMingZhong){
                                await trigger.target.faShuDamage(1,player);
                            }
                            // 無論是否命中都應該移除此技能效果，避免本次沒有命中後續攻擊命中也能觸發1點法術傷害
                            await player.removeSkill('longHunNingShi_gongJi');
                        },
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            zhaiBian: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.hasCard(card=> get.xiBie(card)=="di");
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card) == "di";
                },
                discard: true,
                showCards: true,
                content: async function(event,trigger,player) {
                    if(!event.cards || event.cards.length == 0){
                        const qipai = await player.chooseCard(1,'h', true, function(card){
                            return get.xiBie(card) == "di";
                        })
                        .set('prompt',get.prompt('zhaiBian'))
                        .set('prompt2',lib.translate.zhaiBian_info)
                        .set('complexCard',true)
                        .set('ai',function(card){
                            return 1;
                        }).forResult();
                        event.cards = qipai.cards;
                        await player.discard(event.cards).set('showCards',true);
                    }
                    if(event.cards){
                        var targets = game.filterPlayer(p => p != player && p.isEnemyOf(player));
                        for (let i = 0; i < targets.length; i++) {
                            await targets[i].faShuDamage(1, player);
                        }
                        // 清空本輪的棄牌再按需觸發大招
                        event.cards = undefined;
                        await event.trigger("faDongJiNeng_youHun");
                    }
                },
                "_priority": 0
            },
            mingHuo: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.hasCard(card=> get.xiBie(card)=="huo");
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card) == "huo";
                },
                discard: true,
                showCards: true,
                selectTarget: 1,
                filterTarget: true,
                content: async function(event,trigger,player) {
                    if(!event.cards || event.cards.length == 0) {
                        const qipai = await player.chooseCard(1,'h', true, function(card){
                            return get.xiBie(card) == "huo";
                        })
                        .set('prompt',get.prompt('mingHuo'))
                        .set('prompt2',lib.translate.mingHuo_info)
                        .set('complexCard',true)
                        .set('ai',function(card){
                            return 1;
                        }).forResult();
                        event.cards = qipai.cards;
                        await player.discard(event.cards).set('showCards',true);
                    }
                    if(event.cards){
                        if(!event.targets || event.targets.length == 0){
                            var choose = await player.chooseTarget(1,"對任意角色造成2點法術傷害", true).forResult();
                            event.targets = choose.targets;
                        }
                        await event.targets[0].faShuDamage(2,player);
                        // 清空本輪的棄牌和目標再按需觸發大招
                        event.cards = undefined;
                        event.targets = undefined;
                        await event.trigger("faDongJiNeng_youHun");
                    }
                },
                "_priority": 0
            },
            fuShi: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                filter: function(event,player) {
                    return player.hasCard(card=> get.xiBie(card)=="shui");
                },
                content: async function(event,trigger,player) {
                    // 響應技取消了就沒有反悔了
                    const qipai = await player.chooseCard(1,'h',function(card){
                        return get.xiBie(card) == "shui";
                    })
                    .set('prompt',get.prompt('fuShi'))
                    .set('prompt2',lib.translate.fuShi_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 1;
                    }).forResult();
                    if(qipai.cards){
                        await player.discard(qipai.cards).set('showCards',true);
                        var choose = await player.chooseTarget(1,"對任意角色造成1點法術傷害", true)
                        .set('ai',function(target){
                            const player = _status.event.player;
                            return get.damageEffect2(target,player,1);
                        }).forResult();
                        await choose.targets[0].faShuDamage(1,player);
                        await event.trigger("faDongJiNeng_youHun");
                    }
                },
                "_priority": 0
            },
            youHunFenShen: {
                trigger: {
                    player: "faDongJiNeng_youHun"
                },
                usable: 1,
                filter: function(event,player) {
                    return lib.skill[event.name].filter(event,player) && player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    // 額外發動一次技能,並且表明是大招發動的,不給予反悔
                    await player.useSkill(trigger.name);
                },
                "_priority": 0
            },
            diMaiZhiLi: {
                trigger: {
                    player: "gongJiSheZhi"
                },
                forced: true,
                filter: function(event,player) {
                    return ["di","an"].includes(get.xiBie(event.card));
                },
                content: async function(event,trigger,player) {
                    await trigger.changeDamageNum(1);
                },
                "_priority": 0
            },
            poXieZhan: {
                enable:'gongJi',
                filter:function(event,player){
                    if(player.isHengZhi() && player.countCards("h")>=2){
                        // 蓋亞化身形態內，且牌數大於等於2即可發動（形態內所有牌均可視為地裂斬）
                        return player.storage.poXieZhan_enabled;
                    }
                    var bool1=player.countTongXiPai()>=2;
                    var bool2=game.hasPlayer(current=>lib.skill.qiZha.filterTarget('',player,current));
                    return bool1&&bool2 && player.storage.poXieZhan_enabled;
                },
                selectCard:[2,3],
                filterCard:function(card,player,event){
                    if(player.isHengZhi()){
                        // 蓋亞化身形態內無視同繫條件
                        return true;
                    }
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                filterTarget:function(card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
                content:async function(event, trigger, player){
                    // 判斷同系
                    if(player.isHengZhi()){
                        const qiPai_xiBie = get.xiBie(event.cards[0]);
                        if(event.cards.every(card => get.xiBie(card) === qiPai_xiBie)){
                            // 由玩家選擇是否轉化為地裂斬
                            var zhuanhua = await player.chooseControl(['是', '否'])
                                .set('prompt', '是否將同系牌全部轉化為地裂斬？')
                                .set('ai', function () {
                                    return '是';
                                })
                                .forResult();
                            if (zhuanhua.control == '是') {
                                for(let card of event.cards) {
                                    await game.broadcastAll(function(card) {
                                        game.setXiBie(card,"di");
                                        card.name = "diLieZhan";
                                    },card);
                                }
                            }
                        } else {
                            // 存在異系，強制轉化為地裂斬
                            for(let card of event.cards) {
                                await game.broadcastAll(function(card) {
                                    game.setXiBie(card,"di");
                                    card.name = "diLieZhan";
                                },card);
                            }
                        }
                    }
                    await player.discard(event.cards).set("showCards",true);
                    var length=event.cards.length;
                    var xiBie,name;
                    if(length==2){
                        xiBie = "di";
                        name = "diLieZhan";
                    }else if(length==3){
                        xiBie='an';
                        name='anMie';
                    }
                    var card={name:name,xiBie:xiBie};
                    await player.useCard(card,event.target).set('action',true);
                },
                "_priority": 0
            },
            shengShengBuXi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.countCards('h') > 0;
                },
                selectCard: 1,
                filterCard: true,
                discard: true,
                content: async function(event,trigger,player) {
                    await player.draw(2);
                    player.storage.poXieZhan_enabled = false;
                    await player.addGongJi();
                },
                group: "shengShengBuXi_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin"
                        },
                        forced: true,
                        content: function() {
                            player.storage.poXieZhan_enabled = true;
                        },
                        silent: true,
                        popup: false,
                        sub: true,
                        sourceSkill: "shengShengBuXi",
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            gaiYaHuaShen: {
                trigger: {
                    player: "phaseEnd"
                },
                filter: function(event,player) {
                    return !player.isHengZhi() && player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                },
                group: ["gaiYaHuaShen_gongJi","gaiYaHuaShen_clear","gaiYaHuaShen_mods"],
                subSkill: {
                    gongJi: {
                        trigger: {
                            player: "gongJiSheZhi"
                        },
                        forced: true,
                        filter: function(event,player) {
                            return player.isHengZhi();
                        },
                        content: async function(event,trigger,player) {
                            await trigger.changeDamageNum(1);
                        },
                        "_priority": 1
                    },
                    clear: {
                        trigger: {
                            player: "chengShouShangHai"
                        },
                        forced: true,
                        filter: function(event,player) {
                            return !event.faShu && player.isHengZhi();
                        },
                        content: async function(event,trigger,player) {
                            await player.chongZhi();
                        },
                        "_priority": 1
                    },
                    mods: {
                        enable:['gongJi','yingZhan'],
                        filter:function(event,player){
                            var event=event||_status.event;
                            // 可以應戰
                            if(event.name=='yingZhan') return player.isHengZhi() && event.canYingZhan;
                            // 主動攻擊
                            return player.isHengZhi();
                        },
                        filterCard:function(card,player,event){
                            var event=event||_status.event;
                            if(event.name=='yingZhan'){
                                // 地系可以用所有基礎牌應戰，否則要用相同系應戰
                                return get.xiBie(event.card)=="di";
                            }
                            return true;
                        },
                        position:'h',
                        viewAs:function(cards,player){
                            if(cards.length==0) return;
                            var dict={name:"diLieZhan",xiBie:"di"};
                            return dict;
                        }
                    }
                },
                "_priority": 0
            },
            xiaoChouDeBaXi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return get.zhanJi(player.side).includes("baoShi");
                },
                content: async function(event,trigger,player) {
                    await player.changeZhanJi("baoShi",-1);
                    await player.changeZhanJi("shuiJing",1);
                    var duishou = await player.chooseTarget(1,'選擇目標角色造成1點法術傷害',true).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(1,player);
                    await player.addGongJi();
                },
                "_priority": 0
            },
            wuTaiMoShuShi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return get.zhanJi(player.side).includes("shuiJing") || get.zhanJi(!player.side).includes("shuiJing");
                },
                content: async function(event,trigger,player) {
                    var zhanJi=get.zhanJi(player.side).slice();
                    var zhanJi2=get.zhanJi(!player.side).slice();
                    var num=0;
                    var num2=0;
                    for(var xingShi of zhanJi){
                        if(xingShi == 'shuiJing') num++;
                    }
                    for(var xingShi of zhanJi2) {
                        if(xingShi == 'shuiJing') num2++;
                    }
                    if(num>0){
                        await player.changeZhanJi('shuiJing',-num,player.side);
                        await player.changeZhanJi('baoShi',num,player.side);
                    }
                    if(num2>0){
                        await player.changeZhanJi('shuiJing',-num2,!player.side);
                        await player.changeZhanJi('baoShi',num2,!player.side);
                    }
                    await player.chooseToDiscard("h",true,num+num2);
                },
                "_priority": 0
            },
            guiPai: {
                enable: "yingZhan",
                filter:function(event,player){
                    var event=event||_status.event;
                    // 可以應戰
                    return event.canYingZhan && player.canBiShaShuiJing();
                },
                filterCard:function(card,player,event){
                    return true;
                },
                position:'h',
                discard: true,
                filterTarget:function(card,player,target){
                    var yingZhan_event=_status.event.getParent("_yingZhan");
                    // 只能應戰敵方角色，且不能是本次攻擊的來源
                    return player != target && player.side != target.side && target != yingZhan_event.source;
                },
                viewAs:function(cards,player){
                    if(cards.length==0) return;
                    const trigger = _status.event;
                    trigger.source = player;
                    return trigger.card;
                },
                group: ["guiPai_tiaoJian","guiPai_xiaoGuo"],
                subSkill:{
                    tiaoJian:{
                        trigger:{player:'useCardBefore'},
                        firstDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.skill=='guiPai';
                        },
                        content: async function(event,trigger,player) {
                            await player.removeBiShaShuiJing();
                            trigger.card.mingGe = "";
                            //console.log(trigger);
                        },
                        "_priority": 1
                   },
                    xiaoGuo:{
                        trigger:{player:'gongJiBefore'},
                        firstDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.skill=='guiPai';
                        },
                        content: async function(event,trigger,player) {
                            await player.changeZhanJi("baoShi",1,player.side);
                        },
                        "_priority": 1
                   }
                },
                "_priority": 1
            },
            xingChenShouHu: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                filter: function(event,player) {
                    return player.hasCard(card => get.xiBie(card)=="shui");
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[1,Infinity],function(card){
                        return get.xiBie(card)=="shui";
                    })
                    .set('prompt',get.prompt('xingChenShouHu'))
                    .set('prompt2',lib.translate.xingChenShouHu_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    if(event.cards){
                        await player.discard(event.cards).set("showCards",true);
                    }
                },
                "_priority": 0
            },
            mingYunDiaoKe: {
                type: "faShu",
                enable: "faShu",
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return player.side == target.side && player != target;
                },
                content: async function(event,trigger,player) {
                    if(event.target.countCards("h") >= 2) {
                        event.giveCard = await event.target.chooseCard('h',"將2張牌交給目標隊友",true,2).forResult();
                        await event.target.give(event.giveCard.cards,player);
                    }else if(event.target.countCards("h") == 1) {
                        event.giveCard = await event.target.chooseCard('h',"將1張牌交給目標隊友",true,1).forResult();
                        await event.target.give(event.giveCard.cards,player);
                    }
                    if(player.countCards("h") >= 2) {
                        event.lendCard = await player.chooseCard('h',"將2張牌交給目標隊友",true,2).forResult();
                        const lendTarget = await player.chooseTarget(1,true,function(card,player,target){
                            return player.side == target.side && player != target;
                        }).forResult();
                        await player.give(event.lendCard.cards,lendTarget.targets[0]);
                    }else if(player.countCards("h") == 1){
                        event.lendCard = await player.chooseCard('h',"將1張牌交給目標隊友",true,1).forResult();
                        const lendTarget = await player.chooseTarget(1,true,function(card,player,target){
                            return player.side == target.side && player != target;
                        }).forResult();
                        await player.give(event.lendCard.cards,lendTarget.targets[0]);
                    }
                    await player.changeZhanJi("baoShi", 1, player.side);
                },
                "_priority": 0
            },
            xingWenYongDong: {
                trigger: {
                    player: "faShuEnd"
                },
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards("h")>0){
                        await player.chooseToDiscard("h",1,true);
                    }
                    await player.addFaShu();
                },
                "_priority": 0
            },
            anZhiWanGe: {
                enable:['gongJi','yingZhan'],
                filter:function(event,player){
                    var event=event||_status.event;
                    // 可以應戰
                    if(event.name=='yingZhan') return event.canYingZhan && player.hasCard(card => get.xiBie(card)=="guang");
                    // 主動攻擊
                    return player.hasCard(card => get.xiBie(card)=="guang");
                },
                filterCard:function(card,player,event){
                    return get.xiBie(card)=="guang";
                },
                position:'h',
                viewAs:function(cards,player){
                    if(cards.length==0) return;
                    var dict={name:"anMie",xiBie:"an"};
                    return dict;
                },
                "_priority": 0
            },
            zhenHunQu: {
                trigger: {
                    player: "gongJiMingZhong"
                },
                filter: function(event,player){
                    return !event.yingZhan && player.countCards('h', card => get.type(card) == 'faShu') > 0;
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[1,Infinity],function(card){
                        return get.type(card) == 'faShu';
                    })
                    .set('prompt',get.prompt('zhenHunQu'))
                    .set('prompt2',lib.translate.zhenHunQu_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set("showCards",true);
                    await trigger.target.faShuDamage(event.cards.length,player);
                    await player.faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            eShaGuangMing: {
                trigger: {
                    player: "gongJiMingZhong"
                },
                filter: function(event,player){
                    return !event.yingZhan && player.countTongXiPai() >= 2 && player.canBiShaShuiJing();
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[2,Infinity],function(card){
                        return get.xuanZeTongXiPai(card);
                    })
                    .set('prompt',get.prompt('eShaGuangMing'))
                    .set('prompt2',lib.translate.eShaGuangMing_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.discard(event.cards).set("showCards",true);
                    await trigger.changeDamageNum(event.cards.length);
                },
                "_priority": 2
            },
            xiSheng: {
                trigger: {
                    player: "phaseBegin"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    await player.draw(1);
                },
                "_priority": 2
            },
            shenShengHuWei: {
                trigger: {
                    global: "changeShiQiAfter"
                },
                forced: true,
                filter: function(event,player) {
                    if(event.getParent().name =="_heCheng_backup") return false;    // 過濾合杯導致的士氣下降
                    if(event.cause != "damage") return false;   // 過濾非傷害導致的士氣下降
                    if(event.side!=player.side) return false;    // 改變對方士氣不發動
                    if(event.num>=0) return false;  // 增加士氣不發動
                    return true;
                },
                content: async function(event,trigger,player) {
                    await trigger.player.changeZhiLiao(1,player);
                },
                "_priority": 0
            },
            shenShengBiHu: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    player.storage.shenShengBiHu = true;
                },
                group: "shenShengBiHu_ZhiLiao",
                subSkill: {
                    ZhiLiao:{
                        trigger: {
                            player: "damageAfter"
                        },
                        forced: true,
                        silent: true,
                        filter: function(event,player) {
                            return player.storage.shenShengBiHu;
                        },
                        content: async function(event,trigger,player) {
                            player.storage.shenShengBiHu = false;
                            await player.changeZhiLiao(1,player);
                        },
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            jueDiFanJi: {
                trigger: {
                    player: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    const targets = game.filterPlayer(p => p.side == player.side);
                    return player.canBiShaBaoShi() && !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    // 移除我方所有治療
                    let zhiLiaoSum = 0;
                    var targets = game.filterPlayer(p => p.side == player.side);
                    for (let target of targets) {
                        zhiLiaoSum += target.zhiLiao;
                        await target.changeZhiLiao(-target.zhiLiao,player);
                    }
                    await trigger.changeDamageNum(zhiLiaoSum + 1);
                },
                "_priority": 0
            },
            lingHunShouGe: {
                trigger: {
                    player: "gongJiEnd"
                },
                filter:function(event,player){
                    return !event.yingZhan && event.gongJiMingZhong && player.hasCard(card => get.xiBie(card)=="shui");
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard(1,'h', card => get.xiBie(card) == "shui")
                    .set('prompt',get.prompt('lingHunShouGe'))
                    .set('prompt2',lib.translate.lingHunShouGe_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: async function(event,trigger,player){
                    await player.discard(event.cards).set("showCards",true);
                    if(trigger.target.countNengLiangAll() > 0){
                        var choicelist=[`額外移除其1點能量`,'對其造成1點法術傷害'];
                        event.result = await player.chooseControl().set('choiceList',choicelist).set('prompt','靈魂收割：選擇一項').set('ai',function(){
                            return 1;
                        }).forResult();
                    }
                    if(!event.result) {
                        await trigger.target.faShuDamage(1,player);
                    }else {
                        if(event.result.index==1){
                            await trigger.target.faShuDamage(1,player);
                        }else if(event.result.index==0){
                            // 統計對方能量情況
                            let list=[];
                            for(let i=0;i<trigger.target.countNengLiang('baoShi');i++){
                                list.push(['baoShi','寶石']);
                            }
                            for(let i=0;i<trigger.target.countNengLiang('shuiJing');i++){
                                list.push(['shuiJing','水晶']);
                            }
                            const result = await player.chooseButton(["額外移除其1點能量",[list,'tdnodes']])
                            .set('selectButton',1)
                            .set('forced',true)
                            .forResult();
                            await trigger.target.changeNengLiang(result.links[0],-1);
                        }
                    }
                },
                "_priority": 1
            },
            zhouShuJiDang: {
                trigger:{player:'faShuAfter'},
                content:function(){
                    player.addGongJi();
                },
                "_priority": 0
            },
            zhouFu: {
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool1=player.canBiShaShuiJing();
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.zhouFu.filterTarget('',player,current);
                    });
                    return bool1&&bool2
                },
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    event.target.storage.zhouFuSource=player;   // 存儲咒縛來源對象
                    await event.target.addSkill('zhouFu_xiaoGuo');
					await event.target.addMark('zhouFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        priority:2,
                        trigger:{player:'phaseBefore'},
                        forced:true,
                        markimage:'image/card/zhuanShu/zhouFu.jpg',
                        intro:{
                            content: `[水晶]將【咒縛】放置於目標對手前，<span class='tiaoJian'>(擁有此卡的角色回合開始前)</span>他選擇以下一項發動:<br>
                            跳過他的回合<br>
                            你對他造成3點法術傷害③，繼續他的回合。<br>
                            觸發後移除此卡。<br>
                            【咒縛】為咒術師的專屬牌，上限為1。`,
                            nocount:true,
                        },
                        onremove:'storage',
                        filter:function(event,player){
                            return player.hasZhiShiWu('zhouFu_xiaoGuo');
                        },
                        content: async function(event,trigger,player){
                            var list=[`受到3點法術傷害`,'跳過本回合'];
                            var result = await player.chooseControl().set('choiceList',list).set('prompt','咒縛：選擇一項').set('ai',function(){
                                var player=_status.event.player;
                                if(player.countCards('h') + 3 <= player.getHandcardLimit() + player.ZhiLiao){
                                    return 0;
                                }else{
                                    return 1;
                                }
                            }).forResult();
                            if(result.index==1){
                                await trigger.cancel();
                            }else if(result.index==0){
                                await player.faShuDamage(3,player.storage.zhouFuSource); 
                            }
                            delete player.storage.zhouFuSource;
                            await player.removeZhiShiWu('zhouFu_xiaoGuo');
                            await player.removeSkill('zhouFu_xiaoGuo');
                        },
                    }
                },
                ai:{
                    shuiJing: true,
					order:function(item,player){
						var num=game.filterPlayer(function(current){
							return current.side != player.side && current.countCards('h') + 3 > current.getHandcardLimit();
						});
						if(num.length>=1){
							return 3.4;
						}else{
							return 3;
						}
					},
					basic:{
						useful:[4,1],
						value:[5,3,1],
					},
					result:{
						target:function(player,target){
							return -target.countCards('h');
						}
					}
				},
                "_priority": 0
            },
            zhanZhengGeYao: {
                type: "faShu",
                enable: "faShu",
                selectTarget: 1,
                filterTarget: function(card,player,target) {
                    return player.side != target.side;
                },
                content: async function(event,trigger,player) {
                    await player.draw(1);
                    await event.target.draw(1);
                    var targets = game.filterPlayer(p => p != player && p.side == player.side);
                    for (let target of targets) {
                        await target.chooseToDiscard("h",1)
                        .set("prompt","戰爭歌謠：你可以選擇棄1張牌")
                        .set('ai',function(){
                            return 1;
                        });
                    }
                },
                "_priority": 0
            },
            zhanYiGongMing: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.hasCard(card=> get.xiBie(card)==get.xiBie(event.card));
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard(1,'h', card => get.xiBie(card) == get.xiBie(trigger.card))
                    .set('prompt',get.prompt('zhanYiGongMing'))
                    .set('prompt2',lib.translate.zhanYiGongMing_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.showCards(event.cards);
                    const result = await player.chooseTarget(1,'選擇1名你的隊友獲得此同系牌',true,function(card,player,target){
                        return player.side == target.side && player != target;
                    }).forResult();
                    const target = result.targets[0];
                    await player.give(event.cards,target);
                    await player.changeZhanJi("baoShi",1);
                },
                "_priority": 0
            },
            xiWangZhiGe: {
                markimage:'image/card/zhuanShu/xiWangZhiGe.jpg',
                intro:{
                    name:'(專)希望之歌',
                    content: `
                        <span class="greentext">[響應]鬥志激昂</span><br>
                        <span class='tiaoJian'>(擁有此卡的角色獲得，攻擊命中時②，移除此卡)</span>本次攻擊傷害額外+2。<br>
                        <span class="greentext">[被動]堅毅不屈</span><br>
                        <span class='tiaoJian'>(擁有此卡的角色獲得，回合結束時)</span>+1[治療]。<br>
                    `,
                    nocount:true,
                },
                onremove:'storage',
                group:["xiWangZhiGe_douZhiJiAng","xiWangZhiGe_jianYiBuQu"],
                subSkill: {
                    douZhiJiAng: {
                        trigger: {
                            player: "gongJiMingZhong"
                        },
                        filter: function(event,player){
                            return player.hasZhiShiWu('xiWangZhiGe');
                        },
                        content: async function(event,trigger,player) {
                            await trigger.changeDamageNum(2);
                            // 移除希望之歌及其效果
                            await player.removeSkill('xiWangZhiGe');
                            await player.removeZhiShiWu('xiWangZhiGe');
                            await player.update();
                        },
                        "_priority": 1
                    },
                    jianYiBuQu: {
                        trigger: {
                            player: "phaseEnd"
                        },
                        forced: true,
                        filter: function(event,player){
                            return player.hasZhiShiWu('xiWangZhiGe');
                        },
                        content: async function(event,trigger,player) {
                            await player.changeZhiLiao(1);
                        },
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            yingXiongZhanGe: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaBaoShi() && game.filterPlayer((function(current){
                        return current.hasZhiShiWu('xiWangZhiGe');
                    })).length == 0;
                },
                selectTarget: 1,
                filterTarget: true,
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    await event.target.addSkill('xiWangZhiGe');
					await event.target.addZhiShiWu('xiWangZhiGe');
                    await event.target.update();
                    await player.addGongJi();
                },
                "_priority": 0
            }
        },
        translate: {
            youXia: "遊俠",
            youXia_name: "溫蒂",
            zhanXingJia: "占星家",
            zhanXingJia_name: "蒂雅",
            tianmaqishi: "天馬騎士",
            tianmaqishi_name: "伊莎貝拉",
            shengtangcike: "聖堂刺客",
            shengtangcike_name: "殘月",
            dasiji: "大司祭",
            dasiji_name: "羅格",
            lianjinshushi: "鍊金術士",
            lianjinshushi_name: "陶",
            xuetianshi: "血天使",
            xuetianshi_name: "茜拉",
            xinlingsushi: "心靈塑師",
            xinlingsushi_name: "艾莉西婭",
            zhenLongNvWang: "真龍女王",
            zhenLongNvWang_name: "索菲亞",
            caijuezhe: "裁決者",
            caijuezhe_name: "路西菲爾",
            jianwuzhe: "劍舞者",
            jianwuzhe_name: "黛",
            shuangxuegongzhu: "霜雪公主",
            shuangxuegongzhu_name: "薩紋蕾緹",
            shouwangzhe: "守望者",
            shouwangzhe_name: "米莉塔",
            wudoujia: "武鬥家",
            wudoujia_name: "孟克",
            fengbaozhizhengguan: "風暴執政官",
            fengbaozhizhengguan_name: "萊茵哈特",
            longzhiqiyuezhe: "龍之契約者",
            longzhiqiyuezhe_name: "洛薩",
            longqitongshuai: "龍騎統帥",
            longqitongshuai_name: "崔凡克",
            qumozhe: "驅魔者",
            qumozhe_name: "克里歐斯",
            longyuzhe: "龍語者",
            longyuzhe_name: "亞斯塔露",
            youhunfashi: "幽魂法師",
            youhunfashi_name: "維羅妮卡",
            dadiwushi: "大地武士",
            dadiwushi_name: "阿基特",
            beifangzhuzhe: "被放逐者",
            beifangzhuzhe_name: "阿帕蒂",
            xingwenshi: "星紋師",
            xingwenshi_name: "斯通",
            anzhiwangnv: "暗之王女",
            anzhiwangnv_name: "辛德蕾拉",
            huangjiashiwei: "皇家侍衛",
            huangjiashiwei_name: "貝拉維恩",
            zhoushushi: "咒術師",
            zhoushushi_name: "奈落",
            zhangejisi: "戰歌祭司",
            zhangejisi_name: "法芙娜",


            zhuiFengJi: "[被動]追風刺",
            "zhuiFengJi_info": "你的風系攻擊無法應戰。",
            zhuRiJian: "[法術]逐日箭",
            "zhuRiJian_info": "<span class='tiaoJian'>(棄一張火系牌[展示])</span>對目標對手造成2點法術傷害③。",
            lingDongZhiWu: "[響應]靈動之舞",
            "lingDongZhiWu_info": "[水晶]<span class='tiaoJian'>([攻擊行動]結束後)</span>額外+1[法術行動]。",
            zhanPuWeiLai: "[被動]占卜未來",
            "zhanPuWeiLai_info": "回合開始時，翻開2張牌庫頂的牌，將其面朝上放置在你的角色旁作為【預兆】。回合結束時移除所有【預兆】。",
            lieHuoFenShen: "[被動]烈焰焚身",
            "lieHuoFenShen_info": "你的主動攻擊傷害額外+X(X為火系【預兆】數)。",
            hanBingHuTi: "[被動]寒冰護體",
            "hanBingHuTi_info": "<span class='tiaoJian'>(你獲得一個水系【預兆】時)</span>目標角色+1【治療】",
            leiTingZhiNu: "[被動]雷霆之怒",
            "leiTingZhiNu_info": "<span class='tiaoJian'>(你的回合結束前)</span>對目標角色造成X點法術傷害③(X為雷系、光系、暗系【預兆】的數之和)。",
            guangYingJiaoCuo: "[被動]光影交錯",
            "guangYingJiaoCuo_info": "<span class='tiaoJian'>(你獲得光系或者暗系【預兆】時)</span>額外翻開牌庫頂1張牌，將其面朝上放置在你的角色旁作為【預兆】。",
            daYuYanShu: "[法術]大預言術",
            "daYuYanShu_info": "[寶石]翻開2張牌庫頂的牌，將其面朝上放置在你的角色旁作為【預兆】。額外+1[攻擊行動]或[法術行動]。",
            jianta: "[被動]踐踏",
            "jianta_info": "你發動的所有攻擊傷害額外+1。",
            zhuixing: "[響應]墜星",
            "zhuixing_info": "[水晶]<span class='tiaoJian'>(攻擊前①)</span>本次攻擊無法應戰。",
            zhuiYingJi: "[響應]追影擊",
            "zhuiYingJi_info": "[回合限定]<span class='tiaoJian'>(主動攻擊結束後)</span>額外+1[攻擊行動]，你的下次主動攻擊只能攻擊本回合主動攻擊過的對手。",
            tiGu: "[響應]剔骨",
            "tiGu_info": "[回合限定][寶石]<span class='tiaoJian'>(攻擊命中時②)</span>本次攻擊傷害額外+2。",
            shengGuangShanYao: "[法術]聖光閃耀",
            "shengGuangShanYao_info": "<span class='tiaoJian'>(棄1張法術牌[展示])</span>任意分配3[治療]給X名角色，X最高為3，最低為1。",
            jiuShu: "[法術]救贖",
            "jiuShu_info": "<span class='tiaoJian'>(摸1張牌[強制])</span>你和目標隊友各+1[治療]。",
            shenShengCaiJue: "[法術]神聖裁決",
            "shenShengCaiJue_info": `[水晶]你選擇以下一項發動:<br>
            你和目標角色各棄2張牌<br>
            你和目標角色各摸2張牌[強制]<br>`,
            tanLanZhiXin: "[法術]貪婪之心",
            "tanLanZhiXin_info": "<span class='tiaoJian'>(棄2張同系牌[展示])</span>目標對手棄1張【暗滅】或【聖光】[展示];若其不如此做，則你對他造成2點法術傷害③。",
            wanWuYanMie: "[法術]萬物湮滅",
            "wanWuYanMie_info": "[寶石]你對所有對手各造成2點法術傷害③。",
            lieDiMaiChong: "[法術]裂地脈衝",
            "lieDiMaiChong_info": "<span class='tiaoJian'>(棄1張雷系或地系牌[展示])</span>對目標對手造成1點法術傷害③。",
            lianLeiDiYu: "[法術]煉雷地獄",
            "lianLeiDiYu_info": "<span class='tiaoJian'>(棄2張雷系或地系牌[展示])</span>對目標對手造成2點法術傷害③。",
            shiXueZhiXin: "[響應]嗜血之心",
            "shiXueZhiXin_info": "[寶石]<span class='tiaoJian'>(對目標角色造成法術傷害③時)</span>本次法術傷害③額外+2。",
            huanXiangChongJi: "[響應]幻象衝擊",
            "huanXiangChongJi_info": `<span class='tiaoJian'>(主動攻擊前①,暗置三張牌)</span>攻擊目標選擇以下一項發動:<br>
            <span class='tiaoJian'>(不翻開暗置牌)</span>該攻擊視為一次3點傷害的暗系攻擊<br>
            <span class='tiaoJian'>(翻開暗置牌)</span>根據翻開暗置牌的結果，心靈塑師選擇以下一項發動:<br>
            <span class='tiaoJian'>(若暗置牌為同系)</span>該攻擊視為一次3點傷害的暗系攻擊，目標隊友+1[寶石]<br>
            <span class='tiaoJian'>(若暗置牌不為同系)</span>本次攻擊無效且你對自己造成5點法術傷害③，攻擊目標+1[治療]。`,
            xinLingFengBao: "[法術]心靈風暴",
            "xinLingFengBao_info": `<span class='tiaoJian'>(暗置兩張牌[強制])</span>目標對手選擇以下一項發動:<br>
            <span class='tiaoJian'>(不翻開暗置牌)</span>心靈塑師對該對手造成1點法術傷害③，目標角色+1[治療]<br>
            <span class='tiaoJian'>(翻開暗置牌)</span>根據翻開暗置牌的結果，心靈塑師選擇以下一項發動:<br>
            <span class='tiaoJian'>(若暗置牌均為法術牌)</span>心靈塑師對該對手造成2點法術傷害③，分配2[治療]給X名角色，X最高為2，最低為1<br>
            <span class='tiaoJian'>(若暗置牌不均為法術牌)</span>本次法術無效且你對自己造成5點法術傷害③，對方【戰績區】+1[寶石]。`,
            zhenShiHuanJue: "[響應]真實幻覺",
            "zhenShiHuanJue_info": "[回合限定]<span class='tiaoJian'>([攻擊行動]或[法術行動]結束時,若你因【幻象衝擊】或【心靈風暴】對自己造成法術傷害③)</span>額外+1[攻擊行動]或[法術行動]。",
            gaiBianShiJie: "[響應]改變世界",
            "gaiBianShiJie_info": `[水晶]選擇以下一項發動:<br>
            <span class='tiaoJian'>(發動【幻象衝擊】時攻擊目標選擇“不翻開暗置牌”)</span>改為他選擇“翻開暗置牌”且你選擇“若暗置牌為同系”這一效果執行<br>
            <span class='tiaoJian'>(發動【心靈風暴】時該對手選擇“不翻開暗置牌”)</span>改為他選擇“翻開暗置牌”且你選擇“若暗置牌均為法術牌”這一效果執行。`,
            yuanGuJinZhi: "[被動]遠古禁制",
            "yuanGuJinZhi_info": "遊戲初始時,你擁有<span class='greentext'>【龍語封印】</span>,<span class='greentext'>【馭龍結界】</span>,<span class='greentext'>【龍狂迷鎖】</span>,<span class='greentext'>【龍脈束縛】</span>4種<span class='hong'>【禁制】</span>。",
            zhenLongJueXing: "[被動]真龍覺醒",
            "zhenLongJueXing_info": "<span class='tiaoJian'>(我方士氣下降或場上有【星杯】合成時)</span>翻轉任意1張<span class='hong'>【禁制】</span>牌。<span class='tiaoJian'>(你的回合結束時)</span>重新翻回所有<span class='hong'>【禁制】</span>牌。",
            longHunShouHu: "[被動]龍魂守護",
            "longHunShouHu_info": "<span class='tiaoJian'>([法術行動]結束後)</span>你+1[治療]。",
            longShenEnHui: "(專)[被動]龍神恩惠",
            longShenEnHui_xiaoGuo: "龍神恩惠",
            "longShenEnHui_info": "<span class='tiaoJian'>([攻擊行動]結束後)</span>額外+1[法術行動]。<span class='greentext'>【龍語封印】</span>存在時不能發動該技能。",
            longWangZhiLi: "(專)[響應]龍王之力",
            longWangZhiLi_xiaoGuo: "龍王之力",
            "longWangZhiLi_info": "<span class='tiaoJian'>(攻擊命中時②,棄X張異系牌[展示])</span>本次攻擊傷害額外+X。<span class='greentext'>【龍脈束縛】</span>存在時不能發動該技能。",
            shengLongWeiYa: "(專)[被動]聖龍威壓",
            shengLongWeiYa_xiaoGuo: "聖龍威壓",
            "shengLongWeiYa_info": "你的攻擊無法應戰，你也不能執行應戰攻擊。<span class='greentext'>【馭龍結界】</span>存在時不能發動該技能。",
            baiWanLongYan: "(專)[法術]百萬龍炎",
            baiWanLongYan_xiaoGuo: "百萬龍炎",
            "baiWanLongYan_info": "<span class='tiaoJian'>(摸X張牌[強制]，X最高為2，最低為0，然後棄Y張同系牌[展示])</span>對自己和目標角色各造成Y點法術傷害③。<span class='greentext'>【龍狂迷鎖】</span>存在時不能發動該技能。",
            longZuFuXing: "[響應]龍族復興",
            "longZuFuXing_info": "[回合限定][寶石]<span class='tiaoJian'>(回合結束時翻回任一<span class='hong'>【禁制】</span>時發動)</span>該<span class='hong'>【禁制】</span>永久翻轉。",
            longKuangMiSuo: "龍狂迷鎖",
            longMaiShuFu: "龍脈束縛",
            longYuFengYin: "龍語封印",
            yuLongJieJie: "馭龍結界",
            zhengYiZhuiJi: "[被動]正義追擊",
            "zhengYiZhuiJi_info": "<span class='tiaoJian'>(你的回合結束時，若本回合對方士氣下降)</span>你額外獲得一個回合。",
            caiJueZhiXin: "[被動]裁決之心",
            "caiJueZhiXin_info": "遊戲初始時，你+2[水晶]；你執行【合成】時我方[星杯區]不會增加[星杯]。",
            zhenLiCaiJue: "[被動]真理裁決",
            "zhenLiCaiJue_info": "你造成的所有傷害只能被最多1點[治療]抵禦。",
            songZhongDaoFeng: "[響應]送終刀鋒",
            "songZhongDaoFeng_info": `[水晶]<span class='tiaoJian'>(主動攻擊前①)</span>選擇以下一項發動:<br>
            <span class='tiaoJian'>(若你的手牌數小於攻擊目標的手牌數)</span>本次攻擊傷害額外+1;<br>
            <span class='tiaoJian'>(若你的手牌數大於攻擊目標的手牌數)</span>本次攻擊無法應戰;<br>
            <span class='tiaoJian'>(若你的手牌數等於攻擊目標的手牌數)</span>本次攻擊傷害額外+1且無法應戰。`,
            wuJinZhiRen: "[法術]無盡之刃",
            "wuJinZhiRen_info": "[水晶]<span class='tiaoJian'>(棄2張法術牌或3張同系牌[展示])</span>對目標角色和自己各造成2點法術傷害③。",
            weiJianErSheng: "[響應]為劍而生",
            "weiJianErSheng_info": "<span class='tiaoJian'>(主動攻擊未命中時②,棄X張法術牌[展示])</span>對攻擊目標以外的目標角色造成X點法術傷害③。",
            duiJianErShi: "[響應]對劍而誓",
            "duiJianErShi_info": "<span class='tiaoJian'>(主動攻擊命中時②,棄X張同系牌[展示])</span>對攻擊目標以外的目標角色造成X點法術傷害③。",
            jianWuYiShi: "[法術]劍舞儀式",
            "jianWuYiShi_info": "[寶石][橫置]直到你的回合結束前,你的手牌上限+3;摸3張牌[強制];額外+1[攻擊行動]。【劍舞儀式】的效果結束時[重置]。",
            bingShuangLingYu: "[被動]冰霜領域",
            "bingShuangLingYu_info": "你的[治療]上限+1;遊戲開始時本方所有角色+1治療。",
            shuiJingDaoQiang: "[響應]水晶刀牆",
            "shuiJingDaoQiang_info": "<span class='tiaoJian'>(主動攻擊命中後②，移除你的X[治療])</span>對攻擊的角色造成額外X點法術傷害。",
            lingFengZhuFu: "[被動]凜風祝福",
            "lingFengZhuFu_info": `<span class='tiaoJian'>(攻擊未命中時②,若攻擊為風系或水系)</span>選擇以下一項發動:<br>
            <span class='tiaoJian'>(目標角色擁有[治療]時)</span>他+1[治療]<br>
            <span class='tiaoJian'>(目標角色無[治療]時)</span>他+2[治療]。`,
            shuangYuZhiHuan: "[法術]霜語之環",
            "shuangYuZhiHuan_info": "[水晶]我方所有沒有[治療]的角色各+2[治療]。額外+1[攻擊行動]或[法術行動]。",
            huJiaoZhiXin: "[響應]護教之心",
            "huJiaoZhiXin_info": "<span class='tiaoJian'>(主動攻擊命中時②)</span>你+1[治療]。",
            wuJinZhuiJi: "[響應]無盡追擊",
            "wuJinZhuiJi_info": "<span class='tiaoJian'>([攻擊行動]結束後,移除你的1[治療])</span>額外+1[攻擊行動]。",
            jingZhunJuJi: "[響應]精準射擊",
            "jingZhunJuJi_info": "[水晶]<span class='tiaoJian'>([攻擊行動]結束後)</span>額外+1[攻擊行動],你的下次主動攻擊無法應戰。",
            zhiYueZhiHuan: "[響應]制約之環",
            "zhiYueZhiHuan_info": "<span class='tiaoJian'>(攻擊時①,棄2張同系牌[展示])</span>若本次攻擊未命中②,你對自己造成4點法術傷害③",
            sheShenZhiDao: "[響應]捨身之道",
            "sheShenZhiDao_info": "<span class='tiaoJian'>(主動攻擊命中時②,摸X張牌[強制],X最高為4,最低為2)</span>本次攻擊傷害額外+(X-1)。",
            jianRenZhiZhi: "[響應]堅忍之志",
            "jianRenZhiZhi_info": "[寶石]<span class='tiaoJian'>(受到法術傷害③時)</span>本次法術傷害③數值為0。",
            baoFengLingYu: "[被動]暴風領域",
            "baoFengLingYu_info": "你的雷系攻擊和風系攻擊的攻擊傷害額外+1。",
            yiZheng: "[法術]議政",
            "yiZheng_info": "你選擇以下一項發動：<br>將1張牌交給目標隊友,你額外+1[攻擊行動]<br>目標隊友給你1張牌,你額外+1[攻擊行動]。",
            jiFengZhouYu: "[響應]疾風驟雨",
            "jiFengZhouYu_info":"[水晶]<span class='tiaoJian'>([攻擊行動]結束時)</span>額外+1[攻擊行動]。",
            juLongZhiLi: "[被動]巨龍之力",
            "juLongZhiLi_info": "<span class='tiaoJian'>(主動攻擊時①)</span>你的主動攻擊傷害為你的手牌數+1。",
            longZuZunYan: "[被動]龍族尊嚴",
            "longZuZunYan_info": "<span class='tiaoJian'>(僅【普通形態】下)</span>你不能主動攻擊手牌大於你的角色。",
            longXueQinYe: "[法術]龍血傾曳",
            "longXueQinYe_info": "<span class='tiaoJian'>(摸1張牌[強制])</span>對目標角色造成1點法術傷害③。",
            longXueZhuoShao: "[法術]龍血灼燒",
            "longXueZhuoShao_info": "<span class='tiaoJian'>(摸3張牌[強制])</span>對目標角色造成2點法術傷害③;<span class='tiaoJian'>(若你處於【化龍形態】)</span>額外+1[攻擊行動]。",
            xingHongBaiLongBa: "[響應]猩紅百龍霸",
            "xingHongBaiLongBa_info": "[寶石]<span class='tiaoJian'>(回合開始時)</span>[橫置]轉為【化龍形態】。此形態下你只能執行[攻擊行動];否則回合結束時[重置]脫離【化龍形態】。",
            xiaoTianLongQiang: "[響應]嘯天龍槍",
            "xiaoTianLongQiang_info":"<span class='tiaoJian'>(主動攻擊未命中時②,棄1張攻擊牌[展示])</span>對攻擊目標和自己各造成2點法術傷害③;<span class='tiaoJian'>(若你額外棄1張法術牌[展示])</span>本次對攻擊目標的法術傷害③額外+1。",
            juLongBenTeng: "[法術]巨龍奔騰",
            "juLongBenTeng_info": "[水晶]我方目標角色和目標對手的手牌數目調整至5[強制]，額外+1[攻擊行動]或[法術行動]",
            xieMoXiaoSan: "[法術]邪魔消散",
            "xieMoXiaoSan_info": "<span class='tiaoJian'>(棄1張風系或水系牌[展示])</span>移除場上1個基礎效果或1[治療],對目標對手造成2點法術傷害③。",
            jingHuaDaDi: "[法術]淨化大地",
            "jingHuaDaDi_info": "<span class='tiaoJian'>(棄1張地系牌[展示])</span>對所有對手各造成1點法術傷害③，所有隊友各+1[治療]。",
            yuanSuChongSheng: "[法術]元素重生",
            "yuanSuChongSheng_info": "[回合限定][水晶]棄3張牌，摸3張牌[強制]，額外獲得1個[法術行動]。",
            longZuZhenYan: "[響應]龍族真言",
            "longZuZhenYan_info": "[回合限定]<span class='tiaoJian'>([攻擊行動]結束時)</span>額外+1[攻擊行動]。你的下次主動攻擊無法主動攻擊和應戰攻擊本回合攻擊過的對手。",
            shangGuMiYu: "[被動]上古秘語",
            "shangGuMiYu_info": "<span class='tiaoJian'>(主動攻擊時①)</span>若本回合你已造成過法術傷害③，本次攻擊無法應戰。若本回合你已造成過攻擊傷害，本次攻擊傷害額外+1。",
            longHunNingShi: "[響應]龍魂凝視",
            "longHunNingShi_info": "<span class='tiaoJian'>(主動攻擊前①，移除我方【戰績區】1星石)</span>若本次攻擊命中②，攻擊目標造成1點法術傷害③",
            zhaiBian: "[法術]災變",
            "zhaiBian_info": "<span class='tiaoJian'>(棄1張地系牌[展示])</span>對所有對手各造成1點法術傷害③。",
            mingHuo: "[法術]冥火",
            "mingHuo_info": "<span class='tiaoJian'>(棄1張火系牌[展示])</span>對目標角色造成2點法術傷害③。",
            fuShi: "[響應]腐蝕",
            "fuShi_info": "<span class='tiaoJian'>(目標角色對你造成傷害③時，棄1張水系牌[展示])</span>對目標角色造成1點法術傷害③。",
            youHunFenShen: "[響應]幽魂分身",
            "youHunFenShen_info": `[回合限定][寶石]你選擇以下一項發動:<br>
            <span class='tiaoJian'>(【災變】結算完成後，棄1張地系牌[展示])</span>對所有對手各造成1點法術傷害③<br>
            <span class='tiaoJian'>(【冥火】結算完成後，棄1張火系牌[展示])</span>對目標角色造成2點法術傷害③<br>
            <span class='tiaoJian'>(【腐蝕】結算完成後，棄1張水系牌[展示])</span>對目標角色造成1點法術傷害③。`,
            diMaiZhiLi: "[被動]地脈之力",
            "diMaiZhiLi_info": "你的地系攻擊和暗系攻擊的傷害額外+1",
            poXieZhan: "[響應]破邪斬",
            "poXieZhan_info": `<span class='tiaoJian'>(主動攻擊時①)</span>你選擇以下一項發動:<br>
            <span class='tiaoJian'>(棄2張同系牌[展示])</span>視為一次地系主動攻擊。<br>
            <span class='tiaoJian'>(棄3張同系牌[展示])</span>視為一次暗系的主動攻擊。`,
            shengShengBuXi: "[法術]生生不息",
            "shengShengBuXi_info": "<span class='tiaoJian'>(棄1張牌[強制])</span>摸2張牌[強制]，額外獲得1個[攻擊行動]。本回合你不能發動【破邪斬】。",
            gaiYaHuaShen: "[響應]蓋亞化身",
            "gaiYaHuaShen_info": "[寶石]<span class='tiaoJian'>(回合結束時)</span>[橫置]轉為【蓋亞化身】形態。此形態下，你所有的不為專屬手牌的基礎牌都可以視為地裂斬，你發動的所有攻擊傷害額外+1。<span class='tiaoJian'>(目標角色對你造成攻擊傷害時③)</span>[重置]脫離【蓋亞化身】形態。",
            xiaoChouDeBaXi: "[法術]小丑的把戲",
            "xiaoChouDeBaXi_info": "<span class='tiaoJian'>(將我方【戰績區】1顆[寶石]轉換成[水晶])</span>對目標角色造成1點法術傷害，你額外獲得1個[攻擊行動]。",
            wuTaiMoShuShi: "[法術]舞臺魔術師",
            "wuTaiMoShuShi_info": "<span class='tiaoJian'>(將雙方【戰績區】所有[水晶]轉換成[寶石])</span>你棄X張牌，X為以此法轉換的[水晶]數。",
            guiPai: "[響應]鬼牌",
            "guiPai_info": "[水晶]<span class='tiaoJian'>(應戰攻擊時①，棄1張牌[強制])</span>視為應戰此次攻擊且系別不變，我方【戰績區】+1[寶石]",
            gaiYaHuaShen_mods: "[響應]蓋亞化身-地裂斬",
            "gaiYaHuaShen_mods_info": "【蓋亞化身】形態下，你所有的不為專屬手牌的基礎牌都可以視為地裂斬。",
            xingChenShouHu: "[響應]星辰守護",
            "xingChenShouHu_info": "<span class='tiaoJian'>(目標角色對你造成傷害③時)</span>棄X張水系牌[展示]。",
            mingYunDiaoKe: "[法術]命運雕刻",
            "mingYunDiaoKe_info": "目標隊友給你2張牌，之後你給任意隊友2張牌。我方【戰績區】+1[寶石]。",
            xingWenYongDong: "[響應]星紋湧動",
            "xingWenYongDong_info": "[水晶]<span class='tiaoJian'>([法術行動]結束時)</span>棄1張牌[強制]，額外+1[法術行動]。",
            anZhiWanGe: "[響應]暗之輓歌",
            "anZhiWanGe_info": "你的【聖光】可視為【暗滅】。",
            zhenHunQu: "[響應]鎮魂曲",
            "zhenHunQu_info": "<span class='tiaoJian'>([攻擊行動]結束時，若此次主動攻擊命中②，棄X張法術牌[展示])</span>對攻擊目標和你各造成X點法術傷害③。",
            eShaGuangMing: "[響應]扼殺光明",
            "eShaGuangMing_info": "[水晶]<span class='tiaoJian'>(主動攻擊命中②，棄X張同系牌[展示])</span>本次攻擊傷害額外+X。",
            xiSheng: "[被動]犧牲",
            "xiSheng_info": "<span class='tiaoJian'>(你的回合開始時)</span>你摸1張牌[強制]。",
            shenShengHuWei: "[被動]神聖護衛",
            "shenShengHuWei_info": "<span class='tiaoJian'>(我方角色因承受傷害⑥而造成士氣下降時)</span>他+1[治療]。",
            shenShengBiHu: "[被動]神聖庇護",
            "shenShengBiHu_info": "<span class='tiaoJian'>(目標角色對你造成傷害③時)</span>傷害結算完成時你+1[治療]。",
            jueDiFanJi: "[響應]絕地反擊",
            "jueDiFanJi_info": "[寶石]<span class='tiaoJian'>(主動攻擊命中時②)</span>移除我方所有[治療];本次攻擊傷害額外+(X+1),X為移除的[治療]數目。",
            lingHunShouGe: "[響應]靈魂收割",
            "lingHunShouGe_info": `<span class='tiaoJian'>([攻擊行動]結束時，若此次主動攻擊命中②，棄1張水系牌[展示])</span>你選擇以下一項發動:<br>
            移除攻擊目標【能量區】的1【能量】<br>
            對攻擊目標造成1點法術傷害③`,
            zhouShuJiDang: "[響應]咒術激盪",
            "zhouShuJiDang_info": "<span class='tiaoJian'>([法術行動]結束後)</span>額外+1[攻擊行動]。",
            zhouFu: "[法術]咒縛",
            "zhouFu_info": `[水晶]將【咒縛】放置於目標對手前，<span class='tiaoJian'>(擁有此卡的角色回合開始前)</span>他選擇以下一項發動:<br>
            跳過他的回合<br>
            你對他造成3點法術傷害③，繼續他的回合。<br>
            觸發後移除此卡。<br>
            【咒縛】為咒術師的專屬牌，上限為1。`,
            zhanZhengGeYao: "[法術]戰爭歌謠",
            "zhanZhengGeYao_info": "你和目標對手各摸1張牌[強制]，你的隊友各可以選擇棄1張牌。",
            zhanYiGongMing: "[響應]戰意共鳴",
            "zhanYiGongMing_info": "<span class='tiaoJian'>(主動攻擊命中後②，棄1張與該攻擊牌同系的牌[展示])</span>目標隊友獲得此棄牌，我方【戰績區】額外+1[寶石]。",
            xiWangZhiGe: "(專)希望之歌",
            "xiWangZhiGe_info": `
            <span class="greentext">[響應]鬥志激昂</span><br>
            <span class='tiaoJian'>(擁有此卡的角色獲得，攻擊命中時②，移除此卡)</span>本次攻擊傷害額外+2。<br>
            <span class="greentext">[被動]堅毅不屈</span><br>
            <span class='tiaoJian'>(擁有此卡的角色獲得，回合結束時)</span>+1[治療]。<br>
            【希望之歌】為戰歌祭司的專屬卡，上限為1。`,
            yingXiongZhanGe: "[法術]英雄戰歌",
            "yingXiongZhanGe_info": "[寶石]將【希望之歌】放置在目標角色面前，額外+1[攻擊行動]。"
        },
    }
});
