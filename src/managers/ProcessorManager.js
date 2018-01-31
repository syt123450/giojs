/**
 * @author syt123450 / https://github.com/syt123450
 */

import { TransformProcessor } from "../dataPreprocessors/TransformProcessor.js";
import { DefaultDataPreprocessor } from "../dataPreprocessors/DefaultDataProcessor.js";
import { GeometryDataProcessor } from "../dataPreprocessors/GeometryDataProcessor.js";
import { FlattenDataProcessor } from "../dataPreprocessors/FlattenDataProcessor.js";

var ProcessorManager = ( function () {

    function getProcessorChain () {

        // register data processors here

        var transformDataProcessor = new TransformProcessor();
        var defaultDataPreprocessor = new DefaultDataPreprocessor();

        // a processor used to create basic geometry for splines and moving sprites

        var geometryDataProcessor = new GeometryDataProcessor();

        // a processor used to flatten country data

        var flattenDataProcessor = new FlattenDataProcessor();

        // set order of processors

        defaultDataPreprocessor.setSuccessor( transformDataProcessor );
        transformDataProcessor.setSuccessor( flattenDataProcessor );
        flattenDataProcessor.setSuccessor( geometryDataProcessor );

        return defaultDataPreprocessor;
    }

    return {

        getProcessorChain: getProcessorChain

    }

}() );

export { ProcessorManager }