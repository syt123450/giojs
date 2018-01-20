/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * This is the asynchronous loader, which can be used to load data asynchronous from a given url
 */

function AsyncLoader () {

    this.callback = null;

    var asyncLoader = this;

    function load( controller, url, callback ) {

        asyncLoader.callback = callback;

        var request = new XMLHttpRequest();
        request.open( 'GET', url, true );

        request.onreadystatechange = function () {

            if ( request.readyState === 4 && request.status === 200 ) {

                var data = JSON.parse( request.responseText );

                controller.inputData = JSON.parse( JSON.stringify( data ) );

                asyncLoader.callback( data );

            }

        };

        request.send( null );

    }

    return {

        load: load

    }

}

export { AsyncLoader }