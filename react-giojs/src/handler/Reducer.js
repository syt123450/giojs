import { Utils } from "../utils/Utils";

/**
 * The Reducer update the state of Gio controller based on given props.
 * The Reducer call the controller's API to change its state.
 * The Reducer can get controller through "component._controller".
 * The original Giojs's API can be found in website: http://giojs.org/html/document.html
 */

function Reducer ( component ) {

    // public function, accept a props, this function will find the not null props, can call the corresponding controller's API

    function update ( props ) {

        // each function follow the structure of "PropsTemplate" defined in "src/component/PropsTemplate.js"

        updateData( props );
        updateStyle( props );
        updateForceSwitchCountry( props );
        updateConfigs( props );

    }

    function updateData ( props ) {

        if (props.data !== null) {

            component._controller.addData( props.data );

        }

    }

    function updateStyle ( props ) {

        if ( props.width !== null || props.height !== null ) {

            Utils.setStyle( component, props );

        }

    }

    function updateForceSwitchCountry ( props ) {

        if ( props.forceSwitchCountry !== null ) {

            component._controller.switchCountry( props.forceSwitchCountry );

        }

    }

    function updateConfigs ( props ) {

        updateControl( props );
        updateConfigColor( props );
        updateConfigBrightness( props );

    }

    function updateControl ( props ) {

        if ( props.configs.control.stats !== null ) {

            if ( props.configs.control.stats === true ) {

                component._controller.enableStats();

            } else {

                component._controller.disableStats();

            }

        }

        if ( props.configs.control.disableUnmentioned !== null ) {

            component._controller.disableUnmentioned( props.configs.control.disableUnmentioned );

        }

        if ( props.configs.control.lightenMentioned !== null ) {

            component._controller.lightenMentioned( props.configs.control.lightenMentioned );

        }

        if ( props.configs.control.inOnly !== null ) {

            component._controller.showInOnly( props.configs.control.inOnly );

        }

        if ( props.configs.control.outOnly !== null ) {

            component._controller.showOutOnly( props.configs.control.outOnly );

        }

        if ( props.configs.control.initCountry !== null ) {

            component._controller.setInitCountry( props.configs.control.initCountry );

        }

        if ( props.configs.control.halo !== null ) {

            if ( props.configs.control.halo ) {

                component._controller.addHalo();

            } else {

                component._controller.removeHalo();

            }

        }

    }

    function updateConfigColor ( props ) {

        if ( props.configs.color.in !== null ) {

            component._controller.setImportColor( props.configs.color.in );

        }

        if ( props.configs.color.out !== null ) {

            component._controller.setExportColor( props.configs.color.out );

        }

        if ( props.configs.color.background !== null ) {

            component.setBackgroundColor( props.configs.color.background );

        }

        if ( props.configs.color.halo !== null ) {

            component._controller.setHaloColor( props.configs.color.halo );

        }

        if ( props.configs.color.surface !== null ) {

            component._controller.setSurfaceColor( props.configs.color.surface );

        }

        if ( props.configs.color.selected !== null ) {

            component._controller.setSelectedColor( props.configs.color.selected );

        }

    }

    function updateConfigBrightness ( props ) {

        if ( props.configs.brightness.ocean !== null ) {

            component._controller.adjustOceanBrightness( props.configs.brightness.ocean );

        }

        if ( props.configs.brightness.mentioned !== null ) {

            component._controller.adjustMentionedBrightness( props.configs.brightness.mentioned );

        }

        if ( props.configs.brightness.related !== null ) {

            component._controller.adjustRelatedBrightness(props.configs.brightness.related);

        }

    }

    return {

        update: update

    }

}

export { Reducer }