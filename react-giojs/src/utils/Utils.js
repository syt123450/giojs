import { DefaultGioProps } from "../constants/DefaultGioProps";

/**
 * Contain Utils function for react-giojs.
 * Defined as a singleton.
 */

var Utils = ( function () {

    /**
     * Set the attribute of "values" into "vessel".
     * Only set the attribute when vessel has this attribute ( not undefined )
     */

    function inject ( vessel, values ) {

        for ( var attribute in values ) {

            if ( isObject( values[ attribute ] ) ) {

                if ( isObject( vessel[ attribute ] ) ) {

                    inject( vessel[ attribute ], values[ attribute ] );

                }

            } else {

                if ( vessel[ attribute ] !== undefined ) {

                    vessel[ attribute ] = values[ attribute ];

                }

            }

        }

    }

    /**
     * Judge whether the input value is an javascript object (do not include Array)
     * @returns {boolean}
     */

    function isObject ( value ) {

        return ( value instanceof Object ) && !( value instanceof Array );

    }

    /**
     * Set css style (height, width) to a react component
     * Get the height and width from input props or component.props
     */

    function setStyle ( component, props ) {

        var width = component.props.width !== undefined ? component.props.width : DefaultGioProps.width;
        var height = component.props.height !== undefined ? component.props.height : DefaultGioProps.height;

        if ( props.width !== undefined ) {

            width = props.width;

        }

        if ( props.height !== undefined ) {

            height = props.height;

        }

        component.setState( {

            width: width,
            height: height

        }, function () {

            component._controller.resizeUpdate();

        } );

    }

    return {

        setStyle: setStyle,

        inject: inject

    }

}() );

export { Utils }