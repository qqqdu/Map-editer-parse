
interface matrixItem {
    src: string | undefined;
    width: number;
    row: number;
    col: number;
    height: number;
    name: string;
    extra?: Array<any>
}

interface LayerItem {
    // 图层id
    id: number,
    // 图层名称
    name: string,
    // 是否显示
    show: boolean,
    matrix: Array<Array<matrixItem>>
}
interface layer {
    layers: Array<LayerItem>;
    // 表格横轴个数
    tableRow: number;
    // 表格纵轴个数
    tableCol: number;
    // 单元格宽度和高度
    boxWidth: number;
    boxHeight: number;
    name: string
}
/**
 * 你可以传入callback方法，我会在渲染格子的时候调用它，参数是 matrixItem
 */
class DMapParse extends egret.Sprite {
    private layer: layer
    private layers: egret.Sprite
    private startX: number
    private startY: number
    private renderRow: number
    private renderCol: number
    public callback: Function
    private gSprite: Manager
    constructor(fileName: string) {
        const objs: layer = RES.getRes(fileName);
        super()
        this.bindLayer(objs)
    }
    private bindLayer(layer: layer) {
        this.layer = layer
        this.layers = new egret.Sprite()
    }
    /**
     * x: 开始横坐标格子
     * y：开始纵坐标格子
     * row：结束横坐标格子
     * col：结束纵坐标格子
     */
    public renderLayer(res: {
        x: number,
        y: number,
        row: number,
        col: number
    }) {
        this.renderRow = res.row
        this.renderCol = res.col
        this.startY = res.x
        this.startX = res.y
        this.width = this.layer.boxWidth * res.row
        this.height = this.layer.boxHeight * res.col
        this.layer.layers.forEach((layer) => {
            if(!layer.show) { return }
            const Slayer = new egret.Sprite()
            Slayer.width = this.width
            Slayer.height = this.height
            // Slayer.x = Slayer.y = 0
            this.renderMatrix(layer.matrix, Slayer)
            this.addChild(Slayer)
        })
    }
    private renderMatrix(matrix: Array<Array<matrixItem>>, Slayer: egret.Sprite) {
        matrix.map((row, index) => {
            if(index > this.renderRow || index < this.startX) { return }
            const cols = row.forEach(async (item, indexT) => {
                if(indexT > this.renderCol || indexT < this.startY) { return }
                const key = `${index}-${indexT}`
                // 控制权交给用户
                if(this.callback) {
                    this.callback(matrix)
                    return
                }
                if (item.name) {
                    // 动图
                    if(item.name.toLocaleLowerCase().indexOf('gif') !== -1) {
                        console.log(item.name, indexT, index, item.width, item.height)
                        this.gSprite = new Manager()
                        this.gSprite.addMovieClip({
                            parent: Slayer,
                            movieName: item.name.split('.')[0],
                            x: this.layer.boxWidth * indexT,
                            y: this.layer.boxHeight * index,
                            width: item.width,
                            height: item.height
                        })
                        return
                    }
                    const img = this.drawImg({
                        width: item.width,
                        height: item.height,
                        name: item.name.replace('.', '_'),
                        row: indexT,
                        col: index
                    })
                    Slayer.addChild(img)
                }
            })
        })
    }
    // 画静态图
    private drawImg(res: {
        width: number,
        height: number,
        name: string,
        row: number,
        col: number
    }) {
        const img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes(res.name);
        img.width = res.width;
        img.height = res.height
        img.x = this.layer.boxWidth * res.row
        img.y = this.layer.boxHeight * res.col
        return img
    }
}