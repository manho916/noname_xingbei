import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenZiChuangLin',
		connect:true,
        characterSort:{
            shenZiChuangLin:{
                "3xing":['jinGuiZhiNv'],
                "3.5xing":[],
                "4xing":['shenMiXueZhe','ranWuZhe'],
                "4.5xing":[],
                '5xing':['nvPuZhang','jieJieShi','shiShenZhe'],
            }
        },
		character:{
            jinGuiZhiNv:['jinGuiZhiNv_name','yongGroup',3,['gaoLingZhiHua','moFaRuMen','Magic','qiangYuYuanXing','youQingJiBan'],],
            nvPuZhang:['nvPuZhang_name','jiGroup',5,['yingZhiXue','miShuMuYing','shun','yingFeng','shiFengZhiDao','jinShu','fengXue','zhen','ying','mi'],],
            jieJieShi:['jieJieShi_name','huanGroup',5,['jieJieYiShi','huangShenZhiLi','huangShenJiYi','jinMoJing','liuLiJing','jueJie','fuMoJing','jieJie','jiX'],],
            shenMiXueZhe:['shenMiXueZhe_name','yongGroup',4,['yanLingShu','shouHuLing','zhenYanShu','jinJiMiFa','yaoJingMiShu','zhenYanYaZhi','yanLing','miShu'],],
            ranWuZhe:['ranWuZhe_name','xueGroup',4,['shenQiZhiYi','liRuQuanYong','kuangLiZhiXin','kuangLiZhiTi','shenZhiWuRan','niuQuZhiAi','liQi'],],
            shiShenZhe: ["shiShenZhe_name","xueGroup",5,["yuRen","qinKe","shiMie","shangMie","tongDiao","ren","gongZhen","zhuShenZhongYan"]],
		},
        characterIntro:{
            jinGuiZhiNv:`身為一位魔法的初學者，艾麗卡施法總是讓人提心吊膽，因為連她自己也不知道會發生什麼事情。然而她似乎無法體會身旁人的種種暗示，依然我行我素。這樣的大小姐，需要隊友的多多包容與幫忙`,
            nvPuZhang:`誰能想到完美瀟灑的女僕長背後身份則是隱藏於黑暗中的忍者呢？`,
            jieJieShi:`結界師的能力自然體現在他的結界上，適當的佈置好結界能夠有效的增幅隊友，而不適當的結界則只會幫助你的對手`,
            shenMiXueZhe:`操弄言靈進行攻擊，從不直接與對手對線，正是神秘學者給人的戰鬥體驗。身為隊友協同作戰時總得聚精會神，因為說不準被打飛四散的言靈會往你頭上飛來`,
            ranWuZhe:`染汙者操弄體內戾氣，迸發強烈的力量。靠近她的人都會被她蔓延的戾氣傷害，人人望而生畏。背棄神，詛咒神，婕姬海德沒有寬恕，她品嚐著最真實的痛楚`,
            shiShenZhe:"耶夢加得與教廷的愛恨情仇，從她的招式上就可看得出來。她喜歡用手上雙刃玩弄對手，將刀刃紮上身軀，然後享受拔出時鮮血狂噴的快感。戰鬥已經不是戰鬥，而是一場噬神者的個人表演。",
        },
        card: {
            moRen: {
                //type: "none",
                enable: true,
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return target.side!=player.side;
                },
                fullskin: true,
                content: function(){
                    "step 0"
                    target.damage(event.damageNum);
                },
                ai: {
                    basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
                },
            },
            yiRen: {
                //type: "none",
                enable: true,
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return target.side!=player.side;
                },
                fullskin: true,
                content: function(){
                    "step 0"
                    target.damage(event.damageNum);
                },
                ai: {
                    basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
                },
            },
        },
		
		skill:{
            //噬神者
            yuRen: {
                type: "qiDong",
                trigger: {player: "qiDong",},
                filter: function(event,player){
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;
                    return !(bool1&&bool2);
                },
                content: function(){
                    'step 0'
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;

                    var list=[];
                    if(!bool1){
                        list.push('moRen');
                    }
                    if(!bool2){
                        list.push('yiRen');
                    }
                    var next=player.chooseButton(['選擇獲得的【刃】',[list,'vcard']]);
                    next.set('selectButton',[1,1]);
                    next.set('forced',true);
                    'step 1'
                    var card;
                    if(result.links[0][2]=='moRen'){
                        card=lib.skill.yuRen.createRen('moRen',player);
                    }else if(result.links[0][2]=='yiRen'){
                        card=lib.skill.yuRen.createRen('yiRen',player);
                    }
                    if(card){
                        game.log(player, "獲得了1張【刃】")
                        player.gain(card,'draw');
                    }
                },
                check: function(event,player){
                    return player.countCards('h')<player.getHandcardLimit();
                },
                createRen:function(name,player){
                    var card;
                    if(name=='moRen'){
                        card=game.createCard("moRen", "", '');
                    }else if(name=='yiRen'){
                        card=game.createCard("yiRen", "", '');
                    }
                    if(card){
                        player.storage[name]=true;
                        card.storage.renMaster=player;
                    }
                    game.broadcastAll(function(card){
                        if(card.name=='moRen') card.addGaintag('eternal_huo');
                        if(card.name=='yiRen') card.addGaintag('eternal_lei');
                    },card);
                    return card;
                },
            },
            qinKe: {
                trigger: {source: "gongJiMingZhong",},
                filter: function(event,player){
                    return get.name(event.card)=='moRen'||get.name(event.card)=='yiRen';
                },
                content: function(){
                    var card;
                    if(get.name(trigger.card)=='moRen'){
                        card=lib.skill.yuRen.createRen('moRen',player);
                    }else if(get.name(trigger.card)=='yiRen'){
                        card=lib.skill.yuRen.createRen('yiRen',player);
                    }
                    game.log(trigger.target,'獲得了',card);
                    trigger.target.gain(card,'draw');
                },
            },
            shiMie: {
                trigger: { player: "gongJiShi"},
                filter: function(event,player){
                    return get.name(event.card)=='moRen'&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h',function(card){
                        var xiBie=get.xiBie(card);
                        return xiBie=='shui'||xiBie=='huo';
                    }).set('ai',function(){
                        var target=_status.event.target;
                        if(target.zhiLiao>0){
                            return Math.random();
                        }else{
                            return 0;
                        }
                    }).set('target',trigger.target);
                    next.set('prompt',get.prompt('shiMie'));
                    next.set('prompt2',lib.translate.shiMie_info);
                    event.result=await next.forResult();
                },
                content: function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    trigger.target.changeZhiLiao(-1);
                },
            },
            shangMie: {
                trigger: {player: "gongJiShi",},
                filter: function(event,player){
                    return get.name(event.card)=='yiRen'&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var bool=game.hasPlayer(function(current){
                        return current.zhiLiao>0||current.side!=player.side;
                    });
                    var next=player.chooseCardTarget({
                        filterCard:function(card){
                            var xiBie=get.xiBie(card);
                            return xiBie=='feng'||xiBie=='lei';
                        },
                        filterTarget:function(card,player,target){
                            var targetx=_status.event.targetx;
                            return targetx!=target&&target.side!=player.side;
                        },
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2(target) {
                            var player=_status.event.player;
                            if(target.side==player.side) return 0;
                            return target.zhiLiao;
                        },
                    });
                    next.set('targetx',trigger.target);
                    next.set('prompt',get.prompt('shangMie'));
                    next.set('prompt2',lib.translate.shangMie_info);
                    event.result=await next.forResult();
                },
                content: function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    event.targets[0].changeZhiLiao(-1);
                },
            },
            tongDiao: {
                trigger: {player: "ren_daChuQiZhiBefore",},
                forced: true,
                content: function(){
                    trigger.num=1;
                },
            },
            ren: {
                global: ["ren_zhuanHuan1","ren_zhuanHuan2","ren_daChuQiZhi","ren_gaiPai","ren_biaoJi",'ren_cardsDiscardEnd','ren_mod','ren_cardsDiscardEnd'],
                contentx: function(){
                    for(var card of event.cards){
                        if(card.name=='moRen'){
                            if(card.gaintag[0]=='eternal_huo') player.addGaintag([card],['eternal_shui']);
                            else player.addGaintag([card],['eternal_huo']);
                        }else if(card.name=='yiRen'){
                            if(card.gaintag[0]=='eternal_lei') player.addGaintag([card],['eternal_feng']);
                            else player.addGaintag([card],['eternal_lei']);
                        }
                    }
                },
                subSkill: {
                    mod:{
                        priority:-1,//mod技能生效也分優先級
                        mod:{
                            cardType:function(card,player,type){
                                if(card.name=='moRen'||card.name=='yiRen') return 'gongJi';
                            },
                            cardMingGe:function(card,player,mingGe){
                                if(card.name=='moRen'||card.name=='yiRen') return 'xue';
                            },
                            cardXiBie:function(card,player,xiBie){
                                if(card.name=='moRen'||card.name=='yiRen'){
                                    if(card.gaintag[0]){
                                        return card.gaintag[0].slice(8);
                                    }
                                }
                            },
                        },
                    },        
                    biaoJi:{
                        intro: {
                            mark:function(dialog,storage,player){
                                var num=player.countCards('h',function(card){
                                    return card.name=='moRen'||card.name=='yiRen';
                                });
                                return '共有'+num+'張刃';
                            },
                            markcount:function(storage,player){
                                var num=player.countCards('h',function(card){
                                    return card.name=='moRen'||card.name=='yiRen';
                                });
                                return num;
                            },
                        },
                        trigger: {player:['loseAfter','gainAfter'],source:'gainAfter'},
                        direct: true,
                        lastDo: true,
                        content: function(){
                            if(player.hasCard(function(card){
                                return card.name=='moRen'||card.name=='yiRen';
                            })){
                                player.markSkill('ren_biaoJi');
                                /*
                                if(trigger.name=='gain'&&trigger.player==player){
                                    for(let card of trigger.cards){
                                        if(!card.gaintag.length){
                                            if(card.name=='moRen') player.addGaintag([card],['huo']);
                                            else if(card.name=='yiRen') player.addGaintag([card],['lei']);
                                        }
                                    }
                                }*/
                            }else{
                                player.unmarkSkill('ren_biaoJi');
                            }
                        }
                    },
                    zhuanHuan1: {
                        enable: ["gongJiOrFaShu"],
                        filter: function(event,player){
                            return player.hasCard(function(card){
                                return card.name=='moRen'||card.name=='yiRen';
                            });
                        },
                        filterCard: function(card){
                            return card.name=='moRen'||card.name=='yiRen';
                        },
                        selectCard: [1,2],
                        discard: false,
                        lose: false,
                        content: function(){
                            var next=game.createEvent('zhuanHuan');
                            next.cards=cards;
                            next.player=player;
                            next.setContent(lib.skill.ren.contentx);
                            if(_status.currentPhase==player){
                                player.storage[event.getParent('xingDong').xingDong]++;
                                if(event.getParent().firstAction) event.getParent('xingDong').firstAction=true;
                            }
                        },
                    },
                    zhuanHuan2: {
                        trigger: {player: ["chooseToDiscardBefore","yingZhanBefore","chooseCardBefore"],},
                        filter: function(event,player){
                            if(event.zhuanHuan==true) return false;
                            return player.hasCard(function(card){
                                return card.name=='moRen'||card.name=='yiRen';
                            });
                        },
                        async cost(event,trigger,player){
                            var next=player.chooseCard('h',function(card){
                                return card.name=='moRen'||card.name=='yiRen';
                            });
                            next.set('prompt','是否轉化【刃】的系別');
                            next.set('selectCard',[1,2]);
                            next.set('zhuanHuan',true);
                            if(event.triggername=='yingZhanBefore'){
                                next.set('yingZhan',event.triggername=='yingZhanBefore');
                                next.set('card',trigger.card);
                            }
                            next.set('ai',function(card){
                                if(_status.event.yingZhan){
                                    let xiBie1=get.xiBie(_status.event.card);
                                    if(card.name=='moRen'&&(xiBie1=='huo'||xiBie1=='shui')){
                                        let xiBie2=get.xiBie(card);
                                        if(xiBie2==xiBie1) return 0;
                                        else return 1;
                                    }else if(card.name=='yiRen'&&(xiBie1=='lei'||xiBie1=='feng')){
                                        let xiBie2=get.xiBie(card);
                                        if(xiBie2==xiBie1) return 0;
                                        else return 1;
                                    }
                                }
                                return 0.5;
                            });
                            event.result=await next.forResult();
                        },
                        content: function(){
                            var next=game.createEvent('zhuanHuan');
                            next.cards=event.cards;
                            next.player=player;
                            next.setContent(lib.skill.ren.contentx);
                        },
                    },
                    daChuQiZhi: {
                        trigger: {player: ["daChuPai","discard"],},
                        forced: true,
                        priority:0.5,
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(event.cards[i].name == 'moRen' || event.cards[i].name  == 'yiRen') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player){
                            var bool=false;
                            for(var card of event.cards){
                                if(card.name=='moRen'||card.name=='yiRen'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: function(){
                            'step 0'
                            trigger.cards.remove(event.indexedData);
                            player.faShuDamage(event.num||3,event.indexedData.storage.renMaster);
                            'step 1'
                            let name=get.name(event.indexedData);
                            event.indexedData.storage.renMaster.storage[name]=false;
                            game.broadcastAll(function(card){
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                            },event.indexedData);
                            game.log(event.indexedData, "被移除了");
                        },
                    },
                    gaiPai: {
                        trigger: {player: "addGaiPaiEnd",},
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(event.cards[i].name  == 'moRen' || event.cards[i].name  == 'yiRen') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        forced: true,
                        filter: function(event,player){
                            if(event.special) return false;
                            var bool=false;
                            for(var card of event.cards){
                                if(card.name=='moRen'||card.name=='yiRen'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: function(){
                            'step 0'
                            player.faShuDamage(1,event.indexedData.storage.renMaster);
                            'step 1'
                            let name=get.name(event.indexedData);
                            event.indexedData.storage.renMaster.storage[name]=false;
                            game.broadcastAll(function(card){
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                            },event.indexedData);
                            game.log(event.indexedData, "被移除了");
                        },
                    },
                    cardsDiscardEnd:{
                        trigger:{global:'cardsDiscardEnd'},
                        direct:true,
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(event.cards[i].name  == 'moRen' || event.cards[i].name  == 'yiRen') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player){
                            var bool=false;
                            for(var card of event.cards){
                                if(card.name=='moRen'||card.name=='yiRen'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: async function(event, trigger, player){
                            let name=get.name(event.indexedData);
                            event.indexedData.storage.renMaster.storage[name]=false;
                            game.broadcastAll(function(card){
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                            },event.indexedData);
                            game.log(event.indexedData, "被移除了");
                        }
                    },
                },
            },
            gongZhen: {
                trigger: {player: "zaoChengShangHai",},
                filter: function(event,player){
                    return player.canBiShaShuiJing()&&event.faShu;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h',[2,3],function(card){
                        return get.xuanZeTongXiPai(card);
                    });
                    next.set('complexCard',true);
                    next.set('prompt',get.prompt('gongZhen'));
                    next.set('prompt2',lib.translate.gongZhen_info);
                    next.set('ai',function(card){return 1;});
                    event.result=await next.forResult();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.discard(event.cards,'showCards');
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;
                    var list=[];
                    if(!bool1){
                        list.push('moRen');
                    }
                    if(!bool2){
                        list.push('yiRen');
                    }
                    if(list.length==0) return;
                    else{
                        var next=player.chooseButton(['選擇獲得的【刃】',[list,'vcard']]);
                        next.set('selectButton',[1,2]);
                        var result=await next.forResult();
                        if(result.bool){
                            let cards=[];
                            for(var i=0;i<result.links.length;i++){
                                let card;
                                if(result.links[i][2]=='moRen'){
                                    card=lib.skill.yuRen.createRen('moRen',player);
                                }else if(result.links[i][2]=='yiRen'){
                                    card=lib.skill.yuRen.createRen('yiRen',player);
                                }
                                cards.push(card);
                            }
                            game.log(player,`獲得了${cards.length}張【刃】`);
                            await player.gain(cards,'draw');

                            var targets=await player.chooseTarget('對1名目標角色造成1點法術傷害③',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets();
                            await targets[0].faShuDamage(1,player);
                        }
                    }
                },
                check: function(event,player){
                    return !player.storage.moRen&&!player.storage.yiRen;
                },
                ai: {
                    shuiJing: true,
                },
            },
            zhuShenZhongYan: {
                type: "faShu",
                enable: ["faShu"],
                filter: function(event,player){
                    return player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await player.addNengLiang('shuiJing');
                    await player.faShuDamage(2,player);
                    var players=[];
                    for(var current of game.players){
                        var cards=current.getCards('h');
                        for(var j=0;j<cards.length;j++){
                            if(cards[j].name=='moRen'){
                                players.push(current);
                                player.storage.moRen=false;
                                let card=cards[j];
                                await current.lose(card);
                                game.broadcastAll(function(card){
                                    card.fix();
                                    card.remove();
                                    card.destroyed = true;
                                },card);
                                game.log(card, "被移除了");
                            }else if(cards[j].name=='yiRen'){
                                players.push(current);
                                player.storage.yiRen=false;
                                let card=cards[j];
                                await current.lose(card);
                                game.broadcastAll(function(card){
                                    card.fix();
                                    card.remove();
                                    card.destroyed = true;
                                },card);
                                game.log(card, "被移除了");
                            }
                            if(players.length>=2) break;
                        }
                        if(players.length>=2) break;
                    }
                    if(players.length==0) return;

                    players.sortBySeat(player);
                    for(var i=0;i<players.length;i++){
                        await players[i].faShuDamage(3,player);
                    }
                    if(players.length>=2){
                        var targets=await player.chooseTarget('對1名目標對手造成2點法術傷害③',true,function(card,player,target){
                            return target.side!=player.side;
                        }).set('ai',function(target){
                            return get.damageEffect(target,player,2);
                        }).forResultTargets();
                        await targets[0].faShuDamage(2,player);
                    }
                    
                },
                ai: {
                    baoShi: true,
                    order: function(event,player){
                        var num=3;
                        if(player.storage.yiRen) num+=0.2;
                        if(player.storage.moRen) num+=0.2;
                        return num;
                    },
                    result: {
                        player:function(player){
                            var players=game.filterPlayer(function(current){
                                if(current.side==player.side) return false;
                                return current.hasCard(function(card){
                                    return card.name=='moRen'||card.name=='yiRen';
                                });
                            });
                            if(players.length>0) return 1;
                            else return 0;
                        }
                    },
                },
            },

            //矜貴之女
            gaoLingZhiHua:{
                trigger:{player:'_tiLian_backupEnd'},
                forced:true,
                filter:function(event,player){
                    return event.links.includes('baoShi');
                },
                content:function(){
                    player.addNengLiang('shuiJing');
                }
            },
            moFaRuMen:{
                type:'faShu',
                enable:['faShu'],
                content:async function(event,trigger,player){
                    var cards=[];
                    if(event.bool){
                        let targets=await player.chooseTarget('我方2名角色各棄置1張牌',2,true,function(card,player,target){
                            return player.side==target.side;
                        }).set('ai',function(target){
                            return Math.random();
                        }).forResultTargets();
                        game.log(player,'選擇了',targets);
                        event.targets=targets.slice();
                        for(var target of targets){
                            let card=await target.chooseToDiscard('h',true,'showCards')
                            .set('ai',function(card){
                                var num=0;
                                if(get.type(card)=='faShu') num++;
                                if(get.mingGe(card)=='yong') num++;
                                if(get.xiBie(card)=='shui') num++;
                                return num;
                            }).forResultCards();
                            if(card.length>0) cards.push(card[0]);
                        }
                    }else{
                        let card=await player.draw().forResult();
                        await player.showHiddenCards(card);
                        cards.push(card[0]);
                    }

                    if(cards.length>0){
                        event.faShu=false;
                        event.yong=0;
                        event.shui=0;

                        for(var card of cards){
                            if(!event.faShu&&get.type(card)=='faShu') event.faShu=true;
                            if(get.mingGe(card)=='yong') event.yong++;
                            if(get.xiBie(card)=='shui') event.shui++;
                        }
                        if(event.faShu){
                            let targets=await player.chooseTarget('對2名目標對手各造成1點法術傷害③',2,true,function(card,player,target){
                                return target.side!=player.side;
                            }).set('ai',function(target){
                                return -get.damageEffect(target,1);
                            }).forResultTargets();
                            game.log(player,'選擇了',targets);
                            for(var target of targets){
                                await target.faShuDamage(1,player);
                            }
                        }
                        if(event.yong>0){
                            let targets=await player.chooseTarget(`對${event.yong}名目標角色各造成1點法術傷害③`,true,event.yong).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets();
                            game.log(player,'選擇了',targets);
                            for(var target of targets){
                                await target.faShuDamage(1,player);
                            }
                        }
                        if(event.shui>0){
                            let targets=await player.chooseTarget(`${event.shui}名目標角色各+1點[治療]`,true,event.shui).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            }).forResultTargets();
                            game.log(player,'選擇了',targets);
                            for(var target of targets){
                                target.changeZhiLiao(1,player);
                            }
                        }
                    }
                    if(event.bool){
                        for(var target of event.targets){
                            await target.draw();
                        }
                    }
                },
                ai:{
                    order:function(card,player){
                        if(player.countCards('h')>=player.getHandcardLimit()) return 1;
                        return 4;
                    },
                    result:{
                        player:function(player){
                            if(player.countCards('h')>=player.getHandcardLimit()) return -1;
                            else return 1;
                        },
                    }
                }
            },
            Magic:{
                trigger:{player:['moFaRuMenEnd']},
                content:function(){
                    'step 0'
                    if(trigger.faShu==false&&trigger.yong==0&&trigger.shui==0){
                        player.addFaShu();
                    }else{
                        player.chooseToDiscard(2,true);
                    }
                    'step 1'
                    if(player.countSkill('moFaRuMen')==3){
                        player.addZhanJi('baoShi',2);
                    }
                },
                check:function(event,player){
                    var num=player.countSkill('moFaRuMen');
                    if(num==3) return true;
                    return num<4;
                }
            },
            qiangYuYuanXing:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    await player.tiaoZhengShouPai(4);
                    
                    var list=get.zhanJi(player.side);
                    if(list.length>0){
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }

                        let result=await player.chooseButtonTarget({
                            createDialog:[
                                '是否移除1個星石<br>將一名其他角色手牌調整為4張[強制]',
                                [listx,'tdnodes'],
                            ],
                            filterTarget:lib.filter.notMe,
                            ai1:function(button){
                                return -1;
                            },
                            ai2:function(target){
                                if(target.countCards('h')==4) return -1;
                                return Math.random();
                            },
                        }).forResult();
                        if(result.bool){
                            if(result.links[0]=='baoShi'){
                                await player.removeZhanJi("baoShi");
                            }else{
                                await player.removeZhanJi("shuiJing");
                            }
                            let target=result.targets[0];
                            await target.tiaoZhengShouPai(4);
                        }
                    }
                },
                check:function(event,player){
                    if(player.countCards('h')==4) return false;
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }
            },
            youQingJiBan:{
                ai:{
                    baoShi:true,
                },
                trigger:{player:'moFaRuMenBegin'},
                usable:1,
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    trigger.bool=true;
                }
            },
            //女僕長
            yingZhiXue:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.countZhiShiWu('mi')>=1;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('mi');
                    'step 1'
                    player.chooseTarget('將【風穴】轉移或放置於目標對手前，他棄1張牌',true,function(card,player,target){
                        if(target.hasZhiShiWu('fengXueX')) return false;
                        return player.side!=target.side;
                    }).set('ai',function(target){
                        return Math.random();
                    });
                    'step 2'
                    event.target=result.targets[0];
                    if(player.storage.fengXue_target){
                        var target=player.storage.fengXue_target;
                        target.removeZhiShiWu('fengXueX');
                        target.removeSkill('fengXueX');
                    }
                    'step 3'
                    var target=event.target;
                    player.storage.fengXue_target=target;
                    target.storage.fengXue_player=player;
                    target.addSkill('fengXueX');
                    'step 4'
                    target.addZhiShiWu('fengXueX');
                    'step 5'
                    event.target.chooseToDiscard(true);
                },
                check:function(event,player){
                    var bool=game.hasPlayer(function(current){
                        return current.hasZhiShiWu('fengXueX');
                    });
                    return player.countCards('h')>0&&!bool&&(player.canFaShu()||player.canGongJi());
                }
            },
            miShuMuYing:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&!player.usedSkill('shun')&&event.cards.length>0;
                },
                content:function(){
                    'step 0'
                    player.addGaiPai(trigger.cards,'ying');
                }
            },
            shun:{
                trigger:{source:"gongJiWeiMingZhong"},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&player.getGaiPai('ying').length>0;
                },
                usable:1,
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('ying');
                    var result=await player.chooseCardButton(cards,'是否移除1個【影】，發動【瞬·影·殺】,額外+1[攻擊行動]，本回合你的主動攻擊無法應戰但無法發動【秘術·摹影】').set('ai',function(button){
                        var bool=_status.event.bool;
                        if(bool) return Math.random();
                        else return 0;
                    }).set('bool',player.canGongJi()).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'ying');
                    player.addGongJi();
                    player.addTempSkill('shun_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event);
                        },
                        content:function(){
                            trigger.wuFaYingZhan();
                        }
                    }
                },
            },
            yingFeng:{
                trigger:{global:'phaseBegin'},
                filter:function(event,player){
                    return event.player.hasZhiShiWu('fengXueX')&&player.countZhiShiWu('mi')>0;;
                },
                async cost(event,trigger,player){
                    var num=player.countZhiShiWu('mi');
                    var list=[];
                    for(var i=1;i<=num;i++){
                        if(i>=4) break;
                        list.push(i)
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list).set('prompt',`是否發動【影縫】,移除X點<span class='hong'>【糸】</span><br>他棄X張牌,你觀看並將其中1張棄牌面朝下放置在你角色旁作為【影】；<span class='tiaoJian'>(若因此棄牌數小於X)</span>對方士氣-1`).set('ai',function(){
                        return _status.event.x;
                    }).set('x',list.length-2).forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('mi',event.cost_data);
                    event.num=event.cost_data;
                    'step 1'
                    trigger.player.chooseToDiscard(true,event.num);
                    'step 2'
                    event.cards=result.cards;
                    var xiBies={};
                    var ying=player.getGaiPai('ying');
                    for(let card of ying){
                        if(xiBies[get.xiBie(card)]) xiBies[get.xiBie(card)]++;
                        else xiBies[get.xiBie(card)]=1;
                    }
                    var xiBie;
                    for(let key in xiBies){
                        if(!xiBie) xiBie=key;
                        else{
                            if(xiBies[key]>xiBies[xiBie]) xiBie=key;
                        }
                    }

                    if(event.cards.length>0){
                        player.chooseCardButton(event.cards,true,1,'你觀看並將其中1張棄牌面朝下放置在你角色旁作為【影】').set('ai',function(button){
                            if(_status.event.xiBie) return get.xiBie(button.link)==_status.event.xiBie?1:0.1;
                            return Math.random();
                        }).set('xiBie',xiBie);
                    }else{
                        event.goto(4);
                    }
                    'step 3'
                    player.addGaiPai(result.links,'ying');
                    'step 4'
                    if(event.num>event.cards.length){
                        trigger.player.changeShiQi(-1);
                    }
                }
            },
            shiFengZhiDao:{
                trigger:{player:'phaseEnd'},
                filter:function(event,player){
                    return player.getGaiPai('ying').length>=2;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('ying');
                    var xiBies={};
                    for(let card of cards){
                        if(xiBies[get.xiBie(card)]) xiBies[get.xiBie(card)]++;
                        else xiBies[get.xiBie(card)]=1;
                    }
                    var xiBie;
                    for(let key in xiBies){
                        if(xiBies[key]<2) continue;
                        if(!xiBie) xiBie=key;
                        else{
                            if(xiBies[key]>xiBies[xiBie]) xiBie=key;
                        }
                    }
                    
                    var result=await player.chooseCardButton(cards,2,`是否發動【侍奉之道】，移除2張【影】[展示]<br>你+1<span class='hong'>【糸】</span>；<span class='tiaoJian'>(若移除的【影】系別相同)</span>將其中1個【影】交給目標角色[強制]，然後你[橫置][持續]`).set('ai',function(button){
                        if(_status.event.xiBie) return get.xiBie(button.link)==_status.event.xiBie?1: 0.4- Math.random();
                        return 0.5-Math.random();
                    }).set('xiBie',xiBie).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'ying',"showHiddenCards");
                    event.cards=event.cost_data;
                    'step 1'
                    player.addZhiShiWu('mi');
                    'step 2'
                    var xiBie1=get.xiBie(event.cards[0]);
                    var xiBie2=get.xiBie(event.cards[1]);
                    if(xiBie1==xiBie2){
                        player.chooseCardButton(event.cards,true,1,'將其中1個【影】交給目標角色[強制]').set('ai',function(button){
                            return 7-get.value(button.link);
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    event.card=result.links[0];
                    player.chooseTarget('將【'+get.translation(event.card)+'】交給目標角色',true).set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side){
                            if(target.countCards('h')>=target.getHandcardLimit()) return -1;
                            else Math.random();
                        }else{
                            if(target.countCards('h')>=target.getHandcardLimit()) return 2;
                            else Math.random();
                        }
                    });
                    'step 4'
                    game.log(player,'交給了',result.targets[0],event.card);
                    result.targets[0].gain(event.card,'draw');
                    'step 5'
                    player.hengZhi();
                },
                check:function(event,player){
                    var num=Math.random();
                    if(player.isHengZhi()) return num>0.1;
                    var cards=player.getGaiPai('ying');
                    var num=get.countTongXiPai(cards);
                    if(num>=2) return true;
                    else return false;
                }
            },
            jinShu:{
                trigger:{global:'teShuEnd'},
                filter:function(event,player){
                    return event.player!=player;
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.addZhiShiWu('mi');
                    'step 1'
                    if(player.countZhiShiWu('mi')>=3&&player.isHengZhi()){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否額外移除3點<span class='hong'>【糸】</span><br>[重置]，對目標對手造成2點法術傷害③或指定目標隊友棄1張牌`);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(result.control=='是'){
                        player.removeZhiShiWu('mi',3);
                    }else{
                        event.finish();
                    }
                    'step 3'
                    player.chongZhi();
                    'step 4'
                    player.chooseTarget('對目標對手造成2點法術傷害③或指定目標隊友棄1張牌',true,function(card,player,target){
                        return target!=player;
                    }).set('ai',function(target){
                        return Math.random();
                    });
                    'step 5'
                    var target=result.targets[0];
                    if(target.side!=player.side){
                        target.faShuDamage(2,player);
                    }else{
                        target.chooseToDiscard(true);
                    }
                }
            },
            fengXue:{},
            fengXueX:{
                intro:{
                    name:"(專)風穴",
                    content:`
                    <span class="greentext">[被動]影之風</span><br>
                    <span class='tiaoJian'>(若你擁有【風穴】，當你主動攻擊命中的攻擊牌置入棄牌堆時)</span>將該牌面朝下放置在女僕長角色旁作為【影】。 <span class='tiaoJian'>(你每次[攻擊行動]結束時)</span>女僕長+1<span class='hong'>【糸】</span>。<br>
                    <span class="greentext">[響應]風止</span><br>
                    <span class='tiaoJian'>(若你擁有【風穴】，你的回合結束時發動)</span>將手牌補到上限[強制]，棄2張牌，將棄牌面朝下放置在女僕長角色旁作為【影】，然後移除【風穴】。
                    `,
                    nocount:true,
                },
                markimage:'image/card/zhuanShu/fengXue.png',
                onremove:'storage',
                group:['fengXueX_yingZhiFeng1_1','fengXueX_yingZhiFeng1_2','fengXueX_yingZhiFeng2','fengXueX_fengZhi'],
                subSkill:{
                    yingZhiFeng1_1:{
                        trigger:{player:'gongJiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.hasZhiShiWu('fengXueX')) return false;
                            return get.is.zhuDongGongJi(event)&&event.cards.length>0;
                        },
                        content:function(){
                            player.storage.yingZhiFengCard=trigger.cards[0];
                        }
                    },
                    yingZhiFeng1_2:{
                        trigger:{global:'cardsDiscardAfter'},
                        getIndex(event) {
                            const cards = event.getd();
                            if (!cards.length) return [];
                            return cards;
                        },
                        filter(event, player, triggername, card) {
                            if(!player.hasZhiShiWu('fengXueX')) return false;
                            if(player.storage.yingZhiFengCard!=card) return false;
                            return get.position(card, true) === "d";
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            const cards = event.indexedData;
                            player.storage.fengXue_player.addGaiPai(cards,'ying');
                            'step 1'
                            delete player.storage.yingZhiFengCard;
                        }
                    },
                    yingZhiFeng2:{
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event)&&player.hasZhiShiWu('fengXueX');
                        },
                        forced:true,
                        content:function(){
                            player.storage.fengXue_player.addZhiShiWu('mi');
                        }
                    },
                    fengZhi:{
                        trigger:{player:'phaseEnd'},
                        filter:function(event,player){
                            return player.hasZhiShiWu('fengXueX');
                        },
                        content:function(){
                            'step 0'
                            var num=player.getHandcardLimit();
                            player.drawTo(num);
                            'step 1'
                            player.chooseToDiscard(2,true);
                            'step 2'
                            if(result.cards.length>0){
                                player.storage.fengXue_player.addGaiPai(result.cards,'ying');
                            }
                            'step 3'
                            player.removeZhiShiWu('fengXueX');
                            'step 4'
                            player.removeSkill('fengXueX');
                        }
                    },
                }
            },
            zhen:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var xiBies={};
                    var ying=player.getGaiPai('ying');
                    for(let card of ying){
                        if(xiBies[get.xiBie(card)]) xiBies[get.xiBie(card)]++;
                        else xiBies[get.xiBie(card)]=1;
                    }
                    var xiBie;
                    for(let key in xiBies){
                        if(!xiBie) xiBie=key;
                        else{
                            if(xiBies[key]>xiBies[xiBie]) xiBie=key;
                        }
                    }
                    player.chooseCard('h',2,true,'將2張手牌面朝下放置在你角色旁作為【影】').set('ai',function(card){
                        if(_status.event.xiBie){
                            if(get.xiBie(card)==_status.event.xiBie) return 7 - get.value(card);
                        }
                        return 5-get.value(card);
                    }).set('xiBie',xiBie);
                    'step 2'
                    player.addGaiPai(result.cards,'ying');
                },
                check:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='gongJi')>3&&player.countGaiPai('ying')<=1;
                }
            },
            ying:{
                intro:{
                    markcount:'gaiPai',
                    content:'gaiPai',
                },
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                direct:true,
                trigger:{player:'addGaiPaiAfter'},
                filter:function(event,player){
                    return player.getGaiPai('ying').length>3;
                },
                content:function(){
                    'step 0'
                    var cards=player.getGaiPai('ying');
                    var xiBies={};
                    for(let card of cards){
                        if(xiBies[get.xiBie(card)]) xiBies[get.xiBie(card)]++;
                        else xiBies[get.xiBie(card)]=1;
                    }
                    var xiBie;
                    for(let key in xiBies){
                        if(!xiBie) xiBie=key;
                        else{
                            if(xiBies[key]>xiBies[xiBie]) xiBie=key;
                        }
                    }
                    var next=player.chooseCardButton(cards,true,cards.length-3,`捨棄${cards.length-3}張【影】`).set('xiBie',xiBie).set('ai',function(button){
                        if(_status.event.xiBie) {
                            if(get.xiBie(button.link)==_status.event.xiBie) return 0.1;
                        }
                        return 1;
                    });
                    'step 1'
                    player.discard(result.links,'ying').set('sheQi',true);
                }
            },
            mi:{
                intro:{
                    content:'mark',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //結界師
            jieJieYiShi:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return !player.getGaiPai('jieJie').length>0&&player.hasSkill('jieJie');
                },
                selectCard:2,
                discard:false,
                filterCard:true,
                content:function(){
                    'step 0'
                    player.addGaiPai(cards,'jieJie');
                    'step 1'
                    player.showCards(cards);
                    'step 2'
                    player.addZhiShiWu('jiX');
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
            huangShenZhiLi:{
                forced:true,
                trigger:{global:'gongJiMingZhong'},
                filter:function(event,player){
                    var cards=player.getGaiPai('jieJie');
                    if(cards.length==0) return false;
                    for(var i of cards){
                        if(get.xiBie(event.card)==get.xiBie(i)) return true;
                    }
                    return false;
                },
                content:function(){
                    trigger.changeDamageNum(1);
                },
                
            },
            huangShenJiYi:{
                trigger:{global:'gongJiShi'},
                filter:function(event,player){
                    if(!get.is.zhuDongGongJi(event)) return false;
                    var cards=player.getGaiPai('jieJie');
                    if(cards.length==0) return false;
                    for(var i of cards){
                        if(get.xiBie(event.card)==get.xiBie(i)) return true;
                    }
                    return false;
                },
                content:function(){
                    'step 0'
                    player.addZhiShiWu('jiX');
                    'step 1'
                    if(player.countZhiShiWu('jiX')>=3){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否額外移除3點<span class='hong'>【祭】</span>，你棄1張牌，移除1個【結界】並[橫置][持續]`).set('ai',function(){
                            var player=_status.event.player;
                            if(player.isHengZhi()) return 1;
                            else return 0;
                        });
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(result.control=='是'){
                        player.removeZhiShiWu('jiX',3);
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(player.countCards('h')>0){
                        player.chooseToDiscard(1,true);
                    }
                    'step 4'
                    var cards=player.getGaiPai('jieJie');
                    player.chooseCardButton(cards,true,'移除1個【結界】');
                    'step 5'
                    player.discard(result.links,'jieJie').set('visible',true);
                    'step 6'
                    player.hengZhi();
                }
            },
            jinMoJing:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('jiX')>0;
                },
                filterTarget:function(card,player,target){
                    if(target.hasZhiShiWu('jueJieX')) return false;
                    return true;
                },
                selectTarget:1,
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('jiX');

                    if(player.storage.jueJie_target){
                        await player.storage.jueJie_target.removeZhiShiWu('jueJieX');
                        await player.storage.jueJie_target.removeSkill('jueJieX');
                    }
                    player.storage.jueJie_target=event.target;
                    event.target.addSkill('jueJieX');
                    event.target.storage.jueJie_player=player;
                    await event.target.addZhiShiWu('jueJieX');
                    'step 4'
                    if(player.countCards('h')>0){
                        await player.chooseToDiscard(1,true);
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:1,
                    }
                }
            },
            liuLiJing:{
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    return event.side==player.side&&event.num<0&&player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.chongZhi();
                    'step 1'
                    player.addZhanJi('baoShi');
                    'step 2'
                    player.chooseTarget('目標角色棄1張牌[展示]',true).set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side) return 1;
                        return -1;
                    });
                    'step 3'
                    event.target=result.targets[0];
                    if(event.target.countCards('h')>0){
                        event.target.chooseToDiscard('h',true,'showCards');
                    }
                    'step 4'
                    event.cards=result.cards;
                    'step 5'
                    if(player.countGaiPai('jieJie')>=2){
                        event.finish();
                    }else{
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否將${get.translation(event.cards)}作為【結界】`).set('ai',function(){
                            var player=_status.event.player;
                            if(player.getGaiPai('jieJie').length==0) return 1;
                            else return 0;
                        });
                    }
                    'step 6'
                    if(result.control=='是'){
                        player.addGaiPai(event.cards,'jieJie');
                    }
                }
            },
            jueJie:{},
            jueJieX:{
                intro:{
                    name:'(專)絕界',
                    nocount:true,
                    content:`
                    <span class="greentext">[被動]滅界破散</span><br>
                    <span class='tiaoJian'>(結界師的【結界】為0時)</span>結界師[橫置]，移除【絕界】。 <span class='tiaoJian'>(擁有此卡的角色回合結束前)</span>結界師移除1個【結界】。<br>
                    <span class="greentext">[響應]白二羯磨</span><br>
                    <span class='tiaoJian'>(若你擁有【絕界】，你的[攻擊行動]結束時發動)</span>結界師+1<span class='hong'>【祭】</span>，你將1個【結界】加入手牌[強制]。<br>
                    <span class="greentext">[被動]虛空境</span><br>
                    <span class='tiaoJian'>(若你擁有【絕界】)</span>你擁有的基礎效果無法觸發。`,
                },
                markimage:'image/card/zhuanShu/juejie.png',
                onremove:'storage',
                group:['jueJieX_zero','jueJieX_remove','jueJieX_attack','jueJieX_wuFa'],
                subSkill:{
                    zero:{
                        forced:true,
                        trigger:{global:['discard','changeZhiShiWuAfter','gainAfter']},
                        filter:function(event,player,name){
                            if(name=='changeZhiShiWuAfter') return event.zhiShiWu=='jueJieX'&&player.storage.jueJie_player.getGaiPai('jieJie').length==0;
                            else if(name=='discard') return event.gaiPai=='jieJie'&&player.storage.jueJie_player.getGaiPai('jieJie').length==0;
                            else if(name=='gainAfter') return event.jieJie==true&&player.storage.jueJie_player.getGaiPai('jieJie').length==0;
                        },
                        content:function(){
                            'step 0'
                            player.storage.jueJie_player.hengZhi();
                            'step 1'
                            player.removeZhiShiWu('jueJieX');
                            'step 2'
                            player.removeSkill('jueJieX');
                        }   
                    },
                    remove:{
                        forced:true,
                        trigger:{player:'phaseEndBefore'},
                        filter:function(event,player){
                            return player.hasZhiShiWu('jueJieX');
                        },
                        content:function(){
                            'step 0'
                            var cards=player.storage.jueJie_player.getGaiPai('jieJie');
                            if(cards.length>0){
                                player.storage.jueJie_player.chooseCardButton(cards,true,'移除1個【結界】');
                            }else{
                                event.finish();
                            }
                            'step 1'
                            player.storage.jueJie_player.discard(result.links,'jieJie').set('visible',true);
                        }
                    },
                    attack:{
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event)&&player.hasZhiShiWu('jueJieX');
                        },
                        content:function(){
                            'step 0'
                            player.storage.jueJie_player.addZhiShiWu('jiX');
                            'step 1'
                            var cards=player.storage.jueJie_player.getGaiPai('jieJie');
                            if(cards.length>0){
                                player.chooseCardButton(cards,true,'將1個【結界】加入手牌[強制]');
                            }else{
                                event.finish();
                            }
                            'step 2'
                            game.log(player,'獲得了',result.links);
                            player.gain(result.links,'draw').set('jieJie',true);
                        }
                    },
                    wuFa:{
                        trigger:{player:'triggerSkill'},
                        forced:true,
                        filter:function(event,player){
                            if(event.skill=='jueJieX_wuFa') return false;
                            var list=player.jiChuXiaoGuoList();
                            return list.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                }
            },
            fuMoJing:{
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function(event,player){
                    return event.zhiShiWu=='jiX'&&event.num>0&&player.canBiShaShuiJing();
                },
                async cost(event,trigger,player){
                    event.result=player.chooseTarget(function(card,player,target){
                        var player=_status.event.player;
                        if(target.side==player.side) return false;
                        return true;
                    })
                    .set('prompt',get.prompt('fuMoJing'))
                    .set('prompt2',lib.translate.fuMoJing_info)
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.storage.fuMoJing=false;
                    event.target=event.targets[0];
                    'step 1'
                    player.removeBiShaShuiJing();
                    'step 2'
                    event.target.faShuDamage(1,player).set('fuMoJing',true);
                    'step 3'
                    var list=get.zhanJi(player.side);
                    if(player.storage.fuMoJing&&list.length>0){
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }
                        var next=player.chooseButton([
                            '是否移除1個星石，你+1[水晶]',
                            [listx,'tdnodes'],
                        ]);
                        next.set('selectButton',1);
                    }else{
                        event.finish();
                    }
                    'step 4'
                    if(result.bool){
                        if(result.links[0]=='baoShi'){
                            player.removeZhanJi("baoShi");
                        }else{
                            player.removeZhanJi("shuiJing");
                        }
                    }else{
                        event.finish();
                    }
                    'step 5'
                    player.addNengLiang('shuiJing');
                },
                group:'fuMoJing_shiQiXiaJiang',
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').fuMoJing==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.fuMoJing=true;
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                }
            },
            jieJie:{
                intro:{
					content:'gaiPai',
					markcount:'gaiPai',
                    show:true,
				},
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            jiX:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //神秘學者
            yanLingShu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countCards('h')>0&&player.hasSkill('yanLing');
                },
                selectCard:[1,2],
                filterCard:true,
                discard:false,
                content:function(){
                    'step 0'
                    player.addGaiPai(cards,'yanLing')
                    'step 1'
                    player.showCards(cards);
                    'step 2'
                    player.draw();
                    'step 3'
                    var yanLing=player.getGaiPai('yanLing');
                    var xiBie=[];
                    for(var i=0;i<yanLing.length;i++){
                        if(!xiBie.includes(get.xiBie(yanLing[i]))){
                            xiBie.push(get.xiBie(yanLing[i]));
                        }
                    }
                    var next=player.chooseToDiscard('h','showCards','是否額外棄1張與現存【言靈】系別相同的牌【展示】',function(card){
                        var xiBie=_status.event.xiBie;
                        return xiBie.includes(get.xiBie(card));
                    }).set('xiBie',xiBie);
                    next.set('ai',function(card){
                        return 7-get.value(card);
                    });
                    'step 4'
                    if(result.bool){
                        player.addZhiShiWu('miShu');
                    }
                },
                check:function(card){
                    if(get.xiBie(card)=='guang') return 0;
                    return 6-get.value(card);
                },
                ai:{
                    order:3.8,
                    result:{
                        player:function(player){
                            var cards=player.countGaiPai('yanLing');
                            if(cards==0) return 1;
                            if(cards==1) return 1.5;
                            if(cards==2) return 0;
                            return 0;
                        }
                    }
                }
            },
            shouHuLing:{
                forced:true,
                trigger:{target:'gongJiMingZhong'},
                firstDo:true,
                filter:function(event,player){
                    return player.countGaiPai('yanLing')>0&&get.is.zhuDongGongJi(event.getParent())&&(player.countGaiPai('yanLing')>0||player.countZhiShiWu('miShu')>0);
                },
                content:function(){
                    'step 0'
                    var cards=player.getGaiPai('yanLing');
                    player.chooseCardButton(cards,true,'移除1個【言靈】').set('ai',function(){
                        return Math.random();
                    });
                    'step 1'
                    player.discard(result.links,'yanLing');
                    'step 2'
                    if(player.countZhiShiWu('miShu')>0){
                        player.removeZhiShiWu('miShu');
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(player.countCards('h')>0){
                        player.chooseCard('h',true,'將1張手牌面朝上放置在你的角色旁【展示】作為【言靈】');
                    }else event.finish();
                    'step 4'
                    player.showCards(result.cards);
                    event.cards=result.cards;
                    'step 5'
                    player.addGaiPai(event.cards,'yanLing');
                }
            },
            zhenYanShu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    var yanLing=player.getGaiPai('yanLing');
                    var cards=[];
                    for(var i=0;i<yanLing.length;i++){
                        if(get.xiBie(yanLing[i])!='guang') cards.push(yanLing[i]);
                    }
                    return cards.length>0;
                },
                content:function(){
                    'step 0'
                    var yanLing=player.getGaiPai('yanLing');
                    player.chooseCardButton(yanLing,true,'選擇1個除光系外的【言靈】視為手牌使用').set('ai',function(card){
                        return Math.random();
                    }).set('filterButton',function(button){
                        return get.xiBie(button)!='guang';
                    });
                    'step 1'
                    player.storage.zhenYanShu=result.links[0];
                    'step 2'
                    player.chooseUseTarget(player.storage.zhenYanShu,true).set('action',true);
                },
                contentAfter:function(){
                    'step 0'
                    var card=player.storage.zhenYanShu;
                    var type=get.type(card);
                    var mingGe=get.mingGe(card);
                    var bool=false;
                    if(mingGe=='yong'||type=='faShu'){
                        bool=true;
                        event.bool=true;
                    }
                    if(!bool&&player.countZhiShiWu('miShu')>0){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否額外移除1點<span class='hong'>【秘術】</span>，對目標對手造成1點法術傷害③`);
                    }else if(!bool){
                        event.finish();
                    }
                    'step 1'
                    if(result.control=='是'){
                        player.removeZhiShiWu('miShu');
                    }
                    if(event.bool||result.control=='是'){
                        player.chooseTarget('對目標對手造成1點法術傷害③',true,function(card,player,target){
                            return player.side!=target.side;
                        }).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
                        });
                    }else{
                        event.finish();
                    }
                    'step 2'
                    var target=result.targets[0];
                    target.faShuDamage(1,player);
                },
                ai:{
                    order:3.9,
                    result:{
                        player:1,
                    }
                }
            },
            jinJiMiFa:{
                trigger:{player:'phaseBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('miShu')>=3;
                },
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('miShu',3);
                    var targets=await player.chooseTarget(2,true).set('ai',function(target){
                        var player=_status.event.player;
                        if(target.countCards('h')==0) return -1;
                        return player.side==target.side?1:0.5;
                    }).forResultTargets();
                    targets=targets.sortBySeat(player);
                    game.log(player,'選擇了',targets);
                    for(var target of targets){
                        if(target.countCards('h')>0){
                            let cards=await target.chooseToDiscard('h',true,'禁忌秘法：棄1張牌').forResultCards();
                            await player.showCards(cards);
                            await player.addGaiPai(cards,'yanLing');
                        }
                    }
                }
            },
            yaoJingMiShu:{
                usable:1,
                trigger:{player:['zhenYanShuContentAfterAfter','zhenYanYaZhiAfter']},
                filter:function(event,player){
                    return !event.selected;
                },
                content:function(){
                    'step 0'
                    trigger.selected=true;
                    player.addTempSkill('yaoJingMiShu_gongJi');
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        bool:true,
                        prompt:'妖精秘術：攻擊行動',
                    });
                },
                subSkill:{
                    gongJi:{
                        trigger:{player:'gongJiMingZhong'},
                        filter:function(event,player){
                            return event.getParent().bool;
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            player.addZhiShiWu('miShu',2);
                            player.removeSkill('yaoJingMiShu_gongJi');
                        }
                    }
                }
            },
            zhenYanYaZhi:{
                trigger:{player:'zhenYanShuContentAfterAfter'},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(event.selected) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    trigger.selected=true;
                    player.removeBiShaShuiJing();
                    player.chooseTarget(true,'對目標角色造成1點法術傷害③ ').set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 1'
                    var target=result.targets[0];
                    target.faShuDamage(1,player);
                    'step 2'
                    var yanLing=player.getGaiPai('yanLing');
                    var cards=[];
                    for(var i=0;i<yanLing.length;i++){
                        if(get.xiBie(yanLing[i])!='guang') cards.push(yanLing[i]);
                    }
                    var list=['是','否'];
                    if(cards.length>0){
                        player.chooseControl(list).set('prompt','是否立即執行一次【真言術】');
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(result.control=='是'){
                        player.useSkill('zhenYanShu');
                    }
                }
            },
            yanLing:{
                intro:{
					content:'gaiPai',
					markcount:'gaiPai',
                    show:true,
				},
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                direct:true,
                trigger:{player:'addGaiPaiAfter'},
                filter:function(event,player){
                    return player.countGaiPai('yanLing')>3;
                },
                content:function(){
                    'step 0'
                    var cards=player.getGaiPai('yanLing');
                    var next=player.chooseCardButton(cards,true,cards.length-3,`捨棄${cards.length-3}張【言靈】`);
                    'step 1'
                    player.discard(result.links,'yanLing').set('sheQi',true);
                }
            },
            miShu:{
                intro:{
                    content:'mark',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //染汙者
            shenQiZhiYi:{
                group:['shenQiZhiYi_kaiShi','shenQiZhiYi_huoDe','shenQiZhiYi_shangHai','shenQiZhiYi_shiYong'],
                subSkill:{
                    kaiShi:{
                        trigger:{global:'gameStart'},
                        forced:true,
                        content:function(){
                            player.addNengLiang('shuiJing',1);
                        }
                    },
                    huoDe:{
                        trigger:{player:"changeZhiLiaoBefore"},
                        forced:true,
                        filter:function(event,player){
                            return event.num>=0&&(!event.zhuanYi);
                        },
                        content:function(){
                            trigger.cancel();
                        }
                    },
                    shangHai:{
                        trigger:{source:"zaoChengShangHai"},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return event.player.zhiLiao>0;
                        },
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    shiYong:{
                        trigger:{player:'zhiLiao'},
                        firstDo:true,
                        forced:true,
                        content:function(){
                            trigger.cancel();
                        }
                    },
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return 0;
                    },
                    aiOrder:function(player,item,num){
                        if(get.type(item)!='faShu') return;
                        if(item.name=='zhongDu') return num+=0.5;
                        else return;
                    },
                },
                ai:{
                    noZhiLiao:true,
                }
            },
            liRuQuanYong:{
                usable:1,
                trigger:{player:['gongJiAfter','faShuAfter']},
                filter:function(event,player,name){
                    if(player.isHengZhi()) return false;
                    if(player.countZhiShiWu('liQi')>=2) return false;
                    if(name=='gongJiAfter') return get.is.gongJiXingDong(event);
                    else return true;
                },
                content:function(){
                    player.addZhiShiWu('liQi');
                    player.addGongJi();
                },
                check:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='gongJi')>0;
                }
            },
            kuangLiZhiXin:{
                trigger:{player:['phaseBegin','chengShouShangHaiAfter']},
                forced:true,
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    var num=get.info('liQi').intro.max;
                    return player.countZhiShiWu('liQi')>=num;
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'h',true);
                    'step 1'
                    var next=player.chooseTarget(1,true,'移除目標角色2點[治療]');
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side) return -1;
                        return target.zhiLiao;
                    });
                    'step 2'
                    result.targets[0].changeZhiLiao(-2);
                    'step 3'
                    player.hengZhi();
                },
                group:['kuangLiZhiXin_shangHai','kuangLiZhiXin_chongZhi'],
                subSkill:{
                    shangHai:{
                        trigger:{source:"zaoChengShangHai"},
                        forced:true,
                        priority:0.5,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    chongZhi:{
                        trigger:{player:"phaseEnd"},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi()&&player.countZhiShiWu('liQi')==0;
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            if(player.countNengLiang('shuiJing')>0){
                                player.removeNengLiang('shuiJing');
                            }else{
                                event.finish();
                            }
                            'step 2'
                            player.addNengLiang('baoShi',1);
                        }
                    }
                },
                mod:{
                    cardEnabled:function(card,player){
                        if(player.isHengZhi()&&card.name=='shengGuang'){
                            return false;
                        }else{
                            return;
                        }
                    }
                },

            },
            kuangLiZhiTi:{
                trigger:{player:'zaoChengShangHai'},
                forced:true,
                //priority:-1,
                filter:function(event,player){
                    return event.source&&player.isHengZhi()&&player.countZhiShiWu('liQi')>0;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('liQi');
                    'step 1'
                    trigger.changeDamageNum(1);
                    if(trigger.num>4){
                        trigger.num=4;
                    }
                }
            },
            shenZhiWuRan:{
                trigger:{source:'zaoChengShangHai'},
                priority:0.2,
                filter:function(event,player){
                    return event.source&&player.isHengZhi()&&player.countZhiShiWu('liQi')>0;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('liQi');
                    'step 1'
                    trigger.changeDamageNum(1);
                    trigger.canZhiLiao=false;
                }
            },
            niuQuZhiAi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var list=['普通形態','狂戾形態'];
                    player.chooseControl(list).set('prompt','選擇你的形態');
                    'step 2'
                    if(result.control=='狂戾形態'){
                        if(!player.isHengZhi()) player.hengZhi();
                    }else{
                        if(player.isHengZhi()) player.chongZhi();
                    }
                    'step 3'
                    var list=['棄2張牌','摸2張牌'];
                    player.chooseControl(list).set('prompt','選擇你的行動').set('ai',function(){
                        var player=_status.event.player;
                        if(!(player.canGongJi()||player.canFaShu())) return '摸2張牌';
                        if(player.countCards('h')+2>=player.getHandcardLimit()) return '棄2張牌';
                        else return '摸2張牌';
                    });
                    'step 4'
                    if(result.control=='棄2張牌'){
                        player.chooseToDiscard(2,'h',true);
                    }else{
                        player.draw(2);
                    }
                    'step 5'
                    var list=[0,1,2];
                    player.chooseControl(list).set('prompt',`選擇<span class='hong'>【戾氣】</span>的數量`).set('ai',function(){
                        return 1;
                    });
                    'step 6'
                    player.setZhiShiWu('liQi',result.control);
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    baoShi:1,
                }
            },
            liQi:{
                intro:{
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

        },
		
		translate:{
            jinGuiZhiNv:'矜貴之女',
            nvPuZhang:'女僕長',
            jieJieShi:'結界師',
            shenMiXueZhe:'神秘學者',
            ranWuZhe:'染汙者',
            shiShenZhe: "噬神者",

            jinGuiZhiNv_name:'艾麗卡',
            nvPuZhang_name:'千代（朧）',
            jieJieShi_name:'時音',
            shenMiXueZhe_name:'梅麗珊卓',
            ranWuZhe_name:'婕姬海德',
            shiShenZhe_name: "耶夢加得",

            //噬神者
            moRen: "魔刃",
            moRen_info:"<span class=\"greentext\">[被動]魔刃</span><br> <span class='tiaoJian'>(此卡視為手牌，若你擁有【魔刃】，使用、打出或棄置【魔刃】時)</span>你選擇此卡視為火系或水系的血類命格攻擊牌。<br><span class=\"greentext\">[被動]滲蝕</span><br><span class='tiaoJian'>(若你擁有【刃】，使用、打出或棄置【刃】時)</span>噬神者對你造成3點法術傷害③，然後移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁時)</span>對該角色造成1點法術傷害③，然後移除【刃】。            ",
            yiRen: "異刃",
            yiRen_info:"<span class=\"greentext\">[被動]異刃</span><br><span class='tiaoJian'>(此卡視為手牌，若你擁有【異刃】，使用、打出或棄置【異刃】時)</span>你選擇此卡視為雷系或風系的血類命格攻擊牌。<br><span class=\"greentext\">[被動]滲蝕</span><br><span class='tiaoJian'>(若你擁有【刃】，使用、打出或棄置【刃】時)</span>噬神者對你造成3點法術傷害③，然後移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁時)</span>對該角色造成1點法術傷害③，然後移除【刃】",
            renSkill_moRen: "[被動]魔刃",
            renSkill_yiRen: "[被動]異刃",
            shenShi: "[被動]滲蝕",
            renSkill_addToExpansion: "[被動]滲蝕",
            yuRen: "[啟動]御刃",
            "yuRen_info": "<span class='tiaoJian'>(當【魔刃】或【異刃】未在場時)</span>將【魔刃】或【異刃】加入你手牌[強制]。",
            qinKe: "[響應]侵刻",
            qinKe_info: "<span class='tiaoJian'>(使用【魔刃】或【異刃】攻擊命中時發動②)</span>將該卡加入攻擊目標手牌[強制]。",
            shiMie: "[響應]噬滅",
            shiMie_info: "<span class='tiaoJian'>(當你使用【魔刃】對目標角色攻擊時發動①，額外棄1張水系或火系牌[展示])</span>移除該攻擊目標1[治療]。",
            shangMie: "[響應]殤滅",
            shangMie_info: "<span class='tiaoJian'>(當你使用【異刃】對目標角色攻擊時發動①，額外棄1張風系或雷系牌[展示])</span>移除該攻擊目標外1名敵方角色1[治療]。",
            tongDiao: "[被動]同調",
            tongDiao_info: "<span class='tiaoJian'>(你觸發【滲蝕】時)</span>3點法術傷害變更為1點法術傷害。",
            ren: "(專)刃",
            ren_zhuanHuan1: "轉換刃系別",
            ren_zhuanHuan1_info: "轉化【刃】的系別",
            ren_zhuanHuan2: "轉換刃系別",
            ren_daChuQiZhi: "[被動]滲蝕",
            ren_biaoJi: "刃",
            ren_gaiPai: "[被動]滲蝕",
            ren_info: "<span class=\"greentext\">[被動]魔刃</span><br><span class='tiaoJian'>(此卡視為手牌，若你擁有【魔刃】，使用、打出或棄置【魔刃】時)</span>你選擇此卡視為火系或水系的血類命格攻擊牌。<br><span class=\"greentext\">[被動]異刃</span><br><span class='tiaoJian'>(此卡視為手牌，若你擁有【異刃】，使用、打出或棄置【異刃】時)</span>你選擇此卡視為雷系或風系的血類命格攻擊牌。<br><span class=\"greentext\">[被動]滲蝕</span><br><span class='tiaoJian'>(若你擁有【刃】，使用、打出或棄置【刃】時)</span>噬神者對你造成3點法術傷害③，然後移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁時)</span>對該角色造成1點法術傷害③，然後移除【刃】。",
            gongZhen: "[響應]共振",
            gongZhen_info: "[水晶]<span class='tiaoJian'>(任何人對你造成法術傷害時發動③，選擇2-3張同系牌)</span>棄置之[展示]；<span class='tiaoJian'>(若你將未在場的【魔刃】和/或【異刃】加入你手牌[強制])</span>對目標角色造成1點法術傷害③。",
            zhuShenZhongYan: "[法術]諸神終焉",
            "zhuShenZhongYan_info": "[寶石]你+1[水晶]，對自己造成2點法術傷害③，將場上的【魔刃】和【異刃】同時移除，然後對原持有【魔刃】和【異刃】的目標角色各造成3點法術傷害③；<span class='tiaoJian'>(若以此法同時移除【魔刃】和【異刃】)</span>對1名目標對手造成2點法術傷害③。",


            //矜貴之女
            gaoLingZhiHua:"[被動]高嶺之花",
            gaoLingZhiHua_info:"<span class='tiaoJian'>(你執行[提煉]時，若至少包含1[寶石])</span>你+1[水晶]。",
            moFaRuMen:"[法術]魔法入門",
            moFaRuMen_info:"你摸1張牌[強制][展示]，根據所展示的牌依序觸發相應效果：<span class='tiaoJian'>(若有法術牌)</span>對2名目標對手各造成1點法術傷害③，<span class='tiaoJian'>(若有X張詠類命格)</span>你對X名目標角色各造成1點法術傷害③，<span class='tiaoJian'>(若有X張水系牌)</span>指定X名目標角色各+1[治療]。",
            Magic:"[響應]Magic!",
            Magic_info:"<span class='tiaoJian'>(【魔法入門】展示牌觸發效果時發動)</span>你棄2張牌；<span class='tiaoJian'>([魔法入門]展示牌未觸發任何效果時發動)</span>你額外+1[法術行動]。 <span class='tiaoJian'>(本回合第3次[魔法入門]結算時發動)</span>我方[戰績區]+2[寶石]。",
            qiangYuYuanXing:"[啟動]強予願行",
            qiangYuYuanXing_info:"[水晶]將你的手牌調整為4張[強制]；<span class='tiaoJian'>(若你額外移除我方[戰績區]1星石)</span>將一名其他角色手牌調整為4張[強制]。",
            youQingJiBan:"[響應]友情羈絆[回合限定]",
            youQingJiBan_info:"[寶石]<span class='tiaoJian'>(發動【魔法入門】時發動)</span>將“你摸1張牌[強制][展示]”改為“我方2名角色各棄1張牌[強制][展示]，技能效果結束前各摸1張牌[強制]”。",

            //女僕長
            yingZhiXue:"[啟動]影之穴",
            yingZhiXue_info:"<span class='tiaoJian'>(移除1點</span><span class='hong'>【糸】</span><span class='tiaoJian'>)</span>將【風穴】轉移或放置於目標對手前，他棄1張牌。",
            miShuMuYing:"[響應]秘術·摹影",
            miShuMuYing_info:"<span class='tiaoJian'>(主動攻擊命中時發動②)</span>將本次攻擊牌面朝下放置在你角色旁作為【影】。",
            shun:"[響應]瞬·影·殺[回合限定]",
            shun_info:"<span class='tiaoJian'>(主動攻擊未命中時發動②，移除1個【影】)</span>額外+1[攻擊行動]，本回合你的主動攻擊無法應戰但無法發動【秘術·摹影】。",
            yingFeng:"[響應]影縫",
            yingFeng_info:"<span class='tiaoJian'>(持有【風穴】的目標對手回合開始時發動，移除X點</span><span class='hong'>【糸】</span><span class='tiaoJian'>，X<4)</span>他棄X張牌，你觀看並將其中1張棄牌面朝下放置在你角色旁作為【影】；<span class='tiaoJian'>(若因此棄牌數小於X)</span>對方士氣-1。",
            shiFengZhiDao:"[響應]侍奉之道",
            shiFengZhiDao_info:"<span class='tiaoJian'>(你的回合結束時發動，移除2個【影】[展示])</span>你+1<span class='hong'>【糸】</span>；<span class='tiaoJian'>(若移除的【影】系別相同)</span>將其中1個【影】交給目標角色[強制]，然後你[橫置][持續]。",
            jinShu:"[響應]禁術·影牢",
            jinShu_info:"<span class='tiaoJian'>(其他角色[特殊行動]結束時發動)</span>你+1<span class='hong'>【糸】</span>；<span class='tiaoJian'>(若你已[橫置]，額外移除3點</span><span class='hong'>【糸】</span><span class='tiaoJian'>)</span>[重置]，對目標對手造成2點法術傷害③或指定目標隊友棄1張牌。",
            fengXue:"(專)風穴",
            fengXue_info:`
            <span class="greentext">[被動]影之風</span><br>
            <span class='tiaoJian'>(若你擁有【風穴】，當你主動攻擊命中的攻擊牌置入棄牌堆時)</span>將該牌面朝下放置在女僕長角色旁作為【影】。 <span class='tiaoJian'>(你每次[攻擊行動]結束時)</span>女僕長+1<span class='hong'>【糸】</span>。<br>
            <span class="greentext">[響應]風止</span><br>
            <span class='tiaoJian'>(若你擁有【風穴】，你的回合結束時發動)</span>將手牌補到上限[強制]，棄2張牌，將棄牌面朝下放置在女僕長角色旁作為【影】，然後移除【風穴】。
            `,
            zhen:"[啟動]真·摹影",
            zhen_info:"[寶石]將2張手牌面朝下放置在你角色旁作為【影】。",
            ying:"影",
            ying_info:"【影】為女僕長專有蓋牌，上限為3。",
            mi:"糸",
            mi_info:"<span class='hong'>【糸】</span>為女僕長專有指示物，上限為4。",
            fengXueX_yingZhiFeng1_1:"",
            fengXueX_yingZhiFeng1_2:"影之風",
            fengXueX_yingZhiFeng2:"影之風",
            fengXueX_fengZhi:"風止",
            fengXueX_fengZhi_info:"<span class='tiaoJian'>(若你擁有【風穴】，你的回合結束時發動)</span>將手牌補到上限[強制]，棄2張牌，將棄牌面朝下放置在女僕長角色旁作為【影】，然後移除【風穴】。",


            //結界師
            jieJieYiShi:"[法術]結界儀式",
            jieJieYiShi_info:"<span class='tiaoJian'>(將2張手牌面朝上放置在你角色旁[展示]作為【結界】)</span>你+1<span class='hong'>【祭】</span>。",
            huangShenZhiLi:"[被動]荒神之力",
            huangShenZhiLi_info:"<span class='tiaoJian'>(當【結界】在場時)</span>所有與【結界】系別相同的攻擊傷害額外+1。",
            huangShenJiYi:"[響應]荒神祭儀",
            huangShenJiYi_info:"<span class='tiaoJian'>(目標角色主動攻擊時①，若攻擊的系別與【結界】相同)</span>你+1<span class='hong'>【祭】</span>；<span class='tiaoJian'>(若你額外移除3點</span><span class='hong'>【祭】</span><span class='tiaoJian'>)</span>你棄1張牌，移除1個【結界】並[橫置][持續]。",
            jinMoJing:"[法術]禁魔境",
            jinMoJing_info:"<span class='tiaoJian'>(移除1點</span><span class='hong'>【祭】</span><span class='tiaoJian'>)</span>將【絕界】轉移或放置在目標角色前，你棄1張牌。",
            liuLiJing:"[響應]琉璃境",
            liuLiJing_info:"<span class='tiaoJian'>(我方士氣下降時，若你已[橫置])</span>[重置]，我方【戰績區】+1[寶石]，指定1名目標角色棄1張牌[展示]，你可將棄牌面朝上放置在你角色旁作為【結界】。",
            jueJie:"(專屬)絕界",
            jueJie_info:`
            <span class="greentext">[被動]滅界破散</span><br>
            <span class='tiaoJian'>(結界師的【結界】為0時)</span>結界師[橫置]，移除【絕界】。 <span class='tiaoJian'>(擁有此卡的角色回合結束前)</span>結界師移除1個【結界】。<br>
            <span class="greentext">[響應]白二羯磨</span><br>
            <span class='tiaoJian'>(若你擁有【絕界】，你的[攻擊行動]結束時發動)</span>結界師+1<span class='hong'>【祭】</span>，你將1個【結界】加入手牌[強制]。<br>
            <span class="greentext">[被動]虛空境</span><br>
            <span class='tiaoJian'>(若你擁有【絕界】)</span>你擁有的基礎效果無法觸發。`,
            jueJieX_zero:"[被動]滅界破散",
            jueJieX_remove:"[響應]滅界破散",
            jueJieX_attack:"[響應]白二羯磨",
            jueJieX_wuFa:"[被動]虛空境",
            fuMoJing:"[響應]伏魔境",
            fuMoJing_info:"[水晶]<span class='tiaoJian'>(每當你</span><span class='hong'>【祭】</span><span class='tiaoJian'>增加時發動)</span>對目標對手造成1點法術傷害③；<span class='tiaoJian'>(若因此造成對方士氣下降，移除我方【戰績區】1星石)</span>你+1[水晶]。",
            jieJie:"結界",
            jieJie_info:"【結界】為結界師專有展示蓋牌，上限為2，不可替換；若【結界】>0，則不能發動【結界儀式】",
            jiX:"祭",
            jiX_info:"<span class='hong'>【祭】</span>為結界師專有指示物，上限為3。",

            //神秘學者
            yanLingShu:"[法術]言靈術",
            yanLingShu_info:"<span class='tiaoJian'>(將1-2張手牌面朝上放置在你角色旁[展示]作為【言靈】)</span>你摸1張牌[強制]；<span class='tiaoJian'>(摸牌後，若你額外棄1張與現存【言靈】系別相同的牌[展示])</span>你+1<span class='hong'>【秘術】</span>。",
            shouHuLing:"[被動]守護靈",
            shouHuLing_info:"<span class='tiaoJian'>(若【言靈】數>0，你被主動攻擊命中時②，其他角色結算效果前)</span>移除1個【言靈】；<span class='tiaoJian'>(若你</span><span class='hong'>【秘術】</span>數>0<span class='tiaoJian'>)</span>移除1點<span class='hong'>【秘術】</span>，將1張手牌面朝上放置在你角色旁[展示]作為【言靈】。",
            zhenYanShu:"[法術]真言術",
            zhenYanShu_backup:'[法術]真言術',
            zhenYanShu_info:"<span class='tiaoJian'>(將1個除光系外的【言靈】視為手牌使用)</span>執行相應的行動；<span class='tiaoJian'>(若使用的【言靈】為詠類命格或法術牌，或你額外移除1點</span><span class='hong'>【秘術】</span><span class='tiaoJian'>)</span>本次相應行動執行完成後，對目標對手造成1點法術傷害③。",
            jinJiMiFa:"[響應]禁忌秘法",
            jinJiMiFa_info:"<span class='tiaoJian'>(你的回合開始前，移除3點</span><span class='hong'>【秘術】</span><span class='tiaoJian'>發動)</span>指定2名目標角色各棄1張牌，你將棄牌面朝上放置在你角色旁[展示]作為【言靈】。",
            yaoJingMiShu:"[響應]妖精秘術[回合限定]",
            yaoJingMiShu_info:"<span class='tiaoJian'>(【真言術】或【真言壓制】結算後發動)</span>立即執行一次[攻擊行動]；<span class='tiaoJian'>(若本次執行的攻擊命中②)</span>你+2<span class='hong'>【秘術】</span>。",
            zhenYanYaZhi:"[響應]真言壓制",
            zhenYanYaZhi_info:"[水晶]<span class='tiaoJian'>(【真言術】結算後發動)</span>對目標角色造成1點法術傷害③，你可立即執行一次【真言術】。",
            yanLing:"言靈",
            yanLing_info:"【言靈】為神秘學者專有展示蓋牌，上限為3。",
            miShu:"秘術",
            miShu_info:"<span class='hong'>【秘術】</span>為神秘學者專有指示物，上限為4。",

            //染汙者
            shenQiZhiYi:"[被動]神棄之裔",
            shenQiZhiYi_info:"遊戲初始時，你+1[水晶]。你的[治療]上限為0[恆定]，你始終無法獲得或使用[治療]，你對擁有[治療]的角色傷害額外+1。",
            liRuQuanYong:"[響應]戾如泉湧[回合限定]",
            liRuQuanYong_info:"<span class='tiaoJian'>(僅【普通形態】下且你</span><span class='hong'>【戾氣】</span></span class='tiaoJian'>數<2，[攻擊行動]或[法術行動]結束後發動)</span>你+1<span class='hong'>【戾氣】</span>，額外+1[攻擊行動]。",
            kuangLiZhiXin:"[被動]狂戾之心[持續]",
            kuangLiZhiXin_info:"<span class='tiaoJian'>(你的回合開始時或承受傷害後⑥，且</span><span class='hong'>【戾氣】</span></span class='tiaoJian'>達到上限時)</span>你棄1張牌，指定目標角色移除2[治療]，[橫置]轉為【狂戾形態】，此形態下你無法使用[聖光]，你造成的傷害額外+1。 <span class='tiaoJian'>(你的回合結束時若</span><span class='hong'>【戾氣】</span></span class='tiaoJian'>數為0)</span>[轉正]脫離【狂戾形態】，將你的1[水晶]轉換為1[寶石]。",
            kuangLiZhiTi:"[被動]狂戾之體",
            kuangLiZhiTi_info:"<span class='tiaoJian'>(僅【狂戾形態】下且你</span><span class='hong'>【戾氣】</span></span class='tiaoJian'>數>0，目標角色對你造成傷害時③)</span>移除1點<span class='hong'>【戾氣】</span>，本次傷害額外+1，但傷害最高為4。",
            shenZhiWuRan:"[響應]神智汙染",
            shenZhiWuRan_info:"<span class='tiaoJian'>(僅【狂戾形態】下，你對目標角色造成傷害時發動③，移除1點</span><span class='hong'>【戾氣】</span></span class='tiaoJian'>)</span>本次傷害額外+1，本次你造成的傷害無法以[治療]抵禦。",
            niuQuZhiAi:"[啟動]扭曲之愛",
            niuQuZhiAi_info:"[寶石]調整你的形態為【普通形態】或【狂戾形態】，你棄2張牌或摸2張牌[強制]，並任意調整你的<span class='hong'>【戾氣】</span>數。",
            liQi:"戾氣",
            liQi_info:"<span class='hong'>【戾氣】</span>為汙染者專有指示物，上限為2。",
        },
	};
});
