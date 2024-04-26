import { Task, TaskData } from "Tools/Task"
import { upgradeTask } from "./UpgradeTask"

interface colonyTaskData extends TaskData
{
    room : string,
    upgradeTask : number
}

export class colonyTask extends Task
{
    protected Type(): string {
        return "colonyTask"
    }
    protected get data() {
        return super.data as colonyTaskData;
    }

    constructor(room : string) {
        super("Colony: " + room);

        this.data.room = room
    }

    public Run(): void {
        this.keep(1000);
        if(!this.data.upgradeTask)
            this.data.upgradeTask = new upgradeTask("Upgrade " + this.data.room, this.id).id;
    }
}
