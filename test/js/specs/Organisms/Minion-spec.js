describe('Genetix.Organisms.Minion', function() {
    var minion = new Genetix.Organisms.Minion(42, 63);

    describe('Constructor', function() {
        it('should set the coordinates based on the arguments provided', function() {
            expect(minion.position.x).toBe(42);
            expect(minion.position.y).toBe(63);
        });
        
        it('should set the default minion properties', function() {
            expect(minion.width).toBe(10);
            expect(minion.height).toBe(10);
            expect(minion.halfwidth).toBe(5);
            expect(minion.halfheight).toBe(5);
            expect(minion.color).toEqual([ 255, 255, 255 ]);
            expect(minion.maxSpeed).toBe(1.5);
            expect(minion.totalHealth).toBe(40000);
            expect(minion.health).toBe(40000);
            expect(typeof minion.genes).toBe('object');
            expect(minion.genes.length).toBe(0);
        });
    });

    describe('draw', function() {
        var context = {
            beginPath: function() {},
            moveTo: function() {},
            lineTo: function() {},
            closePath: function() {},
            stroke: function() {},
            restore: function() {}
        };
        // Mock the OrganismBase draw method
        Genetix.Organisms.OrganismBase.prototype.draw = function() {};
        // Mock the getContext method
        Genetix.Core.Renderer = {
            getContext : function() {
                return context;
            }
        };
        beforeEach(function() {
            spyOn(context, 'beginPath');
            spyOn(context, 'closePath');
            spyOn(context, 'stroke');
            spyOn(Genetix.Organisms.OrganismBase.prototype, 'draw');
        });

        it('should draw something', function() {
            minion.draw();
            expect(context.beginPath).toHaveBeenCalled();
            expect(context.closePath).toHaveBeenCalled();
            expect(context.stroke).toHaveBeenCalled();
            expect(Genetix.Organisms.OrganismBase.prototype.draw).toHaveBeenCalled();
        });
    });
});