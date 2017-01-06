module gameScene {
	export class Achieve extends eui.Component {
		private close: eui.Button;
		public constructor() {
			super();
			this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
				LayoutUI.interval.Run(new gameScene.StartGame());
			},this);
		}
	}
}