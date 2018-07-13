/**
 * @author mokuteno / https://github.com/manymeeting
 * @author syt123450 / https://github.com/syt123450
 */

import { AbstractDataProcessor } from "./AbstractDataProcessor.js";

/**
 * This data processor set a new fake data from user's input value, this fake data used for later geometry creation
 */

function TransformProcessor () {}

TransformProcessor.prototype = new AbstractDataProcessor();

TransformProcessor.prototype.constructor = TransformProcessor;

TransformProcessor.prototype.processDetail = function ( controller ) {

    if ( controller.dataGroup ) {

        controller.dataGroupHandler.createFakeData();

    } else {

		controller.singleDataHandler.createFakeData();

    }

};

export { TransformProcessor }

