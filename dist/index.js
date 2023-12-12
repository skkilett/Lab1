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
var Processor_1 = require("./src/models/Processor");
var System_1 = require("./src/System");
function simulateSystem() {
    return __awaiter(this, void 0, void 0, function () {
        var processors, simulationTime, system, generateTasks;
        return __generator(this, function (_a) {
            processors = [
                new Processor_1.Processor(1, 10),
                new Processor_1.Processor(2, 15),
                new Processor_1.Processor(3, 12),
                new Processor_1.Processor(4, 17),
                new Processor_1.Processor(5, 11),
                // ... other processors
            ];
            simulationTime = 10;
            system = new System_1.System(processors);
            generateTasks = function () {
                for (var i = 0; i < simulationTime * 1000; i++) {
                    system.generateRandomTask(0.5); // Probability of 0.5
                }
            };
            displayResults(system, simulationTime);
            return [2 /*return*/];
        });
    });
}
simulateSystem().catch(console.error);
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function displayResults(system, simulationTime) {
    var _this = this;
    var results = [
        ['FIFO', system.runFIFO()],
        ['Scheduler', system.runWithScheduler(1)],
        ['Powerful Scheduler', system.runWithPowerfulScheduler()]
    ];
    console.log('| Algorithm            | Number of tasks completed in 10s  | Efficiency | Max possible number of completed tasks  |');
    console.log('|----------------------|-----------------------------------|------------|-----------------------------------------|');
    results.forEach(function (_a) {
        var name = _a[0], runner = _a[1];
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, runner];
                    case 1:
                        _b.sent();
                        system.displayStatus(simulationTime);
                        console.log("| ".concat(name.toString().padEnd(22), "| ").concat(system.getCompletedTasks().toString().padEnd(35), "| ").concat(system.getEfficiency(simulationTime).padEnd(12), "| ").concat(system.getMaxPossibleTasks(simulationTime).toString().padEnd(41), "|"));
                        system.resetCompletedTasks();
                        return [2 /*return*/];
                }
            });
        });
    });
}
