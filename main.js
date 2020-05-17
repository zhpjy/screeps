const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const ruleBilder = require('role.builder');
const creepManager = require('manager.creep');
const constructionTower = require('construction.tower');
const utils = require('utils');

module.exports.loop = function () {
    //只有一个房间时，自动打开安全模式
    utils.activateSafeModeIfOnlyOneRoom();

    creepManager.autoGenerate();
    creepManager.autoClean();

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

    //统一管理功能性建筑当前工作
    //寻找当前房间内的防御塔
    var towerID = '';
    for(var id in Game.structures){
        if(Game.structures[id].structureType == 'tower'){
            towerID = id;
        }
    }
    var tower = Game.getObjectById(towerID);
    
    //调用
    if(tower){
        constructionTower.attack(tower);
        //console.log(tower)
        constructionTower.repair(tower);
    }
}