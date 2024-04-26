import { Task } from "Tools/Task"
import { upgrade } from "Tasks/Upgrade"
import { TaskFactory } from "Tools/TaskFactory";

export class colony extends Task.Task
{

    public room : string = "";
    public upgradeTask : number = 0;

    public setup(room : string): void {
        this.room = room;

    }

    public Run(): void {
        this.keep(1000);
        if(!this.upgradeTask)
            this.upgradeTask = TaskFactory.CreateNewTask(upgrade, `upgrade ${this.room}` , this.id).id;
    }
}
