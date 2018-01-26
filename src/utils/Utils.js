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

    function getScrollTopOfBody() {

        var scrollTop;

        if ( typeof window.pageYOffset !== 'undefined' ) {

            scrollTop = window.pageYOffset;

        } else if ( typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat' ) {

            scrollTop = document.documentElement.scrollTop;

        } else if ( typeof document.body !== 'undefined' ) {

            scrollTop = document.body.scrollTop;

        }

        return scrollTop;

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

            if ( data.length === 0 ) return;

            var replica = JSON.parse( JSON.stringify( data ) );

            replica.sort( function ( a, b ) {

                return a[ valueKey ] - b[ valueKey ];

            } );

            var min = replica[ 0 ][ valueKey ];
            var max = replica[ replica.length - 1 ][ valueKey ];

            for ( var i = 0; i < data.length; i ++ ) {

                var v = data[ i ][ valueKey ];
                data[ i ][ valueKey ] = ( v - min ) * ( definedMax - definedMin ) / ( max - min ) + definedMin;

            }

        },

        getScrollTopOfBody: getScrollTopOfBody

    };

}() );

export { Utils };
