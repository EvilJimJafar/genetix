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

    if (this.target) {
        var proximity = Genetix.Utils.MathUtil.getProximity(this.target, this);
        if (this.target.type === 'gene') {
            if(this.target.minion || this.target.genePool) {
                this.assignNewTarget(null);
                return;
            }
            if (proximity.d2 < 16) {
                //this.lifeTimer -= this.target.foodValue;
                this.target.grab(this);
                this.genes.push(this.target);
                this.assignNewTarget(null);
            } else {
                this.headTowardsTarget();
            }
        } else if(this.target.type === 'genePool') {
            if (proximity.d2 < 40) {
                var pool = this.target;
                this.genes.forEach(function(gene) {
                    gene.drop(pool);
                });
                this.genes.length = 0;
                this.assignNewTarget(null);
            } else {
                this.headTowardsTarget();
            }
        }
    } else if(this.genes.length < 5) {
        // start looking for another gene
        var genes = Genetix.Core.Engine.genes.filter( function (g) { return !g.minion && !g.genePool; } );

        // If minion doesnt have any target then we have to look for the closest target and assign it
        var closestGene = Genetix.Utils.MathUtil.getClosest(this.position.x, this.position.y, genes);
        if(closestGene) {
            this.assignNewTarget(closestGene);
        } else if(this.genes.length > 0) {
            // take the genes to a gene pool
            var closestPool = Genetix.Utils.MathUtil.getClosest(this.position.x, this.position.y, Genetix.Core.Engine.genePools);
            if(closestPool) {
                this.assignNewTarget(closestPool);
            } else {

            }
        }
    } else {
        // take the genes to a gene pool
        var closestPool = Genetix.Utils.MathUtil.getClosest(this.position.x, this.position.y, Genetix.Core.Engine.genePools);
        if(closestPool) {
            this.assignNewTarget(closestPool);
        } else {

        }
    }

    if (this.health <= 0) {
        this.dead = true;
        console.log('died');
    }

    this.draw();
};

Genetix.Organisms.Minion.prototype.headTowardsTarget = function() {
    var currentOrientation = this.orientation;

    Genetix.Organisms.OrganismBase.prototype.headTowardsTarget.call(this, arguments);

    // update positions of carried genes
    var geneCount = this.genes.length;
    for (var i=0; i<geneCount; i++) {
        var offset = ((i+1)*10) + 5;
        var lag = ((this.orientation - currentOrientation) * i);
        this.genes[i].position.x = (this.position.x - (Math.cos(this.orientation-lag) * offset));
        this.genes[i].position.y = (this.position.y - (Math.sin(this.orientation-lag) * offset));
    }
};