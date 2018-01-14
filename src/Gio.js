/**
 * Created by ss on 2018/1/7.
 */

import {CountryData} from "./countryInfo/CountryData.js";
import {JSONLoader} from "./dataLoaders/JSONLoader.js";
import {Marker} from "./markers/Marker.js";
import {SceneEventManager} from "./eventManagers/SceneEventManager.js";
import {SurfaceHandler} from "./handler/SurfaceHandler";
import {RotationHandler} from "./handler/RotationHandler";
import {WheelHandler} from "./handler/WheelHandler";
import {Sphere} from "./objects/Sphere";
import {LineGeometry} from "./objects/LineGeometry";
import {DefaultDataPreprocessors} from "./dataPreprocessors/DefaultDataPreprocessors.js";
import {VisSystemHandler} from "./handler/VisSystemHandler.js";
import {SwitchCountryHandler} from "./handler/SwitchCountryHandler";
import {ResizeHandler} from "./handler/ResizeHandler";
import {ObjectUtils} from "./utils/BasicObjectUtils.js";

function Controller(container) {

    this.container = container;

    this.rotationHandler = new RotationHandler(this);
    this.surfaceHandler = new SurfaceHandler(this);
    this.wheelHandler = new WheelHandler(this);
    this.visSystemHandler = new VisSystemHandler(this);
    this.switchCountryHandler = new SwitchCountryHandler(this);
    this.resizeHandler = new ResizeHandler(this);

    this.visualizationMesh = null;
    this.renderer = null;
    this.camera = null;
    this.lights = null;

    this.scene = null;
    this.rotating = null;
    this.sphere = null;
    this.earthSurfaceShader = null;
    this.inputData = null;
    this.disableUnrelated = false;
    this.isLightenMentioned = false;

    this.mentionedCountryCodes = [];
    this.relatedCountries = [];

    this.selectedCountry = CountryData["CN"];

    this.stats = null;
    this.isStatsEnabled = false;

    this.loadingSrc = null;

    var controller = this;

    function init() {

        initScene();
        animate();
    }

    function initScene() {

        var loadingIcon = ObjectUtils.createLoading(controller);
        controller.container.appendChild(loadingIcon);

        controller.renderer = ObjectUtils.createRenderer(controller.container);
        controller.camera = ObjectUtils.createCamera(controller.container);
        controller.lights = ObjectUtils.createLights();

        controller.scene = new THREE.Scene();
        controller.rotating = new THREE.Object3D();
        controller.sphere = new Sphere();
        controller.earthSurfaceShader = controller.sphere.earthSurfaceShader;

        if (controller.isStatsEnabled) {
            controller.stats = ObjectUtils.createStats(container);
        }

        DefaultDataPreprocessors.process(controller);

        LineGeometry.buildDataVizGeometries(controller);

        for (var i in controller.lights) {
            controller.scene.add(controller.lights[i]);
        }

        controller.scene.add(controller.rotating);

        controller.rotating.add(controller.sphere);

        controller.scene.add(controller.camera);

        container.appendChild(controller.renderer.domElement);

        controller.container.removeChild(loadingIcon);

        (new SceneEventManager).bindEvent(controller);

        controller.visSystemHandler.updateSystem();
        controller.rotationHandler.rotateToTargetCountry();
        controller.surfaceHandler.highlightCountry(controller.selectedCountry["colorCode"]);
    }

    function animate() {

        if (controller.isStatsEnabled) {
            controller.stats.update();
        }

        controller.rotationHandler.update();

        controller.renderer.clear();
        controller.renderer.render(controller.scene, controller.camera);

        THREE.SceneUtils.traverseHierarchy(controller.rotating,
            function (mesh) {
                if (mesh.update !== undefined) {
                    mesh.update();
                }
            }
        );

        requestAnimationFrame(animate);
    }

    return {

        init: init,

        addData: function (data) {
            JSONLoader.loadData(controller, data);
        },

        setSurfaceColor: controller.surfaceHandler.setSurfaceColor,

        setSelectedColor: controller.surfaceHandler.setSelectedColor,

        getScene: function () {
            return controller.scene;
        },

        setInitCountry: function (ISOAbbr) {
            controller.selectedCountry = CountryData[ISOAbbr];
        },

        disableUnrelated: function (flag) {
            controller.disableUnrelated = flag;
        },

        lightenMentioned: function (flag) {
            controller.isLightenMentioned = flag;
        },

        setExportColor: function (color) {
            controller.visSystemHandler.setExportColor(color);
        },

        setImportColor: function (color) {
            controller.visSystemHandler.setImportColor(color);
        },

        getSelectedCountry: function () {
            return controller.selectedCountry;
        },

        getRelatedCountries: function () {
            return controller.relatedCountries;
        },

        onCountryPicked: function (callBack) {
            controller.switchCountryHandler.setCountryPickCallBack(callBack);
        },

        enableStats: function() {
            controller.isStatsEnabled = true;
        },

        disableStats: function() {
            controller.isStatsEnabled = false;
        },

        getStatsObject: function() {
            return controller.stats;
        },

        adjustRelatedBrightness: function (brightness) {

        },

        adjustOceanBrightness: function (brightness) {

        },

        adjustMentionedBrightness: function (brightness) {

        },

        setLoadingSrc: function(src) {
            controller.loadingSrc = src;
        }
    }
}

export {Controller}