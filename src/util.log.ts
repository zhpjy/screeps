/**
 * 日志工具类
 * 用法：
 *     引入
 *        import {Logger} from './util.log';
 *        let logger = Logger.getLogger('mount');
 *        强制关闭（无视config里的日志等级）：logger.off();
 *        强制打开（无视config里的日志等级）：logger.on();
 *        取消强制设定：logger.reset();
 *     使用
 *        logger.info("a");
 *        logger.warn("a","b");
 */

import { LOGGER_LEVEL } from './config';

export class Logger {
    //级别对应的数
    private LEVEL = new Map([["DEBUG", 1], ["INFO", 2], ["WARN", 3], ["ERROR", 4], ["OFF", 5]]);
    //级别
    private logSettingNum = 5;
    //日志强制开关
    private forceControl: boolean = null;
    private name = "";

    public static getLogger(name) {
        let logger = new Logger();
        logger.name = name;
        let num = logger.LEVEL.get(LOGGER_LEVEL);
        num ? logger.logSettingNum = num : logger.logSettingNum = 5;
        return logger;
    }

    private _canLog(levelNum) {
        if (levelNum == null) return false;
        return this.forceControl == true || levelNum >= this.logSettingNum && this.forceControl == null
    }

    private _log(level, messages) {
        if (this._canLog(this.LEVEL.get(level.trim()))) {
            console.log("[" + level + "][" + this.name + "]", messages.join(" "));
        }
    }

    public setName(name:string){
        this.name=name;
    }

    public off() {
        this.forceControl = false;
        return this;
    }

    public on() {
        this.forceControl = true;
        return this;
    }

    public reset() {
        this.forceControl = null;
        return this;
    }

    public debug(...message) {
        this._log("DEBUG", message);
    }

    public info(...message) {
        this._log("INFO ", message);
    }

    public warn(...message) {
        this._log("WARN ", message);
    }

    public error(...message) {
        this._log("ERROR", message);
    }

    public asset(check: boolean, ...message) {
        if (check) {
            this._log("ERROR", message);
        }
    }
}