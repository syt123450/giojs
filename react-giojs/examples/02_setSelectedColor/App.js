import React, {Component} from 'react';
import axios from 'axios';
import Gio from '../../src/Gio.js';

class App extends Component {

    constructor() {
        super();

        this.state = {
            data: null,
            selectedColor: 0xFF0000
        };
    }

    componentDidMount() {
        axios.get(`../data/sampleData.json`)
            .then(response => this.setState({data: response.data}));

        setTimeout(() => {
            this.setState({
                selectedColor: 0x00FF00
            });
        }, 5000);
    }

    render() {

        const configs = {
            color: {
                selected: this.state.selectedColor
            }
        };

        return (
            <Gio data={this.state.data} configs={configs} />
        )
    }
}

export default App;