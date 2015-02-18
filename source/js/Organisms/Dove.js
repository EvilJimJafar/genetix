/**
 * The class for Doves
 * @param {Number} x The position in the X axis
 * @param {Number} y The position in the Y axis
 * @extends Genetix.Organisms.OrganismBase
 * @constructor
 */
Genetix.Organisms.Dove = function(x, y) {

    Genetix.Organisms.OrganismBase.prototype.constructor.apply(this, arguments);

    this.type = 'Dove';

    this.width = 10;
    this.height = 5;
    this.halfwidth = this.width/2;
    this.halfheight = this.height/2;
    this.color = [ 255, 255, 255 ];
    this.maxSpeed = 1.5;
    this.totalHealth = 40000;

    // instincts
    this.aggression = 0.3;
    this.fear = 0.8;
    this.hunger = 0.7;
};

Genetix.Organisms.Dove.prototype = Object.create(Genetix.Organisms.OrganismBase.prototype);
Genetix.Organisms.Dove.prototype.constructor = Genetix.Organisms.Dove;

/**
 * Override the draw method of the OrganismBase class
 * @param {CanvasRenderingContext2D} ctx The Canvas Context
 * @override Genetix.Organisms.OrganismBase.prototype.draw
 */
Genetix.Organisms.Dove.prototype.draw = function() {
    Genetix.Organisms.OrganismBase.prototype.draw.call(this, arguments);

    var ctx = Genetix.Core.Renderer.getContext();
    ctx.beginPath();
    ctx.moveTo(-this.halfwidth, -this.halfheight);
    ctx.lineTo(this.halfwidth, -this.halfheight);
    ctx.lineTo(this.halfwidth, this.halfheight);
    ctx.lineTo(-this.halfwidth, this.halfheight);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
};