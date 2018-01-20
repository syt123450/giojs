/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * This is a live loader, which can be used to load data from a url and refresh the data in the controller
 */

// still in develop

function LiveLoader () {

    this.callback = null;
    this.milliseconds = 5000;

    this.intervalHandle = null;

    var liveLoader = this;

    function load ( controller, url, callback, milliseconds ) {

        liveLoader.callback = callback;
        liveLoader.milliseconds = milliseconds;

        controller.configure.liveLoad = true;

    }

    function loopCall () {

    }

    function stop () {

        controller.configure.liveLoad = false;

    }

    return {

        load: load,

        stop: stop

    }

}

export { LiveLoader }