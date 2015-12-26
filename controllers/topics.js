var Topic = require('../models/topic'),
    Page = require('../config/page');
    ServiceException = require('../utils/ServiceException');

exports.create = function (req, res) {
    res.render('topics/create', {
        title: '发表'
    });
};
exports.save = function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
};

exports.index = function (req, res) {
    var page = new Page(req.query.p > 0 ? req.query.p : 0);
    Topic.find().sort({"createDate": -1}).skip(page.pageSize * page.pageNo).limit(page.pageSize)
        .exec(function (error, topics) {
            if(error) throw new ServiceException('主题列表查询异常');
            page.setItems(topics);
            Topic.count(function (err, count) {
                if(error) throw new ServiceException('主题列表统计查询异常');
                page.setTotalCount(count);
                res.render('index', {'title': '工作',"page":page});
            });
        });
};
