/**
 * Created by ss on 2018/1/2.
 */
Globe = function(container) {

    var mapIndexedImage;
    var mapOutlineImage;

    this.container = container;

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
            };
        };
        document.addEventListener('onclick', onClick, false);
    };

    function initScene() {
	    //	-----------------------------------------------------------------------------
	    scene = new THREE.Scene();
	
	    //这句话不知道为什么,到时候再研究
	    scene.matrixAutoUpdate = false;
	
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
	    // var mapGraphic = new THREE.Texture(worldCanvas);//THREE.ImageUtils.loadTexture("images/map.png");
	    // backTexture =  mapGraphic;
	    // mapGraphic.needsUpdate = true;
// 	backMat = new THREE.MeshBasicMaterial(
// 		{
// 			// color: 		0xffffff,
// 			// shininess: 	10,
// // 			specular: 	0x333333,
// 			// map: 		mapGraphic,
// 			// lightMap: 	mapGraphic
// 		}
// 	);
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
	
	
	    //目标是生成selectableCountries, 这个list保存了国家的名称
	    for( var i in timeBins ){
		    var bin = timeBins[i].data;
		    for( var s in bin ){
			    var set = bin[s];
			    // if( set.v < 1000000 )
			    // 	continue;
			
			    var exporterName = set.e.toUpperCase();
			    var importerName = set.i.toUpperCase();
			
			    //	let's track a list of actual countries listed in this data set
			    //	this is actually really slow... consider re-doing this with a map
			    if( $.inArray(exporterName, selectableCountries) < 0 )
				    selectableCountries.push( exporterName );
			
			    if( $.inArray(importerName, selectableCountries) < 0 )
				    selectableCountries.push( importerName );
		    }
	    }
	
	    console.log( selectableCountries );
	
	    // load geo data (country lat lons in this case)
	    console.time('loadGeoData');
	    loadGeoData( latlonData );
	    console.timeEnd('loadGeoData');
	
	    console.time('buildDataVizGeometries');
	    var vizilines = buildDataVizGeometries(timeBins);
	    console.timeEnd('buildDataVizGeometries');
	
	    visualizationMesh = new THREE.Object3D();
	    rotating.add(visualizationMesh);
	
	    selectVisualization( timeBins, '2010', ['UNITED STATES'], ['Military Weapons','Civilian Weapons', 'Ammunition'], ['Military Weapons','Civilian Weapons', 'Ammunition'] );
	
	    // test for highlighting specific countries
	    // highlightCountry( ["United States", "Switzerland", "China"] );
	
	
	    //	-----------------------------------------------------------------------------
	    //	Setup our renderer
	    renderer = new THREE.WebGLRenderer({antialias:false});
	    renderer.setSize( window.innerWidth, window.innerHeight );
	    renderer.autoClear = false;
	
	    renderer.sortObjects = false;
	    renderer.generateMipmaps = false;
	
	    glContainer.appendChild( renderer.domElement );
	
	
	    //	-----------------------------------------------------------------------------
	    //	Event listeners
	    document.addEventListener( 'mousemove', onDocumentMouseMove, true );
	    // document.addEventListener( 'windowResize', onDocumentResize, false );
	
	    //masterContainer.addEventListener( 'mousedown', onDocumentMouseDown, true );
	    //masterContainer.addEventListener( 'mouseup', onDocumentMouseUp, false );
	    document.addEventListener( 'mousedown', onDocumentMouseDown, true );
	    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	
	    masterContainer.addEventListener( 'click', onClick, true );
	    masterContainer.addEventListener( 'mousewheel', onMouseWheel, false );
	
	    //	firefox
	    masterContainer.addEventListener( 'DOMMouseScroll', function(e){
		    var evt=window.event || e; //equalize event object
		    onMouseWheel(evt);
	    }, false );
	
	    document.addEventListener( 'keydown', onKeyDown, false);
	
	    //	-----------------------------------------------------------------------------
	    //	Setup our camera
	    camera = new THREE.PerspectiveCamera( 12, window.innerWidth / window.innerHeight, 1, 20000 );
	    camera.position.z = 1400;
	    camera.position.y = 0;
	    camera.lookAt(scene.width/2, scene.height/2);
	    scene.add( camera );
	
	    // var windowResize = THREEx.WindowResize(renderer, camera)
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