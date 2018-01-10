var Utils = (function(){

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
        }
    }

}());

export {Utils}