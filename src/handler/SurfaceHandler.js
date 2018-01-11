/**
 * Created by ss on 2018/1/9.
 */

function SurfaceHandler(scene) {

    function getPickColor(mouseX, mouseY) {

        var ctx = scene.earthSurfaceShader.lookupCanvas.getContext('2d');
        ctx.clearRect(0, 0, 256, 1);

        var oceanFill = 0;
        ctx.fillStyle = 'rgb(' + oceanFill + ',' + oceanFill + ',' + oceanFill +')';
        ctx.fillRect( 0, 0, 1, 1 );

        scene.earthSurfaceShader.uniforms['outlineLevel'].value = 0;
        scene.earthSurfaceShader.uniforms['flag'].value = 0;

        scene.earthSurfaceShader.lookupTexture.needsUpdate = true;

        scene.renderer.autoClear = false;
        scene.renderer.autoClearColor = false;
        scene.renderer.autoClearDepth = false;
        scene.renderer.autoClearStencil = false;

        scene.renderer.clear();
        scene.renderer.render(scene.scene, scene.camera);

        var gl = scene.renderer.context;
        gl.preserveDrawingBuffer = true;

        var mx = ( mouseX + scene.renderer.context.canvas.width / 2 );
        var my = ( -mouseY + scene.renderer.context.canvas.height / 2 );
        mx = Math.floor(mx);
        my = Math.floor(my);

        var buf = new Uint8Array(4);
        // console.log(buf);
        gl.readPixels(mx, my, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf);
        // console.log(buf);

        scene.renderer.autoClear = true;
        scene.renderer.autoClearColor = true;
        scene.renderer.autoClearDepth = true;
        scene.renderer.autoClearStencil = true;

        gl.preserveDrawingBuffer = false;

        scene.earthSurfaceShader.uniforms['outlineLevel'].value = 1;
        scene.earthSurfaceShader.uniforms['flag'].value = 1;

        return buf[0];
    }

    function highlightCountry(code) {
        var ctx = scene.earthSurfaceShader.lookupCanvas.getContext('2d');
        ctx.clearRect(0, 0, 256, 1);

        var oceanFill = 10;
        ctx.fillStyle = 'rgb(' + oceanFill + ',' + oceanFill + ',' + oceanFill +')';
        ctx.fillRect( 0, 0, 1, 1 );

        var fillCSS = '#eeeeee';

        ctx.fillStyle = fillCSS;
        ctx.fillRect(code, 0, 1, 1);

        scene.earthSurfaceShader.lookupTexture.needsUpdate = true;
    }

    function setSurfaceColor(color) {
        scene.earthSurfaceShader.setShaderColor(color);
    }

    return {

        getPickColor: getPickColor,

        highlightCountry: highlightCountry,

        setSurfaceColor: setSurfaceColor
    }
}

export {SurfaceHandler}