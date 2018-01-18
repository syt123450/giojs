/**
 * Created by ss on 2018/1/7.
 */

import {Utils} from "../utils/Utils";
import {MovingSpriteShader} from "../shaders/MovingSpriteShader";
import {CountryData} from "../countryInfo/CountryData.js";
import {CountryColorMap} from "../countryInfo/CountryColorMap.js";

var VisSystem = (function () {

    function getVisualizedMesh(controller) {

        var geometries = createGeometries(controller);

        var splineOutline = createSplineOutline(geometries.linesGeo);
        var pSystem = createParticleSystem(geometries.particlesGeo, geometries.movingPoints);

        splineOutline.add(pSystem);

        return splineOutline;
    }

    function createGeometries(controller) {

        var inputData = controller.inputData;
        controller.relatedCountries = [];
        var selectedCountry = controller.selectedCountry;

        var linesGeo = new THREE.Geometry();
        var lineColors = [];

        var particlesGeo = new THREE.BufferGeometry();

        var movingPoints = [];

        var positions = [];
        var sizes = [];
        var customColors = [];

        for (var i in inputData) {

            var set = inputData[i];

            if (controller.configure.inOnly && set.i !== CountryColorMap[selectedCountry.colorCode] ||
                controller.configure.outOnly && set.e !== CountryColorMap[selectedCountry.colorCode]) {
                continue;
            }

            if (set.i === CountryColorMap[selectedCountry.colorCode] ||
                set.e === CountryColorMap[selectedCountry.colorCode]) {

                var lineColor;

                if (set.e === CountryColorMap[selectedCountry.colorCode]) {
                    controller.relatedCountries.push(CountryData[set.i]);
                    if (set.inColor === undefined) {
                        lineColor = new THREE.Color(controller.configure.exportColor);
                    } else {
                        lineColor = new THREE.Color(set.inColor);
                    }

                } else {
                    controller.relatedCountries.push(CountryData[set.e]);
                    if (set.outColor === undefined) {
                        lineColor = new THREE.Color(controller.configure.importColor);
                    } else {
                        lineColor = new THREE.Color(set.outColor);
                    }
                }

                var lastColor;
                for (s in set.lineGeometry.vertices) {
                    lineColors.push(lineColor);
                    lastColor = lineColor;
                }

                linesGeo.merge(set.lineGeometry);

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

                    movingPoints.push(particle);

                    particle.size = particleSize;

                    positions.push(particle.x);
                    positions.push(particle.y);
                    positions.push(particle.z);

                    sizes.push(particleSize);

                    customColors.push(particleColor.r);
                    customColors.push(particleColor.g);
                    customColors.push(particleColor.b);

                }
            }
        }

        linesGeo.colors = lineColors;

        particlesGeo.addAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        particlesGeo.addAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
        particlesGeo.addAttribute("customColor", new THREE.Float32BufferAttribute(customColors, 3));

        particlesGeo.attributes.position.needsUpdate = true;

        return {
            linesGeo: linesGeo,
            particlesGeo: particlesGeo,
            movingPoints: movingPoints
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

    function createParticleSystem(particlesGeo, movingPoints) {

        var movingSpriteShader = new MovingSpriteShader();

        var shaderMaterial = new THREE.ShaderMaterial({

            uniforms: movingSpriteShader.uniforms,
            vertexShader: movingSpriteShader.vertexShader,
            fragmentShader: movingSpriteShader.fragmentShader,

            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false,
            transparent: true
        });

        var pSystem = new THREE.Points(particlesGeo, shaderMaterial);

        pSystem.dynamic = true;

        pSystem.movingPoints = movingPoints;


        pSystem.update = function () {

            for (var i in this.movingPoints) {

                var particle = this.movingPoints[i];

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
                particle.lerp(nextPoint, particle.lerpN);

                this.geometry.attributes.position.array[3 * i] = particle.x;
                this.geometry.attributes.position.array[3 * i + 1] = particle.y;
                this.geometry.attributes.position.array[3 * i + 2] = particle.z;
            }

            this.geometry.attributes.position.needsUpdate = true;

        };

        return pSystem;
    }

    return {

        getVisualizedMesh: getVisualizedMesh
    }

}());

export {VisSystem}