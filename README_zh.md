
<p align="center"><a href="https://giojs.org" target="_blank"><img width="100" src="https://github.com/syt123450/giojs/blob/master/assets/readme/logo.png" alt="Gio logo"></a></p>

<h1 align="center">Gio.js</h1>

<p align="center">
<a href="https://github.com/syt123450/giojs/blob/master/README.md"><strong>English</strong></a> | <strong>中文</strong>
</p>

<p align="center">React版本: <a href="https://github.com/syt123450/react-giojs">react-giojs</a></p>


<p align="center">
  <a href="https://www.npmjs.com/package/giojs"><img src="https://img.shields.io/npm/v/giojs.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/syt123450/Gio.js/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="license badge"></a>
  <a href="https://github.com/mrdoob/three.js/"><img src="https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg" alt="dependencies badge"></a>
  <a href="https://travis-ci.org/syt123450/giojs"><img src="https://travis-ci.org/syt123450/giojs.svg" alt="build"></a>
  <a href="https://coveralls.io/github/syt123450/giojs?branch=master"><img src="https://coveralls.io/repos/github/syt123450/giojs/badge.svg" alt="coverage"></a>
</p>

**Gio.js** 是一个基于Three.js的web 3D地球数据可视化的开源组件库。使用Gio.js的网页应用开发者，可以快速地以申明的方式创建自定义的Web3D数据可视化模型，添加数据，并且将其作为一个组件整合到自己的应用中。

<!-- [START screenshot] -->
<p align="center">
  <img src="https://github.com/syt123450/giojs/blob/master/assets/readme/Gio.gif"/>
</p>
<!-- [END screenshot] -->

## 目录

* [为什么要使用Gio.js](#motivation)
* [开始使用](#getting-started)
* [例子](#examples)
* [文档](#documentation)
* [开发人员](#contributors)

<!-- [START motivation] -->

## <div id="motivation">为什么要使用Gio.js</div>

**Gio.js** 是一个基于Three.js的web 3D地球数据可视化的开源组件库。使用Gio.js的网页应用开发者，可以快速地以申明的方式创建自定义的Web3D数据可视化模型，添加数据，并且将其作为一个组件整合到自己的应用中。

这个库的开发是受到Google 2012 Info大会上的项目[世界武器贩卖可视化](https://github.com/dataarts/armsglobe)的启发，该项目开发者是Google员工Michael Chang。使用Gio.js就可以快速构建这种炫酷的3D模型，并以此为基础进行深入地开发。

* **易用性** -- 仅使用4行Javascript即可创建3D地球数据可视化模型
* **定制化** -- 使用Gio.js提供的丰富的API来创建自定义样式的3D地球
* **现代化** -- 基于Gio.js构建高交互、自适应的现代化3D前端应用

<!-- [END motivation] -->

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
<script src="https://raw.githack.com/syt123450/giojs/master/build/gio.min.js"></script>
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

    // 添加数据，了解更多有关Gio.js数据格式，查看文档：http://giojs.org/html/docs/dataIntro_zh.html
    controller.addData( data );

    // 初始化并渲染地球
    controller.init();

</script>
```
如果一切顺利，在浏览器中打开您的HTML页面你将会看到以下3D地球： [用力点我](http://giojs.org/examples/00_hello_world(simplest).html). 如果有兴趣了解更多Gio.js有趣的用法，我们强烈推荐Gio.js的<a href="http://giojs.org/html/docs/index.html">文档</a>

点击后面这个Codepen logo来在Codepen中试一下这个例子吧 ~ &nbsp;&nbsp;<a target="_blank" href="https://codepen.io/syt123450/pen/VXNdgM"><img width=50 height=50 src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/codepen.png"></a>

<!-- [END getstarted] -->

## <div id="examples">例子</div>

Gio.js有很多代表性的例子，这些例子可以作为小帮手，辅助你成为一个Gio.js的专家！大致可以将这些小帮手分成三类：

- **小帮手1号**: Gio.js Playground

Gio.js有一个Playground插件（<a href="http://giojs.org/html/playground.html">Playground链接</a>），在这个Playground中，你可以试试Gio.js的部分功能并且导出配置参数。

- **小帮手2号**: Github仓库"examples"文件夹下的例子

Gio.js的仓库中有很多API例子，这些例子都被归集在"examples"文件夹下。Clone Gio.js仓库，然后在本地环境中看看它们把~

- **小帮手3号**: Codepen在线可编辑的例子

Gio.js有很多codepen的例子，你可以在codepen中编辑修改它们。点击后面这个Codepen logo，可以直接进入Gio.js Codepen的编辑界面。<a target="_blank" href="https://codepen.io/collection/DkBobG/"><img width=50 height=50 src="https://rawgit.com/syt123450/Gio.js/master/assets/readme/codepen.png"></a>

## <div id="documentation">文档</div>

- 如果想要快速了解如何使用Giojs的话， [开始使用](https://github.com/syt123450/giojs/blob/master/docs/zh/Getting_Started_zh.md) 是一个好的开始
- 如果想要了解Giojs的基本组件， [基础组件](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md) 会帮助你缕清Gio.js中的基本概念
- 如果你有丰富的第三方组件的使用经验， [Giojs API 文档](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md)
- 如果想要加入我们Giojs的开发，不妨先了解一下 [开发者文档](https://github.com/syt123450/giojs/blob/master/docs/zh/Developer_Guide_zh.md) 可以帮助你快速上手开发
- 在我们的Gio.js中文版官网中，有对Gio.js最为详细的介绍 [官网](http://giojs.org/index_zh.html)

[screenshot-url]: http://via.placeholder.com/400x300
[npm-badge]: https://img.shields.io/badge/npm-v0.0.5-orange.svg
[npm-badge-url]: https://www.npmjs.com/package/giojs
[license-badge]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-badge-url]: https://github.com/syt123450/Gio.js/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg
[dependencies-badge-url]: https://github.com/mrdoob/three.js/

## <div id="contributors">开发人员</div>

感谢所有Gio.js的开发人员 ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/7977100?v=4" width="100px;"/><br /><sub><b>syt123450</b></sub>](https://github.com/syt123450)<br />[💻](https://github.com/syt123450/giojs/commits?author=syt123450 "Code") [📖](https://github.com/syt123450/giojs/commits?author=syt123450 "Documentation") [💡](#example-syt123450 "Examples") [⚠️](https://github.com/syt123450/giojs/commits?author=syt123450 "Tests") | [<img src="https://avatars3.githubusercontent.com/u/25629006?v=4" width="100px;"/><br /><sub><b>Botime</b></sub>](https://github.com/BoTime)<br />[💻](https://github.com/syt123450/giojs/commits?author=BoTime "Code") [📖](https://github.com/syt123450/giojs/commits?author=BoTime "Documentation") [⚠️](https://github.com/syt123450/giojs/commits?author=BoTime "Tests") [🚇](#infra-BoTime "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/5203735?v=4" width="100px;"/><br /><sub><b>Mutian Wang</b></sub>](https://github.com/manymeeting)<br />[💻](https://github.com/syt123450/giojs/commits?author=manymeeting "Code") [📦](#platform-manymeeting "Packaging/porting to new platform") [🎨](#design-manymeeting "Design") [👀](#review-manymeeting "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/4524339?v=4" width="100px;"/><br /><sub><b>Chenhua Zhu</b></sub>](https://github.com/zchholmes)<br />[💻](https://github.com/syt123450/giojs/commits?author=zchholmes "Code") [🚇](#infra-zchholmes "Infrastructure (Hosting, Build-Tools, etc)") [🤔](#ideas-zchholmes "Ideas, Planning, & Feedback") [👀](#review-zchholmes "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/19629037?v=4" width="100px;"/><br /><sub><b>Qi(Nora)</b></sub>](https://github.com/lq3297401)<br />[💻](https://github.com/syt123450/giojs/commits?author=lq3297401 "Code") [🎨](#design-lq3297401 "Design") [📖](https://github.com/syt123450/giojs/commits?author=lq3297401 "Documentation") [✅](#tutorial-lq3297401 "Tutorials") | [<img src="https://avatars2.githubusercontent.com/u/9123588?v=4" width="100px;"/><br /><sub><b>bouyuc</b></sub>](http://www.bouyuc.com)<br />[📖](https://github.com/syt123450/giojs/commits?author=bouyuc "Documentation") [✅](#tutorial-bouyuc "Tutorials") | [<img src="https://avatars0.githubusercontent.com/u/24384948?v=4" width="100px;"/><br /><sub><b>Xiaoran Lin</b></sub>](https://www.linkedin.com/in/xiaoran-lin-3529726a/)<br />[💻](https://github.com/syt123450/giojs/commits?author=siriustom "Code") [🎨](#design-siriustom "Design") [💡](#example-siriustom "Examples") [👀](#review-siriustom "Reviewed Pull Requests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/11318667?v=4" width="100px;"/><br /><sub><b>Leon</b></sub>](https://github.com/leonsaber)<br />[💻](https://github.com/syt123450/giojs/commits?author=leonsaber "Code") [🎨](#design-leonsaber "Design") [💡](#example-leonsaber "Examples") |
<!-- ALL-CONTRIBUTORS-LIST:END -->
