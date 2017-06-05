function playMp3(url, times) {
  var loop = times;
  var ado = window.ado || document.createElement('AUDIO');
  ado.setAttribute('preload', '');
  ado.setAttribute('src', url);
  var findSource = setInterval(function() {
    if (!isNaN(ado.duration)) {
      ado.play();
      ado.addEventListener('ended', function() {
        if (loop > 1) {
          ado.play();
          --loop;
        }
      }, false);
      clearInterval(findSource);
    }
  }, 500);
  
  window.ado = ado;
}

function openModal(contentUrl, hideBtn, btnUrl) {
  $('<div class="modal-backdrop"></div>').appendTo($('body'));
  $('.modal').show().on('touchend', function(e) {
    $('.modal').hide();
    $('.modal-backdrop').hide();
  });
  $('.cluePicture').css({
    'background': 'url('+ contentUrl +') no-repeat',
    'background-size': 'contain'
  });
  if (hideBtn) {
    $('.clueTip').hide();
  } else {
    var clueTipUrl = btnUrl || '../canon/images/findclues/btn_continue.png';
    $('.clueTip').css({
      'background': 'url('+ clueTipUrl +') no-repeat',
      'background-size': 'contain'
    });
  }
}

function changeStage(from, to) {
  $(from).hide();
  $(to).show();
}

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
    onInit: function(swiper) {
      swiperAnimateCache(swiper);
      swiperAnimate(swiper);
    },
    onSlideChangeEnd: function(swiper) {
      swiperAnimate(swiper);
    },
    onSlideChangeStart: function(swiper) {
      if (swiper.activeIndex == 3) { createSwiper2(); }
    }
  });

  function createSwiper2() {
    var swiper2 = new Swiper('.swiper-container2', {
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

    var startY;
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
            swiper2.slideNext(500);
          }
        } else {
          if (HTMLS.length > 0) {
            swiper2.appendSlide(HTMLS.pop()); // 加到Swiper的最后
            swiper2.slideNext(500);
          }
        }
      })
    }, 6000);
  }
  window.swiper = swiper;
})();

(function() {
  var swipAnimate = new Animate();
  swipAnimate.initSwipe();
})();

/* 开门 */
(function() {
  $('#door').on('touchstart', function() {
    $('.bgC032').show();
    // 开门播放声音
    playMp3('../canon/audio/opendoor.wav', 1);
    setTimeout(function() {
      $('.bgC032').addClass('effect-out').css({
        'animation-duration': '3s',
        '-webkit-animation-duration': '3s'
      });
      $('#door').addClass('effect-out').css({
        'animation-duration': '3s',
        '-webkit-animation-duration': '3s'
      }).on('webkitAnimationEnd', function() {
        changeStage('#opendoor', '#findclues');
        // 搜索线索背景音乐
        $('.audio').show().on('touchend', function() {
          if (window.ado.paused) {
            window.ado.play();
            $('.audio').removeClass('audio-off').addClass('audio-on');
          } else {
            window.ado.pause();
            $('.audio').removeClass('audio-on').addClass('audio-off');
          }
        });
        playMp3('../canon/audio/clues/1-16.mp3', 1);
      });
    }, 1500);
  });
})();

/* 线索查找场景 */
(function() {
  var gridIndex = 1;
  var rightClueId = ['arrow1', 'arrow2', 'arrow3'];
  $('#wrap .arrow').on('touchend', function(e) {
    var target = e.target;
    var clueGrids = {
      arrow1: '../canon/images/findclues/mark_fingerprint.png',
      arrow2: '../canon/images/findclues/mark_contract.png',
      arrow3: '../canon/images/findclues/mark_printer.png'
    };
    var cluePictures = {
      arrow1: '../canon/images/findclues/correct_fingerprint.png',
      arrow2: '../canon/images/findclues/correct_contract.png',
      arrow3: '../canon/images/findclues/correct_printer.png',
      arrow4: '../canon/images/findclues/wrong_computer.png',
      arrow5: '../canon/images/findclues/wrong_drawer.png',
      arrow6: '../canon/images/findclues/wrong_phone.png',
      finalclues: '../canon/images/findclues/finalclues.png'
    };
    openModal(cluePictures[target.id]);

    var index = rightClueId.indexOf(target.id);
    if (index > -1) {
      rightClueId.splice(index, 1);
      $('#grid' + gridIndex++).css({
        'background': 'url('+ clueGrids[target.id] +')'
      });
    }

    if (gridIndex > 3) {
      $('.modal').off('touchend');
      $('.clueTip').hide();
      setTimeout(function() {
        $('.cluePicture').css({
          '-webkit-animation': 'fadeIn 1s',
          'animation': 'fadeIn 1s',
          'background': 'url(' + cluePictures.finalclues + ') no-repeat',
          'background-size': 'contain'
        });
        $('.clueTip').show().css({
          '-webkit-animation': 'fadeIn 1s',
          'animation': 'fadeIn 1s',
          'background': 'url("../canon/images/findclues/btn_findclues.png") no-repeat',
          'background-size': 'contain'
        }).on('touchend', function(e) {
          $('.modal').hide();
          $('.modal-backdrop').hide();
          $('#wrap .arrow').hide();
          
          $('.findclues').show().on('touchend', function() {
            changeStage('#findclues', '#finalclues');
          });
        });
      }, 1000);
    }
  });
})();

/* 最终线索场景 */
(function() {
  $('.bb52').on('webkitAnimationEnd', function(e) {
    $('#arrow7').show();
    $('#finalclues').on('touchend', function() {
      changeStage('#finalclues', '#scancode');
    });
  });
})();

/* 二维码扫码场景 */
(function() {
  $('.bg534').on('webkitAnimationEnd', function() {
    $('#scancode .scrolltop').show();
    $('#noSwiping').removeClass('swiper-no-swiping');
  });
})();

/* 选择答案场景 */
(function() {
  $('#choice1').on('touchend', function() {
    openModal('../canon/images/truthchoice/answer_1.png', false, '../canon/images/truthchoice/btn_answer.png');
  });
  $('#choice2').on('touchend', function() {
    openModal('../canon/images/truthchoice/answer_2.png', false, '../canon/images/truthchoice/btn_answer.png');
  });
  $('#choice3').on('touchend', function() {
    changeStage('#truthchoice', '#truthrestore');
    // 真相还原背景音乐
    playMp3('../canon/audio/truth/tw025.mp3', 1);
  });
})();

/* 真相还原场景 */
(function() {
  $('.bgC083').on('webkitAnimationEnd', function() {
    $('#scrolling .scrolltop').show();
  });
})();