var constructionTower = {
    //检测到进入范围的敌人自动攻击，以距离为准
    attack: function (tower) {
        //攻击函数
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile) {
            tower.attack(hostile);
        }

    },

    //检测到范围内需要维修、保养的劳工自动进行维护，以距离为为准
    repair: function (tower) {
        //维护函数
        if (tower.store[RESOURCE_ENERGY] > 500) {
            var damage = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>
                    //如果是墙，充到一定值就算了
                    (structure.structureType == STRUCTURE_WALL && structure.hits < 100*1000) ||
                    (structure.structureType == STRUCTURE_RAMPART && structure.hits < 100*1000) ||
                    //非墙建筑不满就修
                    (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax)
            });
            if (damage) {
                tower.repair(damage);
            }
        }

    }
}

module.exports = constructionTower;
