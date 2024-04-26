import { TaskFactory } from "Tools/TaskFactory";
import { Tasks } from "Tools/Tasks"

export class Cleanup
{
    static recompiled : boolean = true;

    public static Run()
    {
        this.Creeps();
        this.Tasks();

        if (this.recompiled)
        {
            this.RecreateTasks();
            this.Memory();
            this.Global();
            this.recompiled = false;
        }
    }

    private static Creeps()
    {
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }

    private static Memory()
    {
        const defaults : Memory = {
            creeps:{},
            powerCreeps:{},
            flags:{},
            rooms:{},
            spawns: {},
            taskIdCounter: 0,
            lastViewed: {
                room: "",
                at: Game.time
            },
            tasks: {}
        };
        _.defaults(Memory, defaults);
    }

    private static Global()
    {
        const defaults : CustomGlobals = {
        }
        _.defaults(global, defaults);
    }

    private static Tasks()
    {
        let toDelete = [];
        let now = Game.time;
        for(let taskId of Object.keys(Memory.tasks))
        {
            let task = Memory.tasks[taskId];

            if(!_.isNull(task) && task.removeAt >= now)
                continue;

            toDelete.push(taskId);
        }

        for (let id of toDelete)
        {
            console.log(`Task [${id}] timed out`);
            delete Memory.tasks[id];
        }
    }

    private static RecreateTasks()
    {
        let errored = [];
        let log = "Recreated tasks: ";
        for(let task of Object.values(Memory.tasks))
        {
            switch(task.type)
            {
                case Tasks.colony.name:
                    Object.setPrototypeOf(task, Tasks.colony.prototype);
                    break;
                case Tasks.upgrade.name:
                    Object.setPrototypeOf(task, Tasks.upgrade.prototype);
                    break;
                default:
                    console.log(`RecreateTaskError: [${task.id}] no prototype with name ${task.type} available`);
                    errored.push(task.id);
                    continue;
            }
            log += ", " + task.id;
        }
        console.log(log);

        for (let id of errored)
        {
            delete Memory.tasks[id];
        }
    }
}
