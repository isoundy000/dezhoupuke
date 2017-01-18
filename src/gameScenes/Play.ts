/**
 * Created by Administrator on 2017-01-09.
 */
module gameScene {
    export class Play extends eui.Component {
        public constructor() {
            super();
            this.init();
        }
        private results: Array<number>;//数据集合
        private odds: number;//赔率
        //动画相关
        private start: egret.tween.TweenGroup;//开始动画
        private addOdd_am: egret.tween.TweenGroup;//添加赔率动画
        private addAmMap: egret.Bitmap;//添加赔率动画对象
        private loop: egret.tween.TweenGroup;//添加赔率背景闪烁动画
        private socketServer: GameUilt.webSocketServer;
        public init(): void {
            this.results = [
                250,
                50,
                25,
                9,
                6,
                4,
                3,
                2,
                1
            ];
            this.skinName = skin.plays;
            this.odds = 1;
            this.setScoreResult();
            this.pokerGroupPropertyX = this.pokerGroup.x;
            this.start.play(1);
            this.start.addEventListener(egret.Event.COMPLETE, this.loopAmAction, this);
            this.setOddsText();
            this.addButtonsLister();
            this.addAmMap.touchEnabled = false;
            this.addOddsBtn.touchEnabled = true;
            this.addAmMap.alpha = 0;

            this.initLock();
            this.switchPutCardBtn(true);
            this.socketServer = new GameUilt.webSocketServer("192.168.1.116", 2346);
            this.socketServer.callback = this.socketCallback;
            //this.socketServer.sendCall = this.sendData;
        }
        private socketCallback(param){
            console.log(param);
            if(param.msg == "connencted"){
                this.onSendData();
            }
        }
        private onSendData(){}
            //发送数据
		/*public sendData(data:any = [], msg: string = '', code: number = 200){
			let dataMap = {
				data: data,
				msg: msg,
				code: code
			};
			this.socketServer.writeUTF(JSON.stringify(dataMap));
        }*/
        //循环播放动画
        private loopAmAction(){
            this.loop.stop();
            //无限循环 start
            this.loop.addEventListener(egret.Event.COMPLETE, this.loopAmAction, this);
            this.loop.play(1);
            //无限循环 end
        }
        private resultDataMap: eui.Group;//结果组合
        private pokerGroup: eui.Group;//卡牌组合
        private pokerGroupPropertyX: number;//卡牌组合X预设
        /**
         * 分数Lable集合
         */
        private score1: eui.Label;
        private score2: eui.Label;
        private score3: eui.Label;
        private score4: eui.Label;
        private score5: eui.Label;
        private score6: eui.Label;
        private score7: eui.Label;
        private score8: eui.Label;
        private score9: eui.Label;
        /**
         * 设置结果分数: 根据赔率调整
         */
        private setScoreResult(){
            for(let i = 0; i < this.results.length; i++){
                let scoreMap = eval("this.score"+(i+1));
                scoreMap.text = this.results[i] * this.odds;
            }
        }
        //需要旋转的牌
        private card0: eui.Image;
        private card1: eui.Image;
        private card2: eui.Image;
        private card3: eui.Image;
        private card4: eui.Image;
        private rotateTime = 300;//旋转时间
        private cardNumber = 5;//卡牌数量
        //发牌数据
        private dealCards = [
            {
                val: 1,
                type: 1,
                lock: false
            },
            {
                val: 10,
                type: 3,
                lock: false
            },
            {
                val: 12,
                type: 1,
                lock: false
            },
            {
                val: 6,
                type: 2,
                lock: false
            },
            {
                val: 13,
                type: 2,
                lock: false
            },
        ];
        //旋转
        private rotate(){
            for(let i = 0; i < this.cardNumber; i++){
                let map = eval("this.card" + i);
                let tw = egret.Tween.get( map );
                tw.to( {scaleX:0}, this.rotateTime );
                tw.call((param) => {
                    let map1 = eval("this.card" + param);
                    map1.texture = RES.getRes(this.dealCards[param].val + "_" + this.dealCards[param].type + "_png");
                    let tw1 = egret.Tween.get( map1 );
                    tw1.to( {scaleX: 1}, this.rotateTime );
                }, this, [i]);
            }
        }
        //赔率文本显示
        private oddsText: eui.Label;
        private setOddsText(){
            this.oddsText.text = String(this.odds);
        }
        private MaxOdds:number = 6;//最大赔率
        //按钮
        private addOddsBtn: eui.Button;//添加赔率按钮
        private minOddBtn: eui.Button;
        private maxOddBtn: eui.Button;
        private oddBtnAlpha: number = 0.3;

        private addOddsAmProperty: any;
        //所有按钮添加侦听
        private addButtonsLister(){
            this.addOddsAmProperty = {
                x: this.addAmMap.x,
                y: this.addAmMap.y,
                scaleX: 1,
                scaleY: 1,
            }
            //侦听添加赔率按钮的点击事件
            this.addOddsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if(this.odds < this.MaxOdds){
                    //赔率自增
                    this.odds++;
                    this.setOddTextAndResults();
                    this.addOdd_am.addEventListener(egret.Event.COMPLETE, this.reSetaddOddAm, this);
                    this.addOdd_am.play(1);
                    if(this.odds == this.MaxOdds){
                        this.minAndMaxSelect(true);
                    }else{
                        this.minOddBtn.alpha = 1;
                        this.maxOddBtn.alpha = 1;
                        this.maxOddBtn.touchEnabled = true;
                        this.minOddBtn.touchEnabled = true;
                    }
                }
            }, this);
            this.minOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.odds = 1;
                this.setOddTextAndResults();
                this.minAndMaxSelect(false);
            }, this);
            this.maxOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.odds = this.MaxOdds;
                this.setOddTextAndResults();
                this.minAndMaxSelect(true);
            }, this);
            this.putCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.switchPutCardBtn(!this.putCardBtnStatus);
                if(this.putCardBtnStatus){
                    for(let i = 0; i < this.dealCards.length; i++){
                        this.initLock();
                    }
                }
            }, this);

            this.card0.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if(!this.putCardBtnStatus){
                    this.switchLockStatue(0);
                }
            }, this);
            this.card1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if(!this.putCardBtnStatus){
                    this.switchLockStatue(1);
                }
            }, this);
            this.card2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if(!this.putCardBtnStatus){
                    this.switchLockStatue(2);
                }
            }, this);
            this.card3.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if(!this.putCardBtnStatus){
                    this.switchLockStatue(3);
                }
            }, this);
            this.card4.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if(!this.putCardBtnStatus){
                    this.switchLockStatue(4);
                }
            }, this);
        }
        //重新设置添加赔率动画
        private reSetaddOddAm(){
            this.addOdd_am.removeEventListener(egret.Event.COMPLETE, this.reSetaddOddAm, this);
            this.addAmMap.x = this.addOddsAmProperty.x;
            this.addAmMap.y = this.addOddsAmProperty.y;
            this.addAmMap.scaleX = this.addOddsAmProperty.scaleX;
            this.addAmMap.scaleY = this.addOddsAmProperty.scaleY;
            this.addAmMap.alpha = 0;
        }
        //最大最小赔率切换
        private minAndMaxSelect(isMax: Boolean = false): void{
            this.loop.stop();
            if(!isMax) this.loop.play(1);
            this.switchOddBtnStatus(false);
            
        }
        //设置赔率文本和结果
        private setOddTextAndResults(){
            //设置赔率显示的文本
            this.setOddsText();
            //设置赔率后的结果
            this.setScoreResult();
        }
        private mask0: egret.Bitmap;
        private mask1: egret.Bitmap;
        private mask2: egret.Bitmap;
        private mask3: egret.Bitmap;
        private mask4: egret.Bitmap;
        private lock0: egret.Bitmap;
        private lock1: egret.Bitmap;
        private lock2: egret.Bitmap;
        private lock3: egret.Bitmap;
        private lock4: egret.Bitmap;
        //初始化卡牌锁为false
        private initLock(is: boolean = false): void {
            for(let i = 0; i < this.dealCards.length; i++){
                this.dealCards[i].lock = false;
                let maskMap = eval("this.mask" + i);
                let lockMap = eval("this.lock" + i);
                maskMap.alpha = 0;
                lockMap.alpha = 0;
            }
        }
        //卡牌锁状态切换
        private switchLockStatue(item: number): void {
            let cardMap = eval("this.card" + item),
                maskMap = eval("this.mask" + item),
                lockMap = eval("this.lock" + item),
                cardData = this.dealCards[item];
                let tw = egret.Tween.get(cardMap);
                tw.to({scaleX: 0.8, scaleY: 0.8}, 200);
                tw.to({scaleX: 1, scaleY: 1}, 200);
            if(cardData.lock){
                 let tw1 = egret.Tween.get(maskMap);
                tw1.to({alpha: 0}, 200);

                let tw2 = egret.Tween.get(lockMap);
                tw2.to({alpha: 0}, 200);
                cardData.lock = false;
            }else{
                let tw1 = egret.Tween.get(maskMap);
                tw1.to({alpha: 1}, 200);

                let tw2 = egret.Tween.get(lockMap);
                tw2.to({alpha: 1}, 200);
                cardData.lock = true;
            }
        }
        private putCardBtn: egret.Bitmap;//发牌
        private putCardBtnStatus: boolean = false;//是否为发牌
        //切换发牌和抽牌按钮
        private switchPutCardBtn(is: boolean): void {
            if(is){
                for(let i = 0; i < this.cardNumber; i++){
                    let map = eval("this.card" + i);
                    console.log("第几张牌:"+ i, "什么牌:"+ this.dealCards[i].val, "是否被选中:"+this.dealCards[i].lock);
                    map.texture = RES.getRes("8_17_png");
                }
                this.switchOddBtnStatus(is);
            }else{
                this.maxOddBtn.alpha = this.oddBtnAlpha;
                this.minOddBtn.alpha = this.oddBtnAlpha;
                this.addOddsBtn.alpha = this.oddBtnAlpha;
                this.maxOddBtn.touchEnabled = false;
                this.minOddBtn.touchEnabled = false;
                this.addOddsBtn.touchEnabled = false;
                console.log(1111);
                this.loop.stop();
                this.rotate();
            }
            let resName: string;
            resName = (is)?"4_09_png":"4_12_png";
            this.putCardBtn.texture = RES.getRes(resName);
            this.putCardBtnStatus = is;
        }
        //计算
        private computeToEffect(){

        }
        //重新开始
        private restart(){
            this.pokerGroup.x = this.pokerGroupPropertyX;
            this.start.play(1);
        }
        //切换赔率按钮状态
        private switchOddBtnStatus(is: boolean){
            //最大赔率
            if(this.odds == this.MaxOdds){
                this.maxOddBtn.alpha = this.oddBtnAlpha;
                this.minOddBtn.alpha = 1;
                this.addOddsBtn.alpha = this.oddBtnAlpha;
                this.maxOddBtn.touchEnabled = false;
                this.minOddBtn.touchEnabled = true;
                this.addOddsBtn.touchEnabled = false;
            }
            //最小赔率
            else if(this.odds == 1){
                this.maxOddBtn.alpha = 1;
                this.minOddBtn.alpha = this.oddBtnAlpha;
                this.addOddsBtn.alpha = 1;
                this.maxOddBtn.touchEnabled = true;
                this.minOddBtn.touchEnabled = false;
                this.addOddsBtn.touchEnabled = true;
            }
            //其他赔率
            else{
                this.maxOddBtn.alpha = 1;
                this.minOddBtn.alpha = 1;
                this.addOddsBtn.alpha = 1;
                this.maxOddBtn.touchEnabled = true;
                this.minOddBtn.touchEnabled = true;
                this.addOddsBtn.touchEnabled = true;
            }
        }
    }
}