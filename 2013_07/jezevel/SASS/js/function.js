$(function () {
	$("#spNav").hide();
	$(".container").removeClass("jsReady");

	$('a').hover(function(){
		$(this).stop().animate({opacity: 0.3}, 400);
	}, function(){
		$(this).stop().animate({opacity:1}, 500);
	});

	function setSpNav() {
		var $nav = $("#spNav");
		var initWidth = $(window).width();
		if (initWidth <= 540) {
			$nav.fadeIn().transform({rotateZ: '360deg'}).animate({rotateZ: '0deg'}, 400, 'linear');
		} else {
			$nav.fadeOut();
		}
		$nav.click(function () {
			$(window).animate({scrollTop: 0}, 500);
		});
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

	$(".flexslider").flexslider({
		animation: 'slide',
		slideshowSpeed: 5000
	});
});