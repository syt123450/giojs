import { PropsTemplate } from "../component/PropsTemplate";
import { Utils } from "../utils/Utils";

/**
 * The Evaluator which props changed, and return a PropsTemplate contain changed props, the unchanged props will be null in the template.
 * The Evaluator will compare the props now and next Props to get the changed props.
 */

function Evaluator () {

    function evaluate ( props, nextProps ) {

        var changedProps = new PropsTemplate();

        if ( props.data !== nextProps.data ) {

            changedProps.data = nextProps.data;

        }

        if ( props.width !== nextProps.width ) {

            changedProps.width = nextProps.width;

        }

        if ( props.height !== nextProps.height ) {

            changedProps.height = nextProps.height;

        }

        if ( props.forceSwitchCountry !== nextProps.forceSwitchCountry ) {

            changedProps.forceSwitchCountry = nextProps.forceSwitchCountry;

        }

        if ( props.configs !== nextProps.configs ) {

            evaluateConfigs( props.configs, nextProps.configs, changedProps );

        }

        return changedProps;

    }

    function evaluateConfigs ( propsConfigs, nextPropsConfigs, changedProps ) {

        if ( nextPropsConfigs === null || nextPropsConfigs === undefined ) {

            return;

        }

        if ( propsConfigs === null || propsConfigs === undefined ) {

            Utils.inject( changedProps.configs, nextPropsConfigs );
            return;

        }

        compareControl( propsConfigs.control, nextPropsConfigs.control, changedProps );
        compareColor( propsConfigs.color, nextPropsConfigs.color, changedProps );
        compareBrightness( propsConfigs.brightness, nextPropsConfigs.brightness, changedProps );

    }

    function compareControl ( configsControl, nextControl, changedProps ) {

        if ( nextControl === null || nextControl === undefined ) {

            return;

        }

        if ( configsControl ===  null || configsControl === undefined ) {

            Utils.inject(changedProps, nextControl);
            return;

        }

        if ( configsControl.stats !== nextControl.stats ) {

            changedProps.configs.control.stats = nextControl.stats;

        }

        if ( configsControl.disableUnmentioned !== nextControl.disableUnmentioned ) {

            changedProps.configs.control.disableUnmentioned = nextControl.disableUnmentioned;

        }

        if ( configsControl.lightenMentioned !== nextControl.lightenMentioned ) {

            changedProps.configs.control.lightenMentioned = nextControl.lightenMentioned;

        }

        if ( configsControl.inOnly !== nextControl.inOnly ) {

            changedProps.configs.control.inOnly = nextControl.inOnly;

        }

        if ( configsControl.outOnly !== nextControl.outOnly ) {

            changedProps.configs.control.outOnly = nextControl.outOnly;

        }

        if ( configsControl.initCountry !== nextControl.initCountry ) {

            changedProps.configs.control.initCountry = nextControl.initCountry;

        }

        if ( configsControl.halo !== nextControl.halo ) {

            changedProps.configs.control.halo = nextControl.halo;

        }

    }

    function compareColor ( configsColor, nextColor, changedProps ) {

        if ( nextColor === null || nextColor === undefined ) {

            return;

        }

        if ( configsColor === null || configsColor === undefined ) {

            Utils.inject( changedProps.configs.color, nextColor );
            return;

        }

        if ( configsColor.in !== nextColor.in ) {

            changedProps.configs.color.in = nextColor.in;

        }

        if ( configsColor.out !== nextColor.out ) {

            changedProps.configs.color.out = nextColor.out;

        }

        if ( configsColor.background !== nextColor.background ) {

            changedProps.configs.color.background = nextColor.background;

        }

        if ( configsColor.halo !== nextColor.halo ) {

            changedProps.configs.color.halo = nextColor.halo;

        }

        if ( configsColor.surface !== nextColor.surface ) {

            changedProps.configs.color.surface = nextColor.surface;

        }

        if ( configsColor.selected !== nextColor.selected ) {

            changedProps.configs.color.selected = nextColor.selected;

        }

    }

    function compareBrightness ( configsBrightness, nextBrightness, changedProps ) {

        if ( nextBrightness === null || nextBrightness === undefined ) {

            return;

        }

        if ( configsBrightness === null || configsBrightness === undefined ) {

            Utils.inject( changedProps.configs.brightness, nextBrightness );
            return;

        }

        if ( configsBrightness.ocean !== nextBrightness.ocean ) {

            changedProps.configs.brightness.ocean = nextBrightness.ocean;

        }

        if ( configsBrightness.related !== nextBrightness.related ) {

            changedProps.configs.brightness.related = nextBrightness.related;

        }

        if ( configsBrightness.mentioned !== nextBrightness.mentioned ) {

            changedProps.configs.brightness.mentioned = nextBrightness.mentioned;

        }

    }

    return {

        evaluate: evaluate

    }

}

export { Evaluator }