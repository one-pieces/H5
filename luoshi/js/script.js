define(['jquery', 'createjs', 'View', 'Swiper'], function ($, createjs, View, Swiper) {
  var self = {
    homePage: {
      stage: null,
      container: null
    },
    mainPage: {
      stage: null,
      container: null
    }
  };

  self.open = function() {
    console.log('start', createjs);
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
      {src: './assets/img/page2/22-wenzi3.png', id: 'page2_22-wenzi3'},
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
      {src: './assets/img/page5/00-background.png', id: 'page5_00-background'},
      // {src: './assets/img/page5/01-kongmingdeng.png', id: 'page5_01-kongmingdeng'},
      // {src: './assets/img/page5/02-kongmingdeng.png', id: 'page5_02-kongmingdeng'},
      // {src: './assets/img/page5/03-kongmingdeng.png', id: 'page5_03-kongmingdeng'},
      // {src: './assets/img/page5/04-kongmingdeng.png', id: 'page5_04-kongmingdeng'},
      {src: './assets/img/page5/10-stars.png', id: 'page5_10-stars'},
      // {src: './assets/img/page5/11-stars.png', id: 'page5_11-stars'},
      // {src: './assets/img/page5/12-stars.png', id: 'page5_12-stars'},
      // {src: './assets/img/page5/13-stars.png', id: 'page5_13-stars'}
      // page6
      {src: './assets/img/page6/01-cloud.png', id: 'page6_01-cloud'},
      {src: './assets/img/page6/02-cloud.png', id: 'page6_02-cloud'},
      {src: './assets/img/page6/03-btn.png', id: 'page6_03-btn'},
      {src: './assets/img/page6/04-picture.png', id: 'page6_04-picture'},
      {src: './assets/img/page6/05-background.png', id: 'page6_05-background'},
      // page7
      {src: './assets/img/page7/background.jpg', id: 'page7_background'},
      {src: './assets/img/page7/zhaopiankuang.png', id: 'page7_zhaopiankuang'},
      {src: './assets/img/page7/wenzikuang.png', id: 'page7_wenzikuang'},
      {src: './assets/img/page7/photo-btn.png', id: 'page7_photo-btn'},
      {src: './assets/img/page7/confirm-btn.png', id: 'page7_confirm-btn'},
      // page8
      {src: './assets/img/page8/background.png', id: 'page8_background'},
      {src: './assets/img/page8/bg2.png', id: 'page8_bg2'}
    ];
    window.queue = new createjs.LoadQueue();
    queue.on('progress', handleProgress);
    queue.on('complete', handleComplete, this);
    queue.loadManifest(manifest);
    //资源加载成功后,进行处理
    function handleComplete(event) {
      event.currentTarget.removeEventListener("progress", handleProgress);
      event.currentTarget.removeEventListener("complete", handleComplete);

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
      // self.initMainPage();
    }
    function handleProgress(event) {
      $('#loading').text((queue.progress*100|0) + '%');
      console.log((queue.progress*100|0) + '%');
    }
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
    $('#textInput').hide();

    $('#page8 .redo-btn').on('click', function() {
      $('#page8').hide();
      $('.swiper-container').show();
      $('#textInput').val('').show();
    });

    $('#page8 .share-btn').on('click', function() {
      // $('#page9').show();
      console.log('弹出分享蒙版');
    });

    $('#page8 .staff-share-btn').on('click', function() {
      $('#page8').hide();
      $('#page9').show();
    });
  };

  return self;
});
