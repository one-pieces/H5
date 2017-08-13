(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory;
  } else {
    // 浏览器全局变量(root 即 window)
    root.resLoader = factory(root);
  }
}(this, function () {
  var isFunc = function (f) {
    return typeof f === 'function';
  }
  // 构造器函数
  function ResLoader(config) {
    this.option = {
      resourceType: 'image', // 资源类型，默认为图片
      baseUrl: './', // 基准url
      resources: [], // 资源路径数组
      onStart: null, // 加载开始回调函数，传入参数total
      onProgress: null, // 正在加载回调函数，传入参数currentIndex, total
      onComplete: null // 加载完毕回调函数，传入参数total
    }
    if (config) {
      for (var i in config) {
        this.option[i] = config[i];
      }
    } else {
      alert('参数错误！');
      return;
    }
    this.status = 0; // 加载器的状态，0：未启动   1：正在加载   2：加载完毕
    this.total = this.option.resources.length || 0; // 资源总数
    this.currentIndex = 0;
  }

  ResLoader.prototype.start = function () {
    this.status = 1;
    var _this = this;
    var baseUrl = this.option.baseUrl;
    for (var i = 0, l = this.option.resources.length; i < l; i++) {
      var media, r = this.option.resources[i];
      var isImage = ['.png', '.jpg', '.gif'].some(function(type) {
        return r.indexOf(type) > -1;
      });

      if (isImage) {
        media = new Image();
      } else {
        var results = r.split('#');
        r = results[0];
        media = document.createElement('VIDEO');
        media.id = results[1];
        $('body').append(media);
      }

      var url = r.indexOf('http://') === 0 || r.indexOf('https://') === 0 ? r : baseUrl + r;
      console.log('media', media, isImage);
      media[isImage? 'onload' : 'onloadeddata'] = function() {
        console.log('medialoaded', this);
        _this.loaded();
      };
      media.onerror = function() {
        _this.loaded();
      };
      media.src = url;
    }
    if (isFunc(this.option.onStart)) {
      this.option.onStart(this.total);
    }
  }

  ResLoader.prototype.loaded = function () {
    this.currentIndex++;

    if (isFunc(this.option.onProgress)) {
      this.option.onProgress(this.currentIndex, this.total);
    }
    // 加载完毕
    if (this.currentIndex === this.total) {
      if (isFunc(this.option.onComplete)) {
        this.option.onComplete(this.total);
      }
    }
  }

  // 暴露公共方法
  return ResLoader;
}))