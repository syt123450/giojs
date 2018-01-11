/**
 * Created by ss on 2018/1/7.
 */

import {CountryData} from "../countryInfo/CountryData.js";

var DefaultDataPreprocessors = (function () {

    function process(scene) {

        var inputData = scene.inputData;

        for (var i in inputData) {
            var dataSet = inputData[i];

            var importCountryCode = CountryData[dataSet.i].colorCode;
            var exportCountryCode = CountryData[dataSet.e].colorCode;

            if (scene.mentionedCountryCodes.indexOf(importCountryCode) == -1) {
                scene.mentionedCountryCodes.push(importCountryCode);
            }
            if (scene.mentionedCountryCodes.indexOf(exportCountryCode) == -1) {
                scene.mentionedCountryCodes.push(exportCountryCode);
            }
        }
    }

    return {
        process: process
    }
}());

export {DefaultDataPreprocessors}