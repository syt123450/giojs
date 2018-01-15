/**
 * Created by ss on 2018/1/7.
 */

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

function Controller(container) {

    this.container = container;
    this.configure = new Configure();

    this.rotationHandler = new RotationHandler(this);
    this.surfaceHandler = new SurfaceHandler(this);
    this.wheelHandler = new WheelHandler(this);
    this.visSystemHandler = new VisSystemHandler(this);
    this.switchCountryHandler = new SwitchCountryHandler(this);
    this.resizeHandler = new ResizeHandler(this);
    this.initHandler = new InitHandler(this);

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
        },

        setSurfaceColor: function (color) {
            controller.configure.surfaceColor = color;
            if (controller.earthSurfaceShader !== null) {
                controller.earthSurfaceShader.update();
            }
        },

        setSelectedColor: function (color) {
            controller.configure.clickedDifferent = true;
            controller.configure.clickedColor = color;
            if (controller.earthSurfaceShader !== null) {
                controller.earthSurfaceShader.update();
            }
        },

        getScene: function () {
            return controller.scene;
        },

        setInitCountry: function (ISOAbbr) {
            controller.selectedCountry = CountryData[ISOAbbr];
        },

        disableUnrelated: function (flag) {
            controller.configure.disableUnrelated = flag;
        },

        lightenMentioned: function (flag) {
            controller.configure.isLightenMentioned = flag;
        },

        setExportColor: function (color) {

            controller.configure.exportColor = color;
        },

        setImportColor: function (color) {

            controller.configure.importColor = color;
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
        },

        disableStats: function () {
            controller.configure.isStatsEnabled = false;
        },

        getStatsObject: function () {
            return controller.stats;
        },

        adjustRelatedBrightness: function (brightness) {

            controller.configure.relatedBrightness = brightness;
        },

        adjustOceanBrightness: function (brightness) {

            controller.configure.oceanBrightness = brightness;
        },

        adjustMentionedBrightness: function (brightness) {

            controller.configure.mentionedBrightness = brightness;
        },

        setLoadingSrc: function (src) {
            controller.configure.loadingSrc = src;
        },

        setStyle: function (style) {

        }
    }
}

export {Controller}