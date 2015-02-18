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
     * The time the last frame was rendered
     * @type {null}
     * @private
     */
    var _lastFrameTime = null;

    /**
     * The main game engine loop
     * @memberof Genetix.Core.Timer
     * @see Genetix.Core.Engine.Update
     * @see Genetix.Core.Renderer.Render
     * @private
     */
    var _tick = function() {
        if (_run) {
            var now = Date.now();
            var elapsed = (!_lastFrameTime) ? 0 : now - _lastFrameTime;
            _lastFrameTime = now;

            requestAnimationFrame(_tick);
            _frame++;

            // render the frame
            Genetix.Core.Renderer.render(_frame);

            // update the engine
            Genetix.Core.Engine.update(_frame, elapsed);
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
            if(_run) {
                return false;
            }
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