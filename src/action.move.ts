import {Action} from './action';

export class Move extends Action {
    canStop(): boolean {
        throw new Error("Method not implemented.");
    }
    
    actor(): ScreepsReturnCode {
        let result = this.creep.moveTo(this.target);
        this.logger.debug(this.creep.name,"moving");
        return result;
    }

    private target;

    constructor(creep:Creep,target,canStop:()=>boolean) {
        super(creep);
        this.logger.setName(this.constructor.name);
        this.target = target;
        this.canStop = canStop;
    }
}