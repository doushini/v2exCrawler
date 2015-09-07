/**
 * Created by luohui on 15/9/7.
 */
var request = require('request');
var CrawException = require("../utils/crawException");

function HttpUtil(){

}

HttpUtil.prototype.get = function (url, callback) {
    request(url, function (err, response, body) {
        if(err){
            throw new CrawException("request error :",err);
        }
        var status = response.statusCode;
        if(status!=200){
            throw new CrawException("request code :"+status);
        }
        callback(body);
    });
};

module.exports = new HttpUtil();