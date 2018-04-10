/**
 * 使用require.js改造sim.js
 * @author  tparisi
 * @date    2018-03-19 23:00:50
 */
define(['jquery'], function ($) {
    var Sim = {
        test: function() {
            console.log('test is right.');
            console.log($('#container').height());
        }
    };
    return Sim;
});