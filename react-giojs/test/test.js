import React from 'react'
import ReactDOM from 'react-dom'
import Gio from '../src/Gio.js'
import './css/test.css';

const root = document.getElementById('root');

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

ReactDOM.render(<Gio data={data}/>, root);
