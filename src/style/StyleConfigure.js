/**
 * @author syt123450 / https://github.com/syt123450
 */

import { StyleFactory } from "./StyleFactory.js";

// developer need to register their new style to StyleFactory here

import { StrangeStyle } from "./StrangeStyle.js";
StyleFactory.register( "strange", StrangeStyle );
