/**
 * Created by Administrator on 2017-01-09.
 */
module gameScene {
    export class Play extends eui.Component {
        public constructor() {
            super();
            this.init();
        }
        private results: Array<number>;//数据集合
        private odds: number;//赔率
        public init(): void {
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
            this.changeResults();
        }
        private resultDataMap: eui.Group;
        private pokerGroup: eui.Group;
        private changeResults(){
            let resultMap = this.resultDataMap;
            for(let i = 0; i < resultMap.length; i++){
                resultMap[i].text = this.results[i] * this.odds;
            }
        }
    }
}