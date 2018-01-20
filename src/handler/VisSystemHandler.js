/**
 * @author syt123450 / https://github.com/syt123450
 */

import { VisSystem } from "../objects/VisSystem.js";

/**
 * This handler handle the update of VisSystem ( The system will be updated when clicked country changed ).
 */

function VisSystemHandler ( controller ) {

    function updateSystem () {

        // first remove the old object from rotating ( contains splines and moving sprites )

        controller.rotating.remove( controller.visualizationMesh );

        // create a new visualization mesh

        controller.visualizationMesh = new THREE.Object3D();
        var lines = VisSystem.getVisualizedMesh( controller );
        controller.visualizationMesh.add( lines );

        // add the new visualization mesh to rotating

        controller.rotating.add( controller.visualizationMesh );

    }

    return {

        updateSystem: updateSystem

    }

}

export { VisSystemHandler }