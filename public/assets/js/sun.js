/**
 * sun
 * @date    2018-05-29 11:59:17
 * @version 1.0.0
 */
define(['sim/sim', 'js/static'], function(Sim, STATIC) {
    function Sun() {
        Sim.Object.call(this);
    }
    Sun.prototype = new Sim.Object();
    Sun.prototype.init = function() {
        var sunGroup = new THREE.Object3D(),
            sunMap = '/assets/images/sun_surface.jpg',
            texture = new THREE.TextureLoader().load(sunMap),
            material = new THREE.MeshLambertMaterial({map: texture, color: 0xffff00}),
            geometry = new THREE.SphereGeometry(STATIC.Sun.SIZE_IN_EARTHS, 64, 64),
            sunMesh = new THREE.Mesh(geometry, material);

        var light = new THREE.PointLight(0xffffff, 1.2, 1000);

        sunGroup.add(sunMesh);
        sunGroup.add(light);

        this.setObject3D(sunGroup);
        /* var sunGroup = new THREE.Object3D();

        var SUNMAP = '/assets/images/lavatile.jpg',
            NOISEMAP = '/assets/images/cloud.png',
            textureLoader = new THREE.TextureLoader(),
            uniforms = {
                time: { type: 'f', value: 1.0 },
                texture1: { type: 'f', value: 0, texture: textureLoader.load(NOISEMAP) },
                texture2: { type: 'f', value: 1, texture: textureLoader.load(SUNMAP) }
            };
        uniforms.texture1.texture.wrapS = uniforms.texture1.texture.wrapT = THREE.Repeat;
        uniforms.texture2.texture.wrapS = uniforms.texture2.texture.wrapT = THREE.Repeat;

        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.querySelector('#vertexShader').textContent,
            fragmentShader: document.querySelector('#fragmentShader').textContent
        });

        var geometry = new THREE.SphereGeometry(STATIC.Sun.SIZE_IN_EARTHS, 64, 64),
            sunMesh = new THREE.Mesh(geometry, material);

        this.uniforms = uniforms;

        // 开启一个时钟驱动动画
        this.clock = new THREE.Clock();

        var light = new THREE.PointLight(0xffffff, 1.2, 100000);

        sunGroup.add(sunMesh);
        sunGroup.add(light);

        this.setObject3D(sunGroup); */
    };
    Sun.prototype.update = function() {
        /* var delta = this.clock.getDelta();

        this.uniforms.time.value += delta; */

        Sim.Object.prototype.update.call(this);

        this.object3D.rotation.y -= 0.001;
    };
    return Sun;
})