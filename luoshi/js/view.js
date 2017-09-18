(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory;
  } else {
    // 浏览器全局变量(root 即 window)
    root.View = factory(root);
  }
}(this, function () {
  var View = {};

  //ContentView1
  (function() {
    function ContentView1() {
      this.Container_constructor();
      console.log(queue.getResult('page1_09-background'));

      var moon = new createjs.Bitmap(queue.getResult('page1_06-moon'));
      var moonShadow = new createjs.Shadow('#FCF0BC', 0, 0, 16);
      var background = new createjs.Bitmap(queue.getResult('page1_09-background'));
      var title = new createjs.Bitmap(queue.getResult('page1_01-title'));
      var englishTitle = new createjs.Bitmap(queue.getResult('page1_02-english-title'));
      var guihua = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      var denglong = new createjs.Bitmap(queue.getResult('page1_05-denglong'));
      var cloud1 = new createjs.Bitmap(queue.getResult('page1_06-cloud'));
      var cloud2 = new createjs.Bitmap(queue.getResult('page1_06-cloud'));

      moon.x = 530;
      moon.y = 90;
      cloud1.x = 530;
      cloud1.y = 200;
      cloud2.x = 675;
      cloud2.y = 250;
      title.x = 230;
      title.y = 210;
      englishTitle.x = 180;
      englishTitle.y = 80;
      guihua.x = 0;
      guihua.y = 830;
      moon.shadow = moonShadow;

      var mc = new createjs.MovieClip();
      mc.timeline.addTween(createjs.Tween.get(title));
      mc.timeline.addTween(createjs.Tween.get(englishTitle));
      mc.timeline.addTween(createjs.Tween.get(guihua, {loop: true})
        .to({rotation: -45, x: 0, y: 850}).to({rotation: 0, x: 0, y: 850}));
      mc.timeline.addTween(createjs.Tween.get(cloud2, {loop: true})
        .to({x: 650}).to({x: 710}, 30).to({x: 650}, 30));
      mc.timeline.addTween(createjs.Tween.get(moonShadow, {loop: true})
        .to({offsetX: 0, offsetY: 0, blur: 160}, 60, createjs.Ease.quadInOut)
        .to({offsetX: 0, offsetY: 0, blur: 16}, 60, createjs.Ease.quadInOut));
      mc.timeline.addTween(createjs.Tween.get(moon));
      mc.timeline.addTween(createjs.Tween.get(cloud1, {loop: true})
        .to({x: 520}).to({x: 530}, 30).to({x: 520}, 30));
      mc.timeline.addTween(createjs.Tween.get(background));
      mc.gotoAndPlay('start');

      this.content = mc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView1, createjs.Container);
    View.ContentView1 = createjs.promote(ContentView1, 'Container');
  }());
  return View;
}));
