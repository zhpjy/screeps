const utils = require('utils');
let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function work(){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            } 
        }

        utils.setWrokingToggole(
            null,
            {
                show:()=>{
                    creep.say('⚡ upgrade');
                },
                do:()=>{
                    work();
                } 
            },
            creep
        )
    }
};

module.exports = roleUpgrader;