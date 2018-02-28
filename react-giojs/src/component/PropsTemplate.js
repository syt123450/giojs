/**
 * This is the Gio's Props template, the developer may set props of Gio like this
 */

function PropsTemplate () {

    return {

        // width of the Gio container

        width: null,

        // height of the Gio container

        height: null,

        // data of the Gio controller

        data: null,

        // API to switch to a specific country without click on the globe

        forceSwitchCountry: null,

        // user can set these configs to define how the Gio look like, this is the same as the parameter of Gio.js's configure() API

        configs: {

            control: {

                // whether show stats (boolean)

                stats: null,

                // whether let unmentioned country unclickable (boolean)

                disableUnmentioned: null,

                // whether let the country mentioned in dataset lighter (boolean)

                lightenMentioned: null,

                // only show in line for selected country (boolean)

                inOnly: null,

                // only show out line for selected country (boolean)

                outOnly: null,

                // set the initial selected country (ISO3166, String, eg. "CN")

                initCountry: null,

                // whether show halo (boolean)

                halo: null

            },

            // set elements' color, parameter can be: string (eg. "#ffffff") or hex number (eg. 0xffffff)

            color: {

                // surface color

                surface: null,

                // color of selected country

                selected: null,

                // color of in line of selected country

                in: null,

                // color of out line of selected country

                out: null,

                // halo color

                halo: null,

                // background color, area behind the globe

                background: null

            },

            // set the brightness of elements, parameter range can be [0, 1]

            brightness: {

                // brightness of ocean on the earth's surface

                ocean: null,

                // brightness of country mentioned in the data set

                mentioned: null,

                // country related to the selected country (in or out)

                related: null

            },

            resource: {

                // set the loading icon source (not support now QAQ)

                loading: null

            }

        }

    }

}

export { PropsTemplate }