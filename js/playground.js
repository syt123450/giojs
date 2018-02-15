var GIO;

(function( GIO ){

    (function(Website){

        (function(Playground){

            var controller;

            var colorPickerHandlerDict = {};

            var sliderHandlerDict = {};

            const MODAL_HELP_MODE = "HELP";
            const MODAL_CONFIG_MODE = "CONFIG";

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
                        // rotate icon
                        $(this).children("img").rotate(90);
                    }
                    else
                    {
                        $(this).siblings("ul").slideToggle();
                        $(this).attr("isFold", "true");
                        // rotate icon
                        $(this).children("img").rotate(0);
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

                // register button listeners

                $(document).on("click", "#ctlGenerateBtn", function(){

                    // show current conig in JSON format in pop up
                    showModal(MODAL_CONFIG_MODE);

                });

                $(document).on("click", "#ctlHelpBtn", function(){
                    showModal(MODAL_HELP_MODE);
                });

                $(document).on("click", ".plg-close-button", function(){
                    closeModal();
                });


                function closeModal()
                {
                    var modal = document.querySelector(".plg-modal");
                    
                    $(modal).children(".plg-modal-content").each(function(index) {
                        $(this).get(0).classList.remove("plg-show-modal-content");
                    })

                    modal.classList.remove("plg-show-modal");
                }

                function showModal(mode)
                {
                    var modal = document.querySelector(".plg-modal");

                    switch(mode)
                    {
                        case MODAL_HELP_MODE:
                            var $configJSONHolder = $("#helperTextHolder");
                            $configJSONHolder.get(0).classList.add("plg-show-modal-content");
                            break;
                        case MODAL_CONFIG_MODE:
                            var config = controller.getConfig();
                            var playgroundConfig = {};

                            playgroundConfig.control = config.control;
                            playgroundConfig.color = config.color;
                            playgroundConfig.brightness = config.brightness;

                            var $configJSONHolder = $("#configJSONHolder");
                            $configJSONHolder.find(".plg-modal-text").text(JSON.stringify(playgroundConfig, null, "\t"));
                            $configJSONHolder.get(0).classList.add("plg-show-modal-content");
                            break;

                    }

                    modal.classList.add("plg-show-modal");
                }

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

                Playground.controller = controller;
                
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

            Playground.initilize = initilize;
            Playground.registerListeners = registerListeners;
            Playground.colorPickerListener = colorPickerListener;

        })(Website.Playground || (Website.Playground = {}));


    })(GIO.Website || (GIO.Website = {}));

})(GIO || (GIO = {}));



$(function() {

    GIO.Website.Playground.initilize();
    GIO.Website.Playground.registerListeners();

    // set initial styles

    GIO.Website.Playground.controller.setSurfaceColor(GIO.Website.Util.formatColor('#' + "1A9CB0"));
    GIO.Website.Playground.controller.setImportColor(GIO.Website.Util.formatColor('#' + "FFFFFF"));
    GIO.Website.Playground.controller.setSelectedColor(GIO.Website.Util.formatColor('#' + "20ABE2"));
    GIO.Website.Playground.controller.setExportColor(GIO.Website.Util.formatColor('#' + "20ABE2"));
    GIO.Website.Playground.controller.setHaloColor(GIO.Website.Util.formatColor('#' + "20ABE2"));
    GIO.Website.Playground.controller.setBackgroundColor(GIO.Website.Util.formatColor('#' + "000000"));

});


