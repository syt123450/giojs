import React, { Component } from 'react';
import { Controller } from "../node_modules/giojs/build/gio.react";
import { Evaluator } from "./handler/Evaluator";
import { Reducer } from "./handler/Reducer";
import { Utils } from "./utils/Utils";

class Gio extends Component {

    constructor () {

        super();

        this.state = {

            width: null,
            height: null

        }

    }

    componentDidMount () {

        this._evaluator = new Evaluator();
        this._controller = new Controller( this.refs.container );
        this._reducer = new Reducer( this );

        Gio.initState( this );

        if ( this.props.configs !== undefined && this.props.configs !== null ) {

            this._controller.configure( this.props.configs );

        }

        this._controller.addData( this.props.data );
        this._controller.init();

    }

    componentWillReceiveProps ( nextProps ) {

        var changedProps = this._evaluator.evaluate( this.props, nextProps );
        this._reducer.update( changedProps );

    }

    render() {

        const style = {

            width: this.state.width,
            height: this.state.height

        };

        return (
            <div style={ style } ref={ 'container' }>
            </div>
        );

    }

}

Gio.initState = function ( component ) {

    Gio.initStyle( component );

};

Gio.initStyle = function ( component ) {

    Utils.setStyle( component, component.props );

};

export default Gio;