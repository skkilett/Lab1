export class Task {
    processors: number[];
    complexity: number;
    estimatedCompletionTime: number | null;

    constructor(processors: number[], complexity: number) {
        this.processors = processors;
        this.complexity = complexity;
        this.estimatedCompletionTime = null;
    }

    estimateCompletionTime(processorPower: number): void {
        if (processorPower <= 0) {
            throw new Error("Processor power must be positive.");
        }
        this.estimatedCompletionTime = this.complexity / processorPower;
    }
}
