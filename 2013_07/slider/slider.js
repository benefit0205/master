$(window).on("load", function () {
	var crIndex = 1;
	var $container = $(".container");
	var $img = $container.find("img");
	var imgWidth = $img.width();
	var imgIndex = $img.length;

	function leftSlide() {
		var initPosition = $container.position().left;
		if (crIndex == imgIndex) {
			$container.css('left', 0);
			$container.stop().animate({
				left: - imgWidth + "px"
			}, 1000, 'easeOutBounce');
			crIndex = 2;
		} else {
			$container.stop().animate({
				left: initPosition - imgWidth + "px"
			}, 1000, 'easeOutBounce');
			crIndex++;
		}
	}

	function rightSlide() {
		var initPosition = $container.position().left;
		if(crIndex == 1 ){
			$container.css('left', -3200 + 'px');
			$container.stop().animate({
				left: $container.position().left + imgWidth + 'px'
			}, 1000, 'easeOutBounce');
			crIndex = 4;
		} else {
			$container.stop().animate({
				left: initPosition + imgWidth + 'px'
			}, 1000, 'easeOutBounce');
			crIndex--;
		}
	}

	$("#left").bind('click', leftSlide);
	$("#right").bind('click', rightSlide);

	//setInterval(leftSlide, 1500);
});

