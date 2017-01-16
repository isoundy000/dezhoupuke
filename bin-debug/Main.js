var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var load = new LoadingUI();
        GameUilt.Stages.stage.addChild(LayoutUI.interval.UIMap);
        LayoutUI.interval.Run(load);
        load.loadConfig("default.res", function () {
            this.loadResGroup("menu", function () {
                this.loadThemeConfig();
                this.loadResGroup("cards", function () {
                    this.loadTheme("default.thm", function () {
                        LayoutUI.interval.Run(new gameScene.Play());
                    });
                });
            });
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map