import React, {Component} from 'react';
import axios from 'axios';
import Gio from '../../src/Gio.js';

class App extends Component {

    constructor() {
        super();

        this.state = {
            data: null,
            forceSwitchCountry: null
        };
    }

    componentDidMount() {
        axios.get(`../data/sampleData.json`)
            .then(response => this.setState({data: response.data}));

        setTimeout(() => {
            this.setState({
                forceSwitchCountry: "US"
            });
        }, 5000);
    }

    render() {

        return (
            <Gio data={this.state.data} forceSwitchCountry={this.state.forceSwitchCountry} />
        )
    }
}

export default App;