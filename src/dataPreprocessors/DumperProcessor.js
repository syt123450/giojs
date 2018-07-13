/**
 * @author syt123450 / https://github.com/syt123450
 */

import { AbstractDataProcessor } from "./AbstractDataProcessor.js";


/**
 * This dumper preprocessor is used to dump processed data into globe.
 */

function DumperProcessor () {}

DumperProcessor.prototype = new AbstractDataProcessor();

DumperProcessor.prototype.constructor = DumperProcessor;

DumperProcessor.prototype.processDetail = function ( controller ) {

	if ( controller.dataGroup ) {

		controller.dataGroupHandler.dumpData();

	} else {

		controller.singleDataHandler.dumpData();

	}

};

export { DumperProcessor }