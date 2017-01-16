var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Administrator on 2017-01-09.
 */
var gameScene;
(function (gameScene) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super.call(this) || this;
            _this.rotateTime = 300; //旋转时间
            _this.cardNumber = 5; //卡牌数量
            //发牌数据
            _this.dealCards = [
                {
                    val: 1,
                    type: 1
                },
                {
                    val: 10,
                    type: 3
                },
                {
                    val: 12,
                    type: 1
                },
                {
                    val: 6,
                    type: 2
                },
                {
                    val: 13,
                    type: 2
                },
            ];
            _this.MaxOdds = 6; //最大赔率
            _this.init();
            return _this;
        }
        Play.prototype.init = function () {
            var _this = this;
            this.results = [
                250,
                50,
                25,
                9,
                6,
                4,
                3,
                2,
                1
            ];
            this.skinName = skin.plays;
            this.odds = 1;
            this.setScoreResult();
            this.start.play();
            var self = this;
            this.start.addEventListener(egret.Event.COMPLETE, function () {
                self.rotate();
                _this.loop.addEventListener(egret.Event.COMPLETE, function () {
                    _this.loop.play(1);
                }, _this);
                _this.loop.play(1);
            }, this);
            this.setOddsText();
            this.addButtonsLister();
            this.addAmMap.touchEnabled = false;
            this.addOddsBtn.touchEnabled = true;
        };
        /**
         * 设置结果分数: 根据赔率调整
         */
        Play.prototype.setScoreResult = function () {
            for (var i = 0; i < this.results.length; i++) {
                var scoreMap = eval("this.score" + (i + 1));
                scoreMap.text = this.results[i] * this.odds;
            }
        };
        //旋转
        Play.prototype.rotate = function () {
            var _this = this;
            for (var i = 0; i < this.cardNumber; i++) {
                var map = eval("this.card" + i);
                var tw = egret.Tween.get(map);
                tw.to({ scaleX: 0 }, this.rotateTime);
                tw.call(function (param) {
                    var map1 = eval("this.card" + param);
                    map1.texture = RES.getRes(_this.dealCards[param].val + "_" + _this.dealCards[param].type + "_png");
                    var tw1 = egret.Tween.get(map1);
                    tw1.to({ scaleX: 1 }, _this.rotateTime);
                }, this, [i]);
            }
        };
        Play.prototype.setOddsText = function () {
            this.oddsText.text = String(this.odds);
        };
        //所有按钮添加侦听
        Play.prototype.addButtonsLister = function () {
            var _this = this;
            this.addOddsAmProperty = {
                x: this.addAmMap.x,
                y: this.addAmMap.y,
                scaleX: 1,
                scaleY: 1,
            };
            //侦听添加赔率按钮的点击事件
            this.addOddsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.odds < _this.MaxOdds) {
                    //赔率自增
                    _this.odds++;
                    _this.setOddTextAndResults();
                    _this.addOdd_am.addEventListener(egret.Event.COMPLETE, _this.reSetaddOddAm, _this);
                    _this.addOdd_am.play(1);
                    if (_this.odds == _this.MaxOdds) {
                    }
                }
            }, this);
            this.minOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.odds = 1;
                _this.setOddTextAndResults();
                _this.minAndMaxSelect(false);
            }, this);
            this.maxOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.odds = _this.MaxOdds - 1;
                _this.setOddTextAndResults();
                _this.minAndMaxSelect(true);
            }, this);
        };
        //重新设置添加赔率动画
        Play.prototype.reSetaddOddAm = function () {
            this.addOdd_am.removeEventListener(egret.Event.COMPLETE, this.reSetaddOddAm, this);
            this.addAmMap.x = this.addOddsAmProperty.x;
            this.addAmMap.y = this.addOddsAmProperty.y;
            this.addAmMap.scaleX = this.addOddsAmProperty.scaleX;
            this.addAmMap.scaleY = this.addOddsAmProperty.scaleY;
            this.addAmMap.alpha = 1;
        };
        //最大最小赔率切换
        Play.prototype.minAndMaxSelect = function (isMax) {
            var _this = this;
            if (isMax === void 0) { isMax = false; }
            if (isMax) {
                this.maxOddBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.odds = _this.MaxOdds - 1;
                    _this.setOddTextAndResults();
                }, this);
                this.maxOddBtn.alpha = 0.5;
                this.minOddBtn.alpha = 1;
            }
            else {
                this.minOddBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.odds = 1;
                    _this.setOddTextAndResults();
                }, this);
                this.minOddBtn.alpha = 0.5;
                this.maxOddBtn.alpha = 1;
            }
        };
        Play.prototype.setOddTextAndResults = function () {
            //设置赔率显示的文本
            this.setOddsText();
            //设置赔率后的结果
            this.setScoreResult();
        };
        return Play;
    }(eui.Component));
    gameScene.Play = Play;
    __reflect(Play.prototype, "gameScene.Play");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=Play.js.map