/**
 * The game renderer
 */
Genetix.Core.Renderer = (function() {

    "use strict";

    /**
     * A reference to the canvas DOM object the game will be rendered in
     * @memberof Genetix.Core.Renderer
     * @type {HTMLCanvasElement}
     * @private
     */
    var _canvas = null;

    /**
     * A reference to the 2D context of the game canvas
     * @memberof Genetix.Core.Renderer
     * @type {Object}
     * @private
     */
    var _context = null;

    /**
     * The width of the game canvas in pixels
     * @memberof Genetix.Core.Renderer
     * @type {Number}
     * @private
     */
    var _canvasWidth = 0;

    /**
     * The height of the game canvas in pixels
     * @memberof Genetix.Core.Renderer
     * @type {Number}
     * @private
     */
    var _canvasHeight = 0;

    /**
     * @lends Genetix.Core.Renderer
     */
    return {
        /**
         * Returns the game canvas
         * @returns {HTMLCanvasElement}
         */
        getCanvas: function() {
            return _canvas;
        },

        /**
         * A setter for the game canvas - also sets _context, _canvasWidth & _canvasHeight
         * @param {HTMLCanvasElement} canvas The Canvas element
         */
        setCanvas: function(canvas) {
            _canvas = canvas;
            _context = canvas.getContext('2d');
            _canvasWidth = canvas.width;
            _canvasHeight = canvas.height;
            Genetix.Core.Engine.setGameDimensions(canvas.width, canvas.height);
        },

        getContext: function() {
            return _context;
        },

        /**
         * Renders a frame to the game canvas
         */
        render: function() {
            var i;

            // clear the canvas
            _context.clearRect(0, 0, _canvasWidth, _canvasHeight);

            // background
            //_context.fillStyle = '#ACE2F3';
            //_context.fillRect(0, 0, _canvasWidth, _canvasHeight);

            Genetix.Core.Engine.renderableEntities().forEach(function(entity) {
                entity.draw();
            });
        }
    };
})();