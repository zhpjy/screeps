"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
class Store extends action_1.Action {
    constructor(creep, target, canStop) {
        super(creep);
        this.logger.setName(this.constructor.name);
        this.target = target;
        this.canStop = canStop;
    }
    canStop() {
        throw new Error("Method not implemented.");
    }
    actor() {
        let result = this.creep.transfer(this.target, RESOURCE_ENERGY);
        this.logger.debug(this.creep.name, "storing");
        return result;
    }
}
exports.Store = Store;
