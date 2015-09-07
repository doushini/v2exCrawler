/**
 * Created by luohui on 15/9/7.
 */
var CrawException = require("./utils/crawException");
var fs = require('fs');
var Spider = require('./spider.js');
var logger = require('log4js').getLogger();

var pageNo = null;
if( pageNo===null ){
    pageNo = queryLastPage();
    if(pageNo!==null){
        setInterval(execute,1000);
    }
}

function queryLastPage(){
    var num = null;
    var content = fs.readFileSync('./config/data','utf-8');
    if(content){
        num = parseInt(content);
    }
    return num;
}

function writeLastPage() {
    fs.writeFileSync('./config/data',pageNo);
}

function execute(){
    try{
        crawPage(function (e) {
            if(e){
                throw new CrawException();
            }
            writeLastPage();
        });
    }catch(err){
        console.log("craw page "+ pageNo + " happened " + err.msg);
    }
}


function crawPage() {
    new Spider().setPage(++pageNo).go();
}
