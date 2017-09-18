require.config({
  baseUrl: 'js',
  map: {
    '*': {
      'css': 'css.min'
    }
  },
  paths: {
    'jquery': 'lib/jquery-3.1.0.min'
    // 'createjs': 'lib/create.min'
    // 'jquery.validator': 'lib/jquery.validator.min',
    // 'zhCN': 'lib/local/zh-CN',
    // 'weixin': '//res.wx.qq.com/open/js/jweixin-1.0.0'
  },
  // shim: {
  //   'jquery.validator': ['jquery'],
  //   'zhCN': ['jquery.validator']
  // },
  waitSeconds: 15,
  urlArgs : '_=' + new Date().getTime()
});

require(['jquery', 'script'], function ($, script) {
  // 禁止拉动
  $('body').on('touchmove', function (e) {
    e.preventDefault();
  });

  script.open();
})