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
	export class webSocketServer {
		private webSocket: egret.WebSocket;
		public callback: any;
		public sendCall: any;
		public constructor(host: string = "0.0.0.0", port: number = 80) {    
			this.webSocket = new egret.WebSocket();        
			this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
			this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
			this.webSocket.connect(host, port);
			this.callback = function(param){}
			this.sendCall = function(...param){
				
			}
		}
		private onSocketOpen():void {    
			let dataMap = {
				data: [],
				msg: '连接服务器',
				code: 200
			};    
			this.webSocket.writeUTF(JSON.stringify(dataMap));
		}
		//接收数据
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

		//发送数据
		public onSendData(data:any = [], msg: string = '', code: number = 200){
			let dataMap = {
				data: data,
				msg: msg,
				code: code
			};
			this.webSocket.writeUTF(JSON.stringify(dataMap));
			//return this.webSocket;
		}
	}
}