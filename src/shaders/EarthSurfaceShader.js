/**
 * Created by ss on 2018/1/7.
 */

function EarthSurfaceShader() {

    var uniforms = {};

    uniforms.mapIndex = {type: 't', value: 0, texture: THREE.ImageUtils.loadTexture("../assets/images/map_indexed.png")};
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

    uniforms.outline = {type: 't', value: 2, texture: THREE.ImageUtils.loadTexture("../assets/images/map_outline.png")};
    uniforms.outline.texture.needsUpdate = true;

    uniforms.outlineLevel = {type: 'f', value: 1};


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

            "void main() {",
                "vec4 mapColor = texture2D( mapIndex, vUv );",
                "float indexedColor = mapColor.x;",
                "vec2 lookupUV = vec2( indexedColor, 0. );",
                "vec4 lookupColor = texture2D( lookup, lookupUV );",
                "float mask = lookupColor.x + (1.-outlineLevel) * indexedColor;",
                "mask = clamp(mask,0.,1.);",
                "float outlineColor = texture2D( outline, vUv ).x * outlineLevel;",
                "float diffuse = mask + outlineColor;",
                "gl_FragColor = vec4( vec3(diffuse), 1.  );",
            "}"

        ].join( "\n" ),

        lookupCanvas: lookupCanvas,

        lookupTexture: lookupTexture
    }
}

export {EarthSurfaceShader}