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
    /**
     * webscoket通讯类
     */
    var webSocketServer = (function () {
        /**
         * 构造函数
         * @param host webscoket服务器地址
         * @param port webscoket端口
         */
        function webSocketServer(host, port) {
            if (host === void 0) { host = "0.0.0.0"; }
            if (port === void 0) { port = 80; }
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.webSocket.connect(host, port);
            this.callback = function (param) { };
        }
        /**
         * 开始连接webscoket出发的方法
         */
        webSocketServer.prototype.onSocketOpen = function () {
            var dataMap = {
                data: [],
                msg: 'connecting',
                code: 200
            };
            this.webSocket.writeUTF(JSON.stringify(dataMap));
        };
        /**
         * 接收webscoket数据
         * @param e
         */
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
        /**
         * 发送数据
         * @param data 发送的数据,默认是空数组
         * @param msg 发送的消息字符串(说明)
         * @param code 当前数据代码
         */
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
        };
        return webSocketServer;
    }());
    GameUilt.webSocketServer = webSocketServer;
    __reflect(webSocketServer.prototype, "GameUilt.webSocketServer");
    /**
     * 成绩类
     */
    var Score = (function () {
        function Score() {
            this.spareMonoy = 100; //备用金币
            this.currentMonoy = 0; //当前金币
            this.isLogin = 0; //是否登录,0为不游客,其他数字为用户Id
            this._level = 1; //等级
            this._oddGrade = 1; //等级差值
            this.winNumber = 0; //赢的次数
        }
        /**
         * 获取当前金币
         * @param isCurrent 是否是当前金币, ,默认为否
         * @returns {number} 返回金币值
         */
        Score.prototype.getMonoy = function (isCurrent) {
            if (isCurrent === void 0) { isCurrent = false; }
            if (isCurrent) {
                return this.currentMonoy;
            }
            return this.spareMonoy;
        };
        /**
         * 金币自增
         * @param val 增加的金币, 默认变化1
         * @param isCurrent 是否是当前金币,默认为否
         */
        Score.prototype.incMonoy = function (val, isCurrent) {
            if (val === void 0) { val = 1; }
            if (isCurrent === void 0) { isCurrent = false; }
            this.winNumber++;
            if (isCurrent) {
                this.currentMonoy += val;
                return;
            }
            this.spareMonoy += val;
        };
        /**
         * 金币自减
         * @param val 减少的金币, 默认变化1
         * @param isCurrent 是否是当前金币,默认为否
         */
        Score.prototype.decMonoy = function (val, isCurrent) {
            if (val === void 0) { val = 1; }
            if (isCurrent === void 0) { isCurrent = false; }
            if (isCurrent) {
                this.currentMonoy -= val;
                return;
            }
            this.spareMonoy -= val;
        };
        /**
         * 智能增加金币
         * @param val
         * @returns {number}
         * @constructor
         */
        Score.prototype.AiIncMoney = function (val) {
            if (val === void 0) { val = 1; }
            this.winNumber++;
            if (!this.isLogin) {
                return this.spareMonoy += val;
            }
            return this.currentMonoy += val;
        };
        /**
         * 智能减少金币
         * @param val
         * @returns {number}
         * @constructor
         */
        Score.prototype.AiDecMoney = function (val) {
            if (val === void 0) { val = 1; }
            if (!this.isLogin) {
                return this.spareMonoy -= val;
            }
            return this.currentMonoy -= val;
        };
        /**
         * 获取等级赔率
         * @param isMax
         * @returns {number}
         */
        Score.prototype.getOdds = function (isMax) {
            if (isMax === void 0) { isMax = false; }
            var result = 0;
            if (isMax) {
                switch (this._level) {
                    case 1:
                        result = 5;
                        break;
                    case 2:
                        result = 25;
                        break;
                    case 3:
                        result = 125;
                        break;
                    default:
                        break;
                }
            }
            else {
                switch (this._level) {
                    case 1:
                        result = 1;
                        break;
                    case 2:
                        result = 5;
                        break;
                    case 3:
                        result = 25;
                        break;
                    default:
                        break;
                }
            }
            return result;
        };
        /**
         * 设置等级时设置等级差
         * @param val
         */
        Score.prototype.setLevel = function (val) {
            if (val === void 0) { val = 1; }
            switch (val) {
                case 1:
                    this._oddGrade = 1;
                    break;
                case 2:
                    this._oddGrade = 5;
                    break;
                case 3:
                    this._oddGrade = 25;
                    break;
                default:
                    break;
            }
            this._level = val;
        };
        Object.defineProperty(Score, "ins", {
            get: function () {
                return (this._ins || (this._ins = new Score()));
            },
            enumerable: true,
            configurable: true
        });
        return Score;
    }());
    GameUilt.Score = Score;
    __reflect(Score.prototype, "GameUilt.Score");
    var Common = (function () {
        function Common() {
        }
        return Common;
    }());
    Common.color = 0xfdd752;
    GameUilt.Common = Common;
    __reflect(Common.prototype, "GameUilt.Common");
})(GameUilt || (GameUilt = {}));
//# sourceMappingURL=GameUilt.js.map