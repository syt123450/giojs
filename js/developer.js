$(document).ready(function(){
    $("#myBtn").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 650) {
                $('#myBtn').fadeIn();
            } else {
                $('#myBtn').fadeOut();
            }
        });

        $('#myBtn').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});

$(function() {
    $("#more").click(function() {
        $("#nav-collapse").slideToggle();
    });

    $("#navigation1").click(function () {
        $('html, body').animate({
            scrollTop: $("#pullRequest").offset().top
        }, 1000);
    }).hover(
        function() {
            $("#navigation1 img").attr("src", "../assets/images/goPullRequest_hover.png");
            $("#navigation1 p").css({color:'#29abe2'});
        },
        function() {
            $("#navigation1 img").attr("src", "../assets/images/goPullRequest.png");
            $("#navigation1 p").css({color:'#0071bc'});
        }
    );

    $("#navigation2").click(function () {
        $('html, body').animate({
            scrollTop: $("#structure").offset().top
        }, 1000);
    }).hover(
        function() {
            $("#navigation2 img").attr("src", "../assets/images/goStructure_hover.png");
            $("#navigation2 p").css({color:'#29abe2'});
        },
        function() {
            $("#navigation2 img").attr("src", "../assets/images/goStructure.png");
            $("#navigation2 p").css({color:'#0071bc'});
        }
    );

    $("#navigation3").click(function () {
        $('html, body').animate({
            scrollTop: $("#setup").offset().top
        }, 1000);
    }).hover(
        function() {
            $("#navigation3 img").attr("src", "../assets/images/goSetup_hover.png");
            $("#navigation3 p").css({color:'#29abe2'});
        }, function() {
            $("#navigation3 img").attr("src", "../assets/images/goSetup.png");
            $("#navigation3 p").css({color:'#0071bc'});
        }
    );

});