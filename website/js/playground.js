var GIO;

(function( GIO ){

    (function(Website){

        (function(Playground){


            function registerListeners()
            {

                $("#more").click(function() {
                    $("#nav-collapse").slideToggle();
                });

                $("#logo").click(function() {
                    window.location.href = "../index.html";
                });

            }

            function initilize()
            {
                // get the container to hold the IO globe

                var container = document.getElementById( "globalArea" );

                // create controller for the IO globe, input the container as the parameter

                var controller = new GIO.Controller( container );

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

            Playground.initilize = initilize;
            Playground.registerListeners = registerListeners;

        })(Website.Playground || (Website.Playground = {}));


    })(GIO.Website || (GIO.Website = {}));

})(GIO || (GIO = {}));



$(function() {

    GIO.Website.Playground.initilize();
    GIO.Website.Playground.registerListeners();

});




