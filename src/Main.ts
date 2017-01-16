class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        let load = new LoadingUI();
        GameUilt.Stages.stage.addChild(LayoutUI.interval.UIMap);
        LayoutUI.interval.Run(load);
        load.loadConfig("default.res", function () {
            this.loadResGroup("menu", function () {
                this.loadThemeConfig();
                this.loadResGroup("cards", function(){
                    this.loadTheme("default.thm", function () {
                        LayoutUI.interval.Run(new gameScene.Play());
                    });
                });
            });
        });
    }
}
