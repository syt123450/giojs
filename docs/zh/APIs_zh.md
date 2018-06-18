# Gio.js API 文档

## 配置

Gio.js拥有丰富的API，您可以使用这些API来构建和定制3D数据可视化模型。了解如何配置参数会对之后的开发有很大的帮助。 Gio.js有两种基本的配置参数方式：通过构造函数配置和通过API配置。点击以下文档链接了解详细信息：

* <a href="#through_constructor">通过构造函数配置</a>
* <a href="#configure_API">通过API配置</a>
* <a href="#parameter_list">配置参数表</a>

---

### <div id="through_constructor">通过构造函数配置</div>

当创建Gio controller对象时，可以将配置参数传递给controller，具体传递方式如下所示：

```javascript
    var configs = {
        color: {
            surface: 0xFF0000
        }
    };
    var globe = new Gio.controller(container, configs);
```

---

### <div id="configure_API">通过API配置</div>

或者可以在controller创建之后，使用configure API来配置controller，具体使用方式如下所示：

```javascript
    controller.configure(configs)
```

configure API接受的参数和<a href="#through_constructor">通过构造函数配置</a>一样，可以查看 <a href="#parameter_list">配置参数表</a> 了解各个配置参数的详细解释。

---
### <div id="parameter_list">配置参数表</div>

```javascript
    var configs = {

        control: {

            stats: false,
            disableUnmentioned: false,
            lightenMentioned: false,
            inOnly: false,
            outOnly: false,
            initCountry: "CN",
            halo: true

        },

        color: {

            surface: 0xFFFFFF,
            selected: null,
            in: 0x154492,
            out: 0xDD380C,
            halo: 0xFFFFFF,
            background: null

        },

        brightness: {

            ocean: 0.5,
            mentioned: 0.5,
            related: 0.5

        },

        resource: {

            loading: null

        }

    }
```
参数表:

| 参数名 | 默认值/范围 | 描述 |
|  ------------- | ------------- |  ------------- |
| control.stats | false  | True表示开启性能监控 |
| control.disableUnmentioned  | false  | True表示设置"未提到的国家"不可点击 |
| control.lightenMentioned | false | True表示设置地球表面"提到的国家"比"未提到的国家"更亮 |
| control.inOnly | false | True表示只显示"输入线条"|
| control.outOnly | false | True表示只显示"输出线条"|
| control.initCountry | "CN" | 初始"被选中国家"|
| control.halo | true  | True表示显示光晕 |
| color.surface | 0xFFFFFF or "#FFFFFF" |大陆以及海洋颜色 |
| color.selected | null | 被选中国家颜色 |
| color.in| 0x154492 or "#154492" | "输入线条"颜色 |
| color.out | 0xDD380C or "#DD380C"|"输出线条"颜色 |
| color.halo | 0xFFFFFF or "#FFFFFF" | 光晕颜色 |
| color.background | null | 背景颜色 |
| brightness.ocean | <p>0.5</p> <p>[0.0, 1.0]| 海洋亮度</p> |
| brightness.mentioned | <p>0.5</p> <p>[0.0, 1.0]| 被提到国家亮度</p> |
| brightness.related | <p>0.5</p> <p>[0.0, 1.0]| 有关国家亮度</p> |
| resource.loading | null | loading图片相对路径 |

---

## 功能设计型API

功能设计型API是一组可以控制Gio元素（呈现或隐藏）的API。除文档外，我们还提供在线演示来帮助您更好地理解这些API。 点击以下链接来查看各个API详细的解释。

* <a href="#setInitCountry">设置初始国家</a>
* <a href="#lightenMentioned">高亮被提及国家</a>
* <a href="#disableUnmentioned">禁用未提及国家</a>
* <a href="#showOnly">显示(隐藏)输入线(输出线)</a>
* <a href="#controlHalo">添加/删除光晕</a>
* <a href="#controlStats">启动/禁用性能监控</a>

---

### <a id="setInitCountry">设置初始国家</a>

设置初始 [被选中国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) 。当Gio地球完成初始化之后，地球会有一个转动动画，将初始国家转至屏幕正前方。 默认设置下初始国家是"CN"（中国）。

<p>
  <a target="_blank" href="http://www.giojs.org/examples/03_API_setInitCountry.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  
默认初始国家：
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/setInitCountry_default_zh.jpg"/></a>
</p>

```javascript
    // 将初始国家改成"美国"
    controller.setInitCountry("US");
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/setInitCountry.jpg"/></a>
</p>

---

### <div id="lightenMentioned">高亮被提及国家</div>

使Gio地球表面上 [提及国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) 比 [未提及的国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) 更亮。 在默认情况下，提及国家和未提及国家的亮度是一样的。

<p>
  <a href="http://giojs.org/examples/11_API_lightenMentioned.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

```javascript
    controller.lightenMentioned(true);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/lightenMentioned_true.jpg"/></a>
</p>

```javascript
    controller.lightenMentioned(false);
 ```   
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/lightenMentioned_true.jpg"/></a>
</p>

---

### <div id="disableUnmentioned">禁用未提及国家</div>

禁止点击 [未提及的国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) ，这个操作会使在数据集中未提到过的国家在3D地球上不可选。默认设置下此功能不开启。

<p>
  <a href="http://giojs.org/examples/12_API_disableUnmentioned.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

```javascript
    controller.disableUnmentioned(true);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/disableUnmentioned_zh.jpg"/></a>
</p>

```javascript
    controller.disableUnmentioned(false)
```

---

###  <div id="showOnly">显示(隐藏)输入线(输出线)</div>

对于 [被选中的国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) ，只显示 [输入线](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#line) 或者 [输出线](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#line)。

```javascript
    controller.showInOnly(true);
```
<p>
  <a href="http://giojs.org/examples/13_API_showInOnly.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showInOnly_true_zh.jpg"/></a>
</p>

```javascript
    controller.showInOnly(false);
```
<p>
  <a href="http://giojs.org/examples/14_API_showOutOnly.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showInOnly_false_zh.jpg"/></a>
</p>

```javascript
    controller.showOutOnly(true);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showOutOnly_true_zh.jpg"/></a>
</p>

```javascript
    controller.showOutOnly(false);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showOutOnly_false_zh.jpg"/></a>
</p>

---

### <div id="controlHalo">添加/删除光晕</div>

添加/删除光晕是一组API，可以控制是否在3D地球周围显示 [光晕](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#halo) 。 当使用 addHalo() API添加光晕时，可以指定光晕颜色。默认设置下光晕是启用的。

<p>
  <a href="http://giojs.org/examples/25_API_addHalo(removeHalo).html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

```javascript
    controller.addHalo(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/addHalo_zh.jpg"/></a>
</p>

```javascript
    controller.removeHalo();
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/removeHalo.jpg"/></a>
</p>

---

### <div id="controlStats">启动/禁用性能监控</div>

显示或隐藏左上角的 [性能监控](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#stats) 组件。在使用这个API之前，需要先在HTML页面的 `<header>` 部分引入stats.min.js

<p>
  <a href="http://giojs.org/examples/18_API_enableStats(disableStats).html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

```html
    <header>
        <script src="stats.min.js"></script>
    </header>
```

```javascript
    controller.enableStats();
```    

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/stats_enable.jpg"/></a>
</p>

```javascript
    controller.disableStats();
```    

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/stats_disable.jpg"/></a>
</p>

---

## 颜色风格型APIs

颜色风格类API用于设置Gio地球的风格（颜色和亮度）。您可以自定义几乎所有Gio地球的参数，例如 [表面](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#surface)， [国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country)， [连接线](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#line)， [光晕](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#halo)， [背景](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#background)， [海洋](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#ocean) 等等。 我们同时在文档中提供在线演示和codepen在线编辑器用于帮助您理解和测试每一个API。 您可以点击以下链接来了解每一个API的定义和使用详情。

* <a href="#setStyle">设置风格</a>
* <a href="#setSurfaceColor">设置表面颜色</a>
* <a href="#setSelectedColor">设置选中国家颜色</a>
* <a href="#setExportColor">设置输出颜色</a>
* <a href="#setImportColor">设置输入颜色</a>
* <a href="#setHaloColor">设置光晕颜色</a>
* <a href="#setBackgroundColor">设置背景颜色</a>
* <a href="#adjustOceanBrightness">设置海洋亮度</a>
* <a href="#adjustRelatedBrightness">设置相关国家亮度</a>
* <a href="#adjustMentionedBrightness">设置被提到国家亮度</a>

---

### <div id="setStyle">设置风格</div>

通过设置风格名称来更改3D地球的颜色风格。Gio.js提供一些预设的色彩风格，查看 [预置样式](https://github.com/syt123450/giojs/blob/master/docs/zh/Predefined_Styles_zh.md) 文档，了解更多样式。

<p>
  <a href="http://giojs.org/examples/10_API_setStyle.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  
例如：将默认风格更改为“magic”风格：
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setStyle1_zh.jpg"/></a>
</p>

```javascript
    controller.setStyle("magic");
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setStyle2_zh.jpg"/></a>
</p>

---

### <div id="setSurfaceColor">设置表面颜色</div>

通过RGB值设置3D地球的 [表面](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#surface) 颜色。默认颜色是 #FFFFFF：

<p>
  <a href="http://giojs.org/examples/01_API_setSurfaceColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  
<p align="center">
  <a><img src="hhttp://giojs.org/assets/images/color/setSurfaceColor1_zh.jpg" />
  </a>
</p>


```javascript
    // 颜色的参数可以是字符串 "#FF0000" 或者是十六进制数值 0xFF0000
    controller.setSurfaceColor("#FF0000");
    //controller.setSurfaceColor(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setSurfaceColor2.jpg"/></a>
</p>

---

### <div id="setSelectedColor">设置选中国家颜色</div>

通过RGB值设置 [选中国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) 颜色。默认的选中国家颜色和表面颜色相同，但亮度稍高。

<p>
  <a href="http://giojs.org/examples/02_API_setSelectedColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  
Default:
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setSelectedColor1_zh.jpg"/></a>
</p>

```javascript
    // 颜色的参数可以是字符串 "#FF0000" 或者是十六进制数值 0xFF0000
	controller.setSelectedColor("#FF0000");
    //controller.setSelectedColor(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setSelectedColor2.jpg"/></a>
</p>

---

### <div id="setExportColor">设置输出颜色</div>

通过RGB值设置输出线的颜色。关于连接线定义，请参考这里: [连接线](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#line)。

<p>
  <a href="http://giojs.org/examples/04_API_setExportColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  
默认的输出线颜色是 0xDD380C：
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setExportColor1_zh.jpg"/></a>
</p>

```javascript
	//  颜色的参数可以是字符串 "#FEF504" 或者是十六进制数值 0xFEF504
	controller.setExportColor("#FEF504");
	//controller.setExportColor(0xFEF504);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setExportColor2.jpg"/></a>
</p>

---

### <div id="setImportColor">设置输入颜色</div>

通过RGB值设置输入线的颜色。关于连接线定义，请参考这里: [连接线](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#line)。

<p>
  <a href="http://giojs.org/examples/05_API_setImportColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

默认的输入线颜色是 0x154492：

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setImportColor1_zh.jpg"/></a>
</p>

```javascript
    // 颜色的参数可以是字符串 "#00FF00" 或者是十六进制数值 0x00FF00
    controller.setImportColor("#00FF00");
	//controller.setImportColor(0x00FF00);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setImportColor2.jpg"/></a>
</p>

---

### <div id="setHaloColor">设置光晕颜色</div>

通过RGB值设置 [光晕](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#halo) 的颜色。

<p>
  <a href="http://giojs.org/examples/24_API_setHaloColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

光晕的默认颜色是 0xFFFFFF:

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setHaloColor1_zh.jpg"/></a>
</p>

```javascript
	// 颜色的参数可以是字符串 "#FF0000" 或者是十六进制数值 0xFF0000
	controller.setHaloColor("#FF0000");
	//controller.setHaloColor(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setHaloColor2.jpg"/></a>
</p>       

---

### <div id="setBackgroundColor">设置背景颜色</div>

通过RGB值设置 [背景](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#background) 的颜色
<p>
  <a href="http://giojs.org/examples/26_API_setBackgroundColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

默认的颜色是 0x000000:

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setBackgroundColor1_zh.jpg"/></a>
</p>      

```javascript
    // 颜色的参数可以是字符串 "#530000" 或者是十六进制数值 0x530000
	controller.setBackgroundColor("#530000");
	//controller.setBackgroundColor(0x530000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setBackgroundColor2.jpg"/></a>
</p>      

---

### <div id="adjustOceanBrightness">设置海洋亮度</div>

可以设置 [海洋](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#ocean) 的亮度。
<p>
  <a href="http://giojs.org/examples/07_API_adjustOceanBrightness.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

亮度的数值范围是 [0, 1] ，默认的亮度数值是0.5：

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustOceanBrightness1_zh.jpg"/></a>
</p>      

```javascript
    controller.adjustOceanBrightness(0.8);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustOceanBrightness2.jpg"/></a>
</p>   

---

### <div id="adjustRelatedBrightness">设置相关国家亮度</div>

可以设置 [相关国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) 的亮度。

<p>
  <a href="http://giojs.org/examples/08_API_adjustRelatedBrightness.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

亮度的数值范围是 [0, 1] ，默认的亮度数值是0.5：

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustRelatedBrightness1_zh.jpg"/></a>
</p>   

```javascript
    controller.adjustRelatedBrightness(0.8);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustRelatedBrightness2.jpg"/></a>
</p>   

---

### <div id="adjustMentionedBrightness">设置被提到国家亮度</div>

可以设置 [被提到国家](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country) 的亮度。

<p>
  <a href="http://giojs.org/examples/09_API_adjustMentionedBrightness.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  
The range of the brightness is [0, 1] and its default value is `0.5`:
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustMentionedBrightness1_zh.jpg"/></a>
</p>   

默认设置中，被提到国家并不会被高亮。要更改被提到国家的亮度，首先需要按如下方法启用该功能[lightenMentioned(true)](#lightenMentioned)：

```javascript
    controller.lightenMentioned(true);
    controller.adjustMentionedBrightness(0.8);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustMentionedBrightness2.jpg" alt="brightness=0.8"/></a>
</p>   

---

## <div id="workWithData">数据处理</div>

Gio.js拥有多种设置数据的方式。最基本的方式是使用 addData API。如果需要异步加载数据，可以使用 addDataAsync API；如果需要周期性加载数据，可以使用 liveLoad API。 为了让数据更具有观赏性，Gio.js会对数据进行预处理。在添加数据时，你可以同时设置数据展示时的颜色。

* <a href="#addData">添加（更新）数据</a>
* <a href="#addDataAsync">异步添加数据</a>
* <a href="#liveLoad">周期性加载</a>
* <a href="#setSingleColor">设置单条线条颜色</a>
* <a href="#dataPreprocessing">数据预处理</a>

---

### <div id="addData">添加数据</div>

将数据加载到Gio的控制器并同步覆盖以前的数据。用于可视化的数据集采用JSON格式。数组中的每一个元素都包含一个输入国家(i)，一个输出国家(e)和一个数值(v)。

参数：

data -- JSON格式数据

```json
[
    {
        "e": "CN",
        "i": "US",
        "v": 3300000
    },
    {
        "e": "CN",
        "i": "RU",
        "v": 10000
    }
]
```

说明：连接线连接两个国家并具有方向性，运动粒子将在该方向上生成动画，连线方向由“e” -> “i”定义。“e”和“i”分别表示两个国家， “e”表示连线输出的国家，“i”表示连线输入的国家。“v”表示这两个国家之间的数值，如果数值较小，则粒子的大小和数量会比较小， 并且在连线上的移动速度相对缓慢；如果数值较大，则粒子的大小和数量会比较大，并且在连线上的移动速度相对较快。

---

### <div id="addDataAsync">异步添加数据</div>

 参数：

 *url* - 返回JSON格式数据，数据格式与[添加（更新）数据](#addData) 定义的data相同

 *asyncLoadCallback* - 当加载完成时执行的回调函数

从一个数据源异步加载数据。

用法：

```javascript
    var url = "sampleData.json";

    // 使用addDataAsync() API异步加载URL中的数据。
    // 回调将在完成数据加载后执行。

    controller.addDataAsync( url, asyncLoadCallback );

    function asyncLoadCallback () {

        controller.init();

    }
```

---

### <div id="liveLoad">周期性加载数据</div>

参数：

 *url* - 返回JSON格式数据，数据格式与[添加（更新）数据](#addData) 定义的data相同

 *liveLoadCallback* - 当加载完成时执行的回调函数

 *duration* - 周期性数据加载时间（以毫秒为单位）

周期性地从一个数据源加载数据，用法：

```javascript
    var url = "dynamicallyAPI/data";

    // 使用liveLoad() API加载URL中的数据。
    // 设置回调。
    // 指定加载时间。

    controller.liveLoad( url, liveLoadCallback, 50000 );

    function liveLoadCallback () {

        console.log("Load data event happens.");

    }
```

---

### <div id="setSingleColor">设置单条线条颜色</div>

正如 [连接线](https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#line) 章节所述，连接线分为两种类型：输入线和输出线。 与这两种类型的连接线相对应的颜色称为输入颜色和输出颜色。通过指定输入数据内容可以为这条数据指定一个唯一的颜色，如下所示：

```json
[
  {
    "e": "CN",
    "i": "US",
    "v": 100000,
    "inColor": "#0000FF",
    "outColor": "#00FF00"
  },
  {
    "e": "CN",
    "i": "RU",
    "v": 3000000,
    "inColor": "#EE0E00",
    "outColor": "#FFFF00"
  }
]
```

备注：e，i，v与 [添加数据](#addData) 中的定义相同。

---

### <div id="dataPreprocessing">数据预处理</div>

在输入的JSON数据中，v的值越高，粒子越亮，并且它们从出发国家到目的国家的运行越快。 （请查阅Michael Chang的 [文章](http://mflux.tumblr.com/post/28367579774/armstradeviz) 来了解他是如何提出这个想法的）。Gio.js库会自动缩放输入数据的范围以便于更好的数据可视化。作为开发人员，您还可以定义自己的预处理数据的方式。

---

## 回调函数

目前Gio只有一个回调函数。不过我们正在努力开发更多的回调函数，希望可以使用这些回调函数来开发更具有交互性的应用。

* <a href="onCountryPicked">当国家被选中时</a>

---

### <div id="onCountryPicked">当国家被选中时</div>

当<a href="https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country">被选中的国家</a>改变时被触发。

会向回调函数传递两个参数：被选中的国家和相关国家列表。被选中的国家指的是一个<a href="#countryObject">CountryObject</a>对象，这个对象表示新的<a href="https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country">被选中的国家</a>；相关国家列表是<a href="#countryObject">CountryObject</a>对象的列表，这个列表中储存了所有与新的被选中国家<a href="https://github.com/syt123450/giojs/blob/master/docs/zh/Basic_Elements_zh.md#country">相关的国家</a>。

使用方法：

        // 使用onCountryPicked() API来设置回调函数
        controller.onCountryPicked( callback );

        // 定义一个回调函数，这个函数作为一个例子，简单地在console里输出selectedCountry和relatedCountries这两个参数
        function callback ( selectedCountry, relatedCountries ) {

        	console.log(selectedCountry);
        	console.log(relatedCountries);

        }

#### <div id="countryObject">CountryObject</div>

CountryObject对象是一个JSON对象，具体定义如下所示（属性的值会随着不同的对象而改变）：

    {
        ISOCode: "AU"
        center: THREE.vector
        lat: -27
        lon: 133
        name: "AUSTRALIA"
    }

参数表：

| 参数 | 描述 |
|  ------------- |  ------------- |
|ISOCode|国家的ISO代码|
|center|国家的中心，用THREE.vector对象来表示|
|lat|国家的纬度|
|lon|国家的经度|
|name|国家的名称|

---

## 高级功能

使用Gio高级功能，可以更容易地开发更具有交互性的应用。

* <a href="#methodChain">方法链</a>
* <a href="#switchCountry">切换选中国家</a>

---

### <div id="methodChain">方法链</div>

方法链是Javascript中常用的编程模式，Giojs也支持使用方法链对参数进行配置。使用方法链，参数的设置会更加清晰可读。 以下的例子展示了如何使用Giojs方法链。（你也可以点击在线演示，然后查看例子的源码来详细了解方法链是如何应用在实际场景中的）

不使用方法链的API调用:
```javascript
controller.setSurfaceColor( "#00FF00" );
controller.setSelectedColor( "#FF0000" );
controller.disableUnmentioned( true );
```
使用方法链的API调用:
```javascript
controller.setSurfaceColor( "#00FF00" )
        .setSelectedColor( "#FF0000" )
        .disableUnmentioned( true );
```

---

### <div id="switchCountry">切换选中国家</div>

除了通过用户点击地球表面的国家来进行切换以外，Giojs还支持使用 switchCountry() API来直接切换 被选中的国家 ，开发者可以使用这个API来开发具有交互性的应用。 （您也可以点击在线演示，查看应用该API的示例）

参数：countryCode - 在 [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1) 标准中的国家代码

Instead of mouse click, `swtichCountry()` API can be used to change currently selected country. This gives developer more flexibility.

<p>
  <a href="http://giojs.org/examples/20_API_switchCountry.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton_zh.png" height="30" width="100" />
  </a>
</p>  

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/advanced/switchCountry1_zh.jpg" alt="brightness=0.8"/></a>
</p>   

```javascript
    // 切换选中国家到 "US"
    controller.switchCountry("US");
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/advanced/switchCountry2.jpg" alt="brightness=0.8"/></a>
</p>   
