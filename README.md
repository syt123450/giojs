<p align="center"><a href="https://giojs.org" target="_blank"><img width="700" src="https://raw.githack.com/syt123450/giojs/master/assets/readme/logo2.jpg" alt="Gio logo"></a></p>

<h1 align="center">Gio.js</h1>

<p align="center">
<strong>English</strong> | <a href="https://github.com/syt123450/giojs/blob/master/README_zh.md"><strong>中文</strong></a>
</p>

<p align="center">React Version: <a href="https://github.com/syt123450/react-giojs">react-giojs</a></p>
<p align="center">Wechat minigame: <a href="https://github.com/syt123450/giojs-wechat-minigame-demo">wechat usage</a></p>

<p align="center">
  <a href="https://www.npmjs.com/package/giojs"><img src="https://img.shields.io/npm/v/giojs.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/syt123450/Gio.js/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="license badge"></a>
  <a href="https://github.com/mrdoob/three.js/"><img src="https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg" alt="dependencies badge"></a>
  <a href="https://travis-ci.org/syt123450/giojs"><img src="https://travis-ci.org/syt123450/giojs.svg" alt="build"></a>
  <a href="https://coveralls.io/github/syt123450/giojs?branch=master"><img src="https://coveralls.io/repos/github/syt123450/giojs/badge.svg" alt="coverage"></a>
</p>

**Gio.js** is an open source library for web 3D globe data visualization built with Three.js. What makes Gio.js different is that it is **simple** to use Gio.js to **customize** a 3D data visualization model in a declarative way, add your own data, and integrate it into your own **modern** web application.

<!-- [START screenshot] -->
<p align="center">
  <img src="https://raw.githack.com/syt123450/giojs/master/assets/readme/Gio.gif"/>
</p>
<!-- [END screenshot] -->

## Table of Content

* [Motivation](#motivation)
* [Getting Started](#getting-started)
* [Gio.js 2.0 Introduction](#intro2)
* [Examples](#examples)
* [API List](#api-list)
* [Documentation](#documentation)
* [Contributors](#contributors)
* [License](#license)

<!-- [START motivation] -->

## Motivation

**Gio.js** is an open source library for web 3D globe data visualization built with Three.js. What makes Gio.js different is that it is **simple** to use Gio.js to **customize** a 3D data visualization model in a declarative way, add your own data, and integrate it into your own **modern** web application.

This library is inspired by the <a href="https://github.com/dataarts/armsglobe">Arms Trade Visualization project</a> developed by Michael Chang and presented during Google Ideas INFO 2012. See <a href="http://mflux.tumblr.com/post/28367579774/armstradeviz">original post</a>. With Gio.js, it is easy to reproduce this fantastic data visualization model, and integrate it into web application.

* **Simplicity** -- Create a 3D global data visualization model with your own data in just four lines of javascript code
* **Customization** -- Design your own globe style with easy to use APIs in Gio.js
* **Modernization** -- Build a responsible, fully interactive, rich 3D frontend application using Gio.js

<!-- [END motivation] -->

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
<script src="https://threejs.org/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/giojs@2.2.1/build/gio.min.js"></script>
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

After including "three.min.js" and "gio.min.js" in your html, create a `div` to render the 3D Gio globe: (the usage of Gio.js is a little bit different in WeChat mini game, checkout this [demo](https://github.com/syt123450/giojs-wechat-minigame-demo) to know more about it)

```html
<!DOCTYPE HTML>
<html>
<head>

  <!-- include three.min.js library-->
  <script src="three.min.js"></script>

  <!-- include gio.min.js library-->
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

    /**
    * use addData() API to add the the data to the controller
    * know more about data format, check out documentation about data: http://giojs.org/html/docs/dataIntro.html
    * we provide sample data for test, get sample data from: https://github.com/syt123450/giojs/blob/master/examples/data/sampleData.json
    */
    controller.addData( data );

    // call the init() API to show the IO globe in the browser
    controller.init();

</script>
```
If everything goes well, you shall see [this](http://giojs.org/examples/00_hello_world(simplest).html). For more fancier usage of Gio.js, check out <a href="http://giojs.org/html/docs/index.html">Gio.js API document</a>

Click the codepen logo to try it in Codepen: &nbsp;&nbsp;<a target="_blank" href="https://codepen.io/syt123450/pen/VXNdgM"><img width=50 height=50 src="https://raw.githack.com/syt123450/giojs/master/assets/readme/codepen.png"></a>

<!-- [END getstarted] -->

<!-- [START documentation] -->

## <div id="intro2">Gio.js 2.0 Introduction</div>

After Gio.js 1.0 released, developers propose many cool and constructive advise. Gio.js implements most of these features. Gio.js 2.0 comes with many big features such as:

* Data group and switchDataSets API to switch between different data sets [<a href="http://giojs.org/html/docs/dataAdd.html#group">introduction</a>]

* Provide Three.js programming interface [<a href="http://giojs.org/html/docs/interfaceThree.html">introduction</a>]

* Provide Stats.js programming interface [<a href="http://giojs.org/html/docs/interfaceStats.html">introduction</a>]

* Support export data to continent [<a href="http://giojs.org/html/docs/dataContinent.html">introduction</a>]

* Provide input data check [<a href="https://github.com/syt123450/giojs/issues/86">issue</a>]

* Support WeChat mini program [<a href="https://github.com/syt123450/giojs-wechat-minigame-demo">demo</a>]

* New clearData [<a href="http://giojs.org/html/docs/dataClear.html">introduction</a>]

* New closeLiveLoader [<a href="http://giojs.org/html/docs/dataLiveLoad.html">introduction</a>]

* Transparent Background [<a href="http://giojs.org/html/docs/designTransparent.html">introduction</a>]

* Auto Rotation [<a href="https://giojs.org/html/docs/designRotation.html">introduction</a>]

## Examples

Gio.js has many representative demos to show how to work with Gio.js, there are mainly three example resources:

- **Resource 1**: Gio.js Playground

There is a Playground ( <a href="http://giojs.org/html/playground.html">playground link</a> ) for developers to play with Gio.js and export Gio.js parameter.

- **Resource 2**: Github "examples" folder

Gio.js has many API demos, and these demos are gathered in examples folder. clone the Gio.js repo, try them in your own environment ~

- **Resource 3**: Live demos on Codepen

Gio.js has a Codepen collection which contains many live demos about Gio.js, click the codepen logo and try to edit them!
<a target="_blank" href="https://codepen.io/collection/DkBobG/"><img width=50 height=50 src="https://raw.githack.com/syt123450/giojs/master/assets/readme/codepen.png"></a>

## API List

**[➡ `configure`(json)](http://giojs.org/html/docs/configureAPI.html)** 

Configure the controller.

**[➡ `setInitCountry(ISOCode, default: 'CN')`](http://giojs.org/html/docs/designInitCountry.html)**

Set the country initially selected.

**[➡ `lightenMentioned(boolean, default: 'false')`](http://giojs.org/html/docs/designLightenMen.html)**

Makes the mentioned country brighter than those not mentioned in the input dataset.

**[➡ `disableUnmentioned(boolean, default: 'false')`](http://giojs.org/html/docs/designDisableUnmen.html)**

Disables an unmentioned country and makes it unselectable.

**[➡ `showInOnly(boolean, default: 'false')`](http://giojs.org/html/docs/designShowOnly.html)**

Displays only the line with data flowing into the selected country.

**[➡ `showOutOnly(boolean, default: 'false')`](http://giojs.org/html/docs/designShowOnly.html)**

Displays only the line with data flowing out of the selected country.

**[➡ `addHalo(string)`](http://giojs.org/html/docs/designHalo.html)**

Enables the halo around the earth. When enabling halo, the color of halo also can be specified.

**[➡ `removeHalo()`](http://giojs.org/html/docs/designHalo.html)**

Disables the halo around the earth.

**[➡ `enableStats()`](http://giojs.org/html/docs/designStats.html)**

Displays stats on the upper-left corner of the scene.

**[➡ `disableStats()`](http://giojs.org/html/docs/designStats.html)**

Hides stats on the upper-left corner of the scene.

**[➡ `setTransparentBackground()`](http://giojs.org/html/docs/designTransparent.html)**

Make default background transparent.

**[➡ `setAutoRotation()`](https://giojs.org/html/docs/designRotation.html)**

Make globe rotate automatically.

**[➡ `setStyle(string)`](http://giojs.org/html/docs/colorStyle.html)**

Sets the color scheme of the 3D globe by name.

**[➡ `setSurfaceColor(string, default: '#ffffff')`](http://giojs.org/html/docs/colorSurface.html)**

Sets the color of the surface the 3D globe.

**[➡ `setSelectedColor(string, default: '#ffffff')`](http://giojs.org/html/docs/colorSelected.html)**

Sets color of the country in selected state.

**[➡ `setExportColor(string, default: '#DD380C')`](http://giojs.org/html/docs/colorExport.html)**

Sets the color of out line.

**[➡ `setImportColor(string, default: '#154492')`](http://giojs.org/html/docs/colorImport.html)**

Sets the color of in line.

**[➡ `setHaloColor(string, default: '#ffffff')`](http://giojs.org/html/docs/colorHalo.html)**

Sets the color of the Halo.

**[➡ `setBackgroundColor(string, default: '#000000')`](http://giojs.org/html/docs/colorBackground.html)**

Sets the color of the background.

**[➡ `adjustOceanBrightness(float, default: 0.5)`](http://giojs.org/html/docs/colorOceanBr.html)**

Sets the brightness of the ocean.

**[➡ `adjustRelatedBrightness(float, default: 0.5)`](http://giojs.org/html/docs/colorRelatedBr.html)**

Sets the brightness of the related country.

**[➡ `adjustMentionedBrightness(float, default: 0.5)`](http://giojs.org/html/docs/colorMenBr.html)**

Sets the brightness of the mentioned country.

**[➡ `addData(json)`](http://giojs.org/html/docs/dataAdd.html)**

Loads data to the controller of Gio and overrides previous data synchronously.

**[➡ `clearData()`](http://giojs.org/html/docs/dataClear.html)**

Clear data in the globe, and remove spline system and moving particle.

**[➡ `switchDataSet()`](http://giojs.org/html/docs/dataSwitchSet.html)**

switch data set when a data group is added.

**[➡ `addDataAsync(url, callback)`](http://giojs.org/html/docs/dataAddAsync.html)**

Loads data to the controller of Gio and overrides previous data asynchronously.

**[➡ `liveLoad(url, callback, duration)`](http://giojs.org/html/docs/dataLiveLoad.html)**

Loads data to the controller periodically.

**[➡ `closeLiveLoader()`](http://giojs.org/html/docs/dataLiveLoad.html)**

Close live load function.

**[➡ `getScene()`](http://giojs.org/html/docs/interfaceThree.html)**

Get the reference of three.js scene object.

**[➡ `getStatsObject()`](http://giojs.org/html/docs/interfaceStats.html)**

Get the reference of Stats.js panel object.

**[➡ `onCountryPicked(callback)`](http://giojs.org/html/docs/callbackPicked.html)**

Fired when selected country changes.

**[➡ `switchCountry(IsoCode)`](http://giojs.org/html/docs/advancedSwitch.html)**

Change currently selected country.

## Documentation

- For quick start, checkout [Getting Started](https://github.com/syt123450/Gio.js/blob/master/docs/en/Getting_Started.md)
- To learn more about the [Basic Elements](https://github.com/syt123450/Gio.js/blob/master/docs/en/Basic_Elements.md)
- To see the full API document in Markdown format, checkout [APIs](https://github.com/syt123450/Gio.js/blob/master/docs/en/APIs.md)
- To contribute to Gio.js's code base, read [Developer Guide](https://github.com/syt123450/Gio.js/blob/master/docs/en/Developer_Guide.md)
- Checkout Gio's official website [giojs.org](http://giojs.org) for everything above and plus lots of live examples
<!-- [END documentation] -->

[screenshot-url]: http://via.placeholder.com/400x300
[npm-badge]: https://img.shields.io/badge/npm-v0.0.5-orange.svg
[npm-badge-url]: https://www.npmjs.com/package/giojs
[license-badge]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-badge-url]: https://github.com/syt123450/Gio.js/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg
[dependencies-badge-url]: https://github.com/mrdoob/three.js/

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/7977100?v=4" width="100px;"/><br /><sub><b>syt123450</b></sub>](https://github.com/syt123450)<br />[💻](https://github.com/syt123450/giojs/commits?author=syt123450 "Code") [📖](https://github.com/syt123450/giojs/commits?author=syt123450 "Documentation") [💡](#example-syt123450 "Examples") [⚠️](https://github.com/syt123450/giojs/commits?author=syt123450 "Tests") | [<img src="https://avatars3.githubusercontent.com/u/25629006?v=4" width="100px;"/><br /><sub><b>Botime</b></sub>](https://github.com/BoTime)<br />[💻](https://github.com/syt123450/giojs/commits?author=BoTime "Code") [📖](https://github.com/syt123450/giojs/commits?author=BoTime "Documentation") [⚠️](https://github.com/syt123450/giojs/commits?author=BoTime "Tests") [🚇](#infra-BoTime "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/5203735?v=4" width="100px;"/><br /><sub><b>Mutian Wang</b></sub>](https://github.com/manymeeting)<br />[💻](https://github.com/syt123450/giojs/commits?author=manymeeting "Code") [📦](#platform-manymeeting "Packaging/porting to new platform") [🎨](#design-manymeeting "Design") [👀](#review-manymeeting "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/4524339?v=4" width="100px;"/><br /><sub><b>Chenhua Zhu</b></sub>](https://github.com/zchholmes)<br />[💻](https://github.com/syt123450/giojs/commits?author=zchholmes "Code") [🚇](#infra-zchholmes "Infrastructure (Hosting, Build-Tools, etc)") [🤔](#ideas-zchholmes "Ideas, Planning, & Feedback") [👀](#review-zchholmes "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/19629037?v=4" width="100px;"/><br /><sub><b>Qi(Nora)</b></sub>](https://github.com/lq3297401)<br />[💻](https://github.com/syt123450/giojs/commits?author=lq3297401 "Code") [🎨](#design-lq3297401 "Design") [📖](https://github.com/syt123450/giojs/commits?author=lq3297401 "Documentation") [✅](#tutorial-lq3297401 "Tutorials") | [<img src="https://avatars2.githubusercontent.com/u/9123588?v=4" width="100px;"/><br /><sub><b>bouyuc</b></sub>](http://www.bouyuc.com)<br />[📖](https://github.com/syt123450/giojs/commits?author=bouyuc "Documentation") [✅](#tutorial-bouyuc "Tutorials") | [<img src="https://avatars0.githubusercontent.com/u/24384948?v=4" width="100px;"/><br /><sub><b>Xiaoran Lin</b></sub>](https://www.linkedin.com/in/xiaoran-lin-3529726a/)<br />[💻](https://github.com/syt123450/giojs/commits?author=siriustom "Code") [🎨](#design-siriustom "Design") [💡](#example-siriustom "Examples") [👀](#review-siriustom "Reviewed Pull Requests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/11318667?v=4" width="100px;"/><br /><sub><b>Leon</b></sub>](https://github.com/leonsaber)<br />[💻](https://github.com/syt123450/giojs/commits?author=leonsaber "Code") [🎨](#design-leonsaber "Design") [💡](#example-leonsaber "Examples") | [<img src="https://avatars0.githubusercontent.com/u/11615615?v=4" width="100px;"/><br /><sub><b>Alexis</b></sub>](https://github.com/AlexisAnzieu)<br />[💻](https://github.com/syt123450/giojs/commits?author=AlexisAnzieu "Code") [🐛](https://github.com/syt123450/giojs/issues?q=author%3AAlexisAnzieu "Bug reports") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

[Apache-2.0](https://github.com/syt123450/giojs/blob/master/LICENSE)