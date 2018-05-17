/**
 * 地球 带光源
 * @date    2018-05-17 16:44:15
 * @version 1.0.0
 */
define(['sim/sim'], function (Sim) {
    var Earth = function() {
        Sim.Object.call(this);
    };

    Earth.prototype = new Sim.Object();

    Earth.prototype.init = function() {
        // 使用纹理创建地球
        var earthMap = '/assets/images/earth_surface_2048.jpg',
            geometry = new THREE.SphereGeometry(1, 32, 32),
            texture = new THREE.TextureLoader().load(earthMap),
            // material = new THREE.MeshBasicMaterial({map: texture}),
            material = new THREE.MeshPhongMaterial( {map: texture} ),
            mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = Earth.TILT;
        this.setObject3D(mesh);
    };

    Earth.prototype.update = function() {
        this.object3D.rotation.y += Earth.ROTATION_Y;
    };

    Earth.ROTATION_Y = 0.0025;
    Earth.TILT = 0.41;

    var Sun = function () {
        Sim.Object.call(this);
    };

    Sun.prototype = new Sim.Object();

    Sun.prototype.init = function() {
        // 创建一个点光源照向地球，设置光源位置为屏幕外部偏左一点
        var light = new THREE.PointLight( 0xffffff, 2, 100 );
        light.position.set( -10, 0, 20 );
        this.setObject3D(light);
    }

    var EarthApp = function() {
        Sim.App.call(this);
    };

    EarthApp.prototype = new Sim.App();

    EarthApp.prototype.init = function(param) {
        // 调用父类的初始化方法设置场景，渲染器，默认相机
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