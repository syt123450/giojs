/**
 * Created by ss on 2018/1/7.
 */

import { ParticleABase64 } from "../data/ParticleA.js";

function MovingSpriteShader () {

    var particleTexture = ( new THREE.TextureLoader() ).load( ParticleABase64 );

    var uniform = {

        amplitude: { type: "f", value: 1.0 },
        color: { type: "c", value: new THREE.Color( 0xffffff ) },
        texture: { type: "t", value: particleTexture }

    };

    return {

        uniforms: uniform,

        vertexShader: [

            "uniform float amplitude;",

            "attribute float size;",
            "attribute vec3 customColor;",

            "varying vec3 vColor;",

            "void main() {",

                "vColor = customColor;",

                "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

                "gl_PointSize = size;",

                "gl_Position = projectionMatrix * mvPosition;",

            "}"

        ].join( "\n" ),

        fragmentShader: [

            "uniform vec3 color;",
            "uniform sampler2D texture;",

            "varying vec3 vColor;",

            "void main() {",

                "gl_FragColor = vec4( color * vColor, 1.0 );",
                "gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );",

            "}"

        ].join( "\n" )

    };
}

export { MovingSpriteShader }