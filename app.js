var express = require('express');
var mongoose = require('./mongoose.js');

//var schedule = require('./schedule.js');
//require('./crawler.js').hotTopics();
var app = express();

require('./config/express')(app,express);
module.exports = app;
