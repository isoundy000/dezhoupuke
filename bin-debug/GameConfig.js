var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2017-01-06.
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    return GameConfig;
}());
GameConfig.DesignWidth = 750; //游戏设计尺寸宽
GameConfig.DesignHeight = 1334; //游戏设计尺寸高
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map