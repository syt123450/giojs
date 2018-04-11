/**
 * @author syt123450 / https://github.com/syt123450
 */

import { CountryColorMap } from "../countryInfo/CountryColorMap.js";
import { Utils } from "../utils/Utils.js";

/**
 * This Manager manage all mouse event for the scene.
 * This Manager will be created when InitHandler's init() function is called.
 */

function SceneEventManager () {

    var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
    var pressX = 0, pressY = 0;

    var controller;

    // the mouse and raycaster is used to judge whether the mouse is clicked on the globe

    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();

    function onDocumentMouseMove ( event ) {

        pmouseX = mouseX;
        pmouseY = mouseY;

        mouseX = event.clientX - controller.container.clientWidth * 0.5 - Utils.getElementViewLeft( controller.container );
        mouseY = event.clientY - controller.container.clientHeight * 0.5 - Utils.getElementViewTop( controller.container );

        // if it is in a dragging state, let the RotationHandler to handlers the rotation of the globe

        if ( controller.rotationHandler.isDragging() ) {

            controller.rotationHandler.addRotateVY( ( mouseX - pmouseX ) / 2 * Math.PI / 180 * 0.3 );
            controller.rotationHandler.addRotateVX( ( mouseY - pmouseY ) / 2 * Math.PI / 180 * 0.3 );

        }

    }

    function onDocumentMouseDown ( event ) {

        if ( event.target.className.indexOf( 'noMapDrag' ) !== -1 ) {

            return;

        }

        // set the state to the dragging state

        controller.rotationHandler.setDragging( true );
        pressX = mouseX;
        pressY = mouseY;
        controller.rotationHandler.clearRotateTargetX();

    }

    function onDocumentMouseUp ( event ) {

        // When mouse up, the notify the RotatingHandler to set drag false

        controller.rotationHandler.setDragging( false );

    }

    function onMouseWheel ( event ) {

        var delta = 0;

        // calculate the mouse wheel delta in IE or Opera

        if ( event.wheelDelta ) {

            delta = event.wheelDelta / 120;

        }

        //	calculate the mouse wheel delta in firefox

        else if ( event.detail ) {

            delta = -event.detail / 3;

        }

        if ( delta ) {

            // use the WheelHandler to handle actual mouse wheel event, if we would like to do something

            controller.wheelHandler.handleMWheel(delta);

        }

        event.returnValue = false;

    }

    function onResize ( event ) {

        // use the ResizeHandler to handle the actual window resize event, if we would like to do something

        controller.resizeHandler.resizeScene();

    }

    function onClick ( event ) {

        //	if the click is drag, do nothing

        if ( Math.abs( pressX - mouseX ) > 3 || Math.abs( pressY - mouseY ) > 3 ) {

            return;

        }

        // let the mouse and raycaster to judge whether the click is on the earth, if not do noting

        mouse.x = ( ( event.clientX - Utils.getElementViewLeft( controller.container ) ) / controller.container.clientWidth ) * 2 - 1;
        mouse.y = -( ( event.clientY - Utils.getElementViewTop( controller.container ) ) / controller.container.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, controller.camera );

        var intersects = raycaster.intersectObjects( controller.scene.children, true );

        // intersects.length === 0 means that the mouse click is not on the globe

        if ( intersects.length === 0 ) {

            return;

        }

        // to get the color of clicked area on the globe's surface

        var pickColorIndex = controller.surfaceHandler.getPickColor( mouseX, mouseY );

        // for debug

        // console.log( pickColorIndex );

        /**
         * on a specific condition will let the SwitchCountryHandler to execute switch
         * condition:
         * 1. the picked color is actually a color to represent a country
         * 2. the picked color is not 0 (0 represents ocean)
         * 3. if the user want only the mentioned countries can be clicked, it will judge whether the picked country is mentioned
         */

        if ( CountryColorMap[ pickColorIndex ] !== undefined &&
             pickColorIndex !== 0 &&
             ( ( controller.configure.control.disableUnmentioned &&
                 controller.mentionedCountryCodes.indexOf( pickColorIndex ) !== -1 ) ||
                 !controller.configure.control.disableUnmentioned ) ) {

            controller.switchCountryHandler.executeSwitch( pickColorIndex )

        }

    }

    function onTouchStart ( event ) {

		if ( event.target.className.indexOf( 'noMapDrag' ) !== -1 ) {

			return;

		}

		// set the state to the dragging state

		controller.rotationHandler.setDragging( true );
		pressX = mouseX;
		pressY = mouseY;
		controller.rotationHandler.clearRotateTargetX();

    }

    function onTouchEnd ( event ) {

		// When touch up, the notify the RotatingHandler to set drag false

		controller.rotationHandler.setDragging( false );

    }

    function onTouchMove ( event ) {

		pmouseX = mouseX;
		pmouseY = mouseY;

		// get clientX and clientY from "event.touches[0]", different with onmousemove event

		mouseX = event.touches[0].clientX - controller.container.clientWidth * 0.5 - Utils.getElementViewLeft( controller.container );
		mouseY = event.touches[0].clientY - controller.container.clientHeight * 0.5 - Utils.getElementViewTop( controller.container );

		// if it is in a dragging state, let the RotationHandler to handlers the rotation of the globe

		if ( controller.rotationHandler.isDragging() ) {

			controller.rotationHandler.addRotateVY( ( mouseX - pmouseX ) / 2 * Math.PI / 180 * 0.3 );
			controller.rotationHandler.addRotateVX( ( mouseY - pmouseY ) / 2 * Math.PI / 180 * 0.3 );

		}

    }

    /**
     * bind all event handlers to the dom of the scene, the resize event will be bind to window.
     * This function will be called when InitHandler's init() function be called
     */

    function bindEvent ( controllerPara ) {

        controller = controllerPara;

        controller.renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, true );
        controller.renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, true );
        controller.renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
        controller.renderer.domElement.addEventListener( 'click', onClick, true );
        controller.renderer.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
        controller.renderer.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false );

		controller.renderer.domElement.ontouchstart = onTouchStart;
		controller.renderer.domElement.ontouchend = onTouchEnd;
		controller.renderer.domElement.ontouchmove = onTouchMove;

        window.addEventListener( 'resize', onResize, false );

    }

    return {

        bindEvent: bindEvent

    }

}

export { SceneEventManager }