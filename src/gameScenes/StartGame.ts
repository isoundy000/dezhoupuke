module gameScene {
	import Score = GameUilt.Score;
	export class StartGame extends eui.Component {
		public constructor() {
			super();
			this.init();
		}
		/**
		 * EXML中对应id为tweenGroup的动画组对象
		 */
		public menu_in_am: egret.tween.TweenGroup;
		public gload_loop: egret.tween.TweenGroup;
		public gload_loop1: egret.tween.TweenGroup;
		public menu_out_am: egret.tween.TweenGroup;
		public startPalyBtn: eui.Button;
		private loginBtn: eui.Button;

		/**
		 * 初始化界面
		 */
		public init(): void {
			this.skinName = skin.menu;
			this.loginBtnAction();
			this.menu_in_am.addEventListener('complete', function () {
				this.startPalyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnClick, this);
			}, this);

			this.menu_in_am.play();

			this.gload_loop1.addEventListener('complete', function(){
				this.gload_loop1.play(2);
			}, this);
			this.gload_loop1.play();

			this.gload_loop.addEventListener('complete', function(){
				this.gload_loop.play(1);
			}, this);
			this.gload_loop.play(1);
		}

		/**
		 * 登录按钮相关的操作
		 */
		private loginBtnAction() {
			if(Score.isLogin){
				this.loginBtn.alpha = 0;
				this.loginBtn.touchEnabled = false;
				return ;
			}
			this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginBtnClick, this);
		}

		/**
		 * 开始按钮点击事件
		 */
		private startBtnClick(){
			this.menu_out_am.play();
			this.gload_loop.pause();
			this.gload_loop1.pause();
			LayoutUI.interval.Run(new gameScene.GameSelect());
		}

		/**
		 * 登录按钮点击事件
		 */
		private loginBtnClick(){
			window.location.href = Score.loginUrl;
		}

		/**
		 * 动画组播放完成
		 */
		private onTweenGroupComplete(): void {
			console.log('TweenGroup play completed.');
		}
		/**
		 * 动画组中的一项播放完成
		 */
		private onTweenItemComplete(event: egret.Event): void {
			const item = event.data as egret.tween.TweenItem;
			console.log(item.target);
			console.log('TweenItem play completed.');
		}
	}
}