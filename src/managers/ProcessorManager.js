/**
 * @author syt123450 / https://github.com/syt123450
 */

import { DataTypeProcessor } from "../dataPreprocessors/DataTypeProcessor";
import { TransformProcessor } from "../dataPreprocessors/TransformProcessor.js";
import { DefaultDataPreprocessor } from "../dataPreprocessors/DefaultDataProcessor.js";
import { GeometryDataProcessor } from "../dataPreprocessors/GeometryDataProcessor.js";
import { FlattenDataProcessor } from "../dataPreprocessors/FlattenDataProcessor.js";
import { DumperProcessor } from "../dataPreprocessors/DumperProcessor";

var ProcessorManager = ( function () {

    function getProcessorChain () {

        // register data processors here

        var dataTypeProcessor = new DataTypeProcessor();
        var transformDataProcessor = new TransformProcessor();
        var defaultDataPreprocessor = new DefaultDataPreprocessor();
        var dumpProcessor = new DumperProcessor();

        // a processor used to create basic geometry for splines and moving sprites

        var geometryDataProcessor = new GeometryDataProcessor();

        // a processor used to flatten country data

        var flattenDataProcessor = new FlattenDataProcessor();

        // set order of processors

		dataTypeProcessor.setSuccessor(defaultDataPreprocessor);
        defaultDataPreprocessor.setSuccessor( transformDataProcessor );
        transformDataProcessor.setSuccessor( flattenDataProcessor );
        flattenDataProcessor.setSuccessor( geometryDataProcessor );
        geometryDataProcessor.setSuccessor( dumpProcessor );

        return dataTypeProcessor;
    }

    return {

        getProcessorChain: getProcessorChain

    }

}() );

export { ProcessorManager }