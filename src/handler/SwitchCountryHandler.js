/**
 * Created by ss on 2018/1/12.
 */
import {CountryColorMap} from "../countryInfo/CountryColorMap";
import {CountryData} from "../countryInfo/CountryData";

function SwitchCountryHandler(controller) {

    var pickedCallBack = null;

    function executeSwitch(pickColorIndex) {

        controller.selectedCountry = CountryData[CountryColorMap[pickColorIndex]];
        controller.visSystemHandler.updateSystem();
        controller.surfaceHandler.highlightCountry(pickColorIndex);
        controller.rotationHandler.rotateToTargetCountry();

        if (pickedCallBack !== null) {

            var selectedCountry = JSON.parse(JSON.stringify(controller.selectedCountry));
            var relatedCountries = JSON.parse(JSON.stringify(controller.relatedCountries));

            pickedCallBack(selectedCountry, relatedCountries);
        }
    }

    return {

        executeSwitch: executeSwitch,

        setCountryPickCallBack: function(callBack) {
            pickedCallBack = callBack;
        }
    }
}

export {SwitchCountryHandler}