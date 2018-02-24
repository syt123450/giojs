/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * This is a JSON loader which can load JSON data into the controller
 */

function JSONLoader () {

    function load ( controller, data ) {

        if ( data === undefined || data === null ) {

            data = [];

        }

        controller.inputData = JSON.parse( JSON.stringify( data ) );

    }

    return {

        load: load

    }

}

export { JSONLoader }