import React, { Component } from 'react';
import {Controller} from "../node_modules/giojs/build/gio.react";

const divStyle = {
    height: '100px',
    width: '100px'
};

class Gio extends Component {

    constructor () {
        super();
    }

    componentDidMount() {

        var data = [
            {
                "e": "CN",
                "i": "US",
                "v": 3300000
            },
            {
                "e": "CN",
                "i": "RU",
                "v": 10000
            },
            {
                "e": "RU",
                "i": "US",
                "v": 3123
            },
            {
                "e": "FR",
                "i": "CN",
                "v": 2
            },
            {
                "e": "US",
                "i": "FR",
                "v": 5
            }
        ];

        var controller = new Controller(this.refs.div);
        controller.addData(data);
        controller.init();
    }

    render() {

        return (
            <div style={divStyle} ref={'div'}>
            </div>
        );
    }

}

export default Gio;