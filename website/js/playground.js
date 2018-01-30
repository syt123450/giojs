var GIO;

(function( GIO ){

    (function(Website){

        (function(Playground){

            var controller;

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

            // expose
            Playground.controller = controller;
            Playground.initilize = initilize;
            Playground.registerListeners = registerListeners;

        })(Website.Playground || (Website.Playground = {}));


    })(GIO.Website || (GIO.Website = {}));

})(GIO || (GIO = {}));



$(function() {

    GIO.Website.Playground.initilize();
    GIO.Website.Playground.registerListeners();

});




