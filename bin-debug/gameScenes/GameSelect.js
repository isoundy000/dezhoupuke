var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Administrator on 2017-01-06.
 */
var gameScene;
(function (gameScene) {
    var Common = GameUilt.Common;
    var GameSelect = (function (_super) {
        __extends(GameSelect, _super);
        function GameSelect() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        GameSelect.prototype.init = function () {
            this.skinName = skin.gameMenu;
            this.setTextColor();
            this.addEventListener('complete', function () {
                this.loop.play();
            }, this);
            this.start.play();
            this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(new gameScene.StartGame());
            }, this);
            this.achieve.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(new gameScene.Achieve());
            }, this);
            this.levelBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(LoadingUI.ins);
                GameUilt.Score.ins.setLevel(1);
                //加载卡牌资源组
                LoadingUI.ins.loadResGroup("cards", function () {
                    LayoutUI.interval.Run(new gameScene.Play());
                });
            }, this);
        };
        GameSelect.prototype.setTextColor = function () {
            this.spareMonoy.textColor = Common.color;
            this.spareMonoy.text = String(GameUilt.Score.ins.getMonoy());
            this.currentMonoy.textColor = Common.color;
            this.currentMonoy.text = String(GameUilt.Score.ins.getMonoy(true));
            for (var i = 0; i < 5; i++) {
                var map = eval('this.text' + i);
                map.textColor = Common.color;
            }
        };
        return GameSelect;
    }(eui.Component));
    gameScene.GameSelect = GameSelect;
    __reflect(GameSelect.prototype, "gameScene.GameSelect");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=GameSelect.js.map