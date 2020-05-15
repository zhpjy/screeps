"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_log_1 = require("./util.log");
const constant_1 = require("./constant");
var TaskType;
(function (TaskType) {
    TaskType[TaskType["once"] = 0] = "once";
    TaskType[TaskType["loop"] = 1] = "loop";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
class Task {
    constructor(type, creep) {
        this.logger = util_log_1.Logger.getLogger("default");
        this.actionArray = new Array();
        this.creep = creep;
        this.type = type;
        this.logger.setName(this.constructor.name);
    }
    setOrder(...actionArray) {
        //用null占位
        this.actionArray.push(null);
        actionArray.forEach((value) => {
            this.actionArray.push(value);
        });
    }
    do() {
        let stap = 1;
        let lastResult = 0;
        if (this.creep.memory.stap != null) {
            stap = this.creep.memory.stap;
            this.logger.debug(this.creep.name, "stap", stap);
        }
        if (this.creep.memory.lastResult != null) {
            lastResult = this.creep.memory.lastResult;
            this.logger.debug(this.creep.name, "lastResult", lastResult);
        }
        //如果一个动作执行结束
        if (lastResult == constant_1.ActionReturnEnum.NEED_STOP) {
            if (stap < this.actionArray.length - 1) {
                //task未执行完，一个动作执行完了
                stap++;
                lastResult = 0;
                this.logger.debug(this.creep.name, "next stap");
            }
            else if (this.type == TaskType.loop) {
                //task最后一个动作,task类型为循环
                stap = 1;
                lastResult = 0;
                this.logger.debug(this.creep.name, "do task again");
                this.creep.memory.lastResult = lastResult;
                this.creep.memory.stap = stap;
                return;
            }
            else {
                //task最后一个动作,task类型为一次
                //0表示空闲
                stap = 0;
                lastResult = 0;
                this.logger.debug(this.creep.name, "task finish");
                this.creep.memory.lastResult = lastResult;
                this.creep.memory.stap = stap;
                //TODO 放入空闲队列,等待调度
                return;
            }
        }
        if (stap > 0) {
            this.logger.asset(stap > this.actionArray.length, "数组越界");
            //执行action
            let code = this.actionArray[stap].do();
            this.logger.debug(this.creep.name, "actionResult", code);
            this.creep.memory.lastResult = code;
            this.creep.memory.stap = stap;
        }
    }
}
exports.Task = Task;
