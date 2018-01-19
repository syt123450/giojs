import {JSONLoader} from "../dataLoaders/JSONLoader.js";
import {LiveLoader} from "../dataLoaders/LiveLoader.js";
import {AsyncLoader} from "../dataLoaders/AsyncLoader.js";

function DataHandler(controller) {

    var jsonLoader = new JSONLoader();
    var liveLoader = new LiveLoader();
    var asyncLoader = new AsyncLoader();

    function loadJSON(data) {
        jsonLoader.load(controller, data);
    }

    function loadAsync(url, callback) {
        asyncLoader.load(controller, url, callback);
    }

    function liveLoad(url, callback, milliseconds) {
        liveLoader.load(controller, url, callback, milliseconds);
    }

    function stopLiveLoader() {
        liveLoader.stop();
    }

    return {

        loadJSON: loadJSON,

        loadAsync: loadAsync,

        liveLoad: liveLoad,

        stopLiveLoader: stopLiveLoader
    }
}

export {DataHandler}