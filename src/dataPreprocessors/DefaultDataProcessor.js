/**
 * @author mokuteno / https://github.com/manymeeting
 * @author syt123450 / https://github.com/syt123450
 */

import { AbstractDataProcessor } from "./AbstractDataProcessor.js";


/**
 * This default data preprocessor is used to create mentionedCountries for controller.
 * The process() function will be called when InitHandler's init() function is called.
 */

function DefaultDataPreprocessor () {}

DefaultDataPreprocessor.prototype = new AbstractDataProcessor();

DefaultDataPreprocessor.prototype.constructor = DefaultDataPreprocessor;

DefaultDataPreprocessor.prototype.processDetail = function ( controller ) {

    if ( controller.dataGroup ) {

        controller.dataGroupHandler.createMentionedCountries();

    } else {

		controller.singleDataHandler.createMentionedCountries();

    }

};

export { DefaultDataPreprocessor }