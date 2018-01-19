/**
 * Created by ss on 2018/1/7.
 */

import {} from "./style/StyleConfigure.js";
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
import {DataHandler} from "./handler/DataHandler.js";

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
    this.dataHandler = new DataHandler(this);

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

    this.selectedCountry = null;

    this.stats = null;

    var controller = this;

    return {

        init: function() {

            controller.initHandler.init();

            return this;
        },

        addData: function (data) {

            controller.dataHandler.loadJSON(data);

            return this;
        },

        addDataAsync: function (url, callback) {

            controller.dataHandler.loadAsync(url, callback);

            return this;
        },

        addLiveData: function (url, callback, milliseconds) {

            controller.dataHandler.liveLoad(url, callback, milliseconds);

            return this;
        },

        setSurfaceColor: function (color) {
            controller.configure.surfaceColor = color;
            controller.surfaceHandler.update();

            return this;
        },

        setSelectedColor: function (color) {
            controller.configure.clickedDifferent = true;
            controller.configure.clickedColor = color;
            controller.surfaceHandler.update();

            return this;
        },

        getScene: function () {
            return controller.scene;
        },

        setInitCountry: function (ISOAbbr) {
            controller.configure.selectedCountry = ISOAbbr;

            return this;
        },

        disableUnrelated: function (flag) {
            controller.configure.disableUnrelated = flag;

            return this;
        },

        lightenMentioned: function (flag) {
            controller.configure.isLightenMentioned = flag;

            return this;
        },

        setExportColor: function (color) {

            controller.configure.exportColor = color;

            return this;
        },

        setImportColor: function (color) {

            controller.configure.importColor = color;

            return this;
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

            return this;
        },

        disableStats: function () {
            controller.configure.isStatsEnabled = false;

            return this;
        },

        getStatsObject: function () {
            return controller.stats;
        },

        adjustRelatedBrightness: function (brightness) {

            controller.configure.relatedBrightness = brightness;

            return this;
        },

        adjustOceanBrightness: function (brightness) {

            controller.configure.oceanBrightness = brightness;

            return this;
        },

        adjustMentionedBrightness: function (brightness) {

            controller.configure.mentionedBrightness = brightness;

            return this;
        },

        setLoadingSrc: function (src) {
            controller.configure.loadingSrc = src;

            return this;
        },

        setStyle: function (style) {

            controller.configureHandler.configureStyle(style);

            return this;
        },

        configure: function(configure) {

            controller.configureHandler.configureJSON(configure);

            return this;
        },

        switchCountry: function(ISOAbbr, direction) {

            controller.switchCountryHandler.switchFromAPI(ISOAbbr, direction);

            return this;
        },

        showInOnly: function(flag) {

            if (flag === true) {
                controller.configure.inOnly = true;
                controller.configure.outOnly = false;
            } else {
                controller.configure.inOnly = false;
            }

            return this;
        },

        showOutOnly: function(flag) {

            if (flag === true) {
                controller.configure.outOnly = true;
                controller.configure.inOnly = false;
            } else {
                controller.configure.outOnly = false;
            }

            return this;
        },

        closeLiveLoader: function() {

            controller.configure.liveLoad = false;

            return this;
        }
    }
}

export {Controller}