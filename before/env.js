const CONFIG = require('config');

//新添加的函数在旧函数之前执行
Function.prototype.before=function (beforefn) {
    var _this= this;                               //保存旧函数的引用
    return function () {                           //返回包含旧函数和新函数的“代理”函数
        beforefn.apply(this,arguments);            //执行新函数,且保证this不被劫持,新函数接受的参数
        return _this.apply(this,arguments);        // 也会被原封不动的传入旧函数,新函数在旧函数之前执行
    };
};

//新添加的函数在旧函数之后执行
Function.prototype.after=function (afterfn) {
    var _this=this;
    return function () {
        var ret=_this.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    };
};

function setErrorLog(){
    if(this.ret!=0){
        console.log(_this.name,"返回了结果",ret);
    }
}

function setEnv(){
    if(CONFIG.DEBUG){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creep.harvest.after(setErrorLog);
        }
    }
}

module.exports = {
    setEnv:setEnv
};