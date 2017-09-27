define(['jquery', 'createjs', 'View', 'Swiper', 'weixin'], function ($, createjs, View, Swiper, wx) {
  var self = {
    homePage: {
      stage: null,
      container: null
    },
    mainPage: {
      stage: null,
      container: null
    },
    photoPage: {
      stage: null,
      container: null
    },
    cardId: null
  };

  self.aduio = document.getElementById('myAudio');

  self.open = function() {
    console.log('start', createjs, window.location.search.split('&'));
    this.cardId = (function() {
      let qs = location.href.split('?').pop();
      if (!qs) return {};
      let params = {};
      qs.split('&').forEach(pairs => {
        let [key, value] = pairs.split('=');
        key = key.replace('[]', '');
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
        if (value) {
          if (params[key]) {
            if (Array.isArray(params[key])) {
              params[key].push(value);
            } else {
              params[key] = [params[key], value];
            }
          } else {
            params[key] = value;
          }
        }
      });
      return params;
    })()['cardId'];
    console.log('cardId', this.cardId);
    //放置静态资源的数组
    var manifest = [
      // page1
      {src: './assets/img/page1/01-title.png', id: 'page1_01-title'},
      {src: './assets/img/page1/02-english-title.png', id: 'page1_02-english-title'},
      {src: './assets/img/page1/03-guihua.png', id: 'page1_03-guihua'},
      {src: './assets/img/page1/04-tuzi/01-ear.png', id: 'page1_04-tuzi_01-ear'},
      {src: './assets/img/page1/04-tuzi/02-ear.png', id: 'page1_04-tuzi_02-ear'},
      {src: './assets/img/page1/04-tuzi/03-body.png', id: 'page1_04-tuzi_03-body'},
      {src: './assets/img/page1/05-denglong.png', id: 'page1_05-denglong'},
      {src: './assets/img/page1/06-cloud.png', id: 'page1_06-cloud'},
      {src: './assets/img/page1/06-moon.png', id: 'page1_06-moon'},
      {src: './assets/img/page1/07-stars.png', id: 'page1_07-stars'},
      {src: './assets/img/page1/08-kongmingdeng/01.png', id: 'page1_08-kongmingdeng_01'},
      {src: './assets/img/page1/08-kongmingdeng/02.png', id: 'page1_08-kongmingdeng_02'},
      {src: './assets/img/page1/08-kongmingdeng/03.png', id: 'page1_08-kongmingdeng_03'},
      {src: './assets/img/page1/08-kongmingdeng/04.png', id: 'page1_08-kongmingdeng_04'},
      {src: './assets/img/page1/09-background.png', id: 'page1_09-background'},
      {src: './assets/img/page1/10-wuding.png', id: 'page1_10-wuding'},
      // page2
      {src: './assets/img/page2/00-background.jpg', id: 'page2_00-background'},
      // {src: './assets/img/page2/01-guihua.png', id: 'page2_01-guihua'},
      {src: './assets/img/page2/02-deng.png', id: 'page2_02-deng'},
      {src: './assets/img/page2/03-hehua.png', id: 'page2_03-hehua'},
      {src: './assets/img/page2/04-lianhua.png', id: 'page2_04-lianhua'},
      {src: './assets/img/page2/05-kongmingdeng.png', id: 'page2_05-kongmingdeng'},
      {src: './assets/img/page2/06-kongmingdeng.png', id: 'page2_06-kongmingdeng'},
      {src: './assets/img/page2/07-kongmingdeng.png', id: 'page2_07-kongmingdeng'},
      {src: './assets/img/page2/08-kongmingdeng.png', id: 'page2_08-kongmingdeng'},
      {src: './assets/img/page2/09-kongmingdeng.png', id: 'page2_09-kongmingdeng'},
      {src: './assets/img/page2/10-stars.png', id: 'page2_10-stars'},
      // {src: './assets/img/page2/11-stars.png', id: 'page2_11-stars'},
      // {src: './assets/img/page2/12-stars.png', id: 'page2_12-stars'},
      // {src: './assets/img/page2/13-stars.png', id: 'page2_13-stars'},
      {src: './assets/img/page2/20-wenzi1.png', id: 'page2_20-wenzi1'},
      {src: './assets/img/page2/21-wenzi2.png', id: 'page2_21-wenzi2'},
      // {src: './assets/img/page2/22-wenzi3.png', id: 'page2_22-wenzi3'},
      // page3
      {src: './assets/img/page3/01-picture.png', id: 'page3_01-picture'},
      {src: './assets/img/page3/02-background.jpg', id: 'page3_02-background'},
      {src: './assets/img/page3/03-wenzi.png', id: 'page3_03-wenzi'},
      {src: './assets/img/page3/14-petal.png', id: 'page3_14-petal'},
      {src: './assets/img/page3/15-petal.png', id: 'page3_15-petal'},
      {src: './assets/img/page3/16-petal.png', id: 'page3_16-petal'},
      {src: './assets/img/page3/17-petal.png', id: 'page3_17-petal'},
      {src: './assets/img/page3/18-petal.png', id: 'page3_18-petal'},
      {src: './assets/img/page3/19-petal.png', id: 'page3_19-petal'},
      // page4
      {src: './assets/img/page4/03-yanhua.png', id: 'page4_03-yanhua'},
      {src: './assets/img/page4/04-yanhua.png', id: 'page4_04-yanhua'},
      {src: './assets/img/page4/10-background.png', id: 'page4_10-background'},
      // page5
      {src: './assets/img/page5/00-background.jpg', id: 'page5_00-background'},
      // {src: './assets/img/page5/01-kongmingdeng.png', id: 'page5_01-kongmingdeng'},
      // {src: './assets/img/page5/02-kongmingdeng.png', id: 'page5_02-kongmingdeng'},
      // {src: './assets/img/page5/03-kongmingdeng.png', id: 'page5_03-kongmingdeng'},
      // {src: './assets/img/page5/04-kongmingdeng.png', id: 'page5_04-kongmingdeng'},
      {src: './assets/img/page5/10-stars.png', id: 'page5_10-stars'},
      // {src: './assets/img/page5/11-stars.png', id: 'page5_11-stars'},
      // {src: './assets/img/page5/12-stars.png', id: 'page5_12-stars'},
      // {src: './assets/img/page5/13-stars.png', id: 'page5_13-stars'}
      // page6
      // {src: './assets/img/page6/01-cloud.png', id: 'page6_01-cloud'},
      // {src: './assets/img/page6/02-cloud.png', id: 'page6_02-cloud'},
      {src: './assets/img/page6/moon.png', id: 'page6_moon'},
      {src: './assets/img/page6/biaoqian2.png', id: 'page6_biaoqian2'},
      {src: './assets/img/page6/biaoqian3.png', id: 'page6_biaoqian3'},
      {src: './assets/img/page6/biaoqian4.png', id: 'page6_biaoqian4'},
      {src: './assets/img/page6/zhaopiankuang.png', id: 'page6_zhaopiankuang'},
      {src: './assets/img/page6/dikuang.jpg', id: 'page6_dikuang'},
      {src: './assets/img/page6/01-picture.jpg', id: 'page6_01-picture'},
      {src: './assets/img/page6/03-btn.png', id: 'page6_03-btn'},
      // {src: './assets/img/page6/04-picture.png', id: 'page6_04-picture'},
      {src: './assets/img/page6/05-background.png', id: 'page6_05-background'},
      // page7
      {src: './assets/img/page7/yun1.png', id: 'page7_yun1'},
      {src: './assets/img/page7/yun2.png', id: 'page7_yun2'},
      {src: './assets/img/page7/background.jpg', id: 'page7_background'},
      {src: './assets/img/page7/zhaopiankuang.png', id: 'page7_zhaopiankuang'},
      {src: './assets/img/page7/wenzikuang.png', id: 'page7_wenzikuang'},
      {src: './assets/img/page7/photo-btn.png', id: 'page7_photo-btn'},
      {src: './assets/img/page7/confirm-btn.png', id: 'page7_confirm-btn'},
      // page8
      {src: './assets/img/page8/background.png', id: 'page8_background'},
      // page8 css
      {src: './assets/img/page8/chongxinzhizuo.png', id: 'page8_chongxinzhizuo'},
      {src: './assets/img/page8/fenxiang.png', id: 'page8_fenxiang'},
      {src: './assets/img/page8/yuangongzhuanxiang.png', id: 'page8_yuangongzhuanxiang'},
      // page9
      {src: './assets/img/page9/biaoti.png', id: 'page9_biaoti'},
      {src: './assets/img/page9/yun.png', id: 'page9_yun'},
      {src: './assets/img/page9/xiayibu.png', id: 'page9_xiayibu'},
      // page10
      {src: './assets/img/page10/biaoti.png', id: 'page10_biaoti'},
      {src: './assets/img/page10/mingzi.png', id: 'page10_mingzi'},
      {src: './assets/img/page10/shoujihao.png', id: 'page10_shoujihao'},
      {src: './assets/img/page10/yuangonghao.png', id: 'page10_yuangonghao'},
      {src: './assets/img/page10/tijiao.png', id: 'page10_tijiao'},
      // share
      {src: './assets/img/share/erweima.png', id: 'share_erweima'},
      // share css
      {src: './assets/img/share/sharing.png', id: 'share_sharing'}
    ];
    window.queue = new createjs.LoadQueue();
    queue.on('progress', handleProgress);
    queue.on('complete', handleComplete, this);
    queue.loadManifest(manifest);
    //资源加载成功后,进行处理
    function handleComplete(event) {
      event.currentTarget.removeEventListener("progress", handleProgress);
      event.currentTarget.removeEventListener("complete", handleComplete);

      if (this.cardId) {
        $('#loading').hide();
        $('#photoView').show();
        self.initPhotoPage();
      }
      self.init();
    }
    function handleProgress(event) {
      $('#loading .text').text((queue.progress*100|0) + '%');
      console.log((queue.progress*100|0) + '%');
    }
  };

  self.init = function() {
    // 音频播放逻辑
    (function() {
      self.aduio.play();
      $('#audioBtn').show();
      $('#audioBtn').click(function() {
        if (!self.aduio.paused) {
          self.aduio.pause();
          $('#audioBtn').addClass('muted');
        } else {
          self.aduio.play();
          $('#audioBtn').removeClass('muted');
        }
      });
    })();

    document.addEventListener("WeixinJSBridgeReady", function () {
      (function() {
        self.aduio.play();
        $('#audioBtn').show();
        $('#audioBtn').click(function() {
          if (!self.aduio.paused) {
            self.aduio.pause();
            $('#audioBtn').addClass('muted');
          } else {
            self.aduio.play();
            $('#audioBtn').removeClass('muted');
          }
        });
      })();
    }, false);

    var swiper = new Swiper('.swiper-container', {
      pagination: false,
      speed: 400,
      paginationClickable: true,
      direction: 'vertical',
      onInit: function(swiper) {
        // swiperAnimateCache(swiper);
        // swiperAnimate(swiper);
        $('#loading').hide();
        self.initHomePage();
      },
      onSlideChangeEnd: function(swiper) {
        // swiperAnimate(swiper);
        self.initMainPage();
      }
    });
  };

  self.initPhotoPage = function() {
    var canvas = document.getElementById('photoView');
    this.photoPage.stage = new createjs.Stage(canvas);
    this.photoPage.container = new createjs.Container();
    this.photoPage.stage.addChild(this.photoPage.container);
    createjs.Touch.enable(this.photoPage.stage);

    createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', this.photoPage.stage);


    // 获取用户祝福卡信息
    $('#loading1').show();
    $.ajax({
      type: 'post',
      url: 'http://zq.guiyuanshiye.com/card/detail',
      data: {id: this.cardId},
      dataType: 'json',
      async: false,
      success: function (json) {
        $('#loading1').hide();
        // 有cardId，则从第六页开始显示
        var contentView6 = new View.ContentView6(function click() {
          contentView6.parent.removeChild(contentView6);
          $('#photoView').hide();
        }, json.data && {name: json.data.name, image: 'http://zq.guiyuanshiye.com/' + json.data.image, content: json.data.content} || null);
        self.photoPage.container.addChild(contentView6);
      }
    });
    this.photoPage.stage.update();
  };

  self.initHomePage = function() {
    var canvas = document.getElementById('homeView');
    this.homePage.stage = new createjs.Stage(canvas);
    this.homePage.container = new createjs.Container();
    this.homePage.stage.addChild(this.homePage.container);
    createjs.Touch.enable(this.homePage.stage);

    createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', this.homePage.stage);

    var contentView1 = new View.ContentView1();
    this.homePage.container.addChild(contentView1);
    this.homePage.stage.update();
  };

  self.initMainPage = function() {
    var canvas = document.getElementById('mainView');
    this.mainPage.stage = new createjs.Stage(canvas);
    this.mainPage.container = new createjs.Container();
    this.mainPage.stage.addChild(this.mainPage.container);
    createjs.Touch.enable(this.mainPage.stage);

    createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', this.mainPage.stage);
    
    // 没有cardId，则从第二页开始显示
    var contentView2 = new View.ContentView2(function() {
      setTimeout(function() {
        contentView2.parent.removeChild(contentView2);
      }, 2500);
      var contentView3 = new View.ContentView3(function() {
        setTimeout(function() {
          contentView3.parent.removeChild(contentView3);
        });
        var contentView4 = new View.ContentView4(function() {
          setTimeout(function() {
            contentView4.parent.removeChild(contentView4);
          });
          var contentView5 = new View.ContentView5(function() {
            setTimeout(function() {
              contentView5.parent.removeChild(contentView5);
            });
            var contentView6 = new View.ContentView6(function click() {
              contentView6.parent.removeChild(contentView6);
              var contentView7 = new View.ContentView7(function(imgDataURL) {
                self.htmlPage(imgDataURL);
              });
              self.mainPage.container.addChild(contentView7);
            });
            self.mainPage.container.addChild(contentView6);
          });
          self.mainPage.container.addChild(contentView5);
        });
        self.mainPage.container.addChild(contentView4);
      });
      self.mainPage.container.addChild(contentView3);
    });
    this.mainPage.container.addChild(contentView2);

    // var contentView7 = new View.ContentView7(function(imgDataURL) {
    //   self.htmlPage(imgDataURL);
    // });
    // self.mainPage.container.addChild(contentView7);
    this.mainPage.stage.update();
  };

  self.htmlPage = function(imgDataURL) {
    var img = document.createElement('img');
    img.src = imgDataURL;
    $(img).css({width: '100%', height: '100%', position: 'absolute'}).appendTo('#page8 .content');
    $('#page8').show();
    $('.swiper-container').hide();
    $('#page7InputContainer').hide();

    $('#page8 .redo-btn').on('click', function() {
      $('#page8').hide();
      $('.swiper-container').show();
      $('#page7InputContainer').show();
      $('#textInput').val('');
      $('#nameInput').val('');
    });

    $('#page8 .share-btn').on('click', function() {
      $('#share').show();
      $('#share').on('click', function() {
        $('#share').hide();
      });
    });

    $('#page8 .staff-share-btn').on('click', function() {
      self.mainPage.container.removeAllChildren();
      var contentView9 = new View.ContentView9(function() {
        contentView9.parent.removeChild(contentView9);
        var contentView10 = new View.ContentView10();
        self.mainPage.container.addChild(contentView10);
      });
      self.mainPage.container.addChild(contentView9);
      $('.swiper-container').show();
      setTimeout(function() {
        $('#page8').hide();
      }, 800);
    });
  };

  self.share = function () {
    $.ajax({
      type: 'post',
      // url: 'WeixinJSSDKServlet?type=getWxConfig',
      // url: 'http://www.tron-m.com/tron-api/jssdk/share.do',
      url: 'http://zq.guiyuanshiye.com/weixin/GetJsSign',
      data: { url: window.location.href },
      dataType: 'json',
      success: function (json) {
        if (json.code == 0) {
          var result = json.data;
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
            title = '罗氏祝您全家团圆美满，万事如意！',
            desc = '月圆夜，全家福，在这个中秋，写下你的心愿，定个幸福时刻！',
            // imgUrl = 'http://www.tron-m.com/long/assets/img/share.jpg';
            imgUrl = 'http://zq.guiyuanshiye.com//long/assets/img/share/wechat.jpg';

          wx.onMenuShareTimeline({
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

  self.share();

  return self;
});
