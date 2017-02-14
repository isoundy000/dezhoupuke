module GameUilt {
	export class Stages {
		/**
		 * 获取舞台
		 */
		public static get stage(){
			return egret.MainContext.instance.stage;
		}

		/**
		 * 舞台宽度
		 */
		public static get stageW(){
			return egret.MainContext.instance.stage.stageWidth;
		}

		/**
		 * 舞台高度
		 */
		public static get stageH() {
			return egret.MainContext.instance.stage.stageHeight;
		}
	}
	/**
	 * webscoket通讯类
	 */
	export class webSocketServer {
		private webSocket: egret.WebSocket;
		public callback: any;

		/**
		 * 构造函数
		 * @param host webscoket服务器地址
		 * @param port webscoket端口
		 */
		public constructor(host: string = "192.168.1.116", port: number = 2346) {
			this.webSocket = new egret.WebSocket();        
			this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
			this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
			this.webSocket.connect(host, port);
			this.callback = function(param){}
		}

		/**
		 * 开始连接webscoket出发的方法
		 */
		private onSocketOpen():void {    
			let dataMap = {
				data: [],
				msg: 'Common|connecting',
				code: 200
			};    
			this.webSocket.writeUTF(JSON.stringify(dataMap));
		}

		/**
		 * 接收webscoket数据
		 * @param e
		 */
		private onReceiveMessage(e:egret.Event):void {    
			let jsonData = null,
				data = this.webSocket.readUTF();
			try{
				jsonData = JSON.parse(data);
			}catch(e){
				egret.log("数据格式错误");
			}
			this.callback(jsonData);
		}

		/**
		 * 发送数据
		 * @param data 发送的数据,默认是空数组
		 * @param msg 发送的消息字符串(说明)
		 * @param code 当前数据代码
		 */
		public onSendData(data:any = [], msg: string = '', code: number = 200){
			let dataMap = {
				data: data,
				msg: msg,
				code: code
			};
			this.webSocket.writeUTF(JSON.stringify(dataMap));
		}

		public static _ins: webSocketServer;
		public static get ins(): webSocketServer {
			return (this._ins || (this._ins = new webSocketServer()));
		}
	}
	/**
	 * 成绩类
	 */
	export class Score {
		public static spareMonoy: number = 100;//备用金币
		public static currentMonoy: number = 0;//当前金币
		public static loginUrl: string;//登录地址
		public static isLogin: boolean = false;//是否登录
		public static memberId: number;//登录用户Id
		private _level: number = 1;//等级
		public _oddGrade: number = 1;//等级差值
		public winNumber: number = 0;//赢的次数
		/**
		 * 获取当前金币
		 * @param isCurrent 是否是当前金币, ,默认为否
		 * @returns {number} 返回金币值
		 */
		public getMonoy(isCurrent: boolean = false): number {
			if(isCurrent) {
				return Score.currentMonoy;
			}
			return Score.spareMonoy;
		}

		/**
		 * 金币自增
		 * @param val 增加的金币, 默认变化1
		 * @param isCurrent 是否是当前金币,默认为否
		 */
		public incMonoy(val: number = 1, isCurrent: boolean = false): void {
			this.winNumber++;
			if(isCurrent){
				Score.currentMonoy += val;
				return ;
			}
			Score.spareMonoy += val;
		}

		/**
		 * 金币自减
		 * @param val 减少的金币, 默认变化1
		 * @param isCurrent 是否是当前金币,默认为否
		 */
		public decMonoy(val: number = 1, isCurrent: boolean = false): void {
			if(isCurrent){
				Score.currentMonoy -= val;
				return ;

				}
			Score.spareMonoy -= val;
		}

		/**
		 * 智能增加金币
		 * @param val
		 * @returns {number}
		 * @constructor
		 */
		public AiIncMoney(val: number = 1): number {
			this.winNumber++;
			if(!Score.isLogin){
				return Score.spareMonoy += val;
			}
			return Score.currentMonoy += val;
		}

		/**
		 * 智能减少金币
		 * @param val
		 * @returns {number}
		 * @constructor
		 */
		public AiDecMoney(val: number = 1): number {
			if(!Score.isLogin){
				return Score.spareMonoy -= val;
			}
			return Score.currentMonoy -= val;
		}

		/**
		 * 获取等级赔率
		 * @param isMax
		 * @returns {number}
		 */
		public getOdds(isMax: boolean = false): number {
			let result: number = 0;
			if(isMax){
				switch (this._level) {
					case 1://等级一
						result = 5;
						break;
					case 2://等级二
						result = 25;
						break;
					case 3://等级三
						result = 125;
						break;
					default:
						break;
				}
			}else {
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
		}

		/**
		 * 设置等级时设置等级差
		 * @param val
		 */
		public setLevel(val: number = 1): void {
			switch (val) {
				case 1:
					this._oddGrade = 1;
					break
				case 2:
					this._oddGrade = 5;
					break
				case 3:
					this._oddGrade = 25;
					break
				default:
					break;
			}
			this._level = val;
		}

		/**
		 * 单例模式
		 */
		public static _ins: Score;
		public static get ins(): Score {
			return (this._ins || (this._ins = new Score()));
		}
	}
	export class Common {
		public static color = 0xfdd752;
	}
}