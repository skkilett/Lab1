import { Processor } from './models/Processor';
import { Task } from './models/Task';
import { processTasksFIFO } from './algorithms/fifo';
import { processTasksWithPowerfulScheduler } from './algorithms/powerfulScheduler';
import { processTasksWithScheduler } from './algorithms/scheduler';
import { getRandomInt } from './utils/randomUtils';

export class System {
    private processors: Processor[];
    private taskQueue: Task[];
    private completedTasks: number;
    private taskComplexityRange: { min: number; max: number };

    constructor(processors: Processor[], taskComplexityRange: { min: number; max: number } = { min: 10, max: 200 }) {
        this.processors = processors;
        this.taskQueue = [];
        this.completedTasks = 0;
        this.taskComplexityRange = taskComplexityRange;
    }


    addTask(task: Task): void {
        this.taskQueue.push(task);
    }
    public resetCompletedTasks(): void {
        this.completedTasks = 0;
    }

    generateRandomTask(probability: number): void {
        if (Math.random() < probability) {
            const processorsAvailable = this.processors.map(p => p.id);
            const randomProcessorSubset = processorsAvailable.filter(() => Math.random() > 0.5);
            const complexity = getRandomInt(this.taskComplexityRange.min, this.taskComplexityRange.max);
            const task = new Task(randomProcessorSubset, complexity);
            this.addTask(task);
        }
    }

    async runFIFO(): Promise<void> {
        this.completedTasks += await processTasksFIFO(this.taskQueue, this.processors);
        this.taskQueue = [];
    }
    async runWithScheduler(schedulerId: number): Promise<void> {
        const scheduler = this.processors.find(p => p.id === schedulerId);
        if (!scheduler) {
            throw new Error(`Scheduler with ID ${schedulerId} not found.`);
        }
        this.completedTasks += await processTasksWithScheduler(this.taskQueue, this.processors, scheduler);
        this.taskQueue = [];
    }
    async runWithPowerfulScheduler(): Promise<void> {
        this.completedTasks += await processTasksWithPowerfulScheduler(this.taskQueue, this.processors);
        this.taskQueue = [];
    }

    public getCompletedTasks(): number {
        return this.completedTasks;
    }

    // Gets the efficiency of the systemj
    public getEfficiency(timeInSeconds: number): string {
        const efficiency = (this.getCompletedTasks() / this.getMaxPossibleTasks(timeInSeconds)) * 100;
        return efficiency.toFixed(2);
    }

    // Gets the maximum possible number of tasks that could be completed
    public getMaxPossibleTasks(timeInSeconds: number): number {
        const totalPower = this.processors.reduce((acc, processor) => acc + processor.power, 0);
        return totalPower * timeInSeconds;
    }

    public displayStatus(timeInSeconds: number): void {
        console.log(`Total completed tasks: ${this.getCompletedTasks()}`);
        console.log(`System efficiency: ${this.getEfficiency(timeInSeconds)}`);
        console.log(`Max possible completed tasks in ${timeInSeconds} seconds: ${this.getMaxPossibleTasks(timeInSeconds)}`);
    }
}
