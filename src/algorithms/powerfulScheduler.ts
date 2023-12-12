import { Task } from '../models/Task';
import { Processor } from '../models/Processor';

const DEFAULT_COMPLETION_TIME = 100; // Стандартний час виконання задачі у мілісекундах
export async function processTasksWithPowerfulScheduler(queue: Task[], processors: Processor[]): Promise<number> {
    let tasksProcessed = 0;
    const taskPromises = [];

    for (const task of queue) {
        const mostPowerfulProcessor = processors.reduce((a, b) => a.power > b.power ? a : b);
        mostPowerfulProcessor.assignTask(); // This should ideally be a synchronous operation
        const availableProcessor = processors.find(p => task.processors.includes(p.id) && !p.isBusy);

        if (availableProcessor) {
            availableProcessor.assignTask(); // Mark processor as busy
            const completionTime = task.estimatedCompletionTime ?? DEFAULT_COMPLETION_TIME;

            const taskPromise = new Promise<void>(resolve => {
                setTimeout(() => {
                    availableProcessor.completeTask(); // Mark processor as not busy
                    mostPowerfulProcessor.completeTask(); // Also complete the task on the powerful processor
                    tasksProcessed++;
                    resolve();
                }, completionTime);
            });

            taskPromises.push(taskPromise);
        } else {
            // If no processor is available, the most powerful processor should not assign the task
            mostPowerfulProcessor.completeTask();
        }
    }

    await Promise.all(taskPromises);
    return tasksProcessed;
}



