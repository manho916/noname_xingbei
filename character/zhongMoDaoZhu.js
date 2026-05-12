import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'zhongMoDaoZhu',
		connect:true,
        characterSort:{
            zhongMoDaoZhu:{
                "4xing":['yiJiaoTu',],
                '4.5xing':['jiLuZhe','chuanJiaoShi',],
                "5xing":['zhuLvZhe','hongYiZhuJiao'],
            }
        },
        characterReplace:{
            zhuLvZhe:['zhuLvZhe','hongYiZhuJiao'],
            hongYiZhuJiao:['hongYiZhuJiao','zhuLvZhe'],
        },
		character:{
            zhuLvZhe:['zhuLvZhe_name','xueGroup',5,['shenLvFengSuo','shengXueZhiJi','wangCheYiWei','zuiDuanHuoMian','shengYinSongEn','wangQuanBaoZhu','xinYangChongZhu','shengYiWu','yinZhiZiDan'],['forbidai']],
            hongYiZhuJiao:['zhuLvZhe_name','shengGroup',5,['shengYueYinQi','quMoShi','daoGaoShi','quanNengNiWei','shenXuanDaoYan','shengDian','shengYiWu','yinZhiZiDan']],
            jiLuZhe:['jiLuZhe_name','huanGroup','4/5',['chuanShuoZhiDi','zhiXingHeYi','jiGuShiDian','yiJiLunPo','xuanCuiJingLian','miJingWanXiang','shiShu','guJinHuzheng','yiJi','shiLiao']],
            chuanJiaoShi:['chuanJiaoShi_name','shengGroup','4/5',['shenDeMenTu','xinYangZhiLu','chuanDao','qiShi','shiFeng','luBiao','shuLingEnCi','miSa','qianCheng']],
            yiJiaoTu:['yiJiaoTu_name','huanGroup',4,['yiDuanXieShuo','shenPanYJT','xianJi','moRiYuYan','fangZhu','tanLan','yuYan']],
		},
        characterIntro: {
            zhuLvZhe:`紅衣主教對於教義的理解總是那麼深刻，有的時候是一人之下萬人之上的紅衣主教，而有的時候卻是鐵血暗流的鑄律者。而他真正的目的，只有他自己知曉~`,
            hongYiZhuJiao:`有的時候是一人之下萬人之上的紅衣主教，而有的時候卻是鐵血暗流的鑄律者。而他真正的目的，只有他自己知曉~`,
            jiLuZhe:`多拉貢幻，一個落後於時代的記錄者罷了~想要了解麼？嘗試讀懂字裡行間的意義吧`,
            chuanJiaoShi:`侍奉、彌撒、啟示、傳道，伊麗莎白在自己的信仰之路上永不停歇。她堅信自己虔誠的路標不會改變。`,
            yiJiaoTu:`神的使者終究會降臨到這個世界，這個世界終究毀滅，只有堅定的信徒才能跟著神使前往新的世界。`,
		},
        card: {
            shiShuCard:{
                //type: "gongJi",
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
            }
        },
        
        skill: {
            chuanShuoZhiDi:{
                trigger:{global:'gameStart'},
                forced:true,
                content:async function (event,trigger,player){
                    for(var current of game.players) current.update();
                    var cards=get.cards(3);
                    await player.addGaiPai(cards,'yiJi');
                    await player.showHiddenCards(cards);
                }
            },
            zhiXingHeYi:{
                type:'faShu',
                enable:'faShu',
                content:async function (event,trigger,player){
                    var cards=get.cards(2);
                    await game.cardsGotoOrdering(cards);
                    await player.showHiddenCards(cards);
                    var next=player.chooseCardButton(cards);
                    next.set('prompt','你可選擇1張牌打出，並棄1張牌');
                    next.set('filterButton',function(button){
                        var player=_status.event.player;
                        for(var current of game.players){
                            if(player.canUseXingBei(button.link,current)) return true;
                        }
                        return false;
                    });
                    next.set('ai',function(button){
                        return get.value(button.link);
                    });
                    var result=await next.forResult();
                    if(result.bool){
                        cards.remove(result.links[0]);
                        await player.chooseToDiscard('h',true);
                        await player.chooseUseTarget(result.links[0],true);
                    }
                    await player.addZhiShiWu('shiLiao',cards.length);
                },
                ai:{
                    order:3.4,
                    result:{
                        player:1,
                    }
                }
            },
            jiGuShiDian:{
                trigger:{player:'changeZhiShiWuAfter'},
                forced:true,
                filter:function (event,player){
                    return event.zhiShiWu=='shiLiao'&&player.countZhiShiWu('shiLiao')>=lib.skill.shiLiao.intro.max;
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('shiLiao',player.countZhiShiWu('shiLiao'));
                    await player.chooseToDiscard('h',true);
                    if(!player.hasSkill('shiShuX')){
                        player.addSkill('shiShuX');
                    }
                    if(!player.hasCard(card=>get.name(card)=='shiShuCard')){
                        var card=game.createCard('shiShuCard','','');
                        game.broadcastAll(function(card){
                            card.$init(['di','huan',card.name]);
                        },card);
                        await player.gain(card,'gain2').set('skill','jiGuShiDian');
                    }
                }
            },
            yiJiLunPo:{
                usable:1,
                trigger:{player:'gongJiShi'},
                filter:function (event,player){
                    return player.getGaiPai('yiJi').length>0&&event.yingZhan!=true;s
                },
                cost: async function (event,trigger,player){
                    event.list=player.getGaiPai('yiJi');
                    event.chuLi=[];
                    for(var card of event.list){
                        let fakeCard=game.createCard(card.name,card.xiBie,card.mingGe,card.duYou);
                        fakeCard.storage.oriCard=card;
                        event.chuLi.push(fakeCard);
                    }
                    event.xiBie=get.xiBie(trigger.card);
                    await event.trigger('yiJiLunPo');
                    let num=0;
                    for(var card of event.chuLi){
                        if(get.xiBie(card)==_status.event.xiBie) num++;
                    }
                    let type='';
                    if(event.length==1) type='one';
                    else if(num>1) type='tongXi';
                    var next=player.chooseCardButton(event.chuLi,[1,Infinity],`是否發動【遺蹟論破】<br><span class='tiaoJian'>(移除與攻擊牌同系的X個【遺蹟】)</span>本次攻擊傷害額外+(X-1)；<span class='tiaoJian'>(若X>1)</span>額外+1[法術行動]；<span class='tiaoJian'>(若因此使【遺蹟】數減少為0)</span>我方【戰績區】+1[寶石]。`);
                    next.set('select',[1,Infinity]);
                    next.set('filterButton',function(button){
                        return get.xiBie(button.link)==_status.event.xiBie;
                    });
                    next.set('xiBie',event.xiBie);
                    next.set('ai',function(button){
                        var type=_status.event.type;
                        if(type=='one') return 1;
                        else if(type=='tongXi') return 1;
                        else return 0;
                    });
                    next.set('type',type);
                    var result=await next.forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:async function (event,trigger,player){
                    var list=[];
                    for(var card of event.cost_data){
                        list.push(card.storage.oriCard);
                    }
                    await player.discard(list,'yiJi');
                    var num=event.cost_data.length;
                    if(num>1){
                        trigger.changeDamageNum(num-1);
                        player.addFaShu();
                    }
                    if(player.getGaiPai('yiJi').length==0) await player.addZhanJi('baoShi');
                }
            },
            xuanCuiJingLian:{
                trigger:{player:'yiJiLunPo'},
                getIndex(event,player) {
                    const cards = event.chuLi;
                    var list=[];
                    for(var card of cards){
                        let xiBie=get.xiBie(card);
                        if(xiBie=='an'||xiBie=='guang') list.push(card);
                    }
                    return list;
                },
                filter:function (event,player){
                    const cards = event.chuLi;
                    var list=[];
                    for(var card of cards){
                        let xiBie=get.xiBie(card);
                        if(xiBie=='an'||xiBie=='guang') list.push(card);
                    }
                    return list.length>0; 
                },
                cost: async function (event,trigger,player){
                    var list=lib.xiBie.slice();
                    list.push('cancel2');
                    var dialog = ["選淬精煉：選擇視為的系別",[[event.indexedData], "card"]];
                    var next=player.chooseControl(list);
                    next.set('dialog',dialog);
                    next.set('xiBie',trigger.xiBie);
                    next.set('ai',function(){
                        var xiBie=_status.event.xiBie;
                        return xiBie;
                    })
                    var control=await next.forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:async function (event,trigger,player){
                    game.broadcastAll(function(card,xiBie){
                        game.setXiBie(card,xiBie);
                        card.$init([card.xiBie,card.mingGe,card.name,card.duYou]);
                    },event.indexedData,event.cost_data);
                }
            },
            miJingWanXiang:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    return player.hasCard(function(card){
                        return get.name(card)=='shiShuCard';
                    });
                },
                content:async function (event,trigger,player){
                    var card=player.getCards('h',function(card){
                        return get.name(card)=='shiShuCard';
                    })[0];
                    await player.lose(card);
                    card.fix();
                    card.remove();
                    card.destroyed = true;
                    game.log(card, "被移除了");
                    await player.discard(player.getGaiPai('yiJi'),'yiJi');
                    var cards=[];
                    while(!(get.countTongXiPai(cards)>=2)){
                        let card=get.cards()[0];
                        await player.showHiddenCards([card]);
                        cards.push(card);
                    }
                    await player.addGaiPai(cards,'yiJi');
                    if(cards.length>3){
                        let num=Math.min(cards.length-3,game.countPlayer());
                        var targets=await player.chooseTarget(true,num,`對${num}名目標角色造成2點法術傷害③。`).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,2);
                        }).forResultTargets();
                        targets.sortBySeat();
                        for(var target of targets){
                            await target.faShuDamage(2,player);
                        }
                    }
                },
                ai:{
                    order:3.4,
                    result:{
                        player:function(player){
                            if(player.getGaiPai('yiJi').length<=3) return 1;
                            else return 0;
                        }
                    }
                }
            },
            shiShu:{},
            shiShuX:{
                group:['shiShuX_yiShiWeiJing','shiShuX_yinJiBianJian','shiShuX_mod','shiShuX_cardsDiscardEnd'],
                subSkill:{
                    mod:{
                        priority:-1,//mod技能生效也分優先級
                        mod:{
                            cardType:function(card,player,type){
                                if(card.name=='shiShuCard') return 'gongJi';
                            },
                            cardMingGe:function(card,player,mingGe){
                                if(card.name=='shiShuCard') return 'huan';
                            },
                            cardXiBie:function(card,player,xiBie){
                                if(card.name=='shiShuCard') return 'di';
                            },
                        },
                    }, 
                    yiShiWeiJing:{
                        forced:true,
                        trigger:{player:['daChuPai','discard','loseEnd'],global:'gainEnd'},
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'shiShuCard') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player,name){
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='shiShuCard'){
                                    bool=true;
                                    break;
                                }
                            }
                            if(bool&&name=='gainEnd'&&event.skill=='jiGuShiDian') return false;
                            
                            return bool;
                        },
                        content: async function(event, trigger, player){
                            trigger.cards.remove(event.indexedData);
                            game.broadcastAll(function(card){
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                            }, event.indexedData);
                            game.log(event.indexedData, "被移除了");
                        }
                    },
                    yinJiBianJian:{
                        trigger:{player:'gongJiShi'},
                        filter:function (event,player){
                            return get.name(event.card)=='shiShuCard'&&event.yingZhan!=true;
                        },
                        content:async function (event,trigger,player){
                            var cards=await trigger.target.chooseCard('h',true).forResultCards();
                            if(cards.length>0){
                                let next=player.addGaiPai(cards,'yiJi');
                                await next;
                            }

                            var cards=player.getGaiPai('yiJi');
                            if(player.countCards('h')==0||cards.length==0) return;
                            var next = player.chooseToMove("引稽編鑑：是否將手上X張牌與X個【遺蹟】交換，X<3");
                            next.set("list", [
                                ["遺蹟", cards],
                                ["手牌", player.getCards("h")],
                            ]);
                            next.set("filterMove", function (from, to, moved) {
                                if (typeof to == "number") return false;
                                var player = _status.event.player;
                                var hs = player.getCards("h");
                                var changed = hs.filter(function (card) {
                                    return !moved[1].includes(card);
                                });
                                var changed2 = moved[1].filter(function (card) {
                                    return !hs.includes(card);
                                });
                                if (changed.length < 2) return true;
                                var pos1 = moved[0].includes(from.link) ? 0 : 1,
                                    pos2 = moved[0].includes(to.link) ? 0 : 1;
                                if (pos1 == pos2) return true;
                                if (pos1 == 0) {
                                    if (changed.includes(from.link)) return true;
                                    return changed2.includes(to.link);
                                }
                                if (changed2.includes(from.link)) return true;
                                return changed.includes(to.link);
                            });
                            var result=await next.forResult();
                            if(!result.moved) return;
                            var pushs = result.moved[0],
                                gains = result.moved[1];
                            pushs.removeArray(player.getGaiPai("yiJi"));
                            gains.removeArray(player.getCards("h"));
                            if (!pushs.length || pushs.length != gains.length) return;
                            await player.lose(pushs);
                            await player.lose(gains);
                            await player.addGaiPai(pushs,'yiJi');
                            game.log(player,`獲得了${gains.length}張牌`);
                            await player.gain(gains, "draw");
                        }
                    },
                    cardsDiscardEnd:{
                        trigger:{global:'cardsDiscardEnd'},
                        direct:true,
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'shiShuCard') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player){
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='shiShuCard'){
                                    bool=true;
                                    break;
                                }
                            }
                            
                            return bool;
                        },
                        content: async function(event, trigger, player){
                            trigger.cards.remove(event.indexedData);
                            game.broadcastAll(function(card){
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                            }, event.indexedData);
                            game.log(event.indexedData, "被移除了");
                        }
                    },
                }
            },
            guJinHuzheng:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.addZhiShiWu('shiLiao',2);
                    if(player.countCards('h')>=2&&player.getGaiPai('yiJi').length>0){
                        var cards=player.getGaiPai('yiJi');
                            var next = player.chooseToMove("古今互鑑：是否將2張手牌與X個【遺蹟】交換，X>0");
                            next.set("list", [
                                ["遺蹟", cards],
                                ["手牌", player.getCards("h")],
                            ]);
                            next.set("filterMove", function (from, to, moved) {
                                var player = _status.event.player;
                                //交換前
                                if (moved[0].length < 2||moved.length==0) return true;
                                var h=player.getCards("h");
                                var yiJi = player.getGaiPai("yiJi");
                                if(typeof to != "number"){
                                    //交換回去
                                    if((moved[0].includes(from.link)&&moved[1].includes(to.link))||moved[0].includes(to.link)&&moved[1].includes(from.link)) return true;
                                    //遺蹟間交換
                                    if(yiJi.includes(from.link)&&yiJi.includes(to.link)) return true;
                                    //手牌間交換
                                    if (h.includes(from.link) == h.includes(to.link)) return true;
                                    //移動後，移動的牌在遺蹟區交換
                                    if(moved[0].includes(from.link)&&yiJi.includes(to.link)) return true;
                                    if(moved[0].includes(to.link)&&yiJi.includes(from.link)) return true;
                                    //移動後，移動的牌在手牌區交換
                                    if(moved[1].includes(from.link)&&h.includes(to.link)) return true;
                                    if(moved[1].includes(to.link)&&h.includes(from.link)) return true;
                                }else if(to==1){
                                    return true;
                                }else if(to==0){//移動到遺蹟區
                                    if(yiJi.includes(from.link)) return true;
                                    return moved[0].length <2
                                }
                            });
                            next.set('filterOk',function(moved){
                                var player=_status.event.player;
                                var pushs = moved[0],
                                    gains = moved[1];
                                pushs.removeArray(player.getGaiPai("yiJi"));
                                gains.removeArray(player.getCards("h"));
                                return pushs.length==2&&gains.length>0;
                            });
                            var result=await next.forResult();
                            if(!result.moved) return;
                            var pushs = result.moved[0],
                                gains = result.moved[1];
                            if (!pushs.length) return;
                            await player.lose(pushs);
                            await player.lose(gains);
                            await player.addGaiPai(pushs,'yiJi');
                            await player.gain(gains, "draw");
                    }
                },
                check:function (event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }

            },
            yiJi:{
                intro:{
                    content:'expansion',
                    markcount:'expansion',
                    show:true,
                },
                trigger:{player:'addGaiPaiAfter'},
                direct:true,
                filter:function (event,player){
                    return event.gaiPai=='shiShu'&&player.getGaiPai('shiShu').length>8;
                },
                content:async function (event,trigger,player){
                    var list=player.getGaiPai('shiShu');
                    var next=player.chooseCardButton(list,true,list.length-8);
                    next.set('prompt',`捨棄${list.length-8}張【遺蹟】`);
                    var result=await next.forResult();
                    player.discard(result.links);
                }
            },
            shiLiao:{
                intro:{
                    max:3,
                    content:'mark',
                },
                markimage:'image/card/zhiShiWu/hong.png',
                onremove:'storage',
            },

            shenLvFengSuo:{
                trigger:{player:'changeZhiLiaoEnd'},
                forced:true,
                filter:function (event,player){
                    return event.num>0;
                },
                content:function (){
                    var shiQi=get.shiQi(player.side);
                    if(shiQi>1){
                        player.changeShiQi(-1);
                    }
                },
                onremove: function (){
                   if(lib.skill.global.includes('shenLvFengSuo_shangXian')){ 
                        game.removeGlobalSkill('shenLvFengSuo_shangXian');
                        for(var current of game.players){
                            current.update();
                        }
                    } 
                },
                //global:'shenLvFengSuo_shangXian',
                group:'shenLvFengSuo_zhiLiao',
                subSkill:{
                    shangXian:{
                        mod:{
                            maxHandcard:function (player,num){
                                if(player.zhiLiao==0){
                                    return num-1;
                                }
                            }
                        }
                    },
                    zhiLiao:{
                        trigger:{player:'changeZhiLiaoEnd'},
                        direct:true,
                        init:function (player){
                            var flag=false;
                            if(player.zhiLiao<player.getZhiLiaoLimit()&&!lib.skill.global.includes('shenLvFengSuo_shangXian')){
                                game.addGlobalSkill('shenLvFengSuo_shangXian');
                                flag=true;
                            }else if (player.zhiLiao>=player.getZhiLiaoLimit()&&lib.skill.global.includes('shenLvFengSuo_shangXian')){
                                game.removeGlobalSkill('shenLvFengSuo_shangXian');
                                flag=true;
                            }
                            if(flag){
                                for(var current of game.players){
                                    current.update();
                                }
                            }
                        },
                        priority:-0.1,
                        content:async function (event,trigger,player){
                            var flag=false;
                            if(player.zhiLiao<player.getZhiLiaoLimit()&&!lib.skill.global.includes('shenLvFengSuo_shangXian')){
                                game.addGlobalSkill('shenLvFengSuo_shangXian');
                                flag=true;
                            }else if (player.zhiLiao>=player.getZhiLiaoLimit()&&lib.skill.global.includes('shenLvFengSuo_shangXian')){
                                game.removeGlobalSkill('shenLvFengSuo_shangXian');
                                flag=true;
                            }
                            if(flag){
                                for(var current of game.players){
                                    current.update();
                                }
                            }
                        }
                    }
                }
            },
            shengXueZhiJi:{
                trigger:{source:'gongJiMingZhong'},
                forced:true,
                filter:function (event,player){
                    return event.yingZhan!=true;
                },
                content:function (){
                    trigger.changeDamageNum(1);
                    player.changeZhiLiao(1);
                }
            },
            wangCheYiWei:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2;
                },
                selectTarget:[1,2],
                filterTarget:function (card,player,target){
                    return target.zhiLiao>0;
                },
                filterOk:function (){
                    var num=0;
                    var players=ui.selected.targets;
                    for(var player of players){
                        num+=player.zhiLiao;
                    }
                    return num>=2;
                },
                contentBefore:function (){
                    player.addZhiShiWu('yinZhiZiDan',2);
                },
                content:function (){
                    if(targets.length==1){
                        target.changeZhiLiao(-2);
                    }else if(targets.length==2){
                        target.changeZhiLiao(-1);
                    }
                },
                contentAfter:async function (event,trigger,player){
                    var list=player.jiChuXiaoGuoList();
                    if(list.length>0){
                        for(var xiaoGuo of list){
                            let cards=player.getGaiPai(xiaoGuo);
                            await player.loseToDiscardpile(cards);
                            if(xiaoGuo=='_zhongDu') player.storage.zhongDu=[];
                        }
                    }
                    if(player.zhiLiao>0) await player.changeZhiLiao(-player.zhiLiao);
                    await player.reinitCharacter(player.name1,'hongYiZhuJiao');
                    player.addGongJi();
                },
                ai:{
                    order:3.1,
                    result:{
                        target:function(player,target){
                            return -target.zhiLiao;
                        },
                    }
                }
            },
            zuiDuanHuoMian:{
                trigger:{global:'changeShiQiBefore'},
                filter:function (event,player){
                    if(event.side!=player.side) return false;
                    return player.hasZhiShiWu('shengYiWu')&&event.num<0&&event.cause!='damage';
                },
                cost: async function (event,trigger,player){
                    var list=[];
                    for(var i=1;i<=player.countZhiShiWu('shengYiWu');i++){
                        if(i>-trigger.num) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var next=player.chooseControl(list);
                    next.set('prompt',get.prompt('zuiDuanHuoMian'));
                    next.set('prompt2',lib.translate.zuiDuanHuoMian_info);
                    next.set('num',list.length);
                    next.set('ai',function(){
                        return _status.event.num-2;
                    });
                    var control=await next.forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    };
                },
                content:async function (event,trigger,player){
                    trigger.num+=event.cost_data;
                    await player.changeZhiShiWu('shengYiWu',-event.cost_data);
                    await player.addZhiShiWu('yinZhiZiDan',event.cost_data);
                }
            },
            shengYinSongEn:{
                trigger:{player:'gongJiEnd'},
                usable:1,
                filter:function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>=2&&event.yingZhan!=true;
                },
                cost: async function (event,trigger,player){
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('shengYinSongEn'));
                    next.set('prompt2',lib.translate.shengYinSongEn_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    player.addGongJi();
                    await player.removeZhiShiWu('yinZhiZiDan',2);
                    await event.targets[0].changeZhiLiao(1);
                }
            },
            wangQuanBaoZhu:{},
            wangQuanBaoZhuX:{
                global:['wangQuanBaoZhuX_biaoJi','wangQuanBaoZhuX_shengLvWeiYa','wangQuanBaoZhuX_shenYanYongZan1','wangQuanBaoZhuX_shenYanYongZan2'],
                wangQuanBaoZhu:async function (player,cards,source,type='fangZhi'){
                    var next=game.createEvent('wangQuanBaoZhu');
                    next.setContent('addToExpansion');
                    next.set('player',player);
                    next.set('cards',cards);
                    next.set('gaintag',['wangQuanBaoZhuX_biaoJi']);
                    next.set('animate','gain2');
                    next.set('source',source);
                    next.set('log',true);
                    next.set('type',type);
                    next.getd = function (player, key, position) {
                        if (!position) position = ui.discardPile;
                        if (!key) key = "cards";
                        var cards = [],
                            event = this;
                        game.checkGlobalHistory("cardMove", function (evt) {
                            if (evt.name != "lose" || evt.position != position || evt.getParent() != event) return;
                            if (player && player != evt.player) return;
                            cards.addArray(evt[key]);
                        });
                        return cards;
                    };
                    next.getl = function (player) {
                        const that = this;
                        const map = {
                            player: player,
                            hs: [],
                            es: [],
                            js: [],
                            ss: [],
                            xs: [],
                            cards: [],
                            cards2: [],
                            gaintag_map: {},
                            vcard_map: new Map(),
                        };
                        player.checkHistory("lose", function (evt) {
                            if (evt.parent == that) {
                                map.hs.addArray(evt.hs);
                                map.es.addArray(evt.es);
                                map.js.addArray(evt.js);
                                map.ss.addArray(evt.ss);
                                map.xs.addArray(evt.xs);
                                map.cards.addArray(evt.cards);
                                map.cards2.addArray(evt.cards2);
                                for (let key in evt.gaintag_map) {
                                    if (!map.gaintag_map[key]) map.gaintag_map[key] = [];
                                    map.gaintag_map[key].addArray(evt.gaintag_map[key]);
                                }
                                evt.vcard_map.forEach((value, key) => {
                                    map.vcard_map.set(key, value);
                                });
                            }
                        });
                        return map;
                    };
                    return next;
                },
                subSkill:{
                    biaoJi:{
                        intro:{
                            content:'expansion',
                            nocount:true,
                        },
                        markimage:'image/card/zhuanShu/wangQuanBaoZhu.png',
                    },
                    shengLvWeiYa:{
                        trigger:{player:'wangQuanBaoZhuAfter'},
                        filter:function (event,player){
                            return player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                            //return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        forced:true,
                        content:async function (event,trigger,player){
                            if(player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0){
                                var type=get.type(trigger.cards[0]);
                                var next=player.chooseCard('h',card=>get.type(card)==_status.event.type);
                                next.set('ai',function(card){
                                    var player=_status.event.player;
                                    if(player.side!=player.storage.wangQuanBaoZhuX_player.side&&player.countCards('h')+2<=player.getHandcardLimit()) return 0;
                                    return 8-get.value(card);
                                });
                                next.set('type',type);
                                next.set('prompt',`請選擇一張與【王權寶珠】上牌種類<span class='tiaoJian'>(${get.translation(type)||'無類別'})</span>相同的牌,棄置之[展示],否則摸2張牌，鑄律者陣營士氣-1，若【聖遺物】數<1移除此卡`);
                                var result=await next.forResult();
                            }else var result={bool:false};
                            
                            if(result.bool){
                                await player.discard(result.cards[0],'showCards');
                            }else{
                                await player.draw(2);
                                await player.changeShiQi(-1,player.storage.wangQuanBaoZhuX_player.side);
                                if(player.storage.wangQuanBaoZhuX_player.countZhiShiWu('shengYiWu')<1){
                                    await player.loseToDiscardpile(player.getExpansions('wangQuanBaoZhuX_biaoJi'));
                                    player.storage.wangQuanBaoZhuX_player.removeSkill('wangQuanBaoZhuX');
                                }
                            }
                        }
                    },
                    shenYanYongZan1:{
                        trigger:{player:'wangQuanBaoZhuX_shengLvWeiYaAfter'},
                        forced:true,
                        filter:function (event,player){
                            return player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        content:async function (event,trigger,player){
                            await lib.skill.wangQuanBaoZhuX.wangQuanBaoZhu(player.getNext(),player.getExpansions('wangQuanBaoZhuX_biaoJi'),player,'zhuanYi');
                        },
                    },
                    shenYanYongZan2:{
                        trigger:{player:'wangQuanBaoZhuEnd'},
                        forced:true,
                        filter:function (event,player){
                            return player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0&&event.type=='zhuanYi'&&player.name=='zhuLvZhe';
                            //return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0&&event.type=='zhuanYi'&&player.name=='zhuLvZhe';
                        },
                        content:async function (event,trigger,player){
                            var choiceList=["將角色卡替換為【紅衣主教】，然後移除此卡","<span class='tiaoJian'>(移除X點</span><span class='hong'>【銀製子彈】</span><span class='tiaoJian'>，X<3)</span>目標角色摸X張牌[強制]，然後移除此卡"];
                            var list=['選項一'];
                            if(player.hasZhiShiWu('yinZhiZiDan')) list.push('選項二');
                            var next=player.chooseControl(list);
                            next.set('choiceList',choiceList);
                            next.set('ai',function(){
                                if(_status.event.bool) {
                                    var num=Math.random();
                                    if(num<0.5) return 0;
                                    return 1;
                                }
                                return 0;
                            });
                            next.set('bool',list.length>1);
                            var control=await next.forResultControl();
                            if(control=='選項一'){
                                await player.reinitCharacter(player.name1,'hongYiZhuJiao');
                            }else if(control=='選項二'){
                                let list=[];
                                for(let i=1;i<=player.countZhiShiWu('yinZhiZiDan');i++){
                                    if(i>=3) break;
                                    list.push(i);
                                }
                                let control=await player.chooseControl(list).set('prompt','移除X點【銀製子彈】，目標角色摸X張牌').forResultControl();
                                await player.changeZhiShiWu('yinZhiZiDan',-control);
                                var targets=await player.chooseTarget(true,`目標角色摸${control}張牌`).set('ai',function(target){
                                    var player=_status.event.player;
                                    if(player.side==target.side) return 0;
                                    else return target.countCards('h');
                                }).forResultTargets();
                                await targets[0].draw(control); 
                            }
                            await player.loseToDiscardpile(player.getExpansions('wangQuanBaoZhuX_biaoJi'));
                            player.storage.wangQuanBaoZhuX_player.removeSkill('wangQuanBaoZhuX');
                        },
                    }
                },
                
            },
            xinYangChongZhu:{
                trigger:{player:'phaseEnd'},
                filter:function (event,player){
                    return player.canBiShaShuiJing()&&!event.teShu&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h');
                    next.set('ai',function(card){
                        return 8-get.value(card);
                    });
                    next.set('prompt',get.prompt('xinYangChongZhu'));
                    next.set('prompt2',lib.translate.xinYangChongZhu_info);
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.lose(event.cards);
                    await player.showCards(event.cards);
                    await player.draw();
                    await player.addZhiShiWu('shengYiWu',2);
                    if(!player.hasSkill('wangQuanBaoZhuX')) player.addSkill('wangQuanBaoZhuX');
                    for(var current of game.players) current.storage.wangQuanBaoZhuX_player=player;
                    await lib.skill.wangQuanBaoZhuX.wangQuanBaoZhu(player,event.cards,player,'gain2');
                },
                group:'xinYangChongZhu_teShu',
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
                }
            },
            shengYiWu:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/lan.png',
            },
            yinZhiZiDan:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/hong.png',
            },

            shengYueYinQi:{
                forced:true,
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function (event,player,name){
                    if(name=='gongJiEnd') return event.yingZhan!=true;
                    return true;
                },
                content:function (){
                    player.addZhiShiWu('yinZhiZiDan');
                }
            },
            quMoShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>=2;
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('yinZhiZiDan',2);
                    var targets=await player.chooseTarget(true,'我方目標角色棄1張牌',function(card,player,target){
                        return player.side==target.side;
                    }).set('ai',function(target){
                        return target.countCards('h');
                    }).forResultTargets();
                    var cards=await targets[0].chooseToDiscard('he',true,'showCards').forResultCards();
                    if(get.mingGe(cards[0])=='sheng'){
                        await player.changeZhiLiao(1);
                        await player.draw();
                    }
                },
                check:function (event,player){
                    return player.countCards('h')>2&&(player.canGongJi()||player.canFaShu());
                }
            },
            daoGaoShi:{
                trigger:{player:'gongJiBefore'},
                filter:function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>0&&event.yingZhan!=true;
                },
                cost: async function (event,trigger,player){
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('daoGaoShi'));
                    next.set('prompt2',lib.translate.daoGaoShi_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('yinZhiZiDan');
                    await event.targets[0].changeZhiLiao(1);
                }
            },
            quanNengNiWei:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2||player.countZhiShiWu('yinZhiZiDan')>=1;
                },
                selectTarget:[0,2],
                filterTarget:function (card,player,target){
                    return target.zhiLiao>0&&player.side==target.side;
                },
                filterOk:function (){
                    if(ui.selected.targets.length==0){
                        var player=_status.event.player;
                        return player.countZhiShiWu('yinZhiZiDan')>=1;
                    }else{
                        var num=0;
                        var players=ui.selected.targets;
                        for(var player of players){
                            num+=player.zhiLiao;
                        }
                        return num>=2;
                    }
                },
                content:async function (event,trigger,player){
                    if(event.targets.length==0){
                        await player.removeZhiShiWu('yinZhiZiDan');
                    }else if(event.targets.length==1){
                        await event.target.changeZhiLiao(-2);
                    }else if(event.targets.length==2){
                        await event.target.changeZhiLiao(-1);
                    }
                },
                contentAfter:async function (event,trigger,player){
                    await player.addZhiShiWu('shengYiWu',2);
                    var list=player.jiChuXiaoGuoList();
                    if(list.length>0){
                        for(var xiaoGuo of list){
                            let cards=player.getJiChuXiaoGuo(xiaoGuo);
                            await player.loseToDiscardpile(cards);
                            if(xiaoGuo=='_zhongDu') player.storage.zhongDu=[];
                        }
                    }
                    if(player.zhiLiao>0) await player.changeZhiLiao(-player.zhiLiao);
                    if(player.countCards('h')>4) player.chooseToDiscard('h',true,player.countCards('h')-4);
                    await player.reinitCharacter(player.name1,'zhuLvZhe');
                },
                ai:{
                    order:3.1,
                    result:{
                        player:1
                    }
                }
            },
            shenXuanDaoYan:{
                trigger:{global:'changeShiQiBefore'},
                filter:function (event,player){
                    if(event.side!=player.side) return false;
                    return player.hasZhiShiWu('shengYiWu')&&event.num<0&&event.cause!='damage';
                },
                content:async function (event,trigger,player){
                    trigger.num+=1;
                    await player.changeZhiShiWu('shengYiWu',-1);
                    await player.addZhiShiWu('yinZhiZiDan',1);
                }
            },
            shengDian:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    for(var current of game.players){
                        if(current.zhiLiao==0&&current.side==player.side) await current.changeZhiLiao(1);
                    }
                },
                check:function (event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }
            },

            shenDeMenTu:{
                getPrevious:function (player){
                    var target=player;
                    for (var i = 0; i < game.players.length - 1; i++) {
                        target=target.getPrevious();
                        if(!target.hasSkillTag('noLuBiao')) return target;
                    }
                    return null;
                },
                trigger:{global:'phaseOver'},
                forced:true,
                filter:function (event,player){
                    return player.storage.luBiaoTarget&&event.player==player.storage.luBiaoTarget;
                },
                content:function (){
                    player.insertPhase('shenDeMenTu');
                },
                group:['shenDeMenTu_phaseBefore','shenDeMenTu_ban'],
                subSkill:{
                    phaseBefore:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        filter:function (event,player){
                            return player.storage.luBiaoTarget&&event.skill!='shenDeMenTu';
                        },
                        content:function (){
                            trigger.cancel()
                        }
                    },
                    ban:{
                        trigger:{global:'gameStart'},
                        direct:true,
                        filter:function (event,player){
                            return game.players.length==4;
                        },
                        content:function (){
                            player.tempBanSkill('shenDeMenTu','forever');
                        }
                    }
                },
                ai:{
                    noLuBiao:true,
                    skillTagFilter:function (player,tag){
                        if(tag=='noLuBiao'&&game.players.length==4){
                            return false;
                        }
                    }
                }
            },
            xinYangZhiLu:{
                trigger:{player:'phaseBegin'},
                forced:true,
                filter:function (event,player){
                    return player.phaseNumber == 1;
                },
                content:async function (event,trigger,player){
                    var target=lib.skill.shenDeMenTu.getPrevious(player);
                    game.addGlobalSkill('luBiaoX');
                    for(var current of game.players){
                        current.storage.luBiaoPlayer=player;
                    }
                    player.storage.luBiaoTarget=target;
                    await target.addZhiShiWu('luBiaoX').set('type','fangZhi');
                },
                group:['xinYangZhiLu_teShu','xinYangZhiLu_zhuanYi'],
                subSkill:{
                    teShu:{
                        trigger:{player:'teShuAfter'},
                        direct:true,
                        content:function(){
                            trigger.getParent('phase').teShu=true;
                        }
                    },
                    zhuanYi:{
                        forced:true,
                        trigger:{player:'phaseEnd'},
                        filter:function(event,player){
                            return !event.teShu;
                        },
                        content:async function (event,trigger,player){
                            await event.trigger('luBiaoXZhuanYi');
                            if(event.zhuanYi!=false){
                                await player.storage.luBiaoTarget.removeZhiShiWu('luBiaoX');
                                var target=lib.skill.shenDeMenTu.getPrevious(player.storage.luBiaoTarget);
                                player.storage.luBiaoTarget=target;
                                await target.addZhiShiWu('luBiaoX').set('type','zhuanYi');
                            }
                        }
                    }
                },
            },
            chuanDao:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                content:async function (event,trigger,player){
                    var h_num=player.countCards('h');
                    if(h_num>0){
                        await player.chooseDraw(1);
                    }else if(h_num==0){
                        await player.draw();
                    }
                    var cards1=await player.chooseToDiscard('h',true,1,'showCards').set('selfSkil',true).set('shiFeng',false).set('loseTo',ui.special).set('delay_time',3.5).forResultCards();
                    await player.addZhiShiWu('qianCheng',1);
                    var cards2=await player.storage.luBiaoTarget.chooseToDiscard('h',true,1,'showCards').forResultCards();
                    if(cards2.length>0){
                        await player.gain(cards2);
                        if(get.xiBie(cards1[0])==get.xiBie(cards2[0])||get.mingGe(cards1[0])==get.mingGe(cards2[0])){
                            await player.addZhiShiWu('qianCheng',1);
                        }
                    }
                    event.cards=cards1;
                    await event.trigger('chuanDao');
                },
                check:function (event,player){
                    if(player.storage.luBiaoTarget.countCards('h')==0) return false;
                    return player.countCards('h')>1&&(player.canGongJi()||player.canFaShu());
                }
            },
            qiShi:{
                trigger:{global:'luBiaoXZhuanYi'},
                filter:function (event,player){
                    return player.countZhiShiWu('qianCheng')>=2;
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('qianCheng',2);
                    var next=player.chooseTarget(`目標角色+1[治療]，否則你摸1張牌[強制][展示]。<span class='tiaoJian'>(若該牌為法術牌或者聖類命格)</span>取消本次轉移並移除【路標】，然後將【路標】放置在目標角色面前`);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(player.countCards('h')+1>=player.getHandcardLimit()&&player.side==target.side) return 0.5;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    var result=await next.forResult();
                    if(result.bool){
                        await result.targets[0].changeZhiLiao(1);
                    }else{
                        var cards=await player.draw().forResult();
                        await player.showCards(cards);
                        if(get.type(cards[0])=='faShu'||get.mingGe(cards[0])=='sheng'){
                            trigger.zhuanYi=false;
                            await player.storage.luBiaoTarget.removeZhiShiWu('luBiaoX');
                            var targets=await player.chooseTarget(true,'將【路標】放置在目標角色面前',function(card,player,target){
                                return !target.hasSkillTag('noLuBiao');
                            }).set('ai',function(target){
                                var player=_status.event.player.storage.luBiaoTarget;
                                if(target==player.getNext()) return 1;
                                else return 0.5;
                            }).forResultTargets();
                            player.storage.luBiaoTarget=targets[0];
                            await targets[0].addZhiShiWu('luBiaoX').set('type','fangZhi');
                        }
                    }
                },
            },
            shiFeng:{
                trigger:{player:['loseAfter','chuanDao','miSa']},
                filter:function (event,player,name){
                    if(name=='loseAfter'){
                        if (event.type != "discard") return false;
                        if(event.getParent('chooseToDiscard').shiFeng==false) return false;
                        return player.zhiLiao>0&&event.getParent('chooseToDiscard').selfSkil&&get.position(event.cards[0], true) === "d";
                    }else if(name=='chuanDao' || name=='miSa'){
                        return player.zhiLiao>0&&event.cards.length>0;
                    }
                },
                content:async function (event,trigger,player){
                    //console.log(trigger.name);
                    await player.changeZhiLiao(-1);
                    game.log(player.storage.luBiaoTarget,'獲得了1張牌',);
                    await player.storage.luBiaoTarget.gain(trigger.cards,'draw').set('shiFeng',true);
                    if(!event.bool){
                        var targets=await player.chooseTarget('指定除你外的目標角色+1[治療]',true,function(card,player,target){
                            return player!=target;
                        }).set('ai',function(target){
                            var player=_status.event.player;
                            return get.zhiLiaoEffect2(target,player,1);
                        }).forResultTargets();
                        await targets[0].changeZhiLiao(1);
                    }
                },
                group:'shiFeng_shiQiXiaJiang',
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('gain').shiFeng==true&&event.num<0;
                        },
                        content:function(){
                            event.getParent('shiFeng').bool=true;
                        }
                    },
                }
            },
            luBiao:{},
            luBiaoX:{
                intro:{
                    name:'路標',
                    nocount:true,
                    content:`
                    <span class="greentext">[響應]告解式[回合限定]</span><br>
                    <span class='tiaoJian'>(此卡被轉移至你面前時，你摸2張牌[強制])</span>我方【戰績區】+1[水晶]，然後將此卡轉移至你左手邊最近的角色面前，傳教士棄1張牌。
                    `,
                },
                markimage:'image/card/zhuanShu/luBiao.png',
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function (event,player){
                    return event.zhiShiWu=='luBiaoX'&&event.type=='zhuanYi'&&event.gaoJieShi!=true;
                },
                content:async function (event,trigger,player){
                    await player.draw(2);
                    await player.addZhanJi('shuiJing',1);
                    await event.trigger('luBiaoXZhuanYi');
                    if(event.zhuanYi!=false){
                        await player.removeZhiShiWu('luBiaoX');
                        var target=lib.skill.shenDeMenTu.getPrevious(player);
                        player.storage.luBiaoPlayer.storage.luBiaoTarget=target;
                        await target.addZhiShiWu('luBiaoX').set('type','zhuanYi').set('gaoJieShi',true);
                    }
                    await player.storage.luBiaoPlayer.chooseToDiscard('h',1,true,'告解式：棄1張牌').set('selfSkil',true)
                },
                check:function (event,player){
                    if(player.countCards('h')+2>player.getHandcardLimit()) return false;
                    else return true;
                }
            },
            shuLingEnCi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.changeZhiLiao(1);
                    await player.chooseToDiscard('h',true,1).set('selfSkil',true);
                },
                check:function (event,player){
                    return player.countCards('h',card=>get.type(card)=='gongJi'||(get.name(card)=='moDan'||get.name(card)=='xuRuo')||get.name(card)=='shengDun')>1;
                },
                ai:{
                    shuiJing:true,
                }
            },
            miSa:{
                trigger:{global:'changeZhiShiWuAfter'},
                filter:function (event,player){
                    return event.zhiShiWu=='luBiaoX'&&(event.type=='fangZhi'||event.type=='zhuanYi')&&player.canBiShaShuiJing()&&event.player.hasZhiShiWu('luBiaoX');
                },
                logTarget:'player',
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.addZhiShiWu('qianCheng',1);
                    var choiceList=["棄1張牌[展示]。<span class='tiaoJian'>(若蓋牌為【虛弱】、【中毒】或【中毒】)</span>將該牌放置在擁有【路標】的角色面前作為基礎效果","·<span class='tiaoJian'>(將擁有【路標】的角色面前一張基礎效果牌收入自己手中)</span>你+1<span class='hong'>【虔誠】</span>"];
                    var list=['選項一'];
                    if(player.storage.luBiaoTarget.hasJiChuXiaoGuo()) list.push('選項二');
                    var next=player.chooseControl(list);
                    next.set('choiceList',choiceList);
                    next.set('ai',function(){
                        var player=_status.event.player;
                        var target=player.storage.luBiaoTarget;
                        if(player.countCards('h')+1>=player.getHandcardLimit()) return '選項一';
                        if(target.hasJiChuXiaoGuo()){
                            if(player.side==target.side){
                                var effect=-get.jiChuXiaoGuoEffect(target);
                            }else{
                                var effect=get.jiChuXiaoGuoEffect(target);
                            }
                            if(effect>0) return '選項一';
                            else if(effect<0) return '選項二';
                        }else{
                            return '選項一';
                        }
                    });
                    var control=await next.forResultControl();
                    if(control=='選項一'){
                        if(player.countCards('h')==0) return;
                        var cards=await player.chooseToDiscard('h','showCards',1,true).set('selfSkil',true).set('shiFeng',false).set('ai',function(card){
                            var player=_status.event.player;
                            if(player.side==player.storage.luBiaoTarget.side){
                                if(get.name(card)=='shengDun') return 1;
                                else if(get.name(card)=='xuRuo'||get.name(card)=='zhongDu') return 0.2;
                                else return 0.5;
                            }else{
                                if(get.name(card)=='xuRuo'||get.name(card)=='zhongDu') return 1;
                                else return 0.5;
                            }
                        }).forResultCards();
                        var name=get.name(cards[0]);
                        if(((name=='xuRuo'||name=='shengDun')&&player.storage.luBiaoTarget.getJiChuXiaoGuo("_"+name).length==0)||name=='zhongDu'){
                            await player.storage.luBiaoTarget.addJiChuXiaoGuo("_"+name,cards);
                            if(name=='zhongDu') player.storage.luBiaoTarget.storage.zhongDu.push(player);
                            cards=[];
                        }
                        event.cards=cards;
                        await event.trigger('miSa');
                    }else if(control=='選項二'){
                        await player.gainJiChuXiaoGuo(player.storage.luBiaoTarget);
                        await player.addZhiShiWu('qianCheng',1);
                    }
                },
                check:function (event,player){
                    return player.countCards('h')>=3
                }
            },
            qianCheng:{
                intro:{
                    max:4,
                    content:'mark',
                },
                markimage:'image/card/zhiShiWu/hong.png',
            },

            yiDuanXieShuo:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function (){
                    player.addNengLiang('shuiJing');
                },
                mod:{
                    maxHandcard:function (player,num){
                        if(player.hasGaiPai('yuYan')) return num-1;
                    }
                }
            },
            shenPanYJT:{
                trigger:{player:'phaseEnd'},
                filter:function (event,player){
                    return player.storage.shenPanYJT.length>0;
                },
                cost:async function (event,trigger,player){
                    var next=player.chooseTarget(function(card,player,target){
                        return player.storage.shenPanYJT.includes(target);
                    });
                    next.set('prompt',get.prompt('shenPanYJT'));
                    next.set('prompt2',lib.translate.shenPanYJT_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(player.countCards('h',card=>get.value(card)<3.5)>0) return target.countCards('h');
                        else return 0;
                    });
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    var players=game.filterPlayer(function(current){
                        return player.side==current.side;
                    })
                    players.sortBySeat();
                    var cards=[];
                    for(let current of players){
                        let card=await current.chooseToDiscard('h',true,1,'showCards').forResultCards();
                        if(card.length>0&&!card[0].destroyed){
                            cards.push(card[0]);
                        }
                    }
                    for(let current of players){
                        await current.draw();
                    }
                    var name=get.colorName(event.targets[0]);
                    if(cards.length>0){
                        let card=await player.chooseCardButton(cards,true,`選擇1張棄牌加入${name}的手牌`).set('ai',function(button){
                            return 6-get.value(button.link);
                        }).forResultLinks();
                        game.log(event.targets[0],'獲得了1張牌');
                        await event.targets[0].gain(card,'draw');
                        cards.remove(card[0]);
                    }
                    if(player.getGaiPai('yuYan').length>=6) return;
                    if(player.hasGaiPai('yuYan')&&cards.length>0){
                        cards.randomSort();
                        if(cards.length+player.countGaiPai('yuYan')>6){
                            cards=cards.randomGets(6-player.getGaiPai('yuYan').length);
                        }
                        await lib.skill.yuYan.add(player,cards);
                    }
                    
                },
                group:['shenPanYJT_chongZhi','shenPanYJT_zaoChengShangHai'],
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        priority:1,
                        content:function (){
                            player.storage.shenPanYJT=[];
                        }
                    },
                    zaoChengShangHai:{
                        trigger:{source:'zaoChengShangHai'},
                        direct:true,
                        filter:function (event,player){
                            return event.player.side!=player.side&&Array.isArray(player.storage.shenPanYJT);
                        },
                        content:function (){
                            player.storage.shenPanYJT.push(trigger.player);
                        }
                    }
                }
            },
            xianJi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.hasGaiPai('yuYan');
                },
                content:async function (event,trigger,player){
                    var list=lib.xiBie.slice();
                    var xiBie=await player.chooseControl(list).set('prompt',`指定1個系別，與【預言】堆頂的牌比較`).set('ai',function(){
                        var num=Math.random();
                        if(num>0.1){
                            var player=_status.event.player;
                            var cards=player.getGaiPai('yuYan');
                            var card=cards[cards.length-1];
                            return get.xiBie(card);
                        }else{
                            var list=lib.xiBie.slice();
                            return list.randomGet();
                        }
                    }).forResultControl();
                    game.log(player,`指定了${get.translation(xiBie)}系`);
                    player.popup(get.translation(xiBie));
                    var yuYan=player.getGaiPai('yuYan');
                    var card=player.getGaiPai('yuYan')[yuYan.length-1];
                    player.showHiddenCards(card);
                    var xiBie2=get.xiBie(card);
                    if(xiBie==xiBie2){
                        await player.discard(card,'yuYan');
                        await player.addZhanJi('baoShi');
                        await event.trigger('xianJi');
                    }
                    else{
                        let cards=get.cards();
                        await lib.skill.yuYan.add(player,cards);
                        game.log(player,`將1張牌加入手牌`);
                        await player.gain(card);
                    }
                },
                check:function (event,player){
                    return player.canFaShu()||player.canGongJi();
                }
            },
            moRiYuYan:{},
            fangZhu:{
                type:'faShu',
                enable:'faShu',
                usable:1,
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    player.addSkill('fangZhu_wuXian');

                    var list=[6,7,8];
                    var num=await player.chooseControl(list).set('prompt',`無視手牌上限摸6-8張牌`).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')+2>=5) return 0;
                        else if(player.countCards('h')+4>=5) return 1;
                        else if(player.countCards('h')+5>=5) return 2;
                        else return 1;
                    }).forResultControl();
                    await player.draw(num);
                    await player.discard(player.getGaiPai('yuYan'));
                    player.removeSkill('yuYan_zero');

                    list=[];
                    if(!player.hasZhiShiWu('yuYan_tianLeiJieHuo')) list.push('yuYan_tianLeiJieHuo');
                    if(!player.hasZhiShiWu('yuYan_diLieBoTao')) list.push('yuYan_diLieBoTao');
                    if(list.length==0) return;
                    var moRi=await player.chooseControl(list).set('prompt',`選擇1個【末日預言】放置到場上`).forResultControl();
                    player.storage.moRiYuYan=moRi;
                    player.addSkill('yuYan_zero');
                    player.markSkill('yuYan');
                    var cards=await player.chooseCard('h',true,6,'將6張手牌面朝下洗混放置到【末日預言】上作為【預言】').set('ai',function(card){
                        return 8-get.value(card);
                    }).forResultCards();
                    cards=cards.randomSort();
                    await lib.skill.yuYan.add(player,cards);

                    player.addGongJiOrFaShu();
                    player.removeSkill('fangZhu_wuXian');
                },
                subSkill:{
                    wuXian:{
                        mod:{
                            maxHandcardWuShi:function(player,num){
                                return Infinity;
                            },
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        if(!player.hasGaiPai('yuYan')) return 4;
                        else return 3;
                    },
                    result:{
                        player:1,
                    }
                },
                mod:{
                    aiOrder:function(player,item,num){
                        if(item=='_tiLian'&&player.hasExpansions('yuYan')<=1&&player.countNengLiang()<1) return num+1;
                    }
                },
            },
            tanLan:{
                trigger:{player:'yuYanJieGuo'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    trigger.bool=true;
                },
                check:function (event,player){
                    return player.countCards('h')>=3;
                }
            },
            yuYan:{
                add:async function(player,cards){
                    //game.log(player,`將${cards.length}張牌加入`,`#g【預言】`);
                    var next=game.createEvent('yuYanAdd',false);
                    next.setContent('addToExpansion');
                    next.set('player',player);
                    next.set('cards',cards);
                    next.set('log',true);
                    next.set('gaintag',["yuYan"]);
                    next.set('animate','draw');
                    next.getd = function (player, key, position) {
                        if (!position) position = ui.discardPile;
                        if (!key) key = "cards";
                        var cards = [],
                            event = this;
                        game.checkGlobalHistory("cardMove", function (evt) {
                            if (evt.name != "lose" || evt.position != position || evt.getParent() != event) return;
                            if (player && player != evt.player) return;
                            cards.addArray(evt[key]);
                        });
                        return cards;
                    };
                    next.getl = function (player) {
                        const that = this;
                        const map = {
                            player: player,
                            hs: [],
                            es: [],
                            js: [],
                            ss: [],
                            xs: [],
                            cards: [],
                            cards2: [],
                            gaintag_map: {},
                            vcard_map: new Map(),
                        };
                        player.checkHistory("lose", function (evt) {
                            if (evt.parent == that) {
                                map.hs.addArray(evt.hs);
                                map.es.addArray(evt.es);
                                map.js.addArray(evt.js);
                                map.ss.addArray(evt.ss);
                                map.xs.addArray(evt.xs);
                                map.cards.addArray(evt.cards);
                                map.cards2.addArray(evt.cards2);
                                for (let key in evt.gaintag_map) {
                                    if (!map.gaintag_map[key]) map.gaintag_map[key] = [];
                                    map.gaintag_map[key].addArray(evt.gaintag_map[key]);
                                }
                                evt.vcard_map.forEach((value, key) => {
                                    map.vcard_map.set(key, value);
                                });
                            }
                        });
                        return map;
                    };
                    return next;
                },
                intro:{
                    name:'預言',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('yuYan');
                        if(!cards||!cards.length) return;
						if(player.isUnderControl(true)) dialog.addAuto(get.translation(player.storage.moRiYuYan));
                        dialog.addText(`<span class="greentext">[被動]末日預言</span><br>
                        <span class='tiaoJian'>(此卡在場時，每當有角色因承受傷害而摸牌時)</span>本次摸牌的第1張牌改為自【預言】處獲得。<span class='tiaoJian'>(此卡上最後1張【預言】被移除或獲得，且結算完後)</span>將此卡翻面。可變為【天雷劫火】或【地裂波濤】。【末日預言】的【預言】上限為6。`,false);
						return '共有'+cards.length+'張牌';
					},
                    markcount:'expansion',
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions('yuYan');
                    if (cards.length) player.discard(cards);
                },
                markimage:'image/card/zhuanShu/moRiYuYan.png',
                trigger:{global:'gainBefore'},
                forced:true,
                filter:function (event,player){
                    return player.hasExpansions('yuYan')&&event.cause=='damage';
                },
                content:async function (event,trigger,player){
                    game.log(player,`移除了1張`,`#g【預言】`);
                    trigger.cards.pop();
                    var cards=player.getExpansions('yuYan');
                    trigger.cards.unshift(cards[0]);
                },
                group:['yuYan_tianLeiJieHuo','yuYan_diLieBoTao','yuYan_caiYangZhiXi'],
                subSkill:{
                    zero:{
                        trigger:{global:'damageAfter',player:'xianJi'},
                        forced:true,
                        priority:-2,
                        filter:function (event,player){
                            return !player.hasExpansions('yuYan');
                        },
                        content:async function (event,trigger,player){
                            player.removeSkill('yuYan_zero');
                            await player.unmarkSkill('yuYan');
                            await player.addZhiShiWu(player.storage.moRiYuYan);
                        }
                    },
                    tianLeiJieHuo:{
                        intro:{
                            name:'天雷劫火',
                            content:`<span class="greentext">[被動]天雷劫火</span><br>
                            <span class='tiaoJian'>(此卡展示時)</span>異教徒選擇以下一項發動：<br>
                            ·棄X張雷系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張雷系牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
                            ·棄X張火系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張火系牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
                            <span class="greentext">[被動]災殃止息</span><br>
                            <span class='tiaoJian'>(異教徒的回合開始時)</span>移除此卡。`,
                            nocount:true,
                        },
                        markimage:'image/card/zhuanShu/tianLeiJieHuo.png',
                        forced:true,
                        trigger:{player:'changeZhiShiWuAfter'},
                        filter:function (event,player){
                            return event.zhiShiWu=='yuYan_tianLeiJieHuo'&&event.num>0;
                        },
                        content:async function (event,trigger,player){
                            await event.trigger('yuYanJieGuo');
                            var choiceList=["棄X張雷系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張雷系牌[展示]，然後你對他造成(X+1)點法術傷害③","棄X張火系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張火系牌[展示]，然後你對他造成(X+1)點法術傷害③"];
                            var list=['選項一','選項二'];
                            var next=player.chooseControl(list);
                            next.set('choiceList',choiceList);
                            next.set('ai',function(){
                                var player=_status.event.player;
                                var num1=player.countCards('h',card=>get.xiBie(card)=='lei');
                                var num2=player.countCards('h',card=>get.xiBie(card)=='huo');
                                if(num1>num2){
                                    return '選項一';
                                }else{
                                    return '選項二';
                                }
                            });
                            if(event.bool){
                                next.set('prompt',`選擇先發動的選項`);
                            }else{
                                next.set('prompt',`選擇以下一項發動`);
                            }
                            var control=await next.forResultControl();
                            if(control=='選項一'){
                                var xiBieList=['lei'];
                                if(event.bool) xiBieList.push('huo');
                            }else{
                                var xiBieList=['huo'];
                                if(event.bool) xiBieList.push('lei');
                            }
                            
                            for(var xiBie of xiBieList){
                                var xiBieName=get.translation(xiBie);
                                var result=await player.chooseCardTarget({
                                    forced:true,
                                    xiBie:xiBie,
                                    filterCard:card=>get.xiBie(card)==_status.event.xiBie,
                                    selectCard:[0,4],
                                    filterTarget:lib.filter.opponent,
                                    selectTarget:1,
                                    prompt:`棄X張${xiBieName}系牌[展示]，摸X張牌，X最大為4，目標對手棄Y張${xiBieName}系牌[展示]，然後你對他造成(X+1)點法術傷害③`,
                                    ai1:function(card){
                                        return 1;
                                    },
                                    ai2:function(target){
                                        var player=_status.event.player;
                                        return get.damageEffect2(target,player,ui.selected.cards.length+1);
                                    }
                                }).forResult();

                                var num=result.cards.length;
                                if(num>0){
                                    await player.discard(result.cards,'showCards');
                                    await player.draw(num);
                                }
                                var target=result.targets[0];
                                await target.chooseToDiscard('h',true,[0,Infinity],'showCards',card=>get.xiBie(card)==_status.event.xiBie,`棄Y張${xiBieName}系牌[展示]`).set('ai',function(card){
                                    return 1;
                                }).set('xiBie',xiBie);
                                await target.faShuDamage(num+1,player);
                            }
                        }
                    },
                    diLieBoTao:{
                        intro:{
                            name:'地裂波濤',
                            content:`<span class="greentext">[被動]地裂波濤</span><br>
                            <span class='tiaoJian'>(此卡展示時)</span>異教徒選擇以下一項發動：<br>
                            ·棄X張地系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張系地牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
                            ·棄X張水系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張系水牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
                            <span class="greentext">[被動]災殃止息</span><br>
                            <span class='tiaoJian'>(異教徒的回合開始時)</span>移除此卡。`,
                            nocount:true,
                        },
                        markimage:'image/card/zhuanShu/diLieBoTao.png',
                        forced:true,
                        trigger:{player:'changeZhiShiWuAfter'},
                        filter:function (event,player){
                            return event.zhiShiWu=='yuYan_diLieBoTao'&&event.num>0;
                        },
                        content:async function (event,trigger,player){
                            await event.trigger('yuYanJieGuo');
                            var choiceList=["棄X張地系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張地系牌[展示]，然後你對他造成(X+1)點法術傷害③","棄X張水系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張水系牌[展示]，然後你對他造成(X+1)點法術傷害③"];
                            var list=['選項一','選項二'];
                            var next=player.chooseControl(list);
                            next.set('choiceList',choiceList);
                            next.set('ai',function(){
                                var player=_status.event.player;
                                var num1=player.countCards('h',card=>get.xiBie(card)=='lei');
                                var num2=player.countCards('h',card=>get.xiBie(card)=='huo');
                                if(num1>num2){
                                    return '選項一';
                                }else{
                                    return '選項二';
                                }
                            });
                            if(event.bool){
                                next.set('prompt',`選擇先發動的選項`);
                            }else{
                                next.set('prompt',`選擇以下一項發動`);
                            }
                            var control=await next.forResultControl();
                            if(control=='選項一'){
                                var xiBieList=['di'];
                                if(event.bool) xiBieList.push('shui');
                            }else{
                                var xiBieList=['shui'];
                                if(event.bool) xiBieList.push('di');
                            }
                            
                            for(var xiBie of xiBieList){
                                var xiBieName=get.translation(xiBie);
                                var result=await player.chooseCardTarget({
                                    forced:true,
                                    xiBie:xiBie,
                                    filterCard:card=>get.xiBie(card)==_status.event.xiBie,
                                    selectCard:[0,4],
                                    filterTarget:lib.filter.opponent,
                                    selectTarget:1,
                                    prompt:`棄X張${xiBieName}系牌[展示]，摸X張牌，X最大為4，目標對手棄Y張${xiBieName}系牌[展示]，然後你對他造成(X+1)點法術傷害③`,
                                    ai1:function(card){
                                        return 1;
                                    },
                                    ai2:function(target){
                                        var player=_status.event.player;
                                        return get.damageEffect2(target,player,ui.selected.cards.length+1);
                                    }
                                }).forResult();

                                var num=result.cards.length;
                                if(num>0){
                                    await player.discard(result.cards,'showCards');
                                    await player.draw(num);
                                }
                                var target=result.targets[0];
                                await target.chooseToDiscard('h',true,[0,Infinity],'showCards',card=>get.xiBie(card)==_status.event.xiBie,`棄Y張${xiBieName}系牌[展示]`).set('ai',function(card){
                                    return 1;
                                }).set('xiBie',xiBie);
                                await target.faShuDamage(num+1,player);
                            }
                        }
                    },
                    caiYangZhiXi:{
                        trigger:{player:'phaseBegin'},
                        forced:true,
                        filter:function (event,player){
                            return player.hasZhiShiWu('yuYan_diLieBoTao')||player.hasZhiShiWu('yuYan_tianLeiJieHuo');
                        },
                        content:async function (event,trigger,player){
                            if(player.hasZhiShiWu('yuYan_diLieBoTao')) await player.removeZhiShiWu('yuYan_diLieBoTao');
                            if(player.hasZhiShiWu('yuYan_tianLeiJieHuo')) await player.removeZhiShiWu('yuYan_tianLeiJieHuo');
                        }
                    }
                }
            },
        },
		
		translate: {
            zhuLvZhe:'鑄律者',
            hongYiZhuJiao:'紅衣主教',
            zhuLvZhe_name:'阿斯蘭',
            jiLuZhe:'記錄者',
            jiLuZhe_name:'多拉貢幻',
            chuanJiaoShi:'傳教士',
            chuanJiaoShi_name:'伊麗莎白',
            yiJiaoTu:'異教徒',
            yiJiaoTu_name:'克里斯蒂安娜',

            shiShuCard:'史書',
            shiShuCard_info:`
            <span class="greentext">[被動]以史為鏡</span><br>
            <span class='tiaoJian'>(擁有此卡的角色獲得)</span>此卡視為地系的幻類命格攻擊牌。<span class='tiaoJian'>(此卡被使用、打出、棄置、或者轉移擁有者，或因技能放置在角色旁)</span>移除此卡。<br>
            <span class="greentext">[響應]引稽編鑑</span><br>
            <span class='tiaoJian'>(擁有此卡的角色獲得，使用此卡進行主動攻擊時①)</span>指定攻擊目標將1張手牌加入【遺蹟】，然後將你手上X張牌與X個【遺蹟】交換，X<3。
            `,

            shenLvFengSuo:'[被動]神律封鎖',
            shenLvFengSuo_info:"<span class='tiaoJian'>(你的[治療]數未達到上限時)</span>所有未擁有[治療]的角色手牌上限-1。<span class='tiaoJian'>(每次你[治療]數增加時)</span>我方士氣-1，但至少為1(強制)。",
            shengXueZhiJi:'[被動]聖血之擊',
            shengXueZhiJi_info:"<span class='tiaoJian'>(主動攻擊命中時②)</span>本次攻擊傷害額外+1，你+1[治療]。",
            wangCheYiWei:'[法術]王車易位',
            wangCheYiWei_info:"<span class='tiaoJian'>(移除場上合計2[治療])</span>你+2<span class='hong'>【銀製子彈】</span>，移除你的所有基礎效果和[治療]，將你的角色卡替換為【紅衣主教】並額外+1[攻擊行動]。",
            zuiDuanHuoMian:'[響應]罪斷豁免',
            zuiDuanHuoMian_info:"<span class='tiaoJian'>(我方非因承受傷害而導致士氣下降時，移除X點</span><span class='lan'>【聖遺物】</span><span class='tiaoJian'>)</span>抵禦X點士氣下降，你+X<span class='hong'>【銀製子彈】</span>。",
            shengYinSongEn:'[響應]聖銀頌恩[回合限定]',
            shengYinSongEn_info:"<span class='tiaoJian'>([攻擊行動]結束時，移除2點</span><span class='hong'>【銀製子彈】</span><span class='tiaoJian'>)</span>額外+1[攻擊行動]，目標角色+1[治療]。",
            wangQuanBaoZhu:'(專)王權寶珠',
            wangQuanBaoZhu_info:`
            <span class="greentext">[被動]聖律威壓</span><br>
            <span class='tiaoJian'>(此卡轉移或放置到你面前時)</span>選擇以下一項發動：<br>·<span class='tiaoJian'>(選擇1張與此卡上牌種類相同的牌)</span>棄置之[展示]。<br>·摸2張牌[強制]，鑄律者陣營士氣-1。<span class='tiaoJian'>(若</span><span class='lan'>【聖遺物】</span><span class='tiaoJian'>數<1)</span>移除此卡。<br>
            <span class="greentext">[被動]神言詠贊</span><br>
            <span class='tiaoJian'>(【聖律威壓】結算完後)</span>將此卡轉移到你右手邊最近的玩家面前。<span class='tiaoJian'>(若因此轉移至鑄律者面前)</span>【鑄律者】選擇以下一項發動：<br>·將角色卡替換為【紅衣主教】，然後移除此卡。<br>·<span class='tiaoJian'>(移除X點</span><span class='hong'>【銀製子彈】</span><span class='tiaoJian'>，X<3)</span>目標角色摸X張牌[強制]，然後移除此卡。
            `,
            wangQuanBaoZhuX:'(專)王權寶珠',
            wangQuanBaoZhuX_shengLvWeiYa:'[被動]聖律威壓',
            wangQuanBaoZhuX_shenYanYongZan1:'[被動]神言詠贊',
            wangQuanBaoZhuX_shenYanYongZan2:'[被動]神言詠贊',
            xinYangChongZhu:'[響應]信仰重鑄[回合限定]',
            xinYangChongZhu_info:"[水晶]<span class='tiaoJian'>(你的回合結束時，若本回合你未執行【特殊行動】，將1張手牌面朝上放置在【王權寶珠】上[展示][強制])</span>你摸1張牌[強制]，你+2<span class='lan'>【聖遺物】</span>，將【王權寶珠】放置在你面前。",
            shengYiWu:'聖遺物',
            shengYiWu_info:"<span class='lan'>【聖遺物】</span>為紅衣主教與鑄律者共有指示物，上限為3。",
            yinZhiZiDan:'銀製子彈',
            yinZhiZiDan_info:"<span class='hong'>【銀製子彈】</span>為紅衣主教與鑄律者共有指示物，上限為3。",

            shengYueYinQi:"[被動]聖約銀契",
            shengYueYinQi_info:"<span class='tiaoJian'>([攻擊行動]或[法術行動]結束時)</span>你+1<span class='hong'>【銀製子彈】</span>。",
            quMoShi:"[啟動]驅魔式",
            quMoShi_info:"<span class='tiaoJian'>(移除2點</span><span class='hong'>【銀製子彈】</span><span class='tiaoJian'>)</span>我方目標角色棄1張牌[展示]。<span class='tiaoJian'>(若該棄牌為聖類命格)</span>你+1[治療]，摸1張牌[強制]。",
            daoGaoShi:"[響應]禱告式",
            daoGaoShi_info:"<span class='tiaoJian'>(主動攻擊前①，移除1點</span><span class='hong'>【銀製子彈】</span><span class='tiaoJian'>)</span>目標角色+1[治療]。",
            quanNengNiWei:"[法術]權能逆位",
            quanNengNiWei_info:"<span class='tiaoJian'>(移除1點</span><span class='hong'>【銀製子彈】</span><span class='tiaoJian'>或我方角色合計2[治療])</span>你+2<span class='lan'>【聖遺物】</span>，移除你的所有基礎效果與[治療]，將手牌棄到4張，然後將你的角色卡替換為【鑄律者】。",
            shenXuanDaoYan:"[響應]神宣禱言",
            shenXuanDaoYan_info:"<span class='tiaoJian'>(我方非因承受傷害而導致士氣下降時，移除1點</span><span class='lan'>【聖遺物】</span><span class='tiaoJian'>)</span>抵禦1點士氣下降，你+1<span class='hong'>【銀製子彈】</span>。",
            shengDian:"[啟動]聖典",
            shengDian_info:"[水晶]我方所有未擁有[治療]的角色各+1[治療]。",

            chuanShuoZhiDi:"[被動]傳說之地",
            chuanShuoZhiDi_info:"遊戲初始時，將牌庫頂3張牌面朝上放置在你角色旁[展示]，作為【遺蹟】。",
            zhiXingHeYi:"[法術]知行合一",
            zhiXingHeYi_info:"展示牌堆頂2張牌[展示]；你可選擇其中1張牌，將此牌作為相應行動發出並棄1張牌。<span class='tiaoJian'>(結算完成後)</span>將以此法展示的剩餘X張牌棄掉，你+X<span class='hong'>【史料】</span>。",
            jiGuShiDian:"[被動]稽古識典",
            jiGuShiDian_info:"<span class='tiaoJian'>(</span><span class='hong'>【史料】</span><span class='tiaoJian'>達到上限時)</span>移除所有<span class='hong'>【史料】</span>，你棄1張牌，將【史書】加入手牌[強制]。",
            yiJiLunPo:"[響應]遺蹟論破[回合限定]",
            yiJiLunPo_info:"<span class='tiaoJian'>(主動攻擊時①，移除與攻擊牌同系的X個【遺蹟】)</span>本次攻擊傷害額外+(X-1)；<span class='tiaoJian'>(若X>1)</span>額外+1[法術行動]；<span class='tiaoJian'>(若因此使【遺蹟】數減少為0)</span>我方【戰績區】+1[寶石]。",
            xuanCuiJingLian:"[響應]選淬精煉",
            xuanCuiJingLian_info:"<span class='tiaoJian'>(每當你移除【遺蹟】時)</span>將光系與暗系的【遺蹟】視為任意系別。",
            miJingWanXiang:"[法術]秘境萬象",
            miJingWanXiang_info:"<span class='tiaoJian'>(移除【史書】)</span>移除所有【遺蹟】，展示牌堆頂牌[展示]直至展示牌中有同系牌為止；將以此法展示的所有X張牌面朝上放置在你角色旁[展示]，作為【遺蹟】。<span class='tiaoJian'>(若X>3)</span>對(X-3)名目標角色造成2點法術傷害③。",
            shiShu:"(專)史書",
            shiShu_info:`
            <span class="greentext">[被動]以史為鏡</span><br>
            <span class='tiaoJian'>(擁有此卡的角色獲得)</span>此卡視為地系的幻類命格攻擊牌。<span class='tiaoJian'>(此卡被使用、打出、棄置、或者轉移擁有者，或因技能放置在角色旁)</span>移除此卡。<br>
            <span class="greentext">[響應]引稽編鑑</span><br>
            <span class='tiaoJian'>(擁有此卡的角色獲得，使用此卡進行主動攻擊時①)</span>指定攻擊目標將1張手牌加入【遺蹟】，然後將你手上X張牌與X個【遺蹟】交換，X<3。
            `,
            shiShuX_yiShiWeiJing:'[被動]以史為鏡',
            shiShuX_yinJiBianJian:'[響應]引稽編鑑',
            guJinHuzheng:"[啟動]古今互鑑",
            guJinHuzheng_info:"[水晶]你+2<span class='hong'>【史料】</span>；<span class='tiaoJian'>(若你手牌數>1)</span>你可將2張手牌與X個【遺蹟】交換，X>0。",
            yiJi:'遺蹟',
            yiJi_info:"【遺蹟】為記錄者專有展示蓋牌，上限為8。",
            shiLiao:'史料',
            shiLiao_info:"<span class='hong'>【史料】</span>為記錄者專有指示物，上限為3。",

            shenDeMenTu:"[被動]神的門徒",
            shenDeMenTu_info:"你無法成為【路標】的目標[恆定]，你的行動順序改為擁有【路標】的角色之後。2V2中此技能無效。",
            xinYangZhiLu:"[被動]信仰之路",
            xinYangZhiLu_info:"<span class='tiaoJian'>(你的第一回合開始時)</span>將【路標】放置在你左手邊最近的角色面前。<span class='tiaoJian'>(你的回合結束時，若本回合你未執行【特殊行動】)</span>將【路標】轉移到擁有者左手邊最近的角色面前。",
            chuanDao:"[啟動]傳道",
            chuanDao_info:"<span class='tiaoJian'>(你摸0-1張牌，棄1張牌[強制][展示])</span>你+1<span class='hong'>【虔誠】</span>，擁有【路標】的角色棄1張牌[展示]，你獲得該牌[強制]。<span class='tiaoJian'>(若該牌與你的棄牌系別或者命格相同)</span>你額外+1<span class='hong'>【虔誠】</span>。",
            qiShi:"[響應]啟示",
            qiShi_info:"<span class='tiaoJian'>(【路標】轉移前，移除2點</span><span class='hong'>【虔誠】</span><span class='tiaoJian'>)</span>選擇以下一項發動：<br>·目標角色+1[治療]。<br>·你摸1張牌[強制][展示]。<span class='tiaoJian'>(若該牌為法術牌或者聖類命格)</span>取消本次轉移並移除【路標】，然後將【路標】放置在目標角色面前。",
            shiFeng:"[響應]事奉",
            shiFeng_info:"<span class='tiaoJian'>(你因自身技能棄的牌置入棄牌堆時，移除你1[治療])</span>將該棄牌加入擁有【路標】的角色手牌[強制]。<span class='tiaoJian'>(若沒有因此造成該角色陣營士氣下降)</span>指定除你外的目標角色+1[治療]。",
            luBiao:"(專)路標",
            luBiao_info:`
            <span class="greentext">[響應]告解式[回合限定]</span><br>
            <span class='tiaoJian'>(此卡被轉移至你面前時，你摸2張牌[強制])</span>我方【戰績區】+1[水晶]，然後將此卡轉移至你左手邊最近的角色面前，傳教士棄1張牌。
            `,
            luBiaoX:"[響應]告解式[回合限定]",
            luBiaoX_info:"<span class='tiaoJian'>(此卡被轉移至你面前時，你摸2張牌[強制])</span>我方【戰績區】+1[水晶]，然後將此卡轉移至你左手邊最近的角色面前，傳教士棄1張牌。",
            shuLingEnCi:"[啟動]屬靈恩賜",
            shuLingEnCi_info:"[水晶]你+1[治療]，棄1張牌。",
            miSa:"[響應]彌撒",
            miSa_info:"[水晶]<span class='tiaoJian'>(【路標】轉移或放置後)</span>你+1<span class='hong'>【虔誠】</span>，選擇以下一項發動：<br>·棄1張牌[展示]。<span class='tiaoJian'>(若該牌為【虛弱】、【中毒】或【聖盾】)</span>將該牌放置在擁有【路標】的角色面前作為基礎效果。<br>·<span class='tiaoJian'>(將擁有【路標】的角色面前一張基礎效果牌收入自己手中)</span>你+1<span class='hong'>【虔誠】</span>。",
            qianCheng:"虔誠",
            qianCheng_info:"<span class='hong'>【虔誠】</span>為傳教士專有指示物，上限為4。",


            yiDuanXieShuo:"[被動]異端邪說",
            yiDuanXieShuo_info:"遊戲初始時，你+1[水晶]。<span class='tiaoJian'>(【末日預言】在場時)</span>你的手牌上限-1。",
            shenPanYJT:"[響應]審判",
            shenPanYJT_info:"<span class='tiaoJian'>(你的回合結束時，若本回合你對目標對手造成傷害③)</span>我方所有角色各棄1張牌[展示]，然後各摸1張牌[強制]，你將其中1張棄牌加入該對手手牌[強制]。<span class='tiaoJian'>(若【末日預言】在場)</span>將其餘棄牌面朝下洗混放置到【末日預言】的【預言】堆頂部作為【預言】。",
            xianJi:"[啟動]獻祭",
            xianJi_info:"<span class='tiaoJian'>(僅【末日預言】在場時，指定1種系別)</span>展示【預言】堆頂部1張【預言】[展示]；<span class='tiaoJian'>(若該【預言】與你指定的系別相同)</span>移除該【預言】，我方【戰績區】+1[寶石]；<span class='tiaoJian'>(若不同)</span>將牌堆頂1張牌與該【預言】交換，然後將該【預言】加入你手牌[強制]。",
            moRiYuYan:"(專)末日預言",
            moRiYuYan_info:`
            <span class="greentext">[被動]末日預言</span><br>
            <span class='tiaoJian'>(此卡在場時，每當有角色因承受傷害而摸牌時)</span>本次摸牌的第1張牌改為自【預言】處獲得。<span class='tiaoJian'>(此卡上最後1張【預言】被移除或獲得，且結算完後)</span>將此卡翻面。可變為【天雷劫火】或【地裂波濤】。【末日預言】的【預言】上限為6。<br>
            <span class="greentext">[被動]天雷劫火</span><br>
            <span class='tiaoJian'>(此卡展示時)</span>異教徒選擇以下一項發動：<br>
            ·棄X張雷系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張雷系牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
            ·棄X張火系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張火系牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
            <span class="greentext">[被動]地裂波濤</span><br>
            <span class='tiaoJian'>(此卡展示時)</span>異教徒選擇以下一項發動：<br>
            ·棄X張地系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張系地牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
            ·棄X張水系牌[展示]，摸X張牌[強制]，X最高為4；目標對手棄Y張系水牌[展示]，然後你對他造成(X+1)點法術傷害③。<br>
            <span class="greentext">[被動]災殃止息</span><br>
            <span class='tiaoJian'>(異教徒的回合開始時，若存在【天雷劫火】或【地裂波濤】)</span>移除此卡。
            `,
            fangZhu:"[法術]放逐[回合限定]",
            fangZhu_info:"[水晶]<span class='tiaoJian'>(無視你的手牌上限摸6-8張牌[強制])</span>移除場上所有【末日預言】和【預言】，將1個【末日預言】放置入場，然後將6張手牌面朝下洗混放置到【末日預言】上作為【預言】，額外+1[攻擊行動]或者[法術行動]。",
            tanLan:"[響應]貪婪",
            tanLan_info:"[水晶]<span class='tiaoJian'>(與【天雷劫火】或【地裂波濤】同時發動)</span>將“選擇以下一項發動”改為“發動以下項目，順序由你決定”。",
            yuYan:"[被動]末日預言",
            yuYan_tianLeiJieHuo:"[被動]天雷劫火",
            yuYan_diLieBoTao:"[被動]地裂波濤",
            yuYan_caiYangZhiXi:"[被動]災殃止息",
        },
	};
});
