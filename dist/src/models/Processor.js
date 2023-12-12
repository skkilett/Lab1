"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processor = void 0;
var Processor = /** @class */ (function () {
    function Processor(id, power) {
        this.id = id;
        this.power = power;
        this._isBusy = false;
    }
    Object.defineProperty(Processor.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: false,
        configurable: true
    });
    Processor.prototype.assignTask = function () {
        if (this._isBusy) {
            throw new Error("Processor is already busy.");
        }
        this._isBusy = true;
    };
    Processor.prototype.completeTask = function () {
        if (!this._isBusy) {
            throw new Error("Processor is not busy.");
        }
        this._isBusy = false;
    };
    return Processor;
}());
exports.Processor = Processor;
