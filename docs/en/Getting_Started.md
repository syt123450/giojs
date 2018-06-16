# Gio.js Hello World

**Gio.js** is an open source library for data visualization on a 3D globe. This library is inspired by the [Arms Trade Visualization](https://github.com/dataarts/armsglobe) project developed by Michael Chang and presented during Google Ideas INFO 2012. What makes Gio.js different is that it is fully customizable for user and friendly to future developers.

<!-- [START screenshot] -->
<p>
  <a href="https://github.com/syt123450/Gio.js/blob/master/assets/readme/Gio.png"><img src="https://github.com/syt123450/Gio.js/blob/master/assets/readme/Gio.gif"/></a>
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
<script src="https://raw.githack.com/syt123450/giojs/master/build/gio.min.js"></script>
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

  <!-- include three.min.js library-->
  <script src="three.min.js"></script>

  <!-- include Gio.min.js library-->
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

<!-- [END getstarted] -->

<!-- [START documentation] -->

## Other Documentation

- To learn more about the [Basic Elements](https://github.com/syt123450/Gio.js/blob/master/docs/en/Basic_Elements.md)
- To see the full API document in Markdown format, see [APIs](https://github.com/syt123450/Gio.js/blob/master/docs/en/APIs.md)
- To contribute to Gio.js's code base, read [Developer Guide](https://github.com/syt123450/Gio.js/blob/master/docs/en/Developer_Guide.md)
- See Gio's [offical website](http://giojs.org) for everything above and plus lots of live examples
<!-- [END documentation] -->


[screenshot-url]: http://via.placeholder.com/400x300
