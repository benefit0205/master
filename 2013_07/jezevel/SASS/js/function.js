$(function () {

	//dropDown Menu
	function setDropNav(){
		$("#dropNav>li").each(function(){
			var subMenu = $('>ul', this);
			var defaultHeight = subMenu.height();
			$(this).hover(function(){
				if(subMenu.css('display') == 'none' ){
					subMenu.slideDown('fast', function(){
						subMenu.css('overflow', 'visible');
					});
				} else {
					subMenu.stop().animate({
						height: defaultHeight
					}, 'fast', function(){
						subMenu.css('overflow', 'visible');
					});
				}
			}, function(){
				subMenu.stop().slideUp('fast');
			});
		});
		$("#dropNav ul").prepend('<li class="navBalloon"></li>').hide();
	}

	function fuga(){
		$("#dropNav").hide();
		var $spNavs = $('<ul class="spNavs"></ul>');
		$spNavs.push('<li class="hoge"></li>');
		$spNavs.push('<li class="hogehoge"></li>');
		$("body").append($spNavs);
	}

	//load&resize event
	function setBind() {
		var $container = $(".container");
		var initWidth = $(window).width();
		console.log(initWidth);

		if (initWidth <= 540) {
			$container.masonry('destroy');
		} else {
			$container.masonry({
				columnWidth: 200,
				itemSelector: '.item',
				isFitWidth: true
			});
			setDropNav();
		}
	}



	$(window).bind('load resize', setBind);

	$(".flexslider").flexslider({
		animation: 'slide',
		slideshowSpeed: 5000
	});
});