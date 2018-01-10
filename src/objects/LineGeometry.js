import {Utils} from "../utils/Utils";

var LineGeometry = (function () {

    var vec3_origin = new THREE.Vector3(0, 0, 0);

    function makeConnectionLineGeometry(exporter, importer, value) {

        console.log("making connection between " + exporter.name + " and " + importer.name);

        var distanceBetweenCountryCenter = exporter.center.clone().subSelf(importer.center).length();

        var start = exporter.center;
        var end = importer.center;

        var mid = start.clone().lerpSelf(end, 0.5);
        var midLength = mid.length();
        mid.normalize();
        mid.multiplyScalar(midLength + distanceBetweenCountryCenter * 0.7);

        var normal = (new THREE.Vector3()).sub(start, end);
        normal.normalize();

        var distanceHalf = distanceBetweenCountryCenter * 0.5;

        var startAnchor = start;
        var midStartAnchor = mid.clone().addSelf(normal.clone().multiplyScalar(distanceHalf));
        var midEndAnchor = mid.clone().addSelf(normal.clone().multiplyScalar(-distanceHalf));
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

        buildDataVizGeometries: function (inputData, countryData) {

            for (var s in inputData) {
                var set = inputData[s];

                var exporterName = set.e.toUpperCase();
                var importerName = set.i.toUpperCase();

                var exporter = countryData[exporterName];
                var importer = countryData[importerName];

                set.lineGeometry = makeConnectionLineGeometry(exporter, importer, set.v);
            }
        }
    }
}());

export {LineGeometry}