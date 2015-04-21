var fullCircle = Math.PI * 2;

/**
 * The base class for organisms
 * @param {Number} x The position in the X axis
 * @param {Number} y The position in the Y axis
 * @constructor
 */
Genetix.Organisms.OrganismBase = function (x, y) {
    "use strict";
    
    this.position = {
        x : x,
        y : y
    };

    this.type = 'organism';
    this.uid = Genetix.Utils.MathUtil.guid();

    this.speed = 1;
    this.width = 1;
    this.height = 1;
    this.target = null;
    this.lifeTimer = 0;
    this.health = 0;
    this.dead = false;
    this.color = [ 255, 255, 255 ];
    this.maxSpeed = 1;
    this.totalHealth = 20000;

    this.turnSpeed = fullCircle / 100;
    this.orientation = 0;

    // instincts
    this.hunger = 0.5;
    this.aggression = 0.5;
    this.fear = 0.5;
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