Genetix.Objects.Gene = function(x, y) {
    this.position = {
        x: x,
        y: y
    };

    this.type = 'gene';

    /**
     * The minion carrying the gene (if any)
     * @type {Genetix.Organisms.Minion}
     */
    this.minion = null;

    /**
     * The gene pool the gene is at (if any)
     * @type {Genetix.Objects.GenePool}
     */
    this.genePool = null;
};

Genetix.Objects.Gene.prototype.grab = function(minion) {
    this.minion = minion;
};

/**
 * Drops the gene either at a genepool or the current location
 * @param {Genetix.Objects.GenePool} genePool
 */
Genetix.Objects.Gene.prototype.drop = function(genePool) {
    this.minion = null;
    if(genePool) {
        this.genePool = genePool;
        genePool.addGene(this);
    } else {
        this.genePool = null;
    }
};

Genetix.Objects.Gene.prototype.draw = function() {
    if(this.genePool) {
        return;
    }
    var ctx = Genetix.Core.Renderer.getContext();
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,252,1)';

    ctx.shadowColor = "rgba(140,210,250,1)";
    ctx.shadowBlur = 10;
    ctx.arc(this.position.x, this.position.y+2.5, 1, 0, Math.PI * 2, true);

    ctx.fill();
    // ctx.strokeStyle = "rgba(130,210,0,1)";
    // ctx.lineWidth = 1;
    // ctx.stroke();
    ctx.closePath();

    ctx.restore();
};

Genetix.Objects.Gene.prototype.update = function() {
    this.draw();
};