/**
 * 土星环
 * @date    2018-05-20 16:32:31
 * @version 1.0.0
 */
define(function() {
    function SaturnRings( innerRadius, outerRadius, nSegments ) {
        THREE.Geometry.call(this);

        var outerRadius = outerRadius || 1,
            innerRadius = outerRadius || .5,
            gridY = nSegments || 10;

        var i, twopi = 2 * Math.PI,
            iVer = Math.max(2, gridY);

        var origin = new THREE.Vector3(0, 0, 0);

        for( i = 0; i < (iVer + 1); i++ ) {
            var fRad1 = i / iVer,
                fRad2 = (i + 1) / iVer,
                fX1 = innerRadius * Math.cos( fRad1 * twopi ),
                fY1 = innerRadius * Math.sin( fRad1 * twopi ),
                fX2 = outerRadius * Math.cos( fRad1 * twopi ),
                fY2 = outerRadius * Math.sin( fRad1 * twopi ),
                fX4 = innerRadius * Math.cos( fRad2 * twopi ),
                fY4 = innerRadius * Math.sin( fRad2 * twopi ),
                fX3 = outerRadius * Math.cos( fRad2 * twopi ),
                fY3 = outerRadius * Math.sin( fRad2 * twopi );

            var v1 = new THREE.Vector3( fX1, fY1, 0 ),
                v2 = new THREE.Vector3( fX2, fY2, 0 ),
                v3 = new THREE.Vector3( fX3, fY3, 0 ),
                v4 = new THREE.Vector3( fX4, fY4, 0 );

            this.vertices.push( v1 );
            this.vertices.push( v2 );
            this.vertices.push( v3 );
            this.vertices.push( v4 );
        }
        
        for (i = 0; i < iVer; i ++) {
            this.faces.push( new THREE.Face3( i * 4, i * 4 + 1, i * 4 + 2 ) );
            this.faces.push( new THREE.Face3( i * 4, i * 4 + 2, i * 4 + 3 ) );
            this.faceVertexUvs[ 0 ].push([
                new THREE.Vector2(0, 1),
                new THREE.Vector2(1, 1),
                new THREE.Vector2(1, 0)
            ]);
            this.faceVertexUvs[ 0 ].push([
                new THREE.Vector2(0, 1),
                new THREE.Vector2(1, 1),
                new THREE.Vector2(0, 0)
            ]);
        }
        // this.computeCentroids();
        this.center();
        this.computeFaceNormals();

        // this.boundingSphere = { radius: outerRadius };
    }

    SaturnRings.prototype = new THREE.Geometry();
    SaturnRings.prototype.contructor = SaturnRings;

    return SaturnRings;
});