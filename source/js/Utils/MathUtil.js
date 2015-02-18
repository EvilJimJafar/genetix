/**
 * Utility object for DOM
 * @class
 */
Genetix.Utils.MathUtil = (function() {

    "use strict";

    return {
        /**
         * Returns a pseudo-random number in a given range
         * @param {Number} min
         * @param {Number} max
         * @return {Number}
         */
        rand: function(min, max) {
            return Math.random() * (max - min) + min;
        },

        /**
         * Returns a GUID-like string
         * @return {String}
         */
        guid: function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
    };
})();