/**
 * Created by Administrator on 15-4-17.
 */
var mongoose = require('mongoose');
var member = require('../models/member');


var topicSchema = mongoose.Schema({
    topicId:Number,
    title:String,
    url:String,
    content:String,
    replies:Number,
    member:[member.schema],
    created:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model( 'Topic',topicSchema );