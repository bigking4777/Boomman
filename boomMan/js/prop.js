function Prop() {
    var prop;
    this.propX;
    this.propY;

    this.propW=30;
    this.propH=30;
    this.type;
    this.init = function () {
        prop = new Image();
        this.type = Math.floor((Math.random()*5)+1);//随机道具
        // console.log(this.type)
        prop.src = '../img/tool_0'+this.type+'.png'
    }

    var callMap;//设置地图监听，和game里的连接起来, 获取到地图信息
    this.setMaplisten = function (call) {
        callMap = call;
    };

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

        this.propX = numX*40;
        this.propY = numY*40;
        var box =this.propX;
        this.propX = this.propY;
        this.propY = box;
    };//道具掉落地点

    this.getplayer = function () {
        prop.src = ''
        this.propX = 0;
        this.propY = 0;
    }


    this.run = function (ctx1) {
        ctx1.drawImage(prop, this.propX, this.propY, this.propW, this.propH);
    }































}