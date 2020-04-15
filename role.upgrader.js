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
            {
                show:()=>{
                    this.say('🔄 harvest');
                },
                do:()=>{
                    utils.harvest(creep);
                }
            },
            {
                show:()=>{
                    this.say('⚡ upgrade');
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