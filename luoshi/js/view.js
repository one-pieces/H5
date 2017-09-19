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

      var mc = new createjs.MovieClip();

      var denglong = new createjs.Bitmap(queue.getResult('page1_05-denglong'));
      denglong.setTransform(590, 790);
      var denglongShadow = new createjs.Shadow('#ffd742', 0, 0, 40);
      denglong.shadow = denglongShadow;
      mc.timeline.addTween(createjs.Tween.get(denglongShadow, {loop: true})
        .to({offsetX: 0, offsetY: 0, blur: 40})
        .to({offsetX: 0, offsetY: 0, blur: 100}, 60)
        .to({offsetX: 0, offsetY: 0, blur: 40}, 60));
      mc.timeline.addTween(createjs.Tween.get(denglong));

      // 孔明灯
      var kongmingdeng1_0 = new createjs.Bitmap(queue.getResult('page1_08-kongmingdeng_01'));
      kongmingdeng1_0.setTransform(560, 340);
      mc.timeline.addTween(createjs.Tween.get(kongmingdeng1_0, {loop: true})
        .to({y: 350}, 60).to({y: 340}, 60).wait(1000));
      var kongmingdeng1_1 = new createjs.Bitmap(queue.getResult('page1_08-kongmingdeng_01'));
      kongmingdeng1_1.setTransform(620, 450);
      mc.timeline.addTween(createjs.Tween.get(kongmingdeng1_1, {loop: true})
        .to({y: 450, scaleX: 0.8, scaleY: 0.8})
        .to({y: 442, scaleX: 0.8, scaleY: 0.8}, 60)
        .to({y: 450, scaleX: 0.8, scaleY: 0.8}, 60));
      var kongmingdeng2 = new createjs.Bitmap(queue.getResult('page1_08-kongmingdeng_02'));
      kongmingdeng2.setTransform(70, 400);
      mc.timeline.addTween(createjs.Tween.get(kongmingdeng2, {loop: true})
        .to({y: 410}, 60).to({y: 400}, 60));
      var kongmingdeng3 = new createjs.Bitmap(queue.getResult('page1_08-kongmingdeng_03'));
      kongmingdeng3.setTransform(140, 470);
      mc.timeline.addTween(createjs.Tween.get(kongmingdeng3, {loop: true})
        .to({y: 463}, 90).to({y: 470}, 90));
      var kongmingdeng4 = new createjs.Bitmap(queue.getResult('page1_08-kongmingdeng_04'));
      kongmingdeng4.setTransform(50, 530);
      mc.timeline.addTween(createjs.Tween.get(kongmingdeng4, {loop: true})
        .to({y: 534}, 90).to({y: 530}, 90));

      // 标题
      var title = new createjs.Bitmap(queue.getResult('page1_01-title'));
      title.setTransform(230, 210);
      mc.timeline.addTween(createjs.Tween.get(title));

      // 英文标题
      var englishTitle = new createjs.Bitmap(queue.getResult('page1_02-english-title'));
      englishTitle.setTransform(180, 80);
      mc.timeline.addTween(createjs.Tween.get(englishTitle));

      // 桂花
      var guihua = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua.setTransform(-20, 1050);
      mc.timeline.addTween(createjs.Tween.get(guihua, {loop: true})
        .to({rotation: 8, regX: 0, regY: 190})
        .to({rotation: 10, regX: 0, regY: 190}, 40)
        .to({rotation: 8, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut)
        .to({rotation: 6, regX: 0, regY: 190}, 40)
        .to({rotation: 8, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut));
      var guihua3 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua3.setTransform(10, 1030);
      mc.timeline.addTween(createjs.Tween.get(guihua3, {loop: true})
        .to({rotation: -10, regX: 0, regY: 190})
        .to({rotation: -13, regX: 0, regY: 190}, 40)
        .to({rotation: -10, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut)
        .to({rotation: -8, regX: 0, regY: 190}, 40)
        .to({rotation: -10, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut));
      var guihua1 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua1.setTransform(-30, 1080);
      mc.timeline.addTween(createjs.Tween.get(guihua1, {loop: true})
        .to({rotation: 15, regX: 0, regY: 190})
        .to({rotation: 18, regX: 0, regY: 190}, 40)
        .to({rotation: 15, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut)
        .to({rotation: 13, regX: 0, regY: 190}, 40)
        .to({rotation: 15, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut));
      var guihua2 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua2.setTransform(-50, 1050);
      mc.timeline.addTween(createjs.Tween.get(guihua2, {loop: true})
        .to({rotation: 40, regX: 0, regY: 190})
        .to({rotation: 42, regX: 0, regY: 190}, 40)
        .to({rotation: 40, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut)
        .to({rotation: 38, regX: 0, regY: 190}, 40)
        .to({rotation: 40, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut));
      var guihua4 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua4.setTransform(5, 1000);
      mc.timeline.addTween(createjs.Tween.get(guihua4, {loop: true})
        .to({rotation: -5, regX: 0, regY: 190})
        .to({rotation: -7, regX: 0, regY: 190}, 40)
        .to({rotation: -5, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut)
        .to({rotation: -3, regX: 0, regY: 190}, 40)
        .to({rotation: -5, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut));
      var guihua5 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua5.setTransform(-10, 980);
      mc.timeline.addTween(createjs.Tween.get(guihua5, {loop: true})
        .to({rotation: -15, regX: 0, regY: 190})
        .to({rotation: -17, regX: 0, regY: 190}, 40)
        .to({rotation: -15, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut)
        .to({rotation: -13, regX: 0, regY: 190}, 40)
        .to({rotation: -15, regX: 0, regY: 190}, 40, createjs.Ease.quadInOut));

      // 云2
      var cloud2 = new createjs.Bitmap(queue.getResult('page1_06-cloud'));
      cloud2.setTransform(665, 250);
      mc.timeline.addTween(createjs.Tween.get(cloud2, {loop: true})
        .to({x: 665}).to({x: 690}, 90).to({x: 665}, 90));

      // 月亮
      var moon = new createjs.Bitmap(queue.getResult('page1_06-moon'));
      moon.setTransform(530, 90);
      var moonShadow = new createjs.Shadow('#FCF0BC', 0, 0, 16);
      moon.shadow = moonShadow;
      mc.timeline.addTween(createjs.Tween.get(moonShadow, {loop: true})
        .to({offsetX: 0, offsetY: 0, blur: 100}, 90, createjs.Ease.quadInOut)
        .to({offsetX: 0, offsetY: 0, blur: 16}, 90, createjs.Ease.quadInOut));
      mc.timeline.addTween(createjs.Tween.get(moon));

      // 云1
      var cloud1 = new createjs.Bitmap(queue.getResult('page1_06-cloud'));
      cloud1.setTransform(530, 220);
      mc.timeline.addTween(createjs.Tween.get(cloud1, {loop: true})
        .to({x: 530}).to({x: 540}, 90).to({x: 530}, 90));

      // 星星
      var stars = new createjs.Bitmap(queue.getResult('page1_07-stars'));
      mc.timeline.addTween(createjs.Tween.get(stars));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page1_09-background'));
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
