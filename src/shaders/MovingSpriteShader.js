/**
 * @author syt123450 / https://github.com/syt123450
 */

import { ParticleBase64 } from "../data/Particle.js";

/**
 * Shader material's parameter for moving sprite on spline
 */

function MovingSpriteShader () {

    var particleTexture = ( new THREE.TextureLoader() ).load( ParticleBase64 );

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