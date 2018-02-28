
<p align="center"><a href="https://giojs.org" target="_blank"><img width="100" src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/logo.png" alt="Gio logo"></a></p>

<h1 align="center">React-Giojs</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/giojs"><img src="https://img.shields.io/npm/v/giojs.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/syt123450/Gio.js/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="license badge"></a>
  <a href="https://github.com/mrdoob/three.js/"><img src="https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg" alt="dependencies badge"></a>
  <a href="https://travis-ci.org/syt123450/Gio.js"><img src="https://travis-ci.org/syt123450/Gio.js.svg" alt="build"></a>
  <a href="https://coveralls.io/github/syt123450/Gio.js?branch=master"><img src="https://coveralls.io/repos/github/syt123450/Gio.js/badge.svg" alt="coverage"></a>
</p>

**React-Giojs** is a react version of the open source library **Gio.js**, **Gio.js** is an open source library for data visualization library based on a 3D globe. This library is inspired by the [Arms Trade Visualization](http://armsglobe.chromeexperiments.com/) project developed by Michael Chang and presented during Google Ideas INFO 2012. See [original post](http://mflux.tumblr.com/post/28367579774/armstradeviz). What makes Gio.js different is that it is fully customizable for users and friendly to future developers.



<!-- [START screenshot] -->
<p align="center">
  <a href=""><img src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/Gio.png"/></a>
</p>
<!-- [END screenshot] -->

<!-- [START getstarted] -->
## Getting Started

### Installation

- Option 1: npm
```bash
npm install react-giojs --save
```
- Option 2: yarn
```bash
yarn add react-giojs
```
### Usage

After install react-giojs, create a `Gio` tag to render the 3D Gio globe:

```html
import React, {Component} from 'react';
import axios from 'axios';

// import gio component from "react-giojs"

import Gio from 'react-giojs';

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
        
            // add data to "data" attribute, and render <Gio> tag
        
            <Gio data={this.state.data} />
        )
    }
}

export default App;

```

If everything goes well, you should see [this](http://giojs.org/examples/00_hello_world(simplest).html).

<!-- [END getstarted] -->

<!-- [START documentation] -->
## Documentation
- For quick start, see [Getting Started](https://github.com/syt123450/Gio.js/blob/master/docs/Getting%20Started.md)
- To learn more about the [Basic Elements](https://github.com/syt123450/Gio.js/blob/master/docs/Basic%20Elements.md)
- To see the full API document in Markdown format, see [APIs](https://github.com/syt123450/Gio.js/blob/master/docs/APIs.md)
- To contribute to Gio.js's code base, read [Developer Guide](https://github.com/syt123450/Gio.js/blob/master/docs/Developer%20Guide.md)
- See Gio's offical website [giojs.org](http://giojs.org) for everything above and plus lots of live examples
<!-- [END documentation] -->


[screenshot-url]: http://via.placeholder.com/400x300
[npm-badge]: https://img.shields.io/badge/npm-v0.0.5-orange.svg
[npm-badge-url]: https://www.npmjs.com/package/giojs
[license-badge]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-badge-url]: https://github.com/syt123450/Gio.js/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg
[dependencies-badge-url]: https://github.com/mrdoob/three.js/
