import {Action} from './action';

export class Store extends Action {
    canStop(): boolean {
        throw new Error("Method not implemented.");
    }
    
    actor(): ScreepsReturnCode {
        let result = this.creep.transfer(this.target,RESOURCE_ENERGY);
        this.logger.debug(this.creep.name,"storing");
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