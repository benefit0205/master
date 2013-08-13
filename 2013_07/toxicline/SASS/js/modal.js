$(function(){
	var $modalContainer = $("<div class='modalContainer'></div>");
	$modalContainer.html('<div class="modalBg"></div><div class="modalContent"></div>');
	$('body').append($modalContainer).css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

	var $modalContent = $(".modalContent");

	function setModal() {
		$(".modalBg").click(function () {
			displayModal(false);
		});

		$("a.modal").click(function () {
			$(".modalContent").load($(this).attr("href"), data = 'html', onComplete);
			return false;
		});

		function onComplete() {
			displayModal(true);
			$("a.close").click(function () {
				displayModal(false);
				return false;
			});
		}
	}

	function displayModal(sign) {
		if (sign) {
			$modalContainer.fadeIn(500);
		} else {
			$modalContainer.fadeOut(250);
		}
	}

	$(window).bind('load resize', function(){
		var docHeight = $(document).height();
		var initLeftPosition = $(window).width();

		$modalContainer.css({
			height: docHeight + 'px'
		});
		$modalContent.stop().animate({
			top: 100 + 'px',
			left: (initLeftPosition - $modalContent.width())/2
		}, 500);
	});

	setModal();
});