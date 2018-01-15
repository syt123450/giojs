/**
 * Created by ss on 2018/1/10.
 */

import {VisSystem} from "../objects/VisSystem.js";

function VisSystemHandler(controller) {

    function updateSystem() {
        controller.rotating.remove(controller.visualizationMesh);
        controller.visualizationMesh = new THREE.Object3D();
        var lines = VisSystem.getVisualizedMesh(controller);
        controller.visualizationMesh.add(lines);
        controller.rotating.add(controller.visualizationMesh);
    }

    return {
        updateSystem: updateSystem,
    }
}

export {VisSystemHandler}