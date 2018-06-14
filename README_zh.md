
<p align="center"><a href="https://giojs.org" target="_blank"><img width="100" src="https://github.com/syt123450/giojs/blob/master/assets/readme/logo.png" alt="Gio logo"></a></p>

<h1 align="center">Gio.js</h1>

<p align="center">
<a href="https://github.com/syt123450/giojs/blob/master/README.md"><strong>English</strong></a> | <strong>中文</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/giojs"><img src="https://img.shields.io/npm/v/giojs.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/syt123450/Gio.js/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="license badge"></a>
  <a href="https://github.com/mrdoob/three.js/"><img src="https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg" alt="dependencies badge"></a>
  <a href="https://travis-ci.org/syt123450/Gio.js"><img src="https://travis-ci.org/syt123450/Gio.js.svg" alt="build"></a>
  <a href="https://coveralls.io/github/syt123450/Gio.js?branch=master"><img src="https://coveralls.io/repos/github/syt123450/Gio.js/badge.svg" alt="coverage"></a>
</p>

**Gio.js** 是一个用来做3D地球数据可视化的开源组件库，这个库是受到Google 2012 Info大会上的项目[武器贩卖可视化](http://armsglobe.chromeexperiments.com/)启发，原项目开发者是Google员工Michael Chang。Gio.js的不同之处在于开发者可以以一种以声明的方式来使用，简洁地创建3D地球可视化模型，通过丰富的Gio.js API方便地定制模型并整合到自己的Web应用中。

Gio.js有一个React版本——react-giojs，有兴趣的话去这个仓库看看吧：https://github.com/syt123450/react-giojs

<!-- [START screenshot] -->
<p align="center">
  <img src="https://github.com/syt123450/giojs/blob/master/assets/readme/Gio.gif"/>
</p>
<!-- [END screenshot] -->

## 目录

* [开始使用](#getting-started)
* [例子](#examples)
* [文档](#documentation)

<!-- [START getstarted] -->
## <div id="getting-started">开始使用</div>

### 安装
- 途径1: \<script\> 标签

在HTML页面的部分引入 Three.js 依赖：
```html
<script src="three.min.js"></script>
```
在HTML页面的部分引入 Gio.js 依赖：
```html
<script src="gio.min.js"></script>
```
或者通过CDN引入依赖：
```html
<script src="https://threejs.org/build/three.min.js"></script>
<script src="https://rawgit.com/syt123450/Gio.js/master/build/gio.min.js"></script>
```
- 途径2: JavaScript包管理工具NPM
```bash
npm install giojs --save
```
- 途径3: JavaScript包管理工具YARN
```bash
yarn add giojs
```
### 使用

在HTML页面中添加了Threejs和Giojs依赖之后，您就可以基于Giojs开发您的应用了。我们将展示如何创建一个具有基础样式的Gio地球。

```html
<!DOCTYPE HTML>
<html>
<head>

  <!-- 引入three.js -->
  <script src="three.min.js"></script>

  <!-- 引入Gio.js -->
  <script src="gio.min.js"></script>

</head>
<body>

  <!-- 创建一个div座位Gio的绘制容器 -->
  <div id="globalArea"></div>

</body>
</html>

```
在您的页面中添加以下Javascript代码来初始化Gio地球：

```html

<script>

    // 获得用来来承载您的IO地球的容器
    var container = document.getElementById( "globalArea" );

    // 创建Gio控制器
    var controller = new GIO.Controller( container );

    // 添加数据
    controller.addData( data );

    // 初始化并渲染地球
    controller.init();

</script>
```
如果一切顺利，在浏览器中打开您的HTML页面你将会看到以下3D地球： [用力点我](http://giojs.org/examples/00_hello_world(simplest).html).

点击后面这个Codepen logo来在Codepen中试一下这个例子吧 ~ &nbsp;&nbsp;<a target="_blank" href="https://codepen.io/syt123450/pen/VXNdgM"><img width=50 height=50 src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/codepen.png"></a>

<!-- [END getstarted] -->

## <div id="examples">例子</div>

Gio.js有很多代表性的例子，这些例子可以作为小帮手，辅助你成为一个Gio.js的专家！大致可以将这些小帮手分成三类：

- 小帮手1号: Gio.js Playground

Gio.js有一个Playground插件（<a href="http://giojs.org/html/playground.html">Playground链接</a>），在这个Playground中，你可以试试Gio.js的部分功能并且导出配置参数。

- 小帮手2号: Github仓库"examples"文件夹下的例子

Gio.js的仓库中有很多API例子，这些例子都被归集在"examples"文件夹下。Clone Gio.js仓库，然后在本地环境中看看它们把~

- 小帮手3号: Codepen在线可编辑的例子

Gio.js有很多codepen的例子，你可以在codepen中编辑修改它们。点击后面这个Codepen logo，可以直接进入Gio.js Codepen的编辑界面。<a target="_blank" href="https://codepen.io/collection/DkBobG/"><img width=50 height=50 src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/codepen.png"></a>

## <div id="documentation">文档</div>

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
