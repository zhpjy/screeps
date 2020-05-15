"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./task");
const action_move_1 = require("./action.move");
const action_harvest_1 = require("./action.harvest");
const action_store_1 = require("./action.store");
class HarvestTask extends task_1.Task {
    constructor(type, creep, mine, storage) {
        super(type, creep);
        this.logger.setName(this.constructor.name);
        let moveToMine = new action_move_1.Move(creep, mine, () => {
            let result = creep.harvest(mine);
            this.logger.debug("harvest,move", result);
            if (result == OK) {
                return true;
            }
            else if (result == ERR_NOT_IN_RANGE) {
                return false;
            }
            else {
                throw new Error(result.toString());
            }
        });
        let harvest = new action_harvest_1.Harvest(creep, mine, () => {
            if (this.creep.store.getFreeCapacity() == 0) {
                return true;
            }
            return false;
        });
        let moveToStorage = new action_move_1.Move(creep, storage, () => {
            let result = creep.transfer(storage, RESOURCE_ENERGY);
            if (result == OK) {
                return true;
            }
            else if (result == ERR_NOT_IN_RANGE) {
                return false;
            }
            else {
                throw new Error(result.toString());
            }
        });
        let store = new action_store_1.Store(creep, storage, () => {
            if (this.creep.store[RESOURCE_ENERGY] == 0) {
                return true;
            }
            return false;
        });
        this.setOrder(moveToMine, harvest, moveToStorage, store);
    }
}
exports.HarvestTask = HarvestTask;
