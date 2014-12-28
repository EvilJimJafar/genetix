function Hawk (x, y) {
    var position = {
        x: x,
        y: y
    };

    var speed = Hawk.config.maxSpeed;
    var turnSpeed = fullCircle / 100;
    var orientation = 0;
    var width = 10
    var height = 6;
    var target = null;
    var lifeTimer = 0; 
    var health = 0;
    var dead = false;

    function draw(ctx) {
        ctx.save();

        ctx.translate(position.x, position.y);
        ctx.rotate(orientation);
        ctx.globalAlpha = Math.max (health, 0);
        //ctx.fillStyle = "rgba(0,0,0,.8)";
        ctx.strokeStyle = "rgba(242,108,79,1)";
        ctx.lineWidth = 1;
        // ctx.shadowColor = "rgba(140,180,50,1)";
        // ctx.shadowBlur = 3;  
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, height*.5);
        ctx.lineTo(0, height);
        ctx.lineTo(width*.1, height*.5);
        ctx.closePath();
        ctx.stroke();
        // ctx.fill();

      
        ctx.restore();

    }

    function assignNewTarget(newTarget) {
        target = newTarget;
    }

    function update(elapsed) {

        lifeTimer += elapsed;
        var timeToDie = Hawk.config.maxSpeed/Hawk.config.totalHealth;
        
        health = 1 - (lifeTimer * timeToDie);
        speed = Math.min (Hawk.config.maxSpeed - (lifeTimer * timeToDie), Hawk.config.maxSpeed);
        // console.log (health);

        if (dead) {
            return;
        }

        var nibbleTimer = 0;

        if (target != null && !target.wasEaten()) {
            var y = target.position.y - position.y;
            var x = target.position.x - position.x;
            var d2 = Math.pow(x, 2) + Math.pow(y, 2);
       

            if (d2 < 16) {
                lifeTimer -= Food.config.foodValue;
                target.nibble();
                assignNewTarget();

            } else {

                var angle = Math.atan2(y, x);
                var delta = angle - orientation;
                var delta_abs = Math.abs(delta);

                if (delta_abs > Math.PI) {
                    delta = delta_abs - fullCircle;
                }

                if (delta !== 0) {
                    var direction = delta / delta_abs;
                    orientation += (direction * Math.min(turnSpeed, delta_abs));
                }
                orientation %= fullCircle;

                position.x += Math.cos(orientation) * speed;
                position.y += Math.sin(orientation) * speed;
            }

        }
        else {
            // Hawk will do something esle when there's no food to look for
        }
        
        if (health <= 0) {
            dead = true;
        }



    }

    

    return {
        draw: draw,
        update: update,
        position : position,
        assignNewTarget : assignNewTarget,

        isDead : function () { return dead; },
        hasTarget : function () { return !(target == null || target.wasEaten()); }
    }
}

Hawk.config = {
    totalHealth : 20000,
    maxSpeed : 1.5
}