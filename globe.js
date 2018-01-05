/**
 * Created by ss on 2018/1/2.
 */
Globe = function (container) {

    var mapIndexedImage;
    var mapOutlineImage;

    var camera, scene, renderer;

    var light1, light2;

    var rotating;


    var lookupCanvas;
    var lookupTexture;

    var mapUniforms;

    var sphere;

    this.addData = function () {

    };

    this.init = function () {
        mapIndexedImage = new Image();
        mapIndexedImage.src = 'assets/map_indexed.png';
        mapIndexedImage.onload = function () {
            mapOutlineImage = new Image();
            mapOutlineImage.src = 'assets/map_outline.png';
            mapOutlineImage.onload = function () {
                initScene();
                console.log('scene====', scene);
                animate();
            };
        };
    };

    function initScene() {

        //	-----------------------------------------------------------------------------
        //	Let's make a scene
        scene = new THREE.Scene();

        //这句话不知道为什么,到时候再研究
        scene.matrixAutoUpdate = false;
        // scene.fog = new THREE.FogExp2( 0xBBBBBB, 0.00003 );

        scene.add(new THREE.AmbientLight(0x505050));

        light1 = new THREE.SpotLight(0xeeeeee, 3);
        light1.position.x = 730;
        light1.position.y = 520;
        light1.position.z = 626;
        light1.castShadow = true;
        scene.add(light1);

        light2 = new THREE.PointLight(0x222222, 14.8);
        light2.position.x = -640;
        light2.position.y = -500;
        light2.position.z = -1000;
        scene.add(light2);

        rotating = new THREE.Object3D();
        scene.add(rotating);

        lookupCanvas = document.createElement('canvas');
        lookupCanvas.width = 256;
        lookupCanvas.height = 1;

        //为什么传入了一个canvas？
        lookupTexture = new THREE.Texture(lookupCanvas);
        lookupTexture.magFilter = THREE.NearestFilter;
        lookupTexture.minFilter = THREE.NearestFilter;
        lookupTexture.needsUpdate = true;

        var indexedMapTexture = new THREE.Texture(mapIndexedImage);
        //THREE.ImageUtils.loadTexture( 'images/map_indexed.png' );
        indexedMapTexture.needsUpdate = true;
        indexedMapTexture.magFilter = THREE.NearestFilter;
        indexedMapTexture.minFilter = THREE.NearestFilter;

        var outlinedMapTexture = new THREE.Texture(mapOutlineImage);
        outlinedMapTexture.needsUpdate = true;
        // outlinedMapTexture.magFilter = THREE.NearestFilter;
        // outlinedMapTexture.minFilter = THREE.NearestFilter;

        var uniforms = {
            'mapIndex': {type: 't', value: 0, texture: indexedMapTexture},
            'lookup': {type: 't', value: 1, texture: lookupTexture},
            'outline': {type: 't', value: 2, texture: outlinedMapTexture},
            'outlineLevel': {type: 'f', value: 1},
        };

        mapUniforms = uniforms;

        var shaderMaterial = new THREE.ShaderMaterial({

            uniforms: uniforms,
            // attributes:     attributes,
            vertexShader: document.getElementById('globeVertexShader').textContent,
            fragmentShader: document.getElementById('globeFragmentShader').textContent,
            // sizeAttenuation: true,
        });


        //	-----------------------------------------------------------------------------
        //	Create the backing (sphere)

        // backMat.ambient = new THREE.Color(255,255,255);
        sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 40, 40), shaderMaterial);
        // sphere.receiveShadow = true;
        // sphere.castShadow = true;
        sphere.doubleSided = false;
        sphere.rotation.x = Math.PI;
        sphere.rotation.y = -Math.PI / 2;
        sphere.rotation.z = Math.PI;
        sphere.id = "base";
        rotating.add(sphere);

        //	-----------------------------------------------------------------------------
        //	Setup our renderer
        renderer = new THREE.WebGLRenderer({antialias: false});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;

        renderer.sortObjects = false;
        renderer.generateMipmaps = false;

        container.appendChild(renderer.domElement);

        //	-----------------------------------------------------------------------------
        //	Setup our camera
        camera = new THREE.PerspectiveCamera(12, window.innerWidth / window.innerHeight, 1, 20000);
        camera.position.z = 1400;
        camera.position.y = 0;
        camera.lookAt(scene.width / 2, scene.height / 2);
        scene.add(camera);

        document.addEventListener('mousemove', onDocumentMouseMove, true);
        document.addEventListener('mousedown', onDocumentMouseDown, true);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('click', onClick, true);

    }

    var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
    var pressX = 0, pressY = 0;

    var dragging = false;

    function onDocumentMouseMove(event) {

        pmouseX = mouseX;
        pmouseY = mouseY;

        mouseX = event.clientX - window.innerWidth * 0.5;
        mouseY = event.clientY - window.innerHeight * 0.5;

        if (dragging) {
            rotateVY += (mouseX - pmouseX) / 2 * Math.PI / 180 * 0.3;
            rotateVX += (mouseY - pmouseY) / 2 * Math.PI / 180 * 0.3;
        }
    }

    function onDocumentMouseDown(event) {
        if (event.target.className.indexOf('noMapDrag') !== -1) {
            return;
        }
        dragging = true;
        pressX = mouseX;
        pressY = mouseY;
        rotateTargetX = undefined;
    }

    function onDocumentMouseUp(event) {

        dragging = false;
    }

    var rotateX = 0, rotateY = 0;
    var rotateVX = 0, rotateVY = 0;
    var rotateTargetX = undefined;
    var rotateTargetY = undefined;
    var rotateXMax = 90 * Math.PI / 180;

    function animate() {

        if (rotateTargetX !== undefined && rotateTargetY !== undefined) {

            rotateVX += (rotateTargetX - rotateX) * 0.012;
            rotateVY += (rotateTargetY - rotateY) * 0.012;

            if (Math.abs(rotateTargetX - rotateX) < 0.1 && Math.abs(rotateTargetY - rotateY) < 0.1) {
                rotateTargetX = undefined;
                rotateTargetY = undefined;
            }
        }

        rotateX += rotateVX;
        rotateY += rotateVY;

        //rotateY = wrap( rotateY, -Math.PI, Math.PI );

        rotateVX *= 0.98;
        rotateVY *= 0.98;

        if (dragging || rotateTargetX !== undefined) {
            rotateVX *= 0.6;
            rotateVY *= 0.6;
        }

        // rotateY += controllers.spin * 0.01;

        //	constrain the pivot up/down to the poles
        //	force a bit of bounce back action when hitting the poles
        if (rotateX < -rotateXMax) {
            rotateX = -rotateXMax;
            rotateVX *= -0.95;
        }
        if (rotateX > rotateXMax) {
            rotateX = rotateXMax;
            rotateVX *= -0.95;
        }

        rotating.rotation.x = rotateX;
        rotating.rotation.y = rotateY;


        renderer.clear();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }

    function onClick() {

        //	make the rest not work if the event was actually a drag style click
        if (Math.abs(pressX - mouseX) > 3 || Math.abs(pressY - mouseY) > 3)
            return;

        var pickColorIndex = getPickColor();
        //	find it
        // for( var i in countryColorMap ){
        //     var countryCode = i;
        //     var countryColorIndex = countryColorMap[i];
        //     if( pickColorIndex == countryColorIndex ){
        //         // console.log("selecting code " + countryCode);
        //         var countryName = countryLookup[countryCode];
        //         // console.log("converts to " + countryName);
        //         if( countryName === undefined )
        //             return;
        //         if( $.inArray(countryName, selectableCountries) <= -1 )
        //             return;
        //         // console.log(countryName);
        //         var selection = selectionData;
        //         selection.selectedCountry = countryName;
        //         selectVisualization( timeBins, selection.selectedYear, [selection.selectedCountry], selection.getExportCategories(), selection.getImportCategories() );
        //         // console.log('selecting ' + countryName + ' from click');
        //         return;
        //     }
        // }

        console.log(pickColorIndex);

        highlightCountry(pickColorIndex);

        // clickCountry();
    }

    function clickCountry() {

        //update parameters

        // highlightCountry();
        generateLines();
        generatePartial();
        initMarker();
    }

    function generateLines() {

    }

    function generatePartial() {

    }

    function initMarker() {

    }

    function highlightCountry(code) {

        var ctx = lookupCanvas.getContext('2d');
        ctx.clearRect(0, 0, 256, 1);

        var fillCSS = '#eeeeee';

        ctx.fillStyle = fillCSS;
        ctx.fillRect(code, 0, 1, 1);

        lookupTexture.needsUpdate = true;
    }

    function getPickColor() {

        mapUniforms['outlineLevel'].value = 0;
        lookupTexture.needsUpdate = true;

        renderer.autoClear = false;
        renderer.autoClearColor = false;
        renderer.autoClearDepth = false;
        renderer.autoClearStencil = false;

        renderer.clear();
        renderer.render(scene, camera);

        var gl = renderer.context;
        gl.preserveDrawingBuffer = true;

        var mx = ( mouseX + renderer.context.canvas.width / 2 );//(mouseX + renderer.context.canvas.width/2) * 0.25;
        var my = ( -mouseY + renderer.context.canvas.height / 2 );//(-mouseY + renderer.context.canvas.height/2) * 0.25;
        mx = Math.floor(mx);
        my = Math.floor(my);

        var buf = new Uint8Array(4);
        // console.log(buf);
        gl.readPixels(mx, my, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf);
        // console.log(buf);

        renderer.autoClear = true;
        renderer.autoClearColor = true;
        renderer.autoClearDepth = true;
        renderer.autoClearStencil = true;

        gl.preserveDrawingBuffer = false;

        mapUniforms['outlineLevel'].value = 1;

        return buf[0];
    }

    var visualizationMesh;

    var inputData = [
        {},
        {}
    ];

    var countryData = [];

    function buildDataVizGeometries( linearData ){

        var loadLayer = document.getElementById('loading');

        for( var i in linearData ){
            var yearBin = linearData[i].data;

            var year = linearData[i].t;

            var count = 0;
            console.log('Building data for ...' + year);
            for( var s in yearBin ){
                var set = yearBin[s];

                var exporterName = set.e.toUpperCase();
                var importerName = set.i.toUpperCase();

                exporter = countryData[exporterName];
                importer = countryData[importerName];

                //	we couldn't find the country, it wasn't in our list...
                if( exporter === undefined || importer === undefined )
                    continue;

                //	visualize this event
                set.lineGeometry = makeConnectionLineGeometry( exporter, importer, set.v, set.wc );

                // if( s % 1000 == 0 )
                // 	console.log( 'calculating ' + s + ' of ' + yearBin.length + ' in year ' + year);
            }

            //	use this break to only visualize one year (1992)
            // break;

            //	how to make this work?
            // loadLayer.innerHTML = 'loading data for ' + year + '...';
            // console.log(loadLayer.innerHTML);
        }

        console.log("*****");
        console.log(linearData);

        loadLayer.style.display = 'none';
    }

    var globeRadius = 1000;
    var vec3_origin = new THREE.Vector3(0,0,0);

    function makeConnectionLineGeometry( exporter, importer, value, type ){
        if( exporter.countryName == undefined || importer.countryName == undefined )
            return undefined;

        // console.log("making connection between " + exporter.countryName + " and " + importer.countryName + " with code " + type );

        var distanceBetweenCountryCenter = exporter.center.clone().subSelf(importer.center).length();

        //	how high we want to shoot the curve upwards
        var anchorHeight = globeRadius + distanceBetweenCountryCenter * 0.7;

        //	start of the line
        var start = exporter.center;

        //	end of the line
        var end = importer.center;

        //	midpoint for the curve
        var mid = start.clone().lerpSelf(end,0.5);
        var midLength = mid.length();
        mid.normalize();
        mid.multiplyScalar( midLength + distanceBetweenCountryCenter * 0.7 );

        //	the normal from start to end
        var normal = (new THREE.Vector3()).sub(start,end);
        normal.normalize();

        /*
         The curve looks like this:

         midStartAnchor---- mid ----- midEndAnchor
         /											  \
         /											   \
         /												\
         start/anchor 										 end/anchor

         splineCurveA							splineCurveB
         */

        var distanceHalf = distanceBetweenCountryCenter * 0.5;

        var startAnchor = start;
        var midStartAnchor = mid.clone().addSelf( normal.clone().multiplyScalar( distanceHalf ) );
        var midEndAnchor = mid.clone().addSelf( normal.clone().multiplyScalar( -distanceHalf ) );
        var endAnchor = end;

        //	now make a bezier curve out of the above like so in the diagram
        var splineCurveA = new THREE.CubicBezierCurve3( start, startAnchor, midStartAnchor, mid);
        // splineCurveA.updateArcLengths();

        var splineCurveB = new THREE.CubicBezierCurve3( mid, midEndAnchor, endAnchor, end);
        // splineCurveB.updateArcLengths();

        //	how many vertices do we want on this guy? this is for *each* side
        var vertexCountDesired = Math.floor( /*splineCurveA.getLength()*/ distanceBetweenCountryCenter * 0.02 + 6 ) * 2;

        //	collect the vertices
        //两个国建之间的距离越短获取点的数量越少
        var points = splineCurveA.getPoints( vertexCountDesired );

        //	remove the very last point since it will be duplicated on the next half of the curve
        points = points.splice(0,points.length-1);

        points = points.concat( splineCurveB.getPoints( vertexCountDesired ) );

        //	add one final point to the center of the earth
        //	we need this for drawing multiple arcs, but piled into one geometry buffer
        //不是很理解最后加上这个点的作用？
        points.push( vec3_origin );

        var val = value * 0.0003;

        var size = (10 + Math.sqrt(val));
        size = constrain(size,0.1, 60);

        //	create a line geometry out of these
        var curveGeometry = createLineGeometry( points );

        curveGeometry.size = size;

        return curveGeometry;
    }

    function getVisualizedMesh() {

    }

    function createLineGeometry( points ) {
        var geometry = new THREE.Geometry();
        for( var i = 0; i < points.length; i ++ ) {
            geometry.vertices.push( points[i] );
        }
        return geometry;
    }

    function constrain(v, min, max){
        if( v < min )
            v = min;
        else
        if( v > max )
            v = max;
        return v;
    }
};