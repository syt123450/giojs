/**
 * Created by ss on 2018/1/12.
 */

function ResizeHandler ( controller ) {

    function resizeScene () {

        controller.camera.aspect = controller.container.clientWidth / controller.container.clientHeight;
        controller.camera.updateProjectionMatrix();
        controller.renderer.setSize( controller.container.clientWidth, controller.container.clientHeight );

    }

    return {

        resizeScene: resizeScene

    }

}

export { ResizeHandler }