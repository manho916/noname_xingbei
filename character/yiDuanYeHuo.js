import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'yiDuanYeHuo',
		connect:true,
        characterSort:{
            yiDuanYeHuo:{
                "3xing":['zhanDouFaShi'],
                "3.5xing":['lieWuRen'],
                "4xing":['shengTingJianChaShi','shengDianQiShi'],
                "4.5xing":['xingZhuiNvWu'],
            }
        },
		character:{
            zhanDouFaShi:['zhanDouFaShi_name','yongGroup',3,['fuWenZhiHuan','fuMoDaJi','shangBian','moLiShangZeng'],],
            xingZhuiNvWu:['xingZhuiNvWu_name','yongGroup','4/5',['mingDingZhiLi','xingHuan','xingKe','qunXingQiShi','huangJinLv','fanXing','yingYue','shiRi','chuangKeLvDong','luEn'],],
            shengTingJianChaShi:['shengTingJianChaShi_name','shengGroup',4,['kuangXinTu','caiJueLunDing','enDianShenShou','jingHuaZhiShu','biHuLingYu','caiJueZhe','shenShengBianCe','caiJue'],],
            lieWuRen:['lieWuRen_name','jiGroup','3/4',['zhuanHuan','shouMoCi','faShuBoLi','guanYinDuRen','touXi','moLiPing'],],
            shengDianQiShi:['shengDianQiShi_name','shengGroup',4,['shenXuanZhe','shenWei','shengCai','shengYu','shenZhiZi','shenLinShengQi','shengYanQiYuan','shengYin'],],
		},
        characterIntro:{
            zhanDouFaShi:`路爾莉嘉不擅長高深莫測的魔法，歸因於她對戰鬥的直覺和創造性。但你如果因此小看她，則她會用符文法術的小把戲讓你吃盡苦頭`,
            xingZhuiNvWu:`窺探星辰之秘的天才，將看似平平無奇的符文編織重組，卻產生出了驚人的效果。其流轉猶如日月盈虧之形，使得對手都讚歎其華麗之形，而沉醉其中忘記自己的敗北`,
            shengTingJianChaShi:`聖庭檢查士積累神聖之力為隊友提供庇護。她擁有者強大的防禦能力，卻表現得不擅長攻擊。作為副官，她默默的隱藏在強者的光芒之後，然而若要輕視她，等待你的將是異端審判`,
            lieWuRen:`魔法？不，巫術是獵巫人最喜歡的目標，巫師在獵巫人的面前只能被剝離自己親近的元素而束手就擒。可能今晚獵巫人的酒錢有著落了~`,
            shengDianQiShi:`作為神之子，斯卡雷特有著能夠憑藉虔誠將承受的傷痛盡數無視的特殊能力。她可以精準的討伐對手，亦可以穩定的對對手造成傷害。然而不知道是由於教廷的過度保護還是她自身的原因，她顯然沒有將自身潛力完全發揮出來`,
        },
		
		skill:{
            //聖殿騎士
            shenXuanZhe:{
                trigger:{player:'gongJiMingZhong'},
                forced:true,
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event);
                },
                content:function(){
                    player.changeZhiLiao(1);
                },
                group:'shenXuanZhe_yiChu',
                subSkill:{
                    yiChu:{
                        trigger:{player:'zhiLiaoYiChu'},
                        forced:true,
                        content:function(){
                            player.addZhiShiWu('shengYin');
                        }
                    },
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num-1;
                    }
                },
                ai:{
                    zhiLiaoYiChu:true,
                }
            },
            shenWei:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(event.getParent('xingDong').shenWei==false) return false;
                    return player.countZhiShiWu('shengYin')>=2&&get.is.zhuDongGongJi(event);
                },
                content:function(){
                    player.removeZhiShiWu('shengYin',2);
                    trigger.wuFaYingZhan();
                    if(get.mingGe(trigger.card)=='sheng'){
                        trigger.changeDamageNum(1);   
                    }
                    player.addTempSkill('shenWei_zhiLiao');
                    trigger.target.addTempSkill('shenWei_zhiLiao');
                },
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'changeZhiLiaoBefore'},
                        direct:true,
                        filter:function(event,player){
                            return event.num>=0;
                        },
                        content:function(){
                            trigger.cancel();
                        }
                    }
                }
            },
            shengCai:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1&&get.is.zhuDongGongJi(event);
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('shengYin');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list)
                    .set('prompt',get.prompt('shengCai'))
                    .set('prompt2',lib.translate.shengCai_info)
                    .set('ai',function(){
                        return _status.event.num;
                    })
                    .set('num',list.length-2)
                    .forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control
                    };
                },
                logTarget:'target',
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('shengYin',event.cost_data);
                    'step 1'
                    trigger.target.faShuDamage(1,player);
                    if(event.cost_data>1){
                        trigger.changeDamageNum(event.cost_data-1);
                    }
                }
            },
            shengYu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog("<span class='tiaoJian'>(移除X點</span><span class='hong'>【聖印】</span><span class='tiaoJian'>)</span>目標隊友+X[治療]，你棄1張牌，額外+1[攻擊行動]",'hidden');
                        var list=[];
                        var num=player.countZhiShiWu('shengYin');
                        for(var i=1;i<=num;i++){
                            list.push(i);
                        }
                        dialog.add([list,'tdnodes']);
                        return dialog;
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:1,
                            filterTarget:function(card,player,target){
                                return target!=player&&target.side==player.side;
                            },
                            filterCard:true,
                            selectCard:0,
                            content:function(){
                                'step 0'
                                event.links=lib.skill.shengYu_backup.links;
                                player.removeZhiShiWu('shengYin',event.links[0]);
                                'step 1'
                                target.changeZhiLiao(event.links[0]);
                                'step 2'
                                player.chooseToDiscard(1,true);
                                player.addGongJi();
                            },
                            ai:{
                                result:{
                                    target:function(player, target){
                                        return get.zhiLiaoEffect(target,1);
                                    }
                                }
                            }
                        }
                    },
                    prompt:function(links,player){
                        return `目標隊友+${links[0]}[治療]`;
                    },
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 1.3+player.countZhiShiWu('shengYin');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            shenZhiZi:{
                forced:true,
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function(event,player){
                    return !player.isHengZhi()&&event.zhiShiWu=='shengYin'&&event.num>0;
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-player.zhiLiao);
                    'step 1'
                    player.hengZhi();
                    event.getParent('phase').shenZhiZi=true;
                },

                group:['shenZhiZi_xiaoGuo','shenZhiZi_chongZhiHuiHe','shenZhiZi_chongZhiShangHai'],
                subSkill:{
                    xiaoGuo:{
                        trigger:{global:'changeShiQiJudge'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            if(event.num>=0) return false;
                            if(player.side!=event.side) return false;
                            var shiQi=get.shiQi(player.side);
                            return shiQi+event.num<1;
                        },
                        content:function(){
                            var shiQi=get.shiQi(player.side);
                            var num=1-shiQi;
                            trigger.num=num;
                        },
                    },
                    chongZhiHuiHe:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            if(event.shenZhiZi==true) return false;
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.chooseTarget(function(card,player,target){
                                return target.side!=player.side;
                            },true,'對目標對手造成1點法術傷害③')
                            'step 2'
                            result.targets[0].faShuDamage(1,player);
                        }
                    },
                    chongZhiShangHai:{
                        trigger:{player:'shouDaoShangHai'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            trigger.num=0;
                            'step 1'
                            player.faShuDamage(1,player).set('step',4);
                            'step 2'
                            player.chongZhi();
                        }
                    }
                }
            },
            shenLinShengQi:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('shengYin',2,4);
                    player.addGongJi();
                    event.getParent('xingDong').shenWei=false;
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        return 4;
                    },
                    result:{
                        player:2,
                    }
                }
            },
            shengYanQiYuan:{
                trigger:{player:'chongZhiEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                async cost(event,trigger,player){
                    event.result=player.chooseTarget()
                    .set('prompt',get.prompt('shengYanQiYuan'))
                    .set('prompt2',lib.translate.shengYanQiYuan_info)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,2);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    event.targets[0].changeZhiLiao(2,player);
                },
                ai:{
                    shuiJing:true,
                }
            },
            shengYin:{
                intro:{
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //聖庭監察士
            kuangXinTu:{
                trigger:{global:"gameStart"},
                forced:true,
                content:function(){
                    player.addSkill('yiDuanCaiJueSuo');
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        var bool=game.hasPlayer(function(current){
                            return current.side==player.side&&current!=player&&current.group=='shengGroup';
                        });
                        if(bool) return num+1;
                    }
                },
                group:'kuangXinTu_zhiLiao',
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event);
                        },
                        //forced:true,
                        cost:async function(event,trigger,player){
                            event.result=await player.chooseTarget(true,'狂信徒：目標角色+1[治療]').set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            event.targets[0].changeZhiLiao(1);
                        }
                    }
                }
            },
            caiJueLunDing:{
                trigger:{global:'zhiLiaoYiChu'},
                usable:1,
                filter:function(event,player){
                    return event.player.side==player.side;
                },
                content:function(){
                    var bool=lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,1);
                    if(bool){
                        player.addNengLiang('shuiJing');
                    }
                }   
            },
            enDianShenShou:{
                enable:'xingDong',
                type:'teShu',
                filter:function(event,player){
                    if(event.getParent().canTeShu==false) return false;
                    var side=player.side;
                    var zhanJi=get.zhanJi(side);
                    if(zhanJi.length==0) return false;
                    var num=0;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].side!=side) continue;
                        num+=game.players[i].zhiLiao;
                    }
                    if(!(num>=2||player.storage.yiDuanCaiJueSuo>=3)) return false
                    for(var i=0;i<game.players.length;i++){
                        if(side!=game.players[i].side) continue;
                        if(game.players[i].countNengLiangAll()<game.players[i].getNengLiangLimit()){
                            return true;
                        }
                    }
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return player.side==target.side&&target.countNengLiangAll()<target.getNengLiangLimit();
                },
                content:async function(event,trigger,player){
                    var num=0;
                    var side=player.side;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].side!=side) continue;
                        num+=game.players[i].zhiLiao;
                    }
                    if(num>=2&&player.storage.yiDuanCaiJueSuo>=3){
                        var result=await player.chooseTarget('是否移除我方角色合計2[治療]，否則移除【異端裁決所】3[治療]',[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        })
                        .set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        }).forResult();
                    }else if(num>=2&&!(player.storage.yiDuanCaiJueSuo>=3)){
                        var result=await player.chooseTarget('移除我方角色合計2[治療]',true,[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        })
                        .set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        }).forResult();
                    }else var result={bool:false};

                    if(result.bool){
                        if(result.targets.length==1){
                            await result.targets[0].changeZhiLiao(-2);
                        }else{
                            await result.targets[0].changeZhiLiao(-1);
                            await result.targets[1].changeZhiLiao(-1);
                        }
                    }else{
                        lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    }

                    var num=event.target.getNengLiangLimit()-event.target.countNengLiangAll();
                    num=Math.min(num,2);
                    var list=get.zhanJi(player.side);
                    var listx=[];
                    for(var i=0;i<list.length;i++){
                        listx.push([list[i],get.translation(list[i])]);
                    };

                    result=await player.chooseButton([
                        '選擇提煉的星石',
                        [listx,'tdnodes'],
                    ])
                    .set('forced',true)
                    .set('selectButton',[1,num])
                    .set('ai',function(button){
                        var target=_status.event.target;
                        if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')){
                            if(button.link=='baoShi') return 5;
                            else return -1;
                        }
                        if(target.hasSkillTag('shuiJing')&&!target.hasSkillTag('baoShi')){
                            if(button.link=='shuiJing') return 5;
                            else return 2;
                        }
                        //既有水晶也有寶石
                        return 2;
                    })
                    .set('target',event.target)
                    .forResult();

                    var dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<result.links.length;i++){
                        if(result.links[i]=='baoShi') dict.baoShi++;
                        else if(result.links[i]=='shuiJing') dict.shuiJing++;
                    }
                    if(dict.baoShi>0) await player.changeZhanJi('baoShi',-dict.baoShi);
                    if(dict.shuiJing>0) await player.changeZhanJi('shuiJing',-dict.shuiJing);
                    if(dict.baoShi>0) await event.target.addNengLiang('baoShi',dict.baoShi);
                    if(dict.shuiJing>0) await event.target.addNengLiang('shuiJing',dict.shuiJing);

                    if(player.countCards('h')>0){
                        var cards=await player.chooseToDiscard('h',1,true).forResultCards();
                        result=await player.chooseCardButton(cards,'是否展示,對目標對手造成1點法術傷害③')
                        .set('filterButton',function(button){
                            return get.mingGe(button.link)=='sheng';
                        }).forResult();
                        if(result.bool){
                            await player.showCards(result.links).set('discard',true);
                            var targets=await player.chooseTarget('對目標對手造成1點法術傷害③',true,function(card,player,target){
                                return target.side!=player.side;
                            }).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets();
                            await targets[0].faShuDamage(1,player);
                        }
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
            jingHuaZhiShu:{
                trigger:{player:'damageAfter'},
                filter:function(event,player){
                    return player.countCards('h')>0&&event.jingHuaZhiShu==true;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt('jingHuaZhiShu'))
                    .set('prompt2',lib.translate.jingHuaZhiShu_info)
                    .set('ai',function(card){
                        return 7-get.value(card);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    player.changeZhiLiao(1);
                    'step 2'
                    player.draw(1);
                    'step 3'
                    lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,1);
                },
                group:'jingHuaZhiShu_chengShouShangHai',
                subSkill:{
                    chengShouShangHai:{
                        trigger:{player:'chengShouShangHai'},
                        direct:true,
                        content:function(){
                            trigger.jingHuaZhiShu=true;
                        }
                    }
                }
            },
            biHuLingYu:{
                trigger:{global:'shouDaoShangHai'},
                firstDo:true,
                filter:function(event,player){
                    return player.storage.yiDuanCaiJueSuo>=3&&event.player.side==player.side;
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    trigger.num--;
                    player.addZhiShiWu('caiJue',1);
                },
            },
            caiJueZhe:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('caiJue',1);
                    lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,2);
                },
                check:function(event,player){
                    return player.storage.yiDuanCaiJueSuo<=2&&(player.canGongJi()||player.canFaShu());
                },
            },
            shenShengBianCe:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.countZhiShiWu('caiJue')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog(`神聖鞭策：移除X點<span class='hong'>【裁決】</span>X名目標角色各摸1張牌[強制]，你棄X張牌`,'hidden');
                        var list=[];
                        var num=player.countZhiShiWu('caiJue');
                        for(var i=1;i<=num;i++){
                            list.push(i);
                        }
                        dialog.add([list,'tdnodes']);
                        return dialog;
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:links[0],
                            filterTarget:true,
                            selectCard:0,
                            filterCard:true,
                            contentBefore:function(){
                                'step 0'
                                event.links=lib.skill.shenShengBianCe_backup.links;
                                player.removeBiShaShuiJing();
                                'step 1'
                                player.removeZhiShiWu('caiJue',event.links[0]);
                            }, 
                            content:function(){
                                target.draw();
                            },
                            contentAfter:function(){
                                event.links=lib.skill.shenShengBianCe_backup.links;
                                player.chooseToDiscard(true,'h',event.links[0])
                            },
                            ai:{
                                result:{
                                    target:-1,
                                }
                            }
                        }
                    },
                    prompt:function(links,player){
                        return `${links[0]}名目標角色各摸1張牌[強制]`;
                    },
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 2.3+player.countZhiShiWu('caiJue')*0.5;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yiDuanCaiJueSuo:{
                init:function(player){
                    player.storage.yiDuanCaiJueSuo=0;
                },
                intro:{
                    content:'共有#個[治療]，上限為4。',
                    max:4,
                },
                onremove:'storage',
                mark:true,
                markimage:'image/card/zhuanShu/yiDuanCaiJueSuo.png',
                addZhiLiao:function(player,num){
                    var current=player.storage.yiDuanCaiJueSuo;
                    var max=4;
                    if(current>=max){
                        return false;
                    }else if(current+num>max){
                        num=max-current;
                    }
                    player.storage.yiDuanCaiJueSuo+=num;
                    game.log('【異端裁決所】','增加'+num,'[治療]');
                    player.updateMarks('yiDuanCaiJueSuo');
                    return true;
                },
                removeZhiLiao:function(player,num){
                    var current=player.storage.yiDuanCaiJueSuo;
                    if(current<=0){
                        return false
                    }else if(current-num<0){
                        num=current;
                    }
                    player.storage.yiDuanCaiJueSuo-=num;
                    game.log('【異端裁決所】','減少'+num,'[治療]');
                    player.updateMarks('yiDuanCaiJueSuo');
                    return true;
                }
            },
            caiJue:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //戰鬥法師
            fuWenZhiHuan:{
                type:'faShu',
                enable:['faShu'],
                usable:1,
                filter:function(event,player){
                    return player.countTongXiPai()>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                discard:true,
                showCards:true,
                content:function(){
                    'step 0'
                    player.draw(1);
                    'step 1'
                    for(var i=0;i<cards.length;i++){
                        if(get.mingGe(cards[i])=='yong'||get.type(cards[i])=='faShu'){
                            event.flag=true;
                            break;
                        }
                    }
                    if(event.flag){
                        player.addGongJi();
                    }
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            fuMoDaJi:{
                trigger:{source:['gongJiMingZhong','gongJiWeiMingZhong']},
                usable:1,
                filter:function(event,player,name){
                    if(get.is.zhuDongGongJi(event)){
                        if(name=='gongJiMingZhong') return true;
                        else if(name=='gongJiWeiMingZhong'){
                            return get.mingGe(event.card)=='yong';
                        }
                    }else return false;
                },
                content:function(){
                    player.addFaShu();
                }
            },
            shangBian:{
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(!get.is.xingDong(event)) return false;
                    var zhanJi=get.zhanJi(player.side);
                    var bool1=zhanJi.includes('baoShi');
                    var bool2=game.hasPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });
                    return player.storage.shangBian==3&&(bool1||bool2);
                },
                content:function(){
                    'step 0'
                    var zhanJi=get.zhanJi(player.side);
                    var bool1=zhanJi.includes('baoShi');
                    var bool2=game.hasPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });

                    if(bool1&&bool2){
                        var next=player.chooseTarget('是否消耗隊友【能量區】1【能量】,否者消耗我方【戰績區】1[寶石]',function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }else if(!bool1&&bool2){
                        var next=player.chooseTarget('消耗隊友【能量區】1【能量】',true,function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }
                    'step 1'
                    if(result.bool){
                        var target=result.targets[0];
                        var name=get.colorName(target);
                        event.target=target;
                        if(target.countNengLiang('baoShi')>0&&target.countNengLiang('shuiJing')>0){
                            var list=[['baoShi',get.translation('baoShi')],['shuiJing',get.translation('shuiJing')]];
                            var next=player.chooseControl(list);
                            next.set('prompt',`選擇消耗${name}的能量`);
                            next.set('ai',function(control){
                                return 1;
                            });
                        }else if(target.countNengLiang('baoShi')>0){
                            event.target.removeNengLiang('baoShi',1);
                            event.goto(3);
                        }else if(target.countNengLiang('shuiJing')>0){
                            event.target.removeNengLiang('shuiJing',1);
                            event.goto(3);
                        }
                    }else{
                        player.removeZhanJi('baoShi',1);
                        event.goto(3);
                    }
                    'step 2'
                    if(result.control=='baoShi'){
                        event.target.removeNengLiang('baoShi',1);
                    }else{
                        event.target.removeNengLiang('shuiJing',1);
                    }
                    'step 3'
                    var next=player.chooseTarget(2,'對2名目標對手各造成1點法術傷害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 4'
                    event.targets=result.targets.sortBySeat(player);
                    game.log(player,'選擇了',event.targets);
                    'step 5'
                    var target=event.targets.shift();
                    target.faShuDamage(1,player);

                    if(event.targets.length){
                        event.redo();
                    }
                },
                group:['shangBian_jiShu','shangBian_chongZhi'],
                subSkill:{
                    jiShu:{
                        priority:1,
                        trigger:{player:['gongJiEnd','faShuEnd']},
                        direct:true,
                        filter:function(event,player){
                            return get.is.xingDong(event);
                        },
                        content:function(){
                            player.storage.shangBian++;
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        priority:-2,
                        content:function(){
                            player.storage.shangBian=0;
                        }
                    }
                }
            },
            moLiShangZeng:{
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(!get.is.xingDong(event)) return false;
                    return event.firstAction!=true&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.storage.moLiShangZeng=false;
                    'step 1'
                    player.chooseTarget('對目標對手造成1點法術傷害③',true,function(card,player,target){
                        return target.side!=player.side;
                    }).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 2'
                    result.targets[0].faShuDamage(1,player).set('moLiShangZeng',true);
                    'step 3'
                    if(!player.storage.moLiShangZeng){
                        player.addZhanJi('baoShi');
                    }
                },
                group:'moLiShangZeng_shiQiXiaJiang',
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').moLiShangZeng==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.moLiShangZeng=true;
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                }
            },

            //星墜女巫
            mingDingZhiLi:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    player.addZhiShiWu('fanXing');
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                        return game.handcardLimit+1-x;
                    }
                },
            },
            xingHuan:{
                type:'faShu',
                usable:1,
                enable:['faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='di');
                },
                selectCard:[1,Infinity],
                filterCard:function(card){
                    return get.xiBie(card)=='di';
                },
                discard:true,
                showCards:true,
                selectTarget:function(){
                    return ui.selected.cards.length-1;
                },
                filterTarget:true,
                filterOk:function(){
                    return ui.selected.cards.length-1==ui.selected.targets.length;
                },
                content:async function(event,trigger,player){
                    if(event.target){
                        await event.target.changeZhiLiao(1,player);
                        await event.target.draw();
                    }
                },
                contentAfter:function(){
                    'step 0'
                    player.changeZhiLiao(1);
                    'step 1'
                    player.draw();
                    player.addFaShu();
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:function(item,player){
                        return 7-player.countCards('h');
                    },
                    result:{
                        target:1,
                    }
                }
            },
            xingKe:{
                trigger:{player:['faShuEnd','gongJiEnd']},
                filter:function(event,player,name){
                    if(name=='faShuEnd') return true;
                    else if(name=='gongJiEnd'){
                        return get.is.gongJiXingDong(event);
                    }else return false;
                },
                content:function(){
                    var cards=get.cards();
                    player.addGaiPai(cards,'luEn');
                }
            },
            qunXingQiShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    var bool1,bool2;
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    if(x<3&&player.countCards('h')>0) bool1=true;
                    else bool1=false;

                    if(player.getGaiPai('luEn').length>0) bool2=true;
                    else bool2=false;

                    return bool1||bool2;
                },
                content:function(){
                    'step 0'
                    var bool1,bool2;
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    if(x<3&&player.countCards('h')>0) bool1=true;
                    else bool1=false;

                    if(player.getGaiPai('luEn').length>0) bool2=true;
                    else bool2=false;

                    var list=[];
                    if(bool1) list.push('選項一');
                    if(bool2) list.push('選項二');
                    var choiceList=["<span class='tiaoJian'>(將1張手牌面朝下放置在你角色旁，作為【盧恩】。選擇1個【律法】放置於你面前)</span>你摸0-1張牌。","<span class='tiaoJian'>(移除X個【盧恩】[展示])</span>發動任意符合條件的【律法】，然後移除1個【律法】。"];

                    player.chooseControl(list).set('prompt','選擇以下一項發動').set('choiceList',choiceList).set('ai',function(){
                        var bool1=_status.event.bool1;
                        var bool2=_status.event.bool2;
                        var player=_status.event.player;
                        if(player.getGaiPai('luEn').length>=5&&bool2) return '選項二';
                        if(bool1) return '選項一';
                    }).set('bool1',bool1).set('bool2',bool2);
                    'step 1'
                    if(result.control=='選項一'){
                        event.goto(2)
                    }else{
                        event.goto(6);
                    }

                    'step 2'
                    player.chooseCard('h',true,'將1張手牌面朝下放置在你角色旁，作為【盧恩】');
                    'step 3'
                    player.addGaiPai(result.cards,'luEn');
                    var list=[];
                    if(!player.hasZhiShiWu('fanXing')) list.push('繁星');
                    if(!player.hasZhiShiWu('yingYue')) list.push('影月');
                    if(!player.hasZhiShiWu('shiRi')) list.push('蝕日');
                    player.chooseControl(list).set('prompt','選擇1個【律法】放置於你面前');
                    'step 4'
                    switch(result.control){
                        case '繁星':
                            player.addZhiShiWu('fanXing');
                            break;
                        case '影月':
                            player.addZhiShiWu('yingYue');
                            break;
                        case '蝕日':
                            player.addZhiShiWu('shiRi');
                            break;
                    }
                    'step 5'
                    player.chooseDraw(1);
                    event.finish();

                    'step 6'
                    var cards=player.getGaiPai('luEn');
                    player.chooseCardButton(cards,true,[1,Infinity],'移除X張【盧恩】');
                    'step 7'
                    player.discard(result.links,'luEn','showHiddenCards');
                    event.cards=result.links;
                    'step 8'
                    event.trigger('yiChuLuEn')
                    'step 9'
                    var list=[];
                    if(player.hasZhiShiWu('fanXing')) list.push('繁星');
                    if(player.hasZhiShiWu('yingYue')) list.push('影月');
                    if(player.hasZhiShiWu('shiRi')) list.push('蝕日');
                    if(list.length>0){
                        player.chooseControl(list).set('prompt','選擇1個【律法】移除');
                    }else{
                        event.finish();
                    }
                    'step 10'
                    switch(result.control){
                        case '繁星':
                            player.removeZhiShiWu('fanXing');
                            break;
                        case '影月':
                            player.removeZhiShiWu('yingYue');
                            break;
                        case '蝕日':
                            player.removeZhiShiWu('shiRi');
                            break;
                    }
                    event.finish();
                },
                check:function(event,player){
                    return player.countCards('h')>0||player.getGaiPai('luEn').length>3;
                }
            },
            huangJinLv:{
                trigger:{player:'qunXingQiShiAfter'},
                filter:function(event,player){
                    return player.countCards('h')<2;
                },
                content: async function(event,trigger,player){
                    await player.draw(1);
                    var cards = player.getGaiPai("luEn");
                    if(cards.length>0){
                        var next = player.chooseToMove("黃金律：是否交換【盧恩】和手牌");
                        next.set("list", [
                            ["盧恩", cards],
                            ["手牌", player.getCards("h")],
                        ]);
                        next.set("filterMove", function (from, to, moved) {
                            if (typeof to == "number") return false;
                            var player = _status.event.player;
                            //交換前
                            if (moved[0].length < 1) return true;
                            //交換回去
                            if((moved[0].includes(from.link)&&moved[1].includes(to.link))||moved[0].includes(to.link)&&moved[1].includes(from.link)) return true;
                            var luEn = player.getGaiPai("luEn");
                            //盧恩間交換
                            if(luEn.includes(from.link)&&luEn.includes(to.link)) return true;
                            var h=player.getCards("h");
                            //手牌間交換
                            if (h.includes(from.link) == h.includes(to.link)) return true;
                            //移動後，移動的牌在盧恩區交換
                            if(moved[0].includes(from.link)&&luEn.includes(to.link)) return true;
                            if(moved[0].includes(to.link)&&luEn.includes(from.link)) return true;
                            //移動後，移動的牌在手牌區交換
                            if(moved[1].includes(from.link)&&h.includes(to.link)) return true;
                            if(moved[1].includes(to.link)&&h.includes(from.link)) return true;

                            return moved[0].length <1;
                        });
                        next.set('filterOk',function(moved){
                            var player=_status.event.player;
                            var pushs = moved[0],
                                gains = moved[1];
                            pushs.removeArray(player.getGaiPai("luEn"));
                            gains.removeArray(player.getCards("h"));
                            return pushs.length==1;
                        });
                        var result=await next.forResult();
                        if(!result.moved) return;
                        var pushs = result.moved[0],
                            gains = result.moved[1];
                        if (!pushs.length || pushs.length != gains.length) return;
                        await player.lose(pushs);
                        await player.lose(gains);
                        await player.addGaiPai(pushs,'luEn');
                        //game.log(player,'獲得了1張牌');
                        await player.gain(gains, "draw",'log');
                    }
                }
            },
            fanXing:{
                intro:{
                    name:'律法：繁星',
                    content:"<span class='tiaoJian'>(當移除的【盧恩】包含4個不同系別或4個不同命格)</span>對所有對手各造成1點法術傷害③；<span class='tiaoJian'>(若移除的【盧恩】包含4個不同系別與4個不同命格)</span>目標隊友額外+1[寶石]。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/fanXing.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('fanXing')) return false;
                    
                    var cards=event.cards;
                    var xiBie=[],mingGe=[];
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(!xiBie.includes(get.xiBie(card))) xiBie.push(get.xiBie(card));
                        if(!mingGe.includes(get.mingGe(card))) mingGe.push(get.mingGe(card));
                    }

                    return xiBie.length>=4||mingGe.length>=4;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie=[],mingGe=[];
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(!xiBie.includes(get.xiBie(card))) xiBie.push(get.xiBie(card));
                        if(!mingGe.includes(get.mingGe(card))) mingGe.push(get.mingGe(card));
                    }

                    if(xiBie.length>=4&&mingGe.length>=4) event.flag=true;

                    event.targets=game.filterPlayer(function(current){
                        return current.side!=player.side;
                    });
                    event.targets.sortBySeat(player);
                    'step 1'
                    var target=event.targets.shift();
                    target.faShuDamage(1,player);
                    if(event.targets.length>0){
                        event.redo();
                    }
                    'step 2'
                    if(event.flag){
                        player.chooseTarget('目標隊友額外+1[寶石]',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        }).set('ai',function(target){
                            var num=target.getNengLiangLimit()-target.countNengLiangAll();
                            return num;
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    result.targets[0].addNengLiang('baoShi',1);
                }
            },
            yingYue:{
                intro:{
                    name:'律法：影月',
                    content:"<span class='tiaoJian'>(當移除的【盧恩】包含X對相同系別的【盧恩】，X>1)</span>對目標角色造成X點法術傷害③。<span class='tiaoJian'>(當移除的【盧恩】包含X對相同命格的【盧恩】，X>1)</span>任意分配X點[治療]給1~2位我方角色。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/yingYue.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('yingYue')) return false;

                    var cards=event.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    var xiBie_num=0;
                    var mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=2){
                            xiBie_num+=(xiBie[i]/2) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=2){
                            mingGe_num+=(mingGe[i]/2) >> 0;
                        }
                    }
                    return xiBie_num>1||mingGe_num>1;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    event.xiBie_num=0;
                    event.mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=2){
                            event.xiBie_num+=(xiBie[i]/2) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=2){
                            event.mingGe_num+=(mingGe[i]/2) >> 0;
                        }
                    }

                    'step 1'
                    if(event.xiBie_num>1){
                        var next=player.chooseTarget(`對目標角色造成${event.xiBie_num}點法術傷害③`,true);
                        next.set('ai',function(target){
                            var player=_status.event.player;
                            return -get.attitude(player,target);
                        });
                    }
                    'step 2'
                    if(event.xiBie_num>1){
                        result.targets[0].faShuDamage(event.xiBie_num,player);
                    }

                    'step 3'
                    if(event.mingGe_num>1){//分配[治療]
                        var next=player.chooseTarget([1,2],`任意分配${event.mingGe_num}點[治療]給1~2位我方角色`,true,function(card,player,target){
                            return target.side==player.side;
                        });
                        next.set('ai',function(target){
                            return get.zhiLiaoEffect(target);
                        });
                    }else{
                        event.finish();
                    }
                    'step 4'
                    result.targets.sortBySeat(player);
                    game.log(player,'選擇了',result.targets);
                    if(result.targets.length==1){
                        result.targets[0].changeZhiLiao(event.mingGe_num);
                        event.finish();
                    }else{
                        if(event.mingGe_num==2){
                            result.targets[0].changeZhiLiao(1);
                            result.targets[1].changeZhiLiao(1);
                            event.finish();
                        }else{//治療數>2 後面需要選擇分配
                            event.targets=result.targets;
                        }
                    }
                    'step 5'
                    var list=[];
                    for(var i=1;i<=event.mingGe_num-1;i++){
                        list.push(i);
                    }
                    var name=get.translation(event.targets[0]);
                    var str=name+'獲得幾點[治療]';
                    player.chooseControl(list).set('prompt',str);
                    'step 6'
                    event.targets[0].changeZhiLiao(result.control);
                    event.mingGe_num-=result.control;
                    'step 7'
                    event.targets[1].changeZhiLiao(event.mingGe_num);
                }
            },
            shiRi:{
                intro:{
                    name:'律法：蝕日',
                    content:"<span class='tiaoJian'>(當移除的【盧恩】包含每3個相同系別的【盧恩】)</span>你+1[寶石]。<span class='tiaoJian'>(當移除的【盧恩】包含每3個相同命格的【盧恩】)</span>我方【戰績區】+1[寶石]。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/shiRi.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('shiRi')) return false;

                    var cards=event.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    var xiBie_num=0;
                    var mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=3){
                            xiBie_num+=(xiBie[i]/3) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=3){
                            mingGe_num+=(mingGe[i]/3) >> 0;
                        }
                    }
                    return xiBie_num>0||mingGe_num>0;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    event.xiBie_num=0;
                    event.mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=3){
                            event.xiBie_num+=(xiBie[i]/3) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=3){
                            event.mingGe_num+=(mingGe[i]/3) >> 0;
                        }
                    }
                    'step 1'
                    if(event.xiBie_num>0) player.addNengLiang('baoShi',event.xiBie_num);
                    'step 2'
                    if(event.mingGe_num>0) player.addZhanJi('baoShi',event.mingGe_num);
                }
            },
            chuangKeLvDong:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.addSkill('chuangKeLvDong_wuXian');
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.chooseDraw(1);
                    'step 2'
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    player.chooseCard('h',`將最多${x+1}張手牌面朝下放置在你角色旁，作為【盧恩】`,[1,x+1]);
                    'step 3'
                    if(result.bool){
                        player.addGaiPai(result.cards,'luEn');
                    }
                    player.removeSkill('chuangKeLvDong_wuXian');
                    'step 4'
                    player.qiPai();
                },
                subSkill:{
                    wuXian:{
                        mod:{
                            maxHandcardWuShi:function(player,num){
                                return Infinity;
                            }
                        },
                    }
                },
                
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            luEn:{
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
                    return player.countGaiPai('luEn')>6;
                },
                content:function(){
                    'step 0'
                    var cards=player.getGaiPai('luEn');
                    var next=player.chooseCardButton(cards,true,cards.length-6,`捨棄${cards.length-6}張【盧恩】`);
                    'step 1'
                    player.discard(result.links,'luEn').set('sheQi',true);
                }
            },
            //獵巫人
            zhuanHuan:{
                enable:['gongJi','yingZhan'],
                filter:function(event,player){
                    var event=event||_status.event;
                    if(event.name=='yingZhan'){
                        if(event.canYingZhan==false) return false;
                        var cards=player.getCards('h');
                        for(var i=0;i<cards.length;i++){
                            var card=cards[i];
                            if(card.name!='shengGuang'&&get.type(card)=='faShu'){
                                if(get.xiBie(card)==get.xiBie(event.card)) return true;
                            }
                        }
                        return false;
                    }

                    return player.countCards('h',function(card){
                        return card.name!='shengGuang'&&get.type(card)=='faShu';
                    });
                },
                filterCard:function(card,player,event){
                    if(card.name=='shengGuang'||get.type(card)!='faShu') return false;
                    var event=event||_status.event;
                    if(event.name=='yingZhan'){
                        return get.xiBie(card)==get.xiBie(event.card);
                    }
                    return card.name!='shengGuang'&&get.type(card)=='faShu';
                },
                position:'h',
                viewAs:function(cards,player){
                    if(cards.length==0) return;
                    var xiBie=get.xiBie(cards[0]);
                    var name;
                    switch(xiBie){
                        case 'shui':
                            name='shuiLianZhan';
                            break;
                        case 'huo':
                            name='huoYanZhan';
                            break;
                        case 'feng':
                            name='fengShenZhan';
                            break;
                        case 'lei':
                            name='leiGuangZhan';
                            break;
                        case 'di':
                            name='diLieZhan';
                            break;
                    }
                    var dict={name:name,xiBie:xiBie};
					return dict;
				},
                ai:{
                    order:3.5,
                    result:{
                        player:1,
                    }
                }
            },
            shouMoCi:{
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    var num=player.getGaiPai('moLiPing').length;
                    if(num>=4) return false;

                    return get.is.zhuDongGongJi(event)&&event.target.countCards('h')<4&&event.target.countCards('h')>0;
                },
                logTarget:'target',
                content:function(){
                    'step 0'
                    trigger.target.chooseToDiscard(true);
                    'step 1'
                    player.addGaiPai(result.cards,'moLiPing');
                }
            },
            faShuBoLi:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    var num=player.getGaiPai('moLiPing').length;
                    if(num>=4) return false;

                    return get.is.zhuDongGongJi(event);
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseTarget()
                    .set('prompt',get.prompt('faShuBoLi'))
                    .set('prompt2',lib.translate.faShuBoLi_info)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        if(target.countCards('h')<=0) return -1;
                        return -get.attitude(player,target);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    var target=event.targets[0];
                    if(target.countCards('h')>0){
                        target.chooseToDiscard('h',true);
                    }else event.finish();
                    'step 1'
                    player.addGaiPai(result.cards,'moLiPing');
                }
            },
            guanYinDuRen:{
                trigger:{source:'chengShouShangHai'},
                filter:function(event,player){
                    return player.getGaiPai('moLiPing').length>=1;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('moLiPing');
                    var result=await player.chooseCardButton(cards,`是否發動【灌銀毒刃】，移除1個【魔力瓶】,本次傷害-1，其摸牌後將移除的【魔力瓶】加入他手牌[強制]，你+1[治療]`).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links
                    }
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'moLiPing');
                    trigger.changeDamageNum(-1);
                    player.storage.guanYinDuRenPlayer=trigger.player;
                    'step 1'
                    player.addTempSkill('guanYinDuRen_gain');
                    player.storage.guanYinDuRen=event.cost_data;
                    trigger.guanYinDuRen=true;
                    
                },
                subSkill:{
                    gain:{
                        trigger:{global:['drawAfter','damageZero']},
                        direct:true,
                        filter:function(event,player){
                            return (event.getParent('damage').guanYinDuRen||event.guanYinDuRen)&&player.storage.guanYinDuRenPlayer==event.player;
                        },
                        content:function(){
                            'step 0'
                            game.log(trigger.player,'獲得了',player.storage.guanYinDuRen.length,'張牌');
                            trigger.player.gain(player.storage.guanYinDuRen,'draw');
                            player.removeSkill('guanYinDuRen_gain');
                            'step 1'
                            player.changeZhiLiao(1);
                        }
                    }
                },
            },
            touXi:{
                usable:1,
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&get.is.gongJiXingDong(event)&&player.getGaiPai('moLiPing').length>=2;
                },
                async cost(event,trigger,player){
                    var cards=player.getGaiPai('moLiPing');
                    var result=await player.chooseCardButton(cards,2,`是否發動【偷襲】，移除2個【魔力瓶】[展示]<br>每有X張法術牌，對X名目標對手造成1點法術傷害③；<span class='tiaoJian'>(若有2張攻擊牌)</span>額外+1[攻擊行動]。 <span class='tiaoJian'>(若為同系牌)</span>對目標角色造成1點法術傷害③。`).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links
                    }
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.discard(event.cost_data,'moLiPing','showHiddenCards');
                    var cards=event.cost_data;

                    var faShu=0;
                    var gongJi=0;
                    var tongXi=false;

                    for(let card of cards){
                        if(get.type(card)=='faShu'){
                            faShu++;
                        }else if(get.type(card)=='gongJi'){
                            gongJi++;
                        }
                    }
                    if(get.xiBie(cards[0])==get.xiBie(cards[1])) tongXi=true;

                    if(faShu>=1){
                        let targets=await player.chooseTarget(`對${faShu}個目標對手造成1點法術傷害③`,true,faShu,function(card,player,target){
                            return target.side!=player.side;
                        }).set('ai',function(target){
                            return -get.damageEffect(target,1);
                        }).forResultTargets();
                        targets.sortBySeat(player);
                        game.log(player,'選擇了',targets);
                        for(let target of targets){
                            await target.faShuDamage(1,player);
                        }
                    }
                    if(gongJi>=2) player.addGongJi();
                    
                    if(tongXi){
                        let targets=await player.chooseTarget(`對目標角色造成1點法術傷害③`,true).set('ai',function(target){
                            var player=_status.event.player;
                            if(target.side==player.side) return -1;
                            return -get.damageEffect(target,1);
                        }).forResultTargets();
                        await targets[0].faShuDamage(1,player);
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            moLiPing:{
                intro:{
                    markcount:'gaiPai',
                    content:'gaiPai',
                },
                onremove:function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
        },
		
		translate:{
            zhanDouFaShi:"戰鬥法師",
            xingZhuiNvWu:"星墜女巫",
            shengTingJianChaShi:"聖庭檢察士",
            lieWuRen:"獵巫人",
            shengDianQiShi:"聖殿騎士",

            zhanDouFaShi_name:"路爾莉嘉",
            xingZhuiNvWu_name:"蕾娜",
            shengTingJianChaShi_name:"克里斯瑪",
            lieWuRen_name:"白狼卡拉馬",
            shengDianQiShi_name:"斯卡雷特",


            //聖殿騎士
            shenXuanZhe:"[被動]神選者",
            shenWei:"[響應]神威",
            shengCai:"[響應]聖裁",
            shengYu:"[法術]聖愈",
            shengYu_backup:"聖愈",
            shenZhiZi:"[被動]神之子",
            shenLinShengQi:"[法術]神臨聖啟",
            shengYanQiYuan:"[響應]聖炎祈願",
            shengYin:'聖印',
            shenXuanZhe_info:"你的[治療]上限-1。 <span class='tiaoJian'>(主動攻擊命中後②)</span>你+1[治療]。 <span class='tiaoJian'>(當你獲得[治療]並溢出時)</span>你+1<span class='hong'>【聖印】</span>。",
            shenWei_info:"<span class='tiaoJian'>(主動攻擊前①，移除2點</span><span class='hong'>【聖印】</span><span class='tiaoJian'>)</span>本次攻擊對手無法應戰；<span class='tiaoJian'>(若攻擊牌為聖類命格)</span>本次攻擊傷害額外+1。本回合你與攻擊目標無法獲得[治療]。",
            shengCai_info:"<span class='tiaoJian'>(主動攻擊前①，移除X點</span><span class='hong'>【聖印】</span><span class='tiaoJian'>)</span>對攻擊目標造成1點法術傷害③。本次攻擊傷害額外+(X-1)。",
            shengYu_info:"<span class='tiaoJian'>(移除X點</span><span class='hong'>【聖印】</span><span class='tiaoJian'>)</span>目標隊友+X[治療]，你棄1張牌，額外+1[攻擊行動]。",
            shenZhiZi_info:"<span class='tiaoJian'>(當你</span><span class='hong'>【聖印】</span><span class='tiaoJian'>增加時)</span>[橫置]移除你的所有[治療]，持續到你的下個回合結束時，你都處於【聖炎形態】，此形態下我方士氣最少為1[強制]。 【神之子】的效果結束時[重置]，脫離【聖炎形態】，然後對目標對手造成1點法術傷害③。 <span class='tiaoJian'>(當【聖炎形態】下你受到傷害時③)</span>抵禦本次傷害，改為承受1點來自自身的法術傷害⑥，然後[重置]脫離【聖炎形態】。",
            shenLinShengQi_info:"[水晶]無視你的<span class='hong'>【聖印】</span>上限為你+2<span class='hong'>【聖印】</span>，但你的<span class='hong'>【聖印】</span>最高為4，額外+1[攻擊行動]；本回合你不能發動[神威]。",
            shengYanQiYuan_info:"[水晶]<span class='tiaoJian'>([重置]脫離【聖炎形態】時)</span>目標角色+2[治療]。",
            shengYin_info:"<span class='hong'>【聖印】</span>為聖殿騎士專有指示物，上限為2。",
            
            //聖庭監察士
            kuangXinTu:"[被動]狂信徒",
            caiJueLunDing:"[響應]裁決論定[回合限定]",
            enDianShenShou:"[響應]恩典神授",
            jingHuaZhiShu:"[響應]淨化之術",
            biHuLingYu:"(專)[響應]庇護領域",
            caiJueZhe:"[啟動]裁決者",
            shenShengBianCe:"[法術]神聖鞭策",
            shenShengBianCe_backup:"[法術]神聖鞭策",
            yiDuanCaiJueSuo:"異端裁決所",
            caiJue:"裁決",

            kuangXinTu_info:"遊戲初始時你擁有【異端裁決所】。 <span class='tiaoJian'>(我方隊友存在聖類命格時)</span>你的[治療]上限+1。 <span class='tiaoJian'>(你的[攻擊行動]結束時)</span>目標角色+1[治療]。",
            caiJueLunDing_info:"<span class='tiaoJian'>(我方目標角色[治療]溢出時)</span>【異端裁決所】+1[治療]；<span class='tiaoJian'>(若因此【異端裁決所】[治療]增加)</span>你+1[水晶]。",
            enDianShenShou_info:"<span class='tiaoJian'>(你執行[提煉]時，移除我方角色合計2[治療]或【異端裁決所】3[治療])</span>將提煉出的[寶石]和[水晶]全部交給目標隊友，你棄1張牌；<span class='tiaoJian'>(若該棄牌為聖類命格，可展示之[展示])</span>對目標對手造成1點法術傷害③。",
            jingHuaZhiShu_info:"<span class='tiaoJian'>(你承受傷害⑥並結算完成後，棄1張法術牌[展示])</span>你+1[治療]，摸1張牌[強制]，然後移除【異端裁決所】上1[治療]。",
            biHuLingYu_info:"<span class='tiaoJian'>(我方目標角色受到傷害時③，移除【異端裁決所】3[治療])</span>本次傷害-1，你+1<span class='hong'>【裁決】</span>。",
            caiJueZhe_info:"[水晶]你+1<span class='hong'>【裁決】</span>，【異端裁決所】+2[治療]。",
            shenShengBianCe_info:"[水晶]<span class='tiaoJian'>(移除X點</span><span class='hong'>【裁決】</span><span class='tiaoJian'>)</span>X名目標角色各摸1張牌[強制]，你棄X張牌。",
            yiDuanCaiJueSuo_info:"【異端裁決所】的[治療]上限為4。",
            caiJue_info:"<span class='hong'>【裁決】</span>為聖庭監察士專有指示物，上限為3。",

            //戰鬥法師
            fuWenZhiHuan:"[法術]符文置換[回合限定]",
            fuWenZhiHuan_info:"<span class='tiaoJian'>(棄2張同系牌[展示])</span>摸1張牌[強制]；<span class='tiaoJian'>(若棄牌包含詠類命格或法術牌)</span>額外+1[攻擊行動]。",
            fuMoDaJi:"[響應]附魔打擊[回合限定]",
            fuMoDaJi_info:"<span class='tiaoJian'>(主動攻擊命中時②)</span>額外+1[法術行動]。 <span class='tiaoJian'>(主動攻擊未命中②且攻擊牌為詠類命格)</span>額外+1[法術行動]。",
            shangBian:"[響應]熵變",
            shangBian_info:"<span class='tiaoJian'>(本回合第三次行動結束時，消耗我方【戰績區】1[寶石]或隊友【能量區】1【能量】)</span>對2名目標對手各造成1點法術傷害③。",
            moLiShangZeng:"[響應]魔力熵增",
            moLiShangZeng_info:"[水晶]<span class='tiaoJian'>(每次額外行動結束時)</span>對目標對手造成1點法術傷害③；<span class='tiaoJian'>(若未因此造成士氣下降)</span>我方【戰績區】+1[寶石]。",
            
            //星墜巫女
            mingDingZhiLi:"[被動]命定之理",
            mingDingZhiLi_info:"你手牌上限+(1-X)[恆定]，X為你擁有的【律法】數。遊戲初始時你擁有【律法：繁星】。",
            xingHuan:"[法術]星環[回合限定]",
            xingHuan_info:"<span class='tiaoJian'>(棄X張地系牌[展示])</span>指定(X-1)名角色與你各+1[治療]並各摸1張牌[強制]，你+1[法術行動]。",
            xingKe:"[響應]星刻",
            xingKe_info:"<span class='tiaoJian'>([攻擊行動]或[法術行動]結束時)</span>將牌庫頂1張牌面朝下放置在你角色旁，作為【盧恩】。",
            qunXingQiShi:"[啟動]群星啟示",
            qunXingQiShi_info:"你選擇以下一項發動:<br>·<span class='tiaoJian'>(將1張手牌面朝下放置在你角色旁，作為【盧恩】。選擇1個【律法】放置於你面前)</span>你摸0-1張牌。<br>·<span class='tiaoJian'>(移除X個【盧恩】[展示])</span>發動任意符合條件的【律法】，然後移除1個【律法】。",
            huangJinLv:"[響應]黃金律",
            huangJinLv_info:"<span class='tiaoJian'>(當【群星啟示】發動後，你的手牌數<2時)</span>摸1張牌[強制]，並可將1張手牌與1個【盧恩】交換。",
            fanXing:"(專)[響應]繁星",
            fanXing_info:"<span class='tiaoJian'>(當移除的【盧恩】包含4個不同系別或4個不同命格)</span>對所有對手各造成1點法術傷害③；<span class='tiaoJian'>(若移除的【盧恩】包含4個不同系別與4個不同命格)</span>目標隊友額外+1[寶石]。",
            yingYue:"(專)[響應]影月",
            yingYue_info:"<span class='tiaoJian'>(當移除的【盧恩】包含X對相同系別的【盧恩】，X>1)</span>對目標角色造成X點法術傷害③。<span class='tiaoJian'>(當移除的【盧恩】包含X對相同命格的【盧恩】，X>1)</span>任意分配X點[治療]給1~2位我方角色。",
            shiRi:"(專)[響應]蝕日",
            shiRi_info:"<span class='tiaoJian'>(當移除的【盧恩】包含每3個相同系別的【盧恩】)</span>你+1[寶石]。<span class='tiaoJian'>(當移除的【盧恩】包含每3個相同命格的【盧恩】)</span>我方【戰績區】+1[寶石]。",
            chuangKeLvDong:"[法術]創刻律動",
            chuangKeLvDong_info:"[寶石]<span class='tiaoJian'>(無視你的手牌上限摸0-1張牌)</span>將最多(1+X)張手牌面朝下放置在你角色旁，作為【盧恩】，X為你擁有的【律法】數。",
            luEn:"盧恩",
            luEn_info:"【盧恩】為星墜巫女專有改蓋牌，上限為6。",

            //獵巫人
            zhuanHuan:"[響應]轉換",
            zhuanHuan_info:"除[聖光]外，你的法術牌都可作為對應系別攻擊牌使用。",
            shouMoCi:"[響應]狩魔刺",
            shouMoCi_info:"<span class='tiaoJian'>(主動攻擊手牌<4的目標對手時①，該目標棄1張牌)</span>將棄牌面朝下放置於你的角色旁，作為【魔力瓶】。",
            faShuBoLi:"[響應]法術剝離",
            faShuBoLi_info:"<span class='tiaoJian'>(主動攻擊命中時②發動)</span>目標角色棄1張牌，將棄牌面朝下放置於你的角色旁，作為【魔力瓶】。",
            guanYinDuRen:"[響應]灌銀毒刃",
            guanYinDuRen_info:"<span class='tiaoJian'>(目標角色將要承受你造成的傷害時⑥發動，移除1個【魔力瓶】)</span>本次傷害-1，其摸牌後將移除的【魔力瓶】加入他手牌[強制]，你+1[治療]。",
            touXi:"[響應]偷襲[回合限定]",
            touXi_info:"[水晶]<span class='tiaoJian'>([攻擊行動]結束時，移除2個【魔力瓶】[展示])</span>每有X張法術牌，對X名目標對手造成1點法術傷害③；<span class='tiaoJian'>(若有2張攻擊牌)</span>額外+1[攻擊行動]。 <span class='tiaoJian'>(若為同系牌)</span>對目標角色造成1點法術傷害③。",
            moLiPing:"魔力瓶",
            moLiPing_info:"【魔力瓶】為獵巫人專有蓋牌，上限為4；若【魔力瓶】達到上限，則不能發動【狩魔刺】、【法術剝離】",
        },
	};
});
