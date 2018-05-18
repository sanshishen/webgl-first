/**
 * 地球
 * @date    2018-05-18 17:53:23
 * @version 1.0.0
 */
define(['sim/sim'], function (Sim) {
    var Earth = function() {
        Sim.Object.call(this);
    };

    Earth.prototype = new Sim.Object();

    Earth.prototype.init = function() {
        // 创建一个包含地球和云层的群组
        var earthGroup = new THREE.Object3D();

        // 把对象反馈给框架
        this.setObject3D(earthGroup);

        // 添加地球对象和云层对象
        this.createGlobe();
        this.createClouds();
    };

    Earth.prototype.createGlobe = function() {
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
        globeMesh.rotation.x = Earth.TILT;

        // 添加到群组中
        this.object3D.add(globeMesh);

        // 保存之后就可以旋转了
        this.globeMesh = globeMesh;
    };

    Earth.prototype.createClouds = function() {
        // 创建云层
        var cloudsMap = new THREE.TextureLoader().load( '/assets/images/earth_clouds_1024.png' ),
            cloudsMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, map: cloudsMap, transparent: true } );

        var cloudsGeometry = new THREE.SphereGeometry( Earth.CLOUDS_SCALE, 32, 32 ),
            cloudsMesh = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
        cloudsMesh.rotation.x = Earth.TILT;

        // 添加到群组
        this.object3D.add( cloudsMesh );

        // 保存之后，拿到云层引用，用于后续旋转
        this.cloudsMesh = cloudsMesh;
    };

    Earth.prototype.update = function() {
        // 地球旋转
        this.globeMesh.rotation.y += Earth.ROTATION_Y;

        // 云层旋转
        this.cloudsMesh.rotation.y += Earth.CLOUDS_ROTATION_Y;

        Sim.Object.prototype.update.call(this);
    };

    Earth.ROTATION_Y = 0.001;
    Earth.TILT = 0.41;
    Earth.CLOUDS_SCALE = 1.005;
    Earth.CLOUDS_ROTATION_Y = Earth.ROTATION_Y * 0.95;

    return Earth;
});