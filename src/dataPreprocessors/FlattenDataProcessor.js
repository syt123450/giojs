/**
 * @author mokuteno / https://github.com/manymeeting
 */

import { AbstractDataProcessor } from ".//AbstractDataProcessor.js";
import { Utils } from "../utils/Utils.js";

/**
 * This data processor flattens input data so that even a small number can be properly displayed on the screen.
 */

function FlattenDataProcessor () {}

FlattenDataProcessor.prototype = new AbstractDataProcessor();

FlattenDataProcessor.prototype.constructor = FlattenDataProcessor;

FlattenDataProcessor.prototype.processDetail = function ( controller ) {

    var minDataValue = 800000, maxDataValue = 5000000;

    var inputData = controller.inputData;

    Utils.flattenCountryData(inputData, controller.inputValueKey, minDataValue, maxDataValue);
    
};

export { FlattenDataProcessor }

