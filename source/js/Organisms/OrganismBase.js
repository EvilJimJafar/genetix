var fullCircle = Math.PI * 2;

/**
 * The base class for organisms
 * @param {Number} x The position in the X axis
 * @param {Number} y The position in the Y axis
 * @constructor
 */
Genetix.Organisms.OrganismBase = function (x, y) {
    "use strict";

    /**
     * The 'type' of organism e.g. Minion etc.
     * @type {string}
     */
    this.type = 'organism';

    /**
     * A unique identifier for the organism.
     * @type {*|String}
     */
    this.uid = Genetix.Utils.MathUtil.guid();

    /**
     * The 2D coordinates of the organism.
     * @type {{x: Number, y: Number}}
     */
    this.position = {
        x : x,
        y : y
    };

    /**
     * The current direction in which the organism is facing.
     * @type {number}
     */
    this.orientation = 0;

    /**
     *
     * @type {number}
     */
    this.speed = 1;

    /**
     * The width of the organism.
     * Used for drawing the organism as well as calculating other stats that are based on size.
     * @type {number}
     */
    this.width = 1;

    /**
     * The height of the organism.
     * Used for drawing the organism as well as calculating other stats that are based on size.
     * @type {number}
     */
    this.height = 1;

    /**
     * Every minion has a sight radius, outside which no other minion activity is registered.
     * As soon as another minion enters its sight radius, the minion’s basic instinct is triggered.
     * Some genes can improve this stat.
     * @type {number}
     */
    this.sightRadius = 5;

    /**
     * A minion’s energy is determined by it’s stamina, and is used when executing behaviours.
     * Energy is not replenishable, and once a minion runs out of energy, it will consume health instead when executing behaviours.
     * @type {number}
     */
    this.energy = 10;

    /**
     * The current target of the organism. Could be an object or another organism.
     * @type {*}
     */
    this.target = null;

    /**
     * A minion’s health is determined by it’s size, i.e. Larger minions have more health than smaller minions.
     * For example, a size 30 minion has 30 health (which means it can take 30 damage before dying).
     * When a minion’s health drops below 20%, it starts to flicker and lose opacity.
     * When it reaches 0%, the minion dies and any genes it was carrying are returned to the ether.
     * Health regenerates slowly out of combat.
     * @TODO: calculate initial health based on size.
     * @type {number}
     */
    this.health = 0;

    /**
     * Whether the organism is dead and marked for removal from the game.
     * @type {boolean}
     */
    this.dead = false;

    /**
     * The color of the organism
     * @type {number[]}
     */
    this.color = [ 255, 255, 255 ];

    /**
     *
     * @type {number}
     */
    this.maxSpeed = 1;

    /**
     * Strength determines how much damage can be dealt in combat and derives from a minion’s size.
     * For example, a size 30 minion has 30 strength, which means it deals 10–30 damage in combat.
     * A size 50 minion will deal 10–50, and Size 10 minion will deal 10.
     * @type {number}
     */
    this.strength = 10;

    /**
     * Persistence, which derives from a minion’s stamina, determines how long it will intimidate, pursue or flee from an enemy.
     * For example, a minion with 40 stamina will intimidate, pursue or flee for 3–4 seconds.
     * A minion with 60 stamina will perform for 5–6 seconds.
     * @type {number}
     */
    this.persistence = 10;


    this.totalHealth = 20000;

    /**
     * The turning speed of the organism.
     * This denotes the turning circle / agility of the organism.
     * @TODO base this on size?
     * @type {number}
     */
    this.turnSpeed = fullCircle / 100;
};

/**
 * Draws the organism to the canvas
 * This method should be overridden and called in the implementing class
 * @param {CanvasRenderingContext2D} ctx The Canvas Context
 */
Genetix.Organisms.OrganismBase.prototype.draw = function () {
    var ctx = Genetix.Core.Renderer.getContext();
    ctx.save();

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.orientation);
    ctx.globalAlpha = Math.max(this.health, 0);

    ctx.strokeStyle = 'rgba(' + this.color.join(',') + ',' + Math.max(this.health, 0) + ')';
    ctx.lineWidth = 1;

    // this method should be overridden and called in the implementing class
    // e.g.

    //Genetix.Organisms.OrganismBase.prototype.draw.call();
    //ctx.beginPath();
    //ctx.moveTo(0, 0);
    //ctx.lineTo(this.width, this.height*.5);
    //ctx.lineTo(0, this.height);
    //ctx.lineTo(this.width*.1, this.height*.5);
    //ctx.closePath();
    //ctx.stroke();
    //ctx.restore();
};

Genetix.Organisms.OrganismBase.prototype.assignNewTarget = function (newTarget) {
    this.target = newTarget;
};

/**
 * Updates the Organism - should be called on each tick of the game engine
 * @param {Number} elapsed
 */
Genetix.Organisms.OrganismBase.prototype.update = function (elapsed) {
    this.lifeTimer += elapsed;
    console.log('elapsed: '+elapsed+', lifeTime: '+this.lifeTimer);
    var timeToDie = this.maxSpeed/this.totalHealth;

    this.health = Math.max(1 - (this.lifeTimer * timeToDie), 0);

    if (this.health === 0) {
        this.dead = true;
        return;
    }

    this.speed = Math.min (this.maxSpeed - (this.lifeTimer * timeToDie), this.maxSpeed);

    if (this.target && !this.target.wasEaten) {
        var y = this.target.position.y - this.position.y;
        var x = this.target.position.x - this.position.x;
        var d2 = Math.pow(x, 2) + Math.pow(y, 2);


        if (d2 < 16) {
            this.lifeTimer -= this.target.foodValue;
            this.target.nibble();
            this.assignNewTarget();

        } else {

            var angle = Math.atan2(y, x);
            var delta = angle - this.orientation;
            var delta_abs = Math.abs(delta);

            if (delta_abs > Math.PI) {
                delta = delta_abs - fullCircle;
            }

            if (delta !== 0) {
                var direction = delta / delta_abs;
                this.orientation += (direction * Math.min(this.turnSpeed, delta_abs));
            }
            this.orientation %= fullCircle;

            this.position.x += Math.cos(this.orientation) * this.speed;
            this.position.y += Math.sin(this.orientation) * this.speed;
        }

    }
    else {
        var foodEntities = Genetix.Core.Engine.objects().slice(0);
        // Find something to do
        if (foodEntities.filter( function (e) { return !e.wasEaten; } ).length > 0) {
            // If hawk doesnt have any target then we have to look for the closest target and assign it
            var distances = [];

            // Go through all the food entities and see which one is the closest to the hawkl
            for (var foodIndex = 0; foodIndex < foodEntities.length; foodIndex++) {

                var food = foodEntities[foodIndex];

                if (!food.wasEaten) {
                    distances.push([Math.pow(food.position.x - this.position.x, 2) + Math.pow(food.position.y - this.position.y, 2), foodIndex]);
                }
            }

            // this sorts distances in growing order
            distances.sort(function (a, b) {
                return a[0] - b[0];
            });

            // assign the closest target (which is the first in the sorted array)
            if (distances[1]) {
                this.assignNewTarget(foodEntities[distances[1][1]]);
            }
        }
    }

    if (this.health <= 0) {
        this.dead = true;
    }

    this.draw();
};

Genetix.Organisms.OrganismBase.prototype.headTowardsTarget = function() {
    var proximity = Genetix.Utils.MathUtil.getProximity(this.target, this);
    var angle = Math.atan2(proximity.y, proximity.x);
    var delta = angle - this.orientation;
    var delta_abs = Math.abs(delta);

    if (delta_abs > Math.PI) {
        delta = delta_abs - fullCircle;
    }

    if (delta !== 0) {
        var direction = delta / delta_abs;
        this.orientation += (direction * Math.min(this.turnSpeed, delta_abs));
    }
    this.orientation %= fullCircle;

    this.position.x += Math.cos(this.orientation) * this.speed;
    this.position.y += Math.sin(this.orientation) * this.speed;
};

/**
 * Returns true if the organism is dead
 * @returns {boolean}
 */
Genetix.Organisms.OrganismBase.prototype.isDead = function () { return this.dead; };

/**
 * Returns true if the organism has an uneaten target
 * @returns {boolean}
 */
Genetix.Organisms.OrganismBase.prototype.hasTarget = function () { return !(this.target === null || this.target.wasEaten()); };