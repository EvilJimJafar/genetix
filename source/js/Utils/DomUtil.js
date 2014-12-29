/**
 * Utility object for DOM
 * @class
 */
Genetix.Utils.DomUtil = (function() {

    "use strict";

    return {
        /**
         * Finds the offset of a given DOM element relative to the window
         * @param {HTMLElement} el
         * @return {{top: Number, left: Number}}
         */
        getOffset: function( el ) {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        }
    };
})();