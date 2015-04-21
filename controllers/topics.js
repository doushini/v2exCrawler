/**
 * Created by Administrator on 15-4-21.
 */
var Topic = require('../models/topic');
var utils = require('../utils/utils');
var crawler = require('../crawler');

exports.create = function (req, res) {
    res.render('topics/create',{
        title:'发表'
    });
};
exports.save = function (req, res) {
    var title = req.body.title;
    var content = req.body.content;

};

exports.getAll = function (req, res) {
    var page = (req.query.page >0 ? req.query.page : 1)-1;
    var perPage = 5;
    Topic.find().sort({"createDate":-1}).skip(perPage * page).limit(perPage)
        .exec(function (error, topics) {
            if(error){
                return utils.response(res,500,error);
            }

            Topic.count(function (err, count) {
                if(error){
                    return utils.response(res,500,error);
                }
                return utils.response(res,200,{"topics":topics,"count":count});
            });
        });
};

var scheduleCraw;
exports.beginCrawApi = function (req, res) {
    scheduleCraw = setInterval(crawler.hotTopics,10000);
    return utils.response(res,200,"craw ing ...");
};

exports.endCrawApi = function (req, res) {
    clearInterval(scheduleCraw);
    return utils.response(res,200,"craw end ...");
};