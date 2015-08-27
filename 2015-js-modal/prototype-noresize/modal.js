var CMN = CMN || {};
CMN.$document = $(document);
CMN.$window = $(window);
CMN.$body = $('body, html');

CMN.MODAL = function(target){
	this.init(target);
};
CMN.MODAL.prototype = {
	init: function(target){
		this.$jscModalTrigger = $(target);
		this.jscModalContent = $('<div></div>').addClass('jscModalContent modalContent');
		this.background = $('<div></div>').addClass('background');

		CMN.$body.append(this.jscModalContent.html('<p>hogehoge</p>'));
		CMN.$body.append(this.background);
		this.$jscModalContent = $('.jscModalContent');
		this.$background = $('.background');
		this.bindEvent();
	},
	bindEvent: function(){
		var _self = this;

		this.$jscModalTrigger.on('click', function(e){
			e.preventDefault();
			_self.modalTrigger();
		});
		this.$background.on('click', function(e){
			_self.modalClose();
		});
	},
	modalTrigger: function(){
		var positionTop = (CMN.$window.height() - this.$jscModalContent.height()) / 2,
			positionLeft = (CMN.$window.width() - this.$jscModalContent.width()) / 2;

		if(this.$background.css('display') == 'none'){
			this.$background.css({
				'width': '100%',
				'height': CMN.$document.height()
			}).fadeIn();
			this.$jscModalContent.css({
				'top': positionTop,
				'left': positionLeft
			}).fadeIn();
		}
	},
	modalClose: function(){
		if(this.$background.css('display') == 'block'){
			this.$background.fadeOut();
			this.$jscModalContent.fadeOut();
		}
	}
};

$(function(){
	$('.jscModalTrigger').each(function () {
		new CMN.MODAL(this);
	});
});