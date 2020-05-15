"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 挂载拓展到 Creep 原型
function default_1() {
    if (!Creep.prototype._move)
        Creep.prototype._move = Creep.prototype.move;
    _.assign(Creep.prototype, CreepExtension.prototype);
}
exports.default = default_1;
class CreepExtension extends Creep {
    doing() {
    }
    stop() {
        this.doing = undefined;
    }
}
