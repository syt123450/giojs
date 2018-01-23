/**
 * @author syt123450 / https://github.com/syt123450
 */

import { AsyncLoader } from "./AsyncLoader.js";

/**
 * This is a live loader, which can be used to load data from a url and refresh the data in the controller
 */

// still in develop

function LiveLoader () {

    this.callback = null;
    this.milliseconds = 5000;

    this.url = null;

    this.intervalHandle = null;
    this.controller = null;

    this.controller = null;

    this.asyncLoader = new AsyncLoader();

    var liveLoader = this;

    function load ( controller, url, callback, milliseconds ) {

        liveLoader.controller = controller;
        liveLoader.url = url;
        liveLoader.callback = callback;
        liveLoader.milliseconds = milliseconds;

        liveLoader.intervalHandle = setInterval( function () {

            loopCall();

        }, liveLoader.milliseconds );

    }

    function loopCall () {

        liveLoader.asyncLoader.load( liveLoader.controller, liveLoader.url, updateSystem );

        if ( liveLoader.callback !== null ) {

            liveLoader.callback();

        }

    }

    function updateSystem () {

        if ( liveLoader.controller.initialized === true ) {

            liveLoader.controller.dataProcessor.process();
            liveLoader.controller.visSystemHandler.update();
            liveLoader.controller.surfaceHandler.update();

        }

    }

    function stop () {

        window.clearInterval( liveLoader.intervalHandle );

    }

    return {

        load: load,

        stop: stop

    }

}

export { LiveLoader }