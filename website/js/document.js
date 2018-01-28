$(function() {

    var selectedUl;

    $("#more").click(function() {
        $("#nav-collapse").slideToggle();
    });

    $("#logo").click(function() {
        window.location.href = "../index.html";
    });

    $("#startLabel").click(function() {

        if (selectedUl !== "#start") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#start";
        $("#start").slideToggle();
    });

    $("#basicLabel").click(function() {

        if (selectedUl !== "#basic") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#basic";
        $("#basic").slideToggle();
    });

    $("#designLabel").click(function() {

        if (selectedUl !== "#design") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#design";
        $("#design").slideToggle();
    });

    $("#dataLabel").click(function() {

        if (selectedUl !== "#data") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#data";
        $("#data").slideToggle();
    });

    $("#advancedLabel").click(function() {

        if (selectedUl !== "#advanced") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#advanced";

        $("#advanced").slideToggle();
    });
});