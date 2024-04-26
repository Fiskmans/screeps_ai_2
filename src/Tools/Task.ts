
export enum TaskStatus {
    Unkown,
    Success,
    Failure,
    InProgress
}

export interface TaskData {
    type : string,
    status : TaskStatus,
    removeAt : number
}

export abstract class Task {

    private _data : TaskData;
    protected get data() {
        return this._data;
    }

    protected abstract Type() : string;
    public abstract Run() : void;

    public name : string;
    public id : number;

    constructor(name : string)
    {
        this.id = Memory.taskIdCounter++;

        this.name = name;
        this._data = {
            type: this.Type(),
            status: TaskStatus.InProgress,
            removeAt: Game.time + 1
        };

        Memory.tasks.set(this.id, this._data);
        global.livetasks.set(this.id, this);
        console.log(this.id, name);
    }

    protected keep(ticks : number)
    {
        this.data.removeAt = Game.time + ticks;
    }

    protected done()
    {
        this.data.status = TaskStatus.Success;
        global.livetasks.delete(this.id);
    }

    protected fail()
    {
        this.data.status = TaskStatus.Failure;
        global.livetasks.delete(this.id);
    }

    static GetStatus(taskId : number) : TaskStatus
    {
        return Memory.tasks.get(taskId) || TaskStatus.Unkown;
    }
}
