import { Task } from '../models/Task';
import { Processor } from '../models/Processor';

const DEFAULT_COMPLETION_TIME = 100; // Стандартний час виконання задачі у мілісекундах

export async function processTasksWithScheduler(queue: Task[], processors: Processor[], scheduler: Processor): Promise<number> {
    let tasksProcessed = 0;
    const processingPromises = [];

    while (queue.length > 0) {
        const task = queue.shift()!;
        const availableProcessor = processors.find(p => task.processors.includes(p.id) && !p.isBusy);

        if (availableProcessor) {
            availableProcessor.assignTask();
            const completionTime = task.estimatedCompletionTime ?? DEFAULT_COMPLETION_TIME;

            const processingPromise = new Promise<void>(resolve => {
                setTimeout(() => {
                    availableProcessor.completeTask();
                    tasksProcessed++;
                    resolve();
                }, completionTime);
            });
            processingPromises.push(processingPromise);
        }
    }

    await Promise.all(processingPromises);
    return tasksProcessed;
}



