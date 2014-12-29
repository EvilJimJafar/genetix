/*global window:false */
/**
 * Handles user input
 */
Genetix.Core.Control = (function() {

    "use strict";

    /**
     * A keyboard event
     * @memberof Genetix.Core.Control
     * @type Event
     * @private
     */
    var _event;

    /**
     * The keycode associated with a keyboard event
     * @memberof Genetix.Core.Control
     * @type string
     * @private
     */
    var _code;

    /**
     * Prevents event bubbling up and any possible default effect on the browser
     * @memberof Genetix.Core.Control
     * @param {Event} event
     * @private
     */
    var _stopPropagation = function(event) {
        if(event.stopPropagation) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };

    /**
     * Updates the _event and _code variables
     * @memberof Genetix.Core.Control
     * @param {Event} e
     * @private
     */
    var _getEventAndCode = function(e) {
        if(window.event) {
            _event = window.event;
            _code = _event.keyCode;
        } else {
            _event = e;
            _code = _event.which;
        }
    };

    /**
     * @lends Genetix.Core.Control
     */
    return {
        /**
         * Handles a key press
         * @param {Event} e The onKeyDown event
         */
        keyDown: function(e) {
            _getEventAndCode(e);
            switch(_code) {
                case Genetix.Config.buttons.pause:
                    Genetix.Core.Engine.Pause();
                    _stopPropagation(_event);
                    break;
            }
        },

        /**
         * Handles a key release
         * @param {Event} e The onKeyUp event
         */
        keyUp: function(e) {
            _getEventAndCode(e);
            switch(_code) {

            }
        },

        /**
         * Handles a mouse button press
         * @param {Event} e the mouse event
         */
        mouseDown: function(e) {
            var offset = Genetix.Utils.DomUtil.getOffset(Genetix.Core.Renderer.getCanvas());
            Genetix.World.spawnFoodAtCoordinates(e.x - offset.left, e.y - offset.top);
        },

        /**
         * Handles a mouse button release
         * @param {Event} e the mouse event
         */
        mouseUp: function(e) {

        }
    };
})();