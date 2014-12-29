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

    this.speed = 1;
    this.width = 1;
    this.height = 1;
    this.target = null;
    this.lifeTimer = 0;
    this.health = 0;
    this.dead = false;
    this.color = [ 255, 255, 255 ];
    this.maxSpeed = 1;
    this.totalHealth = 10000;

    this.turnSpeed = fullCircle / 100;
    this.orientation = 0;

};

/**
 * Draws the organism to the canvas
 * This method should be overridden and called in the implementing class
 * @param {CanvasRenderingContext2D} ctx The Canvas Context
 */
Genetix.Organisms.OrganismBase.prototype.draw = function (ctx) {
    ctx.save();

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.orientation);
    ctx.globalAlpha = Math.max (this.health, 0);

    ctx.strokeStyle = "rgba(" + this.color.join(",") + ")";
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
 * This method should be overridden and called in the implementing class
 * @param elapsed
 */
Genetix.Organisms.OrganismBase.prototype.update = function (elapsed) {
    // @TODO: Implement some of the logic in here?
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
Genetix.Organisms.OrganismBase.prototype.hasTarget = function () { return !(this.target == null || this.target.wasEaten()); }