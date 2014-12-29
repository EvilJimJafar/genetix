/*global document:false */

/**
 * The Genetix namespace
 * @namespace
 * @global
 * @author Jim Sangwine
 */
var Genetix = (function() {

    "use strict";

    var _canvas = null;

    return {
        /**
         * The Core namespace
         * @namespace
         */
        Core: {},

        /**
         * The Objects namespace
         * @namespace
         */
        Objects: {},

        /**
         * The Organisms namespace
         * @namespace
         */
        Organisms: {},

        /**
         * The Utils namespace
         * @namespace
         */
        Utils: {},

        /**
         * Enables inheritance
         * @param {*} dest The derived class
         * @param {*} source The base class
         **/
        extend: function (dest, source) {
            if (!dest || !source) {
                return;
            }
            /*jshint forin:false */
            for(var proto in source.prototype) {
                dest.prototype[proto] = source.prototype[proto];
            }
            dest.prototype.Super = source;
        },

        /**
         * Starts the game engine
         * @param canvas The canvas to render to
         */
        start: function (canvas) {
            Genetix.Core.Timer.start(canvas);
            document.onkeyup = Genetix.Core.Control.keyUp;
            document.onkeydown = Genetix.Core.Control.keyDown;
            canvas.onmousedown = Genetix.Core.Control.mouseDown;
            canvas.onmouseup = Genetix.Core.Control.mouseUp;
        },

        /**
         * Stops the game engine
         */
        stop: function () {
            Genetix.Core.Timer.stop();
            document.onkeyup = null;
            document.onkeydown = null;
        },

        /**
         * Called when the player dies
         */
        gameOver: function () {
            Genetix.Core.Timer.stop();
        }
    };
})();