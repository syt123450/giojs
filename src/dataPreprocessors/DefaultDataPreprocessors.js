/**
 * Created by ss on 2018/1/7.
 */

import { CountryData } from "../countryInfo/CountryData.js";

var DefaultDataPreprocessors = ( function () {

    function process ( controller ) {

        var inputData = controller.inputData;

        for ( var i in inputData ) {

            var dataSet = inputData[ i ];

            var importCountryCode = CountryData[ dataSet.i ].colorCode;
            var exportCountryCode = CountryData[ dataSet.e ].colorCode;

            if ( controller.mentionedCountryCodes.indexOf( importCountryCode ) === -1 ) {

                controller.mentionedCountryCodes.push( importCountryCode );

            }

            if  (controller.mentionedCountryCodes.indexOf( exportCountryCode ) === -1 ) {

                controller.mentionedCountryCodes.push( exportCountryCode );

            }

        }

    }

    return {

        process: process

    }

}() );

export { DefaultDataPreprocessors }