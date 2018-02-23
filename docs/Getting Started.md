# Gio.js
**Gio.js** is an open source library for data visualization on a 3D globe. This library is inspired by the [Arms Trade Visualization](http://armsglobe.chromeexperiments.com/) project developed by Michael Chang and presented during Google Ideas INFO 2012. What makes Gio.js different is that it is fully customizable for user and friendly to future developers.

<!-- [START screenshot] -->
<p>
  <a href="https://github.com/syt123450/Gio.js/blob/master/assets/readme/Gio.png"><img src="https://github.com/syt123450/Gio.js/blob/master/assets/readme/Gio.png"/></a>
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
<script src="https://gio-js-cdn-link"></script>
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

After including "three.min.js" and "gio.min.hs" in your html, create a `div` to render the 3D Gio globe:

```html
<!DOCTYPE HTML>
<html>
<head>

  <!-- must include three.min.js library-->
  <script src="three.min.js"></script>

  <!-- must include Gio.min.js library-->
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
If everything goes well, you should see [this](jsfiddle-link).

<!-- [END getstarted] -->

<!-- [START documentation] -->
## Documentation
- For quick start, see [Getting Started](https://github.com/syt123450/Gio.js/blob/master/docs/Getting%20Started.md)
- To learn more about the [Basic Elements](https://github.com/syt123450/Gio.js/blob/master/docs/Basic%20Elements.md)
- To see the full API document in Markdown format, see [APIs](https://github.com/syt123450/Gio.js/blob/master/docs/APIs.md)
- To contribute to Gio.js's code base, read [Developer Guide](https://github.com/syt123450/Gio.js/blob/master/docs/Developer%20Guide.md)
- See Gio's [offical website](http://giojs.org) for everything above and plus lots of live examples
<!-- [END documentation] -->


[screenshot-url]: http://via.placeholder.com/400x300
[npm-badge]: https://img.shields.io/badge/npm-v0.0.5-orange.svg
[npm-badge-url]: https://www.npmjs.com/package/giojs
[license-badge]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-badge-url]: https://github.com/syt123450/Gio.js/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg
[dependencies-badge-url]: https://github.com/mrdoob/three.js/
