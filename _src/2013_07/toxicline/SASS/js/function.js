$(function () {
	var min_width = 540;
	var flg;
	var $container = $('.container');
	var $nav = $("#spNav");
	$("#spNav").hide();
	$('#sliderNav').hide();

	// hoverアニメーション
	$('a').each(function () {
		$(this).focus(function () {
			this.blur()
		});
		$(this).hover(function () {
			$(this).stop().animate({opacity: 0.3}, 400);
		}, function () {
			$(this).stop().animate({opacity: 1}, 500);
		});
	});

	// spNav
	function setSpNav() {
		var initWidth = $(window).width();
		if (initWidth <= 540) {
			$nav.not(':animated').fadeIn().transform({rotateZ: '360deg'}).animate({rotateZ: '0deg'}, 400, 'linear');
		} else {
			$nav.not(':animated').fadeOut();
		}
	}

	// sideNav
	function setSideNav() {
		var $sliderNav = $("#sliderNav");

		$("a.slide").click(function () {
			$nav.transform({rotateZ: '360deg'}).animate({rotateZ: '0deg'}, 400, 'linear');
			slideComplete();
			return false;
		});

		function slideComplete() {
			var $wrapper = $('.wrapper');

			if ($sliderNav.css('display') == 'none') {
				$sliderNav.show();
				$wrapper.css({
					position: 'absolute',
					left: '65%'
				});
			} else {
				$wrapper.css({
					left: '0',
					position:'relative'
				});
				$sliderNav.fadeOut(300);
			}
		}
	}

	//masonry event
	function setBind() {
		var $width = $('html').width();

		if ($width < min_width) {
			if (flg) {
				$container.masonry('destroy');
				flg = 0;
			}
		} else {
			$container.masonry({
				"columnWidth": 200,
				"itemSelector": '.item',
				"isFitWidth": true
			});
			flg = 1;
		}
	}


	$(window).bind('load resize', setBind);
	$(window).bind('load resize', setSpNav);
	setSideNav();

});