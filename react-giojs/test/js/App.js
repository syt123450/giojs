import React, {Component} from 'react';
import axios from 'axios';
import Gio from '../../src/Gio.js';

class App extends Component {

    constructor() {
        super();

        this.state = {
            data: [
                {
                    "e": "CN",
                    "i": "US",
                    "v": 3300000
                }
            ],
            width: 200,
            height: 200,
            surfaceColor: 0xFF0000,
            selectedColor: null,
            halo: true
        };

        setTimeout(() => {
            this.setState({
                data: [
                    {
                        "e": "CN",
                        "i": "US",
                        "v": 3300000
                    }
                ]
            });
        }, 3000);

        setTimeout(() => {
            this.setState({width: 300});
        }, 3000);

        setTimeout(() => {
            this.setState({forceSwitchCountry: "US"});
        }, 5000);

        setTimeout(() => {
            this.setState({
                surfaceColor: 0x00FF00,
                selectedColor: 0x0000FF
            });
        }, 5000);

        setTimeout(() => {
            this.setState({
                halo: false
            });
        }, 7000);
    }

    componentDidMount() {
        axios.get(`./data/countryData.json`)
            .then(response => this.setState({data: response.data}))
    }

    render() {

        const config = {
            control: {
                halo: this.state.halo
            },
            color: {
                surface: this.state.surfaceColor,
                selected: this.state.selectedColor
            }
        };

        return (
            <Gio width={this.state.width}
                 height={this.state.height}
                 data={this.state.data}
                 forceSwitchCountry={this.state.forceSwitchCountry}
                 configs={config}
            />
        )
    }
}

export default App;