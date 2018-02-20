import React, { Component } from 'react';
import {Controller} from "../node_modules/giojs/build/gio.react";

class Gio extends Component {

    constructor () {
        super();
    }

    componentDidMount() {

        var controller = new Controller(this.refs.container);
        controller.addData(this.props.data);
        controller.init();
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