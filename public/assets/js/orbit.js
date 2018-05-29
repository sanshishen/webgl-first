/**
 * 轨道
 * @date    2018-05-28 21:52:46
 * @version 1.0.0
 */
define(['sim/sim', 'js/static'], function(Sim, STATIC) {
    function Orbit() {
        Sim.Object.call(this);
    }
    Orbit.prototype = new Sim.Object();
    Orbit.prototype.init = function(distance) {
        var geometry = new THREE.Geometry();
        var i, len = 60, twopi = 2 * Math.PI;
        for (i = 0; i < STATIC.Orbit.N_SEGMENTS; i ++) {
            var x = distance * Math.cos(i / STATIC.Orbit.N_SEGMENTS * twopi),
                z = distance * Math.sin(i / STATIC.Orbit.N_SEGMENTS * twopi),
                vector = new THREE.Vector3(x, 0, z);
            geometry.vertices.push(vector);
        }
        var material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: .5,
            linewidth: 2
        });
        var line = new THREE.Line( geometry, material );
        this.setObject3D(line);
    };
    return Orbit;
});