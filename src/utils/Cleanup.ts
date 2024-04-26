
export class Cleanup
{
    public static Run()
    {
        this.Creeps();
        this.Memory();
        this.Global();
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
            tasks: new Map<number, any>()
        };
        _.defaults(Memory, defaults);
    }

    private static Global()
    {
        const defaults : {} = {

        }
        _.defaults(global, defaults);
    }
}
