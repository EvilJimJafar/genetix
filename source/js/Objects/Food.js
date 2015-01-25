Genetix.Objects.Food = function(x, y) {
    this.position = {
        x: x,
        y: y
    };

    this.foodSize = 10;
    this.foodValue = 3000;
    this.health = 1;
    this.healthDivider = this.health / this.foodSize;

    this.wasNibbled = false;
    this.wasEaten = false;
};

Genetix.Objects.Food.prototype.nibble = function () {
    this.health -= this.healthDivider;
    this.wasNibbled = true;

    // console.log (nibbled);

    if (this.health <= 0) {
        this.wasEaten = true;
    }
};

Genetix.Objects.Food.prototype.draw = function () {
    var ctx = Genetix.Core.Renderer.getContext();
    ctx.save();
    ctx.globalAlpha = this.health;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(140,210,250,.8)';

    ctx.shadowColor = "rgba(140,210,250,1)";
    ctx.shadowBlur = 10;
    ctx.arc(this.position.x, this.position.y+2.5, Math.max(this.health*2, 1), 0, Math.PI * 2, true);

    ctx.fill();
    // ctx.strokeStyle = "rgba(130,210,0,1)";
    // ctx.lineWidth = 1;
    // ctx.stroke();
    ctx.closePath();

    ctx.restore();
};

Genetix.Objects.Food.prototype.update = function() {
    this.draw();
};