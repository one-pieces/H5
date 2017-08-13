// 剧本

define(['jquery', 'resLoader', 'weixin'], function ($, resLoader, wx) {
  var self = {
    pages: {
      taskPage: null,
      endingPage: null,
      infoPage: null
    }
  };
  // var taskPage, endingPage, infoPage;
  var htmlMap = {
    taskPage: '<div id="task_page" class="fullscreen hidden">\n' +
    '    <img class="slogan hCenter" src="assets/img/h5/task/slogan.png">\n' +
    '    <img class="spiderman" src="assets/img/h5/task/spiderman.png">\n' +
    '    <img class="lady" src="assets/img/h5/task/lady.png">\n' +
    '    <img class="bgm" src="assets/img/h5/task/bgm.png">\n' +
    '    <div class="cloud fullscreen"></div>\n' +
    '    <button id="btn_spiderman">\n' +
    '      <img src="assets/img/h5/task/btn-spiderman.png">\n' +
    '    </button>\n' +
    '    <button id="btn_lady">\n' +
    '      <img src="assets/img/h5/task/btn-lady.png">\n' +
    '    </button>\n' +
    '    <button id="btn_bgm">\n' +
    '      <img src="assets/img/h5/task/btn-bgm.png">\n' +
    '    </button>\n' +
    '  </div>',
    endingPage: '<div id="ending_page" class="fullscreen hidden">\n' +
    '    <img class="slogan hCenter" src="assets/img/h5/ending/slogan.png">\n' +
    '    <img class="awesome" src="assets/img/h5/ending/666.png">\n' +
    '    <img class="dialog" src="assets/img/h5/ending/dialog.png">\n' +
    '    <button id="btn_replay">\n' +
    '      <img src="assets/img/h5/ending/replay.png">\n' +
    '    </button>\n' +
    '    <button id="btn_goplay">\n' +
    '      <img src="assets/img/h5/ending/goplay.png">\n' +
    '    </button>\n' +
    '  </div>',
    infoPage: '  <div id="info_page" class="fullscreen hidden">\n' +
    '    <img class="slogan hCenter" src="assets/img/h5/info/slogan.png">\n' +
    '  \n' +
    '    <form method="post" id="user_info_form">\n' +
    '      <div class="input name-input">\n' +
    '        <input class="input__field" name="name" id="name" value="">\n' +
    '      </div>\n' +
    '      <div class="input tel-input">\n' +
    '        <input class="input__field" name="telNo" id="telNo" value="">\n' +
    '      </div>\n' +
    '      <div class="input city-input">\n' +
    '        <input class="input__field" name="memo" id="memo" value="">\n' +
    '      </div>\n' +
    '      <button id="btn_confirm">\n' +
    '        <img src="assets/img/h5/info/btn_confirm.png">\n' +
    '      </button>\n' +
    '    </form>\n' +
    '  </div>'
  }
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
        $('.block').hide();
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
            'video/start.mp4#start',
            'video/task1.mp4#task1',
            'video/task2.mp4#task2',
            'video/task3.mp4#task3',
          ],
          onProgress: function (current, total) {
            var percent = parseInt(current / total * 100);
            console.log('percent', percent);
            $('.loadingInfo .percent').text(percent + '%');
          },
          onComplete: function (total) {
            $('#btn_loaded').show().on('click', function () {
              self.start();
            });
          }
        });
        loader2.start();
      }
    });
    loader.start();
  },

  self.start = function () {
    self.playVideo({
      videoId: 'start',
      onStart: function () {
        // 视频开始播放后才隐藏loading
        $('#loading').hide();
      },
      onComplete: function () {
        $('#video_player').hide();
        self.gotoTaskPage();
      }
    });
    // self.gotoTaskPage();
  }

  self.playVideo = function(options) {
    $('#video_player').show();
    // var canvas = document.getElementById(options.canvasId);
    // var ctx = canvas.getContext('2d');
    // canvas.setAttribute('width', canvas.clientWidth);
    // canvas.setAttribute('height', canvas.clientHeight);

    if (options.url) {
      var video = document.createElement('video');
      video.src = options.url;
    }
    if (options.videoId) {
      var video = document.getElementById(options.videoId);
    }

    // video.addEventListener('play', function() {
    //   // alert('play');
    //   // ctx.drawImage(document.getElementById('logo'), 0, 0, canvas.clientWidth, canvas.clientHeight);
    //   var $this = this; //cache
    //   (function loop() {
    //     // alert($this.paused);
    //     if (!$this.paused && !$this.ended) {
    //       ctx.drawImage($this, 0, 0, canvas.clientWidth, canvas.clientHeight);
    //       setTimeout(loop, 1000 / 30); // drawing at 30fps
    //     }
    //     if ($this.ended && options.onComplete && typeof options.onComplete === 'function') {
    //       options.onComplete();
    //     }
    //   })();
    // }, false);

    // video.addEventListener('ended', function () {
    //   $(video).hide();
    //   if (options.onComplete && typeof options.onComplete === 'function') {
    //     options.onComplete();
    //   }
    // });

    video.addEventListener('timeupdate', function () {
      console.log('qqqqqq', this.duration, this.currentTime);
      var isStartDone, isCompleteDone;
      // 视频开始播放
      if (this.currentTime > 0.5) {
        if (!isStartDone && options.onStart && typeof options.onStart === 'function') {
          options.onStart();
          isStartDone = true;
        }
      }

      // 视频快要结束
      if (this.duration - this.currentTime < 0.5) {
        $(video).hide();
        if (!isCompleteDone && options.onComplete && typeof options.onComplete === 'function') {
          options.onComplete();
          isCompleteDone = true;
        }
      }
    });

    $(video).show()[0].play();
  },

  self.gotoTaskPage = function () {
    showPage('taskPage');
    $('#task_page .bgm').addClass('fadeIn').on('webkitAnimationEnd', function() {
      $('#task_page .spiderman').addClass('fadeIn').on('webkitAnimationEnd', function() {
        $('#task_page .lady').addClass('fadeIn').on('webkitAnimationEnd', function() {
          $('#task_page button img').addClass('fadeIn').on('webkitAnimationEnd', function() {
            $('#task_page button img').css('opacity', 1).addClass('shake-rotate');
          });
        });
      });
    });

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
    self.playVideo({
      videoId: 'task1',
      onStart: function () {
        hidePage('taskPage');
      },
      onComplete: function () {
        $('#video_player').hide();
        self.gotoEndingPage();
      }
    });
  }

  self.bgmTask = function () {
    console.log('bgm');
    self.playVideo({
      videoId: 'task2',
      onStart: function () {
        hidePage('taskPage');
      },
      onComplete: function () {
        $('#video_player').hide();
        self.gotoEndingPage();
      }
    });
  }

  self.ladyTask = function () {
    console.log('lady');
    self.playVideo({
      videoId: 'task3',
      onStart: function () {
        hidePage('taskPage');
      },
      onComplete: function () {
        $('#video_player').hide();
        self.gotoEndingPage();
      }
    });
  }

  self.gotoEndingPage = function () {
    showPage('endingPage');

    $('#btn_replay').on('click', function () {
      hidePage('endingPage');
      self.gotoTaskPage();
    });
    $('#btn_goplay').on('click', function () {
      hidePage('endingPage');
      self.gotoInfoPage();
    });
  }

  self.gotoInfoPage = function () {
    showPage('infoPage');
    confirmUserInfo();
  }

  self.share = function () {
    $.ajax({
      type: 'post',
      url: 'WeixinJSSDKServlet?type=getWxConfig',
      data: { url: window.location.href },
      dataType: 'json',
      success: function (args) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: args.appId, // 必填，公众号的唯一标识
          timestamp: args.timestamp, // 必填，生成签名的时间戳
          nonceStr: args.nonceStr, // 必填，生成签名的随机串
          signature: args.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          var url = window.location.href,
            title = '极限驾控营',
            desc = '全国24城 等你开飙',
            imgUrl = 'http://tron-m.com/long/assets/img/loading/0.png';

          wx.onMenuShareTimeline({
            title: '极限驾控营，全国24城 等你开飙', // 分享标题
            desc: '', // 分享描述
            link: url, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });

        wx.error(function (res) {
          console.log("wx has error:" + res);
        });
      }
    });
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
  }

  function showPage(id) {
    if (!self.pages[id]) {
      self.pages[id] = $(htmlMap[id]);
      $('body').append(self.pages[id]);
    }
    self.pages[id].show();
  }
  function hidePage(id) {
    self.pages[id].hide();
  }

  self.share();
  return self;
});