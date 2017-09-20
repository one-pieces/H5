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
  View.ContentView1 = (function() {
    function ContentView1() {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 兔子
      var tuzi = new createjs.Bitmap(queue.getResult('page1_04-tuzi_03-body'));
      tuzi.setTransform(250, 1005);
      mc.timeline.addTween(createjs.Tween.get(tuzi));
      var ear1 = new createjs.Bitmap(queue.getResult('page1_04-tuzi_01-ear'));
      ear1.setTransform(347, 1030);
      ear1.regX = 50;
      ear1.regY = 30;
      mc.timeline.addTween(createjs.Tween.get(ear1, {loop: true})
        .to({rotation: 5}, 10)
        .to({rotation: 0}, 10)
        .to({rotation: -5}, 10)
        .to({rotation: 0}, 10));
      var ear2 = new createjs.Bitmap(queue.getResult('page1_04-tuzi_02-ear'));
      ear2.setTransform(333, 1065);
      ear2.regX = 50;
      ear2.regY = 30;
      mc.timeline.addTween(createjs.Tween.get(ear2, {loop: true})
        .to({rotation: 5}, 10)
        .to({rotation: 0}, 10)
        .to({rotation: -5}, 10)
        .to({rotation: 0}, 10));

      // 灯笼
      var denglong = new createjs.Bitmap(queue.getResult('page1_05-denglong'));
      denglong.setTransform(590, 790);
      var denglongShadow = new createjs.Shadow('#ffd742', 0, 0, 40);
      denglong.shadow = denglongShadow;
      mc.timeline.addTween(createjs.Tween.get(denglongShadow, {loop: true})
        .to({offsetX: 0, offsetY: 0, blur: 30})
        .to({offsetX: 0, offsetY: 0, blur: 160}, 40)
        .to({offsetX: 0, offsetY: 0, blur: 30}, 40));
      mc.timeline.addTween(createjs.Tween.get(denglong));

      // 屋顶
      var wuding = new createjs.Bitmap(queue.getResult('page1_10-wuding'));
      wuding.setTransform(610, 755);
      mc.timeline.addTween(createjs.Tween.get(wuding));

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
      title.setTransform(270, 210);
      mc.timeline.addTween(createjs.Tween.get(title));

      // 英文标题
      var englishTitle = new createjs.Bitmap(queue.getResult('page1_02-english-title'));
      englishTitle.setTransform(180, 80);
      mc.timeline.addTween(createjs.Tween.get(englishTitle));

      // 桂花
      var guihua = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua.setTransform(-20, 1090);
      guihua.regX = 0;
      guihua.regY = 190;
      mc.timeline.addTween(createjs.Tween.get(guihua, {loop: true})
        .to({rotation: 8})
        .to({rotation: 10}, 40)
        .to({rotation: 8}, 40, createjs.Ease.quadInOut)
        .to({rotation: 6}, 40)
        .to({rotation: 8}, 40, createjs.Ease.quadInOut));
      var guihua1 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua1.setTransform(10, 1070);
      guihua1.regX = 0;
      guihua1.regY = 190;
      mc.timeline.addTween(createjs.Tween.get(guihua1, {loop: true})
        .to({rotation: -10})
        .to({rotation: -13}, 40)
        .to({rotation: -10}, 40, createjs.Ease.quadInOut)
        .to({rotation: -8}, 40)
        .to({rotation: -10}, 40, createjs.Ease.quadInOut));
      // var guihua2 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      // guihua2.setTransform(-30, 1080);
      // guihua2.regX = 0;
      // guihua2.regY = 190;
      // mc.timeline.addTween(createjs.Tween.get(guihua2, {loop: true})
      //   .to({rotation: 15})
      //   .to({rotation: 18}, 40)
      //   .to({rotation: 15}, 40, createjs.Ease.quadInOut)
      //   .to({rotation: 13}, 40)
      //   .to({rotation: 15}, 40, createjs.Ease.quadInOut));
      // var guihua3 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      // guihua3.setTransform(-50, 1050);
      // guihua3.regX = 0;
      // guihua3.regY = 190;
      // mc.timeline.addTween(createjs.Tween.get(guihua3, {loop: true})
      //   .to({rotation: 40})
      //   .to({rotation: 42}, 40)
      //   .to({rotation: 40}, 40, createjs.Ease.quadInOut)
      //   .to({rotation: 38}, 40)
      //   .to({rotation: 40}, 40, createjs.Ease.quadInOut));
      var guihua4 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua4.setTransform(5, 1040);
      guihua4.regX = 0;
      guihua4.regY = 190;
      mc.timeline.addTween(createjs.Tween.get(guihua4, {loop: true})
        .to({rotation: -5})
        .to({rotation: -7}, 40)
        .to({rotation: -5}, 40, createjs.Ease.quadInOut)
        .to({rotation: -3}, 40)
        .to({rotation: -5}, 40, createjs.Ease.quadInOut));
      var guihua5 = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua5.setTransform(-10, 1020);
      guihua5.regX = 0;
      guihua5.regY = 190;
      mc.timeline.addTween(createjs.Tween.get(guihua5, {loop: true})
        .to({rotation: -15})
        .to({rotation: -17}, 40)
        .to({rotation: -15}, 40, createjs.Ease.quadInOut)
        .to({rotation: -13}, 40)
        .to({rotation: -15}, 40, createjs.Ease.quadInOut));

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
      mc.timeline.addTween(createjs.Tween.get(stars, {loop: true}).to({alpha: 0.2}, 20).to({alpha: 1}, 20));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page1_09-background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      mc.gotoAndPlay('start');

      this.content = mc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView1, createjs.Container);
    return createjs.promote(ContentView1, 'Container');
  }());

  //ContentView2
  View.ContentView2 = (function() {
    function ContentView2() {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 花瓣
      // [
      //   ['page2_14-petal', 2250, 1050],
      //   ['page2_15-petal', 2150, 930],
      //   ['page2_16-petal', 1920, 887],
      //   ['page2_17-petal', 1800, 810],
      //   ['page2_18-petal', 1740, 728],
      //   ['page2_19-petal', 1640, 668]
      // ].forEach(function(item) {
      //   var kongmingdeng = new createjs.Bitmap(queue.getResult(item[0]));
      //   kongmingdeng.setTransform(item[1], item[2]);
      //   if (item[3]) {
      //     kongmingdeng.scaleX = item[3];
      //     kongmingdeng.scaleY = item[3];
      //   }
      //   mc.timeline.addTween(createjs.Tween.get(kongmingdeng));
      // });

      // 孔明灯
      [
        ['page2_05-kongmingdeng', 2250, 250],
        ['page2_05-kongmingdeng', 250, 230, 0.6],
        ['page2_06-kongmingdeng', 1520, 187, 0.4],
        ['page2_07-kongmingdeng', 2200, 110],
        ['page2_08-kongmingdeng', 2040, 128],
        ['page2_09-kongmingdeng', 340, 168]
      ].forEach(function(item) {
        var kongmingdeng = new createjs.Bitmap(queue.getResult(item[0]));
        kongmingdeng.setTransform(item[1], item[2]);
        if (item[3]) {
          kongmingdeng.scaleX = item[3];
          kongmingdeng.scaleY = item[3];
        }
        mc.timeline.addTween(createjs.Tween.get(kongmingdeng));
      });

      // 灯
      [[700, 590], [820, 787], [1500, 610], [1640, 768]].forEach(function(item) {
        var deng = new createjs.Bitmap(queue.getResult('page2_02-deng'));
        deng.setTransform(item[0], item[1]);
        var dengShadow = new createjs.Shadow('#FCF0BC', 0, 0, 16);
        deng.shadow = dengShadow;
        mc.timeline.addTween(createjs.Tween.get(dengShadow, {loop: true})
          .to({offsetX: 0, offsetY: 0, blur: 100}, 90, createjs.Ease.quadInOut)
          .to({offsetX: 0, offsetY: 0, blur: 16}, 90, createjs.Ease.quadInOut));
        mc.timeline.addTween(createjs.Tween.get(deng));
      });

      // 星星
      var stars = new createjs.Bitmap(queue.getResult('page2_10-stars'));
      mc.timeline.addTween(createjs.Tween.get(stars, {loop: true}).to({alpha: 0.2}, 20).to({alpha: 1}, 20));

      // 荷花
      var hehua = new createjs.Bitmap(queue.getResult('page2_03-hehua'));
      hehua.setTransform(420, 1147);
      hehua.scaleX = 1.5;
      hehua.scaleY = 1.5;
      mc.timeline.addTween(createjs.Tween.get(hehua, {loop: true})
        .to({y: 1140}, 30).to({y: 1147}, 30));
      var hehua1 = new createjs.Bitmap(queue.getResult('page2_03-hehua'));
      hehua1.setTransform(1720, 947);
      hehua1.scaleX = 0.9;
      hehua1.scaleY = 0.9;
      mc.timeline.addTween(createjs.Tween.get(hehua1, {loop: true})
        .to({y: 940}, 30).to({y: 947}, 30).wait(5));

      // 莲花
      var lianhua = new createjs.Bitmap(queue.getResult('page2_04-lianhua'));
      lianhua.setTransform(920, 1047);
      lianhua.scaleX = 0.8;
      lianhua.scaleY = 0.8;
      mc.timeline.addTween(createjs.Tween.get(lianhua, {loop: true})
        .to({y: 1040}, 30).to({y: 1047}, 30));
      var lianhua1 = new createjs.Bitmap(queue.getResult('page2_04-lianhua'));
      lianhua1.setTransform(1520, 927);
      lianhua1.scaleX = 0.5;
      lianhua1.scaleY = 0.5;
      mc.timeline.addTween(createjs.Tween.get(lianhua1, {loop: true})
        .to({x: 1518, y: 920}, 30).to({x: 1520, y: 927}, 30));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page2_00-background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      mc.gotoAndPlay('start');

      var cmc = new createjs.MovieClip();

      // 文字
      var wenzi1 = new createjs.Bitmap(queue.getResult('page2_20-wenzi1'));
      wenzi1.setTransform(200, 200);
      var wenzi2 = new createjs.Bitmap(queue.getResult('page2_21-wenzi2'));
      wenzi2.setTransform(250, 200);
      wenzi2.alpha = 0;
      var wenzi3 = new createjs.Bitmap(queue.getResult('page2_22-wenzi3'));
      wenzi3.setTransform(330, 200);
      wenzi3.alpha = 0;
      cmc.timeline.addTween(createjs.Tween.get(wenzi1).to({alpha: 0}, 60));
      cmc.timeline.addTween(createjs.Tween.get(wenzi2).wait(60).to({alpha: 1}, 60).to({alpha: 0}, 60));
      cmc.timeline.addTween(createjs.Tween.get(wenzi3).wait(180).to({alpha: 1}, 60).to({alpha: 0}, 60));

      var content = new createjs.Container();
      content.addChild(mc);
      cmc.timeline.addTween(createjs.Tween.get(content)
        .to({x: -100})
        .to({x: -1900}, 300, createjs.Ease.sineInOut).wait(20)
        .to({x: -980}, 150, createjs.Ease.sineInOut).wait(50)
        // .to({x: -1900}, 300, createjs.Ease.sineIn).wait(20)
        // .to({x: -980}, 150, createjs.Ease.sineIn).wait(20)
        .to({regX: 1375, regY: 0, scaleX: 5, scaleY: 5, alpha: 0}, 60)
        .call(function() {
          console.log('aaaaa');
        }));

      cmc.gotoAndPlay('start');

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView2, createjs.Container);
    return createjs.promote(ContentView2, 'Container');
  }());
  return View;
}));
