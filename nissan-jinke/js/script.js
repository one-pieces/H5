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
    var resources = [];
    for (var i = 0; i < 24; i++) {
      resources.push(i + '.png');
    }
    var loader = new resLoader({
      baseUrl: 'assets/img/loading/',
      resources: resources,
      onComplete: function (total) {
        var loader2 = new resLoader({
          baseUrl: 'assets/',
          resources: [
            'img/h5/logo.png',
            // 任务页图片
            'img/h5/task/bg.jpg',
            'img/h5/task/bgm.png',
            'img/h5/task/btn-bgm.png',
            'img/h5/task/btn-lady.png',
            'img/h5/task/btn-spiderman.png',
            'img/h5/task/cloud.png',
            'img/h5/task/lady.png',
            'img/h5/task/slogan.png',
            'img/h5/task/spiderman.png',
            // 留资页
            'img/h5/info/bg.png',
            'img/h5/info/btn_confirm.png',
            'img/h5/info/city.png',
            'img/h5/info/citylistbg.png',
            'img/h5/info/name.png',
            'img/h5/info/slogan.png',
            'img/h5/info/Tel.png',
            // 结束页
            'img/h5/ending/666.png',
            'img/h5/ending/bg.jpg',
            'img/h5/ending/dialog.png',
            'img/h5/ending/goplay.png',
            'img/h5/ending/replay.png',
            'img/h5/ending/slogan.png',
            // 视频
            'video/1502354622679.mp4'
          ],
          onProgress: function (current, total) {
            var percent = parseInt(current / total * 100);
            console.log('percent', percent);

            $('.loadingInfo .percent').text(percent + '%');
          },
          onComplete: function (total) {
            $('#loading').hide();
            self.start();
          }
        });
        loader2.start();
      }
    });
    loader.start();
  },

  self.start = function () {
    self.gotoTaskPage();
  }

  self.gotoTaskPage = function () {
    $('#task_page').show();
    $('#btn_spiderman').on('click', function () {
      self.spidermanTask();
    });
    $('#btn_bgm').on('click', function () {
      self.bgmTask();
    });
    $('#btn_lady').on('click', function () {
      self.ladyTask();
    });
  }

  self.spidermanTask = function () {
    console.log('spiderman');
    $('#task_page').hide();
    self.gotoEndingPage();
  }

  self.bgmTask = function () {
    console.log('bgm');
  }

  self.ladyTask = function () {
    console.log('lady');
  }

  self.gotoEndingPage = function () {
    $('#ending_page').show();
    $('#btn_replay').on('click', function () {
      $('#ending_page').hide();
      self.gotoTaskPage();
    });
    $('#btn_goplay').on('click', function () {
      $('#ending_page').hide();
      self.gotoInfoPage();
    });
  }

  self.gotoInfoPage = function () {
    $('#info_page').show();

    confirmUserInfo();
  }

  function confirmUserInfo() {
    $("#btn_confirm").on('click', function () {
      $('#user_info_form').submit();
    });
    $('#user_info_form').validator({
      timely: 0,
      stopOnError: false,
      msgMaker: false,
      fields: {
        'name': {rule: 'required;length(2~30)', msg: {required: '姓名不能为空', length: '姓名2-30字符'}},
        'telNo': {rule: 'required;mobile', msg: {required: '手机不能为空', mobile: '手机错误'}}
        // 'certNo': {rule: 'required;IDcard', msg: {required: '身份证号码不能为空', IDcard: '身份证号码格式错误'}}
      },
      invalid: function (form, errors) {
        var msg = '';
        for (var r in errors) {
          msg = msg + errors[r] + '<br/>';
        }
        showToaster(msg);
      },
      valid: function (form) {
        showLoading();
        var timeOut = setTimeout(function() {
          clearTimeout(timeOut);
          var ajax = $.ajax({
            url: 'http://www.tron-m.com/tron-api/api/addRecord.do',
            data: $(form).serialize(),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            timeout: 8000,
            async: true
          });
          ajax.done(function (r) {
            hideLoading();
            if (r.error) {
              showToaster(r.msg);
            }
            else {
              window.location.href = r.msg;
              return;
            }
          });
          ajax.fail(function (jqXHR, textStatus) {
            hideLoading();
            showToaster('发生错误!');
          });
        }, 300);
      }
    });
  }

  var isToasterShown = false;
  function showToaster(msg) {
    // Toaster没有显示时才显示
    if (!isToasterShown) {
      $(".toaster div").html(msg);
      $(".toaster").show();
      isToasterShown = true;
      var timeout = setTimeout(function () {
        $(".toaster").hide();
        isToasterShown = false;
        clearTimeout(timeout);
      }, 3000);
    }
  }

  function showLoading() {
    $(".loading").show();
  }
  function hideLoading() {
    $(".loading").hide();
  }

  return self;
});