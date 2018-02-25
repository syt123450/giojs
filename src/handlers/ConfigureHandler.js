/**
 * @author syt123450 / https://github.com/syt123450
 */

import { StyleFactory } from "../style/StyleFactory.js";

/**
 * This handlers handle all configure related task for controller.
 */

function ConfigureHandler ( controller ) {

    function configureJSON ( configure ) {

        // the configure process in nature is set the controller.configure with a given JSON

        var attribute;

        if ( configure instanceof Object ) {

            if ( configure.control !== undefined ) {

                for ( attribute in configure.control ) {

                    controller.configure.control[ attribute ] = configure.control[ attribute ];

                }

            }

            if ( configure.color !== undefined ) {

                for ( attribute in configure.color ) {

                    controller.configure.color[ attribute ] = configure.color[ attribute ];

                }

            }

            if ( configure.brightness !== undefined ) {

                for ( attribute in configure.brightness ) {

                    controller.configure.brightness[ attribute ] = configure.brightness[ attribute ];

                }

            }

            if (configure.resource !== undefined ) {

                for ( attribute in configure.resource ) {

                    controller.configure.resource[ attribute ] = configure.resource[ attribute ];

                }

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