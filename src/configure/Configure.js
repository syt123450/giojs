/**
 * @author syt123450 / https://github.com/syt123450
 */

/**
 * This is a Configure object, the controller will create a "configure object" and hold the object.
 * When user using the API to do some configuration, they are actually setting the configure object.
 * When IO Globe is running, other component in controller will read this configure object through controller
 */

function Configure () {

    this.surfaceColor = 0xffffff;

    this.clickedColor = 0xffffff;

    this.clickedDifferent = false;

    this.importColor = 0x154492;

    this.exportColor = 0xdd380c;

    this.haloColor = 0xffffff;

    this.oceanBrightness = 0.5;

    this.mentionedBrightness = 0.5;

    this.relatedBrightness = 0.5;

    this.isStatsEnabled = false;

    this.disableUnrelated = false;

    this.isLightenMentioned = false;

    this.loadingSrc = null;

    this.selectedCountry = "CN";

    this.inOnly = false;

    this.outOnly = false;

    this.halo = true;

    return this;

}

export { Configure }