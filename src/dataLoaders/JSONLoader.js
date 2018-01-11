/**
 * Created by ss on 2018/1/7.
 */

var JSONLoader = (function () {

    return {
        loadData: function(scene, data) {

            scene.inputData = JSON.parse(JSON.stringify(data));
        }
    }
}());

export {JSONLoader}