console.log("Recompiling");
let start = Game.cpu.getUsed();

import { ErrorMapper } from "utils/ErrorMapper";
import { Cleanup } from "utils/Cleanup";
import { Task } from "Tools/Task"
import { Tasks } from "Tools/Tasks"
import { Memhack } from "utils/Memhack";
import { TaskFactory } from "Tools/TaskFactory";

declare global {
  /*
  Example types, expand on these or remove them and add your own.
  Note: Values, properties defined here do no fully *exist* by this type definiton alone.
  You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

  Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
  Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    taskIdCounter: number;
    lastViewed : {
      room : string,
      at : number
    };
    tasks: { [taskId: string]: Task.Task };
  }

  interface RawMemory {
    _parsed : any
  }

  interface CustomGlobals {
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global extends CustomGlobals {
      Memory? : Memory;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  Memhack.Setup();
  Cleanup.Run();


  if (Object.keys(Memory.tasks).length == 0)
    TaskFactory.CreateNewTask(Tasks.colony, `Colony [${Game.spawns.Spawn1.room.name}]`,  Game.spawns.Spawn1.room.name)

  for(let task of Object.values(Memory.tasks))
  {
    task.Execute();
  }

});

console.log("Recompile finished in " + (Game.cpu.getUsed() - start).toFixed(2));
