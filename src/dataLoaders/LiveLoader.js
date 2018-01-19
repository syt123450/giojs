//in develop
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