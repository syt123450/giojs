/**
 * @author syt123450 / https://github.com/syt123450
 */

import {} from "./style/StyleConfigure.js";
import { Marker } from "./markers/Marker.js";
import { SurfaceHandler } from "./handler/SurfaceHandler.js";
import { RotationHandler } from "./handler/RotationHandler.js";
import { WheelHandler } from "./handler/WheelHandler.js";
import { VisSystemHandler } from "./handler/VisSystemHandler.js";
import { SwitchCountryHandler } from "./handler/SwitchCountryHandler.js";
import { ResizeHandler } from "./handler/ResizeHandler.js";
import { InitHandler } from "./handler/InitHandler.js";
import { Configure } from "./configure/Configure.js";
import { ConfigureHandler } from "./handler/ConfigureHandler.js";
import { DataHandler } from "./handler/DataHandler.js";
import { ObjectUtils } from "./utils/BasicObjectUtils.js";
import { DataProcessor } from "./dataPreprocessors/DataProcessor.js";
import { LineGeometry } from "./objects/LineGeometry.js";

/**
 * This is the controller object when IO Globe is running,
 * When developer want to create a new IO globe, they first need to create a controller instance and then init this controller.
 * How to create and use this controller is introduce in API document and shown in demos.
 */

function Controller ( container, configureObject ) {

    // constructor parameters

    this.container = container;
    this.constructorConfigure = configureObject;

    // configure object

    this.configure = new Configure();

    // handler used to handle tasks in controller

    this.configureHandler = new ConfigureHandler( this );
    this.rotationHandler = new RotationHandler( this );
    this.surfaceHandler = new SurfaceHandler( this );
    this.wheelHandler = new WheelHandler( this );
    this.visSystemHandler = new VisSystemHandler( this );
    this.switchCountryHandler = new SwitchCountryHandler( this );
    this.resizeHandler = new ResizeHandler( this );
    this.initHandler = new InitHandler( this );
    this.dataHandler = new DataHandler( this );

    // define a data processor to pre-processor the data

    this.dateProcessor = new DataProcessor( this );

    // configure "configure object" through constructor configure

    this.configureHandler.configureConstructor();

    // important components, they will be initialized when initHandler is called

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

    this.initialized = false;

    // hold controller itself

    var controller = this;

    // API is defined in return object

    return {

        init: function () {

            controller.initHandler.init();

            return this;

        },

        addData: function ( data ) {

            controller.dataHandler.loadJSON( data );

            return this;

        },

        addDataAsync: function ( url, callback ) {

            controller.dataHandler.loadAsync( url, callback );

            return this;

        },

        addLiveData: function ( url, callback, milliseconds ) {

            controller.dataHandler.liveLoad( url, callback, milliseconds );

            return this;

        },

        setSurfaceColor: function ( color ) {

            controller.configure.surfaceColor = color;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        setSelectedColor: function ( color ) {

            controller.configure.clickedDifferent = true;
            controller.configure.clickedColor = color;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        getScene: function () {

            return controller.scene;

        },

        setInitCountry: function ( ISOAbbr ) {

            controller.configure.selectedCountry = ISOAbbr;

            return this;

        },

        disableUnmentioned: function ( flag ) {

            controller.configure.disableUnrelated = flag;

            return this;

        },

        lightenMentioned: function ( flag ) {

            controller.configure.isLightenMentioned = flag;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        setExportColor: function ( color ) {

            controller.configure.exportColor = color;

            if ( controller.initialized === true ) {

                controller.visSystemHandler.update();

            }

            return this;

        },

        setImportColor: function ( color ) {

            controller.configure.importColor = color;

            if ( controller.initialized === true ) {

                controller.visSystemHandler.update();

            }

            return this;

        },

        getSelectedCountry: function () {

            return controller.selectedCountry;

        },

        getRelatedCountries: function () {

            return controller.relatedCountries;

        },

        onCountryPicked: function ( callBack ) {

            controller.switchCountryHandler.setCountryPickCallBack( callBack );

        },

        enableStats: function () {

            if ( controller.configure.isStatsEnabled === false && controller.initialized ) {

                if ( controller.stats === null ) {

                    controller.stats = ObjectUtils.createStats(controller.container);

                }

                controller.container.appendChild(controller.stats.dom);

            }

            controller.configure.isStatsEnabled = true;

            return this;

        },

        disableStats: function () {

            if ( controller.configure.isStatsEnabled === true && controller.stats !== null ) {

                controller.container.removeChild(controller.stats.dom);

            }

            controller.configure.isStatsEnabled = false;

            return this;

        },

        getStatsObject: function () {

            return controller.stats;

        },

        adjustRelatedBrightness: function ( brightness ) {

            controller.configure.relatedBrightness = brightness;

            return this;

        },

        adjustOceanBrightness: function ( brightness ) {

            controller.configure.oceanBrightness = brightness;

            return this;

        },

        adjustMentionedBrightness: function ( brightness ) {

            controller.configure.mentionedBrightness = brightness;

            return this;

        },

        setLoadingSrc: function ( src ) {

            controller.configure.loadingSrc = src;

            return this;

        },

        setStyle: function ( style ) {

            controller.configureHandler.configureStyle( style );

            return this;

        },

        configure: function ( configure ) {

            controller.configureHandler.configureJSON( configure );

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();
                controller.visSystemHandler.update();

            }

            return this;

        },

        switchCountry: function ( ISOAbbr, direction ) {

            controller.switchCountryHandler.switchFromAPI( ISOAbbr, direction );

            return this;

        },

        showInOnly: function ( flag ) {

            if ( flag === true ) {

                controller.configure.inOnly = true;
                controller.configure.outOnly = false;

            } else {

                controller.configure.inOnly = false;

            }

            if ( controller.initialized === true ) {

                controller.visSystemHandler.updateSystem();

            }

            return this;

        },

        showOutOnly: function ( flag ) {

            if ( flag === true ) {

                controller.configure.outOnly = true;
                controller.configure.inOnly = false;

            } else {

                controller.configure.outOnly = false;

            }

            if ( controller.initialized === true ) {

                controller.visSystemHandler.updateSystem();

            }

            return this;

        },

        closeLiveLoader: function () {

            // controller.configure.liveLoad = false;

            controller.dataHandler.stopLiveLoader();

            return this;

        },

        // to be used after addData() function is called when controller has already been init()

        update: function () {

            if ( controller.initialized === true ) {

                LineGeometry.buildDataVizGeometries( controller );
                controller.dateProcessor.process();
                controller.visSystemHandler.updateSystem();
                controller.surfaceHandler.update();

            }

            console.log(controller);

        }

    }

}

export { Controller }