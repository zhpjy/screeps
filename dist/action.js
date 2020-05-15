"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_log_1 = require("./util.log");
const constant_1 = require("./constant");
class Action {
    constructor(creep) {
        this.logger = util_log_1.Logger.getLogger("default");
        this.creep = creep;
        this.logger.setName(this.constructor.name);
    }
    /**
     * 执行动作
     * 返回动作执行的结果
     * @returns {number}
     * @memberof Action
     */
    do() {
        let code = constant_1.ActionReturnEnum.NEED_STOP;
        //如果不能停止
        if (!this.canStop()) {
            code = this.actor();
        }
        return code;
    }
}
exports.Action = Action;
