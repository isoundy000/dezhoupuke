var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUilt;
(function (GameUilt) {
    var Stages = (function () {
        function Stages() {
        }
        Object.defineProperty(Stages, "stage", {
            /**
             * 获取舞台
             */
            get: function () {
                return egret.MainContext.instance.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stages, "stageW", {
            /**
             * 舞台宽度
             */
            get: function () {
                return egret.MainContext.instance.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stages, "stageH", {
            /**
             * 舞台高度
             */
            get: function () {
                return egret.MainContext.instance.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        return Stages;
    }());
    GameUilt.Stages = Stages;
    __reflect(Stages.prototype, "GameUilt.Stages");
    var webSocketServer = (function () {
        function webSocketServer(host, port) {
            if (host === void 0) { host = "0.0.0.0"; }
            if (port === void 0) { port = 80; }
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.webSocket.connect(host, port);
            this.callback = function (param) { };
            this.sendCall = function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
            };
        }
        webSocketServer.prototype.onSocketOpen = function () {
            var dataMap = {
                data: [],
                msg: '连接服务器',
                code: 200
            };
            this.webSocket.writeUTF(JSON.stringify(dataMap));
        };
        //接收数据
        webSocketServer.prototype.onReceiveMessage = function (e) {
            var jsonData = null, data = this.webSocket.readUTF();
            try {
                jsonData = JSON.parse(data);
            }
            catch (e) {
                egret.log("接收数据失败");
            }
            this.callback(jsonData);
        };
        //发送数据
        webSocketServer.prototype.onSendData = function (data, msg, code) {
            if (data === void 0) { data = []; }
            if (msg === void 0) { msg = ''; }
            if (code === void 0) { code = 200; }
            var dataMap = {
                data: data,
                msg: msg,
                code: code
            };
            this.webSocket.writeUTF(JSON.stringify(dataMap));
            //return this.webSocket;
        };
        return webSocketServer;
    }());
    GameUilt.webSocketServer = webSocketServer;
    __reflect(webSocketServer.prototype, "GameUilt.webSocketServer");
})(GameUilt || (GameUilt = {}));
//# sourceMappingURL=GameUilt.js.map