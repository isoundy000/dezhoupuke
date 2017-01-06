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
    var GameSelect = (function (_super) {
        __extends(GameSelect, _super);
        function GameSelect() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        GameSelect.prototype.init = function () {
            this.skinName = skin.gameMenu;
            this.addEventListener('complete', function () {
                this.loop.play();
            }, this);
            this.start.play();
            this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(new StartGame());
            }, this);
        };
        return GameSelect;
    }(eui.Component));
    gameScene.GameSelect = GameSelect;
    __reflect(GameSelect.prototype, "gameScene.GameSelect");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=GameSelect.js.map