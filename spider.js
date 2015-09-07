/**
 * Created by luohui on 15/9/7.
 */
var URL = "http://v2ex.com/go/jobs?p=$";
var logger = require('log4js').getLogger();
var httpUtil = require('./utils/httpUtil.js');
var jQuery = require('jQuery');
var Topic = require('./models/topic.js');

function Spider(){

}

Spider.prototype.setPage = function (page) {
    var self = this;
    self.page = page;
    self.url = URL.replace('$',page);
    return self;
};

Spider.prototype.handle = function (body) {
    var items = $(body).find('#cell table tr').html();
    console.log(items);
    //new Topic({
    //    topicId:$(body).find('span[property="v:itemreviewed"]').text(),
    //    topicId:$(body).find('#cell span:nth-child(1) a').text()
    //}).save();
};

Spider.prototype.save = function (item) {

};

Spider.prototype.go = function () {
    httpUtil.get(this.url,function(body){
        this.handle(body);
    });
};

module.exports = Spider;