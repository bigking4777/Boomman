function Enemy() {
    var enemy;//创建怪物

    var speed = 3;//移动速度
    this.enemyX;
    this.enemyY;

    this.enemyW=30;
    this.enemyH=30;//敌人图片的大小
    var type;

    this.init = function () {
        enemy = new Image();


        type = Math.floor(Math.random()*7);//随机敌人的类型


        if(type==0){
            enemy.src="../img/enemys/enemy1_01.png";

        }else if(type==1){
            enemy.src="../img/enemys/enemy2_01.png";

        }else if(type==2){
            enemy.src="../img/enemys/enemy3_01.png";

        }else if(type==3){
            enemy.src="../img/enemys/enemy4_01.png";

        }else if(type==4){
            enemy.src="../img/enemys/enemy5_01.png";

        }else if(type==5){
            enemy.src="../img/enemys/enemy6_01.png";

        }else{
            enemy.src="../img/enemys/enemy0_01.png";

        }


    };//初始化怪物信息

    var callMap;
    this.setMaplisten = function (call) {
        callMap = call;
    };//设置地图监听，和game里的连接起来, 获取到地图信息
    var cells;
    this.setCells = function (call) {
        cells = call;
    };//获取墙壁坐标，防止怪物穿墙

    var  buffer;
    this.randomNum = function () {
        let numX = Math.floor((Math.random()*12)+3);
        let numY = Math.floor((Math.random()*11)+3);
         // console.log(numX,numY,'x,y');

        buffer = callMap()[numX][numY];
         // console.log(buffer);

            while(buffer!=1) {
                numX -= 1;
                buffer = callMap()[numX][numY];
            }

        this.enemyX = numX*40;
        this.enemyY = numY*40;
        var box =this.enemyX;
        this.enemyX = this.enemyY;
        this.enemyY = box;
    };//随机怪物出生地点


    this.moveUp = function () {

        this.enemyY = this.enemyY - speed;//处理图片位移
        if (this.enemyY < 40) {
            this.enemyY = 40;
        }
        enemy.style.top = this.enemyY + "px";

    };//向上移动


    this.moveDown = function () {
        this.enemyY = this.enemyY + speed;
        if (this.enemyY > 560 - this.enemyH) {
            this.enemyY = 560 - this.enemyH;
        }
        enemy.style.top = this.enemyY + "px";


    };//向下移动


    this.moveLeft = function () {
        this.enemyX = this.enemyX - speed;
        if (this.enemyX < 40) {
            this.enemyX = 40;
        }

        enemy.style.left = this.enemyX + "px";


    };//向左移动


    this.moveRight = function () {
        this.enemyX = this.enemyX + speed;
        if (this.enemyX > 640 - this.enemyW) {
            this.enemyX = 640 - this.enemyW;
        }

        enemy.style.left = this.enemyX + "px";

    };//向右移动

    var movestatus; //设置运动的随机方向

    this.enemyrun = function () {
         movestatus = Math.floor((Math.random()*4)+1);
        // movestatus=2;
    };//设置怪物随机走动方向
    this.move = function () {

        switch (movestatus) {
            case 1:
                if(this.canMoveUp()){
                    this.moveUp();

                }else {
                    this.enemyrun();
                }

                break;
            case 2:
                if(this.canMoveDown()){
                    this.moveDown();
                }else {
                    this.enemyrun();
                }

                break;
            case 3:
                if (this.canMoveLeft()){
                    this.moveLeft();
                } else{
                    this.enemyrun();
                }

                break;
            case 4:
                if(this.canMoveRight()){
                    this.moveRight();
                }else{
                    this.enemyrun();
                }

                break;
        }
    };//怪物走动
    this.getI = function () {
        var i = Math.floor((this.enemyX + this.enemyW) / 40);
        return i;
    };//获取横坐标，就是人物在地图里横向移动了几格
    this.getJ = function () {
        var j = Math.floor((this.enemyY + this.enemyH) / 40);
        return j;
    };//获取人物在地图中纵向移动了几格


    this.canMoveLeft = function () {
        var i = this.getI() - 1;//这样待会可以判断当前人物左边是否有墙壁
        var buffer_one = callMap()[this.getJ()][i];//callMap此时是传来的地图数据，也就是Map.js里的mapData
        var left = i * 40;
        if (buffer_one != 1 ||this.enemyY<(cells()[this.getJ()][i].cellY)||(BoomX<this.getI()&&BoomX>this.getI()-2)) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够左移
    this.canMoveRight = function () {
        var i = this.getI() ;
        var buffer_one = callMap()[this.getJ()][i];
        var right = i * 40;
        if (buffer_one != 1||this.enemyY<(cells()[this.getJ()][i].cellY)||(BoomX>this.getI()&&BoomX<this.getI()+2)) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够右移
    this.canMoveUp = function () {
        var j = this.getJ() - 1;
        var buffer_one = callMap()[j][this.getI()];
        var up = j * 40;
        if (buffer_one != 1||this.enemyX<(cells()[j][this.getI()].cellX)||(BoomY<this.getJ()&&BoomY>this.getJ()-2)) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够上移
    this.canMoveDown = function () {
        var j = this.getJ() ;
        var buffer_one = callMap()[j][this.getI()];
        var down = j * 40;
        if (buffer_one != 1||this.enemyX<(cells()[j][this.getI()].cellX)||(BoomY>this.getJ()&&BoomY<this.getJ()+2)) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够下移

    this.getX=function () {
        return this.enemyX;
    };//返回怪物横坐标

    this.getY=function () {
        return this.enemyY;
    };//返回怪物纵坐标

    var BoomX;
    var BoomY;
    this.getBoomXY = function (x,y) {
        BoomX = x;
        BoomY = y;
        // console.log(BoomX,BoomY,'1231213')
    };//拿到炸弹爆炸数据，防止怪物穿过炸弹

    this.collision=function (x,y,z) {
        var x1 = x;
        var y1 = y;
        var A = 40*z;
        var z = this.getX();//怪物横坐标
        var w = this.getY();//怪物纵坐标

        if(((x1+40<=z&&z<=x1+40+A)&&(y1<=w&&w<=y1+40))||
            ((x1<=z&&z<=x1+40)&&(y1+40<=w&&w<=y1+40+A))||
            ((x1-A<=z&&z<=x1)&&(y1<=w&&w<=y1+40))||
            ((x1<=z&&z<=x1+40)&&(y1-A<=w&&w<=y1))){

            score.scorestart+=50;//分数加50
            score.clear();//清空分数面板
            score.init();//重新显示实时分数

            game.enemylive-=1;
            this.resetBoom();

        }

    }//敌人是否碰撞到炸弹

    this.resetBoom=function () {
        this.enemyX = 0;
        this.enemyY = 0;
        this.move = function () {
            return
        }
         enemy.src= "";
        if(game.enemylive==0){
            var gameover = document.getElementsByClassName("gameOver")[0];
            gameover.className = 'gameOver show'
        }
    };//敌人消失函数



    this.run = function (ctx1) {




        ctx1.drawImage(enemy, this.enemyX, this.enemyY, this.enemyW, this.enemyH);

        this.move();

    };//画出怪物






































}