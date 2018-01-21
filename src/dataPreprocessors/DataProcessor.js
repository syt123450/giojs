/**
 * @author syt123450 / https://github.com/syt123450
 */

import { DefaultDataPreprocessors } from "../dataPreprocessors/DefaultDataPreprocessors.js";
import {TransformProcessor} from "../dataPreprocessors/TransformProcessor";

/**
 * controller will create this dataProcessor object to pre-process the user's input data
 */

function DataProcessor ( controller ) {

    function process () {

        // get the mentioned countries

        DefaultDataPreprocessors.process( controller );

        // transform user's input data into "fake data" which fit for visualization

        TransformProcessor.process( controller );

    }

    return {

        process: process

    }

}

export { DataProcessor }