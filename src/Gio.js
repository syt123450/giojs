/**
 * Created by ss on 2018/1/7.
 */

import {} from "./style/StyleConfigure";
import {CountryData} from "./countryInfo/CountryData.js";
import {JSONLoader} from "./dataLoaders/JSONLoader.js";
import {Marker} from "./markers/Marker.js";
import {SurfaceHandler} from "./handler/SurfaceHandler.js";
import {RotationHandler} from "./handler/RotationHandler.js";
import {WheelHandler} from "./handler/WheelHandler.js";
import {VisSystemHandler} from "./handler/VisSystemHandler.js";
import {SwitchCountryHandler} from "./handler/SwitchCountryHandler.js";
import {ResizeHandler} from "./handler/ResizeHandler.js";
import {InitHandler} from "./handler/InitHandler.js";
import {Configure} from "./configure/Configure.js";
import {ConfigureHandler} from "./handler/ConfigureHandler.js";

function Controller(container, configureObject) {

    this.container = container;
    this.constructorConfigure = configureObject;

    this.configure = new Configure();

    this.configureHandler = new ConfigureHandler(this);
    this.rotationHandler = new RotationHandler(this);
    this.surfaceHandler = new SurfaceHandler(this);
    this.wheelHandler = new WheelHandler(this);
    this.visSystemHandler = new VisSystemHandler(this);
    this.switchCountryHandler = new SwitchCountryHandler(this);
    this.resizeHandler = new ResizeHandler(this);
    this.initHandler = new InitHandler(this);

    this.configureHandler.configureConstructor();

    this.visualizationMesh = null;
    this.renderer = null;
    this.camera = null;
    this.lights = null;

    this.scene = null;
    this.rotating = null;
    this.sphere = null;
    this.earthSurfaceShader = null;
    this.inputData = null;

    this.mentionedCountryCodes = [];
    this.relatedCountries = [];

    this.selectedCountry = CountryData["CN"];

    this.stats = null;

    var controller = this;

    return {

        init: controller.initHandler.init,

        addData: function (data) {
            JSONLoader.loadData(controller, data);

            return controller;
        },

        setSurfaceColor: function (color) {
            controller.configure.surfaceColor = color;
            if (controller.earthSurfaceShader !== null) {
                controller.earthSurfaceShader.update();
            }

            return controller;
        },

        setSelectedColor: function (color) {
            controller.configure.clickedDifferent = true;
            controller.configure.clickedColor = color;
            if (controller.earthSurfaceShader !== null) {
                controller.earthSurfaceShader.update();
            }

            return controller;
        },

        getScene: function () {
            return controller.scene;
        },

        setInitCountry: function (ISOAbbr) {
            controller.selectedCountry = CountryData[ISOAbbr];

            return controller;
        },

        disableUnrelated: function (flag) {
            controller.configure.disableUnrelated = flag;

            return controller;
        },

        lightenMentioned: function (flag) {
            controller.configure.isLightenMentioned = flag;

            return controller;
        },

        setExportColor: function (color) {

            controller.configure.exportColor = color;

            return controller;
        },

        setImportColor: function (color) {

            controller.configure.importColor = color;

            return controller;
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

        enableStats: function () {
            controller.configure.isStatsEnabled = true;

            return controller;
        },

        disableStats: function () {
            controller.configure.isStatsEnabled = false;

            return controller;
        },

        getStatsObject: function () {
            return controller.stats;
        },

        adjustRelatedBrightness: function (brightness) {

            controller.configure.relatedBrightness = brightness;

            return controller;
        },

        adjustOceanBrightness: function (brightness) {

            controller.configure.oceanBrightness = brightness;

            return controller;
        },

        adjustMentionedBrightness: function (brightness) {

            controller.configure.mentionedBrightness = brightness;

            return controller;
        },

        setLoadingSrc: function (src) {
            controller.configure.loadingSrc = src;

            return controller;
        },

        setStyle: function (style) {

            controller.configureHandler.configureStyle(style);

            return controller;
        },

        configureJSON: function(configure) {

            controller.configureHandler.configureJSON(configure);

            return controller;
        }
    }
}

export {Controller}