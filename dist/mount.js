"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_log_1 = require("./util.log");
let logger = util_log_1.Logger.getLogger('mount');
function default_1() {
    if (!global.hasExtension) {
        console.log('[mount] 重新挂载拓展');
        global.hasExtension = true;
    }
}
exports.default = default_1;
