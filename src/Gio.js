/**
 * @author syt123450 / https://github.com/syt123450
 */

import {} from "./style/StyleConfigure.js";
import { SurfaceHandler } from "./handlers/SurfaceHandler.js";
import { RotationHandler } from "./handlers/RotationHandler.js";
import { WheelHandler } from "./handlers/WheelHandler.js";
import { VisSystemHandler } from "./handlers/VisSystemHandler.js";
import { SwitchCountryHandler } from "./handlers/SwitchCountryHandler.js";
import { ResizeHandler } from "./handlers/ResizeHandler.js";
import { InitHandler } from "./handlers/InitHandler.js";
import { Configure } from "./configure/Configure.js";
import { ConfigureHandler } from "./handlers/ConfigureHandler.js";
import { DataHandler } from "./handlers/DataHandler.js";
import { ObjectUtils } from "./utils/ObjectUtils.js";
import { HaloHandler } from "./handlers/HaloHandler.js";
import {DataGroupHandler} from "./handlers/DataGroupHandler";
import {SingleDataHandler} from "./handlers/SingleDataHandler";

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

    // handlers used to handle tasks in controller

    this.dataGroupHandler = new DataGroupHandler( this );
    this.singleDataHandler = new SingleDataHandler( this );
    this.configureHandler = new ConfigureHandler( this );
    this.rotationHandler = new RotationHandler( this );
    this.surfaceHandler = new SurfaceHandler( this );
    this.wheelHandler = new WheelHandler( this );
    this.visSystemHandler = new VisSystemHandler( this );
    this.switchCountryHandler = new SwitchCountryHandler( this );
    this.resizeHandler = new ResizeHandler( this );
    this.initHandler = new InitHandler( this );
    this.dataHandler = new DataHandler( this );
    this.haloHandler = new HaloHandler( this );
    
    // define a data processor to pre-processor the data, will be initialized in InitHandler

    this.dataProcessor = null;

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
    this.halo = null;
    this.haloShader = null;

	this.inputData = [];
	this.globalData = [];

    this.dataGroup = false;
    // this.inputValueKey = "v";

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

            if ( controller.initialized === true ) {

                controller.dataProcessor.process( controller );
                controller.visSystemHandler.update();
                controller.surfaceHandler.update();

            }

            return this;

        },

        clearData: function () {

            controller.inputData = [];
            controller.globalData = [];

            if ( controller.initialized === true ) {

                controller.visSystemHandler.update();
                controller.surfaceHandler.update();

            }

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

            controller.configure.color.surface = color;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        setSelectedColor: function ( color ) {

            controller.configure.color.selected = color;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        getScene: function () {

            return controller.scene;

        },

        setInitCountry: function ( ISOAbbr ) {

            controller.configure.control.initCountry = ISOAbbr;

            return this;

        },

        disableUnmentioned: function ( flag ) {

            controller.configure.control.disableUnmentioned = flag;

            return this;

        },

        lightenMentioned: function ( flag ) {

            controller.configure.control.lightenMentioned = flag;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        setExportColor: function ( color ) {

            controller.configure.color.out = color;

            if ( controller.initialized === true ) {

                controller.visSystemHandler.update();

            }

            return this;

        },

        setImportColor: function ( color ) {

            controller.configure.color.in = color;

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

            if ( controller.configure.control.stats === false && controller.initialized ) {

                if ( controller.stats === null ) {

                    controller.stats = ObjectUtils.createStats(controller.container);

                }

                controller.container.appendChild( controller.stats.dom );

            }

            controller.configure.control.stats = true;

            return this;

        },

        disableStats: function () {

            if ( controller.configure.control.stats === true && controller.stats !== null ) {

                controller.container.removeChild( controller.stats.dom );

            }

            controller.configure.control.stats = false;

            return this;

        },

        getStatsObject: function () {

            return controller.stats;

        },

        getConfig: function () {

            return controller.configure;
        },

        adjustRelatedBrightness: function ( brightness ) {

            controller.configure.brightness.related = brightness;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        adjustOceanBrightness: function ( brightness ) {

            controller.configure.brightness.ocean = brightness;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

            return this;

        },

        adjustMentionedBrightness: function ( brightness ) {

            controller.configure.brightness.mentioned = brightness;

            if ( controller.initialized === true ) {

                controller.surfaceHandler.update();

            }

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

                controller.configure.control.inOnly = true;
                controller.configure.control.outOnly = false;

            } else {

                controller.configure.control.inOnly = false;
            }

            if ( controller.initialized === true ) {

                controller.visSystemHandler.update();

            }

            return this;

        },

        showOutOnly: function ( flag ) {

            if ( flag === true ) {

                controller.configure.control.outOnly = true;
                controller.configure.control.inOnly = false;

            } else {

                controller.configure.control.outOnly = false;

            }

            if ( controller.initialized === true ) {

                controller.visSystemHandler.update();

            }

            return this;

        },

        closeLiveLoader: function () {

            controller.dataHandler.stopLiveLoader();

            return this;

        },

        // to be used to force update the whole system after init(), may not be used by user

        update: function () {

            if ( controller.initialized === true ) {

                controller.dataProcessor.process( controller );
                controller.visSystemHandler.update();
                controller.surfaceHandler.update();

            }

            return this;

        },

        setHaloColor: function ( color ) {

            controller.configure.color.halo = color;

            if ( controller.initialized === true ) {

                controller.haloHandler.update();

            }

            return this;

        },

        removeHalo: function () {

            controller.configure.control.halo = false;


            if ( controller.initialized === true ) {

                controller.haloHandler.remove();

            }

            return this;

        },

        addHalo: function ( color ) {

            controller.configure.control.halo = true;

            if ( color !== undefined ) {

                controller.configure.color.halo = color;

            }

            if ( controller.initialized === true ) {

                if ( controller.halo !== null ) {

                    controller.haloHandler.update();

                } else {

                    controller.haloHandler.create();

                }

            }

            return this;

        },

        setBackgroundColor: function ( color ) {

            controller.configure.color.background = color;

            if ( controller.initialized === true ) {

                controller.scene.background = new THREE.Color( color );

            }

            return this;

        },

        resizeUpdate: function () {

            controller.resizeHandler.resizeScene();

            return this;

        },

        switchDataSet: function ( dataSetName ) {

            if ( controller.dataGroup ) {

                controller.dataGroupHandler.switchDataSet( dataSetName );

            }

            return this;

        },
        
        setTransparentBackground: function( isTransparent ) {
	
	        controller.configure.control.transparentBackground = isTransparent;
	        
	        return this;
         
        },
        
        setAutoRotation: function( isAutoRotation, rotationRatio ) {
        
            controller.configure.control.autoRotation = isAutoRotation;
            
            if ( rotationRatio !== undefined && rotationRatio >= 0 ) {
	
	            controller.configure.control.rotationRatio = rotationRatio;
             
            }
            
            if ( controller.initialized ) {
                
                controller.rotationHandler.updateRotationConfig();
                
            }
            
        }

    }

}

export { Controller }