import webSocketServer = GameUilt.webSocketServer;
import StartGame = gameScene.StartGame;
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
        let self = this;
        //设置基本舞台
        GameUilt.Stages.stage.addChild(LayoutUI.interval.UIMap);
        //运行正在加载场景
        LayoutUI.interval.Run(LoadingUI.ins);
        //加载资源配置文件
        LoadingUI.ins.loadConfig("default.res", function () {
            //加载菜单资源组
            this.loadResGroup("menu", function() {
                //加载主题配置
                this.loadThemeConfig();
                this.loadTheme("default.thm", function () {
                    webSocketServer.ins.callback = function(param){
                        if(param.code == 200){
                            self.connencted();
                        }else{
                            egret.log("连接服务器失败");
                        }
                    };
                });
            });
        });
    }

    /**
     * 连接webscoket回调方法
     */
    private connencted(){
        let data = this.GetRequest();
        webSocketServer.ins.onSendData(data, 'Common|isLogin');
        webSocketServer.ins.callback = function(param){
            GameUilt.Score.loginUrl = param.data.loginUrl;
            if(param.data.loginStatus){
                GameUilt.Score.isLogin = true;
                GameUilt.Score.memberId = param.data.memberId;
                GameUilt.Score.currentMonoy = parseInt(param.data.money);
                LayoutUI.interval.Run(new gameScene.GameSelect);
            }else{
                LayoutUI.interval.Run(new gameScene.StartGame);
            }
        }
    }

    /**
     * 获取Url参数
     * @returns {Object}
     * @constructor
     */
    private GetRequest() {
        let url = location.search,
            theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1),
                strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
}
