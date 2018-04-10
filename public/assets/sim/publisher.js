/**
 * publisher
 * @date    2018-03-20 11:18:25
 */
define(function () {
    var Publisher = function () {
        this.messageTypes = {};
    };
    Publisher.prototype.subscribe = function(message, subscriber, callback) {
        var subscribers = this.messageTypes[message];
        if (subscribers) {
            if (this.findSubscriber(subscribers, subscriber) != -1) {
                return;
            }
        } else {
            subscribers = [];
            this.messageTypes[message] = subscribers;
        }
        subscribers.push({ subscriber: subscriber, callback: callback });
    };
    Publisher.prototype.unsubscribe = function(message, subscriber, callback) {
        if (subscriber) {
            var subscribers = this.messageTypes[message];
            if (subscribers) {
                var i = this.findSubscriber(subscribers, subscriber);
                if (i != -1) {
                    this.messageTypes[message].splice(i, 1);
                }
            }
        } else {
            delete this.messageTypes[message];
        }
    };
    Publisher.prototype.publish = function(message) {
        var subscribers = this.messageTypes[message];
        if (subscribers) {
            for (var i = 0; i < subscribers.length; i ++) {
                var args = [];
                for (var j = 0; j < arguments.length - 1; j ++) {
                    args.push(arguments[j + 1]);
                }
                subscribers[i].callback.apply(subscribers[i],subscriber, args);
            }
        }
    };
    Publisher.prototype.findSubscriber = function(subscribers, subscriber) {
        for (var i = 0; i < subscribers.length; i ++) {
            if (subscribers[i] == subscriber) {
                return i;
            }
        }
        return -1;
    };
    return Publisher;
});