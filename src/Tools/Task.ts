export namespace Task
{
    export enum Status {
        Unkown,
        Success,
        Failure,
        InProgress
    }

    export abstract class Task {

        protected abstract Run() : void;
        public abstract setup(...args : any[]) : void ;

        public type : string = "";
        public status : Status = Status.InProgress;
        public removeAt : number = Game.time;

        public name : string = "";
        public id : number = -1;

        protected keep(ticks : number)
        {
            this.removeAt = Game.time + ticks;
        }

        protected done()
        {
            this.status = Status.Success;
            delete Memory.tasks[this.id];
        }

        protected fail()
        {
            this.status = Status.Failure;
            delete Memory.tasks[this.id];
        }

        public Execute() : void {
            this.Run();
        }

        static GetStatus(taskId : number) : Status
        {
            return Memory.tasks[taskId].status || Status.Unkown;
        }
    }
}
