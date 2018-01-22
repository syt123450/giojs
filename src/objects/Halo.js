/**
 * @author botime / https://github.com/botime
 *
 */

function Halo(radius, color) {
	radius = radius || 100;
	color = new THREE.Color(color || 0xffffff);
	
	var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
	var shader = getShader(color);
	var shaderMaterial = new THREE.ShaderMaterial({
		uniforms: THREE.UniformsUtils.clone(shader.uniforms),
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	});
	
	var mesh = new THREE.Mesh(geometry, shaderMaterial);
	mesh.scale.set(1.2, 1.2, 1.2);
	
	function getShader(color) {
		return {
			uniforms: {},
			vertexShader: [
				'varying vec3 vNormal;',
				'void main() {',
				'vNormal = normalize( normalMatrix * normal );',
				'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
				'}'
			].join('\n'),
			fragmentShader: [
				'varying vec3 vNormal;',
				'void main() {',
				'float intensity = pow( 0.5 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 16.0 );',
				'gl_FragColor = vec4(' + color.r + ', ' + color.g + ', ' + color.b + ', 1.0 ) * intensity;',
				'}'
			].join('\n')
		}
	}
	
	function setColor (newColor) {
		this.color = new THREE.Color(newColor);
		this.mesh.material.fragmentShader = this.getShader(this.color).fragmentShader;
		this.mesh.material.needsUpdate = true;
	}
	
	this.color = color;
	this.radius = radius;
	this.mesh = mesh;
	this.getShader = getShader;
	this.setColor = setColor.bind(this);

	return mesh;
}

export { Halo };