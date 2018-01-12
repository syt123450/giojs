var ObjectUtils = (function() {

    function createCamera(container) {
        var camera = new THREE.PerspectiveCamera(12, container.clientWidth / container.clientHeight, 1, 20000);
        camera.position.z = 1400;
        camera.position.y = 0;
        // camera.lookAt(scene.width / 2, scene.height / 2);
        camera.lookAt(0, 0, 0);

        return camera;
    }

    function createLights() {

        var lights = [];

        var light1 = new THREE.AmbientLight(0x505050);

        var light2 = new THREE.SpotLight(0xeeeeee, 3);
        light2.position.x = 730;
        light2.position.y = 520;
        light2.position.z = 626;
        light2.castShadow = true;

        var light3 = new THREE.PointLight(0x222222, 14.8);
        light3.position.x = -640;
        light3.position.y = -500;
        light3.position.z = -1000;

        lights.push(light1);
        lights.push(light2);
        lights.push(light3);

        return lights;
    }

    function createRenderer(container) {

        var sceneArea = document.createElement("canvas");
        sceneArea.width = container.width;
        sceneArea.height = container.height;
        sceneArea.style.backgroundColor = "#000000";

        var renderer = new THREE.WebGLRenderer({canvas: sceneArea, antialias: false});
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.autoClear = false;
        renderer.sortObjects = false;
        renderer.generateMipmaps = false;

        return renderer;
    }

    function createStats() {

        var stats = new Stats();
        stats.showPanel( 1 );
        document.body.appendChild( stats.dom );

        return stats;
    }

    return {

        createCamera: createCamera,

        createLights: createLights,

        createRenderer: createRenderer,

        createStats: createStats
    }
}());

export {ObjectUtils}