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

        // init the evaluator used to judge the changed props

        this._evaluator = new Evaluator();

        // init the basic controller of Gio

        this._controller = new Controller( this.refs.container );

        // init reducer used to manage the state of Gio controller

        this._reducer = new Reducer( this );

        // init states

        Gio.initState( this );

        // configure the Gio controller based on props

        if ( this.props.configs !== undefined && this.props.configs !== null ) {

            this._controller.configure( this.props.configs );

        }

        // add data to Gio controller

        this._controller.addData( this.props.data );

        // draw the Gio globe

        this._controller.init();

    }

    componentWillReceiveProps ( nextProps ) {

        // get changed props from evaluator

        var changedProps = this._evaluator.evaluate( this.props, nextProps );

        // let the reducer to change the state of Gio controller

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