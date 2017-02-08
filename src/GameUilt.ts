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
		public constructor(host: string = "0.0.0.0", port: number = 80) {    
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
				msg: 'connecting',
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
				egret.log("接收数据失败");
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
	}
	/**
	 * 成绩类
	 */
	export class Score {
		private spareMonoy: number = 2500;//备用金币
		private currentMonoy: number = 0;//当前金币
		/**
		 * 获取当前金币
		 * @param isCurrent 是否是当前金币, ,默认为否
		 * @returns {number} 返回金币值
		 */
		public getMonoy(isCurrent = false): number {
			if(isCurrent) {
				return this.currentMonoy;
			}
			return this.spareMonoy;
		}

		/**
		 * 金币自增
		 * @param val 增加的金币, 默认变化1
		 * @param isCurrent 是否是当前金币,默认为否
		 */
		public incMonoy(val: number = 1, isCurrent = false): void {
			if(isCurrent){
				this.currentMonoy += val;
				return ;
			}
			this.spareMonoy += val;
		}

		/**
		 * 金币自减
		 * @param val 减少的金币, 默认变化1
		 * @param isCurrent 是否是当前金币,默认为否
		 */
		public decMonoy(val: number = 1, isCurrent = false): void {
			if(isCurrent){
				this.currentMonoy -= val;
				return ;

				}
			this.spareMonoy -= val;
		}

		/**
		 * 单例模式
		 */
		public static _ins: Score;
		public static get ins(): Score {
			return (this._ins || (this._ins = new Score()));
		}
	}
}