
// 挂载拓展到 Creep 原型
export default function () {
    if (!Creep.prototype._move) Creep.prototype._move = Creep.prototype.move

    _.assign(Creep.prototype, CreepExtension.prototype)
}

class CreepExtension extends Creep {
    doing(){
    }

    stop(){
        this.doing=undefined;
    }
}