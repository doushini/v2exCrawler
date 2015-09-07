/**
 * Created by luohui on 15/9/7.
 */
module.exports = {};
function CrawException(msg,clazz){
    Error.captureStackTrace(this);
    this.msg = msg || "craw error";
    this.clazz = clazz || CrawException;
}
CrawException.prototype = new Error();
CrawException.prototype.constructor = CrawException;

module.exports = CrawException;
