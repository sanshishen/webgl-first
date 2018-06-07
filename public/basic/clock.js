/**
 * clock
 * 示例转自WebGL中文网(http://www.hewebgl.com)
 * @date    2018-06-06 11:17:02
 * @version 1.0.0
 */
var canvas;
function CanvasObject() {
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.borderWidth = 2;
    this.borderColor = '#000000';
    this.fill = false;
    this.fillColor = '#ff0000';
    this.update = function() {
        if (!this.ctx) {
            throw new Error('你没有指定context对象。');
        }
        var ctx = this.ctx;
        ctx.save();
        ctx.lineWidth = this.borderWidth;
        ctx.strokeStyle = this.borderColor;
        ctx.fillStyle = this.fillColor;
        ctx.translate(this.x, this.y);
        if (this.rotation) {
            ctx.rotate(this.rotation * Math.PI / 180);
        }
        this.draw && this.draw(ctx);
        this.fill && ctx.fill();
        ctx.stroke();
        ctx.restore();
    };
}
function Line() {};
Line.prototype = new CanvasObject();
Line.prototype.fill = false;
Line.prototype.start = [0, 0];
Line.prototype.end = [5, 5];
Line.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.moveTo.apply(ctx, this.start);
    ctx.lineTo.apply(ctx, this.end);
    ctx.closePath();
};
function Circle() {};
Circle.prototype = new CanvasObject();
Circle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
};
function clock() {
    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    // document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d'),
        timerId,
        frameRate = 60;

    // 表盘
    var circle = new Circle();
    circle.ctx = ctx;
    circle.x = 64;
    circle.y = 64;
    circle.radius = 60;
    circle.fill = true;
    circle.borderWidth = 1.5;
    circle.borderColor = '#333333';
    circle.fillColor = '#ffffff';

    // 小时
    var hour = new Line();
    hour.ctx = ctx;
    hour.x = 64;
    hour.y = 64;
    hour.borderColor = '#333333';
    hour.borderWidth = 3;
    hour.rotation = 0;
    hour.start = [0, 10];
    hour.end = [0, -25];

    // 分钟
    var minute = new Line();
    minute.ctx = ctx;
    minute.x = 64;
    minute.y = 64;
    minute.borderColor = '#333333';
    minute.borderWidth = 3;
    minute.rotation = 0;
    minute.start = [0, 10];
    minute.end = [0, -35];

    // 秒
    var second = new Line();
    second.ctx = ctx;
    second.x = 64;
    second.y = 64;
    second.borderColor = '#ff0000';
    second.borderWidth = 2;
    second.rotation = 0;
    second.start = [0, 10];
    second.end = [0, -45];

    // 中心
    var center = new Circle();
    center.ctx = ctx;
    center.x = 64;
    center.y = 64;
    center.radius = 3;
    center.fill = true;
    center.borderColor = 'orange';

    // 刻度
    var scales = [];
    for (var i = 0; i < 12; i ++) {
        var scale = new Line();
        scale.ctx = ctx;
        scale.x = 64;
        scale.y = 64;
        scale.borderColor = 'orange';
        scale.borderWidth = 1;
        scale.rotation = i * 30;
        scale.start = [0, -45];
        scale.end = [0, -50];
        scales.push(scale);
    }

    timerId = setInterval(function() {
        // 清除画布
        ctx.clearRect(0, 0, 128, 128);
        // 填充背景色
        ctx.fillStyle = 'orange';
        ctx.fillRect(0, 0, 128, 128);
        // 表盘
        circle.update();
        // 刻度
        for (var i = 0; i < scales.length; i ++) {
            scales[i].update();
        }
        var now = new Date();
        // 时针
        hour.rotation = now.getHours() * 30;
        hour.update();
        // 分针
        minute.rotation = now.getMinutes() * 6;
        minute.update();
        // 秒针
        second.rotation = now.getSeconds() * 6;
        second.update();
        // 中心圆
        center.update();
    }, (1000 / frameRate) | 0);
}