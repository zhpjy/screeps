const utils = require('utils');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        function work(creep) {
            if (!creep.memory.workTargetId) {
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (target) {
                    creep.memory.workTargetId = target.id;
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    } else {
                        utils.upgradeWork(creep);
                    }
                }
            } else {
                let target = Game.getObjectById(creep.memory.workTargetId);
                let r = creep.transfer(target, RESOURCE_ENERGY)
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                } else if (r == ERR_FULL||r == ERR_INVALID_TARGET) {
                    //如果满了
                    creep.memory.workTargetId = null;
                } else {
                    console.log("r", r)
                }
            }
        }

        utils.setWrokingToggole(
            null,
            {
                show: () => {
                    creep.say('store');
                },
                do: () => {
                    work(creep);
                }
            },
            creep
        )
    }
}

module.exports = roleHarvester;