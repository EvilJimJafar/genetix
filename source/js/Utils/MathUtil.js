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
        }
    };
})();