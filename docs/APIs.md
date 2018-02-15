

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

The Object Design APIs are a group of APIs used to control the object (show or hide). Together with the documentation, we implement live demo and provide jsfiddle online editor for you to understand and try for each API, you can click the link below to see the detail explanation of each API. To help you understand how the APIs work, live demos and jsfiddle examples are provided.

* [setInitCountry](#setinitcountry)
* [lightenMentioned](#lightenmentioned)
* [disableUnmentioned](#disableunmentioned)
* [showInOnly / showOutOnly](#showinonly/showoutonly)
* [addHalo / removeHalo](#addhalo/removehalo)
* [enableStats / disableStats](#enablestats/disablestats)

---

### setInitCountry

Through this API, you can set the `initCountry` that will be selected. The default country is China. The globe will rotate and bring the init country to the front after it initialized.
```javascript
    // change the init country to the United States
    controller.setInitCountry("US");
```
Below are the before and after comparison using `setInitCountry("US")`:
Before:
// default value
<p align="center">
  <a href=""><img src="http://via.placeholder.com/400x300"/></a>
</p>
After:

// insert the setInitCountry("US) globe screen shot here
<p align="center">
  <a href=""><img src="http://via.placeholder.com/400x300"/></a>
</p>

---

### lightenMentioned

Throught this API, the [mentioned country](#country) can be lightened, the mentioned country will not be lighten as default. It will look a little brighter than the countries which are not mentioned in the input data.

The basic usage of this API is as shown below:

    controller.lightenMentioned(true);

You can also close this function by setting the parameter to false:

    controller.lightenMentioned(false);
    
From the screen shots below, you can see the effect of  lightenMentioned(true) and lightenMentioned(false). The compare effect and source code can also be seen in live demo.

// insert lightenMentioned(true) picture here

lightenMentioned(true)

// insert lightenMentioned(false) picture here

lightenMentioned(false)

---

### disableUnmentioned

Through this API, you can set the [unmentioned country](#country) can not be selected, the unmentioned country can be selected as default. It means that if you set this attribute, when click the  unmentioned country, it will not trigger the click event(the country will not become selected and the globe will not rotate to that country). 

The basic usage of this API is as shown below:

    controller.disableUnmentioned(true)

You can also close this function by setting the parameter to false

    controller.disableUnmentioned(false)

From the live demo, you can see the effect of this API

---

###  showInOnly / showOutOnly<a name="showinonly"></a>

Through these two API, you can let the globe show only in [lines or  out lines](#line) for [selected country](#selected-country). The globe will show both in lines and outlines as default.

The basic usage of the showInOnly API is as shown below:

    controller.showInOnly(true);
    
You can coose this function by setting the parameter to false:

    controller.showInOnly(false);

The basic usage of the showOutOnly API is as shown below:

    controller.showOutOnly(true);

You can close this function by setting the parameter to false:

    cotnroller.showOutOnly(false);

From the screen shots below, you can see the showInOnly and showOutOnly compare with the normal globe. The compare effect and source code can also been seen in live demo.

// insert the picture of nomal globe here

the default globe

// insert the picture of showInOnly globe here

showInOnly globe

// insert the picture of showOutOnly globe here

showOutOnly globe

---

### addHalo / removeHalo

Through these two API, you can control the show or hide of [halo](#halo). The globe will show halo as default.

You can show and define the color of the halo by calling the addHalo() API, the basic usage of this API is as shown below:

    controller.addHalo(0xFF0000);

You can hide the halo by calling the removeHalo() API, the basic usage of this API is as shown below:

    controller.removeHalo();

From the screen shots below, you can see the effect of these two API. The compare effect can also been seen in live demo.

// insert addHalo picture here

addHalo() or default

// insert removeHalo picture here

removeHalo()

---

### enableStats / disableStats

Through these two API, you can show or hide the [stats](#stats) object. The globe scene will not show "stats" as default. Before using these two API, you must include the stats library in the &lt;header&gt;, as shown below:

    <header>
        <script src="stats.min.js"></script>
    </header>

The enableStats() API will be used like this:

    controller.enableStats();
    
The disableStats() API will be used like this:

    controller.disableStats();
    
From the screen shots below, you can see the effect of these two API. The compare effect can alse been seen in live demo.

// insert enableStats picture here

enableStats()

// insert disasbleStats / default picture here

disableStats()
    
---

## Color and Style API

The color and style API are API used to customize the style of globe (including color and brightness). You can defined and various part of the Gio globe, for example, surface, selected country, lines, halo, and so on. Each section of this part contain one explanation of the API, you can see live demo and edit it in jsfiddle, you can click the links below to see each API.

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

The Gio has some pre-defined "style", each style contains a suit of color, you can use setStyle API to set the style to the Gio globe. The basic usage of the setStyle API is as shown below:

    controller.setStyle("magic");

The following screen shot shows what the style look like and its names, you can replace the paramater "magic" with the name below and set the style of globe to it.

// screen shot of the style

style name: "magic"

---

### setSurfaceColor

Through setSurfaceColor API, you can change the [surface](#surface) color of the Gio globe. The default color of the surface is #FFFFFF. The basic usage of setSurfaceColor API is as shown below:

    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
    controller.setSurfaceColor("#FF0000");
    //controller.setSurfaceColor(0xFF0000);

From the screen shots below, you can see the effect of the setSurfaceColor API, you can also see these it live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert setSurfaceColor globe picture

setSurfaceColor("#FF0000") globe

---

### setSelectedColor

Through setSelectedColor API, you can change the color of [selected Country](#country), the default color of the selected country is the same as the surface color, just brighter and you can set it different to highlight the selected country.

The basic usage of setSelectedColor is as shown below:

    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
        controller.setSelectedColor("#FF0000");
        //controller.setSelectedColor(0xFF0000);

From the screen shots below, you can see the effect of the setSelectedColor API, you can also see these it live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert setSelectedColor globe picture

setSelectedColor("#FF0000") globe

---

### setExportColor

Through setExportColor API, you can change the color of [out line](#line), the default color of out line is 0xdd380c.

The basic usage of setExportColor is as shown below:

    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
        controller.setExportColor("#FF0000");
        //controller.setExportColor(0xFF0000);

From the screen shots below, you can see the effect of the setExportColor API, you can also see these in live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert setExportColor globe picture

setExportColor("#FF0000") globe


---

### setImportColor

Through setImportColor API, you can change the color of [in line](#line), the default color of out line is 0x154492.

The basic usage of setImportColor is as shown below:

    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
        controller.setImportColor("#FF0000");
        //controller.setImportColor(0xFF0000);

From the screen shots below, you can see the effect of the setImportColor API, you can also see these in live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert setImportColor globe picture

setImportColor("#FF0000") globe

---

### setHaloColor

Through setHaloColor API, you can change the [Halo](#halo) color, the default color of halo is 0xFFFFFF.

The basic usage of setHaloColor is as shown below:

    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
    controller.setHaloColor("#FF0000")
    //controller.setHaloColor(0xFF0000);
    
From the screen shots below, you can see the effect of the setHaloColor API, you can also see these in live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert setHaloColor globe picture

setHaloColor("#FF0000") globe

---

### setBackgroundColor

Through setBackgroundColor API, you can change the [background](#background) color, the default color of background is 0x000000.

The basic usage of setBackgroundColor is as shown below:

    // the parameter can be a string like "#FF0000" or a hex number 0xFF0000
        controller.setBackgroundColor("#FF0000")
        //controller.setBackgroundColor(0xFF0000);

From the screen shots below, you can see the effect of the setBackgroundColor API, you can also see these in live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert setBackgroundColor globe picture

setBackgroundColor("#FF0000") globe

---

### adjustOceanBrightness

Through adjustOceanBrightness API, you can change the brightness of the [ocean](#ocean), the range of the brightness is [0, 1], the default brightness of the ocean is 0.5.

The basic usage of the adjustOceanBrightness is as shown below:

    controller.adjustOceanBrightness(0.8);

From the screen shots below, you can see the effect of the adjustOceanBrightness API, you can also see these in live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert adjustOceanBrightness globe picture

adjustOceanBrightness(0.8) globe


---

### adjustRelatedBrightness

Through adjustRelatedBrightness API, you can change the brightness of the [related country](#country), the range of the the brightness is [0, 1], the default brightness of the related country is 0.5.

The basic usage of the adjustRelatedBrightness is as shown below:

    controller.adjustRelatedBrightness(0.8);

From the screen shots below, you can see the effect of the adjustRelatedBrightness API, you can also see these in live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert adjustRelatedBrightness globe picture

adjustRelatedBrightness(0.8) globe

---

### adjustMentionedBrightness

Through adjustMentionedBrightness API, you can change the brightness of the [mentioned country](#country), the range of the the brightness is [0, 1], the default brightness of the mentioned country is 0.5.

The basic usage of the adjustMentionedBrightness is as shown below:(as mentioned country will not be highlight as default, so if you want to adjust mentioned country's brightness country, you need to lighten mentioned country by call the lightenMentioned(true), see more about [lightenMentioned](#lightenmentioned))

    controller.lightenMentioned(true);
    controller.adjustMentionedBrightness(0.8);

From the screen shots below, you can see the effect of the adjustMentionedBrightness API, you can also see these in live demo and try this API in jsfiddle.

// insert basic style globe picture

basic globe

// insert adjustMentionedBrightness globe picture

adjustMentionedBrightness(0.8) globe

---

##Working with Data



---

###addData

---

###addDataAsync

---

###liveLoad

---

###set line color from data

---

###Data flatten

---

##Callback

---

###onCountryPicked

---

##Advanced Feature

---

###function chain

---

###switchCountry

  [1]: http://static.zybuluo.com/syt/28rp7nl2e00fp0vhshmbuf75/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-01-28%20%E4%B8%8A%E5%8D%884.05.27.png