function Boom() {


    var bomb;//创建炸弹


    var width = 30;
    var height = 30;//炸弹大小


    var bombX;
    var bombY;//炸弹的位置

    this.BX;
    this.BY;

    var that = this;
    var index = 0;
    var time = 0;
    var status = 1;
    var num //爆炸直径

    var playerX1;
    var playerY1;

    this.getplayer = function (playX, playY) {
        playerX1 = playX;
        playerY1 = playY;
        // console.log(playerX,playerY,'boom')
    };//实时获得人物坐标

    this.init = function (x, y, z) {
        // console.log(x,'x')
        bombX = x;
        bombY = y;
        this.BX = x;
        this.BY = y;
        num = z;//获得爆炸直径

        // console.log(bombX,'bombx')
        // console.log(this.BX,'BX')

        bomb = new Image();
        bomb.src = "../img/bomb_01.png";
    };//初始化炸弹

    var blastUp = [];
    var blastVertical = [];
    var blastMiddle = [];
    var blastDown = [];
    var blastLeft = [];
    var blastLevel = [];
    var blastRight = [];
    this.initpic = function () {
        //最上面的图片
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "../img/Booms/up_0" + i + ".png";
            blastUp.push(img);
        }

        //最上面到中间之间的图
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "../img/Booms/vertical_0" + i + ".png";
            blastVertical.push(img);
        }

        //中间的图
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "../img/Booms/middle_0" + i + ".png";
            blastMiddle.push(img);
        }

        //最下面到中间之间的图
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "../img/Booms/down_0" + i + ".png";
            blastDown.push(img);
        }

        //最左边的图片
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "../img/Booms/left_0" + i + ".png";
            blastLeft.push(img);
        }

        //水平的图片
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "../img/Booms/level_0" + i + ".png";
            blastLevel.push(img);
        }

        //最右边的图片
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "../img/Booms/right_0" + i + ".png";
            blastRight.push(img);
        }
    };//设置炸弹爆炸效果图

    this.getX = function () {
        return bombX;
    };//返回炸弹横坐标

    this.getY = function () {
        return bombY;
    };//返回炸弹纵坐标


    var callMap;
    this.setMaplisten = function (call) {
        callMap = call;
    };//设置地图监听，和game里的连接起来, 获取到地图信息
    this.getI = function () {
        var i = Math.floor((bombX + width) / 40);
        return i;
    };//获取炸弹横坐标
    this.getJ = function () {
        var j = Math.floor((bombY + height) / 40);
        return j;
    };//获取炸弹纵坐标

    this.getNum = function () {
        return num
    };//返回炸弹爆炸直径


    this.canBoomLeft = function () {
        var i = this.getI() - 1;//这样待会可以判断当前炸弹左边是否有墙壁
        // console.log(bombX,'zhad')
        // console.log(this.getI(),'i炸')
        // console.log(this.getJ(),'j炸')
        var buffer = callMap()[this.getJ()][i];//callMap此时是传来的地图数据，也就是Map.js里的mapData
        // console.log(buffer)
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够向左爆炸
    this.canBoomLeft2 = function (numI) {
        var num1 = numI;
        if (num1 > this.getI()) {
            num1 = this.getI() - 1;
        }
        var i = this.getI() - num1;//这样待会可以判断当前炸弹左边是否有墙壁
        // console.log(bombX,'zhad')
        // console.log(num1,'num1')
        // console.log(i,'i')
        // console.log(this.getI(),'i炸')
        // console.log(this.getJ(),'j炸')
        var buffer = callMap()[this.getJ()][i];//callMap此时是传来的地图数据，也就是Map.js里的mapData
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断爆炸直径内是否有墙壁
    this.canBoomRight = function () {
        var i = this.getI() + 1;
        var buffer = callMap()[this.getJ()][i];
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够向右爆炸
    this.canBoomRight2 = function (numI) {
        var num1 = numI;
        if (num1 > this.getI()) {
            num1 = this.getI() - 1;
        }
        var i = this.getI() + num1;
        var buffer = callMap()[this.getJ()][i];
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断爆炸直径内是否有墙壁
    this.canBoomUp = function () {
        var j = this.getJ() - 1;
        var buffer = callMap()[j][this.getI()];
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够向上爆炸
    this.canBoomUp2 = function (numI) {
        var num1 = numI;
        if (num1 > this.getJ()) {
            num1 = this.getJ() - 1;
        }
        var j = this.getJ() - num1;
        var buffer = callMap()[j][this.getI()];
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断爆炸直径内是否有墙壁
    this.canBoomDown = function () {
        var j = this.getJ() + 1;
        var buffer = callMap()[j][this.getI()];
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断是否能够向下爆炸
    this.canBoomDown2 = function (numI) {
        var num1 = numI;
        if (num1 > this.getJ()) {
            num1 = this.getJ() - 1;
        }
        var j = this.getJ() + num1;
        var buffer = callMap()[j][this.getI()];
        // console.log(buffer)
        if (buffer == 0) {
            return false;
        } else {
            return true;
        }
    };//判断爆炸直径内是否有墙壁


    var callBack;
    this.setBoomListener = function (call) {
        callBack = call;
    };//拿到炸弹销毁监听

    this.run = function (ctx1, k) {


        setInterval('game.setTime()', 10);//实时获得人物坐标
        var playerX =playerX1;
        var playerY = playerY1;


        switch (status) {
            case 1:
                time++;
                if (time > 32) {
                    status -= 1;
                    time = 0;
                }
                ctx1.drawImage(bomb, bombX, bombY, width, height);
                break;
            case 0:
                index++;
                if (index >= 4) {
                    callBack(k);
                    status += 1;
                    // console.log(k,'k')
                    break;
                }
                ctx1.drawImage(blastMiddle[index], bombX, bombY, width, height);//中心的火焰
                if (this.canBoomUp()) {


                    for (var i = 0; i < num; i++) {
                        if (this.canBoomUp2(i)) {
                            ctx1.drawImage(blastVertical[index], bombX, bombY - (i + 1) * height, width, height);//最上面火焰到中心点之间竖直的火焰
                            if ((bombY + (i + 1) * height > playerY) && (bombX - (i + 1) * width <= playerX) && (bombX + (i + 1) * width > playerX) && (bombY - (i + 1) * height < playerY)) {

                                if (((bombX + width <= playerX && playerX <= bombX + (i + 2) * width) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY + width <= playerY && playerY <= (i + 2) * width)) ||
                                    ((bombX - (i + 1) * width <= playerX && playerX <= bombX) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY - (i + 1) * width <= playerY && playerY <= bombY))) {
                                    // console.log('up')
                                    // console.log(bombX+'bombX',playerX+'playerX',bombY+'bombY',playerY+'playerY')
                                    var playerover = document.getElementsByClassName("playerOver")[0];
                                    playerover.className = 'playerOver show'
                                }
                            }
                        } else {
                            break;
                        }

                    }
                }
                if (this.canBoomDown()) {
                    for (var i = 0; i < num; i++) {
                        if (this.canBoomDown2(i)) {
                            ctx1.drawImage(blastVertical[index], bombX, bombY + (i + 1) * height, width, height);//中心到下面的火焰
                            if ((bombY + (i + 1) * height > playerY) && (bombX - (i + 1) * width <= playerX) && (bombX + (i + 1) * width > playerX) && (bombY - (i + 1) * height < playerY)) {


                                if (((bombX + width <= playerX && playerX <= bombX + (i + 2) * width) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY + width <= playerY && playerY <= (i + 2) * width)) ||
                                    ((bombX - (i + 1) * width <= playerX && playerX <= bombX) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY - (i + 1) * width <= playerY && playerY <= bombY))) {
                                    // console.log('down')
                                    // console.log(bombX+'bombX',playerX+'playerX',bombY+'bombY',playerY+'playerY')
                                    var playerover = document.getElementsByClassName("playerOver")[0];
                                    playerover.className = 'playerOver show'
                                }
                            }
                        } else {
                            break;
                        }

                    }
                }
                if (this.canBoomLeft()) {
                    for (var i = 0; i < num; i++) {
                        if (this.canBoomLeft2(i)) {
                            ctx1.drawImage(blastLevel[index], bombX - (i + 1) * width, bombY, width, height);//中心到最左边的火焰
                            if ((bombY + (i + 1) * height > playerY) && (bombX - (i + 1) * width <= playerX) && (bombX + (i + 1) * width > playerX) && (bombY - (i + 1) * height < playerY)) {
                                if (((bombX + width <= playerX && playerX <= bombX + (i + 2) * width) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY + width <= playerY && playerY <= (i + 2) * width)) ||
                                    ((bombX - (i + 1) * width <= playerX && playerX <= bombX) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY - (i + 1) * width <= playerY && playerY <= bombY))) {
                                    // console.log('left')
                                    // console.log(bombX+'bombX',playerX+'playerX',bombY+'bombY',playerY+'playerY')
                                    var playerover = document.getElementsByClassName("playerOver")[0];
                                    playerover.className = 'playerOver show'
                                }
                            }

                        } else {
                            break;
                        }


                    }


                }
                if (this.canBoomRight()) {

                    for (var i = 0; i < num; i++) {
                        if (this.canBoomRight2(i)) {
                            ctx1.drawImage(blastLevel[index], bombX + (i + 1) * width, bombY, width, height);//中心到最右边的火焰
                            if ((bombY + (i + 1) * height > playerY) && (bombX - (i + 1) * width <= playerX) && (bombX + (i + 1) * width > playerX) && (bombY - (i + 1) * height < playerY)) {

                                if (((bombX + width <= playerX && playerX <= bombX + (i + 2) * width) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY + width <= playerY && playerY <= (i + 2) * width)) ||
                                    ((bombX - (i + 1) * width <= playerX && playerX <= bombX) && (bombY <= playerY && playerY <= bombY + width)) ||
                                    ((bombX <= playerX && playerX <= bombX + width) && (bombY - (i + 1) * width <= playerY && playerY <= bombY))) {
                                    // console.log('right')
                                    // console.log(bombX+'bombX',playerX+'playerX',bombY+'bombY',playerY+'playerY')
                                    var playerover = document.getElementsByClassName("playerOver")[0];
                                    playerover.className = 'playerOver show'
                                }


                            }
                        } else {
                            break;
                        }

                    }
                }
        }


    };//画出炸弹爆炸效果


}