require.config({
  baseUrl: 'js',
  map: {
    '*': {
      'css': 'css.min'
    }
  },
  paths: {
    // 'swiper': 'swiper-3.4.0.jquery.min',
    'jquery': 'lib/jquery-3.1.0.min',
    'weixin': '//res.wx.qq.com/open/js/jweixin-1.0.0'
  },
  // shim: {
  //   'swiper': ['jquery', 'css!swiper-3.4.0.min.css']
  // },
  waitSeconds: 15
});

require(['jquery', 'script'], function ($, script) {
  // 禁止拉动
  $('body').on('touchmove', function (e) {
    e.preventDefault();
  });

  script.open();
})