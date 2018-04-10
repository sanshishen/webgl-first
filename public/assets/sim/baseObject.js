/**
 * base class for all objects in simulation.
 * @date    2018-03-21 22:30:49
 * @version 1.0.0
 */
define(['sim/publisher'], function(Publisher) {
    var BaseObject = function() {
        Publisher.call(this);

        this.object3D = null;
        this.children = [];
    };
    BaseObject.prototype = new Publisher;
    BaseObject.prototype.init = function() {};
    BaseObject.prototype.update = function() {
        var i, len = this.children.length;
        for (i = 0; i < len; i ++) {
            this.children[i].update();
        }
    };
    BaseObject.prototype.setPosition = function(x, y, z) {
        if (this.object3D) {
            this.object3D.position.set(x, y, z);
        }
    };
    BaseObject.prototype.setScale = function(x, y, z) {
        if (this.object3D) {
            this.object3D.scale.set(x, y, z);
        }
    };
    BaseObject.prototype.setVisible = function(visible) {
        function setVisible(obj, visible) {
            obj.visible = visible;
            var i, len = obj.children.length;
            for (i = 0; i < len; i ++) {
                setVisible(obj.children[i], visible);
            }
        }
        if (this.object3D) {
            setVisible(this.object3D, visible);
        }
    };
    BaseObject.prototype.setObject3D = function(object3D) {
        object3D.data = this;
        this.object3D = object3D;
    };
    BaseObject.prototype.addChild = function(child) {
        this.children.push(child);
        if (child.object3D) {
            this.object3D.add(child.object3D);
        }
    };
    BaseObject.prototype.removeChild = function(child) {
        var index = this.children.indexOf(child);
        if (index != -1) {
            this.children.splice(index, 1);
            if (child.object3D) {
                this.object3D.remove(child.object3D);
            }
        }
    };
    BaseObject.prototype.getScene = function() {
        var scene = null;
        if (this.object3D) {
            var obj = this.object3D;
            while (obj.parent) {
                obj = obj.parent;
            }
            scene = obj;
        }
        return scene;
    };
    BaseObject.prototype.getApp = function() {
        var scene = this.getScene();
        return scene ? scene.data : null;
    };
    return BaseObject;
});