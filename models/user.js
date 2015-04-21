/**
 * Created by Administrator on 15-4-21.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    createDate:{
        type:Date,
        default:new Date()
    }
});

module.exports = mongoose.model('User',userSchema);
