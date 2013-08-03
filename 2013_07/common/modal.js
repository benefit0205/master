/**
 * Created with JetBrains WebStorm.
 * User: jun maehashi
 * Date: 13/07/14
 * Time: 18:22
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    appendModal();
    setModal();
});


function appendModal(){
    var $modal = $("<div id='modalBody'></div>");
    var initHeight = $(document).height();

    $modal.html('<div class="modalBg"></div><div class="modalContainer"></div>');
    $modal.css('height', initHeight);
    $(".modalBg", $modal).css('height', initHeight);
    $("body").append($modal);

}

function setModal(){
    var container = $("#modalBody .modalContainer");

    adjustCenter(container);

    $(window).resize(function(){
        adjustCenter(container);
    });

    $("#modalBody .modalBg").click(function(){
        displayModal(false);
    });

    $("a.modal").click(function(){
        $(container).load($(this).attr("href"), data="html", onComplete);
        return false;
    });

    function onComplete(){
        displayModal(true);
        $("a.close", container).click(function(){
            displayModal(false);
            return false;
        });
    }
}

function displayModal(sign) {
    if(sign){
        $("#modalBody").fadeIn(500);
    } else {
        $("#modalBody").fadeOut(250);
    }
}

function adjustCenter(target){
    console.log($(window).height());
    console.log($(window).width());
    var position_top = ($(window).height() - $(target).height())/2;
    var position_left = ($(window).width() - $(target).width())/2;
    $(target).stop().animate({
        top:position_top + "px",
        left:position_left + "px"
    }, 250, "easeInOutBounce");
}





