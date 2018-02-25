import React, {Component} from 'react';
import axios from 'axios';
import Gio from '../../src/Gio.js';

class App extends Component {

    constructor() {
        super();

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        axios.get(`../data/sampleData.json`)
            .then(response => this.setState({data: response.data}))
    }

    render() {

        return (
            <Gio data={this.state.data} />
        )
    }
}

export default App;