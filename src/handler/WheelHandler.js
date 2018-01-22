/**
 * @author syt123450 / https://github.com/syt123450
 */

import { Utils } from "../utils/Utils.js";

/**
 * This handler handle the mouse wheel task.
 */

function WheelHandler ( controller ) {

    function handleMWheel ( delta ) {

        // zoom in or zoom out the camera, its just like magnify or minify the globe
        // constrain camera to 1000 - 2000

        var positionZ = Utils.constrain( controller.camera.position.z + delta * 100, 1000, 2000 );
        controller.camera.position.set( 0, 0, positionZ );

    }

    return {

        handleMWheel: handleMWheel

    }

}

export { WheelHandler }