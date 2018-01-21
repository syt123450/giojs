import { AbstractDataProcessor } from "../dataProcessors/AbstractDataProcessor.js";

/**
 * This data processor set a new fake data from user's input value, this fake data used for later geometry creation
 */

TransformProcessor = function() {}；
TransformProcessor.prototype = new AbstractDataProcessor();
TransformProcessor.prototype.constructor = TransformProcessor;

TransformProcessor.prototype.processDetail = function(controller) {
    var inputData = controller.inputData;

    for ( var i in inputData ) {

        var set = inputData[ i ];
        set.fakeData = set.v;

    }
}

export { TransformProcessor }