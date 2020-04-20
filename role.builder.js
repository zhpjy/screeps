const utils = require('utils');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function work(creep){
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                utils.upgradeWork(creep);
            }
        }

        utils.setWrokingToggole(
            null,
            {
                show:()=>{
                    creep.say('🚧 build');
                },
                do:()=>{
                    work(creep);
                } 
            },
            creep
        )
	}
};

module.exports = roleBuilder;