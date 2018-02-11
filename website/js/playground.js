var GIO;

(function( GIO ){

    (function(Website){

        (function(Playground){

            var controller;

            var colorPickerHandlerDict = {};

            var sliderHandlerDict = {};

            function registerListeners()
            {

                // navigation

                $("#more").click(function() {
                    $("#nav-collapse").slideToggle();
                });

                $("#logo").click(function() {
                    window.location.href = "../index.html";
                });

                // control panel

                $(document).on("click", ".ctl-panel-header", function(){

                    // toggle fold / drop status

                    if($(this).attr("isFold") === "true")
                    {
                        $(this).siblings("ul").slideToggle();
                        $(this).attr("isFold", "false");
                        // $(this).children("img").
                    }
                    else
                    {
                        $(this).siblings("ul").slideToggle();
                        $(this).attr("isFold", "true");
                    }

                });

                $(document).on("click", "#ctlInOnly", function(){

                    if($(this).prop("checked"))
                    {
                        controller.showInOnly( true );
                    }
                    else
                    {
                        controller.showInOnly( false );
                    }
                });

                $(document).on("click", "#ctlOutOnly", function(){

                    if($(this).prop("checked"))
                    {
                        controller.showOutOnly( true );
                    }
                    else
                    {
                        controller.showOutOnly( false );
                    }
                });

                $(document).on("click", "#ctlHalo", function(){

                    if($(this).prop("checked"))
                    {
                        controller.addHalo();
                    }
                    else
                    {
                        controller.removeHalo();
                    }
                });

                $(document).on("click", "#ctlLightenActives", function(){

                    if($(this).prop("checked"))
                    {
                        controller.lightenMentioned(true);
                    }
                    else
                    {
                        controller.lightenMentioned(false);
                    }
                });

                $(document).on("click", "#ctlDisableInactives", function(){

                    if($(this).prop("checked"))
                    {
                        controller.disableUnmentioned(true);
                    }
                    else
                    {
                        controller.disableUnmentioned(false);
                    }
                });

                $(document).on("click", "#ctlShowStats", function(){

                    if($(this).prop("checked"))
                    {
                        controller.enableStats();
                    }
                    else
                    {
                        controller.disableStats();
                    }
                });

                // register slider event listener

                $(document).on("input", ".ctl-slider", function(){

                    sliderListener(this);

                });


                // register color picker handlers

                colorPickerHandlerDict["ctlSurfaceColor"] = (function(color){
                    controller.setSurfaceColor(color);
                });

                colorPickerHandlerDict["ctlSelectedColor"] = (function(color){
                    controller.setSelectedColor(color);
                });

                colorPickerHandlerDict["ctlInputLineColor"] = (function(color){
                    controller.setImportColor(color);
                });

                colorPickerHandlerDict["ctlOutputLineColor"] = (function(color){
                    controller.setExportColor(color);
                });

                colorPickerHandlerDict["ctlHaloColor"] = (function(color){
                    controller.setHaloColor(color);
                });

                colorPickerHandlerDict["ctlBackgroundColor"] = (function(color){
                    controller.setBackgroundColor(color);
                });


                // register brightness slider handlers

                sliderHandlerDict["ctlOceanBrightness"] =  (function(sliderValue){
                    controller.adjustOceanBrightness(sliderValue);
                });

                sliderHandlerDict["ctlActiveBrightness"] =  (function(sliderValue){
                    controller.adjustMentionedBrightness(sliderValue);
                });

                sliderHandlerDict["ctlRelatedBrightness"] =  (function(sliderValue){
                    controller.adjustRelatedBrightness(sliderValue);
                });


            }

            function initilize()
            {
                // get the container to hold the IO globe

                var container = document.getElementById( "globalArea" );

                // create controller for the IO globe, input the container as the parameter

                controller = new GIO.Controller( container );

                // ask a file for the JSON data, using AJAX to load the data

                $.ajax( {

                    url: "../assets/data/countryData.json",
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    dataType: "json",
                    success: function ( inputData ) {

                        // if received the data, use addData() API to add the the data to the controller

                        controller.addData( inputData );

                        // call the init() API to show the IO globe in the browser

                        controller.init();

                    }

                } );  
                
            }

            // a listener in charge of all color pickers' events

            function colorPickerListener(picker) {
                
                // 'jscolor' instance can be used as a string

                var jscolor = picker.jscolor;

                var id = $(picker).attr("id");

                var handler = colorPickerHandlerDict[id];

                var formattedColor = GIO.Website.Util.formatColor('#' + jscolor);

                handler(formattedColor);

                console.log('#' + jscolor);
            }

            // a listener responses when slider value changes 

            function sliderListener(slider) {
                
                var sliderValue = slider.value / 100;

                var id = $(slider).attr("id");

                var handler = sliderHandlerDict[id];

                handler(sliderValue);

            }

            // expose

            Playground.controller = controller;
            Playground.initilize = initilize;
            Playground.registerListeners = registerListeners;
            Playground.colorPickerListener = colorPickerListener;

        })(Website.Playground || (Website.Playground = {}));


    })(GIO.Website || (GIO.Website = {}));

})(GIO || (GIO = {}));



$(function() {

    GIO.Website.Playground.initilize();
    GIO.Website.Playground.registerListeners();

});


