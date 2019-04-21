var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 这是上帝类，封装了引擎的一些方法，比如帧动画、加载图片。
 * 游戏里的一些元素，比如主角、怪物等都继承自这个上帝类
 */
var Manager = (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        var _this = _super.call(this) || this;
        _this.movieArray = [];
        return _this;
    }
    Manager.prototype.addMovieClip = function (res) {
        this.movieName = res.movieName;
        this.load(this.movieClip, res);
    };
    Manager.prototype.load = function (callback, res) {
        var parent = res.parent, x = res.x, y = res.y, width = res.width, height = res.height;
        var count = 0;
        this.spriteParent = parent;
        var self = this;
        var check = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            count++;
                            if (!(count == 2)) return [3 /*break*/, 2];
                            return [4 /*yield*/, callback.call(self, { x: x, y: y, width: width, height: height })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcTexture = loader.data;
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/" + this.movieName + '.png');
        loader.load(request);
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcData = JSON.parse(loader.data);
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/" + this.movieName + '.json');
        loader.load(request);
    };
    Manager.prototype.movieClip = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var movieName, playTime, callback, frameRate, skewX, skewY, scaleX, scaleY, x, y, width, height, mcDataFactory, movie;
            return __generator(this, function (_a) {
                movieName = res.movieName, playTime = res.playTime, callback = res.callback, frameRate = res.frameRate, skewX = res.skewX, skewY = res.skewY, scaleX = res.scaleX, scaleY = res.scaleY, x = res.x, y = res.y, width = res.width, height = res.height;
                mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
                movie = new egret.MovieClip(mcDataFactory.generateMovieClipData(movieName));
                movie.x = 0;
                movie.y = 0;
                movie.scaleX = movie.scaleY = .9;
                this.spriteParent.addChild(movie);
                movie.x = x;
                movie.y = y;
                movie.gotoAndPlay(0, -1);
                return [2 /*return*/];
            });
        });
    };
    return Manager;
}(egret.Sprite));
__reflect(Manager.prototype, "Manager");
