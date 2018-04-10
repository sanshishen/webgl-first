/**
 * 
 * @date    2018-03-23 21:03:15
 * @version 1.0.0
 */
define(['sim/app', 'sim/baseObject'], function (App, BaseObject) {
    var Earth = function() {
        BaseObject.call(this);
    };
    Earth.prototype = new BaseObject();
    Earth.prototype.init = function() {
        // 使用纹理创建地球
        
    };
});