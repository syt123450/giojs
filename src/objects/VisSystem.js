/**
 * Created by ss on 2018/1/7.
 */

import {Utils} from "../utils/Utils";
import {MovingSpriteShader} from "../shaders/MovingSpriteShader";
import {CountryData} from "../countryInfo/CountryData.js";
import {CountryColorMap} from "../countryInfo/CountryColorMap.js";

var VisSystem = (function () {

    var exportColor = 0xdd380c;
    var importColor = 0x154492;

    function getVisualizedMesh(controller) {

        var geometries = createGeometries(controller);

        var splineOutline = createSplineOutline(geometries.linesGeo);
        var pSystem = createParticleSystem(geometries.particlesGeo);

        splineOutline.add(pSystem);

        return splineOutline;
    }

    function createGeometries(controller) {

        var inputData = controller.inputData;
        controller.relatedCountries = [];
        var selectedCountry = controller.selectedCountry;

        var linesGeo = new THREE.Geometry();
        var lineColors = [];

        var particlesGeo = new THREE.Geometry();
        var particleColors = [];

        for (var i in inputData) {

            var set = inputData[i];

            if (set.i === CountryColorMap[selectedCountry.colorCode] ||
                set.e === CountryColorMap[selectedCountry.colorCode]) {

                var lineColor;

                if (set.e === CountryColorMap[selectedCountry.colorCode]) {
                    controller.relatedCountries.push(CountryData[set.i]);
                    lineColor = new THREE.Color(exportColor);
                } else {
                    controller.relatedCountries.push(CountryData[set.e]);
                    lineColor = new THREE.Color(importColor);
                }

                var lastColor;
                for (s in set.lineGeometry.vertices) {
                    lineColors.push(lineColor);
                    lastColor = lineColor;
                }

                THREE.GeometryUtils.merge(linesGeo, set.lineGeometry);

                var particleColor = lastColor.clone();
                var points = set.lineGeometry.vertices;
                var particleCount = Math.floor(set.v / 8000 / set.lineGeometry.vertices.length) + 1;
                particleCount = Utils.constrain(particleCount, 1, 100);
                var particleSize = set.lineGeometry.size;
                for (var s = 0; s < particleCount; s++) {

                    var desiredIndex = s / particleCount * points.length;
                    var rIndex = Utils.constrain(Math.floor(desiredIndex), 0, points.length - 1);

                    var point = points[rIndex];
                    var particle = point.clone();
                    particle.moveIndex = rIndex;
                    particle.nextIndex = rIndex + 1;
                    if (particle.nextIndex >= points.length)
                        particle.nextIndex = 0;
                    particle.lerpN = 0;
                    particle.path = points;
                    particlesGeo.vertices.push(particle);
                    particle.size = particleSize;
                    particleColors.push(particleColor);
                }
            }
        }

        linesGeo.colors = lineColors;
        particlesGeo.colors = particleColors;

        return {
            linesGeo: linesGeo,
            particlesGeo: particlesGeo
        }
    }

    function createSplineOutline(linesGeo) {

        var splineOutline = new THREE.Line(linesGeo, new THREE.LineBasicMaterial(
            {
                color: 0xffffff,
                opacity: 1.0,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                vertexColors: true,
                linewidth: 1
            })
        );

        splineOutline.renderDepth = false;

        return splineOutline;
    }

    function createParticleSystem(particlesGeo) {

        var movingSpriteShader = new MovingSpriteShader();

        var shaderMaterial = new THREE.ShaderMaterial({

            uniforms: movingSpriteShader.uniforms,
            attributes: movingSpriteShader.attributes,
            vertexShader: movingSpriteShader.vertexShader,
            fragmentShader: movingSpriteShader.fragmentShader,

            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false,
            transparent: true
        });

        var pSystem = new THREE.ParticleSystem(particlesGeo, shaderMaterial);
        pSystem.dynamic = true;

        var vertices = pSystem.geometry.vertices;
        var values_size = movingSpriteShader.attributes.size.value;
        var values_color = movingSpriteShader.attributes.customColor.value;

        for (var v = 0; v < vertices.length; v++) {
            values_size[v] = pSystem.geometry.vertices[v].size;
            values_color[v] = particlesGeo.colors[v];
        }

        pSystem.update = function () {

            for (var i in this.geometry.vertices) {
                var particle = this.geometry.vertices[i];
                var path = particle.path;

                particle.lerpN += 0.05;
                if (particle.lerpN > 1) {
                    particle.lerpN = 0;
                    particle.moveIndex = particle.nextIndex;
                    particle.nextIndex++;
                    if (particle.nextIndex >= path.length) {
                        particle.moveIndex = 0;
                        particle.nextIndex = 1;
                    }
                }

                var currentPoint = path[particle.moveIndex];
                var nextPoint = path[particle.nextIndex];


                particle.copy(currentPoint);
                particle.lerpSelf(nextPoint, particle.lerpN);
            }
            this.geometry.verticesNeedUpdate = true;
        };

        return pSystem;
    }

    return {
        getVisualizedMesh: getVisualizedMesh,

        setExportColor: function(color) {
            exportColor = color;
        },

        setImportColor: function(color) {
            importColor = color;
        }
    }

}());

export {VisSystem}