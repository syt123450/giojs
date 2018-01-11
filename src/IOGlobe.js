/**
 * Created by ss on 2018/1/7.
 */

import {CountryColorMap} from "./countryInfo/CountryColorMap";
import {CountryData} from "./countryInfo/CountryData.js";
import {JSONLoader} from "./dataLoaders/JSONLoader.js";
import {Marker} from "./markers/Marker.js";
import {VisSystem} from "./objects/VisSystem.js";
import {SceneEventManager} from "./eventManagers/SceneEventManager.js";
import {SurfaceHandler} from "./handler/SurfaceHandler";
import {RotationHandler} from "./handler/RotationHandler";
import {Lights} from "./objects/Lights";
import {Camera} from "./objects/Camera";
import {Renderer} from "./objects/Renderer";
import {WheelHandler} from "./handler/WheelHandler";
import {Sphere} from "./objects/Sphere";
import {LineGeometry} from "./objects/LineGeometry";
import {DefaultDataPreprocessors} from "./dataPreprocessors/DefaultDataPreprocessors.js";

function Controller(container) {

    var rotationHandler = new RotationHandler(this);
    var surfaceHandler = new SurfaceHandler(this);
    var wheelHandler = new WheelHandler(this);

    var visualizationMesh;

    this.renderer = new Renderer();
    this.camera = new Camera();
    this.lights = new Lights();
    this.scene = new THREE.Scene();
    this.rotating = new THREE.Object3D();
    this.sphere = new Sphere();
    this.earthSurfaceShader = this.sphere.earthSurfaceShader;
    this.inputData = null;
    this.disableUnrelated = false;

    this.mentionedCountryCodes = [];
    this.relatedCountries = [];

    this.selectedCountry = CountryData["CN"];

    var sceneEventManager = new SceneEventManager(this, {
        surfaceHandler: surfaceHandler,
        rotationHandler: rotationHandler,
        wheelHandler: wheelHandler
    });

    var controller = this;

    function init () {

        initScene();
        animate();
    }

    function initScene() {

        DefaultDataPreprocessors.process(controller);

        LineGeometry.buildDataVizGeometries(controller);

        for (var i in controller.lights) {
            controller.scene.add(controller.lights[i]);
        }

        controller.scene.add(controller.rotating);

        controller.rotating.add(controller.sphere);

        visualizationMesh = new THREE.Object3D();
        controller.rotating.add(visualizationMesh);

        var lines = VisSystem.getVisualizedMesh(controller);
        visualizationMesh.add(lines);

        container.appendChild(controller.renderer.domElement);

        controller.scene.add(controller.camera);

        rotationHandler.rotateToTargetCountry();
        surfaceHandler.highlightCountry(controller.selectedCountry["colorCode"]);
    }

    function animate() {

        rotationHandler.update();

        controller.renderer.clear();
        controller.renderer.render(controller.scene, controller.camera);

        requestAnimationFrame(animate);

        THREE.SceneUtils.traverseHierarchy(controller.rotating,
            function (mesh) {
                if (mesh.update !== undefined) {
                    mesh.update();
                }
            }
        );
    }

    function loadData(data) {
        JSONLoader.loadData(controller, data);
    }

    return {

        addData: loadData,

        init: init,

        setSurfaceColor: surfaceHandler.setSurfaceColor,

        setSelectedColor: surfaceHandler.setSelectedColor,

        getScene: function() {
            return controller.scene;
        },

        setInitCountry: function(ISOAbbr) {
            controller.selectedCountry = CountryData[ISOAbbr];
        },

        disableUnrelated: function(flag) {
            controller.disableUnrelated = flag;
        }
    }
}

export {Controller}