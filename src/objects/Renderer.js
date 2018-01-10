/**
 * Created by ss on 2018/1/8.
 */

function Renderer() {
    var sceneArea = document.createElement("canvas");
    sceneArea.style.backgroundColor = "#000000";
    var renderer = new THREE.WebGLRenderer({canvas: sceneArea, antialias: false});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    renderer.sortObjects = false;
    renderer.generateMipmaps = false;

    return renderer;
}

export {Renderer}