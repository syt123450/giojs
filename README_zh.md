
<p align="center"><a href="https://giojs.org" target="_blank"><img width="700" src="https://raw.githack.com/syt123450/giojs/master/assets/readme/logo2.jpg" alt="Gio logo"></a></p>

<h1 align="center">Gio.js</h1>

<p align="center">
<a href="https://github.com/syt123450/giojs/blob/master/README.md"><strong>English</strong></a> | <strong>中文</strong>
</p>

<p align="center">React版本: <a href="https://github.com/syt123450/react-giojs">react-giojs</a></p>
<p align="center">微信小游戏: <a href="https://github.com/syt123450/giojs-wechat-minigame-demo">使用方法介绍</a></p>

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
  <img src="https://raw.githack.com/syt123450/giojs/master/assets/readme/Gio.gif"/>
</p>
<!-- [END screenshot] -->

## 目录

* [为什么要使用Gio.js](#motivation)
* [开始使用](#getting-started)
* [Gio.js 2.0 介绍](#intro2)
* [例子](#examples)
* [API列表](#apiList)
* [文档](#documentation)
* [开发人员](#contributors)
* [许可证](#license)
* [码云链接](#gitee)

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

在HTML页面中添加了Threejs和Giojs依赖之后，您就可以基于Giojs开发您的应用了。我们将展示如何创建一个具有基础样式的Gio地球。（在微信小游戏中Gio.js的使用略有不同，查看这个[栗子](https://github.com/syt123450/giojs-wechat-minigame-demo)，了解如何在微信小游戏中使用Gio.js）

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

点击后面这个Codepen logo来在Codepen中试一下这个例子吧 ~ &nbsp;&nbsp;<a target="_blank" href="https://codepen.io/syt123450/pen/VXNdgM"><img width=50 height=50 src="https://raw.githack.com/syt123450/giojs/master/assets/readme/codepen.png"></a>

<!-- [END getstarted] -->

## <div id="intro2">Gio.js 2.0 介绍</div>

在Gio.js 1.0发布之后，开发者们提出了很多很酷的、很有建设性的建议，比如微信应用开发者希望Gio.js支持微信小程序，有经验的Three.js开发者希望Gio.js提供Three.js编程接口等。在经过仔细研究、综合设计之后，Gio.js 2.0实现了大部分功能，并且添加了有关文档说明。以下列出了主要的2.0新增特性：

* 提供微信小程序支持 [<a href="https://github.com/syt123450/giojs-wechat-minigame-demo">demo</a>]

* 支持同时加载多数据集（data group）并提供数据集切换 [<a href="http://giojs.org/html/docs/dataAdd_zh.html#group">介绍</a>]

* 提供Three.js编程接口 [<a href="http://giojs.org/html/docs/interfaceThree_zh.html">介绍</a>]

* 提供Stats.js编程接口 [<a href="http://giojs.org/html/docs/interfaceStats_zh.html">介绍</a>]

* 支持输出数据到大洲 [<a href="http://giojs.org/html/docs/dataContinent_zh.html">介绍</a>]

* 提供输入数据检测 [<a href="https://github.com/syt123450/giojs/issues/86">issue</a>]

* 新增数据清除 [<a href="http://giojs.org/html/docs/dataClear_zh.html">介绍</a>]

* 新增关闭实时加载 [<a href="http://giojs.org/html/docs/dataLiveLoad_zh.html">介绍</a>]

## <div id="examples">例子</div>

Gio.js有很多代表性的例子，这些例子可以作为小帮手，辅助你成为一个Gio.js的专家！大致可以将这些小帮手分成三类：

- **小帮手1号**: Gio.js Playground

Gio.js有一个Playground插件（<a href="http://giojs.org/html/playground.html">Playground链接</a>），在这个Playground中，你可以试试Gio.js的部分功能并且导出配置参数。

- **小帮手2号**: Github仓库"examples"文件夹下的例子

Gio.js的仓库中有很多API例子，这些例子都被归集在"examples"文件夹下。Clone Gio.js仓库，然后在本地环境中看看它们把~

- **小帮手3号**: Codepen在线可编辑的例子

Gio.js有很多codepen的例子，你可以在codepen中编辑修改它们。点击后面这个Codepen logo，可以直接进入Gio.js Codepen的编辑界面。<a target="_blank" href="https://codepen.io/collection/DkBobG/"><img width=50 height=50 src="https://raw.githack.com/syt123450/giojs/master/assets/readme/codepen.png"></a>

## <div id="apiList">API列表</div>

**[➡ `configure`(json)](http://giojs.org/html/docs/configureAPI_zh.html)** 

配置controller。

**[➡ `setInitCountry(ISOCode, default: 'CN')`](http://giojs.org/html/docs/designInitCountry_zh.html)**

设置初始"被选中国家"。

**[➡ `lightenMentioned(boolean, default: 'false')`](http://giojs.org/html/docs/designLightenMen_zh.html)**

使Gio地球表面上"提及国家"比"未提及的国家"更亮。

**[➡ `disableUnmentioned(boolean, default: 'false')`](http://giojs.org/html/docs/designDisableUnmen_zh.html)**

禁止点击"未提及的国家"。

**[➡ `showInOnly(boolean, default: 'false')`](http://giojs.org/html/docs/designShowOnly_zh.html)**

对于"被选中的国家"，只显示"输入线"。

**[➡ `showOutOnly(boolean, default: 'false')`](http://giojs.org/html/docs/designShowOnly_zh.html)**

对于"被选中的国家"，只显示"输出线"。

**[➡ `addHalo(string)`](http://giojs.org/html/docs/designHalo_zh.html)**

添加地球光晕，可以指定光晕颜色。

**[➡ `removeHalo()`](http://giojs.org/html/docs/designHalo_zh.html)**

删除地球光晕。

**[➡ `enableStats()`](http://giojs.org/html/docs/designStats_zh.html)**

显示左上角的"性能监控"组件。

**[➡ `disableStats()`](http://giojs.org/html/docs/designStats_zh.html)**

隐藏左上角的"性能监控"组件。

**[➡ `setStyle(string)`](http://giojs.org/html/docs/colorStyle_zh.html)**

通过设置风格名称来更改3D地球的颜色风格。

**[➡ `setSurfaceColor(string, default: '#ffffff')`](http://giojs.org/html/docs/colorSurface_zh.html)**

通过RGB值设置3D地球的表面颜色。

**[➡ `setSelectedColor(string, default: '#ffffff')`](http://giojs.org/html/docs/colorSelected_zh.html)**

通过RGB值设置"在选中状态"下的国家颜色。

**[➡ `setExportColor(string, default: '#DD380C')`](http://giojs.org/html/docs/colorExport_zh.html)**

通过RGB值设置输出线的颜色。

**[➡ `setImportColor(string, default: '#154492')`](http://giojs.org/html/docs/colorImport_zh.html)**

通过RGB值设置输入线的颜色。

**[➡ `setHaloColor(string, default: '#ffffff')`](http://giojs.org/html/docs/colorHalo_zh.html)**

通过RGB值设置光晕的颜色。

**[➡ `setBackgroundColor(string, default: '#000000')`](http://giojs.org/html/docs/colorBackground_zh.html)**

通过RGB值设置背景的颜色。

**[➡ `adjustOceanBrightness(float, default: 0.5)`](http://giojs.org/html/docs/colorOceanBr_zh.html)**

设置海洋的亮度。

**[➡ `adjustRelatedBrightness(float, default: 0.5)`](http://giojs.org/html/docs/colorRelatedBr_zh.html)**

设置相关国家的亮度。

**[➡ `adjustMentionedBrightness(float, default: 0.5)`](http://giojs.org/html/docs/colorMenBr_zh.html)**

设置提到国家的亮度。

**[➡ `addData(json)`](http://giojs.org/html/docs/dataAdd_zh.html)**

将数据加载到Gio的控制器并同步覆盖以前的数据。

**[➡ `clearData()`](http://giojs.org/html/docs/dataClear_zh.html)**

清除地球上添加的数据，同时有将数据线和数据点清除的效果。

**[➡ `switchDataSet()`](http://giojs.org/html/docs/dataSwitchSet_zh.html)**

切换地球表面呈现的数据集。

**[➡ `addDataAsync(url, callback)`](http://giojs.org/html/docs/dataAddAsync_zh.html)**

从一个数据源异步加载数据。

**[➡ `liveLoad(url, callback, duration)`](http://giojs.org/html/docs/dataLiveLoad_zh.html)**

周期性地从一个数据源加载数据。

**[➡ `closeLiveLoader()`](http://giojs.org/html/docs/dataLiveLoad_zh.html)**

关闭周期性加载功能。

**[➡ `getScene()`](http://giojs.org/html/docs/interfaceThree_zh.html)**

获得three.js中scene对象的引用。

**[➡ `getStatsObject()`](http://giojs.org/html/docs/interfaceStats_zh.html)**

获得Stats面板对象的引用。

**[➡ `onCountryPicked(callback)`](http://giojs.org/html/docs/callbackPicked_zh.html)**

当"被选中的国家"改变时被调用。

**[➡ `switchCountry(IsoCode)`](http://giojs.org/html/docs/advancedSwitch_zh.html)**

切换"被选中的国家"。 

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
| [<img src="https://avatars1.githubusercontent.com/u/11318667?v=4" width="100px;"/><br /><sub><b>Leon</b></sub>](https://github.com/leonsaber)<br />[💻](https://github.com/syt123450/giojs/commits?author=leonsaber "Code") [🎨](#design-leonsaber "Design") [💡](#example-leonsaber "Examples") | [<img src="https://avatars0.githubusercontent.com/u/11615615?v=4" width="100px;"/><br /><sub><b>Alexis</b></sub>](https://github.com/AlexisAnzieu)<br />[💻](https://github.com/syt123450/giojs/commits?author=AlexisAnzieu "Code") [🐛](https://github.com/syt123450/giojs/issues?q=author%3AAlexisAnzieu "Bug reports") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## <div id="license">许可证</div>

[Apache-2.0](https://github.com/syt123450/giojs/blob/master/LICENSE)

## <div id="gitee">码云链接</div>

Gio.js项目同时部署在码云上，并且与github同步，对国内有更快的访问和下载速度，欢迎通过以下链接访问 [➡ 用力戳我](https://gitee.com/syt123450/giojs)