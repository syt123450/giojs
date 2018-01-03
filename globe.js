/**
 * Created by ss on 2018/1/2.
 */
Globe = function(container) {

    var mapIndexedImage;
    var mapOutlineImage;

    this.container = container;

    this.addData = function() {

    };

    this.init = function() {
        mapIndexedImage = new Image();
        mapIndexedImage.src = 'assets/map_indexed.png';
        mapIndexedImage.onload = function() {
            mapOutlineImage = new Image();
            mapOutlineImage.src = 'assets/map_outline.png';
            mapOutlineImage.onload = function(){
                initScene();
            };
        };
    };

    function onClick() {
        clickCountry();
    }

    function clickCountry() {

        //update parameters

        highlightCountry();
        generateLines();
        generatePartial();
        initMarker();
    }

    function highlightCountry() {

    }

    function generateLines() {

    }

    function generatePartial() {

    }

    function initMarker() {

    }


};