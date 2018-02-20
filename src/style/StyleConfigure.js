/**
 * @author syt123450 / https://github.com/syt123450
 */

import { StyleFactory } from "./StyleFactory.js";

// developer need to register their new style to StyleFactory here

import { MagicStyle } from "./MagicStyle.js";
StyleFactory.register( "magic", MagicStyle );

import { MintStyle } from "./MintStyle.js";
StyleFactory.register( "mint", MintStyle );

import { RedBlueStyle } from "./RedBlueStyle.js";
StyleFactory.register( "redBlue", RedBlueStyle );

import { StrawberryStyle } from "./StrawberryStyle.js";
StyleFactory.register( "strawberry", StrawberryStyle );

import { SunsetStyle } from "./SunsetStyle.js";
StyleFactory.register( "sunset", SunsetStyle );
