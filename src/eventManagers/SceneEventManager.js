/**
 * Created by ss on 2018/1/7.
 */
import {CountryColorMap} from "../countryInfo/CountryColorMap";

function SceneEventManager() {

    var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
    var pressX = 0, pressY = 0;

    var controller;

    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();

    function onDocumentMouseMove(event) {

        pmouseX = mouseX;
        pmouseY = mouseY;

        mouseX = event.clientX - controller.container.clientWidth * 0.5 - controller.container.offsetLeft;
        mouseY = event.clientY - controller.container.clientHeight * 0.5 - controller.container.offsetTop;

        if (controller.rotationHandler.isDragging()) {

            controller.rotationHandler.addRotateVY((mouseX - pmouseX) / 2 * Math.PI / 180 * 0.3);
            controller.rotationHandler.addRotateVX((mouseY - pmouseY) / 2 * Math.PI / 180 * 0.3);
        }
    }

    function onDocumentMouseDown(event) {
        if (event.target.className.indexOf('noMapDrag') !== -1) {
            return;
        }

        controller.rotationHandler.setDragging(true);
        pressX = mouseX;
        pressY = mouseY;
        controller.rotationHandler.clearRotateTargetX();
    }

    function onDocumentMouseUp(event) {

        controller.rotationHandler.setDragging(false);
    }

    function onMouseWheel(event) {
        var delta = 0;

        if (event.wheelDelta) { /* IE/Opera. */
            delta = event.wheelDelta / 120;
        }
        //	firefox
        else if (event.detail) {
            delta = -event.detail / 3;
        }

        if (delta)
            controller.wheelHandler.handleMWheel(delta);

        event.returnValue = false;
    }

    function onResize(event) {
        controller.resizeHandler.resizeScene();
    }

    function onClick() {

        //	make the rest not work if the event was actually a drag style click
        if (Math.abs(pressX - mouseX) > 3 || Math.abs(pressY - mouseY) > 3)
            return;

        mouse.x = ((event.clientX - controller.container.offsetLeft) / controller.container.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - controller.container.offsetTop) / controller.container.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, controller.camera);

        var intersects = raycaster.intersectObjects(controller.scene.children, true);

        if (intersects.length === 0) {
            return;
        }

        var pickColorIndex = controller.surfaceHandler.getPickColor(mouseX, mouseY);

        console.log(pickColorIndex);

        if (CountryColorMap[pickColorIndex] !== undefined &&
            pickColorIndex !== 0 &&
            (controller.configure.disableUnrelated && controller.mentionedCountryCodes.indexOf(pickColorIndex) !== -1 || !controller.configure.disableUnrelated)) {

            controller.switchCountryHandler.executeSwitch(pickColorIndex)
        }
    }

    function bindEvent(controllerPara) {

        controller = controllerPara;

        controller.renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, true);
        controller.renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, true);
        controller.renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        controller.renderer.domElement.addEventListener('click', onClick, true);
        controller.renderer.domElement.addEventListener('mousewheel', onMouseWheel, false);

        window.addEventListener('resize', onResize, false);
    }

    return {
        bindEvent: bindEvent
    }

}

export {SceneEventManager}