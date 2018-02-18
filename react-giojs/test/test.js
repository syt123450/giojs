import React from 'react'
import ReactDOM from 'react-dom'
import Gio from '../src/Gio.js'
import './test.css';

const root = document.querySelector('main');

ReactDOM.render(
    <div styleName='body'>
        <Gio />
    </div>,
    root);
