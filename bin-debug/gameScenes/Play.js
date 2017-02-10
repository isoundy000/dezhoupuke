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
    var Score = GameUilt.Score;
    var Common = GameUilt.Common;
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super.call(this) || this;
            _this.odds = 1; //赔率
            _this.putCardBtnStatus = false; //是否为发牌
            _this.maxOdds = 5; //赔率
            _this.minOdds = 1; //最小赔率
            _this.cardNumber = 5; //卡牌数量
            //发牌数据
            _this.dealCards = [
                {
                    val: 1,
                    type: 1,
                    lock: false
                },
                {
                    val: 10,
                    type: 3,
                    lock: false
                },
                {
                    val: 12,
                    type: 1,
                    lock: false
                },
                {
                    val: 6,
                    type: 2,
                    lock: false
                },
                {
                    val: 13,
                    type: 2,
                    lock: false
                },
            ];
            _this.rotateTime = 100; //旋转时间
            _this.oddBtnAlpha = 0.3;
            var self = _this;
            _this.socketServer = new GameUilt.webSocketServer("192.168.1.116", 2346);
            _this.socketServer.callback = function (param) {
                if (param.msg == "connencted") {
                    this.onSendData({}, 'randToCards');
                }
                else {
                    self.dealCards = param.data;
                    self.init();
                }
            };
            return _this;
        }
        /**
         * 初始化
         */
        Play.prototype.init = function () {
            this.skinName = skin.plays;
            this.resultInit();
            this.odds = Score.ins._oddGrade;
            this.setScoreResult();
            this.titleNumberInit();
            this.pokerGroupPropertyX = this.pokerGroup.x;
            this.start.play(1);
            this.start.addEventListener(egret.Event.COMPLETE, this.loopAmAction, this);
            this.addButtonsLister();
            this.addAmMap.touchEnabled = false;
            this.addOddsBtn.touchEnabled = true;
            this.addAmMap.alpha = 0;
            this.lockInit();
            this.switchPutCardBtn(true);
        };
        /**
         * 结果值初始化
         */
        Play.prototype.resultInit = function () {
            this.results = [
                150,
                80,
                50,
                25,
                9,
                6,
                4,
                3,
                2,
                1
            ];
        };
        /**
         * 初始化卡牌锁为false
         * @param is
         */
        Play.prototype.lockInit = function (is) {
            if (is === void 0) { is = false; }
            for (var i = 0; i < this.dealCards.length; i++) {
                this.dealCards[i].lock = false;
                var maskMap = eval("this.mask" + i);
                var lockMap = eval("this.lock" + i);
                maskMap.alpha = 0;
                lockMap.alpha = 0;
            }
        };
        /**
         * 设置标题字体颜色和内容
         */
        Play.prototype.titleNumberInit = function () {
            this.spareMonoy.textColor = Common.color;
            this.currentMonoy.textColor = Common.color;
            this.oddsText.textColor = Common.color;
            this.winNumberText.textColor = Common.color;
            this.resultText.textColor = Common.color;
            this.setOddsText();
            this.setWinText();
            this.setMoneyText();
        };
        /**
         * 循环播放动画
         */
        Play.prototype.loopAmAction = function () {
            this.loop.stop();
            //无限循环 start
            this.loop.addEventListener(egret.Event.COMPLETE, this.loopAmAction, this);
            this.loop.play(1);
            //无限循环 end
        };
        /**
         * 设置结果分数: 根据赔率调整
         */
        Play.prototype.setScoreResult = function () {
            for (var i = 0; i < this.results.length; i++) {
                var scoreMap = eval("this.score" + (i + 1));
                scoreMap.text = this.results[i] * this.odds;
                scoreMap.textColor = Common.color;
            }
        };
        /**
         * 所有按钮添加侦听
         */
        Play.prototype.addButtonsLister = function () {
            var _this = this;
            var self = this;
            this.addOddsAmProperty = {
                x: this.addAmMap.x,
                y: this.addAmMap.y,
                scaleX: 1,
                scaleY: 1,
            };
            //侦听添加赔率按钮的点击事件
            this.addOddsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.odds < _this.maxOdds) {
                    //赔率自增
                    _this.odds++;
                    _this.setOddTextAndResults();
                    _this.addOdd_am.addEventListener(egret.Event.COMPLETE, _this.reSetaddOddAm, _this);
                    _this.addOdd_am.play(1);
                    if (_this.odds == _this.maxOdds) {
                        _this.minAndMaxSelect(true);
                    }
                    else {
                        _this.minOddBtn.alpha = 1;
                        _this.maxOddBtn.alpha = 1;
                        _this.maxOddBtn.touchEnabled = true;
                        _this.minOddBtn.touchEnabled = true;
                    }
                }
            }, this);
            this.minOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.odds = _this.minOdds;
                _this.setOddTextAndResults();
                _this.minAndMaxSelect(false);
            }, this);
            this.maxOddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.odds = _this.maxOdds;
                _this.setOddTextAndResults();
                _this.minAndMaxSelect(true);
            }, this);
            this.putCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (!_this.putCardBtnStatus) {
                    var item = 0, data = [];
                    for (var i = 0; i < self.dealCards.length; i++) {
                        if (!self.dealCards[i].lock) {
                            item++;
                            data.push({
                                val: self.dealCards[i].val,
                                type: self.dealCards[i].type,
                            });
                        }
                    }
                    _this.socketServer.onSendData({ number: item, data: data }, 'takeCards');
                    self.oddsBtnStatus(4);
                    _this.socketServer.callback = function (param) {
                        var item = param.data.length - 1;
                        for (var i = 0; i < self.dealCards.length; i++) {
                            if (!self.dealCards[i].lock) {
                                var cardMap = eval('self.card' + i);
                                var cardMap1 = eval("self");
                                self.dealCards[i].val = param.data[item].val;
                                self.dealCards[i].type = param.data[item].type;
                                item--;
                            }
                        }
                        self.rotate();
                        egret.setTimeout(self.computeToEffect, self, self.rotateTime * 3.5);
                    };
                }
                else {
                    if (!Score.ins.isLogin) {
                        _this.spareMonoy.text = String(Score.ins.AiDecMoney(_this.odds));
                    }
                    _this.switchPutCardBtn(!_this.putCardBtnStatus);
                }
            }, this);
            this.card0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (!_this.putCardBtnStatus) {
                    _this.switchLockStatue(0);
                }
            }, this);
            this.card1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (!_this.putCardBtnStatus) {
                    _this.switchLockStatue(1);
                }
            }, this);
            this.card2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (!_this.putCardBtnStatus) {
                    _this.switchLockStatue(2);
                }
            }, this);
            this.card3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (!_this.putCardBtnStatus) {
                    _this.switchLockStatue(3);
                }
            }, this);
            this.card4.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (!_this.putCardBtnStatus) {
                    _this.switchLockStatue(4);
                }
            }, this);
        };
        /**
         * 重新设置添加赔率动画
         */
        Play.prototype.reSetaddOddAm = function () {
            this.addOdd_am.removeEventListener(egret.Event.COMPLETE, this.reSetaddOddAm, this);
            this.addAmMap.x = this.addOddsAmProperty.x;
            this.addAmMap.y = this.addOddsAmProperty.y;
            this.addAmMap.scaleX = this.addOddsAmProperty.scaleX;
            this.addAmMap.scaleY = this.addOddsAmProperty.scaleY;
            this.addAmMap.alpha = 0;
        };
        /**
         * 最大最小赔率切换
         * @param isMax
         */
        Play.prototype.minAndMaxSelect = function (isMax) {
            if (isMax === void 0) { isMax = false; }
            this.loop.stop();
            if (!isMax)
                this.loop.play(1);
            this.switchOddBtnStatus(false);
        };
        /**
         * 设置赔率文本和结果
         */
        Play.prototype.setOddTextAndResults = function () {
            //设置赔率显示的文本
            this.setOddsText();
            //设置赔率后的结果
            this.setScoreResult();
        };
        /**
         * 卡牌锁状态切换
         * @param item
         */
        Play.prototype.switchLockStatue = function (item) {
            var cardMap = eval("this.card" + item), maskMap = eval("this.mask" + item), lockMap = eval("this.lock" + item), cardData = this.dealCards[item];
            var tw = egret.Tween.get(cardMap);
            tw.to({ scaleX: 0.8, scaleY: 0.8 }, 100);
            tw.to({ scaleX: 1, scaleY: 1 }, 100);
            if (cardData.lock) {
                var tw1 = egret.Tween.get(maskMap);
                tw1.to({ alpha: 0 }, 200);
                var tw2 = egret.Tween.get(lockMap);
                tw2.to({ alpha: 0 }, 200);
                cardData.lock = false;
            }
            else {
                var tw1 = egret.Tween.get(maskMap);
                tw1.to({ alpha: 1 }, 200);
                var tw2 = egret.Tween.get(lockMap);
                tw2.to({ alpha: 1 }, 200);
                cardData.lock = true;
            }
        };
        //切换发牌和抽牌按钮
        Play.prototype.switchPutCardBtn = function (is) {
            if (is) {
                for (var i = 0; i < this.cardNumber; i++) {
                    var map = eval("this.card" + i);
                    if (!this.dealCards[i].lock) {
                        map.texture = RES.getRes("8_17_png");
                    }
                }
                this.switchOddBtnStatus(is);
            }
            else {
                this.oddsBtnStatus(5, false);
                this.loop.stop();
                this.rotate();
            }
            var resName;
            resName = (is) ? "4_09_png" : "4_12_png";
            this.putCardBtn.texture = RES.getRes(resName);
            this.putCardBtnStatus = is;
        };
        /**
         * 结果效果及处理
         */
        Play.prototype.computeToEffect = function () {
            var self = this;
            this.socketServer.onSendData([], 'getResult');
            this.socketServer.callback = function (param) {
                console.log("游戏结果");
                console.log(param['data']);
                if (param['data']['code'] > -1) {
                    var val = self.results[param['data']['code']] * self.odds;
                    Score.ins.AiIncMoney(val);
                }
                self.setWinText();
                self.setMoneyText();
                self.winActon(param['data']);
                egret.setTimeout(self.restart, self, 5000);
            };
        };
        Play.prototype.winActon = function (winData) {
            this.resultText.text = winData['msg'];
            if (winData['code'] > -1) {
                this.resultAction.addEventListener(egret.Event.COMPLETE, this.resultActionComplate, this);
            }
            this.resultAction.play(1);
        };
        Play.prototype.resultActionComplate = function () {
            this.resultAction.removeEventListener(egret.Event.COMPLETE, this.resultActionComplate, this);
            var texture = RES.getRes("wintextstar_png"), config = RES.getRes("winAm_json");
            this.winAm = new particle.GravityParticleSystem(texture, config);
            this.winAm.x = 300;
            this.winAm.y = 430;
            this.addChild(this.winAm);
            this.winAm.start();
            egret.setTimeout(function () {
                this.winAm.stop();
                this.winAm = null;
            }, this, 100);
        };
        /**
         * 设置金币文本
         */
        Play.prototype.setMoneyText = function () {
            if (Score.ins.isLogin) {
                this.currentMonoy.text = String(Score.ins.getMonoy(true));
            }
            else {
                this.spareMonoy.text = String(Score.ins.getMonoy());
            }
        };
        Play.prototype.setWinAm = function () {
            if (this.winAm != null) {
                this.removeChild(this.winAm);
            }
            this.resultAction1.play(1);
        };
        /**
         * 重新开始
         */
        Play.prototype.restart = function () {
            var self = this;
            this.setWinAm();
            this.pokerGroup.x = this.pokerGroupPropertyX;
            this.socketServer.onSendData({}, 'randToCards');
            this.socketServer.callback = function (param) {
                self.dealCards = param.data;
                self.lockInit();
                self.oddsBtnStatus(4, true);
                for (var i = 0; i < self.cardNumber; i++) {
                    var map = eval("self.card" + i);
                    if (!self.dealCards[i].lock) {
                        map.texture = RES.getRes("8_17_png");
                    }
                }
                self.start.play(1);
                self.switchPutCardBtn(!this.putCardBtnStatus);
            };
        };
        /**
         * 切换赔率按钮状态
         * @param is
         */
        Play.prototype.switchOddBtnStatus = function (is) {
            //最大赔率
            if (this.odds == this.maxOdds) {
                this.oddsBtnStatus(1, false);
                this.oddsBtnStatus(2, true);
                this.oddsBtnStatus(3, false);
            }
            else if (this.odds == this.minOdds) {
                this.oddsBtnStatus(1, true);
                this.oddsBtnStatus(2, false);
                this.oddsBtnStatus(3, true);
            }
            else {
                this.oddsBtnStatus(1, true);
                this.oddsBtnStatus(2, true);
                this.oddsBtnStatus(3, true);
            }
        };
        /**
         * 赔率相关的按钮 && 发牌按钮的触摸事件和透明度设置
         * @param type 按钮类型
         * @param status 状态: 是否可触屏
         */
        Play.prototype.oddsBtnStatus = function (type, status) {
            if (type === void 0) { type = 1; }
            if (status === void 0) { status = false; }
            var alpha = (status) ? 1 : this.oddBtnAlpha, btn;
            switch (type) {
                case 1:
                    btn = ['addOddsBtn'];
                    break;
                case 2:
                    btn = ['minOddBtn'];
                    break;
                case 3:
                    btn = ['maxOddBtn'];
                    break;
                case 4:
                    btn = ['putCardBtn'];
                    break;
                case 5:
                    btn = [
                        'addOddsBtn',
                        'minOddBtn',
                        'maxOddBtn',
                    ];
                    break;
                case 6:
                    btn = [
                        'addOddsBtn',
                        'minOddBtn',
                        'maxOddBtn',
                        'putCardBtn',
                    ];
                    break;
            }
            for (var i = 0; i < btn.length; i++) {
                var map = eval('this.' + btn[i]);
                map.touchEnabled = status;
                map.alpha = alpha;
            }
        };
        /**
         * 设置赢得次数文本
         */
        Play.prototype.setWinText = function () {
            this.winNumberText.text = String(Score.ins.winNumber);
        };
        /**
         * 设置赔率
         */
        Play.prototype.setOddsText = function () {
            this.oddsText.text = String(this.odds);
        };
        /**
         * 牌旋转
         */
        Play.prototype.rotate = function () {
            var _this = this;
            for (var i = 0; i < this.cardNumber; i++) {
                if (this.dealCards[i].lock)
                    continue;
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
        return Play;
    }(eui.Component));
    gameScene.Play = Play;
    __reflect(Play.prototype, "gameScene.Play");
})(gameScene || (gameScene = {}));
//# sourceMappingURL=Play.js.map