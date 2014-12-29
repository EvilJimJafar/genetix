/*global setTimeout:false */
/**
 * The main game timer
 */
Genetix.Core.Timer = (function() {

    "use strict";

    /**
     * A flag indicating whether the engine is/should be running
     * @memberof Genetix.Core.Timer
     * @type Boolean
     * @private
     */
    var _run = false;

    /**
     * The current frame number
     * @memberof Genetix.Core.Timer
     * @type Number
     * @private
     */
    var _frame = 0;

    /**
     * The main game engine loop
     * @memberof Genetix.Core.Timer
     * @see Genetix.Core.Engine.Update
     * @see Genetix.Core.Renderer.Render
     * @private
     */
    var _tick = function() {
        requestAnimationFrame(_tick);

        if (_run) {
            _frame++;

            // update the engine
            Genetix.Core.Engine.Update(_frame);

            // render the frame
            Genetix.Core.Renderer.Render(_frame);
        }
    };

    /**
     * @lends Genetix.Core.Timer
     */
    return {
        /**
         * Starts the game engine
         * @param {HTMLCanvasElement} canvas The canvas to render to
         */
        start: function(canvas) {
            _run = true;
            Genetix.Core.Renderer.setCanvas(canvas);
            _tick();
        },

        /**
         * Stops the game engine
         */
        stop: function() {
            _run = false;
        },

        /**
         * Returns the current frame number
         * @returns Number
         */
        frame: function() {
            return _frame;
        }
    };
})();