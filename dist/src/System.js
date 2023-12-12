"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
var Task_1 = require("./models/Task");
var fifo_1 = require("./algorithms/fifo");
var powerfulScheduler_1 = require("./algorithms/powerfulScheduler");
var scheduler_1 = require("./algorithms/scheduler");
var randomUtils_1 = require("./utils/randomUtils");
var System = /** @class */ (function () {
    function System(processors, taskComplexityRange) {
        if (taskComplexityRange === void 0) { taskComplexityRange = { min: 10, max: 200 }; }
        this.processors = processors;
        this.taskQueue = [];
        this.completedTasks = 0;
        this.taskComplexityRange = taskComplexityRange;
    }
    System.prototype.addTask = function (task) {
        this.taskQueue.push(task);
    };
    System.prototype.resetCompletedTasks = function () {
        this.completedTasks = 0;
    };
    System.prototype.generateRandomTask = function (probability) {
        if (Math.random() < probability) {
            var processorsAvailable = this.processors.map(function (p) { return p.id; });
            var randomProcessorSubset = processorsAvailable.filter(function () { return Math.random() > 0.5; });
            var complexity = (0, randomUtils_1.getRandomInt)(this.taskComplexityRange.min, this.taskComplexityRange.max);
            var task = new Task_1.Task(randomProcessorSubset, complexity);
            this.addTask(task);
        }
    };
    System.prototype.runFIFO = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        _b = _a.completedTasks;
                        return [4 /*yield*/, (0, fifo_1.processTasksFIFO)(this.taskQueue, this.processors)];
                    case 1:
                        _a.completedTasks = _b + _c.sent();
                        this.taskQueue = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    System.prototype.runWithScheduler = function (schedulerId) {
        return __awaiter(this, void 0, void 0, function () {
            var scheduler, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        scheduler = this.processors.find(function (p) { return p.id === schedulerId; });
                        if (!scheduler) {
                            throw new Error("Scheduler with ID ".concat(schedulerId, " not found."));
                        }
                        _a = this;
                        _b = _a.completedTasks;
                        return [4 /*yield*/, (0, scheduler_1.processTasksWithScheduler)(this.taskQueue, this.processors, scheduler)];
                    case 1:
                        _a.completedTasks = _b + _c.sent();
                        this.taskQueue = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    System.prototype.runWithPowerfulScheduler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        _b = _a.completedTasks;
                        return [4 /*yield*/, (0, powerfulScheduler_1.processTasksWithPowerfulScheduler)(this.taskQueue, this.processors)];
                    case 1:
                        _a.completedTasks = _b + _c.sent();
                        this.taskQueue = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    System.prototype.getCompletedTasks = function () {
        return this.completedTasks;
    };
    // Gets the efficiency of the systemj
    System.prototype.getEfficiency = function (timeInSeconds) {
        var efficiency = (this.getCompletedTasks() / this.getMaxPossibleTasks(timeInSeconds)) * 100;
        return efficiency.toFixed(2);
    };
    // Gets the maximum possible number of tasks that could be completed
    System.prototype.getMaxPossibleTasks = function (timeInSeconds) {
        var totalPower = this.processors.reduce(function (acc, processor) { return acc + processor.power; }, 0);
        return totalPower * timeInSeconds;
    };
    System.prototype.displayStatus = function (timeInSeconds) {
        console.log("Total completed tasks: ".concat(this.getCompletedTasks()));
        console.log("System efficiency: ".concat(this.getEfficiency(timeInSeconds)));
        console.log("Max possible completed tasks in ".concat(timeInSeconds, " seconds: ").concat(this.getMaxPossibleTasks(timeInSeconds)));
    };
    return System;
}());
exports.System = System;
