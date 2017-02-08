class LoadingUI extends eui.Group {
    //资源组名称
    private groupName: string;
    //资源组加载完成后回调函数
    private croupCallBack;
    private configCallBack;
    public constructor() {
        super();
        this.createView();
    }
    /**
     * 进度百分比文字
     */
    private textField:egret.TextField;
    /**
     * 创建一个视图
     */
    private createView():void {
        this.textField = new eui.Label();
        this.addChild(this.textField);
        this.textField.y = GameConfig.DesignHeight / 2;
        this.textField.width = GameConfig.DesignWidth;
        this.textField.height = GameConfig.DesignHeight;
        this.textField.textAlign = "center";
    }
    /**
     * 设置进度
     * @param current
     * @param total
     */
    public setProgress(current:number, total:number):void {
        this.textField.text = `Loading...${current}/${total}`;
    }
    /**
     * 加载json配置文件
     * @param ConfigName
     * @param callback
     */
    public loadConfig(ConfigName: string, callback = function () {}){
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/config/"+ ConfigName +".json", "resource/");
        this.configCallBack = callback;
    }
    /**
     * 加载皮肤资源配置
     */
    private loadThemeConfig(){
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
    }
    /**
     * 加载皮肤
     * @param skinName
     */
    public loadTheme(skinName: string, callback = function () {}){
        let theme = new eui.Theme("resource/config/" +skinName+ ".json", GameUilt.Stages.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, callback, this);
    }
    /**
     * 配置文件加载完成
     * @param event
     */
    private onConfigComplete(event:RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        this.configCallBack();
    }
    /**
     * 加载资源组
     * @param groupName
     */
    public loadResGroup(groupName: string, callback = function(){}) {
        this.groupName = groupName;
        this.croupCallBack = callback;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup(this.groupName);

    }
    /**
     * 资源组加载完成
     * @param event
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        this.croupCallBack();
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        this.setProgress(event.itemsLoaded, event.itemsTotal);
    }
    public static _ins: LoadingUI;
    public static get ins(): LoadingUI {
        return this._ins || (this._ins = new LoadingUI());
    }
}
