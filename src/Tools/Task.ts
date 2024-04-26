export namespace Task
{
    export enum Status {
        Unkown,
        Success,
        Failure,
        InProgress
    }

    export interface Data {
        type : string,
        status : Status,
        removeAt : number
    }

    export abstract class Task {

        private _data : Data;
        protected get data() {
            return this._data;
        }

        protected abstract Type() : string;
        protected abstract Run() : void;


        public name : string;
        public id : number;

        constructor(name : string)
        {
            this.id = Memory.taskIdCounter++;

            this.name = name;
            this._data = {
                type: this.Type(),
                status: Status.InProgress,
                removeAt: Game.time + 1
            };

            Memory.tasks[this.id] = this._data;
            global.livetasks.set(this.id, this);
            console.log(this.id, name);
        }

        protected keep(ticks : number)
        {
            this.data.removeAt = Game.time + ticks;
        }

        protected done()
        {
            this.data.status = Status.Success;
            global.livetasks.delete(this.id);
        }

        protected fail()
        {
            this.data.status = Status.Failure;
            global.livetasks.delete(this.id);
        }

        public Exectute() : void {
            this.Run();
        }

        static GetStatus(taskId : number) : Status
        {
            return Memory.tasks[taskId].status || Status.Unkown;
        }
    }
}
