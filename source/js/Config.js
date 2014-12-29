/**
 * The Config object
 */
Genetix.Config = (function() {

    "use strict";

    /**
     * A map of the keycodes for the various controls
     * @enum
     */
    var _buttons = {
        /**
         * The keycode for pausing the game
         * @type number
         */
        pause: 27
    };

    return {
        get buttons() {
            return _buttons;
        }
    };
})();