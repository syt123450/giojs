function Configure () {

    this.surfaceColor = 0xffffff;

    this.clickedColor = 0xffffff;

    this.clickedDifferent = false;

    this.importColor = 0x154492;

    this.exportColor = 0xdd380c;

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

    this.liveLoad = false;

    return this;

}

export { Configure }