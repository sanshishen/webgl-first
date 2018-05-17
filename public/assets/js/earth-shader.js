/**
 * 地球，可自定义着色器的材质 ShaderMaterial
 * @date    2018-03-23 21:03:15
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

        var shader = THREE.ShaderUtils.lib[ 'normal' ],
            uniforms = THREE.UniformsUtils.clone( shader.uniforms );

        uniforms[ 'tNormal' ].texture = normalMap;
        uniforms[ 'tDiffuse' ].texture = surfaceMap;
        uniforms[ 'tSpecular' ].texture = specularMap;

        uniforms[ 'enableDiffuse' ].value = true;
        uniforms[ 'enableSpecular' ].value = true;

        // TODO ==
    };

    Earth.prototype.createClouds = function() {};

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