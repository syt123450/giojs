/**
 * Created by ss on 2018/1/2.
 */
Globe = function (container) {

    var countryColorMap = {
        'PE': 1,
        'BF': 2,
        'FR': 3,
        'LY': 4,
        'BY': 5,
        'PK': 6,
        'ID': 7,
        'YE': 8,
        'MG': 9,
        'BO': 10,
        'CI': 11,
        'DZ': 12,
        'CH': 13,
        'CM': 14,
        'MK': 15,
        'BW': 16,
        'UA': 17,
        'KE': 18,
        'TW': 19,
        'JO': 20,
        'MX': 21,
        'AE': 22,
        'BZ': 23,
        'BR': 24,
        'SL': 25,
        'ML': 26,
        'CD': 27,
        'IT': 28,
        'SO': 29,
        'AF': 30,
        'BD': 31,
        'DO': 32,
        'GW': 33,
        'GH': 34,
        'AT': 35,
        'SE': 36,
        'TR': 37,
        'UG': 38,
        'MZ': 39,
        'JP': 40,
        'NZ': 41,
        'CU': 42,
        'VE': 43,
        'PT': 44,
        'CO': 45,
        'MR': 46,
        'AO': 47,
        'DE': 48,
        'SD': 49,
        'TH': 50,
        'AU': 51,
        'PG': 52,
        'IQ': 53,
        'HR': 54,
        'GL': 55,
        'NE': 56,
        'DK': 57,
        'LV': 58,
        'RO': 59,
        'ZM': 60,
        'IR': 61,
        'MM': 62,
        'ET': 63,
        'GT': 64,
        'SR': 65,
        'EH': 66,
        'CZ': 67,
        'TD': 68,
        'AL': 69,
        'FI': 70,
        'SY': 71,
        'KG': 72,
        'SB': 73,
        'OM': 74,
        'PA': 75,
        'AR': 76,
        'GB': 77,
        'CR': 78,
        'PY': 79,
        'GN': 80,
        'IE': 81,
        'NG': 82,
        'TN': 83,
        'PL': 84,
        'NA': 85,
        'ZA': 86,
        'EG': 87,
        'TZ': 88,
        'GE': 89,
        'SA': 90,
        'VN': 91,
        'RU': 92,
        'HT': 93,
        'BA': 94,
        'IN': 95,
        'CN': 96,
        'CA': 97,
        'SV': 98,
        'GY': 99,
        'BE': 100,
        'GQ': 101,
        'LS': 102,
        'BG': 103,
        'BI': 104,
        'DJ': 105,
        'AZ': 106,
        'MY': 107,
        'PH': 108,
        'UY': 109,
        'CG': 110,
        'RS': 111,
        'ME': 112,
        'EE': 113,
        'RW': 114,
        'AM': 115,
        'SN': 116,
        'TG': 117,
        'ES': 118,
        'GA': 119,
        'HU': 120,
        'MW': 121,
        'TJ': 122,
        'KH': 123,
        'KR': 124,
        'HN': 125,
        'IS': 126,
        'NI': 127,
        'CL': 128,
        'MA': 129,
        'LR': 130,
        'NL': 131,
        'CF': 132,
        'SK': 133,
        'LT': 134,
        'ZW': 135,
        'LK': 136,
        'IL': 137,
        'LA': 138,
        'KP': 139,
        'GR': 140,
        'TM': 141,
        'EC': 142,
        'BJ': 143,
        'SI': 144,
        'NO': 145,
        'MD': 146,
        'LB': 147,
        'NP': 148,
        'ER': 149,
        'US': 150,
        'KZ': 151,
        'AQ': 152,
        'SZ': 153,
        'UZ': 154,
        'MN': 155,
        'BT': 156,
        'NC': 157,
        'FJ': 158,
        'KW': 159,
        'TL': 160,
        'BS': 161,
        'VU': 162,
        'FK': 163,
        'GM': 164,
        'QA': 165,
        'JM': 166,
        'CY': 167,
        'PR': 168,
        'PS': 169,
        'BN': 170,
        'TT': 171,
        'CV': 172,
        'PF': 173,
        'WS': 174,
        'LU': 175,
        'KM': 176,
        'MU': 177,
        'FO': 178,
        'ST': 179,
        'AN': 180,
        'DM': 181,
        'TO': 182,
        'KI': 183,
        'FM': 184,
        'BH': 185,
        'AD': 186,
        'MP': 187,
        'PW': 188,
        'SC': 189,
        'AG': 190,
        'BB': 191,
        'TC': 192,
        'VC': 193,
        'LC': 194,
        'YT': 195,
        'VI': 196,
        'GD': 197,
        'MT': 198,
        'MV': 199,
        'KY': 200,
        'KN': 201,
        'MS': 202,
        'BL': 203,
        'NU': 204,
        'PM': 205,
        'CK': 206,
        'WF': 207,
        'AS': 208,
        'MH': 209,
        'AW': 210,
        'LI': 211,
        'VG': 212,
        'SH': 213,
        'JE': 214,
        'AI': 215,
        'MF_1_': 216,
        'GG': 217,
        'SM': 218,
        'BM': 219,
        'TV': 220,
        'NR': 221,
        'GI': 222,
        'PN': 223,
        'MC': 224,
        'VA': 225,
        'IM': 226,
        'GU': 227,
        'SG': 228
    };

    var mapIndexedImage;
    var mapOutlineImage;

    var camera, scene, renderer, controls;
    var timeBins;
    var latlonData;
    var selectableCountries = [];

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
        // document.addEventListener('onclick', onClick, false);
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
        var affectedCountries = undefined;
        // if( visualizationMesh.children[0] !== undefined )
        //     affectedCountries = visualizationMesh.children[0].affectedCountries;
        //
        // highlightCountry([]);
        // rotating.remove(visualizationMesh);
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
        // rotating.add(visualizationMesh);


        if (affectedCountries !== undefined) {
            // highlightCountry(affectedCountries);
        }
        return buf[0];
    }
};