/**
 * 静态变量定义
 * @date    2018-05-19 17:54:46
 * @version 1.0.0
 */
define(function() {
    var Earth = {
        ROTATION_Y: 0.001,
        TILT: 0.41,
        RADIUS: 6371,
        CLOUDS_SCALE: 1.005
    };
    Earth.CLOUDS_ROTATION_Y = Earth.ROTATION_Y * 0.95;

    var Moon = {
        DISTANCE_FROM_EARTH: 356400,
        PERIOD: 28,
        EXAGGERATE_FACTOR: 1.2,
        INCLINATION: 0.089
    };
    Moon.SIZE_IN_EARTHS = 1 / 3.7 * Moon.EXAGGERATE_FACTOR;

    var Planet = {
        REVOLUTION_Y: 0.003
    };

    return {
        Earth: Earth,
        Moon: Moon,
        Planet: Planet
    };
});