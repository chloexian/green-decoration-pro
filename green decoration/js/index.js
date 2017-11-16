
$(function(){
var banner = {

	//保存图片的容器
	imgContainer: [
	    'banner03.png',
		'ba.png',
		'banner02.png',
		'banner03.png',
		
	],

	//图片下标索引
	list: 1,

	//保存定时器编号
	timer: null,


	//获取展示图片的宽度 #show 1366
	showWidth: $('#show').width(),


	//创建轮播图片
	createImg: function () {
		//this ==> banner
		//获取banner元素
		var $banner = $('#banner');

		//创建图片个数
		var length = this.imgContainer.length;

		for (var i = 0; i < length; i++) {
			//创建li同时创建图片
			var $li = $('<li><img src="./images/' + this.imgContainer[i] + '" /></li>');

			//将创建的$li添加到$banner
			$banner.append($li);
		}

		//设置banner的li的宽度
		$banner.find('li').width(this.showWidth);

		$banner.css({left: -this.showWidth});

		//设置banner ul的宽度
		$banner.width(this.showWidth * length);

		//创建图片下标索引
		this.createIndex(length);

		return this;
	},

	//创建图片下标索引
	createIndex: function (len) {
		//获取index ul元素
		var $index = $('#index');
		for (var i = 0; i < len - 1; i++) {
			//创建下标索引的li
			var $li = $('<li class="' + (i === 0 ? 'on' : '') + '"></li>');

			//将li添加到index ul中
			$index.append($li);
		}
	},

	//点击索引切换颜色
	toggleIndex: function ($li) {
		var index = $li.index();
		console.log('index ==> ', index);
		this.list = index + 1;

		//验证当前li是否含有on类
		if (!$li.hasClass('on')) {
			$li.addClass('on').siblings().removeClass('on');

			$('#banner').animate({left: -this.showWidth * this.list}, 300);
		}
	},

	//左边箭头(上一张)
	prevPage: function () {
		var $banner = $('#banner');

		var bannerLeft = parseFloat($banner.css('left'));

		console.log('bannerLeft ==> ', bannerLeft);
		//验证bannerLeft
		var isPast = this.validBannerLeft(bannerLeft);
		if (!isPast) {
			return;
		}

		if (bannerLeft >= 0) {
			$banner.css({left: -this.showWidth * (this.imgContainer.length - 1)});
			this.list = this.imgContainer.length - 2;
		} else {
			this.list--;
		}

		var index = this.list === 0 ? this.imgContainer.length - 1 : this.list;

		$banner.animate({left: -this.showWidth * this.list}, 300);
		$('#index').find('li').eq(index - 1).addClass('on').siblings().removeClass('on');
	},

	//右箭头(下一张)
	nextPage: function () {
		var $banner = $('#banner');

		var bannerLeft = parseFloat($banner.css('left'));

		console.log('bannerLeft ==> ', bannerLeft);

		//验证bannerLeft
		var isPast = this.validBannerLeft(bannerLeft);
		if (!isPast) {
			return;
		}

		if (bannerLeft <= -this.showWidth * (this.imgContainer.length - 1)) {
			$banner.css({left: 0});
			this.list = 1;
		} else {
			this.list++;
		}

		console.log('this.list ==> ', this.list);

		$banner.animate({left: -this.showWidth * this.list}, 300);
		$('#index').find('li').eq(this.list - 1).addClass('on').siblings().removeClass('on');
	},

	//验证bannerLeft
	validBannerLeft: function (bannerLeft) {
		if (bannerLeft % this.showWidth === 0) {
			return true;
		}
		return false;
	},

	//自动播放
	autoPlay: function () {
		var self = this;
		self.timer = setInterval(function () {
			self.nextPage();
		}, 2000);
	},

	//为 prev , next, #index>li 绑定点击事件
	addEvent: function () {
		//保留this 的指向 banner
		var self = this;
		$('#show').on({"click": function () {
			//保存当前点击元素的id
			var id = $(this).attr('id');
			
			if (id === 'prev') {
				//上一张
				self.prevPage();
			} else if (id === 'next') {
				//下一张
				self.nextPage();
			} else {
				//索引
				self.toggleIndex($(this));
			}

		}}, '#prev,#next,#index>li').hover(function () {
			//鼠标进入
			$('#prev,#next').fadeIn(300);
			clearInterval(self.timer);
			self.timer = null;
		}, function () {
			//鼠标离开
			$('#prev,#next').fadeOut(300);
			self.autoPlay();
		});

		return self;
	},

	//初始化页面
	initPage: function () {
		this.createImg().addEvent().autoPlay();
	}

};

banner.initPage();

	$(".tent .cover-color").hover(
		function () {
			$(this).find("i").css('display','block'); 
			$(this).find('.big').css('display','block'); 
		 },
		function () {
			$(this).find("i").css('display','none'); 
			$(this).find('.big').css('display','none');
		}

	)


})




