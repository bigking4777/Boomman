function Changeplayer() {
    this.player;
    var that = this;
    this.init = function (i) {
        that.player = i;
    }

    this.getplayer = function () {
        return that.player;
    }

}