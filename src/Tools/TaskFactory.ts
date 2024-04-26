import { Task } from "Tools/Task"

export class TaskFactory
{
    static CreateNewTask(classType : new () => Task.Task, name : string,  ...args : any[]) : Task.Task
    {
        let task = new classType();

        task.id = Memory.taskIdCounter++;
        task.type = classType.name;
        task.status = Task.Status.InProgress;
        task.removeAt = Game.time + 1;

        Memory.tasks[task.id] = task;

        task.setup(args);

        console.log(`created: [${task.id}] [${task.type}] ${task.name}`);

        return task;
    }
}
