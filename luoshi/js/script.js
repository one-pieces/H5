define(['jquery', 'createjs', 'View', 'Swiper'], function ($, createjs, View, Swiper) {
  var self = {
    stage: null,
    container: null
  };

  self.open = function() {
    console.log('start', createjs);
    //放置静态资源的数组
    var manifest = [
      {src: './assets/img/page1/arrow.png', id: 'page1_arrow'},
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
      {src: './assets/img/page1/10-wuding.png', id: 'page1_10-wuding'}
    ];
    window.queue = new createjs.LoadQueue();
    queue.on('progress', handleProgress);
    queue.on('complete', handleComplete, this);
    queue.loadManifest(manifest);
    //资源加载成功后,进行处理
    function handleComplete(event) {
      // var tyre = queue.getResult('page1_01-title');  //获取加载资源
      // console.log(tyre);
      event.currentTarget.removeEventListener("progress", handleProgress);
      event.currentTarget.removeEventListener("complete", handleComplete);

      var swiper = new Swiper('.swiper-container', {
        pagination: false,
        speed: 400,
        paginationClickable: true,
        direction: 'vertical',
        onInit: function(swiper) {
          console.log('aaaaaa');
          // swiperAnimateCache(swiper);
          // swiperAnimate(swiper);
        },
        onSlideChangeEnd: function(swiper) {
          // swiperAnimate(swiper);
        }
//      onSlideChangeStart: function(swiper) {
//        if (swiper.activeIndex == 3) { createSwiper2(); }
//      }
      });

      this.init();
    }
    function handleProgress(event) {
      console.log((queue.progress*100|0) + '%');
    }
  }

  self.init = function() {
    var canvas = document.getElementById('mainView');
    this.stage = new createjs.Stage(canvas);
    this.container = new createjs.Container();
    this.stage.addChild(this.container);
    createjs.Touch.enable(this.stage);

    createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', this.stage);
    // createjs.Ticker.addEventListener("tick", stageBreakHandler);

    var contentView1 = new View.ContentView1();
    // console.log(contentView1);
    this.container.addChild(contentView1);
    this.stage.update();
  }

  return self;
});
