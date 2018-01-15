
import {LineGeometry} from "../objects/LineGeometry.js";
import {SceneEventManager} from "../eventManagers/SceneEventManager.js";
import {DefaultDataPreprocessors} from "../dataPreprocessors/DefaultDataPreprocessors.js";
import {ObjectUtils} from "../utils/BasicObjectUtils.js";
import {Sphere} from "../objects/Sphere";

function InitHandler(controller) {

    function init() {

        initScene();
        animate();
    }

    function initScene() {

        if (controller.configure.loadingSrc !== null) {
            var loadingIcon = ObjectUtils.createLoading(controller);
            controller.container.appendChild(loadingIcon);
        }

        controller.renderer = ObjectUtils.createRenderer(controller.container);
        controller.camera = ObjectUtils.createCamera(controller.container);
        controller.lights = ObjectUtils.createLights();

        controller.sphere = new Sphere(controller);
        controller.earthSurfaceShader = controller.sphere.earthSurfaceShader;

        controller.scene = new THREE.Scene();
        controller.rotating = new THREE.Object3D();

        if (controller.configure.isStatsEnabled) {
            controller.stats = ObjectUtils.createStats(container);
        }

        DefaultDataPreprocessors.process(controller);

        LineGeometry.buildDataVizGeometries(controller);

        for (var i in controller.lights) {
            controller.scene.add(controller.lights[i]);
        }

        controller.scene.add(controller.rotating);

        controller.rotating.add(controller.sphere);

        controller.scene.add(controller.camera);

        (new SceneEventManager).bindEvent(controller);
        controller.visSystemHandler.updateSystem();

        controller.container.appendChild(controller.renderer.domElement);

        if (controller.configure.loadingSrc !== null) {
            controller.container.removeChild(loadingIcon);
        }

        controller.rotationHandler.rotateToTargetCountry();
        controller.surfaceHandler.highlightCountry(controller.selectedCountry["colorCode"]);
    }

    function animate() {

        if (controller.isStatsEnabled) {
            controller.stats.update();
        }

        controller.rotationHandler.update();

        controller.renderer.clear();
        controller.renderer.render(controller.scene, controller.camera);

        THREE.SceneUtils.traverseHierarchy(controller.rotating,
            function (mesh) {
                if (mesh.update !== undefined) {
                    mesh.update();
                }
            }
        );

        requestAnimationFrame(animate);
    }

    return {
        init: init
    }
}

export {InitHandler}