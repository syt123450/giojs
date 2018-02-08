/**
 * @author syt123450 / https://github.com/syt123450
 */

import { Utils } from "../utils/Utils.js";

/**
 * This handlers handle the mouse wheel task.
 */

function WheelHandler ( controller ) {

    var nearPoint = 800;
    var farPoint = 2000;

    function handleMWheel ( delta ) {

        if ( controller.camera.position.z + delta * 100 <= nearPoint || controller.camera.position.z + delta * 100 >= farPoint) {

            // if no zoom in or zoom out wheel page

            // document.body.scrollTop += delta * 5;
            // document.documentElement.scrollTop += delta * 5;

        } else {

            // zoom in or zoom out the camera, its just like magnify or minify the globe
            // constrain camera to 1000 - 2000

            var positionZ = Utils.constrain( controller.camera.position.z + delta * 100, nearPoint, farPoint );
            controller.camera.position.set( 0, 0, positionZ );

        }

    }

    return {

        handleMWheel: handleMWheel

    }

}

export { WheelHandler }