$(window).on("load", function () {
	var crIndex = 1;
	var $container = $(".container");
	var $img = $container.find("img");
	var imgWidth = $img.width();
	var imgIndex = $img.length;
	var initPosition = $container.position().left;

	function init() {
		$container.css("left", initPosition - 800 + "px");
		console.log(crIndex);
	}

	function leftSlide() {
		var initPosition = $container.position().left;
		if (crIndex == imgIndex - 2) {
			$container.stop().animate({
				left: initPosition - imgWidth + "px"
			}, 1000, 'easeOutBounce', function () {
				$(this).css("left", 0);
			});
			crIndex = 0;
		} else {
			$container.stop().animate({
				left: initPosition - imgWidth + "px"
			}, 1000, 'easeOutBounce');
			crIndex++;
		}
	}

	function rightSlide() {
		var initPosition = $container.position().left;
		if (crIndex == 1) {
			$container.stop().animate({
				left: initPosition + imgWidth + "px"
			}, 1000, 'easeOutBounce', function () {
				$(this).css("left", -3200 + "px");
			});
			crIndex = 4;
		} else {
			$container.stop().animate({
				left: initPosition + imgWidth + "px"
			}, 1000, 'easeOutBounce');
			crIndex--;
		}
	}

	init();
	$("#left").bind('click', leftSlide);
	$("#right").bind('click', rightSlide);

	//setInterval(leftSlide, 1500);
});

