$(function () {
    $("#more").click(function () {
        $("#nav-collapse").slideToggle();
    });

   $("#toStart").click(function () {
       window.location.href = "#start";
   });

   $("#toPlayground").click(function () {
       window.location.href = "html/playground.html";
   });

   $("#toGithub").click(function() {
        window.location.href = "https://github.com/syt123450/Gio.js";
   });

    var container = document.getElementById( "globeArea" );
    var controller = new GIO.Controller( container );

    $.ajax( {

        url: "assets/data/countryData.json",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function ( inputData ) {

            controller.addData( inputData );
            controller.init();

        }

    } );
});