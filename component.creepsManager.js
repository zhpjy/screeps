const CONFIG = require('config');

function autoClean(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function autoGenerate(){
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log("harvesters:"+harvesters.length+" builders"+builders.length+" upgrader:" + upgrader.length)

    if(Game.spawns['Spawn1'].energy<200){
        return;
    }

    if(harvesters.length<CONFIG.HARVESTER_NUM){
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
        //采矿工人数目不达标不生产别的工人
        return;
    }

    if(upgrader.length < CONFIG.UPGRASER_NUM) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }

    if(builders.length < CONFIG.BUILDER_NUM) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
}


module.exports = {
    autoClean:autoClean,
    autoGenerate:autoGenerate
};