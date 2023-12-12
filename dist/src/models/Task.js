"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(processors, complexity) {
        this.processors = processors;
        this.complexity = complexity;
        this.estimatedCompletionTime = null;
    }
    Task.prototype.estimateCompletionTime = function (processorPower) {
        if (processorPower <= 0) {
            throw new Error("Processor power must be positive.");
        }
        this.estimatedCompletionTime = this.complexity / processorPower;
    };
    return Task;
}());
exports.Task = Task;
