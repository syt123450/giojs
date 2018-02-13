window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 650 || document.documentElement.scrollTop > 650) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}


function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$(function() {
    $("#more").click(function() {
        $("#nav-collapse").slideToggle();
    });

    $("#logo").click(function() {
        window.location.href = "../index.html";
    });

    $("#navigation1").click(function () {
        $('html, body').animate({
            scrollTop: $("#setup").offset().top
        }, 1000);
    });

    $("#navigation2").click(function () {
        $('html, body').animate({
            scrollTop: $("#structure").offset().top
        }, 1000);
    });

    $("#navigation3").click(function () {
        $('html, body').animate({
            scrollTop: $("#pullRequest").offset().top
        }, 1000);
    });

    $("#navigation1").hover(function() {
        $("#navigation1 img").attr("src", "../assets/images/goSetup_hover.png");
    }, function() {
        $("#navigation1 img").attr("src", "../assets/images/goSetup.png");
    });

    $("#navigation2").hover(function() {
        $("#navigation2 img").attr("src", "../assets/images/goStructure_hover.png");
    }, function() {
        $("#navigation2 img").attr("src", "../assets/images/goStructure.png");
    });

    $("#navigation3").hover(function() {
        $("#navigation3 img").attr("src", "../assets/images/goPullRequest_hover.png");
    }, function() {
        $("#navigation3 img").attr("src", "../assets/images/goPullRequest.png");
    });

});