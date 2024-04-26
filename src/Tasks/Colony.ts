import { Task } from "Tools/Task"
import { Tasks } from "./Upgrade"

export namespace Tasks {


    interface colonyTaskData extends Task.Data
    {
        room : string,
        upgradeTask : number
    }

    export class colonyTask extends Task.Task
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
                this.data.upgradeTask = new upgrade("Upgrade " + this.data.room, this.id).id;
        }
    }

}
