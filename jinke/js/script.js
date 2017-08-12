// 剧本

define(['jquery', 'resLoader', 'weixin', 'canvid'], function ($, resLoader, wx, canvid) {
  var self = {};
  // 设备简单判断
  self.device = (function () {
    var ua = navigator.userAgent.toLowerCase(), device;
    if (/android/.test(ua)) {
      device = 'adnroid';
    } else if (/safari/.test(ua)) {
      device = 'safari';
    } else {
      device = 'iphone';
    }
    return device;
  })();

  // 打开单页
  self.open = function () {
    self.loadVideo();
    $('#fullscreen').on('click', function () {
      self.playVideo('.video #video1');
    });
    $('#window').on('click', function () {
      $('.video').show();
      // var player = new jsmpeg('assets/video/1502354622679.mp4', {
      //   canvas: document.getElementById('videoCanvas'),
      //   autoplay: true
      // });
      var canvasVideo = new CanvasVideoPlayer({
        videoSelector: '.js-video',
        canvasSelector: '.js-canvas',
        audio: true,
      });
      canvasVideo.play();
    });
  },

  self.playVideo = function (video) {
    $('.video').show();
    var video = $(video)[0];
    video.play();
  }

  self.closeVideo = function (video) {
    $('.video').hide();
  }

  self.start = function () {
  }

  self.loadVideo = function () {
    var loader = new resLoader({
      resources: [
        'assets/video/1502354622679.mp4'
      ],
      onStart: function (total) { },
      onProgress: function (current, total) { },
      onComplete: function (total) { }
    });
    loader.start();
  }

  return self;
});