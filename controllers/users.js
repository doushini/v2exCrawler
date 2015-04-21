/**
 * Created by Administrator on 15-4-21.
 */
var mongoose = require('mongoose');
var User = require('../models/user');
var crypto = require('crypto');

exports.login = function (req, res) {
    res.render('users/login',{
        title:'登录'
    });
};

exports.reg = function (req, res) {
    res.render('users/reg',{
        title:'注册'
    });
};

exports.create = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.find({"username":username}, function (e, u) {
        if(e){
            console.log(e);
        }
        if(u){
            if(u.length>0){
                res.render('users/reg',{
                    title:'用户已存在！'
                });
            }else{
                var md5 = crypto.createHash('md5');
                password = md5.update(password).digest('base64');
                var user = new User({
                    username:username,
                    password:password
                });
                user.save(function (e) {
                    if(e){
                        console.log(e);
                    }
                    res.redirect("/login");
                });
            }
        }
    });
};

exports.session = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('base64');

    User.find({"username":username,"password":password}, function (e, u) {
        if(e){
            console.log(e);
        }
        if(u){
            if(u.length>0){
                req.session.user = u[0];
                res.redirect('/api/topic');
            }else{
                res.render('users/login',{
                    title:'用户名不存在！'
                });
            }
        }
    });
};
