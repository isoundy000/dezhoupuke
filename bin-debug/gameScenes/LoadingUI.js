var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    /**
     * 创建一个视图
     */
    LoadingUI.prototype.createView = function () {
        this.textField = new eui.Label();
        this.addChild(this.textField);
        this.textField.y = GameConfig.DesignHeight / 2;
        this.textField.width = GameConfig.DesignWidth;
        this.textField.height = GameConfig.DesignHeight;
        this.textField.textAlign = "center";
    };
    /**
     * 设置进度
     * @param current
     * @param total
     */
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    /**
     * 加载json配置文件
     * @param ConfigName
     * @param callback
     */
    LoadingUI.prototype.loadConfig = function (ConfigName, callback) {
        if (callback === void 0) { callback = function () { }; }
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/config/" + ConfigName + ".json", "resource/");
        this.configCallBack = callback;
    };
    /**
     * 加载皮肤资源配置
     */
    LoadingUI.prototype.loadThemeConfig = function () {
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
    };
    /**
     * 加载皮肤
     * @param skinName
     */
    LoadingUI.prototype.loadTheme = function (skinName, callback) {
        if (callback === void 0) { callback = function () { }; }
        var theme = new eui.Theme("resource/config/" + skinName + ".json", GameUilt.Stages.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, callback, this);
    };
    /**
     * 配置文件加载完成
     * @param event
     */
    LoadingUI.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        this.configCallBack();
    };
    /**
     * 加载资源组
     * @param groupName
     */
    LoadingUI.prototype.loadResGroup = function (groupName, callback) {
        if (callback === void 0) { callback = function () { }; }
        this.groupName = groupName;
        this.croupCallBack = callback;
        console.log(groupName);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup(this.groupName);
    };
    /**
     * 资源组加载完成
     * @param event
     */
    LoadingUI.prototype.onResourceLoadComplete = function (event) {
        console.log("加载完成");
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        this.croupCallBack();
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    LoadingUI.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    LoadingUI.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    LoadingUI.prototype.onResourceProgress = function (event) {
        console.log(event.itemsLoaded, event.itemsTotal);
        this.setProgress(event.itemsLoaded, event.itemsTotal);
    };
    return LoadingUI;
}(eui.Group));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map