"use strict";
var Flashlight = /** @class */ (function () {
    function Flashlight() {
        this._isSwitchedOn = false;
    }
    Flashlight.prototype.available = function () {
        return new Promise(function (resolve, reject) {
            cordova.exec(function (result) { return resolve(result ? true : false); }, function () { return reject(); }, 'Flashlight', 'available', []);
        });
    };
    Flashlight.prototype.isSwitchedOn = function () {
        return this._isSwitchedOn;
    };
    Flashlight.prototype.switchOn = function (options) {
        var _this = this;
        var opts = options || {};
        return new Promise(function (resolve, reject) {
            cordova.exec(function () {
                _this._isSwitchedOn = true;
                resolve();
            }, reject, 'Flashlight', 'switchOn', [opts]);
        });
    };
    Flashlight.prototype.switchOff = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cordova.exec(function () {
                _this._isSwitchedOn = false;
                resolve();
            }, reject, 'Flashlight', 'switchOff', []);
        });
    };
    Flashlight.prototype.toggle = function (options) {
        if (this._isSwitchedOn) {
            return this.switchOff();
        }
        else {
            return this.switchOn(options);
        }
    };
    return Flashlight;
}());
// plugin installer
cordova.addConstructor(function () {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.flashlight = new Flashlight();
    return window.plugins.flashlight;
});
