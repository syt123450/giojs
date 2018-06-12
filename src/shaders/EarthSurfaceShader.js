/**
 * @author syt123450 / https://github.com/syt123450
 */

import { MapIndexBase64 } from "../data/MapIndex.js";
import { MapOutlineBase64 } from "../data/MapOutline.js";
import { Utils } from "../utils/Utils.js";

/**
 * shader material's parameter for earth surface
 */

function EarthSurfaceShader ( controller ) {

    var helperColor = new THREE.Color();

    // cache color object for surface color

    var surfaceColor = new THREE.Vector3();

    //cache color object for selected Color

    var selectedColor = new THREE.Vector3();

    var lookupCanvas, lookupTexture;

    // the uniforms object will be created when the EarthSurfaceShader object is created

    var uniforms = createUniforms();

    // this function create the uniform for shader

    function createUniforms () {

        loadSurfaceColor();

        var uniforms = {};

        var mapIndexedTexture = ( new THREE.TextureLoader() ).load( MapIndexBase64 );

        // the mapIndex is used for getting the color when click on the earth

        uniforms.mapIndex = { type: 't', value: mapIndexedTexture };
        uniforms.mapIndex.value.magFilter = THREE.NearestFilter;
        uniforms.mapIndex.value.minFilter = THREE.NearestFilter;

        lookupCanvas = document.createElement( 'canvas' );
        lookupCanvas.width = 256;
        lookupCanvas.height = 1;

        lookupTexture = new THREE.Texture( lookupCanvas );
        lookupTexture.magFilter = THREE.NearestFilter;
        lookupTexture.minFilter = THREE.NearestFilter;
        lookupTexture.needsUpdate = true;

        // the lookup is used for

        uniforms.lookup = { type: 't', value: lookupTexture };

        var mapOutlineTexture = ( new THREE.TextureLoader() ).load( MapOutlineBase64 );

        // the outline is what the user see in browser

        uniforms.outline = { type: 't', value: mapOutlineTexture };

        // the outlineLevel is used by webgl to judge whether to show outline

        uniforms.outlineLevel = { type: 'f', value: 1 };

        // the surfaceColor is passed into webgl to render the surface color

        uniforms.surfaceColor = { type: 'v3', value: surfaceColor };

        // the flag is passed into webgl to judge whether to show surface color

        uniforms.flag = { type: 'f', value: 1 };

        // the selectedColor is passed into webgl to render the selected country on the surface

        uniforms.selectedColor = { type: 'v3', value: selectedColor };

        return uniforms;

    }

    // this function will set selectedColor and surfaceColor based on the configure

    function loadSurfaceColor () {

        setShaderColor( controller.configure.color.surface );

        if ( controller.configure.color.selected === null ) {

            setHighlightColor( controller.configure.color.surface );

        } else {

            setHighlightColor( controller.configure.color.selected );

        }

    }

    function setShaderColor( color ) {

        if (color === null) {

            return;

        }

        color = Utils.formatColor( color );

        helperColor.setHex( color );

        surfaceColor.x = helperColor.r;
        surfaceColor.y = helperColor.g;
        surfaceColor.z = helperColor.b;

    }

    function setHighlightColor(color) {

        if (color === null) {

            return;

        }

        color = Utils.formatColor( color );

        helperColor.setHex( color );

        selectedColor.x = helperColor.r;
        selectedColor.y = helperColor.g;
        selectedColor.z = helperColor.b;

    }

    // this function used to update the shader material when user change the surface color at run time

    function update () {

        loadSurfaceColor();

    }

    return {

        uniforms: uniforms,

        vertexShader: [

            "varying vec2 vUv;",

            "void main() {",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);",
                "vUv = uv;",
            "}"

        ].join( "\n" ),

        fragmentShader: [

            "uniform sampler2D mapIndex;",
            "uniform sampler2D lookup;",
            "uniform sampler2D outline;",
            "uniform float outlineLevel;",
            "varying vec2 vUv;",

            "uniform vec3 surfaceColor;",
            "uniform float flag;",
            "uniform vec3 selectedColor;",

            "void main() {",
                "vec4 mapColor = texture2D( mapIndex, vUv );",
                "float indexedColor = mapColor.x;",
                "vec2 lookupUV = vec2( indexedColor, 0. );",
                "vec4 lookupColor = texture2D( lookup, lookupUV );",
                "float mask = lookupColor.x + (1.-outlineLevel) * indexedColor;",
                "mask = clamp(mask,0.,1.);",
                "float outlineColor = texture2D( outline, vUv ).x * outlineLevel;",
                "float diffuse = mask + outlineColor;",

                "vec3 earthColor = vec3(0.0, 0.0, 0.0);",
                "earthColor.x = flag * surfaceColor.x * diffuse + (1.0 - flag) * diffuse;",
                "earthColor.y = flag * surfaceColor.y * diffuse + (1.0 - flag) * diffuse;",
                "earthColor.z = flag * surfaceColor.z * diffuse + (1.0 - flag) * diffuse;",

                "if (lookupColor.x > 0.9) {",
                    "earthColor = selectedColor * diffuse;",
                "}",

                "gl_FragColor = vec4( earthColor, 1.  );",

            "}"

        ].join( "\n" ),

        lookupCanvas: lookupCanvas,

        lookupTexture: lookupTexture,

        update: update

    }
}

export { EarthSurfaceShader }