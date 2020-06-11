function Player() {


    var player;//创建玩家

    var speed = 3;//移动速度

    var playerX = 40;
    var playerY = 40;//玩家的坐标

    var playerW = 30;
    var playerH = 30;//图片的宽高

    var playerNum;
    var playerDown ;
    var playerUp ;
    var playerLeft ;
    var playerRight ;
    this.init = function (x) {
        playerNum =x;
        // console.log(playerNum,'num');
        playerDown = ['../img/players'+playerNum+'/down_01.png', '../img/players'+playerNum+'/down_02.png', '../img/players'+playerNum+'/down_03.png', '../img/players'+playerNum+'/down_04.png'];//向下移动

        playerUp = ['../img/players'+playerNum+'/up_01.png', '../img/players'+playerNum+'/up_02.png', '../img/players'+playerNum+'/up_03.png', '../img/players'+playerNum+'/up_04.png'];//向上移动的动画图片

        playerLeft = ['../img/players'+playerNum+'/left_01.png', '../img/players'+playerNum+'/left_02.png', '../img/players'+playerNum+'/left_03.png', '../img/players'+playerNum+'/left_04.png'];//向左移动的动画图片

        playerRight = ['../img/players'+playerNum+'/right_01.png', '../img/players'+playerNum+'/right_02.png', '../img/players'+playerNum+'/right_03.png', '../img/players'+playerNum+'/right_04.png']; //向右移动的位置

        player = new Image();
        player.src = playerDown[index];
    };

    var ctx;
    var index = 0;//人物图片的下标


    this.run = function (ctx1) {
        ctx1.drawImage(player, playerX, playerY, playerW, playerH);

    };

    var PLAYER_UP = 38;
    var PLAYER_DOWN = 40;
    var PLAYER_LEFT = 37;
    var PLAYER_RIGHT = 39;
    var Fast = 16;
    var Boom = 32;

    this.onkeydown = function (keyCode) {
        switch (keyCode) {
            case PLAYER_UP:
                if (this.canMoveUp()) {
                    this.moveUp();

                } else {
                    index++;
                    if (index >= 4)
                        index = 0;
                    player.src = playerUp[index];
                }

                break;
            case PLAYER_DOWN :
                if (this.canMoveDown()) {
                    this.moveDown();

                } else {
                    index++;
                    if (index >= 4)
                        index = 0;
                    player.src = playerDown[index];
                }

                break;
            case PLAYER_LEFT :
                if (this.canMoveLeft()) {
                    this.moveLeft();

                } else {
                    index++;
                    if (index >= 4)
                        index = 0;
                    player.src = playerLeft[index];
                }

                break;
            case PLAYER_RIGHT :
                if (this.canMoveRight()) {
                    this.moveRight();

                } else {
                    index++;
                    if (index >= 4)
                        index = 0;
                    player.src = playerRight[index];
                }
                break;
            case Fast:
                speed = 7;

                break;
            case Boom:
                setBoom();
                // console.log(setBoom,'setboom')
                // console.log(this.getI(),'i人');
                // console.log(this.getJ(),'j人')
                break;
            default:
                break;
        }
    };


    var setBoom;
    this.setBoomlisten=function (call) {
        setBoom=call;
    };//放置炸弹

    this.onkeyup = function (keyCode) {
        switch (keyCode) {
            case Fast:
                speed = 3;

                break;

        }
    };//加速按钮

    //向上移动
    this.moveUp = function () {
        //处理图片位移
        playerY = playerY - speed;
        if (playerY < 40) {
            playerY = 40;
        }
        player.style.top = playerY + "px";

        //处理图片的动画
        index++;
        if (index >= 4) {
            index = 0;
        }

        player.src = playerUp[index];
    };

    //向下移动
    this.moveDown = function () {
        playerY = playerY + speed;
        if (playerY > 560 - playerH) {
            playerY = 560 - playerH;
        }
        player.style.top = playerY + "px";

        //处理图片的动画
        index++;
        if (index >= 4) {
            index = 0;
        }

        player.src = playerDown[index];
    };

    //向左移动
    this.moveLeft = function () {
        playerX = playerX - speed;
        if (playerX < 40) {
            playerX = 40;
        }

        player.style.left = playerX + "px";

        //处理图片的动画
        index++;
        if (index >= 4) {
            index = 0;
        }

        player.src = playerLeft[index];
    };

    //向右移动
    this.moveRight = function () {

        playerX = playerX + speed;
        if (playerX > 640 - playerW) {
            playerX = 640 - playerW;
        }

        player.style.left = playerX + "px";

        //处理图片的动画
        index++;
        if (index >= 4) {
            index = 0;
        }

        player.src = playerRight[index];
    };

    var callMap;//设置地图监听，和game里的连接起来, 获取到地图信息
    this.setMaplisten = function (call) {
        callMap = call;
    };
    var cells;//获取墙壁坐标
    this.setCells = function (call) {
        cells = call;
    }

    this.getI = function () {
        var i = Math.floor((playerX + playerW) / 40);
        return i;
    };//获取横坐标，就是人物在地图里横向移动了几格
    this.getJ = function () {
        var j = Math.floor((playerY + playerH) / 40);
        return j;
    };//获取人物在地图中纵向移动了几格

    //判断是否能够左移
    this.canMoveLeft = function () {
        var i = this.getI() - 1;//这样待会可以判断当前人物左边是否有墙壁
        var buffer = callMap()[this.getJ()][i];//callMap此时是传来的地图数据，也就是Map.js里的mapData
        var left = i * 40;
        if (buffer != 1 ||playerY<(cells()[this.getJ()][i].cellY)||(BoomX<this.getI()&&BoomX>this.getI()-2)) {
            // console.log(cells()[this.getJ()][i].cellY,"左")
            return false;
        } else {
            return true;
        }

    };
    this.canMoveRight = function () {
        var i = this.getI();
        var buffer = callMap()[this.getJ()][i];
        // console.log(this.getJ(),'getj');
        // console.log(i,'i')
        var right = i * 40;//不这样人物会在墙壁的前一格就卡住不能前进
        if (buffer != 1 ||playerY<(cells()[this.getJ()][i].cellY)||(BoomX>this.getI()&&BoomX<this.getI()+2) ){
            // console.log(cells()[this.getJ()][i].cellY,"右");
            return false;
        } else {
            return true;
        }
    };
    this.canMoveUp = function () {
        var j = this.getJ() - 1;
        var buffer = callMap()[j][this.getI()];
        var up = j * 40;
        if (buffer != 1 ||playerX<(cells()[j][this.getI()].cellX)||(BoomY<this.getJ()&&BoomY>this.getJ()-2)) {
            // console.log(playerX<(cells()[j][this.getI()].cellX),'上')
            return false;
        } else {
            return true;
        }
    };
    this.canMoveDown = function () {
        var j = this.getJ();
        var buffer = callMap()[j][this.getI()];
        var down = j * 40;
        if (buffer != 1||playerX<(cells()[j][this.getI()].cellX)||(BoomY>this.getJ()&&BoomY<this.getJ()+2)) {
            // console.log(playerX<(cells()[j][this.getI()].cellX),"下")
            return false;
        } else {
            return true;
        }
    };

    //判断是否和怪物相撞
    this.islive = function (enemys) {
        for (var i = 0;i<enemys.length;i++){
            if (playerX<(enemys[i].enemyX+enemys[i].enemyW)&&(playerX+playerW)>enemys[i].enemyX
                &&playerY<(enemys[i].enemyY+enemys[i].enemyH)&&(playerY+playerH)>enemys[i].enemyY){
                // console.log('you dead');
                var playerover = document.getElementsByClassName("playerOver")[0];
                playerover.className = 'playerOver show'
                this.resetBoom();
            }
        }

    };
    this.getProp = function (props) {
        for (var i = 0;i<props.length;i++){
            if (playerX<(props[i].propX+props[i].propW)&&(playerX+playerW)>props[i].propX
                &&playerY<(props[i].propY+props[i].propH)&&(playerY+playerH)>props[i].propY){
                console.log('get');
                if(props[i].type==4){
                    speed+=2;
                }
                switch (props[i].type) {
                    case 4:
                        speed+=2;
                        break;
                    case 5:
                        game.BoomsNum+=1;
                        break;
                    case 1:
                        game.Boomlong+=1;
                        break;
                    case 3:
                        time.addTime=1;
                        // console.log(time.timeW,'time');
                        break;
                    case 2:
                        score.scorestart+=60;
                        score.clear();
                        score.init();
                        break;



                }
                props[i].getplayer();

            }
        }
    }//获取道具

    this.getX = function () {
        return playerX;
    };//获取人物的x坐标
    this.getY = function () {
        return playerY;
    };//获取人物的y坐标

    var BoomX;
    var BoomY;
    this.getBoomXY = function (x,y) {
        BoomX = x;
        BoomY = y;
        // console.log(BoomX,BoomY,'1231213')
    };//获取炸弹坐标用来防止人物穿过炸弹


    this.iscollision=function (x,y,z) {
        var i = Math.floor(y/40);
        var j = Math.floor(x/40);
        var m = this.getX();
        var n = this.getY();
        // console.log("i="+i,"j="+j);
        // console.log("m="+m,"n="+n);
        // if(((j-z)*40<=m+40&&m<=(j+z+1)*40&&n>=i*40&&n<=(i+z)*40)
        //     ||((i-z)*40<=n+40&&n<=(i+z+1)*40&&m>=j*40&&m<=(j+z)*40)){
        //     this.resetBoom();
        //     var playerover = document.getElementsByClassName("playerOver")[0];
        //     playerover.className = 'playerOver show'
        // }
    } //玩家是否碰撞到炸弹
    var that = this;
    this.resetBoom=function () {
        player.src = "";
        that.run = function () {
            return;
        }

    }
    this.getplayerX = function () {
        return playerX;
    }
    this.getplayerY = function () {
        return playerY;
    }//返回人物坐标，为了检测是否与炸弹爆炸相碰

































}