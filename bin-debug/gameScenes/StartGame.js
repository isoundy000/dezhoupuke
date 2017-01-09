var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameScene;
(function (gameScene) {
    var StartGame = (function (_super) {
        __extends(StartGame, _super);
        function StartGame() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        StartGame.prototype.init = function () {
            this.skinName = skin.menu;
            this.menu_in_am.addEventListener('complete', function () {
                this.startPalyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnClick, this);
            }, this);
            this.menu_in_am.play();
            this.gload_loop1.addEventListener('complete', function () {
                this.gload_loop1.play(2);
            }, this);
            this.gload_loop1.play();
            this.gload_loop.addEventListener('complete', function () {
                this.gload_loop.play(1);
            }, this);
            this.gload_loop.play(1);
        };
        StartGame.prototype.startBtnClick = function () {
            this.menu_out_am.play();
            this.gload_loop.pause();
            this.gload_loop1.pause();
            LayoutUI.interval.Run(new gameScene.GameSelect());
        };
        /**
         * 动画组播放完成
         */
        StartGame.prototype.onTweenGroupComplete = function () {
            console.log('TweenGroup play completed.');
        };
        /**
         * 动画组中的一项播放完成
         */
        StartGame.prototype.onTweenItemComplete = function (event) {
            var item = event.data;
            console.log(item.target);
            console.log('TweenItem play completed.');
        };
        return StartGame;
    }(eui.Component));
    gameScene.StartGame = StartGame;
    __reflect(StartGame.prototype, "gameScene.StartGame");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=StartGame.js.map