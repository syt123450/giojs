var GIO;

(function( GIO ){

    (function(Website){

        (function(Util){

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

            // format code to hex type (the input may "#000000" or 0x000000)

            function formatColor ( color ) {

                if ( isString( color ) ) {

                    return transformStringToHex( color );

                } else {

                    return formatHexColor( color );

                }

            }

            // transform brightness from user's input (0 - 1) to (min - max)

            function transformBrightness ( brightness, min, max ) {

                if ( brightness > 1 ) {

                    return max;

                }

                if ( brightness < 0 ) {

                    return min;

                }

                return Math.floor( min + ( max - min ) * brightness );

            }

            // expose
            
            Util.formatColor = formatColor;
            Util.transformBrightness = transformBrightness;
            
        })(Website.Util || (Website.Util = {}));


    })(GIO.Website || (GIO.Website = {}));

})(GIO || (GIO = {}));


$(function(){
    if (window.jQuery) {  
        /**
        * Extend jQuery object to add a function that rotates a DOM element.
        *
        * @param {number} degrees
        */
        jQuery.fn.rotate = function(degrees) {
            $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                '-moz-transform' : 'rotate('+ degrees +'deg)',
                '-ms-transform' : 'rotate('+ degrees +'deg)',
                'transform' : 'rotate('+ degrees +'deg)'});

            return $(this);
        }  
    } 
});