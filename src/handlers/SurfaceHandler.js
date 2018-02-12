/**
 * @author syt123450 / https://github.com/syt123450
 */

import { Utils } from "../utils/Utils.js";

/**
 * This handlers handle all task related to the earth surface.
 */

function SurfaceHandler ( controller ) {

    var highlightColor = 255;

    var oceanMin = 0, oceanMax = 20;
    var mentionedMin = 50, mentionedMax = 100;
    var relatedMin = 100, relatedMax = 150;

    // this function return a color code range in (0 - 255) from a clicked area on the screen

    function getPickColor ( mouseX, mouseY ) {

        // first need to hide above layer and shows the map_index image

        var ctx = controller.earthSurfaceShader.lookupCanvas.getContext( '2d' );
        ctx.clearRect( 0, 0, 256, 1 );

        var oceanFill = 0;
        ctx.fillStyle = 'rgb(' + oceanFill + ',' + oceanFill + ',' + oceanFill +')';
        ctx.fillRect( 0, 0, 1, 1 );

        controller.earthSurfaceShader.uniforms[ 'outlineLevel' ].value = 0;
        controller.earthSurfaceShader.uniforms[ 'flag' ].value = 0;

        controller.rotating.remove( controller.visualizationMesh );

        controller.earthSurfaceShader.lookupTexture.needsUpdate = true;

        controller.renderer.autoClear = false;
        controller.renderer.autoClearColor = false;
        controller.renderer.autoClearDepth = false;
        controller.renderer.autoClearStencil = false;

        controller.renderer.clear();
        controller.renderer.render( controller.scene, controller.camera );

        var gl = controller.renderer.context;
        gl.preserveDrawingBuffer = true;

        var mx = ( mouseX + controller.renderer.context.canvas.width / 2 );
        var my = ( -mouseY + controller.renderer.context.canvas.height / 2 );
        mx = Math.floor( mx );
        my = Math.floor( my );

        // picked color from map_index image

        var buf = new Uint8Array( 4 );
        gl.readPixels( mx, my, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf );

        // restore the above layer

        controller.renderer.autoClear = true;
        controller.renderer.autoClearColor = true;
        controller.renderer.autoClearDepth = true;
        controller.renderer.autoClearStencil = true;

        gl.preserveDrawingBuffer = false;

        controller.earthSurfaceShader.uniforms[ 'outlineLevel' ].value = 1;
        controller.earthSurfaceShader.uniforms[ 'flag' ].value = 1;

        controller.rotating.add( controller.visualizationMesh );

        highlightCountry( controller.selectedCountry.colorCode );

        return buf[ 0 ];

    }

    // this function highlight the surface

    function highlightCountry ( code ) {

        var i;

        // clear the surface

        var ctx = controller.earthSurfaceShader.lookupCanvas.getContext( '2d' );
        ctx.clearRect( 0, 0, 256, 1 );

        // highlight ocean

        ctx.fillStyle = generateFillStyle( Utils.transformBrightness( controller.configure.brightness.ocean, oceanMin, oceanMax ) );
        ctx.fillRect( 0, 0, 1, 1 );

        // highlight mentioned countries

        if ( controller.configure.control.lightenMentioned ) {

            ctx.fillStyle = generateFillStyle(
                Utils.transformBrightness( controller.configure.brightness.mentioned, mentionedMin, mentionedMax )
            );

            for ( i in controller.mentionedCountryCodes ) {

                ctx.fillRect( controller.mentionedCountryCodes[ i ], 0, 1, 1 );

            }

        }

        // highlight related countries

        ctx.fillStyle = generateFillStyle(
            Utils.transformBrightness( controller.configure.brightness.related, relatedMin, relatedMax )
        );

        for ( i in controller.relatedCountries ) {

            ctx.fillRect( controller.relatedCountries[ i ].colorCode, 0, 1, 1 );

        }

        // highlight clicked country

        ctx.fillStyle = generateFillStyle( highlightColor );
        ctx.fillRect( code, 0, 1, 1 );

        controller.earthSurfaceShader.lookupTexture.needsUpdate = true;

    }

    function generateFillStyle ( color ) {

        return 'rgb(' + color + ',' + color + ',' + color +')';

    }

    function update () {

        controller.earthSurfaceShader.update();

        highlightCountry( controller.selectedCountry.colorCode );

    }

    return {

        getPickColor: getPickColor,

        highlightCountry: highlightCountry,

        update: update

    }

}

export { SurfaceHandler }