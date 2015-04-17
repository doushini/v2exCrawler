/**
 * Created by Administrator on 15-4-17.
 */
var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
    memberId:Number,
    username:String,
    avatar_normal:String
});

module.exports = mongoose.model( 'Member',memberSchema );