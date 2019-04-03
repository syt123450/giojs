/**
 * @author syt123450 / https://github.com/syt123450
 */

import { SceneEventManager } from "../managers/MouseEventManager.js";
import { ObjectUtils } from "../utils/ObjectUtils.js";
import { CountryData } from "../countryInfo/CountryData.js";
import { ProcessorManager } from "../managers/ProcessorManager";

/**
 * This handlers handle initialization task for controller.
 */

function InitHandler ( controller ) {

    var loadingIcon;

    function init () {

        initScene();
        animate();

    }

    // this function is used to initialize the data, object and status of the controller

    function initScene () {

        // init all scene objects

        initObjects();

        // init user's input data

        initData();
        
        // bind events to the dom

        ( new SceneEventManager() ).bindEvent( controller );

        // now the creation is finished, append the 3D object to the dom

        controller.container.appendChild( controller.renderer.domElement );

        // init object and action related to selected country

        initSelected();
        
        // init rotationHandler parameters
        
	    controller.rotationHandler.updateRotationConfig();

        // set finishing initialization sign

        controller.initialized = true;

    }

    // the animate function will be execute periodically

    function animate () {

        if ( controller.configure.control.stats ) {

            controller.stats.update();

        }

        controller.rotationHandler.update();

        controller.renderer.clear();
        controller.renderer.render( controller.scene, controller.camera );

        // update the moving sprite on the spline

        controller.rotating.traverse(

            function ( mesh ) {

                if ( mesh.update !== undefined ) {

                    mesh.update();

                }

            }

        );

        requestAnimationFrame( animate );

    }

    // create objects and add them to the scene

    function initObjects () {

        // create all the objects for the scene

        controller.renderer = ObjectUtils.createRenderer( controller.container, controller.configure.control.transparentBackground );
        controller.camera = ObjectUtils.createCamera( controller.container );
        controller.lights = ObjectUtils.createLights();

        controller.sphere = ObjectUtils.createSphere( controller );
        controller.halo = ObjectUtils.createHalo( controller );
        controller.haloShader = controller.halo.haloShader;
        controller.earthSurfaceShader = controller.sphere.earthSurfaceShader;

        controller.scene = ObjectUtils.createScene( controller );
        controller.rotating = new THREE.Object3D();

        // the stats object will only be created when "isStatsEnabled" in the configure is set to be true

        if ( controller.configure.control.stats ) {

            controller.stats = ObjectUtils.createStats( controller.container );
            controller.container.appendChild( controller.stats.dom );

        }

        // add objects to the scene

        for ( var i in controller.lights ) {

            controller.scene.add( controller.lights[ i ] );

        }

        controller.scene.add( controller.rotating );
        controller.rotating.add( controller.sphere );
        controller.scene.add( controller.camera );

        // halo must be add after adding the rotating object

        if ( controller.configure.control.halo === true ) {

            controller.scene.add( controller.halo );

        }

    }

    // pre-process the data

    function initData () {

        // set the first data processor on the "chain"

        controller.dataProcessor = ProcessorManager.getProcessorChain();

        // pre-processor the user's input data

        controller.dataProcessor.process(controller);
    }

    // init object and action related to selected country

    function initSelected () {

        // defined the initial country

        controller.selectedCountry = CountryData[ controller.configure.control.initCountry ];

        // create the visSystem based on the previous creation and settings

        controller.visSystemHandler.update();

        // rotate to the init country and highlight the init country

        controller.rotationHandler.rotateToTargetCountry();
        controller.surfaceHandler.highlightCountry( controller.selectedCountry[ "colorCode" ] );
    }

    return {

        init: init

    }

}

export { InitHandler }