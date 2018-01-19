import { CountryColorMap } from "../countryInfo/CountryColorMap.js";

var Utils = ( function () {

    function isString ( str ){

        return ( typeof str === 'string' ) && str.constructor === String;

    }

    function transformStringToHex ( str ) {

        if ( str.charAt( 0 ) !== "#" ) {

            return null;

        }

        return parseInt( str.substring( 1 ), 16 );

    }

    function formatHexColor ( color ) {

        if ( color < 0 || color > 16777215 ) {

            return null;

        }

        return color;

    }

    return {

        wrap: function wrap ( value, min, rangeSize ) {

            rangeSize-=min;

            while ( value < min ) {

                value += rangeSize;

            }

            return value % rangeSize;

        },

        constrain: function constrain ( v, min, max ) {

            if ( v < min ) {

                v = min;

            } else if ( v > max ) {

                v = max;

            }

            return v;

        },

        formatColor: function ( color ) {

            if ( isString( color ) ) {

                return transformStringToHex( color );

            } else {

                return formatHexColor( color );

            }

        },

        transformBrightness: function ( brightness, min, max ) {

            if ( brightness > 1 ) {

                return max;

            }

            if ( brightness < 0 ) {

                return min;

            }

            return Math.floor( min + ( max - min ) * brightness );

        },

        transformCountryData: function( countryData ) {

            var outputData = {};

            outputData.name = countryData.name;
            outputData.lat = countryData.lat;
            outputData.lon = countryData.lon;
            outputData.center = countryData.center.clone();
            outputData.ISOCode = CountryColorMap[countryData.colorCode];

            return outputData;

        }
    }

}() );

export { Utils }