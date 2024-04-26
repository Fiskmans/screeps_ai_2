

export class Memhack
{
    private static memory : Memory;

    static Setup(): void {
        if (_.isUndefined(this.memory))
        {
            this.memory = JSON.parse(RawMemory.get());
        }

        delete global.Memory;
        global.Memory = this.memory
        RawMemory._parsed = this.memory
    }
}
