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
    /**
     * 引擎加载完成回调方法
     * @param event
     */
    Main.prototype.onAddToStage = function (event) {
        //设置基本舞台
        GameUilt.Stages.stage.addChild(LayoutUI.interval.UIMap);
        //运行正在加载场景
        LayoutUI.interval.Run(LoadingUI.ins);
        //加载资源配置文件
        LoadingUI.ins.loadConfig("default.res", function () {
            //加载菜单资源组
            this.loadResGroup("menu", function () {
                //加载主题配置
                this.loadThemeConfig();
                this.loadTheme("default.thm", function () {
                    LayoutUI.interval.Run(new gameScene.StartGame());
                });
            });
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map