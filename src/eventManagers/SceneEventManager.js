/**
 * Created by ss on 2018/1/7.
 */

import {CountryData} from "../countryInfo/CountryData.js";
import {CountryColorMap} from "../countryInfo/CountryColorMap";

function SceneEventManager(scene, handlers) {

    var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
    var pressX = 0, pressY = 0;

    var surfaceHandler = handlers.surfaceHandler;
    var rotationHandler = handlers.rotationHandler;
    var wheelHandler = handlers.wheelHandler;

    function onDocumentMouseMove(event) {

        pmouseX = mouseX;
        pmouseY = mouseY;

        mouseX = event.clientX - window.innerWidth * 0.5;
        mouseY = event.clientY - window.innerHeight * 0.5;

        if (rotationHandler.isDragging()) {

            rotationHandler.addRotateVY((mouseX - pmouseX) / 2 * Math.PI / 180 * 0.3);
            rotationHandler.addRotateVX((mouseY - pmouseY) / 2 * Math.PI / 180 * 0.3);
        }
    }

    function onDocumentMouseDown(event) {
        if (event.target.className.indexOf('noMapDrag') !== -1) {
            return;
        }

        rotationHandler.setDragging(true);
        pressX = mouseX;
        pressY = mouseY;
        rotationHandler.clearRotateTargetX();
    }

    function onDocumentMouseUp(event) {

        rotationHandler.setDragging(false);
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
            wheelHandler.handleMWheel(delta);

        event.returnValue = false;
    }

    function onClick() {

        //	make the rest not work if the event was actually a drag style click
        if (Math.abs(pressX - mouseX) > 3 || Math.abs(pressY - mouseY) > 3)
            return;

        var pickColorIndex = surfaceHandler.getPickColor(mouseX, mouseY);

        console.log(pickColorIndex);

        if (pickColorIndex != 0) {

            surfaceHandler.highlightCountry(pickColorIndex);

            scene.selectedCountry = CountryData[CountryColorMap[pickColorIndex]];

            rotationHandler.rotateToTargetCountry();

        }
    }

    scene.renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, true);
    scene.renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, true);
    scene.renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    scene.renderer.domElement.addEventListener('click', onClick, true);
    scene.renderer.domElement.addEventListener('mousewheel', onMouseWheel, false);
}

export {SceneEventManager}

