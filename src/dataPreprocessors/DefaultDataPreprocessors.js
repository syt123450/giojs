/**
 * @author syt123450 / https://github.com/syt123450
 */

import { CountryData } from "../countryInfo/CountryData.js";

/**
 * This default data preprocessor is used to create mentionedCountries for controller.
 * The process() function will be called when InitHandler's init() function is called.
 */

var DefaultDataPreprocessors = ( function () {

    function process ( controller ) {

        var inputData = controller.inputData;

        for ( var i in inputData ) {

            var dataSet = inputData[ i ];

            var importCountryCode = CountryData[ dataSet.i ].colorCode;
            var exportCountryCode = CountryData[ dataSet.e ].colorCode;

            // add mentioned color to controller's mentionedCountryCodes ( an array to store the code )

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