/**
 * @author syt123450 / https://github.com/syt123450
 * @author mokuteno / https://github.com/manymeeting
 */

import { CountryColorMap } from "../countryInfo/CountryColorMap.js";

/**
 * it contains static function, the functions will be called by other component in whole project.
 * The stateless function can be added here.
 */

var Utils = ( function () {

    function isString( str ) {

        return ( typeof str === 'string' ) && str.constructor === String;

    }

    function transformStringToHex( str ) {

        if ( str.charAt( 0 ) !== "#" ) {

            return null;

        }

        return parseInt( str.substring( 1 ), 16 );

    }

    function formatHexColor( color ) {

        if ( color < 0 || color > 16777215 ) {

            return null;

        }

        return color;

    }

    function getElementViewTop ( element ){

        var actualTop = element.offsetTop;
        var current = element.offsetParent;
    
        // while ( current !== null ) {
        while ( current !== undefined ) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
        }

        var elementScrollTop;

        if ( document.compatMode === "BackCompat" ) {

            elementScrollTop = document.body.scrollTop;

        } else {

            elementScrollTop = document.documentElement.scrollTop;

        }

        return actualTop - elementScrollTop;

    }

    function getElementViewLeft ( element ) {

        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
    
        while ( current !== undefined ) {
        // while ( current !== null ) {

            actualLeft += current.offsetLeft;
            current = current.offsetParent;

        }

        var elementScrollLeft;

        if ( document.compatMode === "BackCompat" ) {

            elementScrollLeft = document.body.scrollLeft;

        } else {

            elementScrollLeft = document.documentElement.scrollLeft;

        }

        return actualLeft - elementScrollLeft;

    }


    return {

        wrap: function ( value, min, rangeSize ) {

            rangeSize -= min;

            while ( value < min ) {

                value += rangeSize;

            }

            return value % rangeSize;

        },

        // constrain the value in a range

        constrain: function ( v, min, max ) {

            if ( v < min ) {

                v = min;

            } else if ( v > max ) {

                v = max;

            }

            return v;

        },

        // format code to hex type (the input may "#000000" or 0x000000)

        formatColor: function ( color ) {

            if ( isString( color ) ) {

                return transformStringToHex( color );

            } else {

                return formatHexColor( color );

            }

        },

        // transform brightness from user's input (0 - 1) to (min - max)

        transformBrightness: function ( brightness, min, max ) {

            if ( brightness > 1 ) {

                return max;

            }

            if ( brightness < 0 ) {

                return min;

            }

            return Math.floor( min + ( max - min ) * brightness );

        },

        // deep clone an object from a country data, add more information for user's callback

        transformCountryData: function ( countryData ) {

            var outputData = {};

            outputData.name = countryData.name;
            outputData.lat = countryData.lat;
            outputData.lon = countryData.lon;
            outputData.center = countryData.center.clone();
            outputData.ISOCode = CountryColorMap[ countryData.colorCode ];

            return outputData;

        },

        /**
        * Flatten country data based on given min and max value.
        *
        * @param {Array} data
        *   An array of data to be processed.
        *   Example: [
        *      {
        *        "e": "CN",
        *        "i": "US",
        *        "v": 3300000
        *      },
        *      {
        *        "e": "CN",
        *        "i": "RU",
        *        "v": 10000
        *      }
        *    ]
        * @param {string} valueKey
        * @param {number} definedMin
        * @param {number} definedMax
        */

        flattenCountryData: function ( data, valueKey, definedMin, definedMax ) {
            if ( data.length === 0 )
                return;

            data.forEach( function ( country ) {

                var v = country[ valueKey ];
                country[ valueKey ] = ( v - min ) * ( definedMax - definedMin ) / ( max - min ) + definedMin;

            } );

        },

        getElementViewTop: getElementViewTop,

        getElementViewLeft: getElementViewLeft

    };

}() );

export { Utils };
