(function() {
  function Player(el, auto) {
    this.el = el;
    this.auto = auto;
    this.isPlay = true;
    this.init();
  }
  Player.prototype = {
    init: function() {
      var _this = this,
        attr = {
          loop: false,
          preload: 'auto',
          src: this.el.attr('data-src')
        };
      this._audio = new Audio();
      for (var i in attr) {
        attr.hasOwnProperty(i) && i in this._audio && (this._audio[i] = attr[i]);
      }
      if (this.auto) {
        this._audio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
        }, false);
      }
      this._audio.load();
      this._audio.volume = 0.8;
      this.el.on('click', function() {
        _this.play();
      })
    },
    _play: function() {
      if (!this.isPlay) {
        this._audio.play();
        this.el.addClass('on');
      } else {
        this._audio.pause();
        this.el.removeClass('on');
      }
      this.isPlay = !this.isPlay;
    },
    _getState: function() {
      return this.isPlay;
    },
    _playOn: function() {
      this._audio.play();
      this.el.addClass('on');
      this.isPlay = true;
    },
    _playOff: function() {
      this._audio.pause();
      this.el.removeClass('on');
      this.isPlay = false;
    }
  };
  window.Player = Player;
})();