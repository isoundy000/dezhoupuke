/**
 * Created by Administrator on 2017-01-06.
 */
module gameScene {
    export class GameSelect extends eui.Component {
        public constructor (){
            super();
            this.init();
        }
        private start: egret.tween.TweenGroup;
        private loop: egret.tween.TweenGroup;
        private homeBtn: eui.Button;
        private achieve: eui.Button;
        private buyBtn1: eui.Button;
        private buyBtn2: eui.Button;
        private startBtn: eui.Button;
        private spareMonoy: eui.Label;//备用金币
        private currentMonoy: eui.Label;//当前金币
        private init(): void {
            this.skinName = skin.gameMenu;
            this.spareMonoy.text = String(GameUilt.Score.ins.getMonoy());
            this.currentMonoy.text = String(GameUilt.Score.ins.getMonoy(true));
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
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(LoadingUI.ins);
                //加载卡牌资源组
                LoadingUI.ins.loadResGroup("cards", function(){
                    LayoutUI.interval.Run(new gameScene.Play());
                });
            }, this)
        }
    }
}