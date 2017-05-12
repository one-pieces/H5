(function() {
  var _h = document.documentElement.clientHeight;
  function PageUtil(selector) {
    this.ele = document.querySelectorAll(selector)[0];
    this.scaleNum = document.documentElement.clientWidth/640;
    _h = _h/this.scaleNum;
    var resps = document.querySelectorAll('.resp');
    for (var i = 0; i <= resps.length - 1; i++) {
      if (resps[i].offsetTop != 0) {
        resps[i].style.top = _h * (resps[i].offsetTop/1136) + 'px';
      }
    }
    return this;
  }
  PageUtil.prototype.response = function(height) {
    this.ele.style.cssText = "-webkit-transform-origin: 0 0 0px; -webkit-transform: scale(" +
        this.scaleNum + ");position: absolute; width: 640px; height:" + parseInt(height + 1) + "px";
    return this;
  };
  new PageUtil('.main').response(_h);
})();

(function() {
  var swiper = new Swiper('.swiper-container', {
    pagination: false,
    speed: 400,
    paginationClickable: true,
    direction: 'vertical',
    allowSwipeToPrev : false,
    onInit: function(swiper) {
      swiperAnimateCache(swiper);
      swiperAnimate(swiper);
      // playMp3("http://mfiles.sohu.com/news/yf/enenh5/mp3/bgm2.mp3", 1);
        swiper.slideTo(5, 500);
    },
    onSlideChangeEnd: function(swiper) {
      swiperAnimate(swiper);
        // 第一页时显示佳能header
        if (swiper.activeIndex == 1 || swiper.activeIndex == 5 ) { $("#canonHeader").fadeIn(1000); }
        if (swiper.activeIndex == 5 ) { $("#canonFooter").fadeIn(1000); }
    },
    onSlideChangeStart: function(swiper) {
        // 非第一页时隐藏佳能header
        if (swiper.activeIndex != 1) { $("#canonHeader").fadeOut(500); }
        if (swiper.activeIndex == 3) { createSwiper2(); }
    }
  });
    
  var swiper3 = new Swiper('#openDoor', {
    pagination: false,
    speed: 500,
    slidesPerView: 'auto',
    freeMode: true,
    direction: 'vertical',
    slideClass: 'swiper-slide3',
    onInit: function(swipe) {
        $("#door").on("touchstart", function() {
            var x = '<div class="swiper-slide3 swiper-no-swiping">' +
                      '<div class="bgC032 animated fadeIn"></div>' +
                    '</div>'
            
            swipe.appendSlide(x);
            swipe.slideNext(500);
            //playMp3("images/开门声.wav", 1);
            setTimeout(function() { swiper.slideNext(1000) }, 1500);
        });
    },
    onSlideChangeEnd: function(swiper) {
    }
  });
    
    
function createSwiper2()
{

  var swiper2 = new Swiper('#scrolling', {
    pagination: false,
    speed: 500,
    slidesPerView: 'auto',
    freeMode: true,
    direction: 'vertical',
    slideClass: 'swiper-slide2',
    onInit: function(swipe) {
    },
    onSlideChangeEnd: function(swiper) {
    }
  });

  // scrolling
  var HTMLS = [
/*    '<div class="swiper-slide2 swiper-no-swiping">' +
      '<div class="bg44 animated fadeInUp"></div>' +
      '<div class="bg45 animated fadeInUp"></div>' +
      '<div class="bb44 animated zoomIn"></div>' +
    '</div>',

    '<div class="swiper-slide2 swiper-no-swiping">' +
      '<div class="bg43 animated zoomIn"></div>' +
      '<div class="bb42 animated zoomIn"></div>' +
      '<div class="bb43 animated zoomIn"></div>' +
    '</div>',

    '<div class="swiper-slide2 swiper-no-swiping">' +
      '<div class="bg41 animated fadeInLeft"></div>' +
      '<div class="bg42 animated fadeInRight"></div>' +
      '<div class="bb41 animated zoomIn"></div>' +
    '</div>',

    '<div class="swiper-slide2 swiper-no-swiping">' +
      '<div id="bg32" class="bg32 animated fadeInLeft"></div>' +
      '<div id="bg33" class="bg33 animated fadeInRight"></div>' +
      '<div id="bb32" class="bb32 animated zoomIn"></div>' +
      '<div class="bg34 animated fadeInUp"></div>' +
      '<div class="bb33 animated fadeInUp"></div>' +
    '</div>',*/
      
    '<div class="swiper-slide2 swiper-no-swiping">' +
      '<div class="bgC093 animated fadeInUp"></div>' +
      '<div id="bb31" class="bgC0931 animated zoomIn"></div>' +
    '</div>',
      
    '<div class="swiper-slide2 swiper-no-swiping">' +
      '<div class="bgC092 animated fadeInUp"></div>' +
      '<div id="bb31" class="bgC0921 animated zoomIn"></div>' +
    '</div>',

    '<div class="swiper-slide2 swiper-no-swiping">' +
      '<div class="bgC091 animated fadeInUp"></div>' +
      '<div id="bb31" class="bgC0911 animated zoomIn"></div>' +
    '</div>'
  ];

  var startY, moveY;
  setTimeout(function() {
    $('#scrolling').on('touchstart', function(e) {
      startY = e.originalEvent.changedTouches[0].pageY;
    });
    $('#scrolling').on('touchend', function(e) {
      if (e.originalEvent.changedTouches[0].pageY - startY < 10) {
        // next
        if (HTMLS.length == 0) {
          swiper.slideTo(4, 500);
        } else {
          swiper2.appendSlide(HTMLS.pop()); // 加到Swiper的最后
          // if (HTMLS.length == 3) {
          //   ado.pause();
          //   playMp3('http://news.sohu.com/upload/yf/enenh5/mp3/kick.mp3', 1);
          // }
          // if (HTMLS.length == 2) {
          //   playMp3('http://news.sohu.com/upload/yf/enenh5/mp3/kick.mp3', 1);
          // }
          // if (HTMLS.length == 0) {
          //   playMp3('http://news.sohu.com/upload/yf/enenh5/mp3/kick.mp3', 1);
          // }
          swiper2.slideNext(500);
        }
      } else {
        if (HTMLS.length > 0) {
          swiper2.appendSlide(HTMLS.pop()); // 加到Swiper的最后
          // if (HTMLS.length == 3) {
          //   ado.pause();
          //   playMp3('http://news.sohu.com/upload/yf/enenh5/mp3/kick.mp3', 1);
          // }
          // if (HTMLS.length == 2) {
          //   playMp3('http://news.sohu.com/upload/yf/enenh5/mp3/kick.mp3', 1);
          // }
          // if (HTMLS.length == 0) {
          //   playMp3('http://news.sohu.com/upload/yf/enenh5/mp3/kick.mp3', 1);
          // }
          swiper2.slideNext(500);
        } else {
          //swiper2.slidePrev(500);
        }
      }
    })
  }, 9000);
}
})();
    


alert($(window).height()); //浏览器当前窗口可视区域高度 
//alert($(document).height()); //浏览器当前窗口文档的高度 
//alert($(document.body).height());//浏览器当前窗口文档body的高度 
//alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin 
alert($(window).width()); //浏览器当前窗口可视区域宽度 
//alert($(document).width());//浏览器当前窗口文档对象宽度 
//alert($(document.body).width());//浏览器当前窗口文档body的高度 
//alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin 

/*$('#bg22').on('webkitAnimationEnd', function(e) {
  $('#bg22').css({
    'animation-duration': '1.2s',
    '-webkit-animation-duration': '1.2s',
    'animation-name': 'bg22',
    '-webkit-animation-name': 'bg22'
  })
});*/