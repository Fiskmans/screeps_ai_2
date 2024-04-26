import { colonyTask } from "Tasks/Colony";
import { Task } from "Tools/Task";
import { Tasks } from "Tasks/Upgrade";


export class Cleanup
{
    public static Run()
    {
        this.Creeps();
        this.Memory();
        this.Global();
        this.Tasks();
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
            livetasks : new Map<number, Task.Task>()
        }
        _.defaults(global, defaults);
    }

    private static Tasks()
    {
        if(global.livetasks.size == 0)
        {
            this.RecreateTasks();
        }

        let toDelete = [];
        let now = Game.time;
        for(let taskId in Memory.tasks)
        {
            let obj = Memory.tasks[taskId];
            if(obj.removeAt < now)
            {
                toDelete.push(taskId);
            }
        }
    }

    private static RecreateTasks()
    {
        for(let taskId in Memory.tasks)
        {
            let obj = Memory.tasks[taskId];
            let liveObj = {};

            switch(obj.type)
            {
                case "colony": new colonyTask(obj);
                case "upgrade": new Tasks.upgrade(obj);
            }
            global.livetasks.set(taskId, liveObj);
        }
    }
}
