Genetix.Objects.World = (function() {

    return {
        /**
         *
         * @param {Genetix.Organisms.OrganismBase} baseClass
         */
        spawnOrganism: function(baseClass) {
            var angle = Math.random() * fullCircle;
            var radius = Math.max(canvasWidth, canvasHeight) * 0.5;
            var x = Math.cos(angle) * radius + canvasWidth * 0.5;
            var y = Math.sin(angle) * radius + canvasHeight * 0.5;

            Genetix.Core.Engine.addOrganism(new baseClass(x, y, foodEntities));
        },

        /**
         *
         */
        spawnFoodRandomly: function() {
            var canvas = Genetix.Core.Renderer.getCanvas();
            Genetix.Core.Engine.addObject(
                Genetix.World.Food(
                    Genetix.Utils.MathUtil.rand(50, canvas.width - 50),
                    Genetix.Utils.MathUtil.rand(50, canvas.height - 50)
                )
            );
        },

        /**
         *
         * @param x
         * @param y
         */
        spawnFoodAtCoordinates: function(x,y) {
            Genetix.Core.Engine.addObject(Food(x,y));
        }
    };
})();