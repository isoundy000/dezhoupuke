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
            this.start.play();
            let self = this;
            this.start.addEventListener(egret.Event.COMPLETE, () => {
                self.rotate();
                //无限循环 start
                this.loop.addEventListener(egret.Event.COMPLETE, () => {
                    this.loop.play(1);
                }, this);
                this.loop.play(1);
                //无限循环 end
            }, this);
            this.setOddsText();
            this.addButtonsLister();
            this.addAmMap.touchEnabled = false;
            this.addOddsBtn.touchEnabled = true;
        }
        private resultDataMap: eui.Group;
        private pokerGroup: eui.Group;
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
                type: 1
            },
            {
                val: 10,
                type: 3
            },
            {
                val: 12,
                type: 1
            },
            {
                val: 6,
                type: 2
            },
            {
                val: 13,
                type: 2
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
                        
                    }
                }
            }, this);
            this.minOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.odds = 1;
                this.setOddTextAndResults();
                this.minAndMaxSelect(false);
            }, this);
            this.maxOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.odds = this.MaxOdds - 1;
                this.setOddTextAndResults();
                this.minAndMaxSelect(true);
            }, this);
        }
        //重新设置添加赔率动画
        private reSetaddOddAm(){
            this.addOdd_am.removeEventListener(egret.Event.COMPLETE, this.reSetaddOddAm, this);
            this.addAmMap.x = this.addOddsAmProperty.x;
            this.addAmMap.y = this.addOddsAmProperty.y;
            this.addAmMap.scaleX = this.addOddsAmProperty.scaleX;
            this.addAmMap.scaleY = this.addOddsAmProperty.scaleY;
            this.addAmMap.alpha = 1;
        }
        //最大最小赔率切换
        private minAndMaxSelect(isMax: Boolean = false): void{
            if(isMax){
                this.maxOddBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    this.odds = this.MaxOdds - 1;
                    this.setOddTextAndResults();
                }, this);
                this.maxOddBtn.alpha = 0.5;
                this.minOddBtn.alpha = 1;
            }else{
                this.minOddBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    this.odds = 1;
                    this.setOddTextAndResults();
                }, this);
                this.minOddBtn.alpha = 0.5;
                this.maxOddBtn.alpha = 1;
            }
        }
        private setOddTextAndResults(){
            //设置赔率显示的文本
            this.setOddsText();
            //设置赔率后的结果
            this.setScoreResult();
        }
    }
}