# 基础元素

为了更好地创建Gio地球，让我们先来看看Gio地球中有什么。以下图片中标注了Gio地球中的重要元素，在本章中我们会对这些元素进行具体介绍。

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/all.jpg"/></a>
</p>


- <a href="#surface">表面</a>

   整个3D地球的表面。

- <a href="#country">国家</a>

   地球表面上的特定区域，表示具体的某个国家。

- <a href="#line">连接线</a>

   连接两个国家之间的曲线，同时以流动的闪光点来体现数据数值的大小。

- <a href="#background">背景</a>

   3D场景的背景。

- <a href="#halo">光晕</a>

   在地球周围的光圈。

- <a href="#ocean">海洋</a>

   地球表面上的特定区域，表示海洋区域。

- <a href="#stats">性能监控</a>

   左上角的小窗口，用于监控应用性能。

---

## <div id="surface">表面</div>

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/surface_zh.jpg"/></a>
</p>

表面包括了 [国家](#country) 和 [海洋](#ocean) 。默认的表面颜色是 0xffffff。
可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API来设置表面颜色，具体设置方式如下所示：

```
controller.configure({
	color: {
        surface: 0xff0000
    }
});
```

也可以通过 [setSurfaceColor()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#setSurfaceColor) API来动态修改表面颜色。


---

## <div id="country">国家</div>

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/country_zh.jpg"/></a>
</p>

每个国家都有一个特定的 [ISO 3166代码](https://github.com/syt123450/Gio.js/blob/master/src/countryInfo/CountryData.js)。
根据输入数据和用户的交互行为，在Gio地球表面的国家可以有以下几种状态：


- `被选中的国家`

    当用户点击Gio地球表面某个国家的区域时，这个国家会以“被选中”的状态点亮。此时这个国家被称为"被选中的国家"。
    
    可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API来设置被选中国家的颜色，具体设置方法如下所示：
    
	```javascript
	controller.configure({
		color: {
	        selected: 0xff0000
	    }
	});
	```
	也可以通过 [setSelectedColor()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#setSelectedColor) 来动态改变被选中国家的颜色。
	

- `有关的国家`

    当一个国家被选中时，Gio地球会显示该国家的数据，这些数据会以"连接线"的形式呈现，被连接线连接的国家被称为"有关的国家"（不包括"选中的国家"）。
    
    可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API来设置"有关的国家"的亮度，默认的亮度是0.5，具体设置方法如下所示：
    
	```javascript
	controller.configure({
		brightness: {
	        related: 0.8
	    }
	});
	```
	或者可以通过 [adjustRelatedBrightness()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#adjustRelatedBrightness) 来动态改变有关的国家的亮度。
	

- `被提到的国家`
    
    除了"被选中的国家"和"有关的国家"之外，其余所有在数据集中提到的国家被定义为"提到过的国家"。
    
    可以通过 [lightenMentioned(true)](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#lightenMentioned) 设置"被提到的国家"的亮度，使其比地球表面的亮度略高， 可以使用 [lightenMentioned(false)](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#lightenMentioned) 来关闭该功能，默认设置下该功能不开启。
    
    可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API来设置"被提到国家"的亮度，默认的亮度是0.5，具体设置方法如下所示：
    
	```javascript
	controller.configure({
		brightness: {
	        mentioned: 0.8
	    }
	});
	```
	也可以通过 [adjustMentionedBrightness()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#adjustMentionedBrightness) 来动态设置"被提到国家"的亮度。 需要注意的是只有使用 [lightenMentioned(true)](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#lightenMentioned) 后才可以设置"被提到国家"的亮度。
	

- `未被提到的国家`

    那些在[CountryData](https://github.com/syt123450/Gio.js/blob/master/src/countryInfo/CountryData.js)中存在，但在输入数据中未被提到的国家被称为"未被提到的国家"。
    
- `不可点击的国家`

    可以设置一个国家成为"不可点击的"状态，当用户点击"不可点击的国家"时，这个国家不会被点亮，同时也不会造成地球旋转。 （在默认情况下，当一个国家被点击时，Gio地球会旋转，使该国家朝向正前方）
    
    可以通过 [disableUnmentioned(true)](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#disableUnmentioned) API来将未在数据集中提到的数据设置为"不可点击的"， 也可以通过调用 [disableUnmentioned(false)](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#disableUnmentioned) API来关闭该设置。
    

---

## <div id="line">连接线</div>

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/line_zh.jpg"/></a>
</p>

连接线是Gio地球数据可视化的重要部分，两个国家之间的数据会通过数据线以流动的方式按照一定的方向移动。对于 [被选中的国家](#country) ，表示流入数据的线条称为"输入线"，表示流出数据的线条称为"输出线"。 "输入线"的默认颜色是![in-line](https://placehold.it/15/154492/000000?text=+) `0x154492`，"输出线"的默认颜色是![out-line](https://placehold.it/15/dd380c/000000?text=+) `0xdd380c`。

可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API来设置连接线的颜色，具体设置方法如下所示：

	```javascript
	controller.configure({
		color: {
		    in: 0xff0000,
		    out: 0x00ff00
		}
	});
	```
也可以通过 [setImportColor()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#setImportColor) API和 [setExportColor()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#setExportColor) API来动态改变"输入线"和"输出线"的颜色。

那可不可以设置特定某条连接线的颜色呢？当然是可以的。可以直接修改输入json数据来设置，具体设置方法如下所示：


```
{
	"e": "CN",
	"i": "US",
	"v": 100000,
	"inColor": "#0000ff",
	"outColor": "#00ff00"
}
```
动态设置连接线的颜色需要在调用controller.init()之后才会生效。想要了解更多相关数据设置的细节， 可以查看API文档的 [working with data](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#workWithData) 部分。
    

---

## <div id="background">背景</div>

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/background_zh.jpg"/></a>
</p>

背景是在3D场景中"地球背后"的区域。背景默认的颜色是![background](https://placehold.it/15/000000/000000?text=+) `0x000000`。

背景的颜色可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API进行设置，如下所示：

```javascript
controller.configure({
	color: {
	    background: 0x0000ff
	}
});
```
也可以通过 [setBackgroundColor()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#setBackgroundColor) API来动态改变背景颜色。

---

## <div id="halo">光晕</div>

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/halo_zh.jpg"/></a>
</p>

光晕是在地球周围的光圈。光晕的默认颜色是![halo](https://placehold.it/15/ffffff/000000?text=+) `0xffffff`.

可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API来设置光晕的颜色，具体设置方法如下所示：

```javascript
controller.configure({
	color: {
	    halo: 0xff0000
	}
});
```
也可以通过 [setHaloColor()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#setHaloColor) API来动态修改光晕颜色。

---

## <div id="ocean">海洋</div>

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/ocean_zh.jpg"/></a>
</p>

海洋是3D地球表面表示海洋的特定区域，在Gio地球表面，海洋是最暗的区域。海洋的默认亮度是0.5。

可以通过 [configure()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#configure_API) API来设置海洋的亮度，具体设置方式如下所示：

```javascript
controller.configure({
	brightness: {
	    ocean: 0.8
	}
});
```

也可以通过 [adjustOceanBrightness](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#adjustOceanBrightness) API来动态改变海洋亮度。

---

## <div id="stats">性能监控</div>

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/elements/stats_zh.jpg"/></a>
</p>

"性能监控"整合了Threejs的监控组件stats，如果你对这个组件感兴趣，你可以从它的 [github](https://github.com/mrdoob/stats.js/) 仓库中了解更多细节。如果你想要在gio场景中显示这个组件，你可以使用 [enableStats()](https://github.com/syt123450/giojs/blob/master/docs/zh/APIs_zh.md#controlStats) API，这个性能监控面板默认会显示在左上角。
