var Animate = function() {
  this.initedSwipe = false;
};

Animate.prototype = {
  // 初始化滑动
  initSwipe: function() {
    if (this.initedSwipe) return;
    this.initedSwipe = true;

    $('#wrap').swip({
      currentX: 0,
      moving: this.start_moving,
      speed: this.stopping
    });
  },
  start_moving: function(x, y) {
    var translateX = -x - this.currentX;
    if (translateX <= 0 && translateX >= -1280) {
      $("#wrap")[0].style.webkitTransform = " scale(" + 1 + ") translateX(" + translateX + "px)";
    }
  },
  stopping: function(x, bx) {
    var distance = x + this.currentX;
    if (distance < 0) {
      this.currentX = 0;
      return;
    } else if (distance > 1300) {
      this.currentX = 1300;
      return;
    }
    this.currentX += x;
  }
};