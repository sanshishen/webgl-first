/**
 * 星球，基类
 * @date    2018-05-21 21:44:31
 * @version 1.0.0
 */
define(['sim/sim', 'js/static'], function(Sim, STATIC) {
    var Planet = function() {
        Sim.Object.call(this);
    };

    Planet.prototype = new Sim.Object();

    Planet.prototype.init = function(param) {
        param = param || {};

        var planetOrbitGroup = new THREE.Object3D();

        this.setObject3D(planetOrbitGroup);

        var planetGroup = new THREE.Object3D(),
            distance = param.distance || 0,
            distsquared = distance * distance;
        planetGroup.position.set(Math.sqrt(distsquared / 2), 0, -Math.sqrt(distsquared / 2));
        planetOrbitGroup.add(planetGroup);

        this.planetGroup = planetGroup;

        var size = param.size || 1;
        this.planetGroup.scale.set(size, size, size);

        var map = param.map;
        this.createGlobe(map);

        this.animateOrbit = param.animateOrbit;
        this.period = param.period;
        this.revolutionSpeed = param.revolutionSpeed ? 
            param.revolutionSpeed : STATIC.Planet.REVOLUTION_Y;
    };

    Planet.prototype.createGlobe = function(map) {
        var geometry = new THREE.SphereGeometry(1, 32, 32),
            texture = new THREE.TextureLoader().load(map),
            material = new THREE.MeshPhongMaterial({map: texture, color: 0x333333}),
            globeMesh = new THREE.Mesh(geometry, material);

        this.planetGroup.add(globeMesh);

        this.globeMesh = globeMesh;
    };

    Planet.prototype.update = function() {
        if (this.animateOrbit) {
            this.object3D.rotation.y += this.revolutionSpeed / this.period;
        }
        Sim.Object.prototype.update.call(this);
    };

    return Planet;
});