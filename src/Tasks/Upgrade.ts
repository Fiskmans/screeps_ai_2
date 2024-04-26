import { Task } from "Tools/Task"

export class upgrade extends Task.Task {

    protected Type(): string {
        return "upgradeTask";
    }
    public owner : number = -1;

    public setup(owner : number)
    {
        this.owner = owner;
    }

    public Run(): void {
        this.keep(10);

        if (Task.Task.GetStatus(this.owner) != Task.Status.InProgress)
        {
            this.done();
            return;
        }
    }
}
