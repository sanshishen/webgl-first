/**
 * 月球
 * @date    2018-05-18 17:51:46
 * @version 1.0.0
 */
define(['sim/sim'], function (Sim) {
    var Moon = function() {
        Sim.Object.call(this);
    };

    Moon.prototype = new Sim.Object();

    Moon.prototype.init = function() {
        var moonMap = '/assets/images/moon_1024.jpg';
    };

    Moon.DISTANCE_FROM_EARTH = 356400;
    Moon.PERIOD = 28;
    Moon.EXAGGERATE_FACTOR = 1.2;
    Moon.INCLINATION = 0.089;
    Moon.SIZE_IN_EARTHS = 1 / 3.7 * Moon.EXAGGERATE_FACTOR;

    return Moon;
});