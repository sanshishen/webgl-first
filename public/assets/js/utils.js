/**
 * 通用函数，重复利用
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2018-03-11 16:34:24
 * @version 1.0.0
 */
/**
 * 初始化webgl，返回上下文
 * @param {Element} 画布元素
 */
function initWebGL(canvas) {
    var gl;
    try {
        gl = canvas.getContext('experimental-webgl');
    } catch (error) {
        var msg = 'Error creating WebGL Context!: ' + error.toString();
        alert(msg);
        throw Error(msg);
    }
    return gl;
}
/**
 * 初始化视口
 * @param {Object} gl webgl绘制上下文
 * @param {Element} canvas 画布元素
 */
function initViewport(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
}
/**
 * 创建一个着色器
 * @param {Object} gl 上下文
 * @param {String} str 着色器代码字符串
 * @param {String} type 着色器类型
 */
function createShader(gl, str, type) {
    var shader;
    if (type === 'fragment') {
        // 片元着色器，或像素着色器
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type === 'vertex') {
        // 顶点着色器
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}
// requestAnimationFrame
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };
    })();
}