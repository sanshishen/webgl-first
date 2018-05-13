/**
 * application class
 * @date    2018-03-20 14:06:26
 * @version 1.0.0
 */
define(['sim/publisher', 'jquery', 'jquery.mousewheel'], function (Publisher, $) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function() {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) { window.setTimeout(callback, 1000 / 60); };
        })();
    }
    var App = function () {
        Publisher.call(this);

        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.objects = [];
    };
    App.prototype = new Publisher;
    App.prototype.init = function(param) {
        param = param || {};

        var container = param.container,
            canvas = param.canvas;
        // 创建渲染器
        var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
        renderer.setSize( container.offsetWidth, container.offsetHeight );
        container.appendChild( renderer.domElement );
        // 创建一个新的场景
        var scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0x505050));
        scene.data = this;

        // 创建相机，放在一个合适的默认位置
        var camera = new THREE.PerspectiveCamera(45,
                container.offsetWidth / container.offsetHeight, 1, 10000);
        camera.position.set(0, 0, 3.3333);

        scene.add(camera);

        // 创建一个根对象，包含所有其他场景对象
        var root = new THREE.Object3D();
        scene.add(root);

        // 创建一个投影（坐标转换？），用于处理拖拽
        // var projector = new THREE.Projector();

        // 保存实例对象
        this.container = container;
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        // this.projector = projector;
        this.root = root;

        // 开启事件处理
        this.initMouse();
        this.initKeyboard();
        this.addDomHandlers();
    };
    // 核心运行循环
    App.prototype.run = function() {
        this.update();
        this.renderer.render(this.scene, this.camera);
        var self = this;
        requestAnimationFrame(function () { self.run(); });
    };
    App.prototype.update = function() {
        var i, len = this.objects.length;
        for (i = 0; i < len; i ++) {
            this.objects[i].update();
        }
    };
    // 添加对象
    App.prototype.addObject = function (obj) {
        this.objects.push(obj);
        // 如果它是一个可渲染的对象，则将它添加到根场景中
        if (obj.object3D) {
            this.root.add(obj.object3D);
        }
    };
    // 移除对象
    App.prototype.removeObject = function (obj) {
        var index = this.objects.indexOf(obj);
        if (index != -1) {
            this.objects.splice(index, 1);
            // 如果它是一个可渲染的对象，则从根场景中移除
            if (obj.object3D) {
                this.root.remove(obj.object3D);
            }
        }
    };
    // 事件处理
    App.prototype.initMouse = function () {
        var dom = this.renderer.domElement,
            self = this;
        dom.addEventListener('mousemove', function(e) { self.onDocumentMouseMove(e); }, false);
        dom.addEventListener('mousedown', function(e) { self.onDocumentMouseDown(e); }, false);
        dom.addEventListener('mouseup', function(e) { self.onDocumentMouseUp(e); }, false);

        $(dom).mousewheel(function (e, delta) {
            self.onDocumentMouseScroll(e, delta);
        });
    };
    App.prototype.initKeyboard = function () {
        var dom = this.renderer.domElement,
            self = this;
        dom.addEventListener('keydown', function(e) { self.onKeyDown(e); }, false);
        dom.addEventListener('keyup', function(e) { self.onKeyUp(e); }, false);
        dom.addEventListener('keypress', function(e) { self.onKeyPress(e); }, false);

        // so it can take focus
        dom.setAttribute('tabindex', 1);
        dom.style.outline = 'none';
    };
    App.prototype.addDomHandlers = function () {
        var self = this;
        window.addEventListener('resize', function(event) {
            self.onWindowResize(event);
        }, false);
    };
    App.prototype.onDocumentMouseMove = function(event) {
        event.preventDefault();
        if (this.clickedObject && this.clickedObject.handleMouseMove) {
            var hitpoint = null,
                hitnormal = null,
                intersected = this.objectFromMouse(event.pageX, event.pageY);
            if (intersected.object == this.clickedObject) {
                hitpoint = intersected.point;
                hitnormal = intersected.normal;
            }
            this.clickedObject.handleMouseMove(event.pageX, event.pageY, hitpoint, hitnormal);
        } else {
            var handled = false,
                oldObj = this.overObject,
                intersected = this.objectFromMouse(event.pageX, event.pageY);
            this.overObject = intersected.object;

            if (this.overObject != oldObj) {
                if (oldObj) {
                    this.container.style.cursor = 'auto';
                    if (oldObj.handleMouseOut) {
                        oldObj.handleMouseOut(event.pageX, event.pageY);
                    }
                }
                if (this.overObject) {
                    if (this.overObject.overCursor) {
                        this.container.style.cursor = this.overObject.overCursor;
                    }
                    if (this.overObject.handleMouseOver) {
                        this.overObject.handleMouseOver(event.pageX, event.pageY);
                    }
                }
                handled = true;
            }
            if (!handled && this.handleMouseMove) {
                this.handleMouseMove(event.pagex, event.pageY);
            }
        }
    };
    App.prototype.onDocumentMouseDown = function(event) {
        event.preventDefault();
        var handled = false,
            intersected = this.objectFromMouse(event.pageX, event.pageY);
        if (intersected.object) {
            if (intersected.object.handleMouseDown) {
                intersected.object.handleMouseDown(event.pageX, event.pageY, intersected.point, intersected.normal);
                this.clickedObject = intersected.object;
                handled = true;
            }
        }
        if (!handled && this.handleMouseDown) {
            this.handleMouseDown(event.pageX, event.pageY);
        }
    };
    App.prototype.onDocumentMouseUp = function(event) {
        event.preventDefault();
        var handled = false,
            intersected = this.objectFromMouse(event.pageX, event.pageY);
        if (intersected.object && intersected.object.handleMouseUp) {
            intersected.object.handleMouseUp(event.pageX, event.pageY, intersected.point, intersected.normal);
            handled = true;
        }
        if (!handled && this.handleMouseUp) {
            this.handleMouseUp(event.pageX, event.pageY);
        }
        this.clickedObject = null;
    };
    App.prototype.onDocumentMouseScroll = function(event, delta) {
        event.preventDefault();
        if (this.handleMouseScroll) {
            this.handleMouseScroll(delta);
        }
    };
    App.prototype.objectFromMouse = function(pagex, pagey) {
        // 变换页面坐标为元素坐标
        var offset = $(this.renderer.domElement).offset(),
            eltx = pagex - offset.left,
            elty = pagey - offset.top;
        // 转换客户端坐标到视窗的x, y
        var vpx = (eltx / this.container.offsetWidth) * 2 - 1,
            vpy = - (elty / this.container.offsetHeight) * 2 + 1;
        
        var vector = new THREE.Vector3(vpx, vpy, 0.5);
        vector.unproject(this.camera);

        var ray = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize()),
            intersects = ray.intersectObject(this.scene);
        if (intersects.length > 0) {
            var i = 0;
            while (!intersects[i].object.visible) {
                i ++;
            }
            var intersected = intersects[i],
                mat = new THREE.Matrix4().getInverse(intersected.object.matrixWorld),
                point = mat.multiplyVector3(intersected.point);
            return (this.findObjectFromIntersected(intersected.object, intersected.point, intersected.face.normal));
        } else {
            return {object: null, point: null, normal: null};
        }
    };
    App.prototype.findObjectFromIntersected = function(object, point, normal) {
        if (object.data) {
            return {object: object.data, point: point, normal: normal};
        } else if (object.parent) {
            return this.findObjectFromIntersected(object.parent, point, normal);
        } else {
            return {object: null, point: null, normal: null};
        }
    };
    App.prototype.onKeyDown = function(event) {
        event.preventDefault();
        if (this.handleKeyDown) {
            this.handleKeyDown(event.keyCode, event.charCode);
        }
    };
    App.prototype.onKeyPress = function(event) {
        event.preventDefault();
        if (this.handleKeyPress) {
            this.handleKeyPress(event.keyCode, event.charCode);
        }
    };
    App.prototype.onWindowResize = function(event) {
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
    };
    App.prototype.focus = function() {
        if (this.renderer && this.renderer.domElement) {
            this.renderer.domElement.focus();
        }
    };
    return App;
});