const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const ruleBilder = require('role.upgrader');
const creepManager = require('component.creepsManager');

module.exports.loop = function () {


    creepManager.autoGenerate();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            ruleBilder.run(creep);
        }
    }
}