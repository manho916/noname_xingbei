import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'sanBan',
		connect:true,
        characterSort:{
            sanBan:{
                "3xing":['san_fengZhiJianSheng','san_kuangZhanShi','san_anShaZhe','san_shengNv'],
                "3.5xing":['san_shengQiangQiShi','san_maoXianJia','san_nvWuShen','san_wenYiFaShi'],
                "4xing":['san_yingLingRenXing','san_moGong','san_xianZhe','san_moQiang'],
                "4.5xing":['san_lingHunShuShi','san_yinYouShiRen','san_yongZhe'],
                "5xing":[],
            }
        },
		character:{
			san_fengZhiJianSheng:['fengZhiJianSheng_name','jiGroup',3,['fengNuZhuiJi','san_shengJian','lieFengJi','jiFengJi','jianYing'],['character:fengZhiJianSheng']],
            san_kuangZhanShi:['kuangZhanShi_name','xueGroup',3,['san_kuangHua','xueYingKuangDao','xueXingPaoXiao','siLie'],['character:kuangZhanShi']],
            san_anShaZhe:['anShaZhe_name','jiGroup',3,['fanShi','san_shuiYing','san_qianXing'],['character:anShaZhe']],
            san_shengNv:['shengNv_name','shengGroup',3,['san_bingShuangDaoYan','zhiLiaoShu','zhiYuZhiGuang','san_lianMin','shengLiao'],['character:shengNv']],
            san_shengQiangQiShi:['shengQiangQiShi_name','shengGroup','3/4',['san_shenShengXinYang','huiYao','chengJie','shengJi','tianQiang','diQiang','shengGuangQiYu'],['character:shengQiangQiShi']],
            san_maoXianJia:['maoXianJia_name','huanGroup','3/4',['qiZha','qiangYun','diXiaFaZe','san_maoXianJiaTianTang','touTianHuanRi'],['character:maoXianJia']],
            san_xianZhe:['xianZhe_name','yongGroup',4,['san_zhiHuiFaDian','faShuFanTan','moDaoFaDian','shengJieFaDian'],['character:xianZhe']],
            san_lingHunShuShi:['lingHunShuShi_name','huanGroup','4/5',["lingHunTunShi","san_lingHunZhaoHuan",'lingHunZhuanHuan',"san_lingHunJingXiang","lingHunZhenBao","lingHunFuYu","lingHunLianJie","lingHunZengFu","huangSeLingHun","lanSeLingHun"],['character:lingHunShuShi']],
            san_nvWuShen:['nvWuShen_name','shengGroup','3/4',['shenShengZhuiJi','zhiXuZhiYin','san_hePingXingZhe','san_junShenWeiGuang','san_yingLingZhaoHuan'],['character:nvWuShen']],
            san_yingLingRenXing:['yingLingRenXing_name','yongGroup',4,['zhanWenZhangWo','nuHuoYaZhi','zhanWenSuiJi','moWenRongHe','san_fuWenGaiZao','shuangChongHuiXiang','zhanWen','moWen'],['character:yingLingRenXing']],
            san_moQiang:['moQiang_name','huanGroup',4,['san_anZhiJieFang','huanYingXingChen','heiAnShuFu','anZhiZhangBi','chongYing','qiHeiZhiQiang'],['character:moQiang']],
            san_yinYouShiRen:['yinYouShiRen_name','huanGroup','4/5',['san_chenLunXieZouQu','san_buXieHeXian','geYongTianFu','baoFengQianZouQu','san_yongHengYueZhangX','san_xiWangFuGeQu','san_lingGan'],['character:yinYouShiRen']],
            san_yongZhe:['yongZhe_name','xueGroup','4/5',['yongZheZhiXin','san_nuHou','jinPiLiJin','san_mingJingZhiShui','tiaoXin','jinDuanZhiLi','san_siDou','nuQi','zhiXing'],['character:yongZhe']],
            san_wenYiFaShi:['wenYiFaShi_name','huanGroup','3/4',['buXiu','shengDu','san_wenYi','siWangZhiChu','juDuXinXing'],['character:wenYiFaShi']],
		},

        characterIntro: {
			san_fengZhiJianSheng:"風之劍聖有著極高的攻擊頻率，一旦得到了風的強力賜福，更可以讓他打出無數絢麗的連擊和傷害。再加上其本身擁有的“聖劍”，在傷害輸出上不容小覷，更是團隊【寶石】獲得的得力助手",
            san_kuangZhanShi:"狂戰士毋庸置疑的擁有本作最強大的物理攻擊輸出能力，特別是對於防禦力弱和擁有治療的角色更是能製造出絕對的碾壓和毀滅傷害。其唯一的弱點就是命中率，因此由隊友掩護攻擊或攻擊防禦薄弱的角色是狂戰取勝之道",
            san_anShaZhe:"沒有人會去主動惹暗殺者的麻煩，因為他的反擊總是會讓你後悔剛才做出的決定；也沒有人會把他當做一個默默無聞的路人甲，因為當他亮出匕首的時候，你就再也無法閃躲了",
            san_shengNv:`外表弱小的聖女有著極強的防禦和治療能力。在她的保護下，很多需要厚積薄發的職業能得到全面的呵護成長，更是許多爆發性職業的全職奶媽`,
            san_shengQiangQiShi:`治療對於聖槍騎士而言，既是優秀的防禦源泉，也是攻擊的傷害利器。強大的聖槍騎士總是能運用場上的所有治療為她所用，狠狠地發洩到她的對手身上。她的天槍和地槍總是讓每個對手都膽戰心驚`,
            san_maoXianJia:"在這樣一個危險的大陸還敢冒險的人一定具備著以下三種素質：近乎難以置信的運氣、讓大家都有利可圖的能力、遇到危險時跑的足夠快",
            san_xianZhe:`睿智博學的賢者擁有能改變命運的三本魔法法典：智慧、聖潔和魔道。每一本都積攢著前人對奧術能量的深厚研究，而賢者是唯一一個能夠完全利用它們的人`,
            san_lingHunShuShi:"控制並利用靈魂是靈魂術士一族所獨具的強大能力，錯綜多樣的靈魂類別會使得很多學徒級的靈魂術士手忙腳亂。而對於精通利用靈魂的大師級靈魂術士而言，卻能把每一個靈魂都發揮出最大的利用價值和使用效率",
            san_nvWuShen:`米涅瓦：力量對於她來說是一種藝術，每一種技巧和武藝對於她來說同樣是一種藝術，將各種各樣的藝術融會貫通，鑄就了女武神不敗的威名<br>
            栞蒂：作為“女武神計劃”的最終產物，她擁有的技巧和實力幾乎完美再現了當年女武神的威風`,
            san_moGong:`魔弓為了超越她的姐姐，捨棄了原本應當追尋技巧與速度的弓之奧義，而將所有的箭術魔化為強大的充能能量，力求在爆發力與AOE上做到極致與完美`,
            san_yingLingRenXing:"純粹為戰鬥而生的人形，自誕生之日便掌握神秘的紋章力量，並運用這種力量將前進道路上的障礙統統粉碎",
            san_moQiang:`被幻之星塵同化的魔槍在獲得了新的意志和形態後，體內湧出一股無與倫比的力量。這種力量極大地提高了她的打擊能力和爆發力，但也使得她再也無法使用那些基本的法術了`,
            san_yinYouShiRen:`吟遊詩人不僅僅依憑自己的直覺和靈感進行著戰鬥，他彈奏的一個個音符能大幅增強自身和隊友的實力，同樣也能對敵人造成極大的傷害`,
            san_yongZhe:"怒氣與知性這一對彷彿不可調和的矛盾卻在勇者身上被煉化為一致。擁有怒氣時的超強爆發與使用知性時的百發百中讓勇者成為星杯傳說中的強者",
		},
        skill:{
            san_shengJian:{
                forced:true,
                trigger:{player:"gongJiSheZhi"},
                priority:1,
                filter:function(event,player){
                    return event.yingZhan!=true&&player.getStat('gongJi').zhuDong.length==3;
                },
                content:function(){
                    trigger.qiangZhiMingZhong();
                },
            },

            san_shuiYing:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return player.countCards('h')>0;
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
                        .set('showCards',true)
						.forResult();
				},
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                }
            },
            san_qianXing:{
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
                group:['san_qianXing_chongZhi','san_qianXing_xiaoGuo'],
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
                    if(player.countNengLiangAll()<=1) return false;
                    return true;
                },
            },

            san_kuangHua:{
                trigger:{player:'gongJiSheZhi'},
                forced:true,
                content:function(){
                    'step 0'
                    trigger.changeDamageNum(1);
                },
            },

            san_nuHou:{
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
                },
                group:"san_nuHou_weiMingZhong",
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
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
            san_mingJingZhiShui:{
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
            },
            san_siDou:{
                trigger:{player:'chengShouShangHai'},
                lastDo:true,
                filter:function(event,player){
                    return event.faShu&&player.canBiShaBaoShi();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await player.addZhiShiWu('nuQi',3);
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

            san_bingShuangDaoYan:{
                trigger:{player:'gongJiShi'},
                forced:true,
                filter:function(event,player){
                    return get.xiBie(event.card)=='shui';
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
            san_lianMin:{
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

            san_hePingXingZhe:{
                group:'san_hePingXingZhe_chongZhi',
                forced:true,
                trigger:{player:"yingLingZhaoHuan"},
                filter:function(event,player){
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
            san_junShenWeiGuang:{
                forced:true,
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    var choiceList=['你+1[治療]','(移除我方【戰績區】2星石)，你無視上限+2[治療]'];
                    var choices=['選項一'];
                    var list=get.zhanJi(player.side);
                    if(list.length>=2){
                        choices.push('選項二');
                    }
                    player.chooseControl(choices).set('prompt','軍神威光：選擇一項').set('choiceList',choiceList);
                    'step 1'
                    if(result.index==0){
                        player.changeZhiLiao(1);
                        event.finish();
                    }else if(result.index==1){
                        var list=get.zhanJi(player.side);
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }
                        var next=player.chooseButton([
                            '移除2個星石',
                            [listx,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('selectButton',[2,2]);
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
                    player.changeZhiLiao(2,Infinity,player);
                }
            },
            san_yingLingZhaoHuan:{
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
                    player.chooseToDiscard('showCards',"<span class='tiaoJian'>(若你額外棄置1張法術牌[展示])</span>本次攻擊傷害額外+1",card=>get.type(card)=='faShu').set('ai',function(card){
                        return 6- get.value(card);
                    });
                    'step 3'
                    if(result.bool){
                        trigger.changeDamageNum(1);
                    }
                    'step 4'
                    event.trigger('yingLingZhaoHuan')
                },
                ai:{
                    shuiJing:true,

                }
            },

            san_shenShengXinYang:{
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                }
            },

            san_zhiHuiFaDian:{
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
                }
            },

            san_fuWenGaiZao:{
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
                    player.draw(2);
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
                group:['san_fuWenGaiZao_chongZhi'],
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isHengZhi()) return num+2;
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

            san_maoXianJiaTianTang:{
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

            san_anZhiJieFang:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return !player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addTempSkill('san_anZhiJieFang_shangHai');
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
                            trigger.changeDamageNum(2);
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
            
            san_lingHunZhaoHuan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.san_lingHunZhaoHuan.filterCard(card))>0;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectCard:[1,Infinity],
                discard:true,
                showCards:true,
                content:function(){
                    player.addZhiShiWu('lanSeLingHun',cards.length+1);
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:function(item,player){
                        return 2.1+player.countCards('h',card=>lib.skill.san_lingHunZhaoHuan.filterCard(card))*0.7;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            san_lingHunJingXiang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('huangSeLingHun')>=2;
                },
                selectTarget:1,
                filterTarget:true,
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('huangSeLingHun',2);
                    await player.chooseToDiscard('h',true,3);

                    var chaZhi=event.target.getHandcardLimit()-event.target.countCards('h');
                    var num=Math.min(3,chaZhi);
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

            san_chenLunXieZouQu:{
                trigger:{global:'damageAfter'},
                priority:-1,
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(player.countCards('h')<2) return false;
                    if(!(event.player.side!=player.side&&event.source.side==player.side)) return false; 
                    return player.storage.chenLunXieZouQu.length>=2;
                },
                usable:1,
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',2)
                    .set('complexCard',true)
                    .set('filterCard',function(card){return get.xuanZeTongXiPai(card)})
                    .set('prompt',get.prompt('san_chenLunXieZouQu'))
                    .set('prompt2',lib.translate.san_chenLunXieZouQu_info)
                    .set('ai',function(card){return 6-get.value(card)})
                    .forResult();
                },
                content:async function(event,trigger,player){
                    await player.discard(event.cards).set('showCards',true);
                    await player.addZhiShiWu('lingGan');
                    var targets=await player.chooseTarget('對目標對手造成1點法術傷害',true,function(card,player,target){
                        return player.side!=target.side;
                    })
                    .set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    })
                    .forResultTargets();
                    await targets[0].faShuDamage(1,player);
                },
                group:['san_chenLunXieZouQu_chongZhi','san_chenLunXieZouQu_jiShu'],
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
            san_buXieHeXian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('san_lingGan')>1;
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
						var dialog=ui.create.dialog(`不諧和絃：移除X點<span class='hong'>【靈感】</span>,與目標角色摸(X-1)張牌或各棄X張牌`,'hidden');
                        var list=[];
                        for(var i=2;i<=player.countZhiShiWu('san_lingGan');i++){
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
                                var links=lib.skill.san_buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        var num=links[i];
                                        break
                                    }
                                }
                                await player.removeZhiShiWu('san_lingGan',num);
                            },
							content:async function(event,trigger,player){
                                var links=lib.skill.san_buXieHeXian_backup.links;
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
                                    await player.chooseToDiscard('h',num+1,true);
                                    await event.target.chooseToDiscard('h',num+1,true); 
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
                            return `你和目標角色各棄${num+1}張牌[強制]`
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
            san_xiWangFuGeQu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    var players=game.filterPlayer((function(current){
                        return current.side==player.side&&current.hasZhiShiWu('san_yongHengYueZhang');
                    }));

                    var targets=await player.chooseTarget('將【永恆樂章】轉移給我方一名角色面前',true,function(card,player,target){
                        var targetx=_status.event.targetx;
                        return target.side==player.side&&targetx!=target;
                    }).set('targetx',players[0]).forResultTargets();

                    await players[0].removeZhiShiWu('san_yongHengYueZhang');
                    
                    var target=targets[0];
                    if(!target.hasSkill('san_yongHengYueZhang')){
                        await target.addSkill('san_yongHengYueZhang');
                    }

                    await target.addZhiShiWu('san_yongHengYueZhang');
                    target.storage.yongHengYueZhang_player=player;
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    baoShi:true,
                }
            },
            san_lingGan:{
                intro:{
                    name:'靈感',
                    markcount:'mark',
                    max:4,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png'
            },
            san_yongHengYueZhangX:{},
            san_yongHengYueZhang:{
                intro:{
                    name:'(專)永恆樂章',
                    content:"[響應]激昂狂想曲：<span class='tiaoJian'>(回合開始時若你擁有【永恆樂章】，移除我方【戰績區】的2星石或將【永恆樂章】轉移給吟遊詩人)</span>選擇以下一項執行：<br>·對2名目標對手各造成1點法術傷害③。 <br>·你棄2張牌。<br>[響應]勝利交響詩：<span class='tiaoJian'>(回合結束時若你擁有【永恆樂章】，對吟遊詩人造成3點法術傷害③或將【永恆樂章】轉移給吟遊詩人)</span>選擇以下一項執行<br>·將我方【戰績區】的1個星石提煉成為你的能量。<br>·為我方【戰績區】+1[寶石]，你+1[治療]。",
                    nocount:true,
                },
                group:['san_yongHengYueZhang_jiAngKuangXiangQu','san_yongHengYueZhang_shengLiJiaoXiangShi'],
                onremove:'storage',
                markimage:'image/card/zhuanShu/yongHengYueZhang.png',
                subSkill:{
                    jiAngKuangXiangQu:{
                        trigger:{player:'phaseBegin'},
                        filter:function(event,player){
                            if(!player.hasZhiShiWu('san_yongHengYueZhang')) return false;
                            if(player.storage.yongHengYueZhang_player==player){
                                var zhanJi=get.zhanJi(player.side);
                                return zhanJi.length>=2;
                            }else{
                                return true;
                            }  
                        },
                        content:async function(event,trigger,player){
                            //條件
                            var zhanJi=get.zhanJi(player.side);
                            if(zhanJi.length>=2){
                                var list=[];
                                for(var i=0;i<zhanJi.length;i++){
                                    list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                }
                                if(player.storage.yongHengYueZhang_player==player){
                                    var result=await player.chooseButton([
                                        '移除我方【戰績區】的2星石或者將【永恆樂章】轉移給吟遊詩人',
                                        [list,'tdnodes'],
                                    ]).set('selectButton',[2,2]).set('forced',true).forResult();
                                }else{
                                    var result=await player.chooseButton([
                                        '移除我方【戰績區】的2星石或者將【永恆樂章】轉移給吟遊詩人',
                                        [list,'tdnodes'],
                                    ]).set('selectButton',[2,2]).forResult();
                                }
                                
                            }else var result={bool:false};
                            if(result.bool){
                                var dict={baoShi:0,shuiJing:0};
                                for(var i=0;i<result.links.length;i++){
                                    if(result.links[i]=='baoShi'){
                                        dict['baoShi']++;
                                    }else if(result.links[i]=='shuiJing'){
                                        dict['shuiJing']++;
                                    }
                                }
                                if(dict['baoShi']>0){
                                    await player.removeZhanJi('baoShi',dict['baoShi']);
                                }
                                if(dict['shuiJing']>0){
                                    await player.removeZhanJi('shuiJing',dict['shuiJing']);
                                }
                            }else{
                                await player.removeZhiShiWu('san_yongHengYueZhang');
                                await player.storage.yongHengYueZhang_player.addZhiShiWu('san_yongHengYueZhang');
                            }

                            //效果
                            var choiceList=['對2名目標對手各造成1點法術傷害③','棄2張牌'];
                            var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                                var player=_status.event.player;
                                if(player.storage.yongHengYueZhang_player.countCards('h')>2) return '選項一';
                                else return '選項二';
                            }).forResultControl();
                            
                            if(control=='選項一'){
                                var targets=await player.chooseTarget(2,'對2名目標對手各造成1點法術傷害③',true,function(card,player,target){
                                    return target.side!=player.side;
                                }).forResultTargets();
                                for(var i=0;i<targets.length;i++){
                                    await targets[i].faShuDamage(1,player);
                                }
                            }else{
                                await player.chooseToDiscard(2,true);
                            }

                            await event.trigger('san_yongHengYueZhang');
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
                            return player.hasZhiShiWu('san_yongHengYueZhang');
                        },
                        content:async function(event,trigger,player){
                            //條件
                            if(player.storage.yongHengYueZhang_player!=player){
                                var choiceList=['對吟遊詩人造成3點法術傷害③','將【永恆樂章】轉移給吟遊詩人'];
                                var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                                    var target=_status.event.player.storage.yongHengYueZhang_player;
                                    if(target.countCards('h')+4>target.getHandcardLimit()) return '選項二';
                                    else return '選項一';
                                }).forResultControl();
                            }else var control='選項一';

                            if(control=='選項一'){
                                await player.storage.yongHengYueZhang_player.faShuDamage(3,player);
                            }else{
                                await player.removeZhiShiWu('san_yongHengYueZhang');
                                await player.storage.yongHengYueZhang_player.addZhiShiWu('san_yongHengYueZhang'); 
                            }

                            //效果
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

                            await event.trigger('san_yongHengYueZhang');
                        }
                    }
                }
            },
            geYongTianFu:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    'step 0'
                    player.addSkill('san_yongHengYueZhang');
                    'step 1'
                    player.addZhiShiWu('san_yongHengYueZhang');
                    player.storage.yongHengYueZhang_player=player;
                },
                group:['geYongTianFu_yongHengYueZhang','geYongTianFu_wuFa'],
                subSkill:{
                    yongHengYueZhang:{
                        trigger:{global:'san_yongHengYueZhang'},
                        forced:true,
                        content:function(){
                            player.addZhiShiWu('san_lingGan');
                        }
                    },
                    wuFa:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='geYongTianFu_wuFa') return false;//需要排除自身，防止嵌套
                            return get.info('san_yongHengYueZhang').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                }
            },
            baoFengQianZouQu:{
                trigger:{player:'phaseBefore'},
                filter:function(event,player){
                    return player.hasZhiShiWu('san_lingGan');
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('san_lingGan');
                    'step 1'
                    player.tempBanSkill('geYongTianFu','phaseAfter');
                }
            },
            
            san_wenYi:{
                inherit:'wenYi',
                group:[],
            },
        },
		
		translate:{
            //角色名字
			san_fengZhiJianSheng:"三版風之劍聖",
            san_fengZhiJianSheng_prefix: "三版",
            san_kuangZhanShi:"三版狂戰士",
            san_kuangZhanShi_prefix: "三版",
            san_anShaZhe:"三版暗殺者",
            san_anShaZhe_prefix: "三版",
            san_shengNv:"三版聖女",
            san_shengNv_prefix: "三版",
            san_shengQiangQiShi:"三版聖槍騎士",
            san_shengQiangQiShi_prefix: "三版",
            san_maoXianJia:"三版冒險家",
            san_maoXianJia_prefix: "三版",
            san_xianZhe:"三版賢者",
            san_xianZhe_prefix: "三版",
            san_lingHunShuShi:"三版靈魂術士",
            san_lingHunShuShi_prefix: "三版",
            san_nvWuShen:"三版女武神",
            san_nvWuShen_prefix: "三版",
            san_yingLingRenXing:"三版英靈人形",
            san_yingLingRenXing_prefix: "三版",
            san_moQiang:"三版魔槍",
            san_moQiang_prefix: "三版",
            san_yinYouShiRen:"三版吟遊詩人",
            san_yinYouShiRen_prefix: "三版",
            san_yongZhe:"三版勇者",
            san_yongZhe_prefix: "三版",
            san_wenYiFaShi:"三版瘟疫法師",
            san_wenYiFaShi_prefix: "三版",

            san_shengJian:'[被動]聖劍',
            san_shengJian_info:"若你的主動攻擊為本次行動階段的第3次[攻擊行動]，則此攻擊強制命中。",

            san_shuiYing:"[響應]水影",
            san_shuiYing_info:"<span class='tiaoJian'>(目標角色對你造成傷害時③發動)</span>棄X張水系牌[展示]。",
            san_qianXing:"[啟動]潛行",
            san_qianXing_info:"[寶石][橫置]持續到你的下個行動階段開始，你的手牌上限-1；你不能成為主動攻擊的目標；你的主動攻擊對手無法應戰且傷害額外+X，X為你剩餘的【能量】數。【潛行】的效果結束時[重置]。",

            san_kuangHua:"[被動]狂化",
            san_kuangHua_info:"你發動的所有攻擊傷害額外+1。",

            san_nuHou:"[響應]怒吼",
            san_nuHou_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除1點</span><span class='hong'>【怒氣】</span><span class='tiaoJian'>)</span>本次攻擊傷害額外+2；<span class='tiaoJian'>(若未命中②)</span>你+1<span class='lan'>【知性】</span>。",
            san_mingJingZhiShui:"[響應]明鏡止水",
            san_mingJingZhiShui_info:"<span class='tiaoJian'>(主動攻擊前發動①，移除4點</span><span class='lan'>【知性】</span><span class='tiaoJian'>)</span>本次攻擊對手無法應戰。",
            san_siDou:"[響應]死鬥",
            san_siDou_info:"[寶石](每當你承受法術傷害時發動⑥)你+3<span class='hong'>【怒氣】</span>。",

            san_bingShuangDaoYan:"[被動]冰霜禱言",
            san_bingShuangDaoYan_info:"<span class='tiaoJian'>(每當你使用水系攻擊時發動)</span>目標角色+1[治療]。",
            san_lianMin:"[啟動]憐憫[持續]",
            san_lianMin_info:"[寶石][橫置]你的手牌上限恆定為7[恆定]。",

            san_hePingXingZhe:"[被動]和平行者",
            san_hePingXingZhe_info:"<span class='tiaoJian'>(發動【英靈召喚】後強制觸發[強制])</span>[橫置]，轉入【英靈形態】；<span class='tiaoJian'>(每當你執行主動攻擊時發動①)</span>[重置]脫離【英靈形態】。",
            san_junShenWeiGuang:"[被動]軍神威光",
            san_junShenWeiGuang_info:"<span class='tiaoJian'>(回合開始時，若你處於【英靈形態】)</span>選擇以下1項發動：<br>·你+1[治療]；<br>·<span class='tiaoJian'>(移除我方【戰績區】2星石)</span>你無視上限+2[治療]。",
            san_yingLingZhaoHuan:"[響應]英靈召喚",
            san_yingLingZhaoHuan_info:"[水晶]<span class='tiaoJian'>(攻擊命中時發動②)</span>本次攻擊傷害額外+1，<span class='tiaoJian'>(若你額外棄置1張法術牌[展示])</span>本次攻擊傷害額外+1。",
		
            san_shenShengXinYang:"[被動]神聖信仰",
            san_shenShengXinYang_info:"你的[治療]上限+1。",

            san_zhiHuiFaDian:"[被動]智慧法典",
            san_zhiHuiFaDian_info:"你的【能量】上限+1；<span class='tiaoJian'>(你每次承受法術傷害後⑥，若該傷害>3)</span>你+2[寶石]。",

            san_fuWenGaiZao:"[啟動]符文改造",
            san_fuWenGaiZao_info:"[寶石][橫置]轉為【蓄勢迸發形態】，在此形態下你的手牌上限+2；摸2張牌[強制]並任意調整你的【戰紋】和【魔紋】，在你回合結束階段，[重置]並脫離此形態。",

            san_maoXianJiaTianTang:"[響應]冒險者天堂",
            san_maoXianJiaTianTang_info:"<span class='tiaoJian'>(你執行【提煉】時)</span>可將提煉出的[寶石]和[水晶]交給一名目標隊友。",

            san_anZhiJieFang:"[啟動]暗之解放",
            san_anZhiJieFang_info:"[橫置]轉為【幻影形態】，你的手牌上限恆定為5[恆定]；本回合你的下次主動攻擊傷害額外+2，但不能發動【漆黑之槍】和【充盈】。",

            san_lingHunZhaoHuan:"[法術]靈魂召還",
            san_lingHunZhaoHuan_info:"<span class='tiaoJian'>(棄X張法術牌[展示])</span>你+(X+1)點<span class='lan'>【藍色靈魂】</span>。",
            san_lingHunJingXiang:"[法術]靈魂鏡像",
            san_lingHunJingXiang_info:"<span class='tiaoJian'>(移除2點</span><span class='hong'>【黃色靈魂】</span><span class='tiaoJian'>)</span>你棄3張牌，目標角色摸3張牌[強制]，但最多補到其手牌上限。",

            san_chenLunXieZouQu:"[響應]沉淪協奏曲[回合限定]",
            san_chenLunXieZouQu_info:"<span class='tiaoJian'>(一回合內我方對至少2名對手造成法術傷害③且結算之後，棄2張同系牌[展示])</span>對目標對手造成1點法術傷害③。",
            san_buXieHeXian:"[法術]不諧和絃",
            san_buXieHeXian_backup:"[法術]不諧和絃",
            san_buXieHeXian_info:"<span class='tiaoJian'>(移除X點</span><span class='hong'>【靈感】</span><span class='tiaoJian'>，X>1)</span>你和目標角色各摸(X-1)張牌[強制]或各棄X張牌[強制]。",
            san_yongHengYueZhangX:"(專)永恆樂章",
            san_yongHengYueZhangX_info:`
            <span class="greentext">[響應]激昂狂想曲</span><br>
            <span class='tiaoJian'>(回合開始時若你擁有【永恆樂章】，移除我方【戰績區】的2星石或將【永恆樂章】轉移給吟遊詩人)</span>選擇以下一項執行：<br>·對2名目標對手各造成1點法術傷害③。 <br>·你棄2張牌。<br>
            <span class="greentext">[響應]勝利交響詩</span><br>
            <span class='tiaoJian'>(回合結束時若你擁有【永恆樂章】，對吟遊詩人造成3點法術傷害③或將【永恆樂章】轉移給吟遊詩人)</span>選擇以下一項執行<br>·將我方【戰績區】的1個星石提煉成為你的能量。<br>·為我方【戰績區】+1[寶石]，你+1[治療]。
            `,
            san_yongHengYueZhang_jiAngKuangXiangQu:"[響應]激昂狂想曲",
            san_yongHengYueZhang_shengLiJiaoXiangShi:"[響應]勝利交響詩",
            san_xiWangFuGeQu:"[啟動]希望賦格曲",
            san_xiWangFuGeQu_info:"[寶石]將【永恆樂章】轉移到一名我方角色面前。",
            san_lingGan:"靈感",
            san_lingGan_info:"<span class='hong'>【靈感】</span>為吟遊詩人的專有指示物，上限為4。",
            geYongTianFu:"[被動]歌詠天賦",
            geYongTianFu_info:"遊戲開始時你擁有【永恆樂章】。<span class='tiaoJian'>(每當【永恆樂章】被觸發時)</span>你+1<span class='hong'>【靈感】</span>。吟遊詩人不會觸發【永恆樂章】的效果。",
            baoFengQianZouQu:"[響應]暴風前奏曲",
            baoFengQianZouQu_info:"<span class='tiaoJian'>(回合開始前，你移除1點</span><span class='hong'>【靈感】</span><span class='tiaoJian'>)</span>本回合無視你的【歌詠天賦】",

            san_wenYi_info:"<span class='tiaoJian'>(棄1張地系牌[展示])</span>對所有其他角色各造成1點法術傷害③。",
        },
	};
});
