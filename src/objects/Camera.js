/**
 * Created by ss on 2018/1/8.
 */

function Camera() {

    var camera = new THREE.PerspectiveCamera(12, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.z = 1400;
    camera.position.y = 0;
    // camera.lookAt(scene.width / 2, scene.height / 2);
    camera.lookAt(0, 0, 0);

    return camera;
}

export {Camera}