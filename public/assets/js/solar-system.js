/**
 * 简单太阳系
 * @date    2018-05-21 17:45:38
 * @version 1.0.0
 */
define(['sim/sim'], function(Sim) {
    var SolarSystemApp = function() {
        Sim.App.call(this);
    };
    SolarSystemApp.prototype = new Sim.App();

    SolarSystemApp.prototype.init = function(container) {
        Sim.App.prototype.init.call(this, container);

        this.plants = [];
        this.orbits = [];
        this.lastX = 0;
        this.lastY = 0;
        this.mouseDown = false;
    };
});