var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({
    username: String,
    avatar: String
});

module.exports = mongoose.model('Member', memberSchema);
