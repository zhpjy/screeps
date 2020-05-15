"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
class Move extends action_1.Action {
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
        let result = this.creep.moveTo(this.target);
        this.logger.debug(this.creep.name, "moving");
        return result;
    }
}
exports.Move = Move;
