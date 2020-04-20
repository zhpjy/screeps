//设置身上矿满了之后和空了两种工作状态互相切换。当first设置为null时，则默认设置为采矿
//first,second都是字面量对象，有show方法(显示的内容)和do方法(工作的内容)
function setWrokingToggole(first,second,creep){
    if(first==null){
        first={
            show:()=>{
                creep.say('🔄 harvest');
            },
            do:()=>{
                harvest(creep);
            }
        }
    }
    if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
        first.show();
    }
    if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
        second.show();
    }
    if(creep.memory.working){
        second.do();
    }else{
        first.do();
    }
}

function harvest(creep){
    let sourceId = null;
    let sources = creep.room.find(FIND_SOURCES);
    if(creep.memory.sourceId==null){
        creep.memory.sourceId = sources[0].id;
        sourceId = creep.memory.id; 
        let targets = _.filter(sources, (s) => s.id == sourceId);
        moveToHarvest(targets,creep);
    }else{
        sourceId = creep.memory.sourceId;
        let targets = _.filter(sources, (s) => s.id == sourceId);
        moveToHarvest(targets,creep);
    }
    function moveToHarvest(targets,creep){
        if(targets.length>0&&creep.harvest(targets[0]) == ERR_NOT_IN_RANGE){
            let r = creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            if(r!=0){
                creep.memory.source=null; 
            }
        }
    }
}

function upgradeWork(creep){
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    } 
}


module.exports = {
    setWrokingToggole:setWrokingToggole,
    harvest:harvest,
    upgradeWork:upgradeWork
};