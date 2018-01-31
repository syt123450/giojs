/**
 * @author syt123450 / https://github.com/syt123450
 */

import { JSONLoader } from "../dataLoaders/JSONLoader.js";
import { LiveLoader } from "../dataLoaders/LiveLoader.js";
import { AsyncLoader } from "../dataLoaders/AsyncLoader.js";

/**
 * This handlers handle all data load related task for controller.
 */

function DataHandler ( controller ) {

    // the dataHandler will initialize all loader's instance

    var jsonLoader = new JSONLoader();
    var liveLoader = new LiveLoader();
    var asyncLoader = new AsyncLoader();

    function loadJSON ( data ) {

        // jsonLoader is the proxy of loadJSON task

        jsonLoader.load( controller, data );

    }

    function loadAsync ( url, callback ) {

        // asyncLoader is the proxy of loadAsync task

        asyncLoader.load( controller, url, callback );

    }

    function liveLoad( url, callback, milliseconds ) {

        // liveLoader is the proxy of liveLoad task

        liveLoader.load( controller, url, callback, milliseconds );

    }

    // as liveLoader will load data periodically, this API is used to stop the liveLoader

    function stopLiveLoader () {

        liveLoader.stop();

    }

    return {

        loadJSON: loadJSON,

        loadAsync: loadAsync,

        liveLoad: liveLoad,

        stopLiveLoader: stopLiveLoader

    }

}

export { DataHandler }