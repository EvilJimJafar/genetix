/**
 * The class for Minions
 * @param {Number} x The position in the X axis
 * @param {Number} y The position in the Y axis
 * @extends Genetix.Organisms.OrganismBase
 * @constructor
 */
Genetix.Organisms.Minion = function(x, y) {

    Genetix.Organisms.OrganismBase.prototype.constructor.apply(this, arguments);

    this.type = 'Minion';

    this.width = 10;
    this.height = 10;
    this.halfwidth = this.width/2;
    this.halfheight = this.height/2;
    this.color = [ 255, 255, 255 ];
    this.maxSpeed = 1.5;
    this.totalHealth = 40000;
    this.health = 40000;

    this.genes = [];
};

Genetix.Organisms.Minion.prototype = Object.create(Genetix.Organisms.OrganismBase.prototype);
Genetix.Organisms.Minion.prototype.constructor = Genetix.Organisms.Minion;

/**
 * Override the draw method of the OrganismBase class
 * @param {CanvasRenderingContext2D} ctx The Canvas Context
 * @override Genetix.Organisms.OrganismBase.prototype.draw
 */
Genetix.Organisms.Minion.prototype.draw = function() {
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

/**
 * Updates the Minion - should be called on each tick of the game engine
 * @param {Number} elapsed
 */
Genetix.Organisms.Minion.prototype.update = function (elapsed) {
    //this.lifeTimer += elapsed;
    //console.log('elapsed: '+elapsed+', lifeTime: '+this.lifeTimer);
    //var timeToDie = this.maxSpeed/this.totalHealth;

    //this.health = Math.max(1 - (this.lifeTimer * timeToDie), 0);

    if (this.health === 0) {
        this.dead = true;
        return;
    }

    //this.speed = Math.min (this.maxSpeed - (this.lifeTimer * timeToDie), this.maxSpeed);
    this.speed = this.maxSpeed;

    if (this.target && !this.target.minion && !this.target.genePool) {
        var y = this.target.position.y - this.position.y;
        var x = this.target.position.x - this.position.x;
        var d2 = Math.pow(x, 2) + Math.pow(y, 2);

        if (d2 < 16) {
            //this.lifeTimer -= this.target.foodValue;
            this.target.grab(this);
            this.genes.push(this.target);
            this.assignNewTarget(null);
        } else {
            var angle = Math.atan2(y, x);
            var delta = angle - this.orientation;
            var delta_abs = Math.abs(delta);
            var currentOrientation = this.orientation;

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

            var geneCount = this.genes.length;
            for (var i=0; i<geneCount; i++) {
                var offset = ((i+1)*10) + 5;
                var lag = ((this.orientation - currentOrientation) * i);
                this.genes[i].position.x = (this.position.x - (Math.cos(this.orientation-lag) * offset));
                this.genes[i].position.y = (this.position.y - (Math.sin(this.orientation-lag) * offset));
            }
        }

    } else if(this.genes.length < 5) {
        console.log('looking for another gene');
        var genes = Genetix.Core.Engine.objects().filter( function (g) { return g.type === 'gene' && !g.minion && !g.genePool; } ).slice(0);
        // Find something to do
        if (genes.length > 0) {
            // If minion doesnt have any target then we have to look for the closest target and assign it
            var distances = [];

            // Go through all the genes and see which one is the closest to the minion
            for (var geneIndex = 0; geneIndex < genes.length; geneIndex++) {
                var gene = genes[geneIndex];
                distances.push([Math.pow(gene.position.x - this.position.x, 2) + Math.pow(gene.position.y - this.position.y, 2), geneIndex]);
            }

            // this sorts distances in growing order
            distances.sort(function (a, b) {
                return a[0] - b[0];
            });

            // assign the closest target (which is the first in the sorted array)
            if (distances[1]) {
                this.assignNewTarget(genes[distances[1][1]]);
            }
        } else {
            // assign gene pool as target
        }
    }

    if (this.health <= 0) {
        this.dead = true;
        console.log('died');
    }

    this.draw();
};