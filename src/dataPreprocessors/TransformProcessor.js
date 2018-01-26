/**
 * @author mokuteno / https://github.com/manymeeting
 * @author syt123450 / https://github.com/syt123450
 */

import { AbstractDataProcessor } from ".//AbstractDataProcessor.js";

/**
 * This data processor set a new fake data from user's input value, this fake data used for later geometry creation
 */

function TransformProcessor () {}

TransformProcessor.prototype = new AbstractDataProcessor();

TransformProcessor.prototype.constructor = TransformProcessor;

TransformProcessor.prototype.processDetail = function ( controller ) {

    var inputData = controller.inputData;

    for ( var i in inputData ) {

        var set = inputData[ i ];
        set.fakeData = set.v;

    }

    // update input value key

    controller.inputValueKey = "fakeData";

};

export { TransformProcessor }

