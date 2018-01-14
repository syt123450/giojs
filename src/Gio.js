/**
 * Created by ss on 2018/1/7.
 */

import {CountryData} from "./countryInfo/CountryData.js";
import {JSONLoader} from "./dataLoaders/JSONLoader.js";
import {Marker} from "./markers/Marker.js";
import {SurfaceHandler} from "./handler/SurfaceHandler";
import {RotationHandler} from "./handler/RotationHandler";
import {WheelHandler} from "./handler/WheelHandler";
import {VisSystemHandler} from "./handler/VisSystemHandler.js";
import {SwitchCountryHandler} from "./handler/SwitchCountryHandler";
import {ResizeHandler} from "./handler/ResizeHandler";
import {InitHandler} from "./handler/InitHandler";

function Controller(container) {

    this.container = container;

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
    this.disableUnrelated = false;
    this.isLightenMentioned = false;

    this.mentionedCountryCodes = [];
    this.relatedCountries = [];

    this.selectedCountry = CountryData["CN"];

    this.stats = null;
    this.isStatsEnabled = false;

    this.loadingSrc = null;

    var controller = this;

    return {

        init: controller.initHandler.init,

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
            controller.surfaceHandler.adjustRelatedBrightness(brightness);
        },

        adjustOceanBrightness: function (brightness) {
            controller.surfaceHandler.adjustOceanBrightness(brightness);
        },

        adjustMentionedBrightness: function (brightness) {
            controller.surfaceHandler.adjustMentionedBrightness(brightness);
        },

        setLoadingSrc: function(src) {
            controller.loadingSrc = src;
        }
    }
}

export {Controller}