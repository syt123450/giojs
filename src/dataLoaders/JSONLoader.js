/**
 * Created by ss on 2018/1/7.
 */

function JSONLoader () {

    function load( controller, data ) {

        controller.inputData = JSON.parse( JSON.stringify( data ) );

    }

    return {

        load: load

    }

}

export { JSONLoader }