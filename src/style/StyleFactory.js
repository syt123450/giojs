var StyleFactory = (function () {

    var styleMap = {};

    function getStyle(styleName) {

        return styleMap[styleName];
    }

    function register(styleName, style) {

        styleMap[styleName] = style;
    }

    return {

        getStyle: getStyle,

        register: register
    }

}());

export {StyleFactory}