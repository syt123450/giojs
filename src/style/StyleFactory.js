/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * The StyleFactory will persist all pre-defined style, and return style object to ConfigureHandler by a given name
 */

var StyleFactory = ( function () {

    var styleMap = {};

    // get style API for ConfigureHandler to get a specific style object by name

    function getStyle ( styleName ) {

        return styleMap[ styleName ];

    }

    //register API for style creator

    function register( styleName, style ) {

        styleMap[ styleName ] = style;

    }

    return {

        getStyle: getStyle,

        register: register

    }

}() );

export { StyleFactory }