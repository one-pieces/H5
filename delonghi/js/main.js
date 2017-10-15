window.onload = function() {
	var self = {
	    pages: {
	      taskPage: null,
	      endingPage: null,
	      serctPage: null,
	      sharePage: null
	    }
  	};
  	//模型
  	var htmlMap = {
    endingPage: '<div id="img-prove" class="img-prove">\n' +
    '    <img id="btn-start" src="assets/img/jpg/start.jpg" alt="" />\n' +
    '  </div>',
    serctPage: '<div id="skip">\n' +
    '    <img id="serct-road" src="assets/img/jpg/bg-04.jpg" alt="" />\n' +
    '    <img id="slogan" src="assets/img/jpg/slogan.png" alt="" />\n' +
    '  </div>',
    sharePage: '<div class="advert_share " id= "ad_share">\n' +
    '    <img class="advert-PS" src="assets/img/jpg/active.png" alt="" />\n' +
    '    <img class="safari" src="assets/img/jpg/safari.png" alt="" />\n' +
    '     <img class="share" src="assets/img/jpg/share.png" alt="" />\n' +
    '  </div>'
  }
  	var video = $('video')[0];
  	var flagStart = false;
    var flagEnd = false;
    $(document).on('touchstart','.img-section', function(){
    	$('.img-section').hide()
//  	$('body').append(htmlMap.endingPage);
//  	setTimeout(function(){
    		$('#img-prove').hide();
			$('#video_player').show();
			$('#start').show();
            flagStart = false;
            flagEnd = false;
            video.play();
            $('.audioBtn').hide()
            self.aduio.pause();
//  	},200)
    })
//  $(document).on('touchstart','#btn-start', function(){
//	    	$('#img-prove').hide();
//			$('#video_player').show();
//			$('#start').show();
//          flagStart = false;
//          flagEnd = false;
//          video.play();
//          $('.audioBtn').hide()
//          self.aduio.pause();
//   })
//  $(function(){
    	var ani_Mate = function(){
    		var animImg = 1;
				var animImages = setInterval(function () {
					animImg++; 
					if (animImg >= 44) {
						animImg = 33; 
					}
					$(".animImg").hide(); 
					$(".animImg" + animImg).show(); 
				}, 100);
    	}
				
//			})
//	$(document).on("click",'#btn-start',function(){
//		$('#img-prove').hide();
//		$('#video_player').show();
//		$('#start').show();
//		document.getElementById("start").play()
//	})
//	var myVid=document.getElementById("start");
//	myVid.addEventListener('ended',function(){
//      document.getElementById("video_player").style.display="none";//隐藏
//     	$('body').append(htmlMap.serctPage);
//  });
    video.addEventListener('timeupdate', function () {
        
            // 视频开始播放
            if (this.duration > 0 && this.currentTime > 0.5 && !flagStart) {
                flagStart = true;
                
            }
            // 视频快要结束
            if (this.duration > 0 && this.duration - this.currentTime < 0.5 && !flagEnd) {
                flagEnd = true;
                setTimeout(function(){
                    $('video').hide();
                    $('.audioBtn').show()
                    $('.audioBtn').attr('src','assets/audio/music2.mp3')
                    self.aduio.play();
                    $('body').append(htmlMap.serctPage);
                }, 1000)
            }
        });
    $(document).on('touchstart','#skip',function(){
    	$('#skip').hide();
    	$('body').append(htmlMap.sharePage);
    	document.getElementById('ad_share').addEventListener('touchstart', function (e) {
	        $('.safari').show()
    		setTimeout(function(){
				$('.safari').hide()
				$(".share").show()
			},3000);
    	});
//  	if ($('.advert_share').length > 0) {
//  		$('.safari').show()
//  		setTimeout(function(){
//			$('.safari').hide()
//			$(".share").show()
//		},3000);
//  }
    })
    
    //监听音乐播放
    document.addEventListener("WeixinJSBridgeReady", function (){ 
                $('audio')[0].play();
    }, false)
    self.aduio = document.getElementById('audio')
    self.playAudio = function() {
    	self.aduio.play();
	    $("#audioBtn").removeClass("boF");
	    $("#audioBtn").addClass("audioRotate");
	 }
 	self.puaseAudio = function() {
	    self.aduio.pause();
	    $("#audioBtn").addClass("boF");
	    $('#audioBtn').removeClass('audioRotate')
 	 }
 	$.ajax({
            type: 'get',
            //url: host + '/share/jssdk',
            //data: { url: window.location.href, m: 'getWxConfig' },
            url: 'http://www.tron-m.com/tron-api/jssdk/share.do',
            data: { url: window.location.href },
            dataType: 'json',
            success: function (args) {
                args = args.result;

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: args.appId, // 必填，公众号的唯一标识
                    timestamp: args.timestamp, // 必填，生成签名的时间戳
                    nonceStr: args.nonceStr, // 必填，生成签名的随机串
                    signature: args.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });


                wx.ready(function () {
                    var url = document.location.href,
                        title = '分享标题',
                        desc = '分享描述',
                        imgUrl = 'http://www.tron-m.com/delonghi/assets/img/jpg/fla.jpg';

                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
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

                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareWeibo({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQZone({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

                wx.error(function (res) {
                    console.log("wx has error:" + res);
                });
            }
        });
//		if(isWeiXin() == false) {
//			self.aduio.pause();
//			window.location.href = "https://shop.m.taobao.com/shop/activity_page.htm?wh_weex=true&pathInfo=shop/activity&userId=1629358780&shopId=102774711&pageId=111034312"
//		}
//		else{
//			document.getElementById("shade").style.display = "none";
//		}
 // 打开单页
		self.open = function () {
    var resources = [];
    for (var i = 1; i <= 4; i++) {
      resources.push(i + '.png');
    }
    var loader = new resLoader({
      baseUrl: 'assets/img/loading/',
      resources: resources,
      onComplete: function (total) {
        var loader2 = new resLoader({
          baseUrl: 'assets/',
          resources: [
          	'img/h5/music_off.png',
          	'img/h5/music_on.png',
            'img/jpg/bg-04.jpg',
            'img/jpg/slogan.png',
            'img/jpg/fla.jpg',
            'img/jpg/bg-02.jpg',
            'img/jpg/active.png',
            'img/jpg/share.png',
            'img/jpg/safari.png',
            'img/jpg/start.jpg'
          ],
          onProgress: function (current, total) {
            var percent = parseInt(current / total * 100);
            $('.loadingInfo .percent').text(percent + '%..');
          },
          onComplete: function (total) {
            $('#loading').hide();
            var numbers = ['01:00', '01:30', '02:00', '02:30', '03:00'];
            animate(0);
            function animate(index) {
              if (index > 4) {
                var timeout = setTimeout(function() {
                  $('.countDown').hide();
                  $('.nextBtn').show();
                  $('#nextBtn').on('touchstart click', function() {
                    $('#timer').hide();
                    $('#video_player').show();
                    $('#start').show();
                    flagStart = false;
                    flagEnd = false;
                    video.play();
                    $('.audioBtn').hide()
                    self.aduio.pause();
                  });
                  clearTimeout(timeout);
                }, 500);
                return;
              }
              $('#word' + index).addClass('up-fade')
                .on('webkitAnimationStart', function() {
                  $('#timer .number').text(numbers[index]);
                })
                .on('webkitAnimationEnd', function() {
                  animate(index + 1);
                });
            }

            $('#audioBtn').show().on("click" ,function() {
              if (self.aduio.paused) {
                self.playAudio();
              }
              else{
                self.puaseAudio();
              }
            });
          }
        });
        loader2.start();
      }
    });
    loader.start();
  }()
}

	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	
  
	