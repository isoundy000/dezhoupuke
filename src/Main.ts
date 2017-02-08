class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    /**
     * 引擎加载完成回调方法
     * @param event
     */
    private onAddToStage(event: egret.Event) {
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
    }
}
