function Food(x, y) {
    var position = {
        x : x,
        y: y
    }

    var health = 1;
    var healthDivider = health / Food.config.foodSize;

    var nibbled = false;
    var eaten = false;

    var nibble = function () {
        health -= healthDivider;
        nibbled = true;

        // console.log (nibbled);

        if (health <= 0) {
            eaten = true;
        }
    }

    var draw = function (ctx) {
        ctx.save();
        ctx.globalAlpha = health;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(140,210,250,.8)';
        
        ctx.shadowColor = "rgba(140,210,250,1)";
        ctx.shadowBlur = 10;
        ctx.arc(position.x, position.y+2.5, Math.max(health*2, 1), 0, Math.PI * 2, true);

        ctx.fill();
        // ctx.strokeStyle = "rgba(130,210,0,1)";
        // ctx.lineWidth = 1;
        // ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    return {
        position : position,
        draw : draw,
        nibble : nibble,
        wasEaten : function () { return eaten; },
        wasNibbled : function () { return nibbled; }
    }
}

Food.config = {
    foodSize : 10,
    foodValue : 3000
}