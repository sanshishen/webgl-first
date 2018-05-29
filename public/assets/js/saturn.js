/**
 * 创建土星
 * @date    2018-05-29 11:02:16
 * @version 1.0.0
 */
define(['sim/sim', 'js/static', 'js/saturn-rings'], function(Sim, STATIC, SaturnRings) {
    function Saturn() {
        Sim.Object.call(this);
    }
    Saturn.prototype = new Sim.Object();
    Saturn.prototype.init = function(param) {
        param = param || {};
        // 创建一个轨道组来模拟轨道，这是最高层级的土星组
        var planetOrbitGroup = new THREE.Object3D();
        // 设置当前3d对象
        this.setObject3D(planetOrbitGroup);

        // 创建一个组包含土星和云网格
        var planetGroup = new THREE.Object3D(),
            distance = param.distance || 0,
            distsquared = distance * distance;
        planetGroup.position.set(Math.sqrt(distsquared / 2), 0, -Math.sqrt(distsquared / 2));
        planetOrbitGroup.add(planetGroup);
        this.planetGroup = planetGroup;

        var size = param.size || 1;
        this.planetGroup.scale.set(size, size, size);
        this.planetGroup.rotation.x = STATIC.Saturn.TILT;

        this.createGlobe();
        this.createRings();

        this.animateOrbit = param.animateOrbit;
        this.period = param.period;
        this.revolutionSpeed = param.revolutionSpeed ? param.revolutionSpeed : STATIC.Saturn.REVOLUTION_Y;
    };
    Saturn.prototype.createGlobe = function() {
        var saturnMap = '/assets/images/saturn_bjoernjonsson.jpg',
            geometry = new THREE.SphereGeometry(1, 32, 32),
            texture = new THREE.TextureLoader().load(saturnMap),
            material = new THREE.MeshPhongMaterial({map: texture}),
            globeMesh = new THREE.Mesh(geometry, material);
        this.planetGroup.add(globeMesh);
        this.globeMesh = globeMesh;
    };
    Saturn.prototype.createRings = function() {
        var ringsMap = '/assets/images/SatRing.png',
            geometry = new SaturnRings(1.1, 1.867, 64),
            texture = new THREE.TextureLoader().load(ringsMap),
            material = new THREE.MeshLambertMaterial({map: texture, transparent: true, color: 0xffffff}),
            ringsMesh = new THREE.Mesh(geometry, material);
        ringsMesh.doubleSided = true;
        ringsMesh.rotation.x = Math.PI / 2;

        this.planetGroup.add(ringsMesh);
        this.ringsMesh = ringsMesh;
    };
    Saturn.prototype.update = function() {
        if (this.animateOrbit) {
            this.object3D.rotation.y += this.revolutionSpeed / this.period;
        }
        Sim.Object.prototype.update.call(this);
    };
    return Saturn;
});