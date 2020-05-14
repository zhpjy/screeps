const CONFIG = require('config')

class Logger{
    constructor(){
        this.LEVEL = new Map([["DEBUG",1],["INFO",2],["WARN",3],["ERROR",4],["OFF",5]])
        this.logSettingNum = 5;
        this.forceControl=null;
        this.name = "";
    }

    static getLogger(name){
        let logger = new Logger();
        logger.name = name;
        let num = logger.LEVEL.get(CONFIG.LOGGER_LEVEL);
        num ? logger.logSettingNum=num:logger.logSettingNum=5;
        return logger;
    }

    _canLog(levelNum){
        if(levelNum==null) return false;
        return this.forceControl==true||levelNum>=this.logSettingNum&&this.forceControl==null
    }

    _log(level,messages){
        if(this._canLog(this.LEVEL.get(level.trim()))){
            console.log("["+level+"]["+this.name+"]",messages.join(" "));
        }
    }

    setName(name){
        this.name=name;
    }

    off(){
        this.forceControl=false;
        return this;
    }

    on(){
        this.forceControl=true;
        return this;
    }

    debug(...message){
        this._log("DEBUG",message)
    }

    info(...message){
        this._log("INFO ",message)
    }
    
    warn(...message){
        this._log("WARN ",message)
    }

    error(...message){
        this._log("ERROR",message)
    }
}

module.exports = Logger;