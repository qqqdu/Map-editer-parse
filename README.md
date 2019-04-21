# 地图解析 

这个项目用来演示游戏引擎解析由 [React-map-editer](https://github.com/checkmind/React-map-editer) 生成的 `*.map.json` 的文件。  
## 基于白鹭引擎   

效果图：  

![效果图](https://i.loli.net/2019/04/22/5cbca0352fd3e.gif
)

## 使用   

你可以在resource里找到 `demo.game.json`  
实际上，它是用 [React-map-editer](https://github.com/checkmind/React-map-editer) 编辑生成的，我实现了一个基于白鹭引擎的简单的编辑器，你可以对它进行拓展，`src/MapParse`，你也可以丢弃它实现自己的解析器，可能是 web、laya 或是 cocos  
