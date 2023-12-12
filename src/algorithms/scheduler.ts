import { Task } from '../models/Task';
import { Processor } from '../models/Processor';

const DEFAULT_COMPLETION_TIME = 100; // Стандартний час виконання задачі у мілісекундах

export async function processTasksWithScheduler(
    queue: Task[], 
    processors: Processor[], 
    scheduler: Processor
  ): Promise<number> {
    let tasksProcessed = 0;
    const taskPromises: Promise<void>[] = [];
  
    // Убираем планировщика из списка процессоров, работающих с задачами
    const workingProcessors = processors.filter(p => p !== scheduler);
  
    while (queue.length > 0) {
      // Планировщик распределяет задачи
      scheduler.assignTask();
      const task = queue.shift()!;
  
      // Находим доступный процессор для задачи
      const availableProcessor = workingProcessors.find(p => !p.isBusy);
  
      if (availableProcessor) {
        availableProcessor.assignTask();
        const completionTime = task.estimatedCompletionTime ?? DEFAULT_COMPLETION_TIME;
  
        // Создаем промис для обработки задачи
        const processingPromise = new Promise<void>(resolve => {
          setTimeout(() => {
            availableProcessor.completeTask();
            tasksProcessed++;
            resolve();
          }, completionTime);
        });
  
        taskPromises.push(processingPromise);
      }
  
      // Планировщик завершает распределение текущей задачи
      scheduler.completeTask();
    }
  
    // Ожидаем завершения всех задач
    await Promise.all(taskPromises);
    return tasksProcessed;
  }


