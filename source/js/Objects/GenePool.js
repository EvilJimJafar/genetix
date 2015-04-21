Genetix.Objects.GenePool = function(x, y) {
    this.position = {
        x: x,
        y: y
    };

    this.type = 'genePool';

    /**
     * GenePools spin - this is the current angle of rotation
     * @type {number}
     */
    this.rotationAngle = 0;

    /**
     * The genes currently contained in the pool (if any)
     * @type {number}
     */
    this.genes = [];
};

/**
 * Adds a gene to the pool
 * @param {Genetix.Objects.Gene} gene
 */
Genetix.Objects.GenePool.prototype.addGene = function (gene) {
    this.genes.push(gene);
};

Genetix.Objects.GenePool.prototype.draw = function () {
    var ctx = Genetix.Core.Renderer.getContext();
    ctx.save();
    ctx.globalAlpha = 1;

    //ctx.shadowColor = "rgba(140,210,250,1)";
    //ctx.shadowBlur = 10;

    ctx.strokeStyle = 'rgba(255,255,252,0.3)';
    ctx.lineWidth = 1;

    var currentAngle = this.rotationAngle;
    var newAngle = 0;
    for (var i=0; i<60; i++) {
        newAngle = currentAngle + (Genetix.Constants.circle / 60);
        if(i % 2 > 0) {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 50, currentAngle, newAngle);
            ctx.stroke();
            ctx.closePath();
        }
        currentAngle = newAngle;
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,252,0.1)';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 20, 0, Genetix.Constants.circle);
    ctx.stroke();
    ctx.closePath();

    this.rotationAngle += 0.01;
    if(this.rotationAngle > Genetix.Constants.circle) {
        this.rotationAngle = 0;
    }

    ctx.fillStyle = 'rgba(255,255,252,1)';
    ctx.font='10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.genes.length,this.position.x,this.position.y+3);

    ctx.restore();
};

Genetix.Objects.GenePool.prototype.update = function() {
    this.draw();
};