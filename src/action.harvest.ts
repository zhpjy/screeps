import {Action} from './action';

export class Harvest extends Action {
    private target;

    canStop(): boolean {
        throw new Error("Method not implemented.");
    }
    actor(): ScreepsReturnCode {
        let result = this.creep.harvest(this.target);
        this.logger.debug(this.creep.name,"harvesting");
        return result;
    }

    constructor(creep:Creep,target,canStop:()=>boolean) {
        super(creep);
        this.logger.setName(this.constructor.name);
        this.target = target;
        this.canStop=canStop;
    }
}