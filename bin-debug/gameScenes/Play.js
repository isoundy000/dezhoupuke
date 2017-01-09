var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Administrator on 2017-01-09.
 */
var gameScene;
(function (gameScene) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Play.prototype.init = function () {
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
            this.changeResults();
        };
        Play.prototype.changeResults = function () {
            var resultMap = this.resultDataMap;
            for (var i = 0; i < resultMap.length; i++) {
                resultMap[i].text = this.results[i] * this.odds;
            }
        };
        return Play;
    }(eui.Component));
    gameScene.Play = Play;
    __reflect(Play.prototype, "gameScene.Play");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=Play.js.map