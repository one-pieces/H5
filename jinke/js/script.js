// 剧本

define(['jquery', 'resLoader', 'weixin'], function ($, resLoader, wx) {
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
    self.start();
    self.loadVideo();
  },

  self.start = function () {
    var video = $('.video>video')[0];
    video.play();
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