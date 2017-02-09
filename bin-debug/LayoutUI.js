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
var LayoutUI = (function (_super) {
    __extends(LayoutUI, _super);
    function LayoutUI() {
        var _this = _super.call(this) || this;
        _this.UIMap = new eui.Group;
        _this.addChild(_this.UIMap);
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        _this.init();
        return _this;
    }
    LayoutUI.prototype.init = function () {
        this.UIMap.width = 640;
        this.UIMap.height = GameUilt.Stages.stageH;
        this.UIMap.layout = new eui.BasicLayout();
    };
    LayoutUI.prototype.layoutCenter = function () {
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.UIMap.layout = hLayout; /// 水平布局
    };
    LayoutUI.prototype.Run = function (map) {
        this.UIMap.removeChildren();
        this.UIMap.addChild(map);
    };
    Object.defineProperty(LayoutUI, "interval", {
        get: function () {
            return (this._interval || (this._interval = new LayoutUI));
        },
        enumerable: true,
        configurable: true
    });
    return LayoutUI;
}(eui.UILayer));
__reflect(LayoutUI.prototype, "LayoutUI");
//# sourceMappingURL=LayoutUI.js.map