var fullCircle = Math.PI * 2;

function Creature (x, y) {

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

  this.turnSpeed = fullCircle / 100;
  this.orientation = 0;

}

Creature.prototype.draw = function (ctx) {
	ctx.save();

  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(this.orientation);
  ctx.globalAlpha = Math.max (this.health, 0);

  ctx.strokeStyle = "rgba(" + this.color.join(",") + ")";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(this.width, this.height*.5);
  ctx.lineTo(0, this.height);
  ctx.lineTo(this.width*.1, this.height*.5);
  ctx.closePath();
  ctx.stroke();
  
  ctx.restore();
};

Creature.prototype.assignNewTarget = function (newTarget) {
	this.target = newTarget;
};

Creature.prototype.update = function (elapsed) {

  this.lifeTimer += elapsed;
  var timeToDie = Hawk.config.maxSpeed/Hawk.config.totalHealth;
  
  this.health = 1 - (this.lifeTimer * timeToDie);
  this.speed = Math.min (Hawk.config.maxSpeed - (this.lifeTimer * timeToDie), Hawk.config.maxSpeed);

  if (this.dead) {
      return;
  }

  if (this.target != null && !this.target.wasEaten()) {
      var y = this.target.position.y - this.position.y;
      var x = this.target.position.x - this.position.x;
      var d2 = Math.pow(x, 2) + Math.pow(y, 2);
 

      if (d2 < 16) {
          this.lifeTimer -= Food.config.foodValue;
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
      // Hawk will do something esle when there's no food to look for
  }
  
  if (this.health <= 0) {
      this.dead = true;
  }

};

Creature.prototype.isDead = function () { return this.dead; };

Creature.prototype.hasTarget = function () { return !(this.target == null || this.target.wasEaten()); }