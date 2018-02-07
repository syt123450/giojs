$(function () {

    var locationParas = window.location.href.split("#");
    if (locationParas[1] === "download") {
        $("#downloadNav").addClass("now");
    }

    $("#more").click(function () {
        $("#nav-collapse").slideToggle();
    });

    $("#toStart").click(function () {
        $('html, body').animate({
            scrollTop: $("#start").offset().top
        }, 1000);
    });

    $("#toPlayground").click(function () {
        window.location.href = "html/playground.html";
    });

    $("#toGithub").click(function () {
        window.location.href = "https://github.com/syt123450/Gio.js";
    });

    $("#downloadNav").click(function () {

        $("#downloadNav").addClass("now");

        $('html, body').animate({
            scrollTop: $("#download").offset().top
        }, 2000);
    });

    $("#smallDownLoad").click(function () {

        $("#nav-collapse").slideUp();

        $('html, body').animate({
            scrollTop: $("#download").offset().top
        }, 2000);
    });

    $("#logo").click(function () {
        window.location.href = "index.html";
    });

    var container = document.getElementById("globeArea");
    var controller = new GIO.Controller(container);

    $.ajax({

        url: "assets/data/countryData.json",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function (inputData) {

            controller.addData(inputData);
            controller.init();

        }

    });
});