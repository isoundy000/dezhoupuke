/**
 * Created by Administrator on 2017-01-06.
 */
class LayoutUI extends eui.UILayer {
    public UIMap: eui.Group;
    public constructor(){
        super();
        this.UIMap = new eui.Group;
        this.addChild(this.UIMap);
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.init();
    }
    private init(){
        this.UIMap.width = 640;
        this.UIMap.height = GameUilt.Stages.stageH;
        this.UIMap.layout = new eui.BasicLayout();
    }
    private layoutCenter(){
        var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.UIMap.layout = hLayout;   /// 水平布局
    }
    public Run(map: egret.DisplayObject){
        this.UIMap.removeChildren();
        this.UIMap.addChild(map);
    }
    public static _interval: LayoutUI;
    public static get interval(): LayoutUI {
        return (this._interval || (this._interval = new LayoutUI));
    }
}