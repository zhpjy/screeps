import {Logger} from './util.log';
let logger = Logger.getLogger('mount');

export default function (): void {
    if (!global.hasExtension) {
        console.log('[mount] 重新挂载拓展')

        global.hasExtension = true
    }
}