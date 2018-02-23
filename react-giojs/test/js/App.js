import React, { Component } from 'react';
import axios from 'axios';
import Gio from '../../src/Gio.js';
import { countryData } from '/Users/Tom/Documents/Gio.js/react-giojs/test/data/TestData.js';
import Colors from '/Users/Tom/Documents/Gio.js/react-giojs/utils/Colors.js';

// var data = [
//     {
//         "e": "CN",
//         "i": "US",
//         "v": 3300000
//     },
//     {
//         "e": "CN",
//         "i": "RU",
//         "v": 10000
//     },
//     {
//         "e": "RU",
//         "i": "US",
//         "v": 3123
//     },
//     {
//         "e": "FR",
//         "i": "CN",
//         "v": 2
//     },
//     {
//         "e": "US",
//         "i": "FR",
//         "v": 5
//     }
// ];

class App extends Component {

    constructor() {
        super();

        this.state = { surfaceColor: Colors.white };

        setTimeout(() => {
            this.setState({ surfaceColor: Colors.blue });
        }, 3000)
    }

    // componentDidMount() {
    //     axios.get(`./data/countryData.json`)
    //         .then(response => console.log(response.data))
    // }

    render() {
        return (
            <Gio data={countryData} />
        )
    }
}

export default App;