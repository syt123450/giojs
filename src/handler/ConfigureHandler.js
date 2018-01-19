import { StyleFactory } from "../style/StyleFactory.js";

function ConfigureHandler ( controller ) {

    function configureJSON ( configure ) {

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