!function() {
  'use strict';
  var homePage = {
    page: null,
    con: null,
    myScroll: null,
    yanhua: null,
    init: function() {
      var _this =this;
      this.page = $('.homePage');
      this.con = this.page.find('.con');
      this.con.show();
      this.page.find('.light').hide();
      window.setTimeout(function() {
        _this.lightAm(1, function(sign) {
          'over' == sign ? (_this.page.find('.parCon').show(),
            _this.con.height(1856),
            _this.addScroll(),
            _this.page.find('.maxLight').show(),
            _this.page.find('.maskLight').hide(),
            _this.page.find('.sNav').show()) :
            (_this.page.find('.nav .sNav').eq(sign).show(), _this.page.find('.btns .sNav').eq(sign).show());
        });
        _this.page.find('.light').show();
      }, 10);
      // this.addEvent();
    },
    addScroll: function() {
      function refresh() {
        _this.myScroll && _this.myScroll.refresh();
      }
      if (this.myScroll) {
        return false;
      }
      var _this = this;
      $('.homePage').find('.homeScroll');
      this.myScroll = new IScroll('#homePage', {
        scrollX: false,
        scrollY: true
      });
      this.page.on(START_EV, refresh);
    },
    lightShow: true,
    lightAm: function(numberOfFrame1, frameEndFunc) {
      if (this.lightShow) {
        var _this = this,
          page = this.page,
          total = 25,
          numberOfFrame = numberOfFrame1;
        return 9 == numberOfFrame && frameEndFunc(0),
          13 == numberOfFrame && frameEndFunc(1),
          18 == numberOfFrame && frameEndFunc(2),
          20 == numberOfFrame && frameEndFunc(3),
          25 == numberOfFrame && frameEndFunc(4),
          numberOfFrame > total ? (frameEndFunc && frameEndFunc('over'), void page.find('.light').hide()) :
            void window.setTimeout(function() {
              var imgUrl = _ROOT + 'images/light/' + numberOfFrame + '.png';
              $('<img/>').load(function() {
                page.find('.light img').attr('src', imgUrl);
                _this.lightAm(numberOfFrame + 1, frameEndFunc);
                TweenMax.to(page.find('.maskLight'), .3, {
                  height: 950 / 24 * numberOfFrame
                });
              }).attr('src', imgUrl);
            }, 50);
      }
    },
    addEvent: function() {
      var _this = this,
        page = this.page;
      page.find('.btns .sNav').on(TAP_EV, function() {
        var index = $(this).index();
        // _this.showInnerPage(index);
      })
    }
  };
  window.homePage = homePage;
}();

!function() {
  'use strict';
  var infoPage = {
    con: null,
    show: !0,
    init: function() {
      this.con = $('.infoPage');
      this.handler();
      this.addEvent();
      window.setTimeout(function() {
        $('.homePage').find('.infoFoot').show();
      }, 300);
    },
    addEvent: function() {
      var pageY, distanceY, $con = this.con, $body = $('body');
      $body.on(START_EV, function(event) {
        var e = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : event;
        pageY = e.pageY;
        distanceY = 0;
      });
      $body.on(MOVE_EV, function(event) {
        var e = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : event;
        distanceY = e.pageY - pageY;
      });
      $body.on(END_EV, function(event) {
        event.preventDefault();
        if (-100 > distanceY) {
          TweenMax.to($con, 1.3, {
            y: -$(window).height(),
            alpha: 0,
            ease: Cubic.easeInOut
          });
          TweenMax.to($('.homePage .infoFoot'), 1.3, {
            top: 7,
            scale: .8,
            x: -45,
            ease: Cubic.easeInOut,
            onComplete: function() {
              homePage.init();
              $con.hide();
            }
          });
          $con.find('.bg').fadeOut();
          $body.unbind(START_EV + ' ' + MOVE_EV + ' ' + END_EV);
          $('.homePage').find('.con').fadeIn(1200);
        }
      })
    },
    handler: function() {
      var $con = this.con;
      this.titAm(1, function() {
        $con.find('.light').fadeIn();
      });
      this.con.fadeIn();
      this.logosAm(1);
    },
    titAm: function(numberOfFrame1, amEndFunc) {
      var numberOfFrame = numberOfFrame1,
        _this = this,
        total = 25,
        width = 422,
        height = 192;
      if (numberOfFrame >= total - 1) {
        console.log('播放完成!');
        amEndFunc && amEndFunc();
        return false;
      }
      var $con = this.con,
        r = 0,
        c = 0;
      window.setTimeout(function() {
        4 > numberOfFrame && (c = 0, r = numberOfFrame);
        numberOfFrame >= 4 && 8 > numberOfFrame && (c = 1, r = numberOfFrame - 4);
        numberOfFrame >= 8 && 12 > numberOfFrame && (c = 2, r = numberOfFrame - 8);
        numberOfFrame >= 12 && 16 > numberOfFrame && (c = 3, r = numberOfFrame - 12);
        numberOfFrame >= 16 && 20 > numberOfFrame && (c = 4, r = numberOfFrame - 16);
        numberOfFrame >= 20 && 24 > numberOfFrame && (c = 5, r = numberOfFrame - 20);
        $con.find('.tit').css({
          'background-position': -r * width + 'px ' + -c * height + 'px'  
        });
        _this.titAm(numberOfFrame + 1, amEndFunc);
      }, 100);
    },
    logosAm: function(number1) {
      if (this.show) {
        var _this = this,
          $homePage = $('.homePage'),
          $logos = $homePage.find('.logos'),
          maxNum = 13,
          number = number1;
        number > maxNum && (number = 1);
        window.setTimeout(function() {
          var dataPre = 'logos-' + number,
            preDataPre = $logos.attr('data-pre');
          preDataPre && $logos.removeClass(preDataPre);
          $logos.attr('data-pre', dataPre).addClass(dataPre);
          _this.logosAm(number + 1);
        }, 150);
      }
    }
  };
  window.infoPage = infoPage;
}();
var hasTouch = 'ontouchstart' in window,
  TAP_EV = 'tap',
  START_EV = hasTouch ? 'touchstart' : 'mousedown',
  MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
  END_EV = hasTouch ? 'touchend' : 'mouseup',
  banTouch = !1;
window.addEventListener('touchmove', banTouchScroll, !1);
function banTouchScroll(event) {
  banTouch || event.preventDefault();
}

$(function() {
  window.setTimeout(function() {
    infoPage.init();
  }, 300);
});