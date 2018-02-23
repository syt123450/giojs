import React, { Component } from 'react';
import {Controller} from "../node_modules/giojs/build/gio.react";
import {ControllerManager} from "./ControllerManager";
import Constants from '/Users/Tom/Documents/Gio.js/react-giojs/utils/Constants.js';

class Gio extends Component {

    constructor () {
        super();
    }

    componentDidMount() {

        this._controller = new Controller(this.refs.container);
        this._controller.addData(this.props.data);
        this._controller.init();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.surfaceColor && this.props.surfaceColor !== nextProps.surfaceColor) {
            this.gioAPIManager('SURFACECOLOR', nextProps.surfaceColor);
        } else if (this.props.selectedColor && this.props.selectedColor !== nextProps.selectedColor) {
            this.gioAPIManager('SELECTECOLOR', nextProps.selectedColor);
        } else if (this.props.initCountry && this.props.initCountry !== nextProps.initCountry) {
            this.gioAPIManager('INITCOUNTRY', nextProps.initCountry);
        } else if (this.props.exportColor && this.props.exportColor !== nextProps.exportColor) {
            this.gioAPIManager('EXPORTCOLOR', nextProps.exportColor);
        } else if (this.props.importColor && this.props.importColor !== nextProps.importColor) {
            this.gioAPIManager('IMPORTCOLOR', nextProps.importColor);
        } else if (this.props.oceanBrightness && this.props.oceanBrightness !== nextProps.oceanBrightness) {
            this.gioAPIManager('OCEANBRIGHTNESS', nextProps.oceanBrightness);
        } else if (this.props.relatedBrightness && this.props.relatedBrightness !== nextProps.relatedBrightness) {
            this.gioAPIManager('RELATEDBRIGHTNESS', nextProps.relatedBrightness);
        } else if (this.props.mentionedBrightness && this.props.mentionedBrightness !== nextProps.mentionedBrightness) {
            this.gioAPIManager('MENTIONBRIGHTNESS', nextProps.mentionedBrightness);
        } else if (this.props.style && this.props.style !== nextProps.style) {
            // console.log("style has changed");
            this.gioAPIManager('STYLE', nextProps.style);
        } else if (this.props.showin && this.props.showin !== nextProps.showin) {
            this.gioAPIManager('SHOWINONLY', nextProps.showin);
        }
        // this._controller = new Controller(this.refs.div);
        // this._controller.addData(countryData);
        // this._controller.init();
    }

    gioAPIManager = (APIName, params) => {
        switch(APIName) {
            case Constants.SURFACECOLOR:
                return this._controller.setSurfaceColor(params);
            case Constants.SELECTECOLOR://cannot set after init
                return this._controller.setSelectedColor(params);
            case Constants.INITCOUNTRY://cannot set after init
                return this._controller.setInitCountry(params);
            case Constants.EXPORTCOLOR:
                return this._controller.setExportColor(params);
            case Constants.IMPORTCOLOR:
                return this._controller.setImportColor(params);
            case Constants.OCEANBRIGHTNESS:
                return this._controller.adjustOceanBrightness(params);
            case Constants.RELATEDBRIGHTNESS:
                return this._controller.adjustRelatedBrightness(params);
            case Constants.MENTIONBRIGHTNESS:
                return this._controller.adjustMentionedBrightness(params);
            case Constants.STYLE://cannot set after init
                return this._controller.setStyle(params);
            case Constants.ENABLELIGHTENMENTIONED:
                return this._controller.lightenMentioned(true);
            case Constants.DISABLEUNMENTIONED:
                return this._controller.disableUnmentioned(false);
            case Constants.SHOWINONLY:
                return this._controller.showInOnly(params);
            case Constants.SHOWOUTONLY:
                return this._controller.showOutOnly(true);
            case Constants.CONFIGURE:
                return this._controller.configure(params);
            case Constants.ENABLESTATS:
                return this._controller.enableStats();
            case Constants.ADDDATA:
                return this._controller.addData(params);
            case Constants.CLEARDATA:
                return this._controller.clearData();
            case Constants.HALOCOLOR:
                return this._controller.setHaloColor(params);
            case Constants.ADDHOLO:
                return this._controller.addHalo(params);
            case Constants.REMOVEHOLO:
                return this._controller.removeHalo();
            case Constants.BACKGROUNDCOLOR:
                return this._controller.setBackgroundColor(params);
            default:
                return;
        }
    }

    render() {

        return (
            <div style={Gio.defaultProps.style} ref={'container'}>
            </div>
        );
    }

}

Gio.defaultProps = {

    style: {
        "height": "100%",
        "width": "100%"
    }

};

export default Gio;