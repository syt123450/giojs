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
});