function Map() {

    var mapData=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,2,1,2,2,2,1,2,2,2,1,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,2,1,1,1,1,1,1,1,1,1,2,1,1,1,2,0],
        [0,1,0,1,0,1,0,1,0,1,0,2,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,0],
        [0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0],
        [0,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0],
        [0,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,0],
        [0,1,0,2,0,1,0,1,0,1,0,1,0,1,0,2,0],
        [0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0],
        [0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0],
        [0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];//设置地图数据
    var cells =[];
    var cellWidth=40;
    var cellHight=40;

    var BoomMap ;
    this.init = function (x) {
        var lenth = rowNum;
        BoomMap = x;
        for (var i =0;i<lenth;i++){
            cells[i]=[];
            var buffer = mapData[i];
            for (var j=0;j<buffer.length;j++){
                var cell = new Cell();
                cell.init(buffer[j],j*cellWidth,i*cellHight);//把每一个地图信息传入cell.init（）里
                cells[i][j]=cell;//让二维数组里的每一项都是cell这个函数,接着可以在下面的run里面用foreach把他循环遍历出来

            }

        }



    };//初始化地图数据

    this.getI=function (y) {
        var i =Math.floor(y/40);
        return i;
    } //得到当前的横坐标


    this.getJ=function (x) {
        var j =Math.floor(x/40);
        return j;
    }//得到当前的纵坐标

    this.resetMap=function (x,y,getNum) {
        var i = this.getI(y);
        var j = this.getJ(x);
        //console.log("被销毁K"+i+"j="+j);
        for(var m=1;m<=getNum;m++){
            this.checkVertical(i-m,j);
            this.checkHorizontal(i,j-m);
        }

        for(var m=1;m<=getNum;m++){
            this.checkVertical(i+m,j)
            this.checkHorizontal(i,j+m);
        }

    }//重置地图

    var rowNum=mapData.length;
    var colNum = mapData[0].label;
    this.checkVertical=function (i,j) {
        if(i<0||i>=rowNum)
            return;
        if(mapData[i][j]==2){
            mapData[i][j]=1;
            //console.log("k="+i+";j="+j);
            //console.log("被销毁2");
            cells[i][j].reset();
        }

    }//爆炸的垂直方向


    this.checkHorizontal=function (i,j) {
        if(j<0||j>=colNum)
            return;
        if(mapData[i][j]==2){
            mapData[i][j]=1;
            //console.log("k="+i+";j="+j);
            //console.log("被销毁2");

            cells[i][j].reset();
        }

    }//爆炸的水平方向

    this.run = function (ctx) {
        cells.forEach(function (cell1) {
            cell1.forEach(function (cell2) {
                cell2.run(ctx);
            })
        })

    }
    
    this.getMap =function () {

        return mapData;
    }

    this.getcells = function () {
        return cells;
    }
    
    
    
    
    
    
    
}