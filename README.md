
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

## Example

We provides many representative demos to show how to work with Gio.js, there are mainly two example resources:

- Resource 1: Github "examples" folder

We write many API demos and gather them in examples folder, clone the Gio.js repo, try them in your own environment ~

- Resource 2: Live demos on Codepen

We create a Codepen collection which contains many live demos about Gio.js, click the codepen logo and try to edit them!
<a target="_blank" href="https://codepen.io/collection/DkBobG/"><img width=50 height=50 src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/codepen.png"></a>

## Documentation

- For quick start, see [Getting Started](https://github.com/syt123450/Gio.js/blob/master/docs/en/Getting_Started.md)
- To learn more about the [Basic Elements](https://github.com/syt123450/Gio.js/blob/master/docs/en/Basic_Elements.md)
- To see the full API document in Markdown format, see [APIs](https://github.com/syt123450/Gio.js/blob/master/docs/en/APIs.md)
- To contribute to Gio.js's code base, read [Developer Guide](https://github.com/syt123450/Gio.js/blob/master/docs/en/Developer_Guide.md)
- See Gio's official website [giojs.org](http://giojs.org) for everything above and plus lots of live examples
<!-- [END documentation] -->

## 中文文档

**Gio.js** 是一个用来做3D地球数据可视化的开源组件库，这个库是受到Google 2012 Info大会上的项目[武器贩卖可视化](http://armsglobe.chromeexperiments.com/)启发，原项目开发者是Google员工Michael Chang。Gio.js的不同之处在于开发者可以以一种以声明的方式来使用，简洁地创建3D地球可视化模型，通过丰富的Gio.js API方便地定制模型并整合到自己的Web应用中。

- 如果想要快速了解如何使用Giojs的话，看看 [开始使用](https://github.com/syt123450/giojs/blob/master/docs/zh/Getting_Started_zh.md) 呐~
- 如果想要了解Giojs的基本组件，看看 [基础组件](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md) 哈~
- 如果你有丰富的第三方组件的使用经验，不妨直接研究一下 [Giojs API 文档](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md) 啦~
- 如果想要加入我们Giojs的开发，来看看 [开发者文档](https://github.com/syt123450/giojs/blob/master/docs/zh/Developer_Guide_zh.md) 吧~
- 当然如果看不惯Markdown格式的文档，我们也准备了中文版的网站 [官网](http://giojs.org/index_zh.html)


[screenshot-url]: http://via.placeholder.com/400x300
[npm-badge]: https://img.shields.io/badge/npm-v0.0.5-orange.svg
[npm-badge-url]: https://www.npmjs.com/package/giojs
[license-badge]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-badge-url]: https://github.com/syt123450/Gio.js/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg
[dependencies-badge-url]: https://github.com/mrdoob/three.js/
