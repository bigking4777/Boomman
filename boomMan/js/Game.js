function Game() {
    var that;
    var map;//地图
    var player;//玩家
    var enemy;//怪物
    var prop;//道具
    var ctx;
    var enemys = [];
    this.enemylive;
    var enemyNum;
    // var enemyNum = Math.floor((Math.random()*50)+3);//随机怪物数量
    // var enemyNum = 1
    var playerNum;
    this.init = function (x, y, z) {
        that = this;
        playerNum = x;
        enemyNum = Math.floor((Math.random() * y) + z);//随机怪物数量
        this.initGame();//初始化游戏

        this.initMap();//初始化地图


        this.initPlayer();//初始化玩家

        this.initprop();//初始化道具

        for (var i = 0; i < enemyNum; i++) {
            this.initEnemy();//初始化怪物
        }


    };//初始化游戏

    this.initGame = function () {
        var myCanvas = document.getElementById('mycanvas');//canvas元素本身是没有绘图能力的，所有绘制工作都在js中完成，这里是找到canvas元素

        ctx = myCanvas.getContext('2d');//这边是创建一个画笔
    };//创建画笔

    this.initMap = function () {
        map = new Map();
        map.init(this.BoomMap);
    };//初始化地图

    this.initPlayer = function () {
        player = new Player();
        player.init(playerNum);
        player.setMaplisten(this.mapListen);//这里我设置地图监听，可以判断人物是否撞墙
        player.setCells(this.cellsListen);//防止人物穿墙
        player.setBoomlisten(this.boomListener);//设置炸弹监听

    };//初始化人物

    var playerX;
    var playerY;
    this.getplayer = function () {
        playerX = player.getplayerX();
        playerY = player.getplayerY();
        // console.log(playerX,playerY,'game')
    }//实时获取人物坐标

    this.initEnemy = function () {
        enemy = new Enemy();
        enemy.init();
        enemys.push(enemy);
        that.enemylive = enemys.length;
        // console.log(enemys,'enemys')
        enemy.setMaplisten(this.mapListen);//设置地图监听，判断随机产生的怪物是否撞墙
        enemy.setCells(this.cellsListen);//防止怪物穿墙
        enemy.randomNum();//怪物出生地
    };//初始化怪物
    var props = [];
    this.initprop = function () {
        prop = new Prop();
        prop.init();
        props.push(prop);
        prop.setMaplisten(this.mapListen);//设置地图监听，判断随机产生的道具是否撞墙
        prop.randomNum();
    };//初始化道具
    this.getProp = function () {
        let type = Math.floor(Math.random() * 20)
        if (type == 6) {
            this.initprop()
        }
    }//随机掉落道具
    this.run = function () {
        map.run(ctx);
        player.run(ctx);
        for (var i = 0; i < enemyNum; i++) {
            enemys[i].run(ctx);
        }
        player.islive(enemys);
        for (var i = 0; i < bombs.length; i++) {
                bombs[i].run(ctx, i)
        }
        player.getProp(props);
        for (var i = 0; i < props.length; i++) {
            props[i].run(ctx);
        }

    };//画出所有东西
    this.runEnemy = function () {
        for (var i = 0; i < enemyNum; i++) {
            enemys[i].enemyrun();

        }

    }//怪物走动方向
    this.onkeydown = function (keyCode) {
        player.onkeydown(keyCode);
    };//键盘事件
    this.onkeyup = function (keyCode) {
        player.onkeyup(keyCode);
    };//键盘事件
    this.mapListen = function () {
        return map.getMap();
    };//拿到地图数据
    this.cellsListen = function () {
        return map.getcells();
    }//拿到防止穿墙数据
    this.boomListener = function () {
        that.setBomb();//用that不然指向自己了
        // console.log(that.setBomb);
    };//设置炸弹监听
    this.BoomsNum = 1;//炸弹数量
    var getNum;
    var BoomX;
    var BoomY;
    this.Boomlong = 2;//炸弹直径
    this.setBomb = function () {
        var boom = new Boom();
        that.setTime = function () {
            boom.getplayer(playerX, playerY);//传实时的人物坐标给boom.js
        }

        boom.init(player.getX(), player.getY(), this.Boomlong);//初始化炸弹信息
        let BX = boom.BX
        // console.log(BX,'bx')

        boom.initpic();//杨涛设置好炸弹爆炸效果
        if (bombs.length < this.BoomsNum) {
            bombs.push(boom);//这里我判断炸弹数量是否超出能放置的炸弹数量
        }
        BoomX = boom.getI();
        BoomY = boom.getJ();
        boom.setBoomListener(this.boomOverListener);//炸弹销毁监听

        boom.setMaplisten(this.mapListen);//设置地图监听，不让炸弹往实心墙的方向爆炸
        getNum = boom.getNum();

        player.getBoomXY(BoomX, BoomY);
        for (var i = 0; i < enemyNum; i++) {
            enemys[i].getBoomXY(BoomX, BoomY);//将炸弹坐标传给怪物，防止怪物穿过炸弹
        }

        // console.log("BoomX"+BoomX,"BoomY"+BoomY)
    };//放置炸弹

    var bombs = [];
    this.boomOverListener = function (index) {
        var bombX = bombs[index].getX();
        var bombY = bombs[index].getY();
        // console.log(bombX)
        map.resetMap(bombX, bombY, getNum);//判断炸弹是否炸到墙壁

        for (var i = 0; i < enemyNum; i++) {
            enemys[i].collision(bombX, bombY, getNum);
        }
        player.iscollision(bombX, bombY, getNum);
        BoomX = null;
        BoomY = null;
        player.getBoomXY(BoomX, BoomY);
        for (var i = 0; i < enemyNum; i++) {
            enemys[i].getBoomXY(BoomX, BoomY);
        }
        bombs.splice(index, 1);//销毁炸弹
    };//炸弹销毁监听


};
