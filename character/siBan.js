import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'siBan',
		connect:true,
        characterSort:{
            siBan:{
                "3xing":['si_moFaShaoNv'],
                "3.5xing":['si_moJianShi',],
            }
        },
		character:{
            si_moFaShaoNv:['moFaShaoNv_name','yongGroup',3,['si_moBaoChongJi','moDanZhangWo','moDanRongHe','huiMieFengBao'],['character:moFaShaoNv']],
            si_moJianShi:['moJianShi_name','huanGroup','3/4',['xiuLuoLianZhan','anYingNingJu','anYingZhiLi','anYingKangJu','san_anYingLiuXing','si_huangQuanZhengChan'],['character:moJianShi']],
		},

        characterIntro: {
            si_moFaShaoNv:`小範圍的區域傷害是魔法少女的特長，她更可以把魔彈隨意的使用和施放。在積累了一定的能量之後，強大的“毀滅風暴”更是可以讓所有對手都品嚐到何為魔法的洗禮和衝擊`,
            si_moJianShi:"藉助暗影之力的魔劍士，既無法使用法術，更是會受到黑暗的侵蝕。但這種雙刃劍施放在對手身上的時候，又是無比的震撼和爽快，在烈火永生的黃泉面前，生與死只在一念之間",
		},
        skill:{
            si_moBaoChongJi:{
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
                    player.storage.moBaoChongJi=false;
                },
                content:function(){
                    'step 0'
                    var name=get.translation(player);
                    target.chooseToDiscard(`棄置1張法術牌，否則${name}對你造成2點法術傷害③`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(){
                        return 1;
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                        player.storage.moBaoChongJi=true;
                    }
                },
                contentAfter:function(){
                    'step 0'
                    if(player.storage.moBaoChongJi){
                        player.addZhanJi('baoShi',1);
                    }
                    'step 1'
                    player.chooseToDiscard(1,'h',true);
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

            san_anYingLiuXing:{
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
                subSkill:{
                    wuFaXingDong:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='san_anYingLiuXing_wuFaXingDong') return false;//需要排除自身，防止嵌套
                            if(player.countCards('h',card=>get.type(card)=='faShu')!=player.countCards('h')) return false;
                            return get.info('_wuFaXingDong').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                },
            },

            si_huangQuanZhengChan:{
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
                group:'si_huangQuanZhengChan_mingZhong',
                subSkill:{
                    mingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return event.customArgs.huangQuanZhengChan==true;
                        },
                        content:function(){
                            'step 0'
                            player.tiaoZhengShouPai(4);
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
        },
		
		translate:{
            //角色名字
            si_moFaShaoNv:"四版魔法少女",
            si_moFaShaoNv_prefix: "四版",
            si_moJianShi:"四版魔劍士",
            si_moJianShi_prefix: "四版",

            si_moBaoChongJi:'[法術]魔爆衝擊',
            si_moBaoChongJi_info:'<span class="tiaoJian">(棄1張法術牌[展示])</span>指定2名目標對手各棄一張法術牌[展示]，若其中有人不如此做，則對他造成2點法術傷害。只要有一名對手不如此做，我方【戰績區】+1[寶石]。你棄1張牌。',

            san_anYingLiuXing:"[法術]暗影流星",
            san_anYingLiuXing_info:"<span class='tiaoJian'>(僅【暗影形態】下發動，棄2張法術牌[展示])</span>對目標角色造成2點法術傷害③。",
            si_huangQuanZhengChan:"[響應]黃泉震顫[回合限定]",
            si_huangQuanZhengChan_info:"[寶石]<span class='tiaoJian'>(主動攻擊前發動①)</span>本次攻擊對手不能應戰，<span class='tiaoJian'>(若命中②)</span>你將手牌調整為4[強制]。",
		},
	};
});
