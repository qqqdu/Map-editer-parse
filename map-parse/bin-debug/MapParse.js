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
 * 你可以传入callback方法，我会在渲染格子的时候调用它，参数是 matrixItem
 */
var DMapParse = (function (_super) {
    __extends(DMapParse, _super);
    function DMapParse(fileName) {
        var _this = this;
        var objs = RES.getRes(fileName);
        _this = _super.call(this) || this;
        _this.bindLayer(objs);
        return _this;
    }
    DMapParse.prototype.bindLayer = function (layer) {
        this.layer = layer;
        this.layers = new egret.Sprite();
    };
    /**
     * x: 开始横坐标格子
     * y：开始纵坐标格子
     * row：结束横坐标格子
     * col：结束纵坐标格子
     */
    DMapParse.prototype.renderLayer = function (res) {
        var _this = this;
        this.renderRow = res.row;
        this.renderCol = res.col;
        this.startY = res.x;
        this.startX = res.y;
        this.width = this.layer.boxWidth * res.row;
        this.height = this.layer.boxHeight * res.col;
        this.layer.layers.forEach(function (layer) {
            if (!layer.show) {
                return;
            }
            var Slayer = new egret.Sprite();
            Slayer.width = _this.width;
            Slayer.height = _this.height;
            // Slayer.x = Slayer.y = 0
            _this.renderMatrix(layer.matrix, Slayer);
            _this.addChild(Slayer);
        });
    };
    DMapParse.prototype.renderMatrix = function (matrix, Slayer) {
        var _this = this;
        matrix.map(function (row, index) {
            if (index > _this.renderRow || index < _this.startX) {
                return;
            }
            var cols = row.forEach(function (item, indexT) { return __awaiter(_this, void 0, void 0, function () {
                var key, img;
                return __generator(this, function (_a) {
                    if (indexT > this.renderCol || indexT < this.startY) {
                        return [2 /*return*/];
                    }
                    key = index + "-" + indexT;
                    // 控制权交给用户
                    if (this.callback) {
                        this.callback(matrix);
                        return [2 /*return*/];
                    }
                    if (item.name) {
                        // 动图
                        if (item.name.toLocaleLowerCase().indexOf('gif') !== -1) {
                            console.log(item.name, indexT, index, item.width, item.height);
                            this.gSprite = new Manager();
                            this.gSprite.addMovieClip({
                                parent: Slayer,
                                movieName: item.name.split('.')[0],
                                x: this.layer.boxWidth * indexT,
                                y: this.layer.boxHeight * index,
                                width: item.width,
                                height: item.height
                            });
                            return [2 /*return*/];
                        }
                        img = this.drawImg({
                            width: item.width,
                            height: item.height,
                            name: item.name.replace('.', '_'),
                            row: indexT,
                            col: index
                        });
                        Slayer.addChild(img);
                    }
                    return [2 /*return*/];
                });
            }); });
        });
    };
    // 画静态图
    DMapParse.prototype.drawImg = function (res) {
        var img = new egret.Bitmap();
        img.texture = RES.getRes(res.name);
        img.width = res.width;
        img.height = res.height;
        img.x = this.layer.boxWidth * res.row;
        img.y = this.layer.boxHeight * res.col;
        return img;
    };
    return DMapParse;
}(egret.Sprite));
__reflect(DMapParse.prototype, "DMapParse");
