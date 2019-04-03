/**
 * @author syt123450 / https://github.com/syt123450
 */

import { Utils } from "../utils/Utils.js";

/**
 * This handlers handle rotation of the globe.
 */

function RotationHandler ( controller ) {

    var rotateX = 0, rotateY = 0;
    var rotateVX = 0, rotateVY = 0;
    var rotateTargetX = undefined;
    var rotateTargetY = undefined;
    var rotateXMax = 90 * Math.PI / 180;

    var dragging = false;
    
    var basicRotationSpeed = 0.005;
    
    var autoRotation = undefined;
    var rotationRatio = undefined;
	
    function update () {

        if ( rotateTargetX !== undefined && rotateTargetY !== undefined ) {

            rotateVX += ( rotateTargetX - rotateX ) * 0.012;
            rotateVY += ( rotateTargetY - rotateY ) * 0.012;

            if ( Math.abs( rotateTargetX - rotateX ) < 0.1 && Math.abs( rotateTargetY - rotateY ) < 0.1 ) {

                rotateTargetX = undefined;
                rotateTargetY = undefined;

            }

        } else {
	
            if ( autoRotation ) {
             
	            rotateVY = basicRotationSpeed * rotationRatio;
             
            }
         
        }

        rotateX += rotateVX;
        rotateY += rotateVY;

        rotateVX *= 0.98;
        rotateVY *= 0.98;

        if ( dragging || rotateTargetX !== undefined ) {

            rotateVX *= 0.6;
            rotateVY *= 0.6;

        }

        if ( rotateX < -rotateXMax ) {

            rotateX = -rotateXMax;
            rotateVX *= -0.95;

        }

        if ( rotateX > rotateXMax ) {

            rotateX = rotateXMax;
            rotateVX *= -0.95;

        }

        controller.rotating.rotation.x = rotateX;
        controller.rotating.rotation.y = rotateY;

    }

    function rotateToTargetCountry () {

        var selectedCountry = controller.selectedCountry;

        rotateTargetX = selectedCountry.lat * Math.PI / 180;
        var targetY0 = -( selectedCountry.lon - 9 ) * Math.PI / 180;
        var piCounter = 0;

        while( true ) {

            var targetY0Neg = targetY0 - Math.PI * 2 * piCounter;
            var targetY0Pos = targetY0 + Math.PI * 2 * piCounter;

            if ( Math.abs( targetY0Neg - controller.rotating.rotation.y ) < Math.PI ) {

                rotateTargetY = targetY0Neg;
                break;

            } else if ( Math.abs( targetY0Pos - controller.rotating.rotation.y ) < Math.PI ) {

                rotateTargetY = targetY0Pos;
                break;

            }

            piCounter++;
            rotateTargetY = Utils.wrap(targetY0, -Math.PI, Math.PI);

        }

        rotateVX *= 0.6;
        rotateVY *= 0.6;

    }
    
    function updateRotationConfig() {
        
	    autoRotation = controller.configure.control.autoRotation;
	    rotationRatio = controller.configure.control.rotationRatio;
	    
    }

    return {

        rotateToTargetCountry: rotateToTargetCountry,

        update: update,
	
	    updateRotationConfig: updateRotationConfig,

        addRotateVY: function ( VYValue ) {

            rotateVY += VYValue;

        },

        addRotateVX: function ( VXValue ) {

            rotateVX += VXValue;

        },

        setDragging: function( isDragging ) {

            dragging = isDragging;

        },

        isDragging: function () {

            return dragging;

        },

        clearRotateTargetX: function () {

            rotateTargetX = undefined;

        }

    }

}

export { RotationHandler }