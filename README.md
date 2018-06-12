
<p align="center"><a href="https://giojs.org" target="_blank"><img width="100" src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/logo.png" alt="Gio logo"></a></p>

<h1 align="center">Gio.js</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/giojs"><img src="https://img.shields.io/npm/v/giojs.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/syt123450/Gio.js/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="license badge"></a>
  <a href="https://github.com/mrdoob/three.js/"><img src="https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg" alt="dependencies badge"></a>
  <a href="https://travis-ci.org/syt123450/Gio.js"><img src="https://travis-ci.org/syt123450/Gio.js.svg" alt="build"></a>
  <a href="https://coveralls.io/github/syt123450/Gio.js?branch=master"><img src="https://coveralls.io/repos/github/syt123450/Gio.js/badge.svg" alt="coverage"></a>
</p>

**Gio.js** is an open source library for data visualization library based on a 3D globe. This library is inspired by the [Arms Trade Visualization](http://armsglobe.chromeexperiments.com/) project developed by Michael Chang and presented during Google Ideas INFO 2012. See [original post](http://mflux.tumblr.com/post/28367579774/armstradeviz). What makes Gio.js different is that it is fully customizable for users, friendly to future developers to use in a declarative way.

There is a React version of giojs -- react-giojs, try it in another repo: https://github.com/syt123450/react-giojs

<!-- [START screenshot] -->
<p align="center">
  <img src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/Gio.png"/>
</p>
<!-- [END screenshot] -->

<!-- [START getstarted] -->
## Getting Started

### Installation
- Option 1: \<script\> tag

Include Three.js dependency:
```html
<script src="three.min.js"></script>
```
Include local Gio.js library
```html
<script src="gio.min.js"></script>
```
or through CDN
```html
<script src="https://rawgit.com/syt123450/Gio.js/master/build/gio.min.js"></script>
```
- Option 2: npm
```bash
npm install giojs --save
```
- Option 3: yarn
```bash
yarn add giojs
```
### Usage

After including "three.min.js" and "gio.min.js" in your html, create a `div` to render the 3D Gio globe:

```html
<!DOCTYPE HTML>
<html>
<head>

  <!-- must include three.min.js library-->
  <script src="three.min.js"></script>

  <!-- must include gio.min.js library-->
  <script src="gio.min.js"></script>

</head>
<body>

  <!-- container to draw 3D Gio globe-->
  <div id="globalArea"></div>

</body>
</html>

```
To initialize and render the 3D Gio globe:

```html

<script>

    // get the container to hold the IO globe
    var container = document.getElementById( "globalArea" );

    // create controller for the IO globe, input the container as the parameter
    var controller = new GIO.Controller( container );

    // use addData() API to add the the data to the controller
    controller.addData( data );

    // call the init() API to show the IO globe in the browser
    controller.init();

</script>
```
If everything goes well, you should see [this](http://giojs.org/examples/00_hello_world(simplest).html).

Click the codepen logo to try it in Codepen: &nbsp;&nbsp;<a target="_blank" href="https://codepen.io/syt123450/pen/VXNdgM"><img width=50 height=50 src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/codepen.png"></a>

<!-- [END getstarted] -->

<!-- [START documentation] -->

## Documentation
- For quick start, see [Getting Started](https://github.com/syt123450/Gio.js/blob/master/docs/en/Getting_Started.md)
- To learn more about the [Basic Elements](https://github.com/syt123450/Gio.js/blob/master/docs/en/Basic_Elements.md)
- To see the full API document in Markdown format, see [APIs](https://github.com/syt123450/Gio.js/blob/master/docs/en/APIs.md)
- To contribute to Gio.js's code base, read [Developer Guide](https://github.com/syt123450/Gio.js/blob/master/docs/en/Developer_Guide.md)
- See Gio's offical website [giojs.org](http://giojs.org) for everything above and plus lots of live examples
<!-- [END documentation] -->


[screenshot-url]: http://via.placeholder.com/400x300
[npm-badge]: https://img.shields.io/badge/npm-v0.0.5-orange.svg
[npm-badge-url]: https://www.npmjs.com/package/giojs
[license-badge]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-badge-url]: https://github.com/syt123450/Gio.js/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg
[dependencies-badge-url]: https://github.com/mrdoob/three.js/
