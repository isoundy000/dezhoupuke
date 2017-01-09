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
    var Achieve = (function (_super) {
        __extends(Achieve, _super);
        function Achieve() {
            var _this = _super.call(this) || this;
            _this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(new gameScene.StartGame());
            }, _this);
            return _this;
        }
        return Achieve;
    }(eui.Component));
    gameScene.Achieve = Achieve;
    __reflect(Achieve.prototype, "gameScene.Achieve");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=Achieve.js.map