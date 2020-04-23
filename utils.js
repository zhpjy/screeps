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
        let target = Game.getObjectById(sourceId)
        moveToHarvest(target,creep);
    }else{
        sourceId = creep.memory.sourceId;
        let target = Game.getObjectById(sourceId)
        moveToHarvest(target,creep);
    }
    function moveToHarvest(target,creep){
        let result = creep.harvest(target)
        if(result==ERR_BUSY){
            return;
        }
        if(target){
            if(result == ERR_NOT_IN_RANGE){
                //如果不在范围内则移动至
                let r = creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                if(r==ERR_NO_PATH){
                    //找不到路径，说明挤满了，换一个
                    console.log("no way")
                    creep.memory.sourceId=null; 
                }else{
                   if(r!=0){
                    console.log("util",r)
                    creep.memory.sourceId=null; 
                   } 
                }
            }else if(result == ERR_NOT_ENOUGH_RESOURCES){
                //一个矿挖完了就换一个
                creep.memory.sourceId=null; 
            }else{
                if(result!=0){
                    console.log("h",result)
                }
            }
        }
    }
}

function upgradeWork(creep){
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    } 
}

function randomColor(){

}

function findClose(){

}

//findTargetCallback需要返回一个数组
function setWorkTarget(creep,findTargetCallback,doWrokCallback,randomWrokCallBack){
    if(creep.memory.workTargetId){
        //有工作目标
        let workTargetId = creep.memory.workTargetId;
        if(findTargetCallback(workTargetId).length==0){
            //找不到工作目标
            creep.memory.workTargetId=null;
        }else{
            doWrokCallback(workTargetId);
        }
    }else{
        //没有工作目标
        let workTarget = randomWrokCallBack();
        let workTargetId = workTarget.id;
        
    }
}

function idGen(){

}

function doAndShowError(){

}

module.exports = {
    setWrokingToggole:setWrokingToggole,
    harvest:harvest,
    upgradeWork:upgradeWork
};