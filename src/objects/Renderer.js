/**
 * Created by ss on 2018/1/8.
 */

function Renderer(container) {

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

export {Renderer}