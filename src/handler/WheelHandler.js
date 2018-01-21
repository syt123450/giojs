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

        controller.camera.scale.z += delta * 0.1;
        controller.camera.scale.z = Utils.constrain( controller.camera.scale.z, 0.7, 5.0 );

    }

    return {

        handleMWheel: handleMWheel

    }

}

export { WheelHandler }