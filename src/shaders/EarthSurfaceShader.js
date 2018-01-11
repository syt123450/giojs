/**
 * Created by ss on 2018/1/7.
 */

import {MapIndexBase64} from "../data/MapIndex.js";
import {MapOutlineBase64} from "../data/MapOutline.js";
import {Utils} from "../utils/Utils";

function EarthSurfaceShader() {

    var helperColor = new THREE.Color();
    var surfaceColor = new THREE.Vector3(1, 1, 1);

    var uniforms = {};

    var mapIndexedImage = new Image();
    mapIndexedImage.src = MapIndexBase64;

    var mapOutlineBase64 = new Image();
    mapOutlineBase64.src = MapOutlineBase64;

    uniforms.mapIndex = {type: 't', value: 0, texture: THREE.ImageUtils.loadTexture(mapIndexedImage.src)};
    uniforms.mapIndex.texture.needsUpdate = true;
    uniforms.mapIndex.texture.magFilter = THREE.NearestFilter;
    uniforms.mapIndex.texture.minFilter = THREE.NearestFilter;

    var lookupCanvas = document.createElement('canvas');
    lookupCanvas.width = 256;
    lookupCanvas.height = 1;

    var lookupTexture = new THREE.Texture(lookupCanvas);
    lookupTexture.magFilter = THREE.NearestFilter;
    lookupTexture.minFilter = THREE.NearestFilter;
    lookupTexture.needsUpdate = true;

    uniforms.lookup = {type: 't', value: 1, texture: lookupTexture};

    uniforms.outline = {type: 't', value: 2, texture: THREE.ImageUtils.loadTexture(mapOutlineBase64.src)};
    uniforms.outline.texture.needsUpdate = true;

    uniforms.outlineLevel = {type: 'f', value: 1};

    uniforms.color = { type: 'v3', value: surfaceColor };
    uniforms.flag = { type: 'f', value: 1 };

    function setShaderColor(color) {

        color = Utils.formatColor(color);

        helperColor.setHex(color);

        surfaceColor.x = helperColor.r;
        surfaceColor.y = helperColor.g;
        surfaceColor.z = helperColor.b;
    }

    return {

        uniforms: uniforms,

        vertexShader: [

            "varying vec3 vNormal;",
            "varying vec2 vUv;",

            "void main() {",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);",
                "vNormal = normalize( normalMatrix * normal );",
                "vUv = uv;",
            "}"

        ].join( "\n" ),

        fragmentShader: [

            "uniform sampler2D mapIndex;",
            "uniform sampler2D lookup;",
            "uniform sampler2D outline;",
            "uniform float outlineLevel;",
            "varying vec3 vNormal;",
            "varying vec2 vUv;",

            "uniform vec3 color;",
            "uniform float flag;",

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
                "earthColor.x = flag * color.x * diffuse + (1.0 - flag) * diffuse;",
                "earthColor.y = flag * color.y * diffuse + (1.0 - flag) * diffuse;",
                "earthColor.z = flag * color.z * diffuse + (1.0 - flag) * diffuse;",

                "gl_FragColor = vec4( earthColor, 1.  );",

            "}"

        ].join( "\n" ),

        lookupCanvas: lookupCanvas,

        lookupTexture: lookupTexture,

        setShaderColor: setShaderColor
    }
}

export {EarthSurfaceShader}