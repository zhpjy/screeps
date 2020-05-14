import { Logger } from "./util.log";
import {ActionReturnEnum} from "./constant"

export abstract class Action {
    protected creep:Creep;
    protected logger = Logger.getLogger("default");
    constructor(creep:Creep) {
        this.creep = creep;
        this.logger.setName(this.constructor.name);
    }
    protected  abstract canStop():boolean;

    //具体动作
    protected abstract actor():ScreepsReturnCode;
    
    /**
     * 执行动作
     * 返回动作执行的结果
     * @returns {number}
     * @memberof Action
     */
    public do():number{
        let code:number = ActionReturnEnum.NEED_STOP;
        //如果不能停止
        if(!this.canStop()){
            code = this.actor();
        }
        return code;
    }
}