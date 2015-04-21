/**
 * Created by Administrator on 15-4-21.
 */
exports.response = function (res, status, obj) {
    var result = {};
    if(status==200){
        result.data = obj;
    }else{
        result = obj;
    }
    result.id = require('node-uuid').v4();
    result.status = status;
    return res.status(status).json(result);
};