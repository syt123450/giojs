/**
 * @author syt123450 / https://github.com/syt123450
 */

import { AbstractDataProcessor } from "./AbstractDataProcessor.js";
import { CountryData } from "../countryInfo/CountryData.js";
import { Utils } from "../utils/Utils.js";

/**
 * This object build the basic geometry to be used by creation spline geometry and pSystem geometry.
 * The build function will build for all input data
 * The buildDataVizGeometries will be executed when InitHandler's init() function is called
 */

function GeometryDataProcessor () {}

GeometryDataProcessor.prototype = new AbstractDataProcessor();

GeometryDataProcessor.prototype.constructor = GeometryDataProcessor;

GeometryDataProcessor.prototype.processDetail = function ( controller ) {

    if ( controller.dataGroup ) {

        controller.dataGroupHandler.createGeometry();

    } else {

        controller.singleDataHandler.createGeometry();

    }

};

export { GeometryDataProcessor }
