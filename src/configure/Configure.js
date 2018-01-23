/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * This is a Configure object, the controller will create a "configure object" and hold the object.
 * When user using the API to do some configuration, they are actually setting the configure object.
 * When IO Globe is running, other component in controller will read this configure object through controller
 */

function Configure () {

    // used to set the surface color

    this.surfaceColor = 0xffffff;

    // used to set the color of selected country

    this.clickedColor = 0xffffff;

    // if the selected country's color is different from surface color, this attribute should be set "true"

    this.clickedDifferent = false;

    // use to set the "in" spline line color

    this.importColor = 0x154492;

    // use to set the "out" spline line color

    this.exportColor = 0xdd380c;

    // use to set color

    this.haloColor = 0xffffff;

    // use to set the ocean brightness ( range is 0 - 1 )

    this.oceanBrightness = 0.5;

    // use to set the mentioned countries brightness ( range is 0 - 1 ), only the attribute isLightenMentioned == true, this attribute will take effect

    this.mentionedBrightness = 0.5;

    // use to set brightness of countries related to selected country

    this.relatedBrightness = 0.5;

    // use to control whether show stats panel

    this.isStatsEnabled = false;

    // used to control whether to let unrelated countries ( unmentioned countries in input data ) unclickable

    this.disableUnrelated = false;

    // use to control whether to lighten mentioned countries ( mentioned in input data )

    this.isLightenMentioned = false;

    // resource of the loading icon

    this.loadingSrc = null;

    // setting for the initial country when globe is initialized

    this.selectedCountry = "CN";

    // control whether only show "in" lines for clicked country

    this.inOnly = false;

    // control whether only show "out" lines for clicked country

    this.outOnly = false;

    // control whether show halo

    this.halo = true;

    this.minDataValue = 800000;

    this.maxDataValue = 5000000;

    return this;

}

export { Configure }