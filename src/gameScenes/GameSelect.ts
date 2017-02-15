/**
 * Created by Administrator on 2017-01-06.
 */
module gameScene {
    import Common = GameUilt.Common;
    import Score = GameUilt.Score;
    export class GameSelect extends eui.Component {
        public constructor (){
            super();
            this.init();
        }
        private init(): void {
            this.skinName = skin.gameMenu;
            this.setTextColor();
            this.addEventListener('complete', function(){
                this.loop.play();
            }, this);
            this.start.play();
            this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
                LayoutUI.interval.Run(new gameScene.StartGame());
            }, this);
            this.achieve.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
                LayoutUI.interval.Run(new gameScene.Achieve());
            }, this);
            this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.purchase();
            }, this);
        }

        /**
         * 购买多少筹码
         * @param val
         */
        private purchase(val: number = 0): void {
            webSocketServer.ins.onSendData({number: val}, 'Order|createOrder');
            webSocketServer.ins.callback = function(param){
                if(param.code == 200){
                    window.location.href = param.data.url;
                }
            }
        }
        private setTextColor(): void {
            this.spareMonoy.textColor = Common.color;
            this.spareMonoy.text = String(GameUilt.Score.ins.getMonoy());
            this.currentMonoy.textColor = Common.color;
            this.currentMonoy.text = String(GameUilt.Score.ins.getMonoy(true));
            for(let i = 0; i < 5; i++){
                let map = this['text' + i];
                map.textColor = Common.color;
            }
            let moneys = [0, 500, 2500];
            for (let j = 1; j < 4; j++) {
                let maps = this['levelBtn' + j];
                maps.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    this.select(j, moneys[j-1]);
                }, this);
                if(Score.ins.maxLevel >= j) {
                    maps.texture = RES.getRes("4_06_png");
                }
            }
        }

        /**
         * 判断是否需要购买开通
         * @param level
         * @param money
         */
        private select(level: number, money: number): void {
            if(Score.ins.maxLevel >= level) {
                this.startGame(level);
            }else {
                this.purchase(money);
            }
        }

        /**
         * 开始游戏,并设置当前游戏等级
         * @param level
         */
        private startGame(level:number): void {
            LayoutUI.interval.Run(LoadingUI.ins);
            GameUilt.Score.ins.setLevel(level);
            //加载卡牌资源组
            LoadingUI.ins.loadResGroup("cards", function(){
                LayoutUI.interval.Run(new gameScene.Play());
            });
        }

        private start: egret.tween.TweenGroup;
        private loop: egret.tween.TweenGroup;
        private homeBtn: eui.Button;
        private achieve: eui.Button;

        /**
         * 购买和等级购买的按钮
         */
        private moreBtn: eui.Button;
        private levelBtn1: eui.Button;
        private levelBtn2: eui.Button;
        private levelBtn3: eui.Button;
        private levelBtn4: eui.Button;

        /**
         * 列表文本提示
         */
        private text0: eui.Label;
        private text1: eui.Label;
        private text2: eui.Label;
        private text3: eui.Label;
        private text4: eui.Label;
        private spareMonoy: eui.Label;//备用金币
        private currentMonoy: eui.Label;//当前金币
    }
}