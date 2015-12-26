/**
 * Created by luohui on 15/8/31.
 */
module.exports={};

function ServiceException(msg,clazz){
    this.message = msg || "crawler exception";
    this.name = clazz;
}

ServiceException.prototype = new Error();
ServiceException.prototype.constructor = ServiceException;

module.exports = ServiceException;
