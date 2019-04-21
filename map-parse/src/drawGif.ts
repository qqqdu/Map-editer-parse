/**
 * 这是上帝类，封装了引擎的一些方法，比如帧动画、加载图片。
 * 游戏里的一些元素，比如主角、怪物等都继承自这个上帝类
 */
class Manager extends egret.Sprite {

    private _mcData
    private _mcTexture
    public movie:egret.MovieClip
    public movieName
    // 主角的容器
    private spriteParent:egret.Sprite
    public movieScale
    public movieArray = []
    constructor() {
        super()
    }
    public addMovieClip(res: {
        parent: egret.Sprite, 
        movieName: string,
        x: number,
        y: number,
        width: number,
        height: number
    }) {
        this.movieName = res.movieName
        this.load(this.movieClip, res)
        
    }
    private load(callback:Function, res):void {
        const {parent,x, y, width, height} = res
        let count:number = 0;
        this.spriteParent = parent
        var self = this;
        var check = async function () {
            count++;
            if (count == 2) {
                await callback.call(self, {x, y, width, height});
            }
        }
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcTexture = loader.data;
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/"+this.movieName + '.png');
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/"+this.movieName + '.json');
        loader.load(request);
    }

    public async movieClip(res) {
        let {
            movieName,
            playTime,
            callback,
            frameRate,
            skewX,
            skewY,
            scaleX,
            scaleY,
            x,y,width,height
        } = res
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        const movie = new egret.MovieClip(mcDataFactory.generateMovieClipData(movieName));
        
        movie.x = 0;
        movie.y = 0;
        movie.scaleX = movie.scaleY = .9
        this.spriteParent.addChild(movie);
        movie.x = x
        movie.y = y
        movie.gotoAndPlay(0, -1);
    }
}