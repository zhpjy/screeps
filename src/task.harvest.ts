import { Task, TaskType } from './task';
import { Move } from './action.move';
import { Harvest } from './action.harvest';
import { Store } from './action.store';


export class HarvestTask extends Task {

    constructor(type: TaskType, creep: Creep, mine, storage) {
        super(type, creep);
        this.logger.setName(this.constructor.name);
        let moveToMine = new Move(creep, mine,
            () => {
                let result = creep.harvest(mine);
                this.logger.debug("harvest,move",result);
                if (result == OK) {
                    return true;
                } else if (result == ERR_NOT_IN_RANGE) {
                    return false;
                } else {
                    throw new Error(result.toString());
                }
            }
        );

        let harvest = new Harvest(creep, mine,
            () => {
                if(this.creep.store.getFreeCapacity() == 0){
                    return true;
                }
                return false;
            }
        )

        let moveToStorage = new Move(creep, storage,
            () => {
                let result = creep.transfer(storage,RESOURCE_ENERGY);
                if (result == OK) {
                    return true;
                } else if (result == ERR_NOT_IN_RANGE) {
                    return false;
                } else {
                    throw new Error(result.toString());
                }
            }
        ); 

        let store = new Store(creep,storage,
            () =>{
                if(this.creep.store[RESOURCE_ENERGY] == 0){
                    return true;
                }
                return false;
            }
        )

        this.setOrder(moveToMine,harvest,moveToStorage,store);
    }
}