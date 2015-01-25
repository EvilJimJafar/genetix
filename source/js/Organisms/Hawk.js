/**
 * The class for Hawks
 * @param {Number} x The position in the X axis
 * @param {Number} y The position in the Y axis
 * @extends Genetix.Organisms.OrganismBase
 * @constructor
 */
Genetix.Organisms.Hawk = function(x, y) {

    Genetix.Organisms.OrganismBase.prototype.constructor.apply(this, arguments);

    this.speed = this.maxSpeed = 1.5;
    this.turnSpeed = fullCircle / 100;
    this.width = 10;
    this.height = 6;
    this.totalHealth = 20000;
    this.color = [ 255, 255, 255, 1 ];
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

/**
 * Updates the Hawk - should be called on each tick of the game engine
 * @param {Number} elapsed
 */
Genetix.Organisms.Hawk.prototype.update = function(elapsed) {
    //this.lifeTimer += elapsed;
    var timeToDie = this.maxSpeed/this.totalHealth;

    this.health = 1 - (this.lifeTimer * timeToDie);
    this.speed = Math.min (this.maxSpeed - (this.lifeTimer * timeToDie), this.maxSpeed);

    if (this.dead) {
        return;
    }

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
            for (var foodIndex = 0 ; foodIndex < foodEntities.length ; foodIndex++) {

                var food = foodEntities[foodIndex];

                if (!food.wasEaten) {
                    distances.push([ Math.pow(food.position.x - this.position.x, 2) + Math.pow(food.position.y - this.position.y, 2), foodIndex ]);
                }

            }

            // this sorts distances in growing order
            distances.sort(function (a, b) {
                return a[0] - b[0];
            });

            // assign the closest target (which is the first in the sorted array)
            this.assignNewTarget(foodEntities[distances[1][1]]);
        }
    }

    if (this.health <= 0) {
        this.dead = true;
    }

    this.draw();
};
