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
exports.processTasksWithPowerfulScheduler = void 0;
var DEFAULT_COMPLETION_TIME = 100; // Стандартний час виконання задачі у мілісекундах
function processTasksWithPowerfulScheduler(queue, processors) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var tasksProcessed, taskPromises, _loop_1, _i, queue_1, task;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tasksProcessed = 0;
                    taskPromises = [];
                    _loop_1 = function (task) {
                        var mostPowerfulProcessor = processors.reduce(function (a, b) { return a.power > b.power ? a : b; });
                        mostPowerfulProcessor.assignTask(); // This should ideally be a synchronous operation
                        var availableProcessor = processors.find(function (p) { return task.processors.includes(p.id) && !p.isBusy; });
                        if (availableProcessor) {
                            availableProcessor.assignTask(); // Mark processor as busy
                            var completionTime_1 = (_a = task.estimatedCompletionTime) !== null && _a !== void 0 ? _a : DEFAULT_COMPLETION_TIME;
                            var taskPromise = new Promise(function (resolve) {
                                setTimeout(function () {
                                    availableProcessor.completeTask(); // Mark processor as not busy
                                    mostPowerfulProcessor.completeTask(); // Also complete the task on the powerful processor
                                    tasksProcessed++;
                                    resolve();
                                }, completionTime_1);
                            });
                            taskPromises.push(taskPromise);
                        }
                        else {
                            // If no processor is available, the most powerful processor should not assign the task
                            mostPowerfulProcessor.completeTask();
                        }
                    };
                    for (_i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
                        task = queue_1[_i];
                        _loop_1(task);
                    }
                    return [4 /*yield*/, Promise.all(taskPromises)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, tasksProcessed];
            }
        });
    });
}
exports.processTasksWithPowerfulScheduler = processTasksWithPowerfulScheduler;
