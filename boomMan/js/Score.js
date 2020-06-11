function Score() {
    //创建分数
    var score;
    //游戏分数起始值
    this.scorestart = 0;
    this.pass;
    this.init=function (x) {
        pass = x;
        var box = document.getElementById('box');
        score = document.createElement('h2');
        score.style.color="#ffffff";//设置颜色
        score.innerHTML="分数:" + this.scorestart; //初始化
        score.style.position="absolute";
        score.style.left="520px";
        score.style.top="20px";//设置分数的位置
        box.appendChild(score);
        // console.log(this.scorestart,x,this.pass,'fs')
        if (this.scorestart>=this.pass){
            var gameover = document.getElementsByClassName("gameOver")[0];
            gameover.className = 'gameOver show'
        }
    }
    this.clear = function () {
        score.innerHTML="分数:";
    }



}