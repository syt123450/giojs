/**
 * @author mokuteno / https://github.com/manymeeting
 */

import { AbstractDataProcessor } from "./AbstractDataProcessor.js";

/**
 * This data processor flattens input data so that even a small number can be properly displayed on the screen.
 */

function FlattenDataProcessor () {}

FlattenDataProcessor.prototype = new AbstractDataProcessor();

FlattenDataProcessor.prototype.constructor = FlattenDataProcessor;

FlattenDataProcessor.prototype.processDetail = function ( controller ) {

    if ( controller.dataGroup ) {

        controller.dataGroupHandler.flattenData();

    } else {

        controller.singleDataHandler.flattenData();

    }
    
};

export { FlattenDataProcessor }

