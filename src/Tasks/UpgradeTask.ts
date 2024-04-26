import { Task, TaskData, TaskStatus } from "Tools/Task"

interface upgradeTaskData extends TaskData
{
    owner : number
}

export class upgradeTask extends Task {

    protected Type(): string {
        return "upgradeTask";
    }

    protected get data() {
        return super.data as upgradeTaskData;
    }

    constructor(name : string, owner : number)
    {
        super(name);
        this.data.owner = owner;
    }

    public Run(): void {
        this.keep(10);
        if (Task.GetStatus(this.data.owner) != TaskStatus.InProgress)
        {
            this.done();
            return;
        }
    }


}
