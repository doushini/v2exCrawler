/**
 * Created by luohui on 15/10/1.
 */
var async = require('async'),
    fs = require('fs'),
    url = require('./config/config').url,
    httpUtil = require('./utils/httpUtil'),
    cheerio = require('cheerio'),
    Topic = require('./models/topic'),
    Member = require('./models/member'),
    page = 0,
    path = require('path').join(__dirname,'config/data.json');
    require('./mongoose.js');

var readLastPage = function (callback) {
    fs.readFile(path, function (err, data) {
        if (err)return callback(err);
        page = parseInt(data.toString());
        callback(null);
    });
};

var sendRequest = function (callback) {
    var localUrl = url + page;
    console.log("localUrl: " + localUrl);
    httpUtil.req(localUrl, function (body) {
        callback(null, body);
    })
};

var parseBody = function (body, callback) {
    var $ = cheerio.load(body);
    var members = [], topics = [];
    $("#TopicsNode .cell").each(function (i, elem) {
        $ = cheerio.load($(this).html());
        var title = $(".item_title").text();
        var url = $(".item_title a").attr('href');
        var author = $(".small.fade a").text();
        var avatar = $("img").attr('src');

        var member = new Member({
            username: author,
            avatar: avatar
        });

        var topic = new Topic({
            title: title,
            url: url,
            member: member
        });

        members.push(member);
        topics.push(topic);
    });
    callback(null,members, topics);
};

var saveMembers = function (members, topics, callack) {
    async.each(members, function (item, cb) {
        item.save(function (e) {
            cb(e);
        });
    }, function (err) {
        callack(err, topics);
    })
};

var saveTopics = function (topics, callack) {
    async.each(topics, function (item, cb) {
        item.save(function (e) {
            cb(e);
        });
    }, function (err) {
        callack(err);
    })
};

var writeLastPage = function (callback) {
    fs.writeFile(path,++page, function (err) {
        callback(err);
    })
};

var craw = function () {
    async.waterfall([readLastPage, sendRequest, parseBody, saveMembers, saveTopics, writeLastPage], function (err, result) {
        if (err) {
            return console.log(err);
        }
        console.log("over page :"+page);
        setTimeout(craw,1000*60);
    });
};

exports.begin = function () {
    craw();
};
