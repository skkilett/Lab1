import { Task } from '../models/Task';
import { Processor } from '../models/Processor';

const DEFAULT_COMPLETION_TIME = 100; // Стандартний час виконання задачі у мілісекундах
export async function processTasksWithPowerfulScheduler(queue: Task[], processors: Processor[]): Promise<number> {
    let tasksProcessed = 0;
    const taskPromises = [];
    const mostPowerfulProcessor = processors.reduce((a, b) => a.power > b.power ? a : b);

    for (const task of queue) {
        const availableProcessor = processors.find(p => p !== mostPowerfulProcessor && !p.isBusy);
        if (availableProcessor) {
            availableProcessor.assignTask();
            const completionTime = task.estimatedCompletionTime ?? DEFAULT_COMPLETION_TIME;
            taskPromises.push(new Promise<void>(resolve => setTimeout(() => {
                availableProcessor.completeTask();
                tasksProcessed++;
                resolve();
            }, completionTime)));
        }
    }

    // Periodically, the most powerful processor stops processing to manage the queue
    // ...

    await Promise.all(taskPromises);
    return tasksProcessed;
}




