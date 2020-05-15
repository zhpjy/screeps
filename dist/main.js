"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_log_1 = require("./util.log");
const task_harvest_1 = require("./task.harvest");
const task_1 = require("./task");
let logger = util_log_1.Logger.getLogger('main');
let mine = Game.getObjectById("a3ea0773646985b");
let storage = Game.getObjectById("3d71f8557cb401a");
module.exports.loop = function () {
    // logger.debug("new tick");
    let creep = Game.getObjectById("6c7496852cd118c");
    let task = new task_harvest_1.HarvestTask(task_1.TaskType.loop, creep, mine, storage);
    task.do();
};
