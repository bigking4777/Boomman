function Time() {
    //创建时间
    var time;
    //游戏时间长度5分钟
    this.timeW = 300;
    this.addTime = 0;
    this.init=function () {
        var box = document.getElementById('box');
        time = document.createElement('h2');
        //设置颜色
        time.style.color="black";
        //初始化
        time.innerHTML="TIME:  " +this.timeW + "S";
        //设置分数的位置
        time.style.position="absolute";
        time.style.left="40px";
        time.style.top="20px";

        box.appendChild(time);
    }

    this.setTime=function() {
        if (this.timeW >0) {
            this.timeW--;
            if (this.addTime==1){
                this.timeW+=50;
                this.addTime=0;
            }
            time.innerHTML = "TIME:  " +this.timeW + "S";
        }else{
            var timeover = document.getElementsByClassName("timeOver")[0];
            timeover.className = 'timeOver show'
            clearInterval(time);

        }
    }

    this.run=function () {

        this.setTime();
    }
}