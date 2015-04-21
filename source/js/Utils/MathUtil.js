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
        },

        /**
         * Takes a list of items that have a position, and returns the one closest to x & y
         * @param {number} x The x coordinate against which to check proximity
         * @param {number} y The y coordinate against which to check proximity
         * @param items The items to check proximity
         * @return {*}
         */
        getClosest: function(x, y, items) {
            if(items.length === 0) {
                return undefined;
            } else if(items.length === 1) {
                return items[0];
            }

            var distances = [];

            // Go through all the items and see which one is the closest to the x & y coordinates
            var len = items.length;
            var item;
            for (var i = 0; i < len; i++) {
                item = items[i];
                distances.push([Math.pow(item.position.x - x, 2) + Math.pow(item.position.y - y, 2), i]);
            }

            // this sorts distances in growing order
            distances.sort(function (a, b) {
                return a[0] - b[0];
            });

            return items[distances[0][1]];
        },

        getProximity: function(item1, item2) {
            var y = item1.position.y - item2.position.y;
            var x = item1.position.x - item2.position.x;
            return {
                x: x,
                y: y,
                d2: Math.pow(x, 2) + Math.pow(y, 2)
            };
        }
    };
})();