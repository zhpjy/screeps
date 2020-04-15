Game.creeps['Upgrader1'].suicide()
JSON.stringify(Game.spawns['Spawn1'])
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1',{ memory: { role: 'upgrader' } } )