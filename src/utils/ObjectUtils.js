/**
 * @author syt123450 / https://github.com/syt123450
 * @author botime / https://github.com/botime
 */

import { HaloShader } from "../shaders/HaloShader.js";
import { EarthSurfaceShader } from "../shaders/EarthSurfaceShader.js";
import { Utils } from "../utils/Utils.js";
import { MovingSpriteShader } from "../shaders/MovingSpriteShader.js";
import { CountryData } from "../countryInfo/CountryData.js";
import { CountryColorMap } from "../countryInfo/CountryColorMap.js";
import {Continent} from "../countryInfo/Continent";

/**
 * This utils create objects in for the scene
 */

var ObjectUtils = ( function () {

    function createScene ( controller ) {

        var scene = new THREE.Scene();
        if ( controller.configure.color.background !== null ) {

            scene.background = new THREE.Color( controller.configure.color.background );

        }

        return scene;
    }

    //create Three.js camera

    function createCamera ( container ) {

        var camera = new THREE.PerspectiveCamera( 12, container.clientWidth / container.clientHeight, 1, 20000 );
        camera.position.z = 1400;
        camera.position.y = 0;
        camera.lookAt( 0, 0, 0 );

        return camera;

    }

    //create Three.js lights

    function createLights () {

        var lights = [];

        var light1 = new THREE.AmbientLight( 0x505050 );

        var light2 = new THREE.SpotLight( 0xeeeeee, 3 );
        light2.position.x = 730;
        light2.position.y = 520;
        light2.position.z = 626;
        light2.castShadow = true;

        var light3 = new THREE.PointLight( 0x222222, 14.8 );
        light3.position.x = -640;
        light3.position.y = -500;
        light3.position.z = -1000;

        lights.push( light1 );
        lights.push( light2 );
        lights.push( light3 );

        return lights;

    }

    //create Three.js renderer, using webgl renderer to render canvas

    function createRenderer ( container, alpha ) {

        var sceneArea = document.createElement( "canvas" );

        // the scene's height and width only fit the div's actual height and width

        var cs = getComputedStyle( container );

        var paddingX = parseFloat( cs.paddingLeft ) + parseFloat( cs.paddingRight );
        var paddingY = parseFloat( cs.paddingTop ) + parseFloat( cs.paddingBottom );

        var borderX = parseFloat( cs.borderLeftWidth ) + parseFloat( cs.borderRightWidth );
        var borderY = parseFloat( cs.borderTopWidth ) + parseFloat( cs.borderBottomWidth );

        sceneArea.width = container.clientWidth - paddingX - borderX;
        sceneArea.height = container.clientHeight - paddingY - borderY;

        var renderer = new THREE.WebGLRenderer( { canvas: sceneArea, antialias: true, alpha: alpha } );
        renderer.setSize( sceneArea.width, sceneArea.height );
        renderer.autoClear = false;
        renderer.sortObjects = false;
        renderer.generateMipmaps = false;
        
        return renderer;

    }

    //create stats to monitor performance, for development, the detailed introduce about stats: https://github.com/mrdoob/stats.js

    function createStats () {

        var stats = new Stats();
        stats.showPanel( 1 );
        stats.dom.style.position = "absolute";

        return stats;

    }

    // The Sphere object is the earth object (without spineline visual system)

    function createSphere ( controller ) {

        // create EarthSurfaceShader object when initialized

        var earthSurfaceShader = new EarthSurfaceShader( controller );

        var shaderMaterial = new THREE.ShaderMaterial( {

            uniforms: earthSurfaceShader.uniforms,
            vertexShader: earthSurfaceShader.vertexShader,
            fragmentShader: earthSurfaceShader.fragmentShader

        } );

        var sphere = new THREE.Mesh( new THREE.SphereGeometry( 100, 40, 40 ), shaderMaterial );
        sphere.doubleSided = false;
        sphere.rotation.x = Math.PI;
        sphere.rotation.y = -Math.PI / 2;
        sphere.rotation.z = Math.PI;

        sphere.name = "sphere";

        // hold the pointer for EarthSurfaceShader, the controller will use this pointer to hold the pointer of the EarthSurfaceShader

        sphere.earthSurfaceShader = earthSurfaceShader;

        return sphere;

    }

    function createHalo ( controller ) {

        var radius = 100;
        var geometry = new THREE.SphereBufferGeometry( radius, 32, 32 );

        var haloShader = new HaloShader( controller );
        var shaderMaterial = new THREE.ShaderMaterial( {

            uniforms: haloShader.uniforms,
            vertexShader: haloShader.vertexShader,
            fragmentShader: haloShader.fragmentShader,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true

        } );

        var mesh = new THREE.Mesh( geometry, shaderMaterial );
        mesh.scale.set( 1.2, 1.2, 1.2 );

        mesh.haloShader = haloShader;

        return mesh;

    }

    /**
     * The SplineSystem contains the mesh of spine lines and the moving object on the globe.
     * The mesh will be created each time the clicked country changes.
     */

    function createSplineSystem ( controller ) {

        var geometries = createGeometries( controller );

        var splineOutline = createSplineOutline( geometries.linesGeo );
        var pSystem = createParticleSystem( geometries.particlesGeo, geometries.movingPoints );

        splineOutline.add( pSystem );

        return splineOutline;

    }

    function createGeometries ( controller ) {

        var inputData = controller.globalData;
        controller.relatedCountries = [];
        var selectedCountry = controller.selectedCountry;

        var linesGeo = new THREE.Geometry();
        var lineColors = [];

        var particlesGeo = new THREE.BufferGeometry();

        var movingPoints = [];

        var positions = [];
        var sizes = [];
        var customColors = [];

        for (var i in inputData) {

            var set = inputData[ i ];

            if ( ( controller.configure.control.inOnly && set.i !== CountryColorMap[ selectedCountry.colorCode ] ) ||
                ( controller.configure.control.outOnly && set.e !== CountryColorMap[ selectedCountry.colorCode ] ) ) {

                continue;

            }

            if ( set.i === CountryColorMap[ selectedCountry.colorCode ] ||
                set.e === CountryColorMap[ selectedCountry.colorCode ] ) {

                var lineColor;

                if ( set.e === CountryColorMap[ selectedCountry.colorCode ] ) {

                    if ( Continent.names.indexOf( set.i.toUpperCase() ) !== -1 ) {

                        var continentCountries = Continent[ set.i.toUpperCase() ].countries;

                        for ( var j = 0; j < continentCountries.length; j++ ) {

                            var countryCode = continentCountries[ j ];

                            if ( CountryData[ countryCode ] !== undefined ) {

								controller.relatedCountries.push(CountryData[continentCountries[j]]);

                            }

                        }

                    } else {

						controller.relatedCountries.push( CountryData[ set.i ] );

                    }

					if ( set.outColor === undefined ) {

						lineColor = new THREE.Color( controller.configure.color.out );

					} else {

						lineColor = new THREE.Color( set.outColor );

					}

                } else {

                    controller.relatedCountries.push( CountryData[ set.e ] );

                    if ( set.inColor === undefined ) {

                        lineColor = new THREE.Color( controller.configure.color.in );

                    } else {

                        lineColor = new THREE.Color( set.inColor );

                    }

                }

                var lastColor;

                for ( var s in set.lineGeometry.vertices ) {

                    lineColors.push( lineColor );
                    lastColor = lineColor;

                }

                linesGeo.merge( set.lineGeometry );

                var particleColor = lastColor.clone();
                var points = set.lineGeometry.vertices;
                var particleCount = Math.floor( set.v / 8000 / set.lineGeometry.vertices.length ) + 1;
                particleCount = Utils.constrain( particleCount, 1, 100 );
                var particleSize = set.lineGeometry.size * controller.container.clientHeight / 1000;

                for ( s = 0; s < particleCount; s++ ) {

                    var desiredIndex = s / particleCount * points.length;

                    var rIndex = Utils.constrain( Math.floor( desiredIndex ), 0, points.length - 1 );
                    var point = points[ rIndex ];
                    var particle = point.clone();
                    particle.moveIndex = rIndex;
                    particle.nextIndex = rIndex + 1;

                    if ( particle.nextIndex >= points.length ) {

                        particle.nextIndex = 0;

                    }

                    particle.lerpN = 0;
                    particle.path = points;

                    movingPoints.push( particle );

                    particle.size = particleSize;

                    positions.push( particle.x );
                    positions.push( particle.y );
                    positions.push( particle.z );

                    sizes.push( particleSize );

                    customColors.push( particleColor.r );
                    customColors.push( particleColor.g );
                    customColors.push( particleColor.b );

                }

            }

        }

        linesGeo.colors = lineColors;

        particlesGeo.addAttribute( "position", new THREE.Float32BufferAttribute( positions, 3 ) );
        particlesGeo.addAttribute( "size", new THREE.Float32BufferAttribute( sizes, 1 ) );
        particlesGeo.addAttribute( "customColor", new THREE.Float32BufferAttribute( customColors, 3 ) );

        particlesGeo.attributes.position.needsUpdate = true;

        return {

            linesGeo: linesGeo,
            particlesGeo: particlesGeo,
            movingPoints: movingPoints

        }

    }

    function createSplineOutline ( linesGeo ) {

        var splineOutline = new THREE.Line( linesGeo, new THREE.LineBasicMaterial( {

            color: 0xffffff,
            opacity: 1.0,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexColors: true,
            linewidth: 1

        } ) );

        splineOutline.renderDepth = false;

        return splineOutline;

    }

    function createParticleSystem ( particlesGeo, movingPoints ) {

        var movingSpriteShader = new MovingSpriteShader();

        var shaderMaterial = new THREE.ShaderMaterial( {

            uniforms: movingSpriteShader.uniforms,
            vertexShader: movingSpriteShader.vertexShader,
            fragmentShader: movingSpriteShader.fragmentShader,

            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false,
            transparent: true

        } );

        var pSystem = new THREE.Points( particlesGeo, shaderMaterial );

        pSystem.dynamic = true;

        pSystem.movingPoints = movingPoints;


        pSystem.update = function () {

            for ( var i in this.movingPoints ) {

                var particle = this.movingPoints[ i ];

                var path = particle.path;

                particle.lerpN += 0.05;

                if (particle.lerpN > 1) {

                    particle.lerpN = 0;
                    particle.moveIndex = particle.nextIndex;
                    particle.nextIndex++;

                    if (particle.nextIndex >= path.length) {

                        particle.moveIndex = 0;
                        particle.nextIndex = 1;

                    }

                }

                var currentPoint = path[ particle.moveIndex ];
                var nextPoint = path[ particle.nextIndex ];

                particle.copy( currentPoint );
                if ( nextPoint !== undefined && particle !== undefined ) {

                    particle.lerp( nextPoint, particle.lerpN );

                }

                this.geometry.attributes.position.array[ 3 * i ] = particle.x;
                this.geometry.attributes.position.array[ 3 * i + 1 ] = particle.y;
                this.geometry.attributes.position.array[ 3 * i + 2 ] = particle.z;

            }

            this.geometry.attributes.position.needsUpdate = true;

        };

        return pSystem;
    }

    return {

        createScene: createScene,

        createCamera: createCamera,

        createLights: createLights,

        createRenderer: createRenderer,

        createStats: createStats,

        createSphere: createSphere,

        createHalo: createHalo,

        createSplineSystem: createSplineSystem

    }

}() );

export { ObjectUtils }