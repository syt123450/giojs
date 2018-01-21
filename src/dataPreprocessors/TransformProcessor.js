/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * This data processor set a new fake data from user's input value, this fake data used for later geometry creation
 */

var TransformProcessor = ( function () {

    function process ( controller ) {

        var inputData = controller.inputData;

        for ( var i in inputData ) {

            var set = inputData[ i ];
            set.fakeData = set.v;

        }

    }

    return {

        process: process

    }

}() );

export { TransformProcessor }