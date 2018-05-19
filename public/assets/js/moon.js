/**
 * 月球
 * @date    2018-05-18 17:51:46
 * @version 1.0.0
 */
define(['sim/sim', 'js/static'], function (Sim, STATIC) {
    var Moon = function() {
        Sim.Object.call(this);
    };

    Moon.prototype = new Sim.Object();

    Moon.prototype.init = function() {
        var moonMap = '/assets/images/moon_1024.jpg',
            geometry = new THREE.SphereGeometry(STATIC.Moon.SIZE_IN_EARTHS, 32, 32),
            texture = new THREE.TextureLoader().load(moonMap),
            material = new THREE.MeshPhongMaterial({
                map: texture,
                color: 0x888888
            }),
            mesh = new THREE.Mesh( geometry, material );

        // 转换成地球尺度的单位（把地球当做单位球体）
        var distance = STATIC.Moon.DISTANCE_FROM_EARTH / STATIC.Earth.RADIUS;
        mesh.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));

        // 旋转月球，让它的一个面始终朝向地球
        mesh.rotation.y = Math.PI;

        // 创建一个群组来容纳地球和月球
        var moonGroup = new THREE.Object3D();
        moonGroup.add(mesh);

        // 向黄道面倾斜
        moonGroup.rotation.x = STATIC.Moon.INCLINATION;

        // 将对象反馈给框架
        this.setObject3D(moonGroup);

        // 保存月球网格
        this.moonMesh = mesh;
    };

    Moon.prototype.update = function() {
        // 月球轨道
        this.object3D.rotation.y += (STATIC.Earth.ROTATION_Y / STATIC.Moon.PERIOD);

        Sim.Object.prototype.update.call(this);
    };

    return Moon;
});