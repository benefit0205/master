$(function () {

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

	$(".flexslider").flexslider({
		animation: 'slide',
		slideshowSpeed: 5000
	});
});