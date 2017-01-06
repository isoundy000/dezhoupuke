/**
 * Created by pior on 16/12/15.
 * 游戏配置
 */

/**声音文件枚举 */
enum SoundName { startgamebgm, gamebgm, end };
/**场景转换效果，对应：无效果，从左往右，淡入淡出，向两边分开 */
enum SceneEffect { NullAction, CrossLeft, TransAlpha, OpenDoor };

class GameConfig {
    public static DEBUG: boolean = true;
    public static IP: string = "api.h5.gamexun.com";        //http连接地址
    public static GAMENAME: string = 'bubblefightv02';      //游戏在服务器上的名字
    public static SERVERNAME: string = 'paopao';            //服务器连接名
    public static FIRSTGAME: string = 'firstgame';          //第一次进游戏标示
    public static GAMESOUND: string = 'gamesound';          //游戏音效
    public static GAMEMUSIC: string = 'gamemusic';          //游戏音乐
    public static SoundName: string[] = [];                 //声音文件名
    public static GUIDESTEPNUM: number = 2;                 //新手引导总步数

    public static DesignWidth: number = 750;         //游戏设计尺寸宽
    public static DesignHeight: number = 1334;       //游戏设计尺寸高

    private stageH: number = 0;                     //视窗高
    private stageW: number = 0;                     //视窗宽

    public bfirstplay: boolean;                     //是否第一次进入游戏
    public bgamesound: boolean;                     //是否开启游戏音效
    public bgamemusic: boolean;                     //是否开启游戏音乐
    public bguidedone: boolean;                     //是否完成新手引导

    public constructor() {
        this.initconfigdata();
    }
    /**初始化游戏配置数据 */
    private initconfigdata() {
        this.bguidedone = true;
        this.bfirstplay = false;
        if (!GameUtil.readLocalData(GameConfig.FIRSTGAME)) {
            GameUtil.saveLocalData(GameConfig.FIRSTGAME, '1');
            GameUtil.saveLocalData(GameConfig.GAMESOUND, '1');
            GameUtil.saveLocalData(GameConfig.GAMEMUSIC, '1');
            this.bfirstplay = true;
        }
        this.bgamemusic = parseInt(GameUtil.readLocalData(GameConfig.GAMEMUSIC)) == 1 ? true : false;
        this.bgamesound = parseInt(GameUtil.readLocalData(GameConfig.GAMESOUND)) == 1 ? true : false;

    }
    /**配置视窗高 */
    public setStageHeight(stageh: number): void {
        this.stageH = stageh;
    }
    public getSH(): number {
        return this.stageH;
    }
    /**配置视窗宽 */
    public setStageWidth(stagew: number): void {
        this.stageW = stagew;
    }
    public getSW(): number {
        return this.stageW;
    }

    private static _instance: GameConfig = null;
    public static _i(): GameConfig {
        if (this._instance == null) {
            this._instance = new GameConfig();
        }

        return this._instance;
    }

}