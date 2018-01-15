import {StyleFactory} from "../style/StyleFactory";

function ConfigureHandler(controller) {

    function configureJSON() {

    }

    function configureStyle(styleName) {

        var style = StyleFactory.getStyle(styleName);

        console.log(style);

        for (var attribute in style) {
            controller.configure[attribute] = style[attribute];
        }

        if (controller.configure.surfaceColor !== controller.configure.clickedColor) {
            controller.configure.clickedDifferent = true;
        }

        console.log(controller.configure);
    }

    function configureConstructor() {

    }

    return {

        configureJSON: configureJSON,

        configureStyle: configureStyle
    }
}

export {ConfigureHandler}