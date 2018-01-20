/**
 * @author syt123450 / https://github.com/syt123450
 */

import { StyleFactory } from "../style/StyleFactory.js";

/**
 * This handler handle all configure related task for controller.
 */

function ConfigureHandler ( controller ) {

    function configureJSON ( configure ) {

        // the configure process in nature is set the controller.configure with a given JSON

        if ( configure instanceof Object ) {

            for ( var attribute in configure ) {

                controller.configure[ attribute ] = configure[ attribute ];

            }

            if ( controller.configure.clickedDifferent === false ) {

                controller.configure.clickedColor = controller.configure.surfaceColor;

            }

        }

    }

    function configureStyle ( styleName ) {

        // get style from StyleFactory with a given style name

        var style = StyleFactory.getStyle( styleName );

        configureJSON( style );

    }

    function configureConstructor () {

        configureJSON( controller.constructorConfigure );

    }

    return {

        configureJSON: configureJSON,

        configureStyle: configureStyle,

        configureConstructor: configureConstructor

    }

}

export { ConfigureHandler }