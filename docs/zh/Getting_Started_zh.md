# 开始使用Gio.js

**Gio.js** 是一个用来做3D地球数据可视化的开源组件库，这个库是受到Google 2012 Info大会上的项目[武器贩卖可视化](https://github.com/dataarts/armsglobe)启发，原开发者是Michael Chang。Gio.js的不同之处在于开发者可以以一种以声明的方式来使用，简洁地创建3D地球可视化模型，通过丰富的Gio.js API方便地定制模型并整合到自己的Web应用中。

<!-- [START screenshot] -->
<p>
  <a href="https://github.com/syt123450/Gio.js/blob/master/assets/readme/Gio.png"><img src="https://github.com/syt123450/Gio.js/blob/master/assets/readme/Gio.gif"/></a>
</p>
<!-- [END screenshot] -->

<!-- [START getstarted] -->
## 开始使用

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

1. 创建一个 \<div\> 标签，您的Gio地球将会被渲染在这个标签中。

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

<!-- [END getstarted] -->

<!-- [START documentation] -->

## 文档

- 如果想要了解Giojs的基本组件，看看 [基础组件](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md) 哈~
- 如果你有丰富的第三方组件的使用经验，不妨直接研究一下 [Giojs API 文档](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md) 啦~
- 如果想要加入我们Giojs的开发，来看看 [开发者文档](https://github.com/syt123450/giojs/blob/master/docs/zh/Developer_Guide_zh.md) 吧~
- 当然如果看不惯Markdown格式的文档，我们也准备了中文版的网站 [官网](http://giojs.org/index_zh.html)
<!-- [END documentation] -->


[screenshot-url]: http://via.placeholder.com/400x300