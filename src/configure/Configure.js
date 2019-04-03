/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * This is a Configure object, the controller will create a "configure object" and hold the object.
 * When user using the API to do some configuration, they are actually setting the configure object.
 * When IO Globe is running, other component in controller will read this configure object through controller
 */

function Configure () {

    this.control =  {

        // use to control whether show stats panel

        stats: false,

        // used to control whether to let unrelated countries ( unmentioned countries in input data ) unclickable

        disableUnmentioned: false,

        // use to control whether to lighten mentioned countries ( mentioned in input data )

        lightenMentioned: false,

        // control whether only show "in" lines for clicked country

        inOnly: false,

        // control whether only show "out" lines for clicked country

        outOnly: false,

        // setting for the initial country when globe is initialized

        initCountry: "CN",

        // control whether show halo

        halo: true,
        
        // Control whether to have a transparent background.
        
        transparentBackground: false,
	
	    // Control whether globe will rotate automatically.
        
        autoRotation: false,
        
        // Control globe auto-rotation speed, for example, 2 means two time of normal speed.
        
        rotationRatio: 1

    };

    this.color = {

        // used to set the surface color

        surface: 0xffffff,

        // used to set the color of selected country

        selected: null,

        // use to set the "in" spline line color

        in: 0x154492,

        // use to set the "out" spline line color

        out: 0xdd380c,

        // use to set halo color

        halo: 0xffffff,

        // use to set the background color of the scene

        background: null

    };

    this.brightness = {

        // use to set the ocean brightness ( range is 0 - 1 )

        ocean: 0.5,

        // use to set the mentioned countries brightness ( range is 0 - 1 ), only the attribute isLightenMentioned == true, this attribute will take effect

        mentioned: 0.5,

        // use to set brightness of countries related to selected country

        related: 0.5

    };


    return this;

}

export { Configure }