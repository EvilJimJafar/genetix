/**
 * The class for Hawks
 * @param {Number} x The position in the X axis
 * @param {Number} y The position in the Y axis
 * @extends Genetix.Organisms.OrganismBase
 * @constructor
 */
Genetix.Organisms.Hawk = function(x, y) {

    Genetix.Organisms.OrganismBase.prototype.constructor.apply(this, arguments);

    this.type = 'Hawk';

    this.speed = this.maxSpeed = 1.5;
    this.turnSpeed = Genetix.Constants.circle / 100;
    this.width = 10;
    this.height = 6;
    this.totalHealth = 40000;
    this.color = [ 255, 255, 255 ];

    // instincts
    this.aggression = 0.8;
    this.fear = 0.4;
    this.hunger = 0.5;
};

Genetix.Organisms.Hawk.prototype = Object.create(Genetix.Organisms.OrganismBase.prototype);
Genetix.Organisms.Hawk.prototype.constructor = Genetix.Organisms.Hawk;

/**
 * Override the draw method of the OrganismBase class
 * @param {CanvasRenderingContext2D} ctx The Canvas Context
 * @override Genetix.Organisms.OrganismBase.prototype.draw
 */
Genetix.Organisms.Hawk.prototype.draw = function() {
    Genetix.Organisms.OrganismBase.prototype.draw.call(this, arguments);

    var ctx = Genetix.Core.Renderer.getContext();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.width, this.height*0.5);
    ctx.lineTo(0, this.height);
    ctx.lineTo(this.width*0.1, this.height*0.5);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
};