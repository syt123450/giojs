/**
 * @author syt123450 / https://github.com/syt123450
 */

import { SceneEventManager } from "../eventManagers/SceneEventManager.js";
import { ObjectUtils } from "../utils/BasicObjectUtils.js";
import { Sphere } from "../objects/Sphere.js";
import { CountryData } from "../countryInfo/CountryData.js";

import { DefaultDataPreprocessor } from "../dataPreprocessors/DefaultDataProcessor.js";
import { TransformProcessor } from "../dataPreprocessors/TransformProcessor.js";
import { GeometryDataProcessor } from "../dataPreprocessors/GeometryDataProcessor.js";

import { Halo } from "../objects/Halo.js";
/**
 * This handler handle initialization task for controller.
 */

function InitHandler ( controller ) {

    function init () {

        initScene();
        animate();

    }

    // this function is used to initialize the data, object and status of the controller

    function initScene () {

        // if the loading image's src is configured, create it and append it to the dom

        if ( controller.configure.loadingSrc !== null ) {

            var loadingIcon = ObjectUtils.createLoading( controller );
            controller.container.appendChild( loadingIcon );

        }

        // create all the objects for the scene

        controller.renderer = ObjectUtils.createRenderer( controller.container );
        controller.camera = ObjectUtils.createCamera( controller.container );
        controller.lights = ObjectUtils.createLights();

        controller.sphere = new Sphere( controller );
        controller.halo = new Halo( controller );
        controller.haloShader = controller.halo.haloShader;
        controller.earthSurfaceShader = controller.sphere.earthSurfaceShader;
        
        controller.scene = new THREE.Scene();
        controller.rotating = new THREE.Object3D();

        // the stats object will only be created when "isStatsEnabled" in the configure is set to be true

        if ( controller.configure.isStatsEnabled ) {

            controller.stats = ObjectUtils.createStats( container );
            controller.container.appendChild( controller.stats.dom );

        }

        // defined the initial country

        controller.selectedCountry = CountryData[ controller.configure.selectedCountry ];
        
        // register data processors here

        var transformDataProcessor = new TransformProcessor();
        var defaultDataPreprocessor = new DefaultDataPreprocessor();

        // used to create basic geometry for splines and moving sprites

        var geometryDataProcessor = new GeometryDataProcessor();

        controller.dataProcessor = defaultDataPreprocessor;

        // set order of processors

        defaultDataPreprocessor.setSuccessor(transformDataProcessor);
        transformDataProcessor.setSuccessor(geometryDataProcessor);

        // pre-processor the user's input data

        defaultDataPreprocessor.process(controller);

        // add objects to the scene

        for ( var i in controller.lights ) {

            controller.scene.add( controller.lights[ i ] );

        }

        controller.scene.add( controller.rotating );
        controller.rotating.add( controller.sphere );
        controller.scene.add( controller.camera );

        // halo must be add after adding the rotating object

        controller.scene.add( controller.halo );
        
        // bind events to the dom

        ( new SceneEventManager ).bindEvent( controller );

        // create the visSystem based on the previous creation and settings


        controller.visSystemHandler.updateSystem();


        // now the creation is finished, append the 3D object to the dom

        controller.container.appendChild( controller.renderer.domElement );

        // remove loading, as the 3D object has shown in the browser

        if ( controller.configure.loadingSrc !== null ) {

            controller.container.removeChild( loadingIcon );

        }

        // rotate to the init country and highlight the init country

        controller.rotationHandler.rotateToTargetCountry();
        controller.surfaceHandler.highlightCountry( controller.selectedCountry[ "colorCode" ] );

        // set finishing initialization sign

        controller.initialized = true;

    }

    // the animate function will be execute periodically

    function animate () {

        if ( controller.configure.isStatsEnabled ) {

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

    return {

        init: init

    }

}

export { InitHandler }