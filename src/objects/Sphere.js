/**
 * @author syt123450 / https://github.com/syt123450
 */

import { EarthSurfaceShader } from "../shaders/EarthSurfaceShader.js";

/**
 * The Sphere object is the earth object (without spineline visual system)
 */

function Sphere ( controller ) {

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

export { Sphere }