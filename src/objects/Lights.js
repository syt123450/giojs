/**
 * Created by ss on 2018/1/8.
 */

function Lights() {

    var lights = [];

    var light1 = new THREE.AmbientLight(0x505050);

    var light2 = new THREE.SpotLight(0xeeeeee, 3);
    light2.position.x = 730;
    light2.position.y = 520;
    light2.position.z = 626;
    light2.castShadow = true;

    var light3 = new THREE.PointLight(0x222222, 14.8);
    light3.position.x = -640;
    light3.position.y = -500;
    light3.position.z = -1000;

    lights.push(light1);
    lights.push(light2);
    lights.push(light3);

    return {
        lights: lights
    }
}

export {Lights}