/**
 * 地球
 * @date    2018-03-23 21:03:15
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
            material = new THREE.MeshBasicMaterial({map: texture}),
            mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Earth.TILT;
        this.setObject3D(mesh);
    };
    Earth.prototype.update = function() {
        this.object3D.rotation.y += Earth.ROTATION_Y;
    };
    Earth.ROTATION_Y = 0.0025;
    Earth.TILT = 0.41;

    var EarthApp = function() {
        Sim.App.call(this);
    };
    EarthApp.prototype = new Sim.App();
    EarthApp.prototype.init = function(param) {
        Sim.App.prototype.init.call(this, param);
        var earth = new Earth();
        earth.init();
        this.addObject(earth);
    };
    return EarthApp;
});