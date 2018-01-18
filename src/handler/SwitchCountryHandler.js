/**
 * Created by ss on 2018/1/12.
 */
import {CountryColorMap} from "../countryInfo/CountryColorMap";
import {CountryData} from "../countryInfo/CountryData";

function SwitchCountryHandler(controller) {

    var pickedCallBack = null;

    function execute(pickColorIndex) {

        executeSwitch(pickColorIndex);
        executeCallback();
    }

    function executeSwitch(pickColorIndex) {

        controller.selectedCountry = CountryData[CountryColorMap[pickColorIndex]];
        controller.visSystemHandler.updateSystem();
        controller.surfaceHandler.highlightCountry(pickColorIndex);
        controller.rotationHandler.rotateToTargetCountry();
    }

    function executeCallback() {
        if (pickedCallBack !== null) {

            var selectedCountry = JSON.parse(JSON.stringify(controller.selectedCountry));

            selectedCountry.ISOCode = CountryColorMap[selectedCountry.colorCode];

            var relatedCountries = JSON.parse(JSON.stringify(controller.relatedCountries));

            pickedCallBack(selectedCountry, relatedCountries);
        }
    }

    function switchFromAPI(ISOAbbr) {

        if (CountryData[ISOAbbr] !== undefined) {
            executeSwitch(CountryData[ISOAbbr].colorCode);
        }
    }

    return {

        executeSwitch: execute,

        switchFromAPI: switchFromAPI,

        setCountryPickCallBack: function(callBack) {
            pickedCallBack = callBack;
        }
    }
}

export {SwitchCountryHandler}