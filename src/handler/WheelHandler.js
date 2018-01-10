import {Utils} from "../utils/Utils";

function WheelHandler(scene) {

    function handleMWheel( delta ) {
        scene.camera.scale.z += delta * 0.1;
        scene.camera.scale.z = Utils.constrain( scene.camera.scale.z, 0.7, 5.0 );
    }

    return {
        handleMWheel: handleMWheel
    }
}

export {WheelHandler}