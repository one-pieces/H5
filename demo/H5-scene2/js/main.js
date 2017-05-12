var opMain = function() {
  this.init();
};
opMain.prototype = {
  constructor: this,
  init: function() {
    this.resize();
    this.loading();
    this.audio();
    console.log('init');
  },
  resize: function() {
    // window.addEventListener('resize', onresize, false);
    //移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", onresize, false);
    var onresize = function() {
      var e = $(window).width(),
        i = $(window).height();
      var n = e > i ? 720 : 640;
      document.documentElement.style.fontSize = 100 * (e / n) + 'px';
    };
    onresize();
    setTimeout(function() {
      $('.loading .progress').show().css({
        '-webkit-transform': 'scale(0)',
        '-webkit-transform-origin': 'center center'
      });
      setTimeout(function() {
        $('.loading .progress').css({
          '-webkit-transition': 'all .3s ease',
          '-webkit-transform': 'scale(1)',
          '-webkit-transform-origin': 'center center'
        });
      }, 50);
    }, 50);
  },
  loading: function() {
    new wrLoading('.loading', ['images/start.jpg', 'images/head.gif', 'images/preview.jpg','images/tipbox.png',
      'images/1.png','images/2.png','images/3.png','images/4.png','images/5.png','images/6.png','images/7.png',
      'images/8.png','images/9.png','images/0.png','images/tip0.png','images/tip1.png','images/tip2.png',
      'images/secret5.png','images/secret4.png','images/360tip.png'], function() {
      setTimeout(function() {
        $('.loading').addClass('opacity');
        setTimeout(function() {
          $('.loading').remove();
        }, 350);
      }, 800);
    })
  },
  audio: function() {
    this.music = new Player($('#music'), true);
    this.phone = new Player($('#phone'), false);
    // this.music._audio.currentTime = 0;
    this.music._audio.play();
  },
  bind: function() {
    var _self = this;

    var $video = $('#video');
    var gvideo = $video[0];
    var started = false;
    var saw = false;
    var helloed = false;
    var stopped = false;
    var happyed = false;

    embedpano({
      swf: "krpano.swf",
      xml: "video_android.xml",
      target: "pano",
      html5: "auto"
    });

    //切换播放状态
    window.switchVideo = function(type) {
      if (type == 'video') {
        $('.page1').addClass('opacity').show();
        $('.page2').addClass('opacity');
        setTimeout(function() {
          $('.page1').removeClass('opacity');
        }, 20);
        setTimeout(function() {
          $('.page2').hide();
        }, 320);
        $video.removeClass('videohide');
      } else {
        $('.page1').addClass('opacity');
        $('.page2').addClass('opacity').show();
        setTimeout(function() {
          $('.page2').removeClass('opacity');
        }, 20);
        setTimeout(function() {
          $('.page1').hide();
        }, 320);
        $video.addClass('videohide');
      }
    };

    //打招呼
    window.openHello = function() {
      _self.krpano.call('set(hotspot[hs0].visible,false);');
      _self.krpano.call('set(hotspot[hs3].visible,false);');
      _self.krpano.call('set(hotspot[hs1].visible,true);');
      _self.krpano.call('set(hotspot[hs2].visible,true);');
      _self.krpano.call('set(hotspot[hs4].visible,true);');
      _self.krpano.call('set(hotspot[hs5].visible,true);');
      switchVideo('video');
      gvideo.play();
    };

    Event.addEvent(gvideo, 'timeupdate', function() {
      var vTime = this.currentTime;
      console.log(vTime);
      if (vTime > 0 && !started) {
        started = true;
        utils.openBlock('quietbox',false);
        setTimeout(function(){
          utils.closeBlock('quietbox');
        }, 1200);
      }
      if(vTime > 5.2 && !saw){
        saw = true;
        utils.openBlock('seebox',false);
        setTimeout(function(){
          utils.closeBlock('seebox');
        }, 2000);
      }
      if(vTime > 12.9 && !helloed){
        helloed = true;
        gvideo.pause();
        _self.krpano = document.getElementById("krpanoSWFObject");
        switchVideo('pano');
      }
      if(vTime > 27.7 && !stopped){
        stopped = true;
        gvideo.pause();
        switchVideo('pano');
        setTimeout(function(){
          _self.phone._audio.currentTime = 0;
          _self.phone._audio.play();
          Event.addEvent(_self.phone._audio,'ended',function(){
            _self.krpano.call("set(hotspot[hs6].visible,true);");
          });
        }, 2500);
      }
    });
  }
};

var op = new opMain();

function g(A) {
  return document.getElementById(A);
}

function playVideo() {
  $('#st').hide();
  $('#video').show();
  g('video').play();
  op.bind();
}

Event.addEvent($('#look')[0], 'end', function(e){
  e.preventDefault();
  playVideo();
});