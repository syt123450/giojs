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

            // expose
            Util.formatColor = formatColor;
            
        })(Website.Util || (Website.Util = {}));


    })(GIO.Website || (GIO.Website = {}));

})(GIO || (GIO = {}));

