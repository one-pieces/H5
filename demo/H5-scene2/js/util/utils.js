(function(win){
  var Event = {
    touchtype : function(type){
      switch(type){
        case 'start':return client.ifmobile ? "touchstart" : "mousedown";
          break;
        case 'move':return client.ifmobile ? "touchmove" : "mousemove";
          break;
        case 'end':return client.ifmobile ? "touchend" : "mouseup";
          break;
        default:return type;
          break;
      }
    },
    addListener : function (element, type, handler) {
      try{
        if(element){
          this.guid = 1;
          type = this.touchtype(type);
          //为每一个事件处理函数分派一个唯一的ID
          if (!handler.$$guid) handler.$$guid = this.guid++;
          //为元素的事件类型创建一个哈希表
          if (!element.events) element.events = {};
          //为每一个"元素/事件"对创建一个事件处理程序的哈希表
          var handlers = element.events[type];
          if (!handlers) {
            handlers = element.events[type] = {};
            //存储存在的事件处理函数(如果有)
            if (element["on" + type]) {
              handlers[0] = element["on" + type];
            }
          }
          //将事件处理函数存入哈希表
          handlers[handler.$$guid] = handler;
          //指派一个全局的事件处理函数来做所有的工作
          element["on" + type] = function(event){
            var returnValue = true;
            event = event || fixEvent(window.event);
            //取得事件处理函数的哈希表的引用
            var handlers = this.events[event.type];
            //执行每一个处理函数
            for (var i in handlers) {
              this.$$handleEvent = handlers[i];
              if (this.$$handleEvent(event) === false) {
                returnValue = false;
              }
            }
            return returnValue;
          };

          //为IE的事件对象添加一些“缺失的”函数
          function fixEvent(event) {
            event.preventDefault = function() {
              this.returnValue = false;
            };
            event.stopPropagation = function() {
              this.cancelBubble = true;
            };
            return event;
          }
        }

      }catch(e){
        console.log(e,element);
      }
    },

    removeListener : function(element, type, handler) {
      if(element){
        type = this.touchtype(type);
        //从哈希表中删除事件处理函数
        if (element.events && element.events[type]) {
          delete element.events[type][handler.$$guid];
        }
      }
    },

    addEvent:function(elm, evType, fn, check){
      if(elm){
        var callback  = fn;
        evType = this.touchtype(evType);
        if(check){
          Event.addEvent(elm,'start',function(){
            Event.currentTarget = elm;
          });
          callback = function(e){
            if(Event.currentTarget == elm){
              fn.call(this,e);
            }
          }
        }

        if (elm.addEventListener) {
          console.log(evType + 'addEventListener');
          elm.addEventListener(evType, callback, false);//DOM2.0
          return true;
        }else if (elm.attachEvent) {
          console.log(evType + 'addEvent');
          var r = elm.attachEvent('on' + evType, callback);//IE5+
          return r;
        }else {
          console.log(evType + 'on');
          elm['on' + evType] = callback;//DOM 0
        }
      }
    },

    removeEvent : function(elm, evType, fn) {
      if(elm){
        evType = this.touchtype(evType);
        if (elm.removeEventListener) {
          elm.removeEventListener(evType, fn);//DOM2.0
          return true;
        }else if (elm.detachEvent) {
          var r = elm.detachEvent('on' + evType, fn);//IE5+
          return r;
        }else {
          elm['on' + evType] = null;//DOM 0
        }
      }
    },

    stopDefault : function ( e ) {
      if ( e && e.preventDefault )
        e.preventDefault();
      else
        window.event.returnValue = false;
      return false;
    },

    orientationChange : function(){
      switch(window.orientation) {
        case 0:
          utils.closeblock('landscape',1);
          break;
        case -90:
          utils.openblock('landscape',1);
          break;
        case 90:
          utils.openblock('landscape',1);
          break;
        case 180:
          utils.closeblock('landscape',1);
          break;

      }
    },

    currentTarget: null
  };

  win.Event = Event;
})(window);

(function() {
  var browser = {
    ua  : navigator.userAgent,
    init: function () {
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
      this.BS = this.searchBrowser(this.dataBS);
      if (this.OS == 'iPhone' || this.OS == 'iPad' || this.OS == 'Android' || this.OS == 'Winphone' ){
        this.mobile = true;
      }else{
        this.mobile = false;
      }
    },
    searchString: function (data) {
      for (var i=0;i<data.length;i++)	{
        var dataString = this.ua;
        if (dataString) {
          if (dataString.indexOf(data[i].forSearch) != -1)
            return data[i].forShow;
        }
      }
    },
    searchBrowser: function(data){
      var result = '';
      for (var i=0;i<data.length;i++)	{
        var dataString = this.ua;
        if (dataString) {
          if (dataString.indexOf(data[i].forSearch) != -1){
            result += data[i].forShow + '|';
          }
        }
      }
      return result;
    },
    dataOS : [
      {
        forSearch: "iPhone",
        forShow: "iPhone"
      },
      {
        forSearch: "iPad",
        forShow: "iPad"
      },
      {
        forSearch: "Android",
        forShow: "Android"
      },
      {
        forSearch: "Windows Phone",
        forShow: "Winphone"
      }
    ],
    dataBS: [
      {
        forSearch: "360browser",
        forShow: "360"
      },
      {
        forSearch: "Maxthon",
        forShow: "Maxthon"
      },
      {
        forSearch: "UCBrowser",
        forShow: "uc"
      },
      {
        forSearch: "Oupeng",
        forShow: "opera"
      },
      {
        forSearch: "Opera",
        forShow: "opera"
      },
      {
        forSearch: "Sogou",
        forShow: "sogou"
      },
      {
        forSearch: "baidu",
        forShow: "baidu"
      },
      {
        forSearch: "Safari",
        forShow: "safari"
      },
      {
        forSearch: "MicroMessenger",
        forShow: "weixin"
      },
      {
        forSearch: "QQ/",
        forShow: "qq"
      },
      {
        forSearch: "Weibo",
        forShow: "weibo"
      },
      {
        forSearch: "MQBrowser",
        forShow: "360"
      },
      {
        forSearch: "MQQBrowser",
        forShow: "qqbrowser"
      },
      {
        forSearch: "CriOS",
        forShow: "Maxthon"
      }
    ]

  };

  browser.init();
  window.client = { browser : browser.BS, os : browser.OS, ifmobile : browser.mobile};

})();

// 载入器
function wrLoading(objname, filearray, callback, type) {
  this.objname = objname;
  this.filearray = filearray;
  this.callback = callback;
  this.type = type;
  this.init();
  (filearray && filearray.length > 0) ? this.loadNext(): this.onlyShow();
}
wrLoading.prototype = {
  loadList: {},
  loaded: 0,
  retried: 0,
  init: function() {
    this.obj = $(this.objname);
  },
  show: function() {
    this.obj.fadeIn(300);
  },
  hide: function(fn) {
    if (this.type) {
      this.obj.fadeOut(300, function() {
        fn();
      });
    } else {
      fn();
    }
  },
  onlyShow: function() {
    var This = this;
    this.show();
    setTimeout(function() {
      This.hide(This.callback);
    }, 300);
  },
  loadNext: function() {
    if (this.filearray[this.loaded]) {
      var ext = this.checkext(this.filearray[this.loaded]);
      if (ext == 'img') {
        this.getImgNext();
      } else {
        this.getAudioNext();
      }
    }
  },
  MovePoint: function(That) {
    That.loaded++;
    if (That.checkProcess()) {
      return;
    }
    if (!That.type && That.obj.find('.percent').length > 0) {
      this.setPercent(Math.ceil(this.loaded / this.filearray.length * 100));
    }
    That.retried = 0;
    setTimeout(function() {
      That.loadNext();
    }, 1);
  },
  getImgNext: function() {
    var This = this;
    var oImg = new Image();
    oImg.src = This.filearray[This.loaded];
    if (oImg.complete) {
      This.makeloadArr(oImg);
      This.MovePoint(This);
    } else {
      oImg.onload = function() {
        This.makeloadArr(this);
        This.MovePoint(This);
      };
      oImg.onerror = function() {
        This.retried++;
        if (This.retried < 3) {
          This.getImgNext();
        } else {
          This.MovePoint(This);
        }
      };
    }
  },
  getAudioNext: function(){
    var This = this;
    var audio = new Audio();
    audio.src = This.filearray[This.loaded];
    audio.load();
    audio.addEventListener('canplay',function(){
      This.makeloadArr(this);
      This.MovePoint(This);
    });
    audio.addEventListener('error',function(){
      This.getAudioNext();
    });
  },
  makeloadArr: function(obj) {
    this.loadList[this.loaded] = obj;
  },
  checkProcess: function() {
    var This = this;
    if (This.loaded >= This.filearray.length) {
      if (!This.type && This.obj.find('.percent').length > 0) {
        This.setPercent(100);
      }
      setTimeout(function() {
        This.hide(This.callback);
      }, 100);
      This.loaded = 0;
      This.retried = 0;
      return true;
    }
  },
  getLoadArr: function() {
    return this.loadList;
  },
  checkext: function(name) {
    var arrext = name.split('.');
    var tmpext = arrext[arrext.length - 1].toLowerCase();
    if('mp3|wav|wma|ogg'.indexOf(tmpext) > -1) {
      return 'audio';
    }
    if('jpg|gif|bmp|png'.indexOf(tmpext) > -1) {
      return 'img';
    }
  },
  setPercent: function(p) {
    var num = (p + '').split('');
    var css = '';
    $.each(num, function(i) {
      css += '<img src="images/' + num[i] + '.png" class="num">';
    });
    p = p + '%';
    this.obj.find('.meter span').width(p);
    this.obj.find('.num').remove();
    $(css).prependTo(this.obj.find('.percent'));
    this.obj.find('.headimg').css('left', p);
  }
};

(function() {
  function Player(el, auto) {
    this.el = el;
    this.auto = auto;
    this.isPlay = true;
    this.init();
  }
  Player.prototype = {
    init: function() {
      var _this = this,
        attr = {
          loop: false,
          preload: 'auto',
          src: this.el.attr('data-src')
        };
      this._audio = new Audio();
      for (var i in attr) {
        attr.hasOwnProperty(i) && i in this._audio && (this._audio[i] = attr[i]);
      }
      if (this.auto) {
        this._audio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
        }, false);
      }
      this._audio.load();
      this._audio.volume = 0.8;
      this.el.on('click', function() {
        _this.play();
      })
    },
    _play: function() {
      if (!this.isPlay) {
        this._audio.play();
        this.el.addClass('on');
      } else {
        this._audio.pause();
        this.el.removeClass('on');
      }
      this.isPlay = !this.isPlay;
    },
    _getState: function() {
      return this.isPlay;
    },
    _playOn: function() {
      this._audio.play();
      this.el.addClass('on');
      this.isPlay = true;
    },
    _playOff: function() {
      this._audio.pause();
      this.el.removeClass('on');
      this.isPlay = false;
    }
  };
  window.Player = Player;
})();

(function(win) {
  var utils = {
    openBlock: function(id, showbg, notCloseBox) {
      if ($('#' + id).length > 0) {
        var obj = $('#' + id);
        if (showbg) {
          if ($('.bg').length <= 0) {
            $('<div class="bg opacity"></div>').appendTo($('body'));
          }
          var b = $('.bg');
          if (b.css('display') == 'none' || b.css('visibility') == 'hidden') {
            b.addClass('opacity').css('display', 'block');
            setTimeout(function() {
              b.removeClass('opacity');
            }, 100);
          }
        }
        if(!notCloseBox){
          $.each(obj.siblings('.box'),function(){
            var t = $(this);
            if(t.css("display") == "block" && t.css("visibility") == "visible"){
              t.removeClass('animated time02 fadeIn').addClass('animated time02 fadeOut');
              setTimeout(function(){
                if(t.hasClass('fadeInUp')){
                  return false;
                }
                t.hide();
              },550);
            }
          })
        }
        if(id == 'productbox'){
          obj.show();
          return;
        }
        if(obj.css("display") == "none" || obj.css("visibility") == "hidden"){
          obj.show().removeClass('animated time02 fadeOut').addClass('animated time02 fadeIn');
          setTimeout(function(){
            obj.find('.animated').removeClass('no');
          },250)
        }else{
          return false;
        }
      }
    },
    closeBlock: function(id, notCloseBg) {
      if (typeof(id) == 'string') {
        if ($('#' + id).length <= 0) {
          return false;
        }
        var o = $('#' + id);
      } else if (typeof(id) == 'object') {
        var o = id;
      }
      if (o.css('display') == 'block' && o.css('visibility') == 'visible') {
        o.removeClass('animated time02 fadeIn').addClass('animated time02 fadeOut');
        setTimeout(function() {
          o.find('.animated').addClass('no');
        }, 250);
        if($('.bg').length > 0 && ($('.bg').css("display") == "block" && $('.bg').css("visibility") == "visible") && !notCloseBg){
          $('.bg').addClass('opacity');
        }
        setTimeout(function(){
          if(o.hasClass('fadeInUp')){
            return false;
          }
          o.hide();
          if(!notCloseBg) $('.bg').hide();
        },250);
      } else {
        return false;
      }
    }
  };

  win.utils = utils;
})(window);