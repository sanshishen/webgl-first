/**
 * 
 * @date    2018-05-29 14:32:24
 * @version 1.0.0
 */
define(['sim/sim', 'js/static'], function(Sim, STATIC) {
    function Stars() {
        Sim.Object.call(this);
    }
    Stars.prototype = new Sim.Object();
    Stars.prototype.init = function(minDistance) {
        var starsGroup = new THREE.Object3D(),
            i,
            starsGeometry = new THREE.Geometry();
        for (i = 0; i < STATIC.Stars.NVERTICES; i ++) {
            var vector = new THREE.Vector3(
                (Math.random() * 2 - 1) * minDistance,
                (Math.random() * 2 - 1) * minDistance,
                (Math.random() * 2 - 1) * minDistance
            );
            if (vector.length() < minDistance) {
                vector = vector.setLength(minDistance);
            }
            starsGeometry.vertices.push(vector);
        }
        var starsMaterials = [];
        for (i = 0; i < STATIC.Stars.NMATERIALS; i ++) {
            starsMaterials.push(
                new THREE.PointsMaterial({
                    color: 0x101010 * (i + 1),
                    size: i % 2 + 1,
                    sizeAttenuation: false
                })
            );
        }
        for (i = 0; i < STATIC.Stars.NPARTICLESYSTEMS; i ++) {
            var stars = new THREE.Points(starsGeometry, starsMaterials[i % STATIC.Stars.NMATERIALS]);
            stars.rotation.y = i / (Math.PI * 2);
            starsGroup.add(stars);
        }
        this.setObject3D(starsGroup);
    };
    return Stars;
});