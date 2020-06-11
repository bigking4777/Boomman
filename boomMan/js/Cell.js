function Cell() {

     this.type;//方块类型

     //坐标
     this.cellX;
     this.cellY;

     //方块
     var cell;


     this.init = function (type1,cellX1,cellY1) {
          this.type=type1;
          this.cellX=cellX1;
          this.cellY=cellY1;
          cell = new Image();
          switch(this.type){
               case 0:
                    cell.src="../img/wall.png";
                    break;
               case 1:
                    cell.src="../img/floor.png";
                    break;
               case 2:
                    cell.src="../img/obstacle.png";
                    break;
          }
     };//初始化墙壁信息


     this.run =function(ctx){
          ctx.drawImage(cell,this.cellX,this.cellY,40,40);
     };//画出墙壁

     this.reset=function () {
          cell.src="../img/floor.png";
          // console.log("被销毁3");
     }//重新绘制墙壁


































}