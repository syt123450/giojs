/**
 * Created by ss on 2018/1/7.
 */

import {CountryColorMap} from "./countryInfo/CountryColorMap";
import {CountryData} from "./countryInfo/CountryData.js";
import {JSONLoader} from "./dataLoaders/JSONLoader.js";
import {Marker} from "./markers/Marker.js";
import {ConnectionLineSystem} from "./objects/ConnectionLineSystem.js";
import {MovingParticleSystem} from "./objects/MovingParticleSystem.js";
import {EarthSurfaceShader} from "./shaders/EarthSurfaceShader.js";
import {MovingSpriteShader} from "./shaders/MovingSpriteShader.js";
import {SceneEventManager} from "./eventManagers/SceneEventManager.js";

function Scene(container) {
    var reversedCountryColorMap = new CountryColorMap();

    var countryData = new CountryData();

    var selectedCountry = countryData["CN"];

    var mapIndexedImage;
    var mapOutlineImage;

    var camera, scene, renderer;

    var light1, light2;

    var rotating;

    var lookupCanvas;
    var lookupTexture;

    var mapUniforms;

    var sphere;

    var inputData;

    // this.addData = function (data) {
    //     inputData = JSON.parse(JSON.stringify(data));
    // };

    function addData (data) {
        inputData = JSON.parse(JSON.stringify(data));
    }

    function init () {

    // this.init = function () {
        mapIndexedImage = new Image();
        mapIndexedImage.src = '../assets/images/map_indexed.png';
        mapIndexedImage.onload = function () {
            mapOutlineImage = new Image();
            mapOutlineImage.src = '../assets/images/map_outline.png';
            mapOutlineImage.onload = function () {
                initScene();
                console.log('scene====', scene);
                animate();
            };
        };
    };

    function initScene() {

        buildDataVizGeometries();

        //	-----------------------------------------------------------------------------
        //	Let's make a scene
        scene = new THREE.Scene();

        //这句话不知道为什么,到时候再研究
        // scene.matrixAutoUpdate = false;
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

        sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 40, 40), shaderMaterial);
        // sphere.receiveShadow = true;
        // sphere.castShadow = true;
        sphere.doubleSided = false;
        sphere.rotation.x = Math.PI;
        sphere.rotation.y = -Math.PI / 2;
        sphere.rotation.z = Math.PI;
        sphere.id = "base";
        rotating.add(sphere);

        //create visualization mesh, add it to rotating object
        visualizationMesh = new THREE.Object3D();
        rotating.add(visualizationMesh);

        var lines = getVisualizedMesh();
        visualizationMesh.add(lines);

        //	-----------------------------------------------------------------------------
        //	Setup our renderer
        var sceneArea = document.createElement("canvas");
        sceneArea.style.backgroundColor = "#000000";
        renderer = new THREE.WebGLRenderer({canvas: sceneArea, antialias: false});
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

        rotateToTargetCountry();
        highlightCountry(96);

        sceneArea.addEventListener('mousemove', onDocumentMouseMove, true);
        sceneArea.addEventListener('mousedown', onDocumentMouseDown, true);
        sceneArea.addEventListener('mouseup', onDocumentMouseUp, false);
        sceneArea.addEventListener('click', onClick, true);
        sceneArea.addEventListener( 'mousewheel', onMouseWheel, false );

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

    function onMouseWheel( event ){
        var delta = 0;

        if (event.wheelDelta) { /* IE/Opera. */
            delta = event.wheelDelta/120;
        }
        //	firefox
        else if( event.detail ){
            delta = -event.detail/3;
        }

        if (delta)
            handleMWheel(delta);

        event.returnValue = false;
    }

    function handleMWheel( delta ) {
        camera.scale.z += delta * 0.1;
        camera.scale.z = constrain( camera.scale.z, 0.7, 5.0 );
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

        THREE.SceneUtils.traverseHierarchy(rotating,
            function (mesh) {
                if (mesh.update !== undefined) {
                    mesh.update();
                }
            }
        );
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

        if (pickColorIndex != 0) {
            highlightCountry(pickColorIndex);

            selectedCountry = countryData[reversedCountryColorMap[pickColorIndex]];

            rotateToTargetCountry();
        }


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

        var oceanFill = 10;
        ctx.fillStyle = 'rgb(' + oceanFill + ',' + oceanFill + ',' + oceanFill +')';
        ctx.fillRect( 0, 0, 1, 1 );

        var fillCSS = '#eeeeee';

        ctx.fillStyle = fillCSS;
        ctx.fillRect(code, 0, 1, 1);

        lookupTexture.needsUpdate = true;
    }

    function getPickColor() {

        var ctx = lookupCanvas.getContext('2d');
        ctx.clearRect(0, 0, 256, 1);

        var oceanFill = 0;
        ctx.fillStyle = 'rgb(' + oceanFill + ',' + oceanFill + ',' + oceanFill +')';
        ctx.fillRect( 0, 0, 1, 1 );

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

    function buildDataVizGeometries() {

        for (var s in inputData) {
            var set = inputData[s];

            var exporterName = set.e.toUpperCase();
            var importerName = set.i.toUpperCase();

            var exporter = countryData[exporterName];
            var importer = countryData[importerName];

            set.lineGeometry = makeConnectionLineGeometry(exporter, importer, set.v);
        }
    }

    var vec3_origin = new THREE.Vector3(0, 0, 0);

    function makeConnectionLineGeometry(exporter, importer, value) {

        console.log("making connection between " + exporter.name + " and " + importer.name);

        var distanceBetweenCountryCenter = exporter.center.clone().subSelf(importer.center).length();

        var start = exporter.center;
        var end = importer.center;

        var mid = start.clone().lerpSelf(end, 0.5);
        var midLength = mid.length();
        mid.normalize();
        mid.multiplyScalar(midLength + distanceBetweenCountryCenter * 0.7);

        var normal = (new THREE.Vector3()).sub(start, end);
        normal.normalize();

        var distanceHalf = distanceBetweenCountryCenter * 0.5;

        var startAnchor = start;
        var midStartAnchor = mid.clone().addSelf(normal.clone().multiplyScalar(distanceHalf));
        var midEndAnchor = mid.clone().addSelf(normal.clone().multiplyScalar(-distanceHalf));
        var endAnchor = end;

        var splineCurveA = new THREE.CubicBezierCurve3(start, startAnchor, midStartAnchor, mid);
        var splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end);

        var vertexCountDesired = Math.floor(distanceBetweenCountryCenter * 0.02 + 6) * 2;

        var points = splineCurveA.getPoints(vertexCountDesired);

        points = points.splice(0, points.length - 1);
        points = points.concat(splineCurveB.getPoints(vertexCountDesired));
        points.push(vec3_origin);

        var val = value * 0.0003;
        var size = (10 + Math.sqrt(val));
        size = constrain(size, 0.1, 60);

        var curveGeometry = new THREE.Geometry();
        for (var i = 0; i < points.length; i++) {
            curveGeometry.vertices.push(points[i]);
        }
        curveGeometry.size = size;

        return curveGeometry;
    }

    var exportColor = 0xdd380c;
    var importColor = 0x154492;

    function getVisualizedMesh() {

        var linesGeo = new THREE.Geometry();
        var lineColors = [];

        var particlesGeo = new THREE.Geometry();
        var particleColors = [];

        for (var i in inputData) {
            var set = inputData[i];

            var lineColor = new THREE.Color(exportColor);

            var lastColor;
            for (s in set.lineGeometry.vertices) {
                lineColors.push(lineColor);
                lastColor = lineColor;
            }

            THREE.GeometryUtils.merge(linesGeo, set.lineGeometry);

            var particleColor = lastColor.clone();
            var points = set.lineGeometry.vertices;
            var particleCount = Math.floor(set.v / 8000 / set.lineGeometry.vertices.length) + 1;
            particleCount = constrain(particleCount, 1, 100);
            var particleSize = set.lineGeometry.size;
            for (var s = 0; s < particleCount; s++) {

                var desiredIndex = s / particleCount * points.length;
                var rIndex = constrain(Math.floor(desiredIndex), 0, points.length - 1);

                var point = points[rIndex];
                var particle = point.clone();
                particle.moveIndex = rIndex;
                particle.nextIndex = rIndex + 1;
                if (particle.nextIndex >= points.length)
                    particle.nextIndex = 0;
                particle.lerpN = 0;
                particle.path = points;
                particlesGeo.vertices.push(particle);
                particle.size = particleSize;
                particleColors.push(particleColor);
            }

        }

        linesGeo.colors = lineColors;

        var splineOutline = new THREE.Line(linesGeo, new THREE.LineBasicMaterial(
            {
                color: 0xffffff,
                opacity: 1.0,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                vertexColors: true,
                linewidth: 1
            })
        );

        splineOutline.renderDepth = false;


        var attributes = {
            size: {type: 'f', value: []},
            customColor: {type: 'c', value: []}
        };

        var uniforms = {
            amplitude: {type: "f", value: 1.0},
            color: {type: "c", value: new THREE.Color(0xffffff)},
            texture: {type: "t", value: 0, texture: THREE.ImageUtils.loadTexture("../assets/images/particleA.png")},
        };

        var shaderMaterial = new THREE.ShaderMaterial({

            uniforms: uniforms,
            attributes: attributes,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent,

            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false,
            transparent: true
        });

        particlesGeo.colors = particleColors;
        var pSystem = new THREE.ParticleSystem(particlesGeo, shaderMaterial);
        pSystem.dynamic = true;
        splineOutline.add(pSystem);

        var vertices = pSystem.geometry.vertices;
        var values_size = attributes.size.value;
        var values_color = attributes.customColor.value;

        for (var v = 0; v < vertices.length; v++) {
            values_size[v] = pSystem.geometry.vertices[v].size;
            values_color[v] = particleColors[v];
        }

        pSystem.update = function () {

            for (var i in this.geometry.vertices) {
                var particle = this.geometry.vertices[i];
                var path = particle.path;

                particle.lerpN += 0.05;
                if (particle.lerpN > 1) {
                    particle.lerpN = 0;
                    particle.moveIndex = particle.nextIndex;
                    particle.nextIndex++;
                    if (particle.nextIndex >= path.length) {
                        particle.moveIndex = 0;
                        particle.nextIndex = 1;
                    }
                }

                var currentPoint = path[particle.moveIndex];
                var nextPoint = path[particle.nextIndex];


                particle.copy(currentPoint);
                particle.lerpSelf(nextPoint, particle.lerpN);
            }
            this.geometry.verticesNeedUpdate = true;
        };

        return splineOutline;
    }

    function rotateToTargetCountry() {
        rotateTargetX = selectedCountry.lat * Math.PI/180;
        var targetY0 = -(selectedCountry.lon - 9) * Math.PI / 180;
        var piCounter = 0;
        while(true) {
            var targetY0Neg = targetY0 - Math.PI * 2 * piCounter;
            var targetY0Pos = targetY0 + Math.PI * 2 * piCounter;
            if(Math.abs(targetY0Neg - rotating.rotation.y) < Math.PI) {
                rotateTargetY = targetY0Neg;
                break;
            } else if(Math.abs(targetY0Pos - rotating.rotation.y) < Math.PI) {
                rotateTargetY = targetY0Pos;
                break;
            }
            piCounter++;
            rotateTargetY = wrap(targetY0, -Math.PI, Math.PI);
        }

        rotateVX *= 0.6;
        rotateVY *= 0.6;
    }

    function wrap(value, min, rangeSize) {
        rangeSize-=min;
        while (value < min) {
            value += rangeSize;
        }
        return value % rangeSize;
    }

    function constrain(v, min, max) {
        if (v < min)
            v = min;
        else if (v > max)
            v = max;
        return v;
    }

    return {
        addData: addData,

        init: init
    }
}

export {Scene}