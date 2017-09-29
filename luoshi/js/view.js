(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['weixin'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory;
  } else {
    // 浏览器全局变量(root 即 window)
    root.View = factory(root);
  }
}(this, function (wx) {
  var View = {};

  //ContentView1
  View.ContentView1 = (function() {
    function ContentView1(callback) {
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

      var cmc = new createjs.MovieClip();
      var content = new createjs.Container();
      content.addChild(mc);

      cmc.timeline.addTween(createjs.Tween.get(content)
        .wait(60)
        .to({alpha: 0.5}, 30)
        .call(complete).wait(1));

      function complete() {
        console.log('container1 complete');
        callback && callback();
      }

      cmc.gotoAndPlay('start');

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView1, createjs.Container);
    return createjs.promote(ContentView1, 'Container');
  }());

  //ContentView2
  View.ContentView2 = (function() {
    function ContentView2(callback) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

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
      wenzi1.setTransform(140, 60);
      wenzi1.scaleX = 1.5;
      wenzi1.scaleY = 1.5;
      wenzi1.alpha = 0;
      var wenzi2 = new createjs.Bitmap(queue.getResult('page2_21-wenzi2'));
      wenzi2.setTransform(350, 200);
      wenzi2.scaleX = 1.5;
      wenzi2.scaleY = 1.5;
      wenzi2.alpha = 0;
      cmc.timeline.addTween(createjs.Tween.get(wenzi1).to({alpha: 1}, 70).wait(90).to({alpha: 0}, 10));
      cmc.timeline.addTween(createjs.Tween.get(wenzi2).wait(70).to({alpha: 1}, 70).wait(20).to({alpha: 0}, 10));

      var content = new createjs.Container();
      content.addChild(mc);
      var helf = content.getBounds().width/2;
      content.x = helf - 900;
      content.y = 0;
      content.regX = helf;
      content.regY = 0;
      content.alpha = 0.3;
      cmc.timeline.addTween(createjs.Tween.get(content)
        .to({alpha: 1}, 30)
        .wait(170)
        // .to({x: -helf + 1650}, 250, createjs.Ease.sineInOut).wait(5)
        .to({x: 400, scaleX: 7, scaleY: 7, alpha: 0.8}, 30, createjs.Ease.circIn)
        .call(complete).wait(100));

      function complete() {
        console.log('container2 complete');
        callback && callback();
      }

      cmc.gotoAndPlay('start');

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView2, createjs.Container);
    return createjs.promote(ContentView2, 'Container');
  }());

  //ContentView3
  View.ContentView3 = (function() {
    function ContentView3(callback) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 照片
      var picture = new createjs.Bitmap(queue.getResult('page3_01-picture'));
      picture.setTransform(0, 250);
      mc.timeline.addTween(createjs.Tween.get(picture));

      // 文字
      var wenzi1 = new createjs.Text('来自罗氏制药总经理', '30px Arial', '#ffffff');
      wenzi1.setTransform(235, 45);
      mc.timeline.addTween(createjs.Tween.get(wenzi1));
      var wenzi2 = new createjs.Text('周虹的祝福', '40px Arial', '#ffffff');
      wenzi2.setTransform(270, 85);
      mc.timeline.addTween(createjs.Tween.get(wenzi2));

      [
        {
          text: '日复一日，我们怀揣梦想',
          position: [210, 900],
          startWait: 10
        },
        {
          text: '在“先患者之需而行”的道路上勇敢前行',
          position: [130, 950],
          startWait: 50
        },
        {
          text: '而“家”是港湾，始终给我们温暖和力量',
          position: [130, 1000],
          startWait: 90
        },
        {
          text: '中秋将至',
          position: [310, 1050],
          startWait: 130
        },
        {
          text: '周虹总经理恭祝',
          position: [225, 1100],
          startWait: 170
        },
        {
          text: '中秋快乐，阖家幸福！',
          position: [235, 1150],
          startWait: 210,
          endWait: 110
        }
      ].forEach(function(item) {
        var wenziItem = new createjs.Text(item.text, '30px Arial', '#ffffff');
        wenziItem.setTransform(item.position[0], item.position[1]);
        wenziItem.alpha = 0;
        mc.timeline.addTween(createjs.Tween.get(wenziItem)
          .wait(item.startWait).to({alpha: 1}, 40).wait(item.endWait));
      });

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page3_02-background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      var content = new createjs.Container();
      content.addChild(mc);
      var helf = content.getBounds().width/2;
      var cmc = new createjs.MovieClip();
      content.alpha = 0;
      content.x = helf;
      content.y = 0;
      content.regX = helf;
      content.regY = 0;
      cmc.timeline.addTween(createjs.Tween.get(content)
        .to({alpha: 1}, 30)
        .wait(320)
        .to({alpha: 0.5}, 10)
        .call(complete).wait(1));

      function complete() {
        console.log('container3 complete');
        callback && callback();
      }

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView3, createjs.Container);
    return createjs.promote(ContentView3, 'Container');
  }());

  //ContentView4
  View.ContentView4 = (function() {
    function ContentView4(callback) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // // 照片
      // var picture = new createjs.Bitmap(queue.getResult('page3_01-picture'));
      // picture.setTransform(0, 250);
      // mc.timeline.addTween(createjs.Tween.get(picture));

      // 烟花
      var yanhua1 = new createjs.Bitmap(queue.getResult('page4_03-yanhua'));
      yanhua1.setTransform(350, 180);
      mc.timeline.addTween(createjs.Tween.get(yanhua1));
      var yanhua2 = new createjs.Bitmap(queue.getResult('page4_04-yanhua'));
      yanhua2.setTransform(480, 280);
      mc.timeline.addTween(createjs.Tween.get(yanhua2));
      var yanhua3 = new createjs.Bitmap(queue.getResult('page4_03-yanhua'));
      yanhua3.setTransform(250, 340);
      yanhua3.scaleX = 0.5;
      yanhua3.scaleY = 0.5;
      mc.timeline.addTween(createjs.Tween.get(yanhua3));
      var yanhua4 = new createjs.Bitmap(queue.getResult('page4_04-yanhua'));
      yanhua4.setTransform(300, 380);
      yanhua4.scaleX = 0.5;
      yanhua4.scaleY = 0.5;
      mc.timeline.addTween(createjs.Tween.get(yanhua4));

      // 孔明灯
      [
        ['page2_05-kongmingdeng', 150, 280, 0.8],
        ['page2_05-kongmingdeng', 550, 400, 0.4],
        ['page2_06-kongmingdeng', 520, 357, 0.25],
        ['page2_07-kongmingdeng', 180, 60, 0.8],
        ['page2_08-kongmingdeng', 240, 138],
        ['page2_09-kongmingdeng', 140, 168, 0.6]
      ].forEach(function(item) {
        var kongmingdeng = new createjs.Bitmap(queue.getResult(item[0]));
        kongmingdeng.setTransform(item[1], item[2]);
        if (item[3]) {
          kongmingdeng.scaleX = item[3];
          kongmingdeng.scaleY = item[3];
        }
        mc.timeline.addTween(createjs.Tween.get(kongmingdeng));
      });

      // 云2
      var cloud2 = new createjs.Bitmap(queue.getResult('page1_06-cloud'));
      cloud2.setTransform(715, 100);
      mc.timeline.addTween(createjs.Tween.get(cloud2, {loop: true})
        .to({x: 715}).to({x: 740}, 90).to({x: 715}, 90));

      // 月亮
      var moon = new createjs.Bitmap(queue.getResult('page1_06-moon'));
      moon.setTransform(580, -60);
      var moonShadow = new createjs.Shadow('#FCF0BC', 0, 0, 16);
      moon.shadow = moonShadow;
      mc.timeline.addTween(createjs.Tween.get(moonShadow, {loop: true})
        .to({offsetX: 0, offsetY: 0, blur: 100}, 90, createjs.Ease.quadInOut)
        .to({offsetX: 0, offsetY: 0, blur: 16}, 90, createjs.Ease.quadInOut));
      mc.timeline.addTween(createjs.Tween.get(moon));

      // 云1
      var cloud1 = new createjs.Bitmap(queue.getResult('page1_06-cloud'));
      cloud1.setTransform(580, 70);
      mc.timeline.addTween(createjs.Tween.get(cloud1, {loop: true})
        .to({x: 580}).to({x: 590}, 90).to({x: 580}, 90));

      // 桂花
      var guihua = new createjs.Bitmap(queue.getResult('page1_03-guihua'));
      guihua.setTransform(-40, 690);
      guihua.regX = 0;
      guihua.regY = 190;
      mc.timeline.addTween(createjs.Tween.get(guihua, {loop: true})
        .to({rotation: 0})
        .to({rotation: 2}, 40)
        .to({rotation: 0}, 40, createjs.Ease.quadInOut)
        .to({rotation: -2}, 40)
        .to({rotation: 0}, 40, createjs.Ease.quadInOut));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page4_10-background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      var content = new createjs.Container();
      content.addChild(mc);
      var scale = 3.5;
      content.scaleX = scale;
      content.scaleY = scale;
      content.alpha = 0;
      // 750px 标准屏幕宽度
      content.x = 750;
      content.y = 0;
      content.regX = 750;
      content.regY = 0;
      var cmc = new createjs.MovieClip();
      cmc.timeline.addTween(createjs.Tween.get(content)
        // .to({alpha: 1}, 30)
        .to({alpha: 1, scaleX: 1, scaleY: 1}, 30, createjs.Ease.circOut)
        .wait(60)
        .set({x: 348, y: 660, regX: 348, regY: 660})
        .to({scaleX: 20, scaleY: 20, alpha: 0.6}, 30, createjs.Ease.circIn)
        .call(complete).wait(1));

      function complete() {
        console.log('container4 complete');
        callback && callback();
      }

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView4, createjs.Container);
    return createjs.promote(ContentView4, 'Container');
  }());

  //ContentView5
  View.ContentView5 = (function() {
    function ContentView5(callback) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 月亮
      var moon = new createjs.Bitmap(queue.getResult('page1_06-moon'));
      moon.setTransform(580, -60);
      var moonShadow = new createjs.Shadow('#FCF0BC', 0, 0, 16);
      moon.shadow = moonShadow;
      mc.timeline.addTween(createjs.Tween.get(moonShadow, {loop: true})
        .to({offsetX: 0, offsetY: 0, blur: 100}, 90, createjs.Ease.quadInOut)
        .to({offsetX: 0, offsetY: 0, blur: 16}, 90, createjs.Ease.quadInOut));
      mc.timeline.addTween(createjs.Tween.get(moon));

      // 孔明灯
      [
        ['page2_05-kongmingdeng', 370, 630],
        ['page2_06-kongmingdeng', 340, 287, 0.4],
        ['page2_07-kongmingdeng', 380, 380, 0.8],
        ['page2_08-kongmingdeng', 440, 528],
        ['page2_09-kongmingdeng', 340, 468, 0.8]
      ].forEach(function(item) {
        var kongmingdeng = new createjs.Bitmap(queue.getResult(item[0]));
        kongmingdeng.setTransform(item[1], item[2]);
        if (item[3]) {
          kongmingdeng.scaleX = item[3];
          kongmingdeng.scaleY = item[3];
        }
        mc.timeline.addTween(createjs.Tween.get(kongmingdeng));
      });

      // 星星
      var stars = new createjs.Bitmap(queue.getResult('page5_10-stars'));
      mc.timeline.addTween(createjs.Tween.get(stars, {loop: true}).to({alpha: 0}, 30));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page5_00-background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      var content = new createjs.Container();
      content.addChild(mc);
      var scale = 1.5;
      content.scaleX = scale;
      content.scaleY = scale;
      // 750px 标准屏幕宽度
      content.x = 750;
      content.y = 0;
      content.regX = 750;
      content.regY = 0;
      var cmc = new createjs.MovieClip();
      cmc.timeline.addTween(createjs.Tween.get(content)
        .to({scaleX: 1, scaleY: 1}, 30, createjs.Ease.circOut)
        .wait(60)
        .set({x: 135, y: 1260, regX: 135, regY: 1260})
        .to({scaleX: 5, scaleY: 5, alpha: 0}, 30, createjs.Ease.circOut)
        .call(complete).wait(100));

      function complete() {
        console.log('container5 complete');
        callback && callback();
      }

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView5, createjs.Container);
    return createjs.promote(ContentView5, 'Container');
  }());

  //ContentView6
  View.ContentView6 = (function() {
    function ContentView6(callback, cardInfo) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 按钮
      var button = new createjs.Bitmap(queue.getResult('page6_03-btn'));
      button.setTransform(180, 1050);
      button.addEventListener('click', function () {
        button.alpha = 0.5;
        var timeout = setTimeout(function() {
          button.alpha = 1;
          clearTimeout(timeout);
        }, 300);
        callback && callback();
      });
      mc.timeline.addTween(createjs.Tween.get(button));

      // 月亮
      var moon = new createjs.Bitmap(queue.getResult('page6_moon'));
      moon.setTransform(530, -140);
      mc.timeline.addTween(createjs.Tween.get(moon));

      // 标签
      var biaoqian2 = new createjs.Bitmap(queue.getResult('page6_biaoqian2'));
      biaoqian2.setTransform(630, 740);
      mc.timeline.addTween(createjs.Tween.get(biaoqian2));
      var biaoqian3 = new createjs.Bitmap(queue.getResult('page6_biaoqian3'));
      biaoqian3.setTransform(0, 50);
      mc.timeline.addTween(createjs.Tween.get(biaoqian3));
      var biaoqian4 = new createjs.Bitmap(queue.getResult('page6_biaoqian4'));
      biaoqian4.setTransform(-25, 720);
      mc.timeline.addTween(createjs.Tween.get(biaoqian4));

      // 照片框
      var zhaopiankuang = new createjs.Bitmap(queue.getResult('page6_zhaopiankuang'));
      zhaopiankuang.setTransform(78, 105);
      mc.timeline.addTween(createjs.Tween.get(zhaopiankuang));

      console.log('cardInfo', cardInfo);
      if (cardInfo) {
        // 照片 'http://zq.guiyuanshiye.com/u1/2017/09/27/1506522460232629.png'
        var picture = new createjs.Bitmap((cardInfo.image || queue.getResult('page6_01-picture')));
        picture.setTransform(78, 105);
        mc.timeline.addTween(createjs.Tween.get(picture));

        // 祝福语
        var inputText = (cardInfo.content || '中秋快乐！')
          .split('').reduce(function(preResult, item, index) {
          if (index && index % 15 == 0) {
            preResult.push(' ');
          }
          preResult.push(item);
          return preResult;
        }, []).join('');
        var zhufuyu = new createjs.Text(inputText, '30px Arial', '#000000');
        zhufuyu.setTransform(150, 580);
        zhufuyu.lineWidth = 200;
        zhufuyu.lineHeight = 40;
        mc.timeline.addTween(createjs.Tween.get(zhufuyu));

        // 祝福人名字
        var zhufuname = new createjs.Text('落款：' + (cardInfo.name || '来自星星的'), '30px Arial', '#000000');
        zhufuname.setTransform(380, 780);
        mc.timeline.addTween(createjs.Tween.get(zhufuname));
      } else {
        // 祝福文字
        // [
        //   {
        //     text: '丹桂飘香，皓月当空',
        //     position: [255, 580]
        //   },
        //   {
        //     text: '心中有爱，便是团圆',
        //     position: [255, 630]
        //   },
        //   {
        //     text: '2017中秋佳节',
        //     position: [290, 680]
        //   },
        //   {
        //     text: '罗氏邀您上传全家福并许下心愿',
        //     position: [200, 730]
        //   },
        //   {
        //     text: '记录和家人在一起的温馨时刻',
        //     position: [215, 780]
        //   }
        // ].forEach(function(item) {
        //   var wenziItem = new createjs.Text(item.text, '26px Arial', '#000000');
        //   wenziItem.setTransform(item.position[0], item.position[1]);
        //   mc.timeline.addTween(createjs.Tween.get(wenziItem));
        // });
        var wenziItem = new createjs.Text('这是我的全家福，', '26px Arial', '#000000');
        wenziItem.setTransform(285, 630);
        mc.timeline.addTween(createjs.Tween.get(wenziItem));
        var wenziItem1 = new createjs.Text('也来制作一个你的全家福吧！', '26px Arial', '#000000');
        wenziItem1.setTransform(215, 680);
        mc.timeline.addTween(createjs.Tween.get(wenziItem1));
        // 照片
        var picture = new createjs.Bitmap(queue.getResult('page6_01-picture'));
        picture.setTransform(78, 105);
        mc.timeline.addTween(createjs.Tween.get(picture));
      }

      // 底框
      var dikuang = new createjs.Bitmap(queue.getResult('page6_dikuang'));
      dikuang.setTransform(55, 80);
      mc.timeline.addTween(createjs.Tween.get(dikuang));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page6_05-background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      var content = new createjs.Container();
      content.addChild(mc);
      content.alpha = 0;
      var cmc = new createjs.MovieClip();
      cmc.timeline.addTween(createjs.Tween.get(content)
        .to({alpha: 1}, 30).wait(2000)
        .call(complete).wait(1));

      function complete() {
        console.log('container6 complete');
        // callback && callback();
      }

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView6, createjs.Container);
    return createjs.promote(ContentView6, 'Container');
  }());

  //ContentView7
  View.ContentView7 = (function() {
    function ContentView7(callback) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 月亮
      var moon = new createjs.Bitmap(queue.getResult('page6_moon'));
      moon.setTransform(530, -140);
      mc.timeline.addTween(createjs.Tween.get(moon));

      // 云1
      var cloud1 = new createjs.Bitmap(queue.getResult('page7_yun1'));
      cloud1.setTransform(-50, 40);
      mc.timeline.addTween(createjs.Tween.get(cloud1));

      // 云2
      var cloud2 = new createjs.Bitmap(queue.getResult('page7_yun2'));
      cloud2.setTransform(620, 340);
      mc.timeline.addTween(createjs.Tween.get(cloud2));

      // 照片框
      var photoContainer = new createjs.Container();
      var photoInput = new createjs.Bitmap(queue.getResult('page7_zhaopiankuang'));
      photoInput.setTransform(35, 65);
      photoContainer.addChild(photoInput);
      mc.timeline.addTween(createjs.Tween.get(photoContainer));

      // 文字框
      var wordInput = new createjs.Bitmap(queue.getResult('page7_wenzikuang'));
      wordInput.setTransform(25, 675);
      wordInput.scaleY = 0.9;
      mc.timeline.addTween(createjs.Tween.get(wordInput));

      // 文字输入框
      $('#page7InputContainer').show();
      var inputText = '';
      $('#textInput').on('input', function(e) {
        // console.log('input', e.target.value);
        inputText = e.target.value;
      });
      // 名字输入框
      var nameText = '';
      $('#nameInput').on('input', function(e) {
        // console.log('input', e.target.value);
        nameText = e.target.value;
      });

      // 上传照片
      var photo, photoScale;
      var photoBtn = new createjs.Bitmap(queue.getResult('page7_photo-btn'));
      photoBtn.setTransform(205, 570);
      photoBtn.addEventListener('click', function() {
        var inputEle = $('#fileLoader');
        inputEle.click();
        inputEle.on('change', function(e) {
          var file = this.files[0];
          var orientation;
          //EXIF js 可以读取图片的元信息 https://github.com/exif-js/exif-js
          EXIF.getData(file,function(){
            orientation=EXIF.getTag(this,'Orientation');
          });
          var reader = new FileReader();
          reader.onload = function(e) {
            getImgData(this.result,orientation,function(data){
              //这里可以使用校正后的图片data了
              var img = new Image();
              img.onload = () => {
                photo = new createjs.Bitmap(img);
                photo.setTransform(35, 65);
                //遮罩图形
                var maskX = 35;
                var maskY = 65;
                var maskWidth = 676;
                var maskHeight = 484;
                var key = photo.getBounds().width/photo.getBounds().height > maskWidth/maskHeight ? 'height' : 'width';
                photoScale = (key === 'height' ? maskHeight : maskWidth) / photo.getBounds()[key];
                photo.scaleX = photoScale;
                photo.scaleY = photoScale;
                var mask = new createjs.Shape();
                mask.graphics.beginFill('#000').drawRect(0, 0, maskWidth, maskHeight);
                mask.x = maskX;
                mask.y = maskY;
                photo.mask = mask;     //给图片bg添加遮罩

                var oldX, oldY, resultX, resultY, maxX, maxY;
                photo.addEventListener('mousedown', function(e) {
                  oldX = e.stageX;
                  oldY = e.stageY;
                });
                photo.addEventListener('touchdown', function(e) {
                  oldX = e.stageX;
                  oldY = e.stageY;
                });
                photo.addEventListener('pressmove', function (e) {
                  resultX = e.target.x + e.stageX - oldX;
                  resultY = e.target.y + e.stageY - oldY;
                  maxX = maskWidth + maskX - e.target.getBounds().width * photoScale;
                  maxY = maskHeight + maskY - e.target.getBounds().height * photoScale;
                  if (resultX < maskX && resultX > maxX) {
                    e.target.x = resultX;
                  }
                  if (resultY < maskY && resultY > maxY) {
                    e.target.y = resultY;
                  }
                  oldX = e.stageX;
                  oldY = e.stageY;
                });
                photoContainer.addChild(photo);
                photoContainer.addChild(photoInput);
              }
              // img.src = URL.createObjectURL(e.target.files[0]);
              img.src = data;
            });
          }
          reader.readAsDataURL(file);
        });
      });
      // @param {string} img 图片的base64
      // @param {int} dir exif获取的方向信息
      // @param {function} next 回调方法，返回校正方向后的base64
      function getImgData(img,dir,next){
        var image=new Image();
        image.onload=function(){
          var degree=0,drawWidth,drawHeight,width,height;
          drawWidth=this.naturalWidth;
          drawHeight=this.naturalHeight;
          console.log('drwa', drawWidth, drawHeight);
          //以下改变一下图片大小
          var maxSide = Math.max(drawWidth, drawHeight);
          if (maxSide > 1024) {
            var minSide = Math.min(drawWidth, drawHeight);
            minSide = minSide / maxSide * 1024;
            maxSide = 1024;
            if (drawWidth > drawHeight) {
              drawWidth = maxSide;
              drawHeight = minSide;
            } else {
              drawWidth = minSide;
              drawHeight = maxSide;
            }
          }
          console.log('drwawwww', drawWidth, drawHeight);
          var canvas=document.createElement('canvas');
          canvas.width=width=drawWidth;
          canvas.height=height=drawHeight;
          var context=canvas.getContext('2d');
          //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
          switch(dir){
            //iphone横屏拍摄，此时home键在左侧
            case 3:
              degree=180;
              drawWidth=-width;
              drawHeight=-height;
              break;
            //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
            case 6:
              canvas.width=height;
              canvas.height=width;
              degree=90;
              drawWidth=width;
              drawHeight=-height;
              break;
            //iphone竖屏拍摄，此时home键在上方
            case 8:
              canvas.width=height;
              canvas.height=width;
              degree=270;
              drawWidth=-width;
              drawHeight=height;
              break;
          }
          //使用canvas旋转校正
          context.rotate(degree*Math.PI/180);
          context.drawImage(this,0,0,drawWidth,drawHeight);
          //返回校正图片
          next(canvas.toDataURL("image/jpeg",.8));
        }
        image.src=img;
      }
      mc.timeline.addTween(createjs.Tween.get(photoBtn));

      // 确认按钮
      var confirmBtn = new createjs.Bitmap(queue.getResult('page10_tijiao'));
      confirmBtn.setTransform(195, 1135);
      confirmBtn.scaleX = 0.9;
      confirmBtn.scaleY = 0.9;
      confirmBtn.addEventListener('click', function(e) {
        console.log('xxxx');
        if (!photo) {
          alert('你忘了上传照片噢~');
          return;
        }
        if (!inputText) {
          alert('你还没有写心愿噢~');
          return;
        }
        if (!nameText) {
          alert('你还没有写你的名字噢~');
          return;
        }
        console.log('loagind111');
        // 加载loading
        $('#loading1').show();

        setTimeout(function() {
          // 生成祝福图片
          var cont = new createjs.Container();
          var photoCont = new createjs.Container();
          var page8Background = new createjs.Bitmap(queue.getResult('page8_background'));
          cont.addChild(page8Background);

          // 底框
          var dikuang = new createjs.Bitmap(queue.getResult('page6_dikuang'));
          dikuang.setTransform(55, 80);
          cont.addChild(dikuang);

          // 上一页截图
          photo.mask.setTransform(78, 105);
          photo.mask.scaleX = 0.87;
          photo.mask.scaleY = 0.87;
          cont.addChild(photo);
          photoCont.addChild(photo.clone());

          // 祝福语
          inputText = inputText.split('').reduce(function(preResult, item, index) {
            if (index && index % 15 == 0) {
              preResult.push(' ');
            }
            preResult.push(item);
            return preResult;
          }, []).join('');
          var zhufuyu = new createjs.Text(inputText, '30px Arial', '#000000');
          zhufuyu.setTransform(150, 580);
          zhufuyu.lineWidth = 200;
          zhufuyu.lineHeight = 40;
          cont.addChild(zhufuyu);

          // 祝福人名字
          var zhufuname = new createjs.Text('落款：' + nameText, '30px Arial', '#000000');
          zhufuname.setTransform(380, 780);
          cont.addChild(zhufuname);

          // 提示语
          var tips = new createjs.Text('扫码定制你的心愿', '25px Arial', '#ffffff');
          tips.setTransform(273, 1165);
          cont.addChild(tips);

          // 照片框
          var zhaopiankuang = new createjs.Bitmap(queue.getResult('page6_zhaopiankuang'));
          zhaopiankuang.setTransform(78, 105);
          cont.addChild(zhaopiankuang);

          // 月亮
          var moon = new createjs.Bitmap(queue.getResult('page6_moon'));
          moon.setTransform(530, -140);
          cont.addChild(moon);

          // 标签
          var biaoqian2 = new createjs.Bitmap(queue.getResult('page6_biaoqian2'));
          biaoqian2.setTransform(630, 740);
          cont.addChild(biaoqian2);
          var biaoqian3 = new createjs.Bitmap(queue.getResult('page6_biaoqian3'));
          biaoqian3.setTransform(0, 50);
          cont.addChild(biaoqian3);
          var biaoqian4 = new createjs.Bitmap(queue.getResult('page6_biaoqian4'));
          biaoqian4.setTransform(-25, 720);
          cont.addChild(biaoqian4);

          // 二维码
          var erweima = new createjs.Bitmap(queue.getResult('share_erweima'));
          erweima.setTransform(290, 980);
          erweima.scaleX = 0.6;
          erweima.scaleY = 0.6;
          cont.addChild(erweima);

          // 获取用户截图
          photoCont.cache(photo.mask.x, photo.mask.y, 676 * photo.mask.scaleX, 484 * photo.mask.scaleY);
          var imgDateUrl = photoCont.cacheCanvas.toDataURL();
          // 保存截图
          $.ajax({
            type: 'post',
            url: 'http://zq.guiyuanshiye.com/image/add',
            data: {'file': imgDateUrl},
            dataType: 'json',
            async: false,
            success: function (json) {
              // 保存用户祝福卡信息
              $.ajax({
                type: 'post',
                url: 'http://zq.guiyuanshiye.com/card/add',
                data: {'name': nameText, 'image': json.data.url, 'content': inputText},
                dataType: 'json',
                async: false,
                success: function (r) {
                  $('#loading1').hide();
                  // 分享到朋友圈
                  var title = nameText + '的中秋心愿只说给你听！';
                  var desc = '快来打开看看吧！';
                  var link = 'http://zq.guiyuanshiye.com//long?cardId=' + r.data.id;
                  var imgUrl = 'http://zq.guiyuanshiye.com//long/assets/img/share/wechat.jpg';
                  window.savedCardId = r.data.id;
                  wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                      // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                      // 用户取消分享后执行的回调函数
                    }
                  });
                  // 设置微信分享到个人配置
                  wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                      // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                      // 用户取消分享后执行的回调函数
                    }
                  });
                  // 生成祝福图，并跳转至下一页
                  cont.cache(0, 0, 750, 1334);
                  callback && callback(cont.cacheCanvas.toDataURL());
                },
                error: function() {
                  $('#loading1').hide();
                  showToaster('上传失败！');
                }
              });
            },
            error: function() {
              $('#loading1').hide();
              showToaster('上传失败！');
            }
          });
        }, 500);
      });
      mc.timeline.addTween(createjs.Tween.get(confirmBtn));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page7_background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      var content = new createjs.Container();
      content.addChild(mc);
      var cmc = new createjs.MovieClip();
      cmc.timeline.addTween(createjs.Tween.get(content)
        .call(complete).wait(1));

      function complete() {
        console.log('container7 complete');
        // callback && callback();
      }

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView7, createjs.Container);
    return createjs.promote(ContentView7, 'Container');
  }());

  //ContentView9
  View.ContentView9 = (function() {
    function ContentView9(callback) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 按钮
      var button = new createjs.Bitmap(queue.getResult('page9_xiayibu'));
      button.setTransform(180, 1050);
      button.addEventListener('click', function () {
        button.alpha = 0.5;
        var timeout = setTimeout(function() {
          button.alpha = 1;
          clearTimeout(timeout);
        }, 300);
        console.log('ssss', callback);
        callback && callback();
      });
      mc.timeline.addTween(createjs.Tween.get(button));

      [
        {
          text: '抽奖规则：',
          position: [305, 400]
        },
        {
          text: '1. 仅对罗氏制药员工有效；',
          position: [200, 480]
        },
        {
          text: '2. 参与时间：9月30日至10月8日；',
          position: [150, 530]
        },
        {
          text: '3. 后台将随机抽取幸运儿，惊喜多多！',
          position: [130, 580]
        },
        {
          text: '* 中奖名单请关注"罗氏头条"',
          position: [185, 680]
        }
      ].forEach(function(item) {
        var wenziItem = new createjs.Text(item.text, '30px Arial', '#1A5078');
        wenziItem.setTransform(item.position[0], item.position[1]);
        mc.timeline.addTween(createjs.Tween.get(wenziItem));
      });

      // 月亮
      var moon = new createjs.Bitmap(queue.getResult('page6_moon'));
      moon.setTransform(530, -140);
      mc.timeline.addTween(createjs.Tween.get(moon));

      // 标签
      var yun = new createjs.Bitmap(queue.getResult('page9_yun'));
      yun.setTransform(580, 780);
      mc.timeline.addTween(createjs.Tween.get(yun));
      var biaoqian3 = new createjs.Bitmap(queue.getResult('page6_biaoqian3'));
      biaoqian3.setTransform(0, 50);
      mc.timeline.addTween(createjs.Tween.get(biaoqian3));
      var biaoqian4 = new createjs.Bitmap(queue.getResult('page6_biaoqian4'));
      biaoqian4.setTransform(-25, 720);
      mc.timeline.addTween(createjs.Tween.get(biaoqian4));

      // 标题
      var biaoti = new createjs.Bitmap(queue.getResult('page9_biaoti'));
      biaoti.setTransform(210, 205);
      mc.timeline.addTween(createjs.Tween.get(biaoti));

      // 底框
      var dikuang = new createjs.Bitmap(queue.getResult('page6_dikuang'));
      dikuang.setTransform(55, 80);
      mc.timeline.addTween(createjs.Tween.get(dikuang));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page6_05-background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      var content = new createjs.Container();
      content.addChild(mc);
      content.alpha = 0;
      var cmc = new createjs.MovieClip();
      cmc.timeline.addTween(createjs.Tween.get(content)
        .to({alpha: 1}, 10).wait(2000)
        .call(complete).wait(1));

      function complete() {
        console.log('container9 complete');
        // callback && callback();
      }

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView9, createjs.Container);
    return createjs.promote(ContentView9, 'Container');
  }());

  //ContentView10
  View.ContentView10 = (function() {
    function ContentView10(callback) {
      this.Container_constructor();
      var mc = new createjs.MovieClip();

      // 月亮
      var moon = new createjs.Bitmap(queue.getResult('page6_moon'));
      moon.setTransform(530, -140);
      mc.timeline.addTween(createjs.Tween.get(moon));

      // 云1
      var cloud1 = new createjs.Bitmap(queue.getResult('page7_yun1'));
      cloud1.setTransform(-50, 40);
      mc.timeline.addTween(createjs.Tween.get(cloud1));

      // 云2
      var cloud2 = new createjs.Bitmap(queue.getResult('page7_yun2'));
      cloud2.setTransform(620, 340);
      mc.timeline.addTween(createjs.Tween.get(cloud2));

      // 标题
      var biaoti = new createjs.Bitmap(queue.getResult('page10_biaoti'));
      biaoti.setTransform(220, 180);
      mc.timeline.addTween(createjs.Tween.get(biaoti));

      // 姓名输入框
      var nameInput = new createjs.Bitmap(queue.getResult('page10_mingzi'));
      nameInput.setTransform(40, 300);
      mc.timeline.addTween(createjs.Tween.get(nameInput));

      // 员工号输入框
      var staffInput = new createjs.Bitmap(queue.getResult('page10_yuangonghao'));
      staffInput.setTransform(40, 480);
      mc.timeline.addTween(createjs.Tween.get(staffInput));

      // 手机号输入框
      var phoneInput = new createjs.Bitmap(queue.getResult('page10_shoujihao'));
      phoneInput.setTransform(40, 660);
      mc.timeline.addTween(createjs.Tween.get(phoneInput));

      // 提示语
      var tips = new createjs.Text('* 以上信息填写完整，即可参与抽奖', '30px Arial', '#ffffff');
      tips.setTransform(40, 820);
      mc.timeline.addTween(createjs.Tween.get(tips));

      // 姓名输入框
      $('#page10_nameInput').show();
      var nameText = '';
      $('#page10_nameInput').on('input', function(e) {
        // console.log('input', e.target.value);
        nameText = e.target.value;
      });
      // 员工号输入框
      $('#page10_staffInput').show();
      var staffText = '';
      $('#page10_staffInput').on('input', function(e) {
        staffText = e.target.value;
      });
      // 手机号输入框
      $('#page10_phoneInput').show();
      var phoneText = '';
      $('#page10_phoneInput').on('input', function(e) {
        phoneText = e.target.value;
      });
      $('#staffForm').validator({
        timely: 0,
        stopOnError: false,
        msgMaker: false,
        fields: {
          'name': {rule: 'required;length(2~30)', msg: {required: '姓名不能为空', length: '姓名2-30字符'}},
          'number': {rule: 'required', msg: {required: '请填写员工号'}},
          'mobile': {rule: 'required;mobile', msg: {required: '手机号不能为空', mobile: '手机号格式错误'}}
        },
        invalid: function (form, errors) {
          var msg = '';
          for (var r in errors) {
            msg = msg + errors[r] + '<br/>';
          }
          showToaster(msg);
        },
        valid: function (form) {
          $('#loading1').show();
          console.log('cccc');
          var timeOut = setTimeout(function() {
            clearTimeout(timeOut);
            var ajax = $.ajax({
              'url': 'http://zq.guiyuanshiye.com/user/add',
              'data': Object.assign({}, $(form).serialize(), {card_id: window.savedCardId}),
              'type': 'post',
              'dataType': 'json',
              'async': true
            });
            ajax.done(function (r) {
              $('#loading1').hide();
              (function() {
                $('#confirmSuccess').show();
                $('#confirmSuccess').on('click', function() {
                  $('#confirmSuccess').hide();
                });
                $('#confirmSuccess .success-btn').on('click', function() {
                  $('#share').show();
                  $('#share').on('click', function() {
                    $('#share').hide();
                  });
                });
              })();
              // if (r.error) {
                // showToaster(r.msg);
              // }
              // else {
              //   window.location.href = r.msg;
              //   return;
              // }
            });
            ajax.fail(function (jqXHR, textStatus) {
              $('#loading1').hide();
              (function() {
                $('#confirmFail').show();
                $('#confirmFail .fail-btn').on('click', function() {
                  $('#confirmFail').hide();
                });
              })();
            });
          }, 300);
        }
      });

      // 确认按钮
      var confirmBtn = new createjs.Bitmap(queue.getResult('page10_tijiao'));
      confirmBtn.setTransform(180, 935);
      confirmBtn.addEventListener('click', function(e) {
        $('#staffForm').submit();
        // $('#confirmSuccess').show();
        // $('#confirmSuccess').on('click', function() {
        //   $('#confirmSuccess').hide();
        // });
        // $('#confirmSuccess .success-btn').on('click', function() {
        //   console.log('ddddd');
        //   $('#share').show();
        //   $('#share').on('click', function() {
        //     $('#share').hide();
        //   });
        // });
      });
      mc.timeline.addTween(createjs.Tween.get(confirmBtn));

      // 背景
      var background = new createjs.Bitmap(queue.getResult('page7_background'));
      mc.timeline.addTween(createjs.Tween.get(background));

      var content = new createjs.Container();
      content.addChild(mc);
      var cmc = new createjs.MovieClip();
      cmc.timeline.addTween(createjs.Tween.get(content)
        .call(complete).wait(1));

      function complete() {
        console.log('container10 complete');
        // callback && callback();
      }

      this.content = cmc;
      this.addChild(this.content);
    }
    createjs.extend(ContentView10, createjs.Container);
    return createjs.promote(ContentView10, 'Container');
  }());
  return View;
}));
