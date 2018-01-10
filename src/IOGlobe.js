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

function Scene(container) {

    var reversedCountryColorMap = new CountryColorMap();

    var countryData = new CountryData();

    var selectedCountry = countryData["CN"];

    var lights = new Lights();
    var camera = new Camera();
    var scene = new THREE.Scene();
    var renderer = new Renderer();
    var rotating = new THREE.Object3D();
    var sphere = new Sphere();

    var inputData = [];

    var rotationHandler = new RotationHandler(this);
    var surfaceHandler = new SurfaceHandler(this);
    var wheelHandler = new WheelHandler(this);

    var visualizationMesh;

    function init () {

        initScene();
        animate();
    }

    function initScene() {

        LineGeometry.buildDataVizGeometries(inputData, countryData);

        for (var i in lights) {
            scene.add(lights[i]);
        }

        scene.add(rotating);

        rotating.add(sphere);

        visualizationMesh = new THREE.Object3D();
        rotating.add(visualizationMesh);

        var lines = VisSystem.getVisualizedMesh(inputData);
        visualizationMesh.add(lines);

        container.appendChild(renderer.domElement);

        scene.add(camera);

        rotationHandler.rotateToTargetCountry();
        surfaceHandler.highlightCountry(96);
    }

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.rotating = rotating;
    this.earthSurfaceShader = sphere.earthSurfaceShader;

    this.setSelectedCountry = function(pickColorIndex) {
        selectedCountry = countryData[reversedCountryColorMap[pickColorIndex]]
    };

    this.getSelectedCountry = function() {
        return selectedCountry;
    };

    var sceneEventManager = new SceneEventManager(this, {
        surfaceHandler: surfaceHandler,
        rotationHandler: rotationHandler,
        wheelHandler: wheelHandler
    });

    function animate() {

        rotationHandler.update();

        renderer.clear();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);

        THREE.SceneUtils.traverseHierarchy(rotating,
            function (mesh) {
                if (mesh.update !== undefined) {
                    mesh.update();
                }
            }
        );
    }

    return {
        addData: function(data) {
            JSONLoader.loadData(inputData, data);
        },

        init: init
    }
}

export {Scene}