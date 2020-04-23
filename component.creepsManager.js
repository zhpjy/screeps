const CONFIG = require('config');

function autoClean(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

//检测Spawns中是否有足够Energy
function checkSpawnsEnergy(){
    if(Game.spawns[CONFIG.SPAWN_NAME].energy >= 200){
        return true;
    }
}

//生成Creep，日后如memory中有更多参数需要传入再行更改
function generateCreep(creepRole){
    if(checkSpawnsEnergy()){
        var newName = creepRole + Game.time;
        console.log('Spawning a new creep: ' + newName);
        Game.spawns[CONFIG.SPAWN_NAME].spawnCreep(CONFIG.WORKER_TEMPLATE, newName, {memory: {role: creepRole}});
    }
}

function autoGenerate(){
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log("harvesters:"+harvesters.length+" builders"+builders.length+" upgrader:" + upgrader.length)

    //使用while以实现如资源不足则在当前循环内不断等待，而不是打断整个函数执行
    while(harvesters.length<CONFIG.HARVESTER_NUM){
        generateCreep('harvester');
    }

    while(upgrader.length < CONFIG.UPGRASER_NUM) {
        generateCreep('upgrader');
    }

    while(builders.length < CONFIG.BUILDER_NUM) {
        generateCreep('builder');
    }
}


module.exports = {
    autoClean:autoClean,
    autoGenerate:autoGenerate
};