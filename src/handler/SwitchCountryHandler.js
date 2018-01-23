/**
 * @author syt123450 / https://github.com/syt123450
 */

import { CountryColorMap } from "../countryInfo/CountryColorMap.js";
import { CountryData } from "../countryInfo/CountryData.js";
import { Utils } from "../utils/Utils.js";

/**
 * This handler handle the switch of the clicked country.
 */

function SwitchCountryHandler ( controller ) {

    var pickedCallBack = null;

    function execute( pickColorIndex ) {

        executeSwitch( pickColorIndex );
        executeCallback();

    }

    function executeSwitch ( pickColorIndex ) {

        // first change the selectedCountry

        controller.selectedCountry = CountryData[ CountryColorMap[ pickColorIndex ] ];

        // then create a new visSystem

        controller.visSystemHandler.update();

        // change the highlight country on the earth surface

        controller.surfaceHandler.highlightCountry( pickColorIndex );

        // at last rotate the earth

        controller.rotationHandler.rotateToTargetCountry();

    }

    function executeCallback () {

        if ( pickedCallBack !== null ) {

            // protected clone, return new object for user

            var selectedCountry = Utils.transformCountryData( controller.selectedCountry );

            var relatedCountries = [];

            for ( var i in controller.relatedCountries ) {

                relatedCountries.push(
                    Utils.transformCountryData( controller.relatedCountries[ i ] )
                )

            }

            pickedCallBack( selectedCountry, relatedCountries );

        }

    }

    function switchFromAPI ( ISOAbbr, direction ) {

        // using the snapshot, so the function just change the controller.configure for a short time

        var snapshot = {};

        if ( direction === "in" || direction === "out" ) {

            snapshot.inOnly = controller.configure.inOnly;
            snapshot.outOnly = controller.configure.outOnly;

            if ( direction === "in" ) {

                controller.configure.inOnly = true;
                controller.configure.outOnly = false;

            } else {

                controller.configure.inOnly = false;
                controller.configure.outOnly = true;

            }

        }

        if ( CountryData[ ISOAbbr ] !== undefined ) {

            executeSwitch( CountryData[ ISOAbbr ].colorCode );

        }

        // restore the controller.configure

        if ( direction === "in" || direction === "out" ) {

            controller.configure.inOnly = snapshot.inOnly;
            controller.configure.outOnly = snapshot.outOnly;

        }

    }

    return {

        executeSwitch: execute,

        switchFromAPI: switchFromAPI,

        setCountryPickCallBack: function ( callBack ) {

            pickedCallBack = callBack;

        }

    }

}

export { SwitchCountryHandler }