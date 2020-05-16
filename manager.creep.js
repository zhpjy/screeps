const CONFIG = require('config');
const logger = require('util.log').getLogger("manager.creep");
const utils = require('utils');

function autoClean(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            logger.debug('Clearing non-existing creep memory:', name);
        }
    }
}

function autoGenerate(){
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    logger.debug("harvesters:"+harvesters.length,"builders"+builders.length,"upgrader:" + upgrader.length)

    let spawnCreepCost=utils.calCreepCost(CONFIG.WORKER_TEMPLATE);
    //第一个房间的能量总数
    let energyAvlable=Game.rooms[(Object.keys(Game.rooms)[0])].energyCapacityAvailable;
    if(spawnCreepCost>energyAvlable){
        return;
    }

    if(harvesters.length<CONFIG.HARVESTER_NUM){
        var newName = 'Harvester' + Game.time;
        logger.info('Spawning new harvester: ' + newName);
        Game.spawns[CONFIG.SPAWN_NAME].spawnCreep(CONFIG.WORKER_TEMPLATE, newName, {memory: {role: 'harvester'}});
        //采矿工人数目不达标不生产别的工人
        return;
    }

    if(upgrader.length < CONFIG.UPGRASER_NUM) {
        var newName = 'Upgrader' + Game.time;
        logger.info('Spawning new upgrader: ' + newName);
        Game.spawns[CONFIG.SPAWN_NAME].spawnCreep(CONFIG.WORKER_TEMPLATE, newName, 
            {memory: {role: 'upgrader'}});        
    }

    if(builders.length < CONFIG.BUILDER_NUM) {
        var newName = 'Builder' + Game.time;
        logger.info('Spawning new builder: ' + newName);
        Game.spawns[CONFIG.SPAWN_NAME].spawnCreep(CONFIG.WORKER_TEMPLATE, newName, 
            {memory: {role: 'builder'}});        
    }
}


module.exports = {
    autoClean:autoClean,
    autoGenerate:autoGenerate
};