/**
 * @author botime / https://github.com/botime
 * @author syt123450 / https://github.com/syt123450
 */

function HaloShader ( controller ) {

    var colorVector = new THREE.Vector3();

    update();

    function update () {

        var color = new THREE.Color( controller.configure.color.halo );

        colorVector.x = color.r;
        colorVector.y = color.g;
        colorVector.z = color.b;
    }

    return {

        uniforms: {

            "haloColor": { type: 'v3', value: colorVector }

        },

        vertexShader: [

            'varying vec3 vNormal;',

            'void main() {',

                'vNormal = normalize( normalMatrix * normal );',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

            '}'

        ].join( '\n' ),

        fragmentShader: [

            'varying vec3 vNormal;',
            "uniform vec3 haloColor;",

            'void main() {',

                'float intensity = pow( 0.5 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 16.0 );',
                'gl_FragColor = vec4( haloColor, 1.0 ) * intensity;',

            '}'

        ].join( '\n' ),

        update: update

    }
}

export { HaloShader }