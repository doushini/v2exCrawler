var mongoose = require('mongoose');
var member = require('../models/member');

var topicSchema = mongoose.Schema({
    title: String,
    url: String,
    content: String,
    member: [member.schema],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Topic', topicSchema);
