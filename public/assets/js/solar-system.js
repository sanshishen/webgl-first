/**
 * 简单太阳系
 * @date    2018-05-21 17:45:38
 * @version 1.0.0
 */
define(['sim/sim', 'js/sun', 'js/stars', 'js/planet', 'js/earth', 'js/saturn', 'js/orbit', 'js/static'], function(Sim, Sun, Stars, Planet, Earth, Saturn, Orbit, STATIC) {
    function SolarSystemApp() {
        Sim.App.call(this);
    };
    SolarSystemApp.prototype = new Sim.App();

    SolarSystemApp.prototype.init = function(container) {
        Sim.App.prototype.init.call(this, container);

        this.planets = [];
        this.orbits = [];
        this.lastX = 0;
        this.lastY = 0;
        this.mouseDown = false;

        var sun = new Sun();
        sun.init();
        this.addObject(sun);

        var stars = new Stars();
        stars.init(STATIC.Sun.SIZE_IN_EARTHS + STATIC.SolarSystemApp.EARTH_DISTANCE * STATIC.SolarSystemApp.PLUTO_DISTANCE_IN_EARTHS);
        this.addObject(stars);

        this.createPlanets();

        this.camera.position.set(0, 0, STATIC.Sun.SIZE_IN_EARTHS * 8);

        var amb = new THREE.AmbientLight(0x676767);
        this.scene.add(amb);

        this.root.rotation.x = Math.PI / 8;
    };
    SolarSystemApp.prototype.handleMouseMove = function(x, y) {
        if (this.mouseDown) {
            var dx = x - this.lastX;
            if (Math.abs(dx) > STATIC.SolarSystemApp.MOUSE_MOVE_TOLERANCE) {
                this.root.rotation.y -= (dx * 0.01);
            }
            this.lastX = x;
            return;
            // TODO == ????
            var dy = y - this.lastY;
            if (Math.abs(dy) > STATIC.SolarSystemApp.MOUSE_MOVE_TOLERANCE) {
                this.root.rotation.x += (dy * 0.01);
                // Clamp to some outer boundary values
                if (this.root.rotation.x < 0)
                    this.root.rotation.x = 0;
                
                if (this.root.rotation.x > STATIC.SolarSystemApp.MAX_ROTATION_X)
                    this.root.rotation.x = STATIC.SolarSystemApp.MAX_ROTATION_X;
                
            }
            this.lastY = y;
        }
    };
    SolarSystemApp.prototype.handleMouseDown = function(x, y) {
        this.lastX = x;
        this.lastY = y;
        this.mouseDown = true;
    };
    SolarSystemApp.prototype.handleMouseUp = function(x, y) {
        this.lastX = x;
        this.lastY = y;
        this.mouseDown = false;
    };
    SolarSystemApp.prototype.handleMouseScroll = function(delta) {
        var dx = delta;
        this.camera.position.z -= dx;
        if (this.camera.position.z < STATIC.SolarSystemApp.MIN_CAMERA_Z) {
            this.camera.position.z = STATIC.SolarSystemApp.MIN_CAMERA_Z;
        }
        if (this.camera.position.z < STATIC.SolarSystemApp.MAX_CAMERA_Z) {
            this.camera.position.z = STATIC.SolarSystemApp.MAX_CAMERA_Z;
        }
    };
    SolarSystemApp.prototype.createPlanets = function() {
        var i, len = SolarSystemApp.planet_specs.length;
        for (i = 0; i < len; i ++) {
            var spec = SolarSystemApp.planet_specs[i],
                planet = spec.type ? new spec.type : new Planet,
                distance = spec.distance * STATIC.SolarSystemApp.EARTH_DISTANCE + STATIC.Sun.SIZE_IN_EARTHS;
            planet.init({
                animateOrbit: true,
                animateRotation: true,
                showOrbit: true,
                distance: distance,
                period: spec.period,
                revolutionSpeed: 0.002,
                map: spec.map
            });
            this.addObject(planet);
            this.planets.push(planet);

            var orbit = new Orbit();
            orbit.init(distance);
            this.addObject(orbit);
            this.orbits.push(orbit);
        }
    };
    SolarSystemApp.planet_specs = [
        // Mercury
        { size : 1 / 2.54, distance : 0.4, period : 0.24, map : "/assets/images/Mercury.jpg" },
        // Venus
        { size : 1 / 1.05, distance : 0.7, period : 0.62, map : "/assets/images/venus.jpg" },
        // Earth
        { type : Earth, size : 1 , distance : 1, period : 1, map : "/assets/images/earth_surface_2048.jpg" },
        // Mars
        { size : 1 / 1.88, distance : 1.6, period : 1.88, map : "/assets/images/MarsV3-Shaded-2k.jpg" },
        // Jupiter
        { size : 11.1, distance : 5.2, period : 11.86, map : "/assets/images/realj2k.jpg" },
        // Saturn
        { type : Saturn, size : 9.41, distance : 10, period : 29.46, map : "/assets/images/saturn_bjoernjonsson.jpg" },
        // Uranus
        { size : 4, distance : 19.6, period : 84.01, map : "/assets/images/uranus.jpg" },
        // Neptune
        { size : 3.88, distance : 38.8, period : 164.8, map : "/assets/images/neptune.jpg" },
        // Pluto
        { size : 10 / 5.55, distance : 77.2, period : 247.7, map : "/assets/images/pluto.jpg" }
    ];
    return SolarSystemApp;
});