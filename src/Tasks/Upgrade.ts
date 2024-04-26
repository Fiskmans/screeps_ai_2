import { Task } from "Tools/Task"

export namespace Tasks {

    interface upgradeData extends Task.Data
    {
        owner : number
    }

    export class upgrade extends Task.Task {

        protected Type(): string {
            return "upgradeTask";
        }

        protected get data() {
            return super.data as upgradeData;
        }

        constructor(name : string, owner : number)
        {
            super(name);
            this.data.owner = owner;
        }

        public Run(): void {
            this.keep(10);

            if (Task.Task.GetStatus(this.data.owner) != Task.Status.InProgress)
            {
                this.done();
                return;
            }
        }
    }
}
