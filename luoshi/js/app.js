require.config({
  baseUrl: 'js',
  map: {
    '*': {
      'css': 'css.min'
    }
  },
  paths: {
    'jquery': 'lib/jquery-3.1.0.min',
    'View': 'view',
    'weixin': 'lib/jweixin-1.0.0',
    'jquery.validator': 'lib/jquery.validator.min',
    'zhCN': 'lib/local/zh-CN',
    // 'createjs': 'lib/create.min'
  },
  shim: {
    'jquery.validator': ['jquery'],
    'zhCN': ['jquery.validator']
  },
  waitSeconds: 15,
  urlArgs : '_=' + new Date().getTime()
});

require(['jquery', 'script', 'jquery.validator', 'zhCN'], function ($, script, validator, zhCN) {
  // 禁止拉动
  $('body').on('touchmove', function (e) {
    e.preventDefault();
  });

  $(document).ready(function () {
    $('body').height($('body')[0].clientHeight);
    // iphone6 plus 设备高度为736
    $('body').css({'font-size': $('body')[0].clientHeight * 20 / 736});
  });

  script.open();
})