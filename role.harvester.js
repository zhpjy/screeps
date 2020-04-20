const utils = require('utils');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function work(creep) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }

        utils.setWrokingToggole(
            null,
            {
                show:()=>{
                    creep.say('store');
                },
                do:()=>{
                    work(creep);
                } 
            },
            creep
        )
	}
};

module.exports = roleHarvester;