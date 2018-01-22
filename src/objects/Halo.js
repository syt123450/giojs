/**
 * @author botime / https://github.com/botime
 * @author syt123450 / https://github.com/syt123450
 */

import { HaloShader } from "../shaders/HaloShader.js";

function Halo ( controller ) {

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

	return mesh;

}

export { Halo };