/**
 * Created by ss on 2018/1/7.
 */

var JSONLoader = (function () {

    return {
        loadData: function(target, data) {

            var loadingData = JSON.parse(JSON.stringify(data));

            for (var i in loadingData) {
                target.push(loadingData[i]);
            }
            console.log(target);
        }
    }
}());

export {JSONLoader}