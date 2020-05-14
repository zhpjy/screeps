import {Logger} from './util.log';
import { HarvestTask } from './task.harvest';
import { TaskType } from './task';
let logger = Logger.getLogger('main');

let mine = Game.getObjectById("a3ea0773646985b");
let storage = Game.getObjectById("3d71f8557cb401a");
module.exports.loop = function (): void {
    // logger.debug("new tick");

    let creep = Game.getObjectById("6c7496852cd118c");

    let task = new HarvestTask(TaskType.loop,creep as Creep,mine,storage);
    task.do();
}