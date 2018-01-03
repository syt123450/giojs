/**
 * Created by ss on 2018/1/2.
 */
Globe = function(container) {

    var mapIndexedImage;
    var mapOutlineImage;
	
	var camera, scene, renderer, controls;
	var timeBins;
	var latlonData;
	var selectableCountries = [];
	
    this.addData = function() {

    };

    this.init = function() {
        mapIndexedImage = new Image();
        mapIndexedImage.src = 'assets/map_indexed.png';
        mapIndexedImage.onload = function() {
            mapOutlineImage = new Image();
            mapOutlineImage.src = 'assets/map_outline.png';
            mapOutlineImage.onload = function(){
                initScene();
	            console.log('scene====', scene);
	            animate();
            };
        };
        document.addEventListener('onclick', onClick, false);
    };

    function initScene() {
	
	    //	-----------------------------------------------------------------------------
	    //	Let's make a scene
	    scene = new THREE.Scene();
	
	    //这句话不知道为什么,到时候再研究
	    scene.matrixAutoUpdate = false;
	    // scene.fog = new THREE.FogExp2( 0xBBBBBB, 0.00003 );
	
	    scene.add( new THREE.AmbientLight( 0x505050 ) );
	
	    light1 = new THREE.SpotLight( 0xeeeeee, 3 );
	    light1.position.x = 730;
	    light1.position.y = 520;
	    light1.position.z = 626;
	    light1.castShadow = true;
	    scene.add( light1 );
	
	    light2 = new THREE.PointLight( 0x222222, 14.8 );
	    light2.position.x = -640;
	    light2.position.y = -500;
	    light2.position.z = -1000;
	    scene.add( light2 );
	
	    rotating = new THREE.Object3D();
	    scene.add(rotating);
	
	    lookupCanvas = document.createElement('canvas');
	    lookupCanvas.width = 256;
	    lookupCanvas.height = 1;
	
	    //为什么传入了一个canvas？
	    lookupTexture = new THREE.Texture( lookupCanvas );
	    lookupTexture.magFilter = THREE.NearestFilter;
	    lookupTexture.minFilter = THREE.NearestFilter;
	    lookupTexture.needsUpdate = true;
	
	    var indexedMapTexture = new THREE.Texture( mapIndexedImage );
	    //THREE.ImageUtils.loadTexture( 'images/map_indexed.png' );
	    indexedMapTexture.needsUpdate = true;
	    indexedMapTexture.magFilter = THREE.NearestFilter;
	    indexedMapTexture.minFilter = THREE.NearestFilter;
	
	    var outlinedMapTexture = new THREE.Texture( mapOutlineImage );
	    outlinedMapTexture.needsUpdate = true;
	    // outlinedMapTexture.magFilter = THREE.NearestFilter;
	    // outlinedMapTexture.minFilter = THREE.NearestFilter;
	
	    var uniforms = {
		    'mapIndex': { type: 't', value: 0, texture: indexedMapTexture  },
		    'lookup': { type: 't', value: 1, texture: lookupTexture },
		    'outline': { type: 't', value: 2, texture: outlinedMapTexture },
		    'outlineLevel': {type: 'f', value: 1 },
	    };
	    mapUniforms = uniforms;
	
	    var shaderMaterial = new THREE.ShaderMaterial( {
		
		    uniforms: 		uniforms,
		    // attributes:     attributes,
		    vertexShader:   document.getElementById( 'globeVertexShader' ).textContent,
		    fragmentShader: document.getElementById( 'globeFragmentShader' ).textContent,
		    // sizeAttenuation: true,
	    });
	
	
	    //	-----------------------------------------------------------------------------
	    //	Create the backing (sphere)

	    // backMat.ambient = new THREE.Color(255,255,255);
	    sphere = new THREE.Mesh( new THREE.SphereGeometry( 100, 40, 40 ), shaderMaterial );
	    // sphere.receiveShadow = true;
	    // sphere.castShadow = true;
	    sphere.doubleSided = false;
	    sphere.rotation.x = Math.PI;
	    sphere.rotation.y = -Math.PI/2;
	    sphere.rotation.z = Math.PI;
	    sphere.id = "base";
	    rotating.add( sphere );
	    
	    //	-----------------------------------------------------------------------------
	    //	Setup our renderer
	    renderer = new THREE.WebGLRenderer({antialias:false});
	    renderer.setSize( window.innerWidth, window.innerHeight );
	    renderer.autoClear = false;
	
	    renderer.sortObjects = false;
	    renderer.generateMipmaps = false;
	
	    container.appendChild( renderer.domElement );
	    
	    //	-----------------------------------------------------------------------------
	    //	Setup our camera
	    camera = new THREE.PerspectiveCamera( 12, window.innerWidth / window.innerHeight, 1, 20000 );
	    camera.position.z = 1400;
	    camera.position.y = 0;
	    camera.lookAt(scene.width/2, scene.height/2);
	    scene.add( camera );
	
	    // var windowResize = THREEx.WindowResize(renderer, camera)
    
    }

    function animate () {
	    renderer.clear();
	    renderer.render( scene, camera );
	    
	    requestAnimationFrame(animate);
    }
    
    function onClick() {
        clickCountry();
    }

    function clickCountry() {

        //update parameters

        highlightCountry();
        generateLines();
        generatePartial();
        initMarker();
    }

    function highlightCountry() {

    }

    function generateLines() {

    }

    function generatePartial() {

    }

    function initMarker() {

    }

};