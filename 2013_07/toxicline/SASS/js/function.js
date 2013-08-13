$(function () {
	$("#spNav").hide();
	$('#sliderNav').hide();
	$(".container").removeClass("jsReady");

	// hoverアニメーション
	$('a').hover(function () {
		$(this).stop().animate({opacity: 0.3}, 400);
	}, function () {
		$(this).stop().animate({opacity: 1}, 500);
	});

	// spNav
	function setSpNav() {
		var $nav = $("#spNav");
		var initWidth = $(window).width();
		if (initWidth <= 540) {
			$nav.fadeIn().transform({rotateZ: '360deg'}).animate({rotateZ: '0deg'}, 400, 'linear');
		} else {
			$nav.fadeOut();
		}
	}

	// sideNav
	function setSideNav(){
		var $sliderNav = $("#sliderNav");

		$("a.slide").click(function(){
			$sliderNav.load($(this).attr('href'), data='html', slideComplete);
			return false;
		});

		function slideComplete(){
			var $wrapper = $('.wrapper');

			if($sliderNav.css('display') == 'none'){
				$sliderNav.show();
				$wrapper.css({
					position: 'absolute',
					left: '65%'
				});
			} else {
				$wrapper.css({
					left: '0'
				});
				$sliderNav.fadeOut(300);
			}
		}
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
		}
	}

	$(window).bind('load resize', setBind);
	$(window).bind('load resize', setSpNav);
	setSideNav();

	$(".flexslider").flexslider({
		animation: 'slide',
		slideshowSpeed: 5000
	});
});