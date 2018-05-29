/**
 * 静态变量定义
 * @date    2018-05-19 17:54:46
 * @version 1.0.0
 */
define(function() {
    var Earth = {
        ROTATION_Y: 0.001,
        ROTATION_Y1: 0.003,
        TILT: 0.41,
        RADIUS: 6371,
        CLOUDS_SCALE: 1.005,
        CLOUDS_ROTATION_FACTOR: 0.95
    }, Moon = {
        DISTANCE_FROM_EARTH: 356400,
        PERIOD: 28,
        EXAGGERATE_FACTOR: 1.2,
        INCLINATION: 0.089,
        ROTATION_SPEED: 0.003
    }, Planet = {
        REVOLUTION_Y: 0.003
    }, Orbit = {
        N_SEGMENTS: 120
    }, Saturn = {
        TILT: -0.466,
        REVOLUTION_Y: 0.003
    }, Sun = {
        SIZE_IN_EARTHS: 100
    }, Stars = {
        NVERTICES: 667,
        NMATERIALS: 8,
        NPARTICLESYSTEMS: 24
    }, SolarSystemApp = {
        EARTH_DISTANCE: 50,
        PLUTO_DISTANCE_IN_EARTHS: 77.2,
        MOUSE_MOVE_TOLERANCE: 4,
        MAX_ROTATION_X: Math.PI / 2,
        MIN_CAMERA_Z: Sun.SIZE_IN_EARTHS * 3,
        MAX_CAMERA_Z: Sun.SIZE_IN_EARTHS * 50
    };

    Earth.CLOUDS_ROTATION_Y = Earth.ROTATION_Y * 0.95;

    Moon.SIZE_IN_EARTHS = 1 / 3.7 * Moon.EXAGGERATE_FACTOR;

    return {
        Earth: Earth,
        Moon: Moon,
        Planet: Planet,
        Orbit: Orbit,
        Saturn: Saturn,
        Sun: Sun,
        Stars: Stars,
        SolarSystemApp: SolarSystemApp
    };
});