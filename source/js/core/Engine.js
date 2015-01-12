/**
 * The game engine
 */
Genetix.Core.Engine = (function() {

    "use strict";

    /**
     * The width of the game screen (canvas) in pixels
     * @memberof Genetix.Core.Engine
     * @type Number
     * @private
     */
    var _screenWidth = 0;

    /**
     * The height of the game screen (canvas) in pixels
     * @memberof Genetix.Core.Engine
     * @type Number
     * @private
     */
    var _screenHeight = 0;

    /**
     * The level
     * @memberof Genetix.Core.Engine
     * @type Genetix.levels.Level
     * @private
     */
    var _level = null;

    /**
     * A collection of all the onscreen organisms
     * @memberof Genetix.Core.Engine
     * @type Array
     * @private
     */
    var _organisms = [];

    /**
     * A collection of all the onscreen objects
     * @memberof Genetix.Core.Engine
     * @type Array
     * @private
     */
    var _objects = [];

    /**
     * The last time the FPS was updated (happens approx once per second)
     * @memberof Genetix.Core.Engine
     * @type Date
     * @private
     */
    var _lastFPSUpdate = new Date();

    /**
     * The frame count the last time the FPS was updated
     * @memberof Genetix.Core.Engine
     * @type Number
     * @private
     */
    var _framesAtLastFPSUpdate = 0;

    /**
     * The current calculated FPS
     * @memberof Genetix.Core.Engine
     * @type Number
     * @private
     */
    var _fps = 0;

    /**
     * A flag indicating whether the engine is paused
     * @memberof Genetix.Core.Engine
     * @type Boolean
     * @private
     */
    var _paused = false;

    /**
     * Updates all the on-screen organisms
     * @memberof Genetix.Core.Engine
     * @see Genetix.vehicles.Vehicle.update
     * @private
     */
    var _updateOrganisms = function() {
        var organism;
        for (var i = _organisms.length -1; i >= 0; i--) {
            organism = _organisms[i];

            organism.update();
        }
        organism = null;
    };

    /**
     * Updates all the on-screen food sources
     * @memberof Genetix.Core.Engine
     * @see Genetix.vehicles.Vehicle.update
     * @private
     */
    var _updateObjects = function() {
        var object;
        for (var i = _objects.length -1; i >= 0; i--) {
            object = _objects[i];

            object.update();
        }
        object = null;
    };

    /**
     * Detects and actions collisions
     * @memberof Genetix.Core.Engine
     * @see Genetix.Utils.BoxUtil
     * @private
     */
    var _doCollisions = function() {
        var i;
        var ii;
        var organism, organism1, organism2;
        var object;
        var center;

        // between organisms and food sources (loop backwards so you can safely splice)
        for (i = _organisms.length -1; i >= 0; i--) {
            organism = _organisms[i];
            for (ii = _objects.length -1; ii >= 0; ii--) {
                object = _objects[ii];
                if (Genetix.Utils.BoxUtil.Intersect(organism, object)) {
                    // do some stuff
                    //if (foodSource.depleted()) {
                    //    _foodSources.splice(i, 1);
                    //    center = Genetix.Utils.BoxUtil.Center(foodSource);
                    //    _effects.push(new Genetix.effects.ExplosionEffect(center.x, center.y));
                    //}
                }
            }
        }

        // between organisms (loop backwards so you can safely splice)
        for (i = _organisms.length -1; i>= 0; i--) {
            organism1 = _organisms[i];
            for (ii = _organisms.length -1; i >= 0; i--) {
                organism2 = _organisms[ii];
                if (organism1 !== organism2 && Genetix.Utils.BoxUtil.Intersect(organism1, organism2)) {
                    // do some stuff
                    //center = Genetix.Utils.BoxUtil.Center(_player);
                    //_effects.push(new Genetix.effects.ExplosionEffect(center.x, center.y));

                    //if (organism2.dead) {
                    //    _organisms.splice(ii, 1);
                    //}
                    //
                    //if (organism1.dead) {
                    //    _organisms.splice(i, 1);
                    //    break;
                    //}
                }
            }
        }

        // clean up organisms
        for (i = _organisms.length -1; i>= 0; i--) {
            if (_organisms[i].dead) {
                _organisms.splice();
            }
        }
    };

    /**
     * Updates the level (executes frame triggers) - called every frame
     * @memberof Genetix.Core.Engine
     * @param {Number} frame The current frame number
     * @see Genetix.levels.Level.update
     * @private
     */
    var _updateLevel = function(frame) {
        // _level.update(frame);
    };

    /**
     * Updates the game stats (FPS etc.) - called every frame
     * @param {Number} frame The current frame number
     * @memberof Genetix.Core.Engine
     * @private
     */
    var _updateStats = function(frame) {
        var now = new Date();
        var sinceLastUpdate = now.getTime() - _lastFPSUpdate.getTime();
        if (sinceLastUpdate > 1000) {
            _fps = (frame - _framesAtLastFPSUpdate) * (sinceLastUpdate / 1000);
            _fps = Math.round(_fps * 100) / 100;
            _framesAtLastFPSUpdate = frame;
            _lastFPSUpdate = now;
        }
    };

    var _timePaused = null;

    /**
     * @lends Genetix.Core.Engine
     */
    return {
        /**
         * Updates the game state - called every frame
         * @param {Number} frame The current frame number
         */
        Update: function(frame) {
            _updateLevel(frame);
            _updateOrganisms();
            _updateObjects();
            _doCollisions();
            _updateStats(frame);
        },

        /**
         * Sets the screen (canvas) height and width
         * @param {Number} width The width of the screen (canvas) in pixels
         * @param {Number} height The height of the screen (canvas) in pixels
         */
        setGameDimensions: function(width, height){
            _screenWidth = width;
            _screenHeight = height;
        },

        /**
         * Gets or sets the level
         * @param {Genetix.levels.Level} [level] The level if setting
         * @returns {Genetix.levels.Level}
         */
        Level: function(level) {
            if (level) {
                _level = level;
            }
            return _level;
        },

        /**
         * Gets the collection of organisms
         * @returns {Array}
         */
        Organisms: function() {
            return _organisms;
        },

        /**
         * Adds a single organism to the game
         * @param {Genetix.Organisms.Organism} organism The organism to be added
         */
        addOrganism: function(organism) {
            _organisms.push(organism);
        },

        /**
         * Gets the collection of on-screen objects
         * @returns {Array}
         */
        Objects: function() {
            return _objects;
        },

        /**
         * Adds a single organism to the game
         * @param {Genetix.Organisms.Organism} organism The organism to be added
         */
        addObject: function(object) {
            _objects.push(object);
        },

        /**
         * Toggles pause state
         * @see Genetix.Core.Timer
         */
        Pause: function() {
            _paused = !_paused;
            if (_paused) {
                _timePaused = new Date().getTime();
                Genetix.Core.Timer.stop();
            } else {
                Genetix.Core.Timer.start(Genetix.Core.Renderer.getCanvas());
            }
        },

        /**
         * Returns a boolean indication of whether the engine is paused or not
         * @returns {Boolean}
         */
        isPaused: function() {
            return _paused;
        }
    };
})();