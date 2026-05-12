import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
    return {
        name:'teDian',
        connect:true,
        characterSort:{
            'teDian':{
               moFaShaoNv_name:['jieRiMoDao','tanLanShaoNv','nong_baoShiShaoNv','daiDuoShaoNv','jiDuShaoNv'],
               trick:['trick_shengGong','trick_maoXianJia','daoDanLuoLi'],
               shiTu:['jianZhiMoNv','jianZhiZi'],
            }
        },
        character:{
            jianZhiMoNv: ["jianZhiMoNv_name", "jiGroup", '3/4', ["jiZhiJianYi", "yiXiangJian", "mengXiangJian", "jianYingDuanNian"], ['des:最快的招式，就是最難以應付的招式。悟出此道的劍之魔女，劍招以快取勝，每一招都是進攻，不需要防守。因為只要夠快，敵人就永遠追不上她進攻的腳步。“在下一路走來，只有風伴我隨行”當此句傳入耳中時，你已中招倒地。']],
            jieRiMoDao:["moFaShaoNv_name","yongGroup",3,["moDanZhangWo","moDanRongHe","jiRi_moBaoChongJie","faLiHuDun","huiMieFengBao"],['des:小範圍的區域傷害是魔法少女的特長，她更可以把魔彈隨意的使用和施放。在積累了一定的能量之後，強大的“毀滅風暴”更是可以讓所有對手都品嚐到何為魔法的洗禮和衝擊']],
            tanLanShaoNv: ["moFaShaoNv_name", "yongGroup", 3, ["tanYuHeiDong", "lianJinMoFa", "lianJinShu", "wangNvJinKu"], ['des:貪婪少女對於星石的貪婪可謂突破天際，無論是寶石還是水晶，都是她的涉獵目標。但是這還是比不上她以前金庫的一釐一分。']],
            lingXiZhiChao: [
                "lingXiZhiChao_name",
                "huanGroup",
                "3/4",
                ["lingZhiZhiYi", "xieLingTuiSan", "banXiangHunLing", "boYongZhiLi", "nuChaoHuangTao", "haiShenYuWu", "lingYong"],
                [
                    `des:靈熙之潮對於基礎效果有著很敏銳的感受，通過不斷觸發基礎效果獲得靈湧，讓這個世界的人體驗一下怒潮狂濤的威力吧`,
                ],
            ],
            youJiShi: [
                "youJiShi_name",
                "jiGroup",
                "3/4",
                ["jingLingZengLi", "yuanSuSheJi*sora", "erChongJianYing", "fuMoZhiShu",  "jingLingDeJianWu","ziDan"],
                [
                    `des:精靈的贈禮對於索拉來說至關重要，“好的開始是成功的一半”這句名言在她的身上得到了最好的體現。`,
                ],
            ],
            nong_baoShiShaoNv: [
                "moFaShaoNv_name",
                "yongGroup",
                3,
                ["tianDianChongJi", "shiYuDeHeiDong", "meiWeiRongHe", "sanMiaoYuanZe", "meiShiFengBao"],
                [
                    "des:暴食少女除了能夠像魔法少女一樣肆意運用魔彈和毀滅風暴這樣的強大法術以外；作為喜愛甜點的她更加為了滿足自己的食慾而開發出了更加“食用”的魔法。<br>因機制問題，無法完全符合faq。",
                ],
            ],
            zhouFuShi: [
                "zhouFuShi_name",
                "yongGroup",
                4,
                ["zhouFuHuoLi", "zhouFuDongTian", "zhouFu_nianZhou", "chiMeiWangLiang", "zhouLiChongSu", "zhouFu_yaoLi"],
                [
                    `des:狐神降神於風音身體，融合了風音的意識，自稱“鈴音”。由於狐神天性喜愛捉弄人，咒符師更傾向靈動的配合隊友。“咒符不是用以傷害敵人，而是幫助隊友解決困擾”，不要將勝負扛在肩上，更相信隊友才是致勝之道`,
                ],
            ],
            yuanChuZhiGong:[
                'shengGong_name',
                'shengGroup',
                '4/5',
                ['yuanChu_tianZhiGong','yuanChu_shengXieJuBao','yuanChu_shengHuangJiangLin','yuanChu_shengGuangBaoLie','yuanChu_liuXingShengDan','yuanChu_shengHuangHuiGuangPao','yuanChu_shengHuangYuHui','yuanChu_ziDongTianChong','yuanChu_xinYang'],
                [
                    `des:聖弓的最終形態，雖有一顆和平之心，但因遇見強敵而覺醒。其擁有強大的機動性，但因為消耗信仰作為能量且需要的能量巨大，所以一般需要隊友支援。一旦能量充填完畢，原初之弓就會顯現出最終武器的恐怖形態，無論多麼劣勢都能看到翻盤的希望`,
                ],
            ],
            daoDanLuoLi: [
                "daoDanLuoLi_name",
                "huanGroup",
                4,
                ["tianShi?", "panNiZhiQiang", "shenMiFuBi", "T-r-i-c-k-y!", "trickOrTreat", "suprise"],
                [
                    `des:既然如此了，就不用拿聖盾用來保護隊友了，不如來大鬧一場吧~連自己也不一定掌控的tricky，簡直是太刺激了~ 到底是trick還是treat？一場盛大的surprise正在上演~`,
                ],
            ],
            trick_shengGong:['shengGong_name','shengGroup','4/5',['trick_tianZhiGong','shengXieJuBao','trick_shengHuangJiangLin','trick_shengGuangBaoLie','liuXingShengDan','trick_shengHuangHuiGuangPao','trick_ziDongTianChong','xinYang','shengHuangHuiGuangPaoX'],['character:shengGong']],
            trick_maoXianJia:['maoXianJia_name','huanGroup','3/4',['trick_qiZha','qiangYun','diXiaFaZe','trick_maoXianJiaTianTang','touTianHuanRi'],['character:maoXianJia']],
            luoLiFanZhang: ["luoLiFanZhang_name", "xueGroup", 3, ["xuanHuaShangDeng", "yeLuSiKu", "aiSiTianLiu", "mieChaKuCha"], [`des:暫無介紹`]],
            jianXiZhiPian: [
                "jianXiZhiPian_name",
                "yongGroup",
                "3/4",
                ["yuanZiXiShou", "yuanZiChongSu", "yuanSuXueTu", "leiJiBianYi", "yueYun", "yuanZi"],
                ["des:暫無介紹"],
            ],
            daiDuoShaoNv: [
                "moFaShaoNv_name",
                "shengGroup",
                3,
                ["bieFanWo", "rangWoTangPing", "xiangYongMoDan", "buXiangTiLian", "zaiShuiYiXia"],
                ["des:暫無介紹"],
            ],
            jiDuShaoNv: [
                "moFaShaoNv_name",
                "jiGroup",
                3,
                ["cuYiXiuXin", "xuRongZhangWo", "xiangSiBing", "jiDuZhuiFang"],
                ["des:暫無介紹"],
            ],
            jianZhiZi:[
                "fengZhiJianSheng_name",
                "jiGroup",
                3,
                ["qingMu", "fengZhiJian", "jianShouShiYan", "jianCanYing"],
                ["des:暫無介紹"],
            ],
            moGongEX:[
                'moGong_name',
                'jiGroup',
                3,
                ["shenFengShi", "jiFengZhuiShe", "gongShenHouBu", "juJi"],
                ["des:其精準的射擊總是能令對手防不勝防。作為本作命中數一數二的職業，往往是團隊攻擊鏈最後致命一擊的締造者。她的必殺技更是控場神技，總是能令對方的如意算盤全部落空"],
            ],
            sheng_zhongCaiZhe:[
                'sheng_zhongCaiZhe_name',
                'shengGroup',
                '4/5',
                ['shenZhiTianPing','shanEBiJi','tianPingQingDao','shenZhiShenPan','tianPing','tianZui','zuiChiBiDao','zui'],
                ["des:新的裁判鐘聲已經敲響，不知道是新生的喜悅鐘聲，還是赴死的喪鐘。咚，咚，咚。。。"],
            ],
        },

        characterIntro: {

        },
        card: {
            tricky: {
                filterTarget: function (card, player, target) {
                    return !target.hasJiChuXiaoGuo("tricky_xiaoGuo");
                },
            },
        },
        skill: {
            //劍之魔女
            jiZhiJianYi:{
                trigger:{player:"gongJiEnd"},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.mingGe(card)!='ji'||get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        prompt:'技之劍意：技類[攻擊行動]',
                    });
                },
                check:function(event,player){
                    var num=player.countCards('h',card=>get.mingGe(card)=='ji'&&get.type(card)=='gongJi');
                    return num>0
                },
                mod:{
                    aiOrder:function(player,card,num){
                        if(get.type(card)!='gongJi') return;
                        if(get.mingGe(card)=='ji') return num-0.3;
                    }
                }
            },
            yiXiangJian: {
                trigger: {source:'gongJiMingZhong'},
                usable: 1,
                filter: function (event, player) {
                    return event.yingZhan!=true;
                },
                content: async function (event, trigger, player) {
                    var result = await trigger.target.chooseToDiscard('h', 1, true).set('ai', function(card) {
                        if(get.type(card) == 'gongJi') {
                            return 6 - get.value(card);
                        }else if(get.type(card)=='faShu'){
                            return 8- get.value(card);
                        }else return 0
                    }).set('showCards', true).forResult();

                    if (!result.cards.length) return;

                    var discarded = result.cards[0];

                    if (get.type(discarded) == 'gongJi') {
                        var list=['是','否'];
                        var control = await player.chooseControl(list).set('prompt','是否獲得攻擊牌')
                        .set('ai', function() {
                            var player = _status.event.player;
                            if(player.countCards('h', card => get.type(card) == 'gongJi') > 1)return '否';
                            else return '是';
                        }).forResult('control');
                        if (control =='是') {
                            await player.gain(discarded);
                        }
                        player.addGongJi();
                    } else if (get.type(discarded) == 'faShu') {
                        trigger.changeDamageNum(2);
                    }
                },
            },
            mengXiangJian: {
                forced:true,
                trigger:{player:"gongJiAfter"},
                filter: function (event, player) {
                    var num= player.getStat('gongJi').zhuDong.length;
                    return event.yingZhan!=true&&(num==1||num==2||num==4);
                },
                content: function () {
                    player.addTempSkill('mengXiangJian_gongJiSheZhi');
                },
                subSkill:{
                    gongJiSheZhi:{
                        direct:true,
                        trigger:{player:'gongJiSheZhi'},
                        filter: function(event, player) {
                            var num= player.getStat('gongJi').zhuDong.length;
                            return event.yingZhan!=true&&num>1;
                        },
                        content: function() {
                            var num= player.getStat('gongJi').zhuDong.length;
                            if(num>1) trigger.wuFaShengDun();
                            if(num>2) trigger.wuFaYingZhan();
                            if(num>4) trigger.qiangZhiMingZhong();
                        }
                    },
                }
            },
            jianYingDuanNian: {
                trigger:{player:'gongJiEnd'},
                usable: 1,
                filter: function (event, player) {
                    return player.canBiShaBaoShi()&&event.yingZhan!=true;
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.chooseToDiscard(2, true);
                    'step 1'
                    player.draw();
                    player.addGongJi();
                },
                ai:{
                    baoShi:true,
                }
            },

            //節日魔導
            jiRi_moBaoChongJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.jiRi_moBaoChongJie.filterCard(card));
                },
                selectTarget:1,
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
                    target.chooseToDiscard(`棄置1張法術牌，否則${name}對你造成2點法術傷害③`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                    }
                },
                check:function(card){
                    return 6- get.value(card);
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
            faLiHuDun:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([1,Infinity],function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt('faLiHuDun'))
                    .set('prompt2',lib.translate.faLiHuDun_info)
                    .set('ai',function(card){
                        return 4-get.value(card);
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                },
            },

            //貪婪少女
            tanYuHeiDong:{
                type:'faShu',
                enable:'faShu',
                usable: 1,
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.tanYuHeiDong.filterCard(card));
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                contentBefore:function(){
                    player.changeZhanJi('shuiJing',1);
                },
                content:function(){
                    'step 0'
                    var name=get.colorName(player);
                    target.chooseToDiscard(`棄置1張法術牌，否則${name}對你造成2點法術傷害③`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                        player.addFaShu();
                    }
                },
                check:function(card){
                    return 6- get.value(card);
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
            lianJinMoFa: {
                trigger:{source:'chengShouShangHaiAfter'},
                filter: function(event, player){
                    return event.card && event.card.name === 'moDan';
                },
                content: function(){
                    player.changeZhanJi('shuiJing',1);
                },
            },
            lianJinShu:{
                enable:['faShu','moDan'],
				filterCard:function(card){
                    return get.xiBie(card)=='lei'||get.xiBie(card)=='huo';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.lianJinShu.filterCard(card);
                    });
				},
                ai:{
                    order:3.2,
                }
            },
            wangNvJinKu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing() && player.countSkill('tanYuHeiDong') < 1;
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                contentBefore:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    player.storage.wangNvJinKu_num = 0;
                    player.storage.wangNvJinKu_baoshi = 0;
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length>0){
                        var list=['是','否'];
                        var control=await player.chooseControl(list).set('prompt','是否額外移除【戰績區】所有星石').set('ai', function(){
                            var player= _status.event.player;
                            var zhanJi=get.zhanJi(player.side);
                            var shiQi=get.shiQi(!player.side);
                            if(shiQi>1 && zhanJi.includes('baoShi')) return '是';
                            if(zhanJi.length>3) return '是';
                            return '否';
                        }).forResult('control');
                        if (control =='是') {
                            var xlist = get.zhanJi(player.side).slice();
                            for (var i of xlist){
                                if(i == 'baoShi'){
                                    player.storage.wangNvJinKu_baoshi++;
                                }
                                await player.removeZhanJi(i,1);
                            }
                            var num=xlist.length;
                            player.storage.wangNvJinKu_num = Math.floor(num/2);
                        }
                    }else return;  
                },
                content:function(){
                    'step 0'
                    target.faShuDamage(1+player.storage.wangNvJinKu_num,player);

                },
                contentAfter:async function(event, trigger, player){
                    if(player.storage.wangNvJinKu_baoshi > 1){
                        var result=await player.changeShiQi(-1,!player.side).set('zhuanYi',true).forResult();
                        if(result.num<0) await player.changeShiQi(1).set('zhuanYi',true);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            var zhanJiNum=get.zhanJi(player.side).length;
                            return get.damageEffect(target,player,1+zhanJiNum);
                        }
                    }
                }
            },

            // 靈熙之潮
            lingZhiZhiYi: {
                mod: {
                    targetEnabled: function (card, player, target) {
                        if (game.jiChuXiaoGuo.all.includes(get.name(card))) {
                            return false;
                        }
                    },
                },
            },
            xieLingTuiSan: {
                trigger: {source: "addJiChuXiaoGuoAfter",},
                filter: function (event, player) {
                    return game.jiChuXiaoGuo.all_xiaoGuo.includes(event.jiChuXiaoGuo);
                },
                async cost(event, trigger, player) {
                    event.result= await player.chooseTarget("對目標對手造成1點法術傷害③", function (card, player, target) {
                        return player.side != target.side;
                    })
                    .set("ai", function (target) {
                        var player = _status.event.player;
                        return get.damageEffect2(target, player, 1);
                    })
                    .set('prompt', get.prompt('xieLingTuiSan'))
                    .set('prompt2', lib.translate.xieLingTuiSan_info)
                    .forResult();
                },
                content: async function (event, trigger, player) {
                    if(event.targets[0]) await event.targets[0].faShuDamage(1, player);
                },
            },
            banXiangHunLing: {
                trigger: { global: "changeShiQiEnd" },
                usable: 1,
                filter: function (event, player) {
                    if (event.side == player.side) return false;
                    if (event.cause != "damage") return false;
                    if (event.num >= 0) return false;
                    if (event.source !== player) return false;
                    if (_status.currentPhase != player) return false;
                    return true;
                },
                content: async function (event, trigger, player) {
                    var targets = game
                        .filterPlayer(function (current) {
                            return current.side != player.side && current != trigger.player;
                        })
                        .sortBySeat(player);
                    for (var target of targets) {
                        await target.faShuDamage(1, player);
                    }
                },
            },
            boYongZhiLi: {
                trigger: {global: "triggerEnd",},
                forced: true,
                filter: function (event, player) {
                    var skill = get.info(event.skill);
                    if (skill.tag && skill.tag.jiChuXiaoGuo) return true;
                    return false;
                },
                content: async function (event, trigger, player) {
                    player.addZhiShiWu("lingYong");
                },
            },
            nuChaoHuangTao: {
                trigger: { player: "phaseEnd" },
                forced: true,
                filter: function (event, player) {
                    return player.countZhiShiWu("lingYong") >= 4;
                },
                content: async function (event, trigger, player) {
                    await player.removeZhiShiWu("lingYong", 4);
                    var targets = await player
                        .chooseTarget("對4名目標角色造成1點法術傷害③，<span class='tiaoJian'>(若目標角色擁有X個基礎效果)</span>本次對他的法術傷害額外+X點", 4, true)
                        .set("ai", function (target) {
                            var player = _status.event.player;
                            var length = target.jiChuXiaoGuoList().length;
                            return get.damageEffect2(target, player, 1+length);
                        })
                        .forResultTargets();
                    for (var target of targets.sortBySeat(player)) {
                        var length = target.jiChuXiaoGuoList().length;
                        await target.faShuDamage(1 + length, player);
                    }
                },
            },
            haiShenYuWu: {
                type: "faShu",
                enable: "faShu",
                position: "h",
                filter: function (event, player) {
                    var bool0 = player.canBiShaShuiJing();
                    var skills = [
                        lib.skill.diZhiFengYin,
                        lib.skill.shuiZhiFengYin,
                        lib.skill.fengZhiFengYin,
                        lib.skill.huoZhiFengYin,
                        lib.skill.leiZhiFengYin,
                        lib.skill.weiLiCiFu,
                        lib.skill.xunJieCiFu,
                    ];
                    var bool1 = player.hasCard(function (card) {
                        return !!skills.find(function (skill) {
                            return skill.filterCard(card);
                        });
                    });
                    var bool2 = game.hasPlayer(function (current) {
                        return !!skills.find(function (skill) {
                            return skill.filterTarget("", player, current);
                        });
                    });
                    return bool0 && bool1 && bool2;
                },
                selectCard: 1,
                filterCard: function (card) {
                    return !!["diZhiFengYin", "shuiZhiFengYin", "huoZhiFengYin", "fengZhiFengYin", "leiZhiFengYin", "weiLiCiFu", "xunJieCiFu"].find(
                        x => {
                            return card.hasDuYou(x);
                        }
                    );
                },
                useCard: true,
                filterTarget: function (card, player, target) {
                    if (card.hasDuYou("weiLiCiFu")) {
                        if (target == player || target.side != player.side) return false;
                        return lib.filter.targetEnabled({ name: "weiLiCiFu" }, player, target);
                    }
                    if (card.hasDuYou("xunJieCiFu")) {
                        if (target == player || target.side != player.side) return false;
                        return lib.filter.targetEnabled({ name: "xunJieCiFu" }, player, target);
                    }
                    if (card.hasDuYou("diZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "diZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("shuiZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "shuiZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("huoZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "huoZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("fengZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "fengZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("leiZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "leiZhiFengYin" }, player, target);
                    }
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    var card = event.cards[0];
                    var target = event.target;
                    ["diZhiFengYin", "shuiZhiFengYin", "huoZhiFengYin", "fengZhiFengYin", "leiZhiFengYin", "weiLiCiFu", "xunJieCiFu"].forEach(async function(name){
                        if (card.hasDuYou(name)) {
                            if(name.includes('FengYin')) {
                                var fengYin=`${name}_xiaoGuo`;
                                target.addFengYin(fengYin,[card],player);
                            }else{
                                if (!target.hasSkill(`${name}_xiaoGuo`)) {
                                    target.addSkill(`${name}_xiaoGuo`);
                                }
                                await target.addJiChuXiaoGuo(`${name}_xiaoGuo`, player,[card]);
                            }
                            
                        }
                    });
                    await player.chooseToDiscard(1, "h", true);
                },
                ai:{
                    shuiJing: true,
                    order: 3.4,
                    result:{
                        target:function(player,target){
                            if(player.side==target.side) return target.countCards('h');
                            else return -player.countCards('h');
                        }
                    }
                },
            },
            lingYong: {
                intro: {
                    name: "靈湧",
                    markcount: "mark",
                    max: 4,
                    content: "mark",
                },
                onremove: "storage",
                markimage: "image/card/zhiShiWu/hong.png",
            },

            // 游擊士
            jingLingZengLi: {
                trigger: { global: "gameStart" },
                forced: true,
                content: function (event, trigger, player) {
                    var cards = get.cards(6);
                    player.addGaiPai(cards,'ziDan');
                },
            },
            "yuanSuSheJi*sora": {
                trigger: { player: "gongJiShi" },
                filter: function (event, player) {
                    if (event.yingZhan == true) return false;
                    return player.getGaiPai("ziDan").length > 0;
                },
                async cost(event, trigger, player) {
                    var result = await player
                        .chooseCardButton(player.getGaiPai("ziDan"), "是否發動【元素射擊*SORA】移除一個【子彈】？")
                        .set("ai", function () {
                            return 0.7 - Math.random();
                        })
                        .forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                content: async function (event, trigger, player) {
                    //trigger.customArgs.yuanSuSheJi = true;
                    await player.discard(event.cost_data, "ziDan", "showHiddenCards");
                    var xiBie = get.xiBie(event.cost_data);
                    if (xiBie === "guang" || xiBie === "an") {
                        var choiceList = ["火系：本次攻擊傷害額外+1", "水系：<span class='tiaoJian'>(主動攻擊命中時②)</span>目標角色+1[治療]", "風系：<span class='tiaoJian'>([攻擊行動]結束後)</span>額外+1[攻擊行動]", "雷系：本次攻擊無法應戰", "地系：<span class='tiaoJian'>(主動攻擊命中時②)</span>對目標角色造成1點法術傷害③"];
                        var choices = ["火系", "水系", "風系", "雷系", "地系"];
                        let next = player
                            .chooseControl(choices)
                            .set("prompt", "元素射擊：選擇一項")
                            .set("choiceList", choiceList)
                            .set("ai", function () {
                                return "雷系";
                            });
                        var control = await next.forResultControl();
                        switch (control) {
                            case "火系":
                                xiBie = "huo";
                                break;
                            case "水系":
                                xiBie = "shui";
                                break;
                            case "風系":
                                xiBie = "feng";
                                break;
                            case "雷系":
                                xiBie = "lei";
                                break;
                            case "地系":
                                xiBie = "di";
                                break;
                        }
                    }
                    switch (xiBie) {
                        case "huo":
                            player.logSkill("yuanSuSheJi*sora_huo");
                            trigger.changeDamageNum(1);
                            break;
                        case "shui":
                            trigger.customArgs.yuanSuSheJi = 'shui';
                            player.addTempSkill("yuanSuSheJi*sora_shui");
                            break;
                        case "feng":
                            trigger.customArgs.yuanSuSheJi = 'feng';
                            player.addTempSkill("yuanSuSheJi*sora_feng");
                            break;
                        case "lei":
                            player.logSkill("yuanSuSheJi*sora_lei");
                            trigger.wuFaYingZhan();
                            break;
                        case "di":
                            trigger.customArgs.yuanSuSheJi = 'di';
                            player.addTempSkill("yuanSuSheJi*sora_di");
                            break;
                    }
                },
                group:["yuanSuSheJi*sora_shui",'yuanSuSheJi*sora_feng', 'yuanSuSheJi*sora_di'],
                subSkill: {
                    huo: {},
                    lei: {},
                    shui: {
                        trigger: { source: "gongJiMingZhong" },
                        //direct:true,
                        filter: function (event, player) {
                            return event.customArgs.yuanSuSheJi == 'shui' && event.yingZhan != true;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player
                                .chooseTarget("水之彈：目標角色+1[治療]", true)
                                .set("ai", function (target) {
                                    var player = _status.event.player;
                                    return get.zhiLiaoEffect2(target, player, 1);
                                })
                                .forResult();
                        },
                        content: async function (event, trigger, player) {
                            "step 0";
                            event.targets[0].changeZhiLiao(1);
                        },
                    },
                    feng: {
                        trigger: { player: "gongJiAfter" },
                        forced: true,
                        filter: function (event, player) {
                            return event.customArgs.yuanSuSheJi == 'feng';
                        },
                        content: async function (event, trigger, player) {
                            player.addGongJi();
                        },
                    },
                    di: {
                        trigger: { source: "gongJiMingZhong" },
                        //direct:true,
                        filter: function (event, player) {
                            return event.customArgs.yuanSuSheJi == 'di' && event.yingZhan != true;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player
                                .chooseTarget("地之彈：對目標角色造成1點法術傷害", true)
                                .set("ai", function (target) {
                                    var player = _status.event.player;
                                    return get.damageEffect2(target, player, 1);
                                })
                                .forResult();
                        },
                        content: async function (event, trigger, player) {
                            "step 0";
                            event.targets[0].faShuDamage(1, player);
                        },
                    },
                },
            },
            erChongJianYing: {
                usable: 1,
                trigger: { source: "gongJiEnd" },
                filter: function (event, player) {
                    return event.yingZhan != true&&event.gongJiMingZhong;
                },
                check: function (event, player) {
                    return player.hasCard(card=>get.type(card)=='gongJi'&&get.xiBie(card)==get.xiBie(event.card));
                },
                content: function (event, trigger, player) {
                    var xiBie = get.xiBie(trigger.card);
                    const name = get.translation(xiBie);
                    player.storage.extraXingDong.push({
                        xingDong: "gongJi",
                        xiBie: xiBie,
                        filterCard: function (card, player, event) {
                            if (get.xiBie(card) != _status.event.xiBie || get.type(card) != "gongJi") return false;
                            return lib.filter.cardEnabled(card, player, "forceEnable");
                        },
                        prompt: `【二重劍影】:${name}系[攻擊行動]`,
                    });
                },
            },
            fuMoZhiShu: {
                trigger: { player: "_tiLian_backupEnd" },
                filter: function (event, player) {
                    return player.countCards("h") > 0 && player.getGaiPai("ziDan").length == 0 && event;
                },
                async cost(event, trigger, player) {
                    event.result = await player.chooseCard("h", 1)
                    .set('prompt',get.prompt('fuMoZhiShu'))
                    .set('prompt2', lib.translate.fuMoZhiShu_info)
                    .set('ai', function (card) {
                        if(card.xiBie=='lei') return 6;
                        return 6 - get.value(card);
                    })
                    .forResult();
                },
                content: async function (event, trigger, player) {
                    var list=trigger.links;
                    if (list.includes('baoShi')&&list.includes('shuiJing')) {
                        await player.removeBiShaShuiJing();
                    }else{
                        await player.removeNengLiang(list[0]);
                    }
                    if (event.cards && event.cards.length) {
                        await player.addGaiPai(event.cards, "ziDan");
                    }
                },
            },
            jingLingDeJianWu: {
                enable: "gongJi",
                filter: function (event, player) {
                    return player.canBiShaShuiJing()&&player.hasCard(card => get.type(card)=='gongJi');
                },
                filterCard: function (card) {
                    return get.type(card) == 'gongJi';
                },
                viewAs: {name:'fengShenZhan', xiBie: 'feng' },
                onuse: function (event, player) {
                    player.removeBiShaShuiJing();
                },
                check: function (card) {
                    if(get.xiBie(card)=='feng') return 0;
                    return 4 - get.value(card);
                },
                ai: {
                    order: 3.2,
                    result: {
                        player:1,
                    },
                },
            },
            ziDan: {
                intro: {
                    name: "子彈",
                    markcount: "gaiPai",
                    content: "gaiPai",
                },
                onremove: function (player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                trigger: { player: "addGaiPaiAfter" },
                filter: function (event, player) {
                    return event.gaiPai=="ziDan" && player.countGaiPai("ziDan") > 6;
                },
                direct: true,
                content: function (event, trigger, player) {
                    "step 0";
                    var cards = player.getGaiPai("ziDan");
                    player.chooseCardButton(cards, "捨棄" + (cards.length - 6) + "張【子彈】", true, cards.length - 6);
                    "step 1";
                    if (result.links) {
                        player.discard(result.links);
                    }
                },
            },

            //暴食少女
            tianDianChongJi: {
                inherit:'moBaoChongJi'
            },
            shiYuDeHeiDong: {
                trigger: { global: "chengShouShangHai" },
                filter: function (event, player) {
                    return event.player.side == player.side &&player.countCards('h')>0;
                },
                async cost(event, trigger, player) {
                    var result = await player
                        .chooseToDiscard(function (card) {
                            return get.name(card) == "moDan";
                        })
                        .set("ai", function (card) {
                            var player=_status.event.triggerPlayer;
                            if (player.countCards('h') + _status.event.trigger.num>player.getHandcardLimit()) return 6 - get.value(card);
                            return 0;
                        })
                        .set("prompt",get.prompt("shiYuDeHeiDong"))
                        .set("prompt2", lib.translate.shiYuDeHeiDong_info)
                        .set("showCards", true)
                        .set('triggerPlayer', trigger.player)
                        .forResult();
                    event.result = {
                        bool: result.bool,
                        cards: result.cards,
                    };
                },
                content: function (event, trigger, player) {
                    trigger.player = player;
                    trigger.shiQiXiaJiang = false;
                },
            },
            meiWeiRongHe: {
                enable: ["faShu", "moDan"],
                filterCard: function (card) {
                    return get.xiBie(card) == "shui" || get.xiBie(card) == "huo";
                },
                position: "h",
                viewAs: { name: "moDan" },
                viewAsFilter: function (player) {
                    return player.hasCard(function (card) {
                        return lib.skill.meiWeiRongHe.filterCard(card);
                    });
                },
                ai: {
                    order: 3.5,
                },
            },
            sanMiaoYuanZe: {
                init: function (player, skill) {
                    player.storage[skill] = [];
                },
                trigger:{global:'cardsDiscardBefore'},
                filter: function (event, player) {
                    for(var card of event.cards){
                        if(player.storage.sanMiaoYuanZe.includes(card)) return true;
                    }
                    return false;
                },
                content:async function (event, trigger, player) {
                    await player.chooseToDiscard(1,true);
                    var cards=[];
                    for(var card of trigger.cards.slice()){
                        if(player.storage.sanMiaoYuanZe.includes(card)){
                            cards.push(card);
                            trigger.cards.remove(card);
                            player.storage.sanMiaoYuanZe.remove(card);
                        }
                    }
                    await player.gain(cards,'gain2');
                },
                check: function (event,player) {
                    return player.countCards('h') < player.getHandcardLimit();
                },
                group: 'sanMiaoYuanZe_discard',
                subSkill:{
                    discard:{
                        trigger:{global: "loseEnd"},
                        direct: true,
                        filter: function (event, player) {
                            return event.player.side==player.side&&event.player!=player &&((event.type=='discard'&&(event.getParent().showCards||event.getParent().showHiddenCards)) || (event.type=='use'));
                        },
                        content:async function (event, trigger, player) {
                            for (var card of trigger.cards) {
                                if (get.name(card) == "moDan" && ['h','x'].includes(card.original)&&!player.storage.sanMiaoYuanZe.includes(card)&&get.position(card)=='d') {
                                    player.storage.sanMiaoYuanZe.push(card);
                                    //game.log(player, "將", "#g【魔彈】", "加入了", "#y【三妙原則】");
                                }
                            }
                            if(player.storage.sanMiaoYuanZe.length) game.cardsGotoOrdering(player.storage.sanMiaoYuanZe);
                        }
                    } 
                },

            },
            meiShiFengBao: {
                inherit:'huiMieFengBao',
            },
            
            //咒符師
            zhouFuHuoLi: {
                type: "faShu",
                enable: ["faShu"],
                filter: function (event, player) {
                    return player.countCards("h", card => lib.skill.zhouFuHuoLi.filterCard(card)) > 0;
                },
                selectCard: 1,
                filterCard: function (card) {
                    return get.xiBie(card) == "huo";
                },
                discard: true,
                showCards: true,
                content: async function (event, trigger, player) {
                    if(event.getParent().nianZhou!=false) await event.trigger("zhouFu");
                    await event.trigger("zhouFuStart");
                    var charNum=event.getParent().charNum || 1;
                    var baseNum= event.getParent().baseNum || 1;
                    var targets=await player.chooseTarget(charNum, `對${charNum}名角色造成${baseNum}點法術傷害`, true)
                    .set("ai", function (target) {
                        var player = _status.event.player;
                        return get.damageEffect2(target, player, baseNum);
                    }).forResultTargets();
                    for(var target of targets.sortBySeat(player)){
                        target.faShuDamage(baseNum, player);
                    }
                    await player.draw(1);
                    await player.chooseToDiscard(1, "h", true);
                },
                ai:{
                    order: 3.3,
                },
                check: function (card) {
                    return 6 - get.value(card);
                }
            },
            zhouFuDongTian: {
                type: "faShu",
                enable: ["faShu"],
                filter: function (event, player) {
                    return player.countCards("h", card => lib.skill.zhouFuDongTian.filterCard(card)) > 0;
                },
                selectCard: 1,
                filterCard: function (card) {
                    return get.xiBie(card) == "shui";
                },
                discard: true,
                showCards: true,
                content: async function (event, trigger, player) {
                    if(event.getParent().nianZhou!=false) await event.trigger("zhouFu");
                    await event.trigger("zhouFuStart");
                    var charNum=event.getParent().charNum || 1;
                    var baseNum= event.getParent().baseNum || 1;
                    var targets=await player.chooseTarget(charNum, `選取${charNum}名角色棄${baseNum}張牌`, true)
                    .set("ai", function (target) {
                        var player = _status.event.player;
                        if(target.side!= player.side) return 0;
                        return 10-(target.getHandcardLimit()-target.countCards("h"));
                    }).forResultTargets();
                    for(var target of targets.sortBySeat(player)){
                        await target.chooseToDiscard(baseNum, "h", true);
                    }
                    var targets = await player.chooseTarget(`選取${charNum}名角色，將他的1點[治療]轉移給你`, charNum, true,current=>current!=_status.event.player).set("ai", function (target) {
                        var player = _status.event.player;
                        if(target.side== player.side) return 0;
                        return target.zhiLiao;
                    }).forResultTargets();
                    for (var target of targets.sortBySeat(player)) {
                        if (target.zhiLiao > 0) {
                            await target.changeZhiLiao(-1);
                            await player.changeZhiLiao(1);
                        }
                    }
                },
                ai:{
                    order: function(item, player) {
                        var num=3.3;
                        var zhiLiao=game.hasPlayer(function(current){
                            return player.side!= current.side && current.zhiLiao>0;
                        });
                        if(zhiLiao) num+=0.1;
                        return num;
                    },
                },
                check: function (card) {
                    return 6 - get.value(card);
                }
            },
            zhouFu_nianZhou: {
                trigger: { player: "zhouFu" },
                filter: function (event, player) {
                    return player.countCards("h") > 0 && player.getGaiPai("zhouFu_yaoLi").length < 2;
                },
                async cost(event, trigger, player) {
                    event.result = await player
                        .chooseCard("h")
                        .set("prompt", get.prompt('zhouFu_nianZhou'))
                        .set('prompt2',lib.translate.zhouFu_nianZhou_info)
                        .set("ai", function (card) {
                            var xiBie = get.xiBie(card);
                            if (xiBie == "di") return 8;
                            else return 6-get.value(card);
                        })
                        .forResult();
                },
                content: function (event, trigger, player) {
                    player.addGaiPai(event.cards, "zhouFu_yaoLi");
                },
            },
            chiMeiWangLiang: {
                trigger: { source: "gongJiMingZhong" },
                filter: function (event, player) {
                    if (event.yingZhan == true) return false;
                    return player.getGaiPai("zhouFu_yaoLi").length > 0;
                },
                async cost(event, trigger, player) {
                    var result = await player
                        .chooseCardButton(
                            player.getGaiPai("zhouFu_yaoLi"),
                            "是否發動【魑魅魍魎】移除1個【妖力】<br>視為發動【咒符-火璃】或【咒符-凍天】"
                        )
                        .set('ai', function (button) {
                            if(get.xiBie(button.link)=='di') return 1;
                            else return 0.5;
                        })
                        .forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                content: async function (event, trigger, player) {
                    var card = event.cost_data[0];
                    await player.discard(card, "zhouFu_yaoLi");
                    var baseNum=1;
                    var bool = await player
                        .chooseCardButton([card], `是否展示地系【妖力】，使得該次【咒符】的傷害或棄牌效果+1`, 1)
                        .set("filterButton", function (button) {
                            return get.xiBie(button.link) == "di";
                        })
                        .set("ai", function () {
                            return 1;
                        })
                        .forResultBool();
                    if (bool) {
                        await player.showHiddenCards(card);
                        baseNum++;
                    }
                    var choicesList = [
                        `發動【咒符-火璃】，對1名目標角色造成${baseNum}點法術傷害,<br>你摸1張牌，棄1張牌`,
                        `發動【咒符-凍天】，指定1名目標角色棄${baseNum}張牌，將除你外1名目標角色的1[治療]轉移給你`,
                    ];
                    var choices = ["zhouFuHuoLi", "zhouFuDongTian"];
                    let next = player
                        .chooseControl(choices)
                        .set("prompt", "魑魅魍魎：選擇一項")
                        .set("choiceList", choicesList)
                        .set("ai", function () {
                            if (0.5 - Math.random() > 0) return "zhouFuHuoLi";
                            return "zhouFuDongTian";
                        });
                    var control = await next.forResultControl();
                    if (control == "zhouFuHuoLi") {
                        var skill= player.useSkill("zhouFuHuoLi");
                    } else if (control == "zhouFuDongTian") {
                        var skill= player.useSkill("zhouFuDongTian");
                    }
                    await skill.set('nianZhou', false).set('baseNum', baseNum);
                },
            },
            zhouLiChongSu: {
                trigger: { player: ["zhouFuStart"] },
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                content: function (event, trigger, player) {
                    player.removeBiShaShuiJing();
                    trigger.getParent().charNum=2;
                },
                ai: {
                    shuiJing: true,
                },
            },
            zhouFu_yaoLi: {
                intro: {
                    name: "妖力",
                    markcount: "gaiPai",
                    content:'gaiPai',
                },
                onremove: function (player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },

            //原初之弓
            yuanChu_tianZhiGong:{
                inherit: 'tianZhiGong',
                content: async function (event, trigger, player) {
                    await player.addZhiShiWu('yuanChu_shengHuangHuiGuangPao');
                },
                group:['yuanChu_tianZhiGong_zhuDongGongJi','yuanChu_tianZhiGong_zhuDongGongJiMingZhong'],
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
                            return get.mingGe(event.card)=='sheng';
                        },
                        content:function(){
                            player.addZhiShiWu('yuanChu_xinYang')
                        }
                    }
                }
            },
            yuanChu_shengXieJuBao: {
                inherit: 'shengXieJuBao',
                filter:function(event,player){
                    return player.countTongXiPai()>=2;
                },
                filterCard: function (card) {
                    return get.xuanZeTongXiPai(card);
                },
                content:function(){
                    if(get.name(cards[0])=='shengGuang') var xiBie='an';
                    else var xiBie=get.xiBie(cards[0],player);
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
            },
            yuanChu_shengHuangJiangLin:{
                inherit:'shengHuangJiangLin',
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.zhiLiao>=2||player.countZhiShiWu('yuanChu_xinYang')>=2;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog(`聖煌降臨：移除2點[治療]或2點<span class='hong'>【信仰】</span>`,'hidden');
                        var list=[];
                        if(player.zhiLiao>=2){
                            list.push('治療');
                        }
                        if(player.countZhiShiWu('yuanChu_xinYang')>=2){
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
								event.links=lib.skill.yuanChu_shengHuangJiangLin_backup.links;
                                if(event.links[0]=='治療'){
                                    player.changeZhiLiao(-2);
                                }else if(event.links[0]=='信仰'){
                                    player.removeZhiShiWu('yuanChu_xinYang',2);
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
                group:"yuanChu_shengHuangJiangLin_chongZhi",
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
                            player.changeZhiLiao(1)
                        }
                    }
                },
            },
            yuanChu_shengGuangBaoLie: {
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.isHengZhi()&&player.zhiLiao>0;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('聖光爆裂','hidden');
                        var list=[['1',"<span class='tiaoJian'>(移除你的1[治療])</span>摸1張牌[強制]，對手牌數小於你的目標對手造成2點攻擊傷害③，你+1<span class='hong'>【信仰】</span>"],['2',"<span class='tiaoJian'>(移除你的X[治療]，選擇最多X名手牌數不大於你手牌數-X的對手)</span>你棄X張牌，然後對他們各造成(Y+2)點攻擊傷害，Y為目標數中擁有[治療]的人數，你+X<span class='hong'>【信仰】</span>"]];
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return player.zhiLiao>=1;
                        }
                        if(link=='2'){
                            var bool=game.hasPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')<=player.countCards('h')-1;
                            });
                            return bool;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['yuanChu_shengGuangBaoLie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['yuanChu_shengGuangBaoLie_2']);
                        }
						return next;
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
                        content:async function(event,trigger,player){
                            await player.changeZhiLiao(-1);
                            await player.draw(1);
                            var bool=game.hasPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')<player.countCards('h');
                            });

                            if(bool){
                                var targets=await player.chooseTarget(true,function(card,player,target){
                                    return player.side!=target.side&&target.countCards('h')<player.countCards('h');
                                })
                                .set('ai',function(target){
                                    var player=_status.event.player;
                                    return get.damageEffect2(target,player,2);
                                })
                                .forResultTargets();
                                if(targets.length>0) await targets[0].damage(2,player);
                            }

                            await player.addZhiShiWu('yuanChu_xinYang');
                        },
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
                            await player.addZhiShiWu('yuanChu_xinYang',num);
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
            yuanChu_liuXingShengDan: {
                inherit: 'liuXingShengDan',
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    return event.yingZhan!=true&&(player.zhiLiao>0||player.countZhiShiWu('yuanChu_xinYang')>0);
                },
                async cost(event,trigger,player){
                    var list=[];
                    if(player.zhiLiao>0){
                        list.push('zhiLiao');
                    }
                    if(player.countZhiShiWu('yuanChu_xinYang')>0){
                        list.push('yuanChu_xinYang');
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
                            if(player.countZhiShiWu('yuanChu_xinYang')>0) return 'yuanChu_xinYang';
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
                    }else if(event.cost_data=='yuanChu_xinYang'){
                        player.removeZhiShiWu('yuanChu_xinYang',1);
                    }
                    'step 1'
                    player.chooseTarget(true,function(card,player,target){
                        return target.side==player.side;
                    }).set('prompt','我方目標角色+1[治療]').set('ai',function(target){
                        return get.zhiLiaoEffect(target,1);
                    });
                    'step 2'
                    result.targets[0].changeZhiLiao(1,player);
                },
            },
            yuanChu_shengHuangHuiGuangPao:{
                markimage:'image/card/zhuanShu/yuanChu_shengHuangHuiGuangPao.png',
                intro:{
                    content:`<span class='tiaoJian'>(僅【聖煌形態】下可發動，移除4點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然後移除等同我方落後士氣的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>數)</span>所有角色將手牌調整為4張，我方【星杯區】+1[星杯]，然後將一方[士氣]調整與另一方相同,我方所有角色各+1[治療]，你額外+1[攻擊行動]或[法術行動]並將【聖煌輝光炮】翻面。`,
                    nocount:true,
                },
                onremove:'storage',
                type:'faShu',
                enable:'faShu',
                selectTarget:-1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.hasZhiShiWu('yuanChu_shengHuangHuiGuangPao')) return false;
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    num+=Math.max(0,shiQiCha);
                    return player.countZhiShiWu('yuanChu_xinYang')>=num;
                },
                contentBefore:async function(event,trigger,player){
                    await player.removeZhiShiWu('yuanChu_xinYang',4);
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    if(shiQiCha>0) await player.removeZhiShiWu('yuanChu_xinYang',shiQiCha);
                },
                content:async function(event,trigger,player){
                    var target=event.target;
                    await target.tiaoZhengShouPai(4);
                },
                contentAfter:async function(event,trigger,player){
                    await player.changeXingBei(1);
                    var choiceList=['紅方士氣設置為藍方士氣','藍方士氣設置為紅方士氣'];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return '選項一';
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return '選項二';
                        }
                        var num=Math.random();
                        if(num<0.5) return '選項一';
                        else return '選項二';
                    }).forResultControl();
                    if(control=='選項一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                    for(var current of game.players){
                        if(current.side==player.side){
                            await current.addZhiLiao();
                        }
                    }
                    player.addGongJiOrFaShu();
                    await player.removeZhiShiWu('yuanChu_shengHuangHuiGuangPao');
                    await player.addZhiShiWu('yuanChu_shengHuangYuHui');
                },
                ai:{
                    order:function(item,player){
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return 5;
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return 5;
                        }
                        return 2;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yuanChu_shengHuangYuHui:{
                markimage:'image/card/zhuanShu/yuanChu_shengHuangYuHui.png',
                intro:{
                    content:`<span class='tiaoJian'>(僅【聖煌形態】下可發動，移除4點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然後移除等同我方落後士氣的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>數)</span>所有角色將手牌調整為4張，我方【星杯區】+1[星杯]，然後將一方[士氣]調整與另一方相同，然後移除【聖煌餘輝】。`,
                    nocount:true,
                },
                onremove:'storage',
                type:'faShu',
                enable:'faShu',
                selectTarget:-1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.hasZhiShiWu('yuanChu_shengHuangYuHui')) return false;
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    num+=Math.max(0,shiQiCha);
                    return player.countZhiShiWu('yuanChu_xinYang')>=num;
                },
                contentBefore:async function(event,trigger,player){
                    await player.removeZhiShiWu('yuanChu_xinYang',4);
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    await player.removeZhiShiWu('yuanChu_xinYang',shiQiCha);
                },
                content:async function(event,trigger,player){ 
                    var target=event.target;
                    await target.tiaoZhengShouPai(4);
                },
                contentAfter:async function(event,trigger,player){
                    await player.changeXingBei(1);
                    var choiceList=['紅方士氣設置為藍方士氣','藍方士氣設置為紅方士氣'];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return '選項一';
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return '選項二';
                        }
                        var num=Math.random();
                        if(num<0.5) return '選項一';
                        else return '選項二';
                    }).forResultControl();
                    if(control=='選項一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                    await player.removeZhiShiWu('yuanChu_shengHuangYuHui');
                },
                ai:{
                    order:function(item,player){
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return 5;
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return 5;
                        }
                        return 2;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yuanChu_ziDongTianChong:{
                inherit: 'ziDongTianChong',
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
                        await player.addZhiShiWu('yuanChu_xinYang',num);
                    }
                },
            },
            yuanChu_xinYang:{
                inherit: 'xinYang',
            },

            // 搗蛋蘿莉
            'tianShi?': {
                inherit: "tianShiZhiQiang",
                mod:{
                    aiValue(player, card, num) {
				        if (card.hasDuYou('tianShiZhiQiang')) return num + 1.2;
			        },
                }
            },
            panNiZhiQiang: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return get.name(card) == "shengDun";
                },
                lose:false,
                discard: false,
                showCards: true,
                filter: function (event, player) {
                    var bool1 = player.hasCard(function (card) {
                        return lib.skill.panNiZhiQiang.filterCard(card);
                    });
                    var bool2 = game.hasPlayer(function (current) {
                        return lib.skill.panNiZhiQiang.filterTarget("", "", current);
                    });
                    return bool1 && bool2;
                },
                filterTarget: function (card, player, target) {
                    return target.hasJiChuXiaoGuo();
                },
                content: async function (event, trigger, player) {
                    var target = event.target;
                    var list = target.jiChuXiaoGuoList();
                    if (list.length == 0) {
                        return;
                    }
                    if (list.includes("_shengDun")) {
                        // 如果目標角色擁有【聖盾】，因為聖盾只能存在1個，只能選擇【聖盾】
                        var control = "_shengDun";
                    }else if(list.length==1){
                        var control = list[0];
                    }
                    else{
                        var control = await player
                        .chooseControl(list)
                        .set("prompt", "選擇要獲得的基礎效果")
                        .set("targetX", target)
                        .set("listX", list)
                        .set('ai', function () {
                            var list= _status.event.listX;
                            if(list.length==1) return list[0];
                            if(list.includes("_xuRuo")) return "_xuRuo";
                            for(var xiaoGuo of game.jiChuXiaoGuo['fengYinShi_xiaoGuo']){
                                if(target.hasJiChuXiaoGuo(xiaoGuo)){
                                    return xiaoGuo;
                                }
                            }
                            return list[0];
                        })
                        .forResultControl();
                    }
                    
                    var card;
                    if (control == "_zhongDu" && target.getJiChuXiaoGuo("_zhongDu").length != 1) {
                        var zhongDu = await player.chooseCardButton(target.getJiChuXiaoGuo("_zhongDu"), true, "選擇要獲得的中毒").forResultLinks();
                        card = zhongDu[0];
                        var list = target.getJiChuXiaoGuo("_zhongDu");
                        var index = list.indexOf(card);
                        target.storage.zhongDu.splice(index, 1);
                    } else {
                        card = target.getJiChuXiaoGuo(control);
                        if (control == "_zhongDu") target.storage.zhongDu = [];
                    }
                    await target.lose(card,ui.ordering);
                    //await game.cardsGotoOrdering(card);
                    await target.addJiChuXiaoGuo('_shengDun', player,event.cards);
                    //game.log(player, "獲得了", card);
                    await player.gain(card,'gain2');
                    if (!game.jiChuXiaoGuo.pai_xiaoGuo.includes(control)) {
                        target.removeSkill(control);
                    }
                    await player.chooseToDiscard(1, "h", true);
                },
                ai:{
                    order:3.25,
                    result: {
                        target: function (player, target) {
                            if(target.side!= player.side) return 0;
                            return Math.max(0,get.jiChuXiaoGuoEffect(target));
                        }
                    }
                }
            },
            tricky: {
                subSkill: {
                    xiaoGuo: {
                        marktext: "T",
                        intro: {
                            content: "jiChuXiaoGuo",
                            mark:function (dialog, content, player) {
                                dialog.addText("基礎效果");
                            },
                        },
                        onremove: function (player, skill) {
                            const cards = player.hasJiChuXiaoGuo(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        tag: {
                            jiChuXiaoGuo: true,
                        },
                    },
                },
            },
            shenMiFuBi: {
                trigger: { player: "faShuAfter" },
                forced: true,
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return !current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                    });
                },
                content: async function (event, trigger, player) {
                    const targets = await player
                        .chooseTarget("神秘伏筆：將牌庫頂1-2張牌放置於X名目標角色旁，作為【Tricky】", true, [1, 2], function (card, player, target) {
                            return lib.filter.targetEnabled({ name: "tricky" }, player, target);
                        })
                        .set('ai', function (target) {
                            var player = _status.event.player;
                            if(player.side == target.side) return 0.1;
                            else return 1;
                        })
                        .forResultTargets();
                    for (var target of targets) {
                        if (!target.hasSkill("tricky_xiaoGuo")) {
                            target.addSkill("tricky_xiaoGuo");
                        }
                        var cards = await get.cards();
                        await target.addJiChuXiaoGuo('tricky_xiaoGuo', player, cards).set('animate','draw');
                    }
                },
            },
            'T-r-i-c-k-y!': {
                trigger: { source: "gongJiWeiMingZhong" },
                filter: function (event, player) {
                    if (event.yingZhan == true) return false;
                    if (
                        !game.hasPlayer(function (current) {
                            return current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                        })
                    )
                        return false;
                    return true;
                },
                async cost(event, trigger, player) {
                    event.result = await player
                        .chooseTarget(function (card, player, target) {
                            return target.hasJiChuXiaoGuo("tricky_xiaoGuo");
                        })
                        .set("ai", function (target) {
                            var player = _status.event.player;
                            return get.damageEffect2(target, player, 2);
                        })
                        .set('prompt',get.prompt('T-r-i-c-k-y!'))
                        .set('prompt2',lib.translate['T-r-i-c-k-y!_info'])
                        .forResult(); 
                },
                content: async function (event, trigger, player) {
                    for (var target of event.targets) {
                        var cards = target.getJiChuXiaoGuo("tricky_xiaoGuo");
                        var card = cards[0];
                        var xiBie = get.xiBie(card);
                        var dialog = ["T-r-i-c-k-y!：移除該【Tricky】[展示]並額外棄1張同系牌[展示]",[[card], "card"]];

                        var result = await player
                            .chooseCard(card=> get.xiBie(card) == _status.event.xiBie)
                            .set("xiBie", xiBie)
                            .set('dialog', dialog)
                            .set('ai',function(card){
                                return 5- get.value(card);
                            })
                            .forResult();
                        if (result.bool) {
                            await target.discard(target.getJiChuXiaoGuo("tricky_xiaoGuo"), "tricky_xiaoGuo").set("visible", true);
                            target.removeSkill("tricky_xiaoGuo");
                            await player.discard(result.cards,'showHiddenCards');
                            await target.faShuDamage(2, player);
                        }
                    }
                },
            },
            trickOrTreat: {
                forced: true,
                trigger: { player: "xingDongEnd" },
                filter: function (event, player) {
                    let x = 0;
                    for (var p of game.players) {
                        if (p.hasJiChuXiaoGuo("tricky_xiaoGuo")) {
                            x++;
                        }
                    }
                    return x > 4;
                },
                content: async function (event, trigger, player) {
                    var woFang = 0;
                    var duiFang = 0;
                    var cards= [];
                    var players = game.filterPlayer(function (current) {
                        return current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                    }).sortBySeat(player);
                    for (var p of players) {
                        cards.push(p.getJiChuXiaoGuo("tricky_xiaoGuo")[0]);
                    }
                    await player.showHiddenCards(cards);
                    
                    for(var p of players){
                        var card= p.getJiChuXiaoGuo("tricky_xiaoGuo")[0];
                        var name=get.colorName(player);
                        var dialog = [`棄1張與面前【Tricky】對應屬性的牌[展示]<br>否則${name}對你造成2點法術傷害③`,[[card], "card"]];
                        var result = await p.chooseToDiscard(1, "h",'showCards',card=> get.xiBie(card) == _status.event.xiBie)
                            .set("xiBie", get.xiBie(card))
                            .set('dialog', dialog)
                            .set('ai',function(card){
                                return 6- get.value(card);
                            })
                            .forResult();
                        if(result.bool){
                            if(player.side== p.side) woFang++;
                            else duiFang++;
                        }else{
                            await p.faShuDamage(2, player);
                        }
                    }

                    for(var p of players){
                        await p.discard(p.getJiChuXiaoGuo("tricky_xiaoGuo"), "tricky_xiaoGuo").set("visible", true);
                        p.removeSkill("tricky_xiaoGuo");
                    }

                    if (woFang > duiFang) {
                        const choiceList = ["【戰績區】+1[水晶]，並且你+1[水晶]", "棄1張牌並額外獲得一個回合"];
                        const choices = ["選項一", "選項二"];
                        let next = player.chooseControl(choices).set("prompt", "我方棄牌>對方：選擇一項").set("choiceList", choiceList);
                        var control = await next.forResultControl();
                        if (control == "選項一") {
                            await player.changeZhanJi("shuiJing", 1);
                            await player.addNengLiang("shuiJing", 1);
                        } else {
                            await player.chooseToDiscard(1, "h", true);
                            player.insertPhase();
                        }
                    } else if (woFang < duiFang) {
                        await player.changeZhanJi("baoShi", 1, !player.side);
                    }
                },
            },
            suprise: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaShuiJing() && player.countCards("h") > 0;
                },
                selectCard: 1,
                filterCard: true,
                discard: true,
                async content(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    player.addTempSkill("suprise_sheZhi", { player: "phaseEndBefore" });
                    var cards=[];
                    var players = game.filterPlayer(function (current) {
                        return current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                    }).sortBySeat(player);
                    for (var p of players) {
                        if (p.hasJiChuXiaoGuo("tricky_xiaoGuo")) {
                            var tricky = p.getJiChuXiaoGuo("tricky_xiaoGuo");
                            cards.addArray(tricky);
                        }
                    }
                    await player.gain(cards);
                    for(var p of players){
                        p.removeSkill("tricky_xiaoGuo");
                    }

                    var bool=game.hasPlayer(function(current){
                        return lib.filter.targetEnabled({ name: "tricky" }, player, current);
                    });

                    while (player.countCards("h") > 0 && bool) {
                        var result = await player
                            .chooseCardTarget({
                                filterCard:true,
                                filterTarget:function (card, player, target) {
                                    return lib.filter.targetEnabled({ name: "tricky" }, player, target);
                                },
                                prompt:"選擇1名目標角色，將1張手牌作為基礎效果【Tricky】放置",
                                ai1(card) {
                                    return 6- get.value(card);
                                },
                                ai2(target) {
                                    var player = _status.event.player;
                                    if(player.side == target.side) return 0.1;
                                    else return 1;
                                },
                            }).forResult();

                        if (!result.bool) {
                            break;
                        }
                        var target = result.targets[0];
                        var cards = result.cards;

                        if (!target.hasSkill("tricky_xiaoGuo")) {
                            target.addSkill("tricky_xiaoGuo");
                        }
                        await target.addJiChuXiaoGuo('tricky_xiaoGuo', player, cards).set('animate','draw');
                        bool=game.hasPlayer(function(current){
                            return lib.filter.targetEnabled({ name: "tricky" }, player, current);
                        });
                    }
                },
                subSkill: {
                    sheZhi: {
                        mod: {
                            maxHandcard: function (player, num) {
                                return num + 5;
                            },
                        },
                    },
                },
            },

            //trick聖弓
            trick_tianZhiGong:{
                inherit: 'tianZhiGong',
                content:function(){
                    player.addNengLiang('baoShi',2);
                }
            },
            trick_shengHuangJiangLin:{
                inherit:'shengHuangJiangLin',
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
								event.links=lib.skill.trick_shengHuangJiangLin_backup.links;
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
                group:"trick_shengHuangJiangLin_chongZhi",
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
                            player.changeZhiLiao(1)
                        }
                    }
                },
            },
            trick_shengGuangBaoLie:{
                inherit: 'shengGuangBaoLie',
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('聖光爆裂','hidden');
                        var list=[['1',"移除你的1點[治療]，摸1張牌[強制]，你+1<span class='hong'>【信仰】</span>，目標隊友+1[治療]"],['2',"<span class='tiaoJian'>(移除你的X[治療]，選擇最多X名手牌數不大於你手牌數-X的對手)</span>你棄X張牌，然後對他們各造成(Y+2)點攻擊傷害。 Y為目標數中擁有[治療]的人數"]];
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
                            })
                            return player.zhiLiao>0&&bool;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['trick_shengGuangBaoLie_1']);
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
                            if(player.zhiLiao>0){
                                player.changeZhiLiao(-1);
                            }
                            'step 1'
                            player.draw(1);
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
                },
            },
            trick_shengHuangHuiGuangPao:{
                inherit: 'shengHuangHuiGuangPao',
                contentAfter:async function(event,trigger,player){
                    await player.changeXingBei(1);
                    var choiceList=['紅方士氣設置為藍方士氣','藍方士氣設置為紅方士氣'];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return '選項一';
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return '選項二';
                        }
                        var num=Math.random();
                        if(num<0.5) return '選項一';
                        else return '選項二';
                    }).forResultControl();
                    if(control=='選項一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                    for(var current of game.players){
                        if(current.side==player.side){
                            await current.addZhiLiao();
                        }
                    }
                },
            },
            trick_ziDongTianChong:{
                inherit: 'ziDongTianChong',
                content:async function(event,trigger,player){
                    var choiceList=[`[水晶]你+1<span class='hong'>【信仰】</span>或+1[治療]，然後+1【聖煌輝光炮】`,`[寶石]你+2<span class='hong'>【信仰】</span>或目標角色+2[治療]`];
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
                        //await player.addNengLiang('shuiJing',1);
                        var num=2;
                    }
                    var list=['信仰','治療'];
                    var add=await player.chooseControl(list).set('prompt','+'+num+"點<span class='hong'>【信仰】</span>或[治療]").forResultControl();

                    if(add=='治療'){
                        if(control=='選項二'){
                            var targets=await player.chooseTarget(`選擇目標角色+2[治療]`).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,2);
                            }).forResultTargets();
                            var target=targets[0];
                            await target.changeZhiLiao(2);
                        }else await player.changeZhiLiao(num);
                    }else if(add=='信仰'){
                        await player.addZhiShiWu('xinYang',num);
                    }
                    if(control=='選項一'){
                        await player.addZhiShiWu('shengHuangHuiGuangPaoX');
                    }
                },
            },

            //trick冒險家
            trick_qiZha:{
                inherit: 'qiZha',
                selectCard:2,
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
                    }
                    var card={name:name,xiBie:xiBie};
                    await player.useCard(card,event.target).set('action',true);
                },
            },
            trick_maoXianJiaTianTang:{
                enable:'xingDong',
                type:'teShu',
                filter: function(event, player) {
                    return player.canBiShaShuiJing()&&get.zhanJi(player.side).length>0;
                },
                chooseButton:{
                    dialog: function(event, player) {
                        var dialog=ui.create.dialog('冒險家天堂：移除自身X[能量]','hidden');
                        var list=[];
                        for(var i=0;i<player.countNengLiang('baoShi');i++){
                            list.push('寶石');
                        }
                        for(var i=0;i<player.countNengLiang('shuiJing');i++){
                            list.push('水晶');
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
                    },
                    select:[1,Infinity],
                    backup:function(links,player){
						return{
							links:links,
							type:'teShu',
							content:async function(event,trigger,player){
                                var links=lib.skill.trick_maoXianJiaTianTang_backup.links;
                                var tiLian=[];
                                //移除能量
                                var baoShi=links.filter(function(xingShi){
                                    return xingShi=='寶石';
                                }).length;
                                var shuiJing=links.filter(function(xingShi){
                                    return xingShi=='水晶';
                                }).length;
                                if(baoShi>0){
                                    await player.removeNengLiang('baoShi',baoShi);
                                }
                                if(shuiJing>0){
                                    await player.removeNengLiang('shuiJing',shuiJing);
                                }
                                //提煉
                                var zhanJi=get.zhanJi(player.side);
                                var list=[];
                                for(var i=0;i<zhanJi.length;i++){
                                    list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                };
                                var next=player.chooseButton([
                                    '選擇提煉的星石',
                                    [list,'tdnodes'],
                                ]);
                                next.set('forced',true);
                                next.set('selectButton',[1,2]);
                                next.set('ai',function(button){
                                    if(button.link=='baoShi'){
                                        return 1;
                                    }else return 0.5;
                                });

                                tiLian= await next.forResultLinks();
                                var tiLianBaoShi= tiLian.filter(function(xingShi){
                                    return xingShi=='baoShi';
                                }).length;
                                var tiLianShuiJing= tiLian.filter(function(xingShi){
                                    return xingShi=='shuiJing';
                                }).length;
                                if(tiLianBaoShi>0){
                                    await player.removeZhanJi('baoShi',tiLianBaoShi);
                                }
                                if(tiLianShuiJing>0){
                                    await player.removeZhanJi('shuiJing',tiLianShuiJing);
                                }
                                //額外提煉水晶
                                var zhanJi= get.zhanJi(player.side);
                                var zhanJiShuiJing=zhanJi.filter(function(xingShi){
                                    return xingShi=='shuiJing';
                                });
                                var num=links.length;
                                if(num>zhanJiShuiJing.length){
                                    num=zhanJiShuiJing.length;
                                }
                                if(num>0){
                                    tiLian.addArray(zhanJiShuiJing);
                                    await player.removeZhanJi('shuiJing',num);
                                }
                                //分配提煉結果
                                var range=[0,2];
                                if(tiLian.length==1) range=[0,1];
                                var select=player.chooseTarget(`將提煉的星石分配給至多${range[1]}名目標隊友`,true,range,function(card, player, target) {
                                    if(target==player) return false;
                                    return target.side==player.side;
                                }).set('ai', function (target) {
                                    return target.countEmptyNengLiang()+0.5;//防止0
                                });
                                var targets= await select.forResultTargets();
                                if(targets.length==0) return;
                                else if(targets.length==1){
                                    var target=targets[0];
                                    var baoShi=tiLian.filter(function(xingShi){
                                        return xingShi=='baoShi';
                                    }).length;
                                    var shuiJing=tiLian.filter(function(xingShi){
                                        return xingShi=='shuiJing';
                                    }).length;
                                    if(baoShi>0){
                                        await target.addNengLiang('baoShi',baoShi);
                                    }
                                    if(shuiJing>0){
                                        await target.addNengLiang('shuiJing',shuiJing);
                                    }
                                }else if(targets.length==2){
                                    var target1=targets[0];
                                    var target2=targets[1];
                                    var name=get.colorName(target1);
                                    var tiLianTarget1=[];
                                    var tiLianTarget2=[];
                                    var baoShi=0;
                                    var shuiJing=0;

                                    var list=[];
                                    for(var i=0;i<tiLian.length;i++){
                                        list.push([tiLian[i],get.translation(tiLian[i])]);
                                    };
                                    tiLianTarget1= await player.chooseButton([
                                        `選擇分配給${name}的星石`,
                                        [list,'tdnodes'],
                                    ])
                                    .set('forced',true)
                                    .set('selectButton',[1,tiLian.length-1])
                                    .set('ai',function(button){
                                        var target=_status.event.target;
                                        if(ui.selected.buttons.length>=target.countEmptyNengLiang()) return 0;
                                        if(button.link[0]=='baoShi'){
                                            return 1;
                                        }else return 0.5;
                                    })
                                    .set('target',target1).forResultLinks();

                                    tiLian.removeArray(tiLianTarget1);
                                    baoShi=tiLianTarget1.filter(function(xingShi){
                                        return xingShi=='baoShi';
                                    }).length;
                                    shuiJing=tiLianTarget1.filter(function(xingShi){
                                        return xingShi=='shuiJing';
                                    }).length;
                                    if(baoShi>0){
                                        await target1.addNengLiang('baoShi',baoShi);
                                    }
                                    if(shuiJing>0){
                                        await target1.addNengLiang('shuiJing',shuiJing);
                                    }

                                    var baoShi=tiLian.filter(function(xingShi){
                                        return xingShi=='baoShi';
                                    }).length;
                                    var shuiJing=tiLian.filter(function(xingShi){
                                        return xingShi=='shuiJing';
                                    }).length;
                                    if(baoShi>0){
                                        await target2.addNengLiang('baoShi',baoShi);
                                    }
                                    if(shuiJing>0){
                                        await target2.addNengLiang('shuiJing',shuiJing);
                                    }
                                }
                                
							},
						}
					},
                    check: function (button) {
                        var num=0;
                        var player=_status.event.player;
                        for(var current of game.players){
                            if(player.side==current.side){
                                num+=current.countEmptyNengLiang();
                            }
                        }
                        if(button.link<=num){
                            return button.link;
                        }else return 0;
                    },
                },
                ai:{
                    order: 3.3,
                    result:{
                        player: function(player){
                            var num=0;
                            for(var current of game.players){
                                if(player.side==current.side){
                                    num+=current.countEmptyNengLiang();
                                }
                            }
                            if(num<=1) return 0;
                            var zhanJi= get.zhanJi(player.side).length;
                            if(zhanJi<2) return 0;
                            else return 1;
                        }
                    }
                }
            },

            //蘿莉番長
            xuanHuaShangDeng: {
                trigger: { player: "gongJiMingZhong" },
                forced: true,
                content: async function (event, trigger, player) {
                    let num = 0;
                    for (; num < 3;) {
                        num++;
                        let cards = get.cards();
                        await player.showHiddenCards(cards);
                        const card = cards[0];
                        if (get.mingGe(card) !== "xue" && get.type(card) !== "faShu") {
                            break;
                        }
                    }
                    trigger.changeDamageNum(num);
                },
            },
            yeLuSiKu:{
                group: ['yeLuSiKu_xueYingKuangDao','yeLuSiKu_xueXingPaoXiao','xueYingKuangDao_gongJiMingZhong'],
                subSkill:{
                    xueYingKuangDao:{
                        inherit: 'xueYingKuangDao',
                    },
                    xueXingPaoXiao:{
                        inherit: 'xueXingPaoXiao',
                    },
                },
                trigger:{player:['logSkillBegin']},
                forced:true,
                filter:function(event,player){
                    return event.skill&&event.skill.startsWith('yeLuSiKu_');
                },
                content: async function(event,trigger,player){
                },
            },
            aiSiTianLiu:{
                trigger:{player:'yeLuSiKu_xueXingPaoXiaoBegin'},
                forced:true,
                content: async function(event,trigger,player){
                    if(trigger.getParent("useCard").target.zhiLiao>0){
                        trigger.getParent("useCard").wuFaAnMie();
                        trigger.getParent("useCard").wuFaShengGuang();
                    }
                    trigger.cancel();
                },
            },
            mieChaKuCha:{
                trigger: { source: "gongJiMingZhongAfter" },
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                async cost(event, trigger, player) {
                    var list = ["[寶石]本次攻擊傷害額外+2。", "[水晶]本次攻擊傷害額外+1。"];
                    var choices = ["選項二",'取消'];
                    if (player.canBiShaBaoShi()) {
                        choices.unshift("選項一");
                    }
                    let next = player
                        .chooseControl(choices)
                        .set("prompt", get.prompt("mieChaKuCha"))
                        .set("prompt2", lib.translate["mieChaKuCha_info"])
                        .set("choiceList", list)
                        .set("ai", function () {
                            return 0;
                        });
                    var control = await next.forResultControl();
                    event.result={
                        bool: control != '取消',
                        cost_data:control,
                    }
                },
                content: async function (event, trigger, player) {
                    var control = event.cost_data;
                    if (control == "選項一") {
                        await player.removeBiShaBaoShi();
                        trigger.changeDamageNum(2);
                    } else if (control == "選項二") {
                        await player.removeBiShaShuiJing();
                        trigger.changeDamageNum(1);
                    }
                },
            },

            // 見習製片
            yuanZiXiShou: {
                inherit:'yuanSuXiShou',
                content: function (event, trigger, player) {
                    player.addZhiShiWu("yuanZi");
                },
            },
            yuanZiChongSu: {
                type: "faShu",
                enable: "faShu",
                selectCard: [0, 3],
                filterCard: true,
                filter: function (event, player) {
                    return player.countMark("yuanZi") >= 2;
                },
                content: async function (event, trigger, player) {
                    await player.removeZhiShiWu("yuanZi", 2);
                    var cards = event.cards;
                    if(cards.length>0){
                        await player.draw(cards.length);
                    }
                    player.addFaShu();
                },
                check: function (card) {
                    var value = get.value(card);
                    var duYouList=get.duYouList(card);
                    if(duYouList&&(duYouList.includes('bingDong')||duYouList.includes('yunShi')||duYouList.includes('huoQou')||duYouList.includes('fengRen')||duYouList.includes('leiJi'))){
                        value += 1.5;
                    }
                    return 5 - value;
                },
                ai: {
                    order: function (item, player) {
                        return (
                            2 +
                            0.5 *
                            Math.max(
                                player.countCards(
                                    "h",
                                    card => get.mingGe(card) != "yong" || (get.type(card) == "faShu" && get.name(card) !== "moDan")
                                ),
                                3
                            )
                        );
                    },
                },
            },
            yuanSuXueTu: {
                subSkill:{
                    yunShi:{
                        inherit:'yunShi',
                    },
                    bingDong:{
                        inherit:'bingDong',
                    },
                    huoQou:{
                        inherit:'huoQou',
                    },
                    fengRen:{
                        inherit:'fengRen',
                    },
                    leiJi:{
                        inherit:'leiJi',
                    }
                },
                group: ['yuanSuXueTu_yunShi', 'yuanSuXueTu_bingDong', 'yuanSuXueTu_huoQou', 'yuanSuXueTu_fengRen', 'yuanSuXueTu_leiJi'],
                trigger:{player:['logSkillBegin']},
                forced:true,
                filter:function(event,player){
                    return event.skill&&event.skill.startsWith('yuanSuXueTu_');
                },
                content: async function(event,trigger,player){
                },
            },
            leiJiBianYi: {
                trigger:{player:'yuanSuXueTu_leiJiBegin'},
                forced:true,
                content: function(){
                    'step 0'
                    var cards=trigger.cards;
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    var target=trigger.target;
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.addZhiShiWu('yuanZi',1);
                    trigger.cancel();
                },
            },
            yueYun: {
                inherit:'yueGuang',
            },
            yuanZi: {
                intro: {
                    name: "元子",
                    content: "mark",
                    max: 3,
                },
                onremove: "storage",
                markimage: "image/card/zhiShiWu/hong.png",
            },

            //怠惰少女
            bieFanWo:{
                type:'faShu',
                enable:'faShu',
                selectTarget:-1,
                filter: function (event, player) {
                    return player.countCards('h') > 0;
                },
                filterTarget: function (card, player, target) {
                    var muBiao=player;
                    while(muBiao.side!=player.side||muBiao==player){
                        muBiao=muBiao.getNext();
                    }
                    return target==muBiao;
                },
                content: async function(event, trigger, player) {
                    var card=player.getCards('h').randomGet();
                    if(card){
                        await player.discard(card,event.target,'notBySelf');
                    }
                    var targets=await event.target.chooseTarget('選擇1名目標對手摸1張牌',true,function(card, player, target) {
                        return target.side!=player.side;
                    }).set('ai', function (target) {
                        return target.countCards('h') + 0.5;
                    }).forResultTargets();
                    var target=targets[0];
                    if(target){
                        await target.draw(1);
                    }
                    await player.addZhanJi('shuiJing', 1);

                    var colorName= get.colorName(event.target);
                    var result = await target.chooseToDiscard('h','showCards', 1, `棄1張法術牌[展示]，否則你摸1張牌、${colorName}加1[治療]`,function(card) {
                        return get.type(card) == 'faShu';
                    }).set('ai',function(card) {
                        return 6-get.value(card);
                    }).forResult();
                    if(!result.bool){
                        await target.draw(1);
                        await event.target.changeZhiLiao(1);
                    }
                },
                ai:{
                    order: 3.2,
                    result:{
                        player: function(player) {
                            var zhanJi=get.zhanJi(player.side);
                            if(zhanJi.length<get.zhanJiMax(player.side)) return 1;
                            var targets=game.filterPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')+1>=current.getHandcardLimit();
                            });
                            if(targets.length>0) return 1;
                            return 0;
                        },
                    }
                }
            },
            rangWoTangPing: {
                trigger: { player: "phaseBegin" },
                filter: function (event, player) {
                    return player.countCards('h') > 3;
                },
                async cost(event, trigger, player) {
                    var next= player.chooseTarget(1,function(card, player, target) {
                        return target.side==player.side&& target!=player;
                    });
                    next.set('prompt',get.prompt('rangWoTangPing'));
                    next.set('prompt2',lib.translate['rangWoTangPing_info']);
                    next.set('ai', function (target) {
                        return get.zhiLiaoEffect(target, 1);
                    });
                    event.result = await next.forResult();
                },
                content: async function(event, trigger, player) {
                    await event.targets[0].changeZhiLiao(1);
                    //player.skip('xingDong');
                    trigger.xuRuo=true;
                },
            },
            xiangYongMoDan: {
                enable:['faShu','moDan'],
                type:'faShu',
                selectCard:2,
                filterCard: function(card) {
                    return get.xuanZeTongXiPai(card);
                },
                complexCard: true,
                discard: true,
                showCards: true,
                viewAs:{name:'moDan'},
                viewAsFilter: function(player) {
                    return player.countTongXiPai() >=2;
                },
                ai: {
                    order:3.1,
                    result:{
                        player:1,
                    }
                },
                check: function(card) {
                    return 5-get.value(card);
                },
            },
            buXiangTiLian: {
                init:function(player){
                    player.tempBanSkill('_tiLian','forever');
                },
                onremove:function(player){
                    delete player.storage.temp_ban__tiLian;
                },
                trigger:{global:'_tiLian_backupEnd'},
                forced:true,
                filter:function(event,player){
                    return event.player.side==player.side&&event.player!=player;
                },
                content: async function(event, trigger, player) {
                    await player.addNengLiang('baoShi', 1);
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length>0){
                        var list=[];
                        for(var i=0;i<zhanJi.length;i++){
                            list.push([zhanJi[i],get.translation(zhanJi[i])]);
                        }
                        var next=player.chooseButton([
                            `不想提煉：移除我方【戰績區】1星石`,
                            [list,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('ai',function(button){
                            if(button.link=='baoShi') return 0.5;
                            else return 1;
                        });
                        var links=await next.forResultLinks();
                        await player.removeZhanJi(links[0],1);
                    }
                },
            },
            zaiShuiYiXia:{
                trigger: { player: "xingDongSkipped" },
                forced: true,
                filter: function (event, player) {
                    return player.canBiShaBaoShi();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    await player.chooseToDiscard(1,true,'在睡一下：棄1張牌');
                    player.addSkill('zaiShuiYiXia_yiChu');
                    event.yiChu=false;
                    for(var current of game.players){
                        if(current!=player&&player.side==current.side){
                            await current.changeZhiLiao(1).set('zaiShuiYiXia',true);
                        }
                    }
                    player.removeSkill('zaiShuiYiXia_yiChu');
                    if(event.yiChu){
                        await player.changeShiQi(1);
                    }
                },
                subSkill:{
                    yiChu:{
                        trigger:{global:'zhiLiaoYiChu'},
                        direct:true,
                        filter:function(event,player){
                            return event.zaiShuiYiXia&&event.player.side==player.side&&event.player!=player;
                        },
                        content: async function(event, trigger, player) {
                            event.getParent('zaiShuiYiXia').yiChu=true;
                        }
                    }
                },
                ai:{
                    baoShi:true,
                }
            },

            //嫉妒少女
            cuYiXiuXin: {
                trigger: { source: "gongJiWeiMingZhong" },
                filter: function (event, player) {
                    return event.yingZhan!=true;
                },
                async cost(event, trigger, player) {
                    var next= player.chooseTarget(1);
                    next.set('prompt',get.prompt('cuYiXiuXin'));
                    next.set('prompt2',lib.translate['cuYiXiuXin_info']);
                    next.set('ai', function (target) {
                        var player=_status.event.player;
                        return get.damageEffect2(target, player, 1);
                    });
                    event.result = await next.forResult();
                },
                content: async function(event, trigger, player) {
                    var target=event.targets[0];
                    var colorName=get.colorName(player);
                    var result=await target.chooseToDiscard('h','showCards', 1, `棄1張法術牌[展示]，否則${colorName}對你造成2點法術傷害③、我方【戰績區】+1[水晶]`,function(card) {
                        return get.type(card) == 'faShu';
                    })
                    .set('ai',function(card) {
                        return 6-get.value(card);
                    }).forResult();
                    if(!result.bool){
                        await target.faShuDamage(2,player);
                        await player.addZhanJi('shuiJing', 1);
                    }
                },
            },
            xuRongZhangWo:{
                trigger: { player: "gongJiMingZhong" },
                filter: function (event, player) {
                    return event.yingZhan!=true;
                },
                content: async function(event, trigger, player) {
                    player.storage.extraXingDong.push({
                        xingDong:'faShu',
                        filterCard:function(card,player,event){
                            if(get.name(card)!='moDan') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        filterTarget:function(card, player, target){
                            if(get.name(card)=='moDan'){
                                var mubiao=player.getPrevious();
                                while(mubiao.side==player.side){
                                    mubiao=mubiao.getPrevious();
                                }
                                if(target==mubiao) return true;
                                var mubiao=player.getNext();
                                while(mubiao.side==player.side){
                                    mubiao=mubiao.getNext();
                                }
                                if(target==mubiao) return true;
                            }
                        },
                        prompt:'虛榮掌握：魔彈[法術行動]',
                    });
                },
                group: ['xuRongZhangWo_zuoChuan'],
                subSkill:{
                    zuoChuan:{
                        trigger:{player:'useCardBefore'},
                        direct:true,
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
                    }
                },
            },
            xiangSiBing:{
                enable:['faShu','moDan'],
				filterCard:function(card){
                    return get.xiBie(card)=='di'||get.xiBie(card)=='feng';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.xiangSiBing.filterCard(card);
                    });
				},
                ai:{
                    order:3.2,
                }
            },
            jiDuZhuiFang:{
                usable:1,
                trigger: { player:['faShuAfter','gongJiAfter'] },
                filter: function (event, player) {
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        filterTarget:function(card, player, target){
                            if(get.type(card)=='gongJi'){
                                return target.side!=player.side&&target.countCards('h')>player.countCards('h');
                            }
                        },
                        prompt:'嫉妒追訪：攻擊手牌數大於你的對手[攻擊行動]',
                    });
                },
                check:function(event,player){
                    var targets= game.filterPlayer(function(current){
                        return current.side!=player.side&&current.countCards('h')>player.countCards('h');
                    });
                    return targets.length>0;
                },
                ai:{
                    shuiJing:true
                }
            },
            

            //劍之子
            qingMu:{
                trigger: {global:'gameStart'},
                forced: true,
                filter: function (event, player) {
                    for(var current of game.players){
                        if(current.name1=='jianZhiMoNv') return true;
                    }
                    return false;
                },
                content: async function(event, trigger, player) {
                    player.tempBanSkill('jianShouShiYan','forever');
                    player.addSkill(['jianYingDuanNian','mengXiangJian']);
                }
            },
            fengZhiJian:{
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    if(event.yingZhan) return false;
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length<=0) return false;
                    if(event.card.hasDuYou('lieFengJi')&&event.target.hasJiChuXiaoGuo('_shengDun')) return true;
                    else if(event.card.hasDuYou('jiFengJi')) return true;
                    return false;
                },
                async cost(event, trigger, player) {
                    var zhanJi=get.zhanJi(player.side);
                    var list=[];
                    for(var i=0;i<zhanJi.length;i++){
                        list.push([zhanJi[i],get.translation(zhanJi[i])]);
                    }
                    var next=player.chooseButton([
                        `風之劍：是否移除我方【戰績區】1星石發動攻擊牌上劍聖獨有技`,
                        [list,'tdnodes'],
                    ]);
                    var result=await next.forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content: async function(event, trigger, player) {
                    await player.removeZhanJi(event.cost_data[0], 1);
                    if(trigger.card.hasDuYou('lieFengJi')){
                        player.logSkill('lieFengJi');
                        trigger.wuFaShengDun();
                        trigger.wuFaYingZhan();
                    }else if(trigger.card.hasDuYou('jiFengJi')){
                        player.logSkill('jiFengJi');
                        player.addGongJi();
                    }
                }
            },
            jianShouShiYan:{
                trigger: { global: "phaseAfter" },
                filter: function (event, player) {
                    return event.jianShouShiYan==true;
                },
                content: async function(event, trigger, player) {
                    var num=get.xingBei(true)+ get.xingBei(false)+1;
                    var cards=get.cards(num);
                    await player.discard(cards,'showHiddenCards');
                    var result=await player.chooseCardButton('劍守誓言：可以選擇1張牌加入手牌',cards).set('ai',function(button){
                        var player=_status.event.player;
                        if(player.countCards('h')>=player.getHandcardLimit()) return 0;
                        var card=button.link;
                        var value=get.value(card);
                        if(get.type(card)=='gongJi'&&get.mingGe(card)=='ji') value+=1;
                        if(value<6) return 0;
                        return value;
                    }).forResult();
                    if(result.bool){
                        game.log(player,'獲得了',result.links);
                        await player.gain(result.links);
                    }
                    var bool=false;
                    for(var card of cards){
                        if(get.type(card)=='faShu'){
                            bool=true;
                            break;
                        }
                    }
                    if(bool){
                        await player.addNengLiang('shuiJing',2);
                        player.insertPhase('jianShouShiYan');
                        player.addSkill('jianShouShiYan_huiHeKaiShi');
                        await player.reinitCharacter(player.name1,'fengZhiJianSheng');
                    }
                },
                group: ['jianShouShiYan_tiaoJian'],
                subSkill:{
                    shangHai:{
                        trigger: {source:'zaoChengShangHai'},
                        direct:true,
                        filter:function(event,player){
                            return event.faShu!=true;
                        },
                        content: async function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        }
                    },
                    huiHeKaiShi:{
                        trigger: { player: "phaseBegin" },
                        direct:true,
                        priority:0.1,
                        filter:function(event,player){
                            return event.skill=='jianShouShiYan';
                        },
                        content: async function(event, trigger, player) {
                            player.addTempSkill('jianShouShiYan_shangHai');
                            player.removeSkill('jianShouShiYan_huiHeKaiShi');
                        }
                    },
                    tiaoJian:{
                        trigger:{source:'gongJiMingZhong',global:'changeXingBeiEnd'},
                        direct:true,
                        filter:function(event,player,name){
                            if(name=='gongJiMingZhong'){
                                return event.yingZhan!=true;
                            }else if(name=='changeXingBeiEnd'){
                                return event.num>0;
                            }
                        },
                        content: async function(event, trigger, player) {
                            event.getParent('phase').jianShouShiYan=true;
                        }
                    }
                },
            },
            jianCanYing:{
                usable: 1,
                trigger: { player: "gongJiAfter" },
                filter: function (event, player) {
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();

                    var targets=await player.chooseTarget('劍殘影：選擇1名目標對手棄1張牌<br>你下次攻擊只能攻擊他',true,function(card, player, target) {
                        return target.side!=player.side;
                    }).set('ai', function (target) {
                        return target.countCards('h');
                    }).forResultTargets();
                    var target=targets[0];
                    await target.chooseToDiscard('h',1,'劍殘影：棄1張牌',true);
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        target:target,
                        filterTarget: function(card, player, target) {
                            if(get.type(card) =='gongJi'){
                                return target==_status.event.target;
                            }
                        },
                    });
                },
                ai:{
                    shuiJing:true,
                }
            },

            //魔弓EX
            shenFengShi:{
                inherit:'shanDianJian',
                filter:function(event){
                    return get.xiBie(event.card)=='feng';
                },
            },
            jiFengZhuiShe:{
                inherit:'guanChuanSheJi',
            },
            gongShenHouBu:{
                subSkill:{
                    shanGuangXianJing:{inherit:'shanGuangXianJing'},
                    jingZhunSheJi:{inherit:'jingZhunSheJi'}
                },
                group:['gongShenHouBu_shanGuangXianJing','gongShenHouBu_jingZhunSheJi'],
                trigger:{player:['logSkillBegin']},
                forced:true,
                filter:function(event,player){
                    return event.skill&&event.skill.startsWith('gongShenHouBu_');
                },
                content: async function(event,trigger,player){
                },
            }, 

            //聖仲裁者
            shenZhiTianPing:{
                trigger: {global:'gameStart'},
                forced: true,
                content: async function(event, trigger, player) {
                    player.addSkill('tianPing_you');
                    player.addSkill('tianPing_zuo');
                },
            },
            shanEBiJi:{
                usable:1,
                trigger: {global:'damageAfter'},
                filter: function (event, player) {
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    if(zuo_cards.length>=3&&you_cards.length>=3) return false;
                    return event.player.side==player.side&&event.shanEBiJi&&player.countCards('h',card=>lib.inpile.includes(card.name))>0;
                },
                async cost(event, trigger, player) {
                    var next= player.chooseCard('h',1,card=>lib.inpile.includes(card.name));
                    next.set('prompt',get.prompt('shanEBiJi'));
                    next.set('prompt2',lib.translate['shanEBiJi_info']);
                    next.set('ai', function (card) {
                        return 6-get.value(card);
                    });
                    event.result = await next.forResult();
                },
                content: async function(event, trigger, player) {
                    await player.lose(event.cards,ui.ordering);
                    await player.showCards(event.cards);

                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    if(zuo_cards.length>=3&&you_cards.length>=3) return;
                    else if(zuo_cards.length>=3&&you_cards.length<3) var position='you';
                    else if(zuo_cards.length<3&&you_cards.length>=3) var position='zuo';
                    else {
                        let dialog=['善惡必計：選擇1個位置將牌置於其上',[event.cards,'card']];
                        let list=['tianPingZuo','tianPingYou'];
                        let control=await player.chooseControl(list).set('dialog',dialog).set('ai',function(){
                            var player=_status.event.player;
                            var zuo_cards=player.getExpansions('tianPingZuo');
                            var you_cards=player.getExpansions('tianPingYou');
                            if(zuo_cards.length>=you_cards.length) return 'tianPingYou';
                            else return 'tianPingZuo';
                        }).forResultControl();
                        var position=control=='tianPingZuo'?'zuo':'you';
                    }
                    await lib.skill.tianPing.addPai(player,event.cards,position);
                    await player.draw();
                },
                group:'shanEBiJi_set',
                subSkill:{
                    set:{
                        trigger:{global:'chengShouShangHai'},
                        direct:true,
                        filter:function(event,player){
                            return event.player.side==player.side;
                        },
                        content: async function(event, trigger, player) {
                            trigger.shanEBiJi=true;
                        },
                    }
                }
            },
            tianPingQingDao:{
                forced:true,
                trigger:{player:['phaseBegin','phaseEnd']},
                filter:function(event,player){
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    return Math.abs(zuo_cards.length-you_cards.length)>1;
                },
                content: async function(event, trigger, player) {
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    if(zuo_cards.length>you_cards.length){
                        await player.discard(zuo_cards,'tianPing_zuo').set('sheQi',true);
                    }else{
                        await player.discard(you_cards,'tianPing_you').set('sheQi',true);
                    }
                    var cards=get.cards(4);
                    await player.showHiddenCards(cards);
                    var next=player.chooseCardButton(cards,2,true,'天平傾倒：選擇2張牌加入手牌');
                    next.set('ai', function (button) {
                        return get.value(button.link);
                    });
                    var cards=await next.forResultLinks();
                    await player.gain(cards,'gain2','log');

                    await player.addHong(1);

                    var targets=await player.chooseTarget('天平傾倒：選擇目標隊友+2[治療]',lib.filter.teammate,true).set('ai',function(target){
                        return get.zhiLiaoEffect(target,2);
                    }).forResultTargets();
                    var target=targets[0];
                    if(target) await target.changeZhiLiao(2);
                },
            },
            shenZhiShenPan:{
                trigger:{player:'phaseEnd'},
                filter:function(event,player){
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    return zuo_cards.length>2&&you_cards.length>2;
                },
                content: async function(event, trigger, player) {
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    await player.discard(zuo_cards,'tianPing_zuo').set('sheQi',true);
                    await player.discard(you_cards,'tianPing_you').set('sheQi',true);
                    var targets=await player.chooseTarget('神之審判：對2名目標對手各造成2點攻擊傷害③',2,lib.filter.opponent,true).set('ai',function(target){
                        return get.damageEffect2(target, _status.event.player, 2);
                    }).forResultTargets();
                    targets=targets.sortBySeat(player);
                    for(var target of targets){
                        await target.damage(2,player);
                    }
                },
            },
            tianPing:{
                addPai:async function(player,cards,position){
                    if(!cards||cards.length==0) return;
                    if(position!='zuo'&&position!='you') return;
                    //await player.lose(cards,ui.ordering);
                    //await player.showCards(cards);
                    var gaintag=['tianPing_'+position];
                    game.log(player,'將',cards,'置於',`【${position=='zuo'?'天平·左':'天平·右'}】`,`上`);
                    var next=player.addToExpansion(cards).set('gaintag',gaintag).set('log',false).set('position',position);
                    await next;
                },
                group: ['tianPing_fangZhi'],
                subSkill:{
                    zuo:{
                        mark:true,
                        intro:{
                            name:'天平·左',
                            content:'expansion',
                            markcount:'expansion',
                            mark:function(dialog,storage,player){
                                var cards=player.getExpansions('tianPing_zuo');
                                if(cards.length>0) dialog.addAuto(cards);
                                return `<span class='greentext'>[被動]罪滅之左</span><br>
                                    <span class='tiaoJian'>(每當本卡上的牌數增加，且增加後本卡上的牌數>1)</span>對(X-1)名目標對手造成1點攻擊傷害③，X為本卡上的牌數。<br>
                                    【天平·左】上的牌上限為3；達到上限則無法被再放置新牌。
                                    `;
                            },
                        },
                        markimage: 'image/card/zhuanShu/tianPing_zuo.png',
                        trigger:{player:'addToExpansionAfter'},
                        forced:true,
                        filter:function(event,player){
                            if(event.position!='zuo') return false;
                            return player.countExpansions('tianPing_zuo')>1;
                        },
                        content: async function(event, trigger, player) {
                            var cards=player.getExpansions('tianPing_zuo');
                            var num=cards.length-1;
                            var targets=await player.chooseTarget(`對${num}名目標對手造成1點攻擊傷害③`,lib.filter.opponent,true,num).set('ai',function(target){
                                return get.damageEffect2(target, _status.event.player, 1);
                            }).forResultTargets();
                            targets=targets.sortBySeat(player);
                            for(var target of targets){
                                await target.damage(1,player);
                            }
                        },
                    },
                    you:{
                        mark:true,
                        intro:{
                            name:'天平·右',
                            content:'expansion',
                            markcount:'expansion',
                            mark:function(dialog,storage,player){
                                var cards=player.getExpansions('tianPing_you');
                                if(cards.length>0) dialog.addAuto(cards);
                                return `<span class='greentext'>[被動]聖方之右</span><br>
                                    <span class='tiaoJian'>(每當本卡上的牌被棄掉且棄牌數>1)</span>你+1[治療]。<br>
                                    【天平·右】上的牌上限為3；達到上限則無法被再放置新牌。
                                    `;
                            },
                        },
                        markimage: 'image/card/zhuanShu/tianPing_you.png',
                        trigger:{player:'discard'},
                        forced:true,
                        filter:function(event,player){
                            if(event.gaiPai!='tianPing_you') return false;
                            return event.cards.length>1;
                        },
                        content: async function(event, trigger, player) {
                            await player.changeZhiLiao(1);
                        }
                    },
                    fangZhi:{
                        trigger:{player:'addToExpansionBefore'},
                        forced:true,
                        filter:function(event,player){
                            if(event.position!='zuo'&&event.position!='you') return false;
                            var newCard=event.cards[0];
                            var cards=player.getExpansions('tianPing_'+event.position);
                            for(var card of cards){
                                if(get.xiBie(card)!=get.xiBie(newCard)) return true;
                            }
                            return false;
                        },
                        content:async function(event, trigger, player) {
                            var position='tianPing_'+trigger.position;
                            var cards=player.getExpansions(position);
                            await player.discard(cards,position);
                            await player.addHong(1);
                        },
                    },
                },
            },
            tianZui:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.addHong(1);
                    await player.hengZhi();
                    player.addTempSkill('tianZui_gongJi','phaseEnd');
                },
                check:function(event,player){
                    if(!player.canGongJi()) return false;
                    if(player.countCards('h',card=>lib.inpile.includes(card.name))<3) return false;
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    return zuo_cards.length<=2||you_cards.length<=2;
                },
                group:['tianZui_chongZhi'],
                ai:{
                    shuiJing:true,
                },
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        priority:0.1,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content: async function(event, trigger, player) {
                            await player.chongZhi();
                        }
                    },
                    gongJi:{
                        trigger:{player:'gongJiMingZhong'},
                        filter:function(event,player){
                            if(event.yingZhan) return false;
                            var num=0;
                            var zuo_cards=player.getExpansions('tianPing_zuo');
                            var you_cards=player.getExpansions('tianPing_you');
                            if(zuo_cards.length<3) num++;
                            if(you_cards.length<3) num++;
                            if(num==0) return false;
                            return player.countCards('h',card=>lib.inpile.includes(card.name))>=num;
                        },
                        async cost(event, trigger, player){
                            var zuo_cards=player.getExpansions('tianPing_zuo');
                            var you_cards=player.getExpansions('tianPing_you');
                            var num=0;
                            if(zuo_cards.length<3) num++;
                            if(you_cards.length<3) num++;
                            var str=`是否將手牌中${num}張基本牌面朝上`;
                            if(num==2) str+='分別置於【天平·左】和【天平·右】上';
                            else if(zuo_cards.length<3) str+='置於【天平·左】上';
                            else if(you_cards.length<3) str+='置於【天平·右】上';

                            var next= player.chooseCard('h',num,card=>lib.inpile.includes(card.name));
                            next.set('prompt',get.prompt('tianZui'));
                            next.set('prompt2',str);
                            next.set('ai', function (card) {
                                return 6-get.value(card);
                            });
                            event.result = await next.forResult();
                        },
                        content: async function(event, trigger, player) {
                            await player.lose(event.cards,ui.ordering);
                            await player.showCards(event.cards);
                            var zuo_cards=player.getExpansions('tianPing_zuo');
                            var you_cards=player.getExpansions('tianPing_you');
                            if(zuo_cards.length<3&&you_cards.length<3&&event.cards.length==2){
                                var next=player.chooseToMove('天罪：安排2張牌在【天平·左】和【天平·右】上的位置');
                                next.set("list", [
                                    ["天平·左", [event.cards[0]]],
                                    ["天平·右", [event.cards[1]]],
                                ]);
                                next.set("filterMove", function (from, to, moved) {
                                    if (typeof to == "number") return false;
                                    return true;
                                });
                                var result=await next.forResult();

                                if(!result.moved){
                                    var zuo=event.cards[0];
                                    var you=event.cards[1];
                                }else{
                                    var zuo=result.moved[0];
                                    var you=result.moved[1];
                                }
                                await lib.skill.tianPing.addPai(player,zuo,'zuo');
                                await lib.skill.tianPing.addPai(player,you,'you');
                            }else{
                                if(zuo_cards.length<3) var position='zuo';
                                else if(you_cards.length<3) var position='you';
                                await lib.skill.tianPing.addPai(player,event.cards,position);
                            }
                        },
                    },
                },
            },
            zuiChiBiDao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                async content(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    player.addTempSkill('zuiChiBiDao_noHong','phaseAfter');
                    var num=player.countZhiShiWu('zui');
                    if(num>0) await player.removeHong(num);
                    else return;
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');

                    while((zuo_cards.length<3||you_cards.length<3)&&player.countCards('h',card=>lib.inpile.includes(card.name)>0)&&num>0){
                        let str=`罪遲比到：是否將手牌中1張基本牌面朝上放置到`;
                        str+='【天平·左】或【天平·右】上';
                        str+=`，剩餘${num}次`;

                        let list=[];
                        if(zuo_cards.length<3) list.push(['zuo','天平·左']);
                        if(you_cards.length<3) list.push(['you','天平·右']);

                        let dialog=[str,[player.getCards('h',card=>lib.inpile.includes(card.name)),'card'],[list,'tdnodes']];
                        let next=player.chooseButton(
                            dialog,
                            true,
                            true,
                            2,
                            function(button){
                                var link=button.link;
                                var player=_status.event.player;
                                if(typeof link=='string'){
                                    if(link=='zuo') return 5- player.getExpansions('tianPing_zuo').length;
                                    else return 5- player.getExpansions('tianPing_you').length;
                                }else if(get.itemtype(link)=='card'){
                                    return 8-get.value(link);
                                }
                                return 0.1;
                            },
                            function(button,player){
                                if(ui.selected.buttons.length==0) return true;
                                var link=button.link;
                                var old=ui.selected.buttons[0].link;
                                return typeof link!=typeof old;
                            },
                        );
                        let links=await next.forResultLinks();
                        let pos,card;
                        for(let link of links){
                            if(typeof link=='string') pos=link;
                            else if(get.itemtype(link)=='card') card=link;
                        }
                        if(pos&&card) await lib.skill.tianPing.addPai(player,[card],pos);
                        num--;
                        var zuo_cards=player.getExpansions('tianPing_zuo');
                        var you_cards=player.getExpansions('tianPing_you');
                    }
                },
                ai:{
                    order:function(item, player){
                        if(player.isHengZhi()) return 0;
                        if(player.countCards('h',card=>lib.inpile.includes(card.name))<=1) return 0;
                        return 1.2+player.countZhiShiWu('zui');
                    },
                    shuiJing:true,
                },
                subSkill:{
                    noHong:{
                        trigger:{player:'changeZhiShiWuBegin'},
                        direct:true,
                        filter:function(event,player){
                            return event.num>0&&event.zhiShiWu=='zui';
                        },
                        content:function(){
                            trigger.cancel();
                        },
                    }
                },
            },
            zui:{
                intro: {
                    max:3,
                    content:'mark',
                },
                onremove: "storage",
                markimage: 'image/card/zhiShiWu/hong.png',
            },
        },
        
        translate:{
            //角色名字
            trick: "trick",
            shiTu: "師徒",
			jianZhiMoNv:"劍之魔女",
            jieRiMoDao:"節日魔導",
            tanLanShaoNv:"貪婪少女",
            lingXiZhiChao: "靈熙之潮",
            youJiShi: "游擊士",
            nong_baoShiShaoNv: "農暴食少女",
            nong_baoShiShaoNv_prefix: "農",
            zhouFuShi: "咒符師",
            yuanChuZhiGong: "原初之弓",
            daoDanLuoLi: "搗蛋蘿莉",
            trick_shengGong:"trick聖弓",
            trick_shengGong_prefix: "trick",
            trick_maoXianJia:"trick冒險家",
            trick_maoXianJia_prefix: "trick",
            luoLiFanZhang: "蘿莉番長",
            jianXiZhiPian: "見習製片",
            daiDuoShaoNv: "怠惰少女",
            jiDuShaoNv: "嫉妒少女",
            jianZhiZi:'劍之子',
            moGongEX: "魔弓EX",
            sheng_zhongCaiZhe:'聖仲裁者',

            jianZhiMoNv_name:"席拉",
            lingXiZhiChao_name: "濯香姬",
            youJiShi_name: "索拉",
            zhouFuShi_name: "鈴音",
            daoDanLuoLi_name: "蘿綺",
            luoLiFanZhang_name: "檸歌",
            jianXiZhiPian_name: "惕惕子",
            sheng_zhongCaiZhe_name: "恩布拉",

            //技能
            //劍之魔女
            jiZhiJianYi: "[響應]技之劍意",
            jiZhiJianYi_info: "<span class='tiaoJian'>([攻擊行動]結束時發動)</span>額外+1技類[攻擊行動]。",

            yiXiangJian: "[響應]臆想劍[回合限定]",
            yiXiangJian_info: "<span class='tiaoJian'>(主動攻擊命中時發動②)</span>攻擊目標棄1張牌[強制][展示]。若為攻擊牌，你可以獲得該牌，額外+1[攻擊行動]。(若為法術牌)，本次攻擊傷害+2。",

            mengXiangJian: "[被動]夢想劍",
            mengXiangJian_info: "<span class='tiaoJian'>(本回合第一次[攻擊行動]後)</span>回合內你的主動攻擊無視【聖盾】。<span class='tiaoJian'>(本回合第二次[攻擊行動]後)</span>回合內你的主動攻擊對方無法應戰。<span class='tiaoJian'>(本回合第四次[攻擊行動]後)</span>回合內你的主動攻擊強制命中。",

            jianYingDuanNian: "[響應]劍影*斷念[回合限定]",
            jianYingDuanNian_info: "[寶石]<span class='tiaoJian'>([攻擊行動]結束時發動)</span>棄2張牌，摸1張牌[強制]，額外+1攻擊行動。",
            
            //節日魔導
            jiRi_moBaoChongJie:"[法術]魔爆衝擊",
            jiRi_moBaoChongJie_info:"<span class='tiaoJian'>(棄1張法術牌[展示])</span>我方【戰績區】+1【寶石】。目標對手棄1張法術牌[展示]，若他不如此做，你對他造成2點法術傷害③。",
            faLiHuDun:"[響應]法力護盾",
            faLiHuDun_info:"<span class='tiaoJian'>(任何人對你造成傷害時發動③)</span>棄X張法術牌[展示]。",

            //貪婪少女
            tanYuHeiDong:"[法術]貪慾黑洞[回合限定]",
            tanYuHeiDong_info:"<span class='tiaoJian'>(棄1張法術牌[展示])</span>我方戰績區+1[水晶]。目標對手棄1張法術牌[展示]；若他不如此做，你對其造成2點法術傷害③，你+1[法術行動]。本回合你無法發動【亡女的金庫】。",
            lianJinMoFa:"[響應]殮金魔法",
            lianJinMoFa_info:"<span class='tiaoJian'>(你使用【魔彈】造成傷害後發動⑥)</span>我方戰績區+1[水晶]。",
            lianJinShu:"[響應]鍊金術",
            lianJinShu_info:"你的雷系或火系牌可以當【魔彈】使用。",
            wangNvJinKu:"[法術]亡女的金庫",
            wangNvJinKu_info:"[水晶]對2名目標對手各造成1點法術傷害③。<span class='tiaoJian'>(若你額外移除【戰績區】所有星石)</span>每移除2星石，傷害+1；<span class='tiaoJian'>(若本次移除的星石中[寶石]>1，傷害結算完成後)將對方1點士氣轉移給我方。",

            // 靈熙之潮
            lingZhiZhiYi: "[被動]靈枝旨意",
            lingZhiZhiYi_info: "你無法成為基礎效果的目標。",
            xieLingTuiSan: "[響應]邪靈退散",
            xieLingTuiSan_info: "<span class='tiaoJian'>(你放置基礎效果後)</span>對目標對手造成1點法術傷害③。",
            banXiangHunLing: "[響應]伴響魂靈[回合限定]",
            banXiangHunLing_info:
                "<span class='tiaoJian'>(你回合內目標對手承受你造成的傷害而導致士氣下降時)</span>對除他外所有目標對手各造成1點法術傷害③。",
            boYongZhiLi: "[被動]波湧之力",
            boYongZhiLi_info: "<span class='tiaoJian'>(目標角色觸發基礎效果並結算完成後)</span>你+1<span class='hong'>【靈湧】</span>。",
            nuChaoHuangTao: "[被動]怒潮荒濤",
            nuChaoHuangTao_info:
                "<span class='tiaoJian'>(你的回合結束時，若</span><span class='hong'>【靈湧】</span><span class='tiaoJian'>已達到上限)</span>移除所有<span class='hong'>【靈湧】</span>，對4名目標角色各造成1點法術傷害③；<span class='tiaoJian'>(若目標角色擁有X個基礎效果)</span>本次對他的法術傷害額外+X點。",
            haiShenYuWu: "[法術]海神御巫",
            haiShenYuWu_info: "[水晶](使用一張封印師或祈禱師的獨有技)你棄一張牌。",
            lingYong: "靈湧",
            lingYong_info: "<span class='hong'>【靈湧】</span>為靈熙之潮專有的指示物，上限為4。",

            // 游擊士
            jingLingZengLi: "[被動]精靈贈禮",
            jingLingZengLi_info: "遊戲初始時, 將牌庫頂6張牌牌面朝下放置於你的角色旁，作為【子彈】。",
            "yuanSuSheJi*sora": "[響應]元素射擊*SORA",
            "yuanSuSheJi*sora_info":
                "<span class='tiaoJian'>(主動攻擊時①,移除1個子彈)</span>根據【子彈】系別附加以下效果：<br>【火系】：本次攻擊傷害額外+1。<br>【水系】：<span class='tiaoJian'>(主動攻擊命中時②)</span>目標角色+1[治療]。<br>【風系】：<span class='tiaoJian'>([攻擊行動]結束後)</span>額外+1[攻擊行動]。<br>【雷系】：本次攻擊無法應戰。<br>【地系】：<span class='tiaoJian'>(主動攻擊命中時②)</span>對目標角色造成1點法術傷害③。<br>【光系或暗系】：視為任一系別的【子彈】。",
            'yuanSuSheJi*sora_huo':'火之彈',
            'yuanSuSheJi*sora_feng':'風之彈',
            'yuanSuSheJi*sora_lei':'雷之彈',
            'yuanSuSheJi*sora_shui':'水之彈',
            'yuanSuSheJi*sora_di':'地之彈',
            erChongJianYing: "[響應]二重劍影[回合限定]",
            erChongJianYing_info: "<span class='tiaoJian'>([攻擊行動]結束時，若本次攻擊命中②)</span>額外加1系別相同的[攻擊行動]。",
            fuMoZhiShu: "[響應]附魔之術",
            fuMoZhiShu_info:
                "<span class='tiaoJian'>(你執行【提煉】時，若你未擁有【子彈】)</span>消耗你提煉的1能量，將1張手牌面朝下置於你的角色旁，作為【子彈】。",
            jingLingDeJianWu: "[響應]精靈的劍舞",
            jingLingDeJianWu_info: "[水晶]<span class='tiaoJian'>(主動攻擊前①)</span>本次你的攻擊牌系別視為風系。",
            ziDan: "子彈",
            ziDan_info: "【子彈】為游擊士專有蓋牌，上限為6。",

            // 暴食少女
            tianDianChongJi: "[法術]甜點衝擊",
            tianDianChongJi_info:
                "<span class='tiaoJian'>(棄1張法術牌[展示])</span>我方【戰績區】+1[寶石]。2名目標對手各棄1張法術牌，每有人不如此做，你對他造成2點法術傷害③、你棄1張牌。",
            shiYuDeHeiDong: "[響應]食慾的黑洞",
            shiYuDeHeiDong_info: "<span class='tiaoJian'>(當我方承受傷害時⑥，你棄1張【魔彈】[展示])</span>改由你承受此傷害。你不會因此造成士氣下降。",
            meiWeiRongHe: "[響應]美味融合",
            meiWeiRongHe_info: "你的水系或火系牌可以當[魔彈]傳遞。",
            sanMiaoYuanZe: "[響應]三秒原則",
            sanMiaoYuanZe_info: "<span class='tiaoJian'>(目標隊友手牌或蓋牌中的【魔彈】正面朝上進入棄牌前)</span>你棄1張牌，你獲得該【魔彈】[強制]。<span class='tiaoJian'>(因機制問題，無法完全符合faq)</span>",
            meiShiFengBao: "[法術]美食風暴",
            meiShiFengBao_info: "[寶石]對2名目標對手各造成2點法術傷害③。",

            // 咒符師
            zhouFuHuoLi: "[法術]咒符-火璃",
            zhouFuHuoLi_info: "<span class='tiaoJian'>(棄1張火系牌①)</span>對1名目標角色造成1點法術傷害③，你摸1張牌，棄1張牌。",
            zhouFuDongTian: "[法術]咒符-凍天",
            zhouFuDongTian_info: "<span class='tiaoJian'>(棄1張水系牌①)</span>指定1名目標角色棄1張牌，將除你外1名目標角色的1[治療]轉移給你。",
            zhouFu_nianZhou: "[響應]唸咒",
            zhouFu_nianZhou_info: "每當你發動【咒符】，可將自己的1張手牌面朝下放置在你的角色旁，作為【妖力】。",
            chiMeiWangLiang: "[響應]魑魅魍魎",
            chiMeiWangLiang_info:
                "<span class='tiaoJian'>(主動攻擊命中後發動②，移除1個【妖力】)</span>視為無條件發動一次【咒符-火璃】或【咒符-凍天】，但無法發動唸咒；(若【妖力】為地系牌，可展示之[展示])該次【火璃】的傷害或【凍天】的棄牌效果+1。",
            zhouLiChongSu: "[響應]咒力重塑",
            zhouLiChongSu_info: "[水晶]<span class='tiaoJian'>(發動【咒符-火璃】或【咒符-凍天】時發動)</span>將“1名目標角色”改為“2名目標角色”。",
            zhouFu_yaoLi: "妖力",
            zhouFu_yaoLi_info: "【妖力】為咒符師專有蓋牌，上限為2；若【妖力】達到上限，則不能發動【唸咒】。",

            // 原初之弓
            yuanChu_tianZhiGong: "[被動]天之弓",
            yuanChu_tianZhiGong_info: "遊戲初始時，你擁有【聖煌輝光炮】，你的[治療]上限+1。<span class='tiaoJian'>(主動攻擊時，若攻擊牌不為聖類命格)</span>本次攻擊傷害-1；<span class='tiaoJian'>(攻擊命中時②，若攻擊牌為聖類命格)</span>你+1<span class='hong'>【信仰】</span>。",
            yuanChu_shengXieJuBao: "[法術]聖屑颶暴",
            yuanChu_shengXieJuBao_info:"<span class='tiaoJian'>(棄2張同系牌[展示])</span>視為一次聖類命格的該系主動攻擊；<span class='tiaoJian'>(若該棄牌為【聖光】)</span>則視為一次聖類命格的暗系主動攻擊； <span class='tiaoJian'>(若攻擊未命中②，移除X點[治療]，X最高為2)</span>目標隊友棄X張牌。",
            yuanChu_shengHuangJiangLin: "[法術]聖煌降臨[持續]",
            yuanChu_shengHuangJiangLin_backup:'[法術]聖煌降臨[持續]',
            yuanChu_shengHuangJiangLin_info: "<span class='tiaoJian'>(移除你的2個[治療]或2點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>)</span>[橫置]，轉為【聖煌形態】，額外+1[法術行動]。此形態下，你若執行【特殊行動】，則[重置]脫離【聖煌形態】並+1[治療]。",
            yuanChu_shengGuangBaoLie: "[法術]聖光爆裂",
            yuanChu_shengGuangBaoLie_backup:'[法術]聖光爆裂',
            yuanChu_shengGuangBaoLie_info:"<span class='tiaoJian'>(僅【聖煌形態】下可發動)</span>你選擇以下一項發動：<br>·<span class='tiaoJian'>(移除你的1[治療])</span>摸1張牌[強制]，對手牌數小於你的目標對手造成2點攻擊傷害，你+1<span class='hong'>【信仰】</span>。 <br>·<span class='tiaoJian'>(移除你的X[治療]，選擇最多X名手牌數不大於你手牌數-X的對手)</span>你棄X張牌，然後對他們各造成(Y+2)點攻擊傷害， Y為目標數中擁有[治療]的人數，你+X<span class='hong'>【信仰】</span>。",
            yuanChu_shengHuangHuiGuangPao: "(專)[法術]聖煌輝光炮",
            yuanChu_shengHuangHuiGuangPao_info: "<span class='tiaoJian'>(僅【聖煌形態】下可發動，移除4點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然後移除等同我方落後[士氣]的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>數)</span>所有角色將手牌調整為4張，我方【星杯區】+1[星杯]，然後將一方[士氣]調整與另一方相同，我方所有角色各+1[治療]，你額外+1[攻擊行動]或[法術行動]並將【聖煌輝光炮】翻面。",
            yuanChu_shengHuangYuHui: "(專)[法術]聖煌餘輝",
            yuanChu_shengHuangYuHui_info: "<span class='tiaoJian'>(僅【聖煌形態】下可發動，移除4點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然後移除等同我方落後[士氣]的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>數)</span>所有角色將手牌調整為4張，我方【星杯區】+1[星杯]，然後將一方[士氣]調整與另一方相同，然後移除【聖煌餘輝】。",
            yuanChu_xinYang: "信仰",
            yuanChu_xinYang_info: "<span class='hong'>【信仰】</span>為原初之弓專有的指示物，上限為10。",

            // 搗蛋蘿莉
            'tianShi?': "[響應]天使？",
            'tianShi?_info': "你可將有【天使之牆】的基礎牌作為【聖盾】使用。",
            panNiZhiQiang: "[法術]叛逆之牆",
            panNiZhiQiang_info: "<span class='tiaoJian'>(將手牌的1個【聖盾】[展示]與場上的1個基礎效果交換)</span>你棄1張牌。",
            shenMiFuBi: "[被動]神秘伏筆",
            shenMiFuBi_info: "<span class='tiaoJian'>([法術行動]結束後)</span>將牌庫頂1-2張牌面朝下放置於X名目標角色面前，視為基礎效果【Tricky】。",
            tricky_xiaoGuo: "Tricky",
            "T-r-i-c-k-y!": "[響應]T-r-i-c-k-y!",
            'T-r-i-c-k-y!_info':
                "<span class='tiaoJian'>(主動攻擊未命中時發動②)</span>查看1個【Tricky】。(若你移除該【Tricky】並額外棄1張同系牌)對原擁有該【Tricky】的目標角色造成2點法術傷害③。",
            trickOrTreat: "[被動]Trick or Treat",
            trickOrTreat_info:
                "<span class='tiaoJian'>(你的行動階段結束時,若場上存在的【Tricky】>4,展示所有【Tricky】)</span>所有人各棄1張與面前【Tricky】同系的牌，然後移除所有【Tricky】。（每有人不如此做）你對他造成2點法術傷害③。<span class='tiaoJian'>(若我方對應【Tricky】棄牌>對方)</span>我方【戰績區】+1[水晶]且你+1[水晶]，或你棄1張牌並額外獲得一個回合；<span class='tiaoJian'>(若我方對應【Tricky】棄牌<對方)</span>對方【戰績區】+1[寶石]。",
            suprise: "[法術]Surprise!",
            suprise_info:
                "[水晶]<span class='tiaoJian'>(你棄1張牌)</span>本回合結束前你的手牌上限+5， 將場上所有【Tricky】加入手牌，然後將X張手牌面朝下放置於X名目標角色面前，視為基礎效果【Tricky】。",

            // trick聖弓
            trick_tianZhiGong:"[被動]天之弓",
            trick_tianZhiGong_info:"遊戲初始時，你+2[寶石]。你的[治療]上限+1。<span class='tiaoJian'>（主動攻擊時①，若該次攻擊不為聖類命格）</span>本次攻擊傷害-1；<span class='tiaoJian'>（主動攻擊命中時②，若該次攻擊為聖類命格）</span>你+1【信仰】。",
            trick_shengHuangJiangLin:"[法術]聖煌降臨[持續]",
            trick_shengHuangJiangLin_backup:"[法術]聖煌降臨[持續]",
            trick_shengHuangJiangLin_info:"<span class='tiaoJian'>(移除你的2點[治療]或2點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>)</span>[橫置]，轉為【聖煌形態】，額外+1[法術行動]。此形態下，你若執行【特殊行動】，則[重置]脫離【聖煌形態】並+1[治療]。",
            trick_shengGuangBaoLie:"[法術]聖光爆裂",
            trick_shengGuangBaoLie_backup:"[法術]聖光爆裂",
            trick_shengGuangBaoLie_info:"<span class='tiaoJian'>(僅【聖煌形態】下可發動)</span>你選擇以下一項發動：<br>·移除你的1點[治療]，摸1張牌[強制]，你+1<span class='hong'>【信仰】</span>，目標隊友+1[治療]。 <br>·<span class='tiaoJian'>(移除你的X[治療]，選擇最多X名手牌數不大於你手牌數-X的對手)</span>你棄X張牌，然後對他們各造成(Y+2)點攻擊傷害。 Y為目標數中擁有[治療]的人數。",
            trick_shengHuangHuiGuangPao:"[法術]聖煌輝光炮",
            trick_shengHuangHuiGuangPao_info:"<span class='tiaoJian'>(僅【聖煌形態】下可發動，移除1點</span><span class='lan'>【聖煌輝光炮】</span><span class='tiaoJian'>，移除4點</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，並額外移除等同我方落後士氣的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>數)</span>所有角色將手牌調整為4張，我方【星杯區】+1[星杯]，然後將一方[士氣]調整與另一方相同，我方所有角色各+1[治療]。",
            trick_ziDongTianChong:"[被動]自動填充",
            trick_ziDongTianChong_info:"<span class='tiaoJian'>(你的回合結束時，若你未執行【特殊行動】)</span>你選擇以下一項發動：<br>·[水晶]你+1<span class='hong'>【信仰】</span>或+1[治療]，然後+1<span class='lan'>【聖煌輝光炮】</span>。 <br>·[寶石]你+2<span class='hong'>【信仰】</span>或目標角色+2[治療]。",

            // trick冒險家
            trick_qiZha:"[響應]欺詐",
            trick_qiZha_info:"<span class='tiaoJian'>(棄2張同系牌[展示])</span>視為一次除暗系以外的任意系的主動攻擊，該系由你決定",
            trick_maoXianJiaTianTang:"[響應]冒險者天堂",
            trick_maoXianJiaTianTang_backup:"[響應]冒險者天堂",
            trick_maoXianJiaTianTang_info:"<span class='tiaoJian'>(你執行【提煉】時，移除自身X[能量])</span>額外提煉X[水晶]，然後將提煉出的[寶石]和[水晶]全部交給目標隊友。",

            // 蘿莉番長
            xuanHuaShangDeng: "[被動]喧譁上等",
            xuanHuaShangDeng_info:
                "<span class='tiaoJian'>(攻擊命中時②)</span>持續移除牌庫頂牌[展示]，直到移除的牌非血類命格或非法術牌，或累積移除三張牌。本次攻擊傷害額外+X，X為此法移除的牌庫頂牌數。",
            yeLuSiKu: "[響應]夜露死苦",
            yeLuSiKu_xueYingKuangDao: "[響應]血影狂刀",
            yeLuSiKu_xueXingPaoXiao: "[響應]血腥咆哮",
            yeLuSiKu_info: `你可以使用狂戰士的獨有技。<br>
                <span class="greentext">(獨)[響應]血影狂刀</span><br>
                <span class='tiaoJian'>(作為主動攻擊打出時發動)</span><br>·若命中手牌為2的對手②，本次攻擊傷害額外+2；<br>·若命中手牌為3的對手②，本次攻擊傷害額外+1。<br>
                <span class="greentext">(獨)[響應]血腥咆哮</span><br>
                <span class="tiaoJian">(作為主動攻擊打出時發動)</span>若攻擊的目標擁有的[治療]為2，則本次攻擊強制命中。
            `,
            aiSiTianLiu: "[被動]愛死天流",
            aiSiTianLiu_info:
                "<span class='tiaoJian'>(你發動【血腥咆哮】時)</span>“若攻擊的目標擁有的[治療]為2，則本次攻擊強制命中”改為“若攻擊的目標擁有[治療]，則本次攻擊無法用【暗滅】應戰或使用【聖光】抵擋”。",
            mieChaKuCha: "[響應]滅茶苦茶",
            mieChaKuCha_info:
                "<span class='tiaoJian'>(攻擊命中後發動②)</span>選擇以下一項：<br>[寶石]本次攻擊傷害額外+2。<br>[水晶]本次攻擊傷害額外+1。",
            
            // 見習製片
            yuanZiXiShou: "[響應]元子吸收",
            yuanZiXiShou_info: `<span class="tiaoJian">(對目標角色造成法術傷害時發動③)</span>你+1<span class="hong">【元子】</span>。`,
            yuanZiChongSu: "[法術]元子重塑",
            yuanZiChongSu_info: "<span class='tiaoJian'>(移除2點【元子】)</span>你棄X張牌，摸X張牌（X<4），額外+1[法術行動]。",
            yuanSuXueTu: "[響應]元素學徒",
            yuanSuXueTu_bingDong: "[法術]冰凍",
            yuanSuXueTu_yunShi: "[法術]隕石",
            yuanSuXueTu_huoQou: "[法術]火球",
            yuanSuXueTu_fengRen: "[法術]風刃",
            yuanSuXueTu_leiJi: "[法術]雷擊",
            yuanSuXueTu_info: "你可以使用元素師的獨有技。",
            leiJiBianYi: "[被動]雷擊變異",
            leiJiBianYi_info: "<span class='tiaoJian'>(你發動【雷擊】時)</span>將“我方【戰績區】+1[寶石]”改為“你+1<span class='hong'>【元子】</span>”",
            yueYun: "[法術]月隕",
            yueYun_info: "[寶石]對目標角色造成(X+1)點法術傷害③，X為你剩餘的【能量】數。",
            yuanZi: "元子",
            yuanZi_info: "<span class='hong'>【元子】</span>為見習製片專有的指示物，上限為3。",

            //怠惰少女
            bieFanWo:"[法術]別煩我……",
            bieFanWo_info:"<span class='tiaoJian'>(你右手邊最近的隊友隨機丟棄你1張手牌並指定目標對手摸1張牌[強制])</span>我方【戰績區】+1[水晶]，該對手棄1張法術牌[展示]；<span class='tiaoJian'>(若該對手不如此做)</span>他摸1張牌[強制]，你右手邊最近的隊友+1[治療]。",
            rangWoTangPing:"[響應]讓我躺平",
            rangWoTangPing_info:"<span class='tiaoJian'>(你的回合開始時，若你手牌>3)</span>目標隊友+1[治療]，然後跳過你的行動階段。",
            xiangYongMoDan:"[響應]想用魔彈",
            xiangYongMoDan_info:"<span class='tiaoJian'>(你需要使用魔彈時，棄2張同系牌[展示])</span>視為使用【魔彈】。",
            buXiangTiLian:"[被動]不想提煉",
            buXiangTiLian_info:"你無法執行【提煉】。<span class='tiaoJian'>(目標隊友指定【提煉】時)</span>你+1[寶石]，移除我方【戰績區】1星石",
            zaiShuiYiXia:"[被動]再睡一下",
            zaiShuiYiXia_info:"[寶石]<span class='tiaoJian'>(你跳過行動階段後強制觸發[強制])</span>棄1張牌，所有隊友各+1[治療]。<span class='tiaoJian'>(若如此導致有隊友[治療]溢出)</span>我方+1【士氣】。",

            //嫉妒少女
            cuYiXiuXin: "[響應]醋意羞心",
            cuYiXiuXin_info: "<span class='tiaoJian'>(主動攻擊未命中時②)</span>目標角色棄1張法術牌[展示]；<span class='tiaoJian'>(若他不如此做)</span>你對他造成2點法術傷害③，我方【戰績區】+1[水晶]。",
            xuRongZhangWo:"[響應]虛榮掌握",
            xuRongZhangWo_info: "<span class='tiaoJian'>(主動攻擊命中時②)</span>額外+1[法術行動]，本次法術行動只能使用【魔彈】且可以選擇逆向傳遞。",
            xiangSiBing:"[響應]相思病",
            xiangSiBing_info:"你的地系牌或風系牌可以當【魔彈】使用。",
            jiDuZhuiFang:"[響應]嫉妒追放[回合限定]",
            jiDuZhuiFang_info:"[水晶]<span class='tiaoJian'>([攻擊行動]或[法術行動]後)</span>額外+1[攻擊行動]，本次攻擊行動只能攻擊手牌數大於你的目標對手。",

            //劍之子
            qingMu:"[被動]傾慕",
            qingMu_info:"<span class='tiaoJian'>(若【劍之魔女】在場)</span>你無法發動【劍守誓言】，你獲得【劍之魔女】的【劍影*斷念】、【夢想劍】。",
            fengZhiJian:"[響應]風之劍",
            fengZhiJian_info:"<span class='tiaoJian'>(你使用技類命格牌作為主動攻擊打出時，移除我方【戰績區】1星石)</span>視為你發動該牌上的劍聖的獨有技。",
            jianShouShiYan:"[響應]劍守誓言",
            jianShouShiYan_info:"<span class='tiaoJian'>(你有主動攻擊命中②或任意一方【星杯區】星杯數增加的回合結束後)</span>棄置牌堆頂(X+1)張牌[展示]，X為雙方【星杯區】星杯數之和，你可選擇其中1張加入你手牌。<span class='tiaoJian'>(若棄牌中有法術牌)</span>你+2[水晶]，立即執行1個你的額外回合，該回合你的攻擊傷害額外+1，永久將你的角色卡替換為【風之劍聖】。",
            jianCanYing:"[響應]劍殘影[回合限定]",
            jianCanYing_info:"[水晶]<span class='tiaoJian'>([攻擊行動]結束後發動)</span>目標對手棄1張牌，額外+1[攻擊行動]。本回合你的下次主動攻擊只能攻擊該目標對手。",

            //魔弓EX
            shenFengShi:"[被動]神風矢",
            shenFengShi_info:"你的風系攻擊牌對手無法應戰",
            jiFengZhuiShe:"[被動]疾風追射",
            //jiFengZhuiShe_info:"",
            gongShenHouBu:"[被動]弓神候補",
            gongShenHouBu_info:`你可以使用神箭手的獨有技。<br>
                <span class="greentext">(獨)[法術]閃光陷阱</span><br>
                對目標角色造成2點法術傷害③。<br>
                <span class="greentext">(獨)[響應]精準射擊</span><br>
                此攻擊強制命中，但本次攻擊傷害-1。`,
            gongShenHouBu_jingZhunSheJi:"[響應]精準射擊",
            gongShenHouBu_shanGuangXianJing:"[法術]閃光陷阱",

            //聖仲裁者
            shenZhiTianPing:"[被動]神之天平",
            shenZhiTianPing_info:"遊戲初始時你擁有【天平·左】與【天平·右】。",
            shanEBiJi:"[響應]善惡必計",
            shanEBiJi_info:"[回合限定]<span class='tiaoJian'>(我方角色承受傷害⑥並結算完畢後，你將手牌中1張基礎牌面朝上[展示]放到【天平·左】或【天平·右】上)</span>你摸1張牌[強制]。",
            tianPingQingDao:"[被動]天平傾倒",
            tianPingQingDao_info:"<span class='tiaoJian'>(你的回合開始時或你的回合結束時，若【天平·左】和【天平·右】上的牌差>1，捨棄牌數多的一方上所有牌)</span>展示牌堆頂4張牌[展示]，你將其中2張加入手牌[強制]並棄掉另外2張牌，你+1<span class='hong'>【罪】</span>，然後目標隊友+2[治療]。",
            shenZhiShenPan:"[響應]神之審判",
            shenZhiShenPan_info:"<span class='tiaoJian'>(你的回合結束時，若【天平·左】和【天平·右】上的牌數都>2)</span>捨棄【天平·左】與【天平·右】上的所有牌，然後對2名目標角色各造成2點攻擊傷害③。",
            tianPing:"(專)天平",
            tianPingZuo:"天平·左",
            tianPingYou:"天平·右",
            tianPing_zuo:"[被動]罪滅之左",
            tianPing_you:"[被動]聖方之右",
            tianPing_fangZhi:"[被動]替罪羔羊",
            tianPing_info:`
            【天平·左】/【天平·右】上的牌上限為3；達到上限則無法被再放置新牌。<br>
            (天平共有技能)<span class='greentext'>[被動]替罪羔羊</span><br>
            <span class='tiaoJian'>(每當有新牌將被放置在本卡上時，若該卡與本卡上的牌不同系)</span>移除本卡上所有卡，你+1<span class='hong'>【罪】</span>。<br>
            (天平·左)<span class='greentext'>[被動]罪滅之左</span><br>
            <span class='tiaoJian'>(每當本卡上的牌數增加，且增加後本卡上的牌數>1)</span>對(X-1)名目標對手造成1點攻擊傷害③，X為本卡上的牌數。<br>
            (天平·右)<span class='greentext'>[被動]聖方之右</span><br>
            <span class='tiaoJian'>(每當本卡上的牌被移除且移除牌數>1)</span>你+1[治療]。
            `,
            tianZui:"[啟動]天罪", 
            tianZui_info:"[水晶]你+1<span class='hong'>【罪】</span>。[橫置]持續到本回合結束時，你主動攻擊命中時②，可將手牌中2張基本牌面朝上[展示]分別放到【天平·左】和【天平·右】上。【天罪】的效果結束時[重置]。",
            zuiChiBiDao:"[法術]罪遲必到",
            zuiChiBiDao_info:"[水晶]本回合你無法獲得<span class='hong'>【罪】</span>。<span class='tiaoJian'>(你移除所有</span><span class='hong'>【罪】</span><span class='tiaoJian'>)</span>你可將手牌中X張基本牌面朝上[展示]依次放到【天平·左】或【天平·右】上，X為移除的<span class='hong'>【罪】</span>數量",
            zui:'罪',
            zui_info:"<span class='hong'>【罪】</span>為仲裁者專有指示物，上限為3。",
        },
    };
});
