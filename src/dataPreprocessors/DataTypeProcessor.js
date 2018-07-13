/**
 * @author syt123450 / https://github.com/syt123450
 */

import { AbstractDataProcessor } from "./AbstractDataProcessor.js";
import { Utils } from "../utils/Utils";

/**
 * Judge input data is an single data array or data group
 */

function DataTypeProcessor () {}

DataTypeProcessor.prototype = new AbstractDataProcessor();

DataTypeProcessor.prototype.constructor = DataTypeProcessor;

DataTypeProcessor.prototype.processDetail = function ( controller ) {

	var inputData = controller.inputData;
	controller.dataGroup = !Utils.isArray( inputData );

};

export { DataTypeProcessor }