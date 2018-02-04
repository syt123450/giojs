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

    $("#configureLable").click(function() {

        if (selectedUl !== "#configure") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#configure";
        $("#configure").slideToggle();
    });

    $("#designLabel").click(function() {

        if (selectedUl !== "#design") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#design";
        $("#design").slideToggle();
    });

    $("#colorLabel").click(function() {

        if (selectedUl !== "#color") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#color";
        $("#color").slideToggle();
    });

    $("#dataLabel").click(function() {

        if (selectedUl !== "#data") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#data";
        $("#data").slideToggle();
    });

    $("#callbackLabel").click(function() {

        if (selectedUl !== "#callback") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#callback";
        $("#callback").slideToggle();

    });

    $("#advancedLabel").click(function() {

        if (selectedUl !== "#advanced") {
            $(selectedUl).slideUp();
        }

        selectedUl = "#advanced";

        $("#advanced").slideToggle();
    });
});