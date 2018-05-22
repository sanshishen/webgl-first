/**
 * 地球，月球
 * @date    2018-05-18 17:22:12
 * @version 1.0.0
 */
define(['sim/sim', 'js/earthWithMoon'], function (Sim, Earth) {
    var Sun = function () {
        Sim.Object.call(this);
    };

    Sun.prototype = new Sim.Object();

    Sun.prototype.init = function() {
        // 创建一个点光源照向地球，设置光源位置为屏幕外部偏左一点
        var light = new THREE.PointLight( 0xffffff, 2, 100 );
        light.position.set( -10, 0, 20 );
        this.setObject3D(light);
    };

    var EarthApp = function() {
        Sim.App.call(this);
    };

    EarthApp.prototype = new Sim.App();

    EarthApp.prototype.init = function(param) {
        Sim.App.prototype.init.call(this, param);
        var earth = new Earth();
        earth.init();
        this.addObject(earth);

        var sun = new Sun();
        sun.init();
        this.addObject(sun);
    };

    return EarthApp;
});