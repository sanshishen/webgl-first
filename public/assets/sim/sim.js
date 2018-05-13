/**
 * 使用require.js改造sim.js
 * @author  tparisi
 * @date    2018-03-19 23:00:50
 */
define(['sim/app', 'sim/baseObject', 'sim/keyCodes'], function (App, BaseObject, KeyCodes) {
    var Sim = {
        App: App,
        Object: BaseObject,
        KeyCodes: KeyCodes
    };
    return Sim;
});