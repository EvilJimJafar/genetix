describe('Genetix.Utils.BoxUtil', function() {
    "use strict";

    var box = {
        x: 42,
        y: 63,
        height: 10,
        width: 10
    };

    describe('Top', function() {
        it('should return the Y coordinate of the top of an object', function() {
            expect(Genetix.Utils.BoxUtil.Top(box)).toBe(63);
        });
    });

    describe('Bottom', function() {
        it('should return the Y coordinate of the bottom of an object', function() {
            expect(Genetix.Utils.BoxUtil.Bottom(box)).toBe(73);
        });
    });

    describe('Intersect', function() {
        var box2 = {
            x: 48,
            y: 73,
            height: 10,
            width: 10
        };

        it('should detect when one object\'s TL corner is inside another object', function() {
            expect(Genetix.Utils.BoxUtil.Intersect(box, box2)).toBe(true);
        });
        it('should detect when one object\'s TR corner is inside another object', function() {
            box2.x = 38;
            expect(Genetix.Utils.BoxUtil.Intersect(box, box2)).toBe(true);
        });
        it('should detect when one object\'s BR corner is inside another object', function() {
            box2.y = 63;
            expect(Genetix.Utils.BoxUtil.Intersect(box, box2)).toBe(true);
        });
        it('should detect when one object\'s BL corner is inside another object', function() {
            box2.x = 48;
            expect(Genetix.Utils.BoxUtil.Intersect(box, box2)).toBe(true);
        });
        it('should return false when two objects are not overlapping', function() {
            box2.x = 13;
            expect(Genetix.Utils.BoxUtil.Intersect(box, box2)).toBe(false);
        });
    });
});