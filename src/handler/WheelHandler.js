import {Utils} from "../utils/Utils";

function WheelHandler(controller) {

    function handleMWheel( delta ) {
        controller.camera.scale.z += delta * 0.1;
        controller.camera.scale.z = Utils.constrain( controller.camera.scale.z, 0.7, 5.0 );
    }

    return {
        handleMWheel: handleMWheel
    }
}

export {WheelHandler}