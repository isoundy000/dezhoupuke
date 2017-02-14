var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var webSocketServer = GameUilt.webSocketServer;
var StartGame = gameScene.StartGame;
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
        var self = this;
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
                    webSocketServer.ins.callback = function (param) {
                        if (param.code == 200) {
                            self.connencted();
                        }
                        else {
                            egret.log("连接服务器失败");
                        }
                    };
                });
            });
        });
    };
    /**
     * 连接webscoket回调方法
     */
    Main.prototype.connencted = function () {
        var data = this.GetRequest();
        webSocketServer.ins.onSendData(data, 'Common|isLogin');
        webSocketServer.ins.callback = function (param) {
            GameUilt.Score.loginUrl = param.data.loginUrl;
            if (param.data.loginStatus) {
                GameUilt.Score.isLogin = true;
                GameUilt.Score.memberId = param.data.memberId;
                GameUilt.Score.currentMonoy = parseInt(param.data.money);
                console.log(GameUilt.Score.ins.getMonoy(true));
                LayoutUI.interval.Run(new gameScene.GameSelect);
            }
            else {
                LayoutUI.interval.Run(new gameScene.StartGame);
            }
        };
    };
    /**
     * 获取Url参数
     * @returns {Object}
     * @constructor
     */
    Main.prototype.GetRequest = function () {
        var url = location.search, theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1), strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map