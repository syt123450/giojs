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

    $("#toStart").hover(function() {
        $("#toStart img").attr("src", "assets/images/getStart_hover.png");
    }, function() {
        $("#toStart img").attr("src", "assets/images/startIcon.png");
    });

    $("#toPlayground").hover(function() {
        $("#toPlayground img").attr("src", "assets/images/playground_hover.png");
    }, function() {
        $("#toPlayground img").attr("src", "assets/images/playgroundIcon.png");
    });

    $("#toGithub").hover(function() {
        $("#toGithub img").attr("src", "assets/images/github_hover.png");
    }, function() {
        $("#toGithub img").attr("src", "assets/images/github.png");
    });

    var container = document.getElementById("globeArea");
    var controller = new GIO.Controller(container);

    controller.configure({
        color: {

            surface: 0xFBFFF,
            selected: 0X05ffff,
            in: 0xFF8000,
            out: 0x03FF70,
            halo: 0x0D9EFF,
            background: 0x02223D
        }

    });

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