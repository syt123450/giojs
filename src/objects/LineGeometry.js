import {Utils} from "../utils/Utils";
import {CountryData} from "../countryInfo/CountryData.js";

var LineGeometry = (function () {

    var vec3_origin = new THREE.Vector3(0, 0, 0);

    function makeConnectionLineGeometry(exporter, importer, value) {

        var exporterCenter = exporter.center.clone();
        var distanceBetweenCountryCenter = exporterCenter.subVectors(exporterCenter, importer.center).length();

        var start = exporter.center;
        var end = importer.center;

        var mid = start.clone().lerp(end, 0.5);


        var midLength = mid.length();
        mid.normalize();
        mid.multiplyScalar(midLength + distanceBetweenCountryCenter * 0.7);

        var normal = (new THREE.Vector3()).sub(start, end);
        normal.normalize();

        var distanceHalf = distanceBetweenCountryCenter * 0.5;

        var startAnchor = start;

        var midStartAnchor = mid.clone().add(normal.clone().multiplyScalar(distanceHalf));
        var midEndAnchor = mid.clone().add(normal.clone().multiplyScalar(-distanceHalf));

        var endAnchor = end;

        var splineCurveA = new THREE.CubicBezierCurve3(start, startAnchor, midStartAnchor, mid);
        var splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end);

        var vertexCountDesired = Math.floor(distanceBetweenCountryCenter * 0.02 + 6) * 2;

        var points = splineCurveA.getPoints(vertexCountDesired);

        points = points.splice(0, points.length - 1);
        points = points.concat(splineCurveB.getPoints(vertexCountDesired));
        points.push(vec3_origin);

        var val = value * 0.0003;
        var size = (10 + Math.sqrt(val));
        size = Utils.constrain(size, 0.1, 60);

        var curveGeometry = new THREE.Geometry();
        for (var i = 0; i < points.length; i++) {
            curveGeometry.vertices.push(points[i]);
        }
        curveGeometry.size = size;

        return curveGeometry;
    }

    return {

        buildDataVizGeometries: function (controller) {

            for (var s in controller.inputData) {
                var set = controller.inputData[s];

                var exporterName = set.e.toUpperCase();
                var importerName = set.i.toUpperCase();

                var exporter = CountryData[exporterName];
                var importer = CountryData[importerName];

                set.lineGeometry = makeConnectionLineGeometry(exporter, importer, set.v);
            }
        }
    }
}());

export {LineGeometry}