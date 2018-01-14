var Utils = (function(){

    function isString(str){
        return (typeof str==='string')&& str.constructor===String;
    }

    return {

        wrap: function wrap(value, min, rangeSize) {
            rangeSize-=min;
            while (value < min) {
                value += rangeSize;
            }
            return value % rangeSize;
        },

        constrain: function constrain(v, min, max) {
            if (v < min)
                v = min;
            else if (v > max)
                v = max;
            return v;
        },

        formatColor: function(color) {
            return color;
        },

        transformBrightness: function(brightness, min, max) {
            return Math.floor(min + (max - min) * brightness);
        }
    }

}());

export {Utils}