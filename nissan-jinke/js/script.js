// 剧本

define(['jquery', 'resLoader', 'weixin'], function ($, resLoader, wx) {
  var self = {
    pages: {
      taskPage: null,
      endingPage: null,
      infoPage: null,
      sharePage: null
    }
  };
  // var taskPage, endingPage, infoPage;
  var htmlMap = {
    taskPage: '<div id="task_page" class="fullscreen hidden">\n' +
    '    <img class="start hCenter" src="assets/img/h5/task/start.png">\n' +
    '    <img class="slogan hCenter" src="assets/img/h5/task/slogan.png">\n' +
    '    <img class="lady" src="assets/img/h5/task/lady.png">\n' +
    '    <img class="bgm" src="assets/img/h5/task/bgm.png">\n' +
    '    <img class="spiderman" src="assets/img/h5/task/spiderman.png">\n' +
    '    <div class="cloud fullscreen"></div>\n' +
    '    <button id="btn_spiderman">\n' +
    '      <img src="assets/img/h5/task/finger.png" class="hand handarrow">\n' +
    '      <img src="assets/img/h5/task/btn-spiderman.png" class="person">\n' +
    '    </button>\n' +
    '    <button id="btn_lady">\n' +
    '      <img src="assets/img/h5/task/finger.png" class="hand handarrow">\n' +
    '      <img src="assets/img/h5/task/btn-lady.png" class="person">\n' +
    '    </button>\n' +
    '    <button id="btn_bgm">\n' +
    '      <img src="assets/img/h5/task/finger.png" class="hand handarrow">\n' +
    '      <img src="assets/img/h5/task/btn-bgm.png" class="person">\n' +
    '    </button>\n' +
    '  </div>',
    endingPage: '<div id="ending_page" class="fullscreen hidden">\n' +
    '    <img class="slogan hCenter" src="assets/img/h5/ending/slogan.png">\n' +
    '    <img class="awesome fadeInOut" src="assets/img/h5/ending/666.png">\n' +
    '    <img class="dialog fadeInOut-delay2s" src="assets/img/h5/ending/dialog.png">\n' +
    '    <button id="btn_replay">\n' +
    '      <img src="assets/img/h5/ending/replay.png">\n' +
    '    </button>\n' +
    '    <button id="btn_goplay">\n' +
    '      <img src="assets/img/h5/ending/goplay.png">\n' +
    '    </button>\n' +
    '  </div>',
    infoPage: '  <div id="info_page" class="fullscreen hidden" style="height: 600px;">\n' +
    '    <img class="slogan hCenter" src="assets/img/h5/info/slogan.png">\n' +
    '  \n' +
    '    <form id="user_info_form">\n' +
    '      <div class="input name-input">\n' +
    '        <input class="input__field" name="name" id="name" value="">\n' +
    '      </div>\n' +
    '      <div class="input tel-input">\n' +
    '        <input class="input__field" name="telNo" id="telNo" value="">\n' +
    '      </div>\n' +
    '      <div class="input city-input">\n' +
    '        <div class="citylistbg">' +
    '           <div><span>合肥</span><span>广州</span><span>西安</span><span>沈阳</span></div>' +
    '           <div><span>上海</span><span>东莞</span><span>重庆</span><span>长春</span></div>' +
    '           <div><span>杭州</span><span>福州</span><span>武汉</span><span>哈尔滨</span></div>' +
    '           <div><span>苏州</span><span>惠州</span><span>郑州</span><span>太原</span></div>' +
    '           <div><span>济南</span><span>南昌</span><span>兰州</span><span>天津</span></div>' +
    '           <div><span>青岛</span><span>长沙</span><span>成都</span><span>石家庄</span></div>' +
    '        </div>\n' +
    '        <input class="input__field" name="memo" id="memo" value="" style="display: none;">\n' +
    '        <div class="input__field" id="memoDiv" style="height: 18px;"></div>\n' +
    '      </div>\n' +
    '      <button id="btn_confirm">\n' +
    '        <img src="assets/img/h5/info/btn_confirm.png">\n' +
    '      </button>\n' +
    '    </form>\n' +
    '    <div id="popup" class="fullscreen hidden" style="z-index: 10010;">\n' +
    '      <div class="op__mask"></div>\n' +
    '      <img src="assets/img/h5/info/popup.jpg">\n' +
    '    </div>\n' +
    '  </div>',
    sharePage: '<div id="share_page" class="fullscreen hidden">\n' +
    '    <img src="assets/img/h5/share/bg.jpg" class="fullscreen">\n' +
    '    <button id="btn_share">\n' +
    '      <img src="assets/img/h5/share/sharebtn.png" class="shake-rotate">\n' +
    '    </button>\n' +
    '    <div id="sharetips" class="fullscreen hidden">\n' +
    '      <div class="op__mask"></div>\n' +
    '      <img src="assets/img/h5/share/tips.png">\n' +
    '    </div>\n' +
    '  </div>'
  }
  self.aduio = document.getElementById('myAudio')
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
    for (var i = 1; i <= 24; i++) {
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
            'img/h5/muted.jpg',
            'img/h5/play.jpg',
            // 任务页图片
            'img/h5/task/bg.jpg',
            'img/h5/task/bgm.png',
            'img/h5/task/btn-bgm.png',
            'img/h5/task/btn-lady.png',
            'img/h5/task/btn-spiderman.png',
            'img/h5/task/cloud.png',
            'img/h5/task/finger.png',
            'img/h5/task/lady.png',
            'img/h5/task/slogan.png',
            'img/h5/task/spiderman.png',
            'img/h5/task/start.png',
            // 留资页
            'img/h5/info/bg.png',
            'img/h5/info/btn_confirm.png',
            'img/h5/info/city.png',
            'img/h5/info/citylistbg.png',
            'img/h5/info/name.png',
            'img/h5/info/popup.jpg',
            'img/h5/info/slogan.png',
            'img/h5/info/tel.png',
            // 结束页
            'img/h5/ending/666.png',
            'img/h5/ending/bg.jpg',
            'img/h5/ending/dialog.png',
            'img/h5/ending/goplay.png',
            'img/h5/ending/replay.png',
            'img/h5/ending/slogan.png',
            // 分享页
            'img/h5/share/bg.jpg',
            'img/h5/share/sharebtn.png',
            'img/h5/share/tips.png'
            // 视频
            // 在iphone上会出现onloadeddata没有被回调的情况，因此不建议load视频
            // 'video/start.mp4#start',
            // 'video/task1.mp4#task1',
            // 'video/task2.mp4#task2',
            // 'video/task3.mp4#task3',
          ],
          onProgress: function (current, total) {
            var percent = parseInt(current / total * 100);
            console.log('percent', percent);
            $('.loadingInfo .percent').text(percent + '%');
          },
          onComplete: function (total) {
            $('#btn_loaded').show().on('click', function () {
              self.aduio.play();
              self.aduio.pause();
              // 音乐播放暂停
              $('#audioBtn').show().on("click" ,function() {
                if (self.aduio.paused) {
                  self.playAudio();
                }
                else{
                  self.puaseAudio();
                }
              });
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
        self.playAudio();
        self.gotoTaskPage();
      }
    });
  },

  self.playAudio = function() {
    self.aduio.play();
    $("#audioBtn").addClass("boF");
  },

  self.puaseAudio = function() {
    self.aduio.pause();
    $("#audioBtn").removeClass("boF");
  },

  self.playVideo = function(options) {
    $('#video_player').show();
    self.puaseAudio();

    if (options.url) {
      var video = document.createElement('video');
      video.src = options.url;
    }
    if (options.videoId) {
      var video = document.getElementById(options.videoId);
    }

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
    $('.logo').hide();
    showPage('taskPage');
    $('#task_page .spiderman').addClass('fadeIn').on('webkitAnimationEnd', function() {
      $('#task_page .bgm').addClass('fadeIn').on('webkitAnimationEnd', function() {
        $('#task_page .lady').addClass('fadeIn').on('webkitAnimationEnd', function() {
          $('#task_page .start').addClass('fadeOut');
          $('#task_page .slogan').addClass('fadeIn-delay2s');
          $('#task_page button img.person').show().addClass('fadeIn').on('webkitAnimationEnd', function() {
            $('#task_page button img').css('opacity', 1);
            $('#task_page #btn_spiderman img.person').addClass('shake-rotate')
              .on('webkitAnimationStart webkitAnimationIteration', function () {
                $('#task_page img.hand').hide();
                $('#task_page #btn_spiderman img.hand').show();
            });
            $('#task_page #btn_bgm img.person').addClass('shake-rotate-delay1s')
              .on('webkitAnimationStart webkitAnimationIteration', function () {
                $('#task_page img.hand').hide();
                $('#task_page #btn_bgm img.hand').show();
            });
            $('#task_page #btn_lady img.person').addClass('shake-rotate-delay3s')
              .on('webkitAnimationStart webkitAnimationIteration', function () {
                $('#task_page img.hand').hide();
                $('#task_page #btn_lady img.hand').show();
            });
          });
        });
      });
    });

    $('#btn_bgm').on('click', function () {
      self.startTask('task1');
    });
    $('#btn_spiderman').on('click', function () {
      self.startTask('task2');
    });
    $('#btn_lady').on('click', function () {
      self.startTask('task3');
    });
  }

  self.startTask = function (videoId) {
    self.playVideo({
      videoId: videoId,
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
    $('.logo').show();
    showPage('endingPage');
    $('#btn_replay img').addClass('shake-rotate');
    $('#btn_goplay img').addClass('shake-rotate-delay1s');

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
    $('#info_page .city-input').on('touchend', function (e) {
      // 禁止事件冒泡
      e.stopImmediatePropagation();
      if ($('.citylistbg')[0].style.display === 'none' || $('.citylistbg')[0].style.display === '') {
        $('.citylistbg').show();
        $('.citylistbg span').on('touchend', function (e) {
          // 禁止事件冒泡
          e.stopImmediatePropagation();
          $('.citylistbg span').removeClass('selected');
          var target = $(e.target);
          target.addClass('selected');
          $('.city-input .input__field')[0].value = target.text();
          $('#memoDiv').text(target.text());
          setTimeout(function () {
            $('.citylistbg').hide();
          }, 0);
        });
      } else {
        $('.citylistbg').hide();
      }
    });
    confirmUserInfo();
  }

  self.gotoSharePage = function () {
    $('.logo').hide();
    showPage('sharePage');

    $('#share_page #btn_share').on('click', function () {
      $('#sharetips').show();
    });
    $('#sharetips').on('click', function () {
      $('#sharetips').hide();
    })
  }

  self.share = function () {
    $.ajax({
      type: 'post',
      // url: 'WeixinJSSDKServlet?type=getWxConfig',
      url: 'http://www.tron-m.com/tron-api/jssdk/share.do',
      data: { url: window.location.href },
      dataType: 'json',
      success: function (json) {
        if (json.code == 1) {
          var result = json.result;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: result.appId, // 必填，公众号的唯一标识
            timestamp: result.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.nonceStr, // 必填，生成签名的随机串
            signature: result.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        } else {
          console.log("getWXConfig has error:" + json.msg);
        }
        wx.ready(function () {
          var url = window.location.href,
            title = '打破次元壁，劲客任务之极限驾控营带劲开飚！',
            desc = '欢迎来战',
            imgUrl = 'http://www.tron-m.com/long/assets/img/share.jpg';

          wx.onMenuShareTimeline({
            title: title, // 分享标题
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
    $("#info_page #btn_confirm").on('touchend', function (e) {
      // 禁止事件冒泡
      e.stopImmediatePropagation();
      $('#user_info_form').submit();
    });
    $('#user_info_form').validator({
      timely: 0,
      stopOnError: false,
      msgMaker: false,
      fields: {
        'name': {rule: 'required;length(2~30)', msg: {required: '姓名不能为空', length: '姓名2-30字符'}},
        'telNo': {rule: 'required;mobile', msg: {required: '手机不能为空', mobile: '手机错误'}},
        'memo': {rule: 'required', msg: {required: '城市不能为空'}}
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
          $.fn.serializeObject = function (){
            var unindexed_array = this.serializeArray();
            var indexed_array = {};

            $.map(unindexed_array, function(n, i){
              indexed_array[n['name']] = n['value'];
            });

            // 测试activityId为1或2，劲客任务的activityId为20170817
            indexed_array.activityId = 1;

            return indexed_array;
          }
          var ajax = $.ajax({
            url: 'http://www.tron-m.com/tron-api/api/addRecord.do',
            data: JSON.stringify($(form).serializeObject()),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            timeout: 8000,
            async: true
          });
          ajax.done(function (r) {
            hideLoading();
            if (r.error) {
              showToaster(r.msg);
            }
            else {
              // alert('提交成功！\n 销售顾问将与您联系，准备去现场挑战吧！');
              // hidePage('infoPage');
              // self.gotoSharePage();
              $('#popup').show();
              var timeout = setTimeout(function () {
                $('#popup').hide();
                hidePage('infoPage');
                self.gotoSharePage();
                clearTimeout(timeout);
              }, 3000);
              return;
            }
          });
          ajax.fail(function (jqXHR, textStatus) {
            hideLoading();
            showToaster('出错啦!可能是你的打开姿势不对~~');
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
    }
    $('body').append(self.pages[id]);
    self.pages[id].show();
  }
  function hidePage(id) {
    // console.log(id);
    // self.pages[id].hide();
    self.pages[id].remove();
  }

  self.share();
  return self;
});