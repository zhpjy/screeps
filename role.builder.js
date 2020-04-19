const utils = require('utils');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function work(){
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[3], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }

        utils.setWrokingToggole(
            null,
            {
                show:()=>{
                    creep.say('🚧 build');
                },
                do:()=>{
                    work();
                } 
            },
            creep
        )
	}
};

module.exports = roleBuilder;