declare module NodeJS {
    // 全局对象
    interface Global {
        // 是否已经挂载拓展
        hasExtension: boolean
    }
}

interface Creep {
    _id: string,
    _move(direction: DirectionConstant | Creep): CreepMoveReturnCode | ERR_NOT_IN_RANGE | ERR_INVALID_TARGET,

    //上一个执行的task是第几步
    stap:number,
    //上一个tick中命令的执行结果
    lastResult:number
}

interface CreepMemory{
    stap,
    lastResult 
}