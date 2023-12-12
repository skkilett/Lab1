import { Processor } from './src/models/Processor';
import { Task } from './src/models/Task';
import { System } from './src/System';

async function simulateSystem() {
    const processors: Processor[] = [
        new Processor(1, 10),
        new Processor(2, 15),
        new Processor(3, 12),
        new Processor(4, 17),
        new Processor(5, 11),
        // ... other processors
    ];
    const simulationTime = 10;
    const system = new System(processors);

    // Generate tasks with a certain probability for 10 seconds
    const generateTasks = () => {
        for (let i = 0; i < simulationTime * 1000; i++) {
            system.generateRandomTask(0.5); // Probability of 0.5
        }
    };

    // Run FIFO algorithm
    generateTasks(); // Populate task queue
    await system.runFIFO();
    system.displayStatus(simulationTime);
    system.resetCompletedTasks(); // Reset for next algorithm

    // Run Scheduler algorithm
    generateTasks(); // Repopulate task queue
    await system.runWithScheduler(1); // Assuming processor with ID 1 is the scheduler
    system.displayStatus(simulationTime);
    system.resetCompletedTasks(); // Reset for next algorithm

    // Run Powerful Scheduler algorithm
    generateTasks(); // Repopulate task queue
    await system.runWithPowerfulScheduler();
    system.displayStatus(simulationTime);
    system.resetCompletedTasks(); // Reset for next algorithm

    // ... additional algorithms ...
}

simulateSystem().catch(console.error);

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function displayResults(system: System, simulationTime: number) {
    const results = [
        ['FIFO', system.runFIFO()],
        ['Scheduler', system.runWithScheduler(1)],
        ['Powerful Scheduler', system.runWithPowerfulScheduler()]
    ];

    console.log('| Algorithm            | Number of tasks completed in 10s  | Efficiency | Max possible number of completed tasks  |');
    console.log('|----------------------|-----------------------------------|------------|-----------------------------------------|');

    results.forEach(async ([name, runner]) => {
        await runner;
        //system.displayStatus(simulationTime);
        console.log(`| ${name.toString().padEnd(22)}| ${system.getCompletedTasks().toString().padEnd(35)}| ${system.getEfficiency(simulationTime).padEnd(12)}| ${system.getMaxPossibleTasks(simulationTime).toString().padEnd(41)}|`);
        system.resetCompletedTasks();
    });
}