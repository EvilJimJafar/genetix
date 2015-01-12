function Dove () {

	Creature.prototype.constructor.apply(this, arguments);

	this.width = 10;
	this.height = 5;
	this.halfwidth = this.width/2;
	this.halfheight = this.height/2;
	this.color = [ 255, 255, 255, 1 ];

}

Dove.prototype = new Creature();
Dove.prototype.constructor = Dove;

Dove.prototype.draw = function(ctx) {
	ctx.save();

  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(this.orientation);
  ctx.globalAlpha = Math.max (this.health, 0);

  ctx.strokeStyle = "rgba(" + this.color + ")";    // this.color[0] + this.color[1] + this.color[2] + this.color
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(-this.halfwidth, -this.halfheight);
  ctx.lineTo(this.halfwidth, -this.halfheight);
  ctx.lineTo(this.halfwidth, this.halfheight);
  ctx.lineTo(-this.halfwidth, this.halfheight);
  ctx.closePath();
  ctx.stroke();
  
  ctx.restore();	
}