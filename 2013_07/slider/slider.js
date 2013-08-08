$(window).on("load", function () {
	var crIndex = 1;
	var $container = $(".container");
	var $img = $container.find("img");
	var imgWidth = $img.width();
	var imgIndex = $img.length;

	function leftSlide() {
		var initPosition = $container.position().left;
		if (crIndex == imgIndex) {
			$container.css('left', 0).
				not(':animated').animate({
					left: -imgWidth + "px"
				}, 800, 'easeOutExpo');
			crIndex = 2;
		} else {
			$container.not(':animated').animate({
				left: initPosition - imgWidth + "px"
			}, 800, 'easeOutExpo');
			crIndex++;
		}
	}

	function rightSlide() {
		var initPosition = $container.position().left;
		if (crIndex == 1) {
			$container.css('left', -3200 + 'px').
				not(':animated').animate({
					left: $container.position().left + imgWidth + 'px'
				}, 800, 'easeOutExpo');
			crIndex = 4;
		} else {
			$container.not(':animated').animate({
				left: initPosition + imgWidth + 'px'
			}, 800, 'easeOutExpo');
			crIndex--;
		}
	}

	$("#left").bind('click', leftSlide);
	$("#right").bind('click', rightSlide);

	//setInterval(leftSlide, 1500);
});

