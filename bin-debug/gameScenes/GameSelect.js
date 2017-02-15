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
var gameScene;
(function (gameScene) {
    var Common = GameUilt.Common;
    var Score = GameUilt.Score;
    var GameSelect = (function (_super) {
        __extends(GameSelect, _super);
        function GameSelect() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        GameSelect.prototype.init = function () {
            this.skinName = skin.gameMenu;
            this.setTextColor();
            this.addEventListener('complete', function () {
                this.loop.play();
            }, this);
            this.start.play();
            this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(new gameScene.StartGame());
            }, this);
            this.achieve.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                LayoutUI.interval.Run(new gameScene.Achieve());
            }, this);
            this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.purchase();
            }, this);
        };
        /**
         * 购买多少筹码
         * @param val
         */
        GameSelect.prototype.purchase = function (val) {
            if (val === void 0) { val = 0; }
            webSocketServer.ins.onSendData({ number: val }, 'Order|createOrder');
            webSocketServer.ins.callback = function (param) {
                if (param.code == 200) {
                    window.location.href = param.data.url;
                }
            };
        };
        GameSelect.prototype.setTextColor = function () {
            this.spareMonoy.textColor = Common.color;
            this.spareMonoy.text = String(GameUilt.Score.ins.getMonoy());
            this.currentMonoy.textColor = Common.color;
            this.currentMonoy.text = String(GameUilt.Score.ins.getMonoy(true));
            for (var i = 0; i < 5; i++) {
                var map = this['text' + i];
                map.textColor = Common.color;
            }
            var moneys = [0, 500, 2500];
            var _loop_1 = function (j) {
                var maps = this_1['levelBtn' + j];
                maps.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    this.select(j, moneys[j - 1]);
                }, this_1);
                if (Score.ins.maxLevel >= j) {
                    maps.texture = RES.getRes("4_06_png");
                }
            };
            var this_1 = this;
            for (var j = 1; j < 4; j++) {
                _loop_1(j);
            }
        };
        /**
         * 判断是否需要购买开通
         * @param level
         * @param money
         */
        GameSelect.prototype.select = function (level, money) {
            if (Score.ins.maxLevel >= level) {
                this.startGame(level);
            }
            else {
                this.purchase(money);
            }
        };
        /**
         * 开始游戏,并设置当前游戏等级
         * @param level
         */
        GameSelect.prototype.startGame = function (level) {
            LayoutUI.interval.Run(LoadingUI.ins);
            GameUilt.Score.ins.setLevel(level);
            //加载卡牌资源组
            LoadingUI.ins.loadResGroup("cards", function () {
                LayoutUI.interval.Run(new gameScene.Play());
            });
        };
        return GameSelect;
    }(eui.Component));
    gameScene.GameSelect = GameSelect;
    __reflect(GameSelect.prototype, "gameScene.GameSelect");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=GameSelect.js.map