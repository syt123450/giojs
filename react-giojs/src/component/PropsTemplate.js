function PropsTemplate () {

    return {

        width: null,

        height: null,

        data: null,

        forceSwitchCountry: null,

        configs: {

            control: {

                stats: null,

                disableUnmentioned: null,

                lightenMentioned: null,

                inOnly: null,

                outOnly: null,

                initCountry: null,

                halo: null

            },

            color: {

                surface: null,

                selected: null,

                in: null,

                out: null,
                
                halo: null,

                background: null

            },

            brightness: {

                ocean: null,

                mentioned: null,

                related: null

            },

            resource: {

                loading: null

            }

        }

    }

}

export { PropsTemplate }