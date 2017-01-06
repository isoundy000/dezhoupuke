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
        private init(): void {
            this.skinName = skin.gameMenu;
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
        }
    }
}