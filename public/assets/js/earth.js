/**
 * 地球
 * @date    2018-05-26 16:28:02
 * @version 1.0.0
 */
define(['sim/sim', 'js/static', 'js/orbit'], function(Sim, STATIC, Orbit) {
    function Moon() {
        Sim.Object.call(this);
    }
    Moon.prototype.init = function(param) {
        param = param || {};
        this.rotationSpeed = param.rotationSpeed || STATIC.Moon.ROTATION_SPEED;
        var size = param.size || 1,
            // 创建一个组，用以包含月球和轨道
            moonGroup = new THREE.Object3D(),
            moonMap = '/assets/images/moon_1024.jpg',
            geometry = new THREE.SphereGeometry(STATIC.Moon.SIZE_IN_EARTHS * size, 32, 32),
            texture = new THREE.TextureLoader().load(moonMap),
            material = new THREE.MeshPhongMaterial({
                map: texture,
                color: 0x888888
            }),
            mesh = new THREE.Mesh( geometry, material );
        // 转换成地球尺度的单位（把地球当做单位球体）
        var distance = STATIC.Moon.DISTANCE_FROM_EARTH / STATIC.Earth.RADIUS,
            distsquared = distance * distance;
        mesh.position.set(Math.sqrt(distsquared / 2), 0, -Math.sqrt(distsquared / 2));
        moonGroup.add(mesh);

        this.setObject3D(moonGroup);
    };
    Moon.prototype.update = function() {
        this.object3D.rotation.y += this.rotationSpeed;
        Sim.Object.prototype.update.call(this);
    };

    function Earth () {
        Sim.Object.call(this);
    }

    Earth.prototype = new Sim.Object();

    Earth.prototype.init = function(param) {
        param = param || {};
        this.animateOrbit = param.animateOrbit || false;
        this.animateRotation = param.animateRotation || false;
        this.period = param.period;
        this.revolutionSpeed = param.revolutionSpeed ? param.revolutionSpeed : STATIC.Earth.ROTATION_Y1;
        this.rotationSpeed = this.revolutionSpeed * 365 / 2;
        this.cloudsRotationSpeed = this.rotationSpeed * STATIC.Earth.CLOUDS_ROTATION_FACTOR;

        var earthOrbitGroup = new THREE.Object3D();
        this.setObject3D(earthOrbitGroup);

        var earthGroup = new THREE.Object3D(),
            distance = param.distance || 0,
            distsquared = distance * distance;
        earthGroup.position.set(Math.sqrt(distsquared / 2), 0 -Math.sqrt(distsquared / 2));
        earthOrbitGroup.add(earthGroup);
        this.earthGroup = earthGroup;

        var size = param.size || 1;
        this.earthGroup.scale.set(size, size, size);

        if (param.hires) {
            this.createPhongMetrialGlobe();
            this.createClouds();
        } else {
            this.createLitGlobe();
        }

        this.createMoon(size, distance, this.rotationSpeed / STATIC.Moon.PERIOD);

        if (param.showOrbit) {
            this.createMoonOrbit(distance, size);
        }
    };
    Earth.prototype.createPhongMetrialGlobe = function() {
        // 创建多重纹理，包括一张用于高度图的法线贴图和一张高亮贴图
        var surfaceMap = new THREE.TextureLoader().load( '/assets/images/earth_surface_2048.jpg' ),
            normalMap = new THREE.TextureLoader().load( '/assets/images/earth_normal_2048.jpg' ),
            specularMap = new THREE.TextureLoader().load( '/assets/images/earth_specular_2048.jpg' );

        var material = new THREE.MeshPhongMaterial({
            map: surfaceMap,
            normalMap: normalMap,
            specularMap: specularMap
        });

        var globeGeometry = new THREE.SphereGeometry( 1, 32, 32 );

        var globeMesh = new THREE.Mesh( globeGeometry, material );

        // 倾斜地球
        globeMesh.rotation.z = STATIC.Earth.TILT;

        // 添加到群组中
        this.earthGroup.add(globeMesh);

        // 保存之后就可以旋转了
        this.globeMesh = globeMesh;
    };
    Earth.prototype.createLitGlobe = function() {
        // 使用纹理创建地球
        var earthMap = '/assets/images/earth_surface_2048.jpg',
            geometry = new THREE.SphereGeometry(1, 32, 32),
            texture = new THREE.TextureLoader().load(earthMap),
            // material = new THREE.MeshBasicMaterial({map: texture}),
            material = new THREE.MeshPhongMaterial( {map: texture} ),
            mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.z = STATIC.Earth.TILT;
        this.earthGroup.add(mesh);
        this.globeMesh = globeMesh;
    };
    Earth.prototype.createClouds = function() {
        // 创建云层
        var cloudsMap = new THREE.TextureLoader().load( '/assets/images/earth_clouds_1024.png' ),
            cloudsMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, map: cloudsMap, transparent: true } );

        var cloudsGeometry = new THREE.SphereGeometry( Earth.CLOUDS_SCALE, 32, 32 ),
            cloudsMesh = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
        cloudsMesh.rotation.z = STATIC.Earth.TILT;

        // 添加到群组
        this.earthGroup.add( cloudsMesh );

        // 保存之后，拿到云层引用，用于后续旋转
        this.cloudsMesh = cloudsMesh;
    };
    Earth.prototype.createMoon = function(size, distance, rotationSpeed) {
        var moon = new Moon();
        moon.init({size: size, distance: distance, rotationSpeed: rotationSpeed});
        this.addChild(moon);
        var distsquared = distance * distance;
        moon.setPosition(Math.sqrt(distsquared / 2), 0, -Math.sqrt(distsquared / 2));
    };
    Earth.prototype.createMoonOrbit = function(distance, size) {
        var moonOrbit = new Orbit();
        moonOrbit.init(STATIC.Moon.DISTANCE_FROM_EARTH / Earth.RADIUS / size);
        this.addChild(moonOrbit);
        var distsquared = distance * distance;
        moonOrbit.setPosition(Math.sqrt(distsquared / 2), 0, -Math.sqrt(distsquared / 2));
    };
    Earth.prototype.update = function() {
        if (this.animateOrbit) {
            this.object3D.rotation.y += this.revolutionSpeed;
        }
        if (this.animateRotation) {
            this.globeMesh.rotation.y += this.rotationSpeed;
            if (this.cloudsMesh) {
                this.cloudsMesh.rotation.y += this.cloudsRotationSpeed;
            }
        }
        Sim.Object.prototype.update.call(this);
    };
    return Earth;
});