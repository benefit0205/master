var file = "form.html";
var formContentsID = "#contact";
var formID = "#mailform";
var overlayOpacity = "1";
var overlayColor = "#35a8d7";
var overlayImage = "url(images/bg.jpg) repeat-x left center";
var separator = ",";
var isConfirm;

$(function () {
    $('a').focus(function (e) {
        this.blur()
    });
    function showform() {
        overlayPosition();
        $("#overlayBg").click(closeform);

        $("#overlayForm").fadeIn(500, function () {
            $("#formcontents").load("./" + file + "" + formContentsID, null, onLoaded);
        });
    }

    function onLoaded() {
        var validation = $(formID).exValidation({
            errInsertPos: 'after',
            errPosition: 'fixed',
            customClearError: function () {
                if (!isConfirm) {
                    confirm();
                } else {
                    $(formID)[0].submit();
                }
            },
            scrollToErr: false,
        });
        $("div.buttonArea", $(this)).addClass("normal").find("button").html("送信内容を確認");

        $(this).css("position", "absolute")
            .css(centerposition(this))
            .css("top", $(window).height() + $(window).scrollTop() + "px");

        $(this).animate(centerposition(this), 1000, "easeOutExpo");
    }

    function centerposition(obj) {
        var position = new Object();
        position["left"] = ($(window).width() - $(obj).outerWidth()) / 2;
        position["top"] = ($(window).height() - $(obj).outerHeight()) / 2;
        position["marginLeft"] = 0;
        position["marginTop"] = 0;
        return position;
    }

    function overlayPosition() {
        $("#overlayForm")
            .css({
                "left": 0,
                "top": 0,
                "width": $(window).width() + "px",
                "height": $(window).height() + "px"
            });
        if ($("#formcontents").length) {
            $("#formcontents").css(centerposition($("#formcontents")));
        }
    }

    $(window).bind("scroll resize", overlayPosition);

    function confirm() {
        $("#formcontents").css(centerposition($("#formcontents"))).animate({
            "opacity": 0,
            "margin-left": -100 + "px"
        }, 400, "easeOutExpo", function () {
            $("h3", $(this)).addClass("normal");
            $("h3", $(this)).clone(true)
                .removeClass("normal")
                .addClass("confirm")
                .html("送信内容の確認")
                .insertAfter("#formcontents h3");

            $("div.buttonArea", $(this)).clone(true)
                .removeClass("normal")
                .addClass("confirm")
                .html('<button type="button" id="returnButton">内容を修正</button><button type="send" id="sendButton">この内容で送信</button>')
                .insertAfter("#formcontents div.buttonArea");
            $("#returnButton")
                .css("background", "#ccc");
            $("#returnButton").click(returnForm);
            $("input, textarea, select", $(formID)).each(function (i) {
                $(this).addClass("normal");
                var valueStr;
                if (!$(this).val()) {
                    var valueStr = "";
                } else if ($(this).val() instanceof Array) {
                    var valueArray = $(this).val();
                    for (i = 0; i < valueArray.length; i++) {
                        if (valueStr) {
                            valueStr = valueStr + separator + valueArray[i];
                        } else {
                            valueStr = valueArray[i];
                        }
                    }
                } else {
                    valueStr = $(this).val();
                }

                if ($(this).attr("type") == "radio") {
                    var thisID = $(this).attr("id");
                    $("label[for=" + thisID + "]", $(formID)).addClass("normal");
                    if ($(this).prop("checked")) {
                        $(this).after('<p class="confirm">' + valueStr + '</p>');
                    }
                } else if ($(this).attr("type") == "checkbox") {
                    var thisID = $(this).attr("id");
                    $("label[for=" + thisID + "]", $(formID)).addClass("normal");
                    if ($(this).prop("checked")) {
                        $(this).after('<p class="confirm">' + valueStr + '</p>');
                    }
                } else if (this.tagName == "SELECT") {
                    $(this).after('<p class="confirm">' + valueStr + '</p>');
                } else if (this.tagName == "TEXTAREA") {
                    valueStr = valueStr.replace(/\r\n/g, "<br />");
                    valueStr = valueStr.replace(/\n|\r/g, "<br />");
                    $(this).after('<p class="confirm">' + valueStr + '</p>');
                } else {
                    this.after('<p class="confirm">' + valueStr + '</p>');
                }
            });
        });

        $(".normal".$(this)).hide();
        $('.confirm', $(this)).show();
        $("p.confirm", $(this))
            .css({
               'line-height':1.6,
                'display':'inline'
            });
        $(".field").each(function(i){
           $("p.confirm:not(:last)", $(this)).each(function(j){
              $(this).append(separator);
           });
        });
        $(this).css(centerposition(this))
            .css('margin-left', '100px')
            .animate({
                'opacity':1,
                'margin-left':0
            }, 400, "easeOutExpo");

        isConfirm = true;

        function returnForm(){
            $("#formcontents").css(centerposition($("#formcontents")))
                .animate({
                   'opacity':0,
                    'margin-left':'100px'
                }, 400, "easeOutExpo", function(){
                    $(".normal", $(this)).show();
                    $(".confirm", $(this)).remove();

                    $(this).css(centerposition(this)).css('margin-left', '-100px')
                        .animate({
                           'opacity':1,
                            'margin-left':0
                        }, 400, "easeOutExpo");

                    isConfirm = false;
                });
        }
    }

    function closeform(){
        $("#overlayForm").fadeOut(250, function(){
            $(this).remove()
        });
    }

});