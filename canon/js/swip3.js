(function($) {
  $.fn.extend({
    swip_config: {},
    startX: 0,
    startY: 0,
    transX: 0,
    transY: 0,
    lastX: 0,
    lastY: 0,
    currentX: 0,
    currentY: 0,
    s_touches: [],
    addHandler: function(obj, type, fn) {
      /* 兼容浏览器 */
      if (obj && obj.attachEvent) {
        obj.attachEvent('on' + type.fn);
      } else if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
      } else {
        obj['on' + type] = fn;
      }
    },
    bind_fn: function(obj, fn) {
      return function() {
        fn.apply(obj, arguments);
      }
    },
    swip: function(config) {
      console.log(config);
      $(this).addClass('swip');
      this.swip_config = config;
      this.addHandler($(this)[0], 'touchstart', this.bind_fn(this, this.touch_start));
      this.addHandler($(this)[0], 'touchmove', this.bind_fn(this, this.touch_move));
      this.addHandler($(this)[0], 'touchend', this.bind_fn(this, this.touch_end));
      return $(this);
    },
    multi_touch: function(config) {
      // TODO
    },
    getAvePos: function(event) {
      if (!event.touches.length) {
        return false;
      }
      var totalX = 0;
      var totalY = 0;
      var totalCount = event.touches.length;
      for (var i = 0; i < totalCount; i++) {
        totalX += event.touches[i].pageX;
        totalY += event.touches[i].pageY;
      }
      return {
        x: totalX / totalCount,
        y: totalY / totalCount
      }
    },
    touch_click: function(callback) {
      // 模拟点击
      var that = this;
      this.swip({
        start: function() {
          callback.apply(that, arguments);
        }
      });
      // return $(this);
    },
    touch_start: function(event) {
      if (!event.touches.length) {
        return false;
      }
      var touch = event.touches[0];
      this.startX = touch.pageX;
      this.startY = touch.pageY;
      this.transX = 0;
      this.transY = 0;

      console.log(this.swip_config);
      if (this.swip_config.start != null) {
        this.swip_config.start(this.startX, this.startY);
      }
      event.preventDefault();
    },
    touch_move: function(event) {
      if (!event.touches.length) {
        return false;
      }
      var touch = event.touches[0];
      this.currentX = touch.pageX;
      this.currentY = touch.pageY;

      var bx = this.currentX > this.lastX;
      var by = this.currentY > this.lastY;

      this.transX = this.startX - touch.pageX;
      this.transY = this.startY - touch.pageY;

      this.swip_config.moving && this.swip_config.moving(this.transX, this.transY, bx,by);
      this.swip_config.currentPos && this.swip_config.currentPos(this.currentX, this.currentY);
      this.swip_config.relatedMove && this.swip_config.relatedMove(bx, by);

      this.lastX = this.currentX;
      this.lastY = this.currentY;
      event.preventDefault();
    },
    touch_end: function() {
      if (!$(this).hasClass('swip')) {
        return false;
      }
      var absX = Math.abs(this.transX);
      var absY = Math.abs(this.transY);
      if (absX > 3 && absX > absY) {
        if (this.transX < 0) {
          this.swip_config.right && this.swip_config.right.apply(this, arguments);
        } else {
          this.swip_config.left && this.swip_config.left.apply(this, arguments);
        }
      } else if (absY > 3 && absY > absX) {
        if (this.transY < 0) {
          this.swip_config.bottom && this.swip_config.bottom.apply(this, arguments);
        } else {
          this.swip_config.top && this.swip_config.top.apply(this, arguments);
        }
      }
      this.swip_config.speed && this.swip_config.speed(this.transX, this.transY, this);
    }
  });
})(jQuery);