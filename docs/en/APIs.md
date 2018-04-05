
---

## Configuration

Using Gio.js, you can easily create a customized 3D globe for data visualization. Before you start to create your own globe, it is important to know the full parameter list how to configure the globe. Basically, there are two ways to set the customized configurations, you can click the link below to see the detailed information:

* [Through controller constructor](#through-constructor)
* [Through configure() API](#configure-api)
* [Full parameter list](#full-parameter-list)

---

### Through Constructor

When creating a controller for the 3D globe, you can pass the configurations of the globe to the controller as a constructor parameter as follows:
```javascript
    var configs = {
        color: {
            surface: 0xFF0000
        }
    };
    var globe = new Gio.controller(container, configs);
```
---
### Configure API

You can use configure API to configure the controller, the basic usage of the configure API is as shown below:

    controller.configure(configs)
    
the parameter of the configure API is the same as the parameter of the constructor function, see more information about the parameter in [constructor paramater](#constructor-configure).

---
### Full Parameter List
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
Table of parameters:

| Parameter | Default Value/ Range | Description |
|  ------------- | ------------- |  ------------- | 
| control.stats | false  | True means to turn on the performance monitor for Three.js. | 
| control.disableUnmentioned  | false  | True means tp set unmentioned country unclickable. |
| control.lightenMentioned | false | True means to set mentioned country brighter than unmentioned country. |
| control.inOnly | false | True means to only display data going into the destination country.|
| control.outOnly | false | True means to only display data going out the origination country.|
| control.initCountry | "CN" | A country displayed at the center of the screen when the globe has been initialized.|
| control.halo | true  | True means to turn on the halo. |
| color.surface | 0xFFFFFF or "#FFFFFF" | The color scheme of land and ocean area. |
| color.selected | null | Color of selected country. |
| color.in| 0x154492 or "#154492" | Color of line going into the destination. |
| color.out | 0xDD380C or "#DD380C"| Color of the line going out of the origination country. |
| color.halo | 0xFFFFFF or "#FFFFFF" | Color of the halo. |
| color.background | null | Color of the background. |
| brightness.ocean | <p>0.5</p> <p>[0.0, 1.0]| Brightness of the ocean.</p> |
| brightness.mentioned | <p>0.5</p> <p>[0.0, 1.0]| Brightness of the ocean.</p> | Brightness of the mentioned country. |
| brightness.related | <p>0.5</p> <p>[0.0, 1.0]| Brightness of the ocean.</p> | Brightness of the countries related to the selected country. |
| resource.loading | null | The path of the loading icon relative to "index.html".|

---

## Object Design APIs

The Object Design APIs are a group of APIs used to control the object (show or hide). Together with the documentation, we provide live demos and jsfiddle online editor for you to understand and try each API. Click the link below to see the detailed explanation of each API.

* [setInitCountry](#setinitcountry)
* [lightenMentioned](#lightenmentioned)
* [disableUnmentioned](#disableunmentioned)
* [showInOnly / showOutOnly](#showinonly/showoutonly)
* [addHalo / removeHalo](#addhalo/removehalo)
* [enableStats / disableStats](#enablestats/disablestats)

---

### setInitCountry

Sets the [country](https://github.com/syt123450/Gio.js/wiki/2.-Basic-Elements#country) initially selected. Once the 3D globe finishes initialization, it will rotate and bring this country to the front. The default value is `"CN"` (China). 
<p>
  <a target="_blank" href="http://www.giojs.org/examples/03_API_setInitCountry.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
Default:
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/setInitCountry_default.png"/></a>
</p>

```javascript
    // change the init country to the United States
    controller.setInitCountry("US");
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/setInitCountry.png"/></a>
</p>

---

### lightenMentioned
Makes the [mentioned country](https://github.com/syt123450/Gio.js/wiki/2.-Basic-Elements#country) brighter than those not mentioned in the input dataset. By default, mentioned country has the same brightness as the unmentioned country.
<p>
  <a href="http://giojs.org/examples/11_API_lightenMentioned.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  

```javascript
    controller.lightenMentioned(true);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/lightenMentioned_true.png"/></a>
</p>

```javascript
    controller.lightenMentioned(false);
 ```   
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/lightenMentioned_true.png"/></a>
</p>

---

### disableUnmentioned

Disables an [unmentioned country]() and makes it unselectable. A disabled country will not trigger any mouse click event. By default, unmentioned country is NOT disabled.
<p>
  <a href="http://giojs.org/examples/12_API_disableUnmentioned.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  

```javascript
    controller.disableUnmentioned(true);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/disableUnmentioned.png"/></a>
</p>

```javascript
    controller.disableUnmentioned(false)
```

---

###  showInOnly / showOutOnly<a name="showinonly"></a>

Displays only the line with data flowing into the [selected country]() or with data flowing out of the [selected country]().

```javascript
    controller.showInOnly(true);
```
<p>
  <a href="http://giojs.org/examples/13_API_showInOnly.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showInOnly_true.png"/></a>
</p>

```javascript
    controller.showInOnly(false);
```
<p>
  <a href="http://giojs.org/examples/14_API_showOutOnly.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showInOnly_false.png"/></a>
</p>

```javascript
    controller.showOutOnly(true);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showOutOnly_true.png"/></a>
</p>

```javascript
    controller.showOutOnly(false);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/showOutOnly_false.png"/></a>
</p>

---

### addHalo / removeHalo
Enables/Disables the [halo]() around the earth. When enabling halo, the color of halo also needs to be specified. By default halo is enabled.
<p>
  <a href="http://giojs.org/examples/25_API_addHalo(removeHalo).html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  

```javascript
    controller.addHalo(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/addHalo.png"/></a>
</p>

```javascript
    controller.removeHalo();
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/removeHalo.png"/></a>
</p>

---

### enableStats / disableStats
Displays/hides [stats]() on the upper-left corner of the scene. To use this API, `stats.min.js` must be included in the `<header>` tag of your html page.
<p>
  <a href="http://giojs.org/examples/18_API_enableStats(disableStats).html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
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
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/stats_enable.png"/></a>
</p>

```javascript
    controller.disableStats();
```    

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/design/stats_disable.png"/></a>
</p>

---

## Color and Style APIs

The color and style APIs are used to set the style (color and brightness) of Gio globe. You can customize almost everything of Gio globe, such as [surface](), [country](), [line](), [halo](), [background](), [ocean]() and etc. Together with documentation, we provide live demos and jsfiddle online editor for you to understand and try each API. Click the link below to see the detailed explanation of each API.

* [setStyle](#setstyle)
* [setSurfaceColor](#setsurfacecolor)
* [setSelectedColor](#setselectedcolor)
* [setExportColor](#setexportcolor)
* [setImportColor](#setimportcolor)
* [setImportColor](#setimportcolor)
* [setBackgroundColor](#setbackgroundcolor)
* [adjustOceanBrightness](#adjustoceanbrightness)
* [adjustRelatedBrightness](#adjustrelatedbrightness)
* [adjustMentionedBrightness](#adjustmentionedbrightness)


---

### setStyle

Sets the color scheme of the 3D globe by name. Check [here](https://github.com/syt123450/Gio.js/wiki/5.-Predefined-Styles) for some predefined styles. 
<p>
  <a href="http://giojs.org/examples/10_API_setStyle.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
For example we want to change from default style
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setStyle1.png"/></a>
</p>

to style called `magic`:
```javascript
    controller.setStyle("magic");
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setStyle2.png"/></a>
</p>

---

### setSurfaceColor

Sets the color of the [surface](#surface) the 3D globe. The default color is `#FFFFFF`:
<p>
  <a href="http://giojs.org/examples/01_API_setSurfaceColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
<p align="center">
  <a><img src="hhttp://giojs.org/assets/images/color/setSurfaceColor1.png" />
  </a>
</p>


```javascript
    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
    controller.setSurfaceColor("#FF0000");
    //controller.setSurfaceColor(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setSurfaceColor2.png"/></a>
</p>

---

### setSelectedColor

Sets color of the [country](#country) in selected state. The default color of the selected country is the same as the surface but brighter.
<p>
  <a href="http://giojs.org/examples/02_API_setSelectedColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
Default:
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setSelectedColor1.png"/></a>
</p>

```javascript
    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
	controller.setSelectedColor("#FF0000");
    //controller.setSelectedColor(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setSelectedColor2.png"/></a>
</p>

---

### setExportColor

Sets the color of `out line`. Definition of [out line](#line). 
<p>
  <a href="http://giojs.org/examples/04_API_setExportColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
The default color of out line is `0xDD380C`:
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setExportColor1.png"/></a>
</p>

```javascript
	// the parameter can be a string like "#FEF504" or a hex number 0xFEF504
	controller.setExportColor("#FEF504");
	//controller.setExportColor(0xFEF504);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setExportColor2.png"/></a>
</p>

---

### setImportColor

Sets the color of `in line`. Definition of [in line](). 
<p>
  <a href="http://giojs.org/examples/05_API_setImportColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
The default color of out line is `0x154492`:

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setImportColor1.png"/></a>
</p>

```javascript
    // the parameter can be a string like "#00FF00" or a hex number 0x00FF00
    controller.setImportColor("#00FF00");
	//controller.setImportColor(0x00FF00);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setImportColor2.png"/></a>
</p>

---

### setHaloColor

Sets the color of the [Halo](#halo). 
<p>
  <a href="http://giojs.org/examples/24_API_setHaloColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  

The default color of halo is `0xFFFFFF`:

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setHaloColor1.png"/></a>
</p>

```javascript
	// the parameter can be a string like "#FF0000" or a hex number 0xFF0000
	controller.setHaloColor("#FF0000");
	//controller.setHaloColor(0xFF0000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setHaloColor2.png"/></a>
</p>       

---

### setBackgroundColor

Sets the color of the [background](#background). 
<p>
  <a href="http://giojs.org/examples/26_API_setBackgroundColor.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
The default is` 0x000000`:

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setBackgroundColor1.png"/></a>
</p>      

```javascript
    // the parameter can be a string like "#530000" or a hex number 0x530000
	controller.setBackgroundColor("#530000");
	//controller.setBackgroundColor(0x530000);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/setBackgroundColor2.png"/></a>
</p>      

---

### adjustOceanBrightness

Sets the brightness of the [ocean](#ocean). 
<p>
  <a href="http://giojs.org/examples/07_API_adjustOceanBrightness.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
The range of the brightness is [0, 1] and its default value is `0.5`:

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustOceanBrightness1.png"/></a>
</p>      

```javascript
    controller.adjustOceanBrightness(0.8);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustOceanBrightness2.png"/></a>
</p>   

---

### adjustRelatedBrightness

Sets the brightness of the [related country](#country). 
<p>
  <a href="http://giojs.org/examples/08_API_adjustRelatedBrightness.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
The range of the brightness is [0, 1] and its default value is `0.5`:

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustRelatedBrightness1.png"/></a>
</p>   

```javascript
    controller.adjustRelatedBrightness(0.8);
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustRelatedBrightness2.png"/></a>
</p>   

---

### adjustMentionedBrightness

Sets the brightness of the [mentioned country](#country). 
<p>
  <a href="http://giojs.org/examples/09_API_adjustMentionedBrightness.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  
The range of the brightness is [0, 1] and its default value is `0.5`:
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustMentionedBrightness1.png"/></a>
</p>   

By default, mentioned country will not be highlighted. To adjust the brightness, [lightenMentioned(true)]()needs to be called first as follows:

```javascript
    controller.lightenMentioned(true);
    controller.adjustMentionedBrightness(0.8);
```
<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustMentionedBrightness2.png" alt="brightness=0.8"/></a>
</p>   

---

## Working with Data

There are multiple ways to load data into the controller of Gio.js. The basic way is to use [addData]() API. To load data asynchronously, use [addDataAsync]() API. To refresh the data periodically, you can use [liveLoad]() API. To make a better visualization of data flow, the range of the data is adjusted before used for rendering. To do a fine-grained control over the color of each line that connects two countries, check []();

* [addData()](#adddata)
* [addDataAsync()](#adddataasync)
* [liveLoad()](#liveload)
* [Set Color of Each Line]()
* [Data Preprocessing]()

---

### addData()

Loads data to the controller of Gio and overrides previous data synchronously. The dataset used for visualization is in JSON format. Each element of the array has an import country (`i`), an export country (`e`) and a value (`v`).

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

Explanation: The line has a direction and connection two country, the moving particle will animate in this direction, this direction is defined by "e" -> "i". "e" and "i" represent two country, "e" is the country where the line is out, "i" is the country where the line is in. The "v" is the value between these two country, there are particles moving on the line, if the value is small, the size and quantity of the particles will be small, and moving slowly, if the value is large, the size and quantity be large, and moving fast.

---

### addDataAsync()
 *url* - In JSON format as speficied in [addData]()
 *asyncLoadCallback* - Callback function to be executed on completion of data loading
 
Loads data to the controller of Gio and overrides previous data asynchronously. Data source can be specified through an URL. Data must be in JSON format as specified in [addData](). The callback function will be executed when the data finishes loading. 

Usage:

```javascript
    var url = "sampleData.json";

    // Use addDataAsync() API to load the data from a URL asynchronously.
    // The callback will be executed on completion of data loading.

    controller.addDataAsync( url, asyncLoadCallback );

    function asyncLoadCallback () {

        controller.init();

    }
```
 
---

### liveLoad()
 *dataSource* - In JSON format as speficied in [addData]()
 *liveLoadCallback* - Callback function to be executed on completion of data loading
 *duration* - Minimum duration of data loading time in milliseconds

Loads data to the controller dynamically. Usage:

```javascript
    var url = "dynamicallyAPI/data";

    // Load data from the url with liveLoad() API.
    // Set callback
    // Specify loading time

    controller.liveLoad( url, liveLoadCallback, 50000 );

    function liveLoadCallback () {

        console.log("Load data event happens.");

    }
```

---

### Set Color of Each Line
As mentioned in [line]() section, there are two types of lines: `in line` and `out line`. The colors associated with these two types of lines are called `inColor` and `outColor`. Each line can have a unique color specified through the input data as follows:

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

Note: `e`, `i`, and `v` have the same definition as in [addData](). 

---

### Data Preprocessing

In the input JSON data, the higher the value of `v` gets, the brighter the particles are and the faster they travel from the country of origin to destination. (Check Michael Chang's [article](http://mflux.tumblr.com/post/28367579774/armstradeviz)  for how he comes up with this idea.) Gio.js library will automatically scale the range of the input data for better visualization. As a developer, you can also define your own way of preprocessing data.

---

## Events

So far there is only one event to customized. And we are working on it to provide more customized event to make developing with Gio.js easier.

* [onCountryPicked()](#oncountrypicked)

---

### onCountryPicked( callback )
Fired when selected country changes. 

**What if the same country if clicked???**

---

## Advanced Features

Advanced features aims to help developer implement interactive applications more effectively. 

* [Method Chaining](#methodchaining)
* [switchCountry()](switchcountry)

---

### Method Chaining

Method chaining is a common pattern in Javascript. Gio's API also provides method chaining in which could make your code cleaner and more readable. The example below shows how method chaining in Gio.js works.

Without method chaining:
```javascript
controller.setSurfaceColor( "#00FF00" );
controller.setSelectedColor( "#FF0000" );
controller.disableUnmentioned( true );
```
With method chaining:
```javascript
controller.setSurfaceColor( "#00FF00" )
        .setSelectedColor( "#FF0000" )
        .disableUnmentioned( true );
```

---

### switchCountry()
*countryCode* - Country/area codes that conforms to [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1) standards
Instead of mouse click, `swtichCountry()` API can be used to change currently selected country. This gives developer more flexibility.

<p>
  <a href="http://giojs.org/examples/20_API_switchCountry.html">
    <img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/icon/liveDemoButton.png" height="30" width="100" />
  </a>
</p>  

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustMentionedBrightness2.png" alt="brightness=0.8"/></a>
</p>   

```javascript
    // switch selected country to "US"
    controller.switchCountry("US");
```

<p align="center">
  <a><img src="https://github.com/syt123450/Gio.js/blob/master/assets/images/document/color/adjustMentionedBrightness2.png" alt="brightness=0.8"/></a>
</p>   
