import React, { Component } from 'react';
import axios from 'axios';
import Gio from '../../src/Gio.js';

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

class App extends Component {

    componentDidMount() {
        axios.get(`./data/countryData.json`)
            .then(response => console.log(response.data))
    }

    render() {
        return (
            <Gio data={data} />
        )
    }
}

export default App;