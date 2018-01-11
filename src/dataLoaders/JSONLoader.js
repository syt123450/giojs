/**
 * Created by ss on 2018/1/7.
 */

var JSONLoader = (function () {

    return {
        loadData: function(controller, data) {

            controller.inputData = JSON.parse(JSON.stringify(data));
        }
    }
}());

export {JSONLoader}