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
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
    } 
}

module.exports = {
    setWrokingToggole:setWrokingToggole,
    harvest:harvest
};