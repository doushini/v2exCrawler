var express = require('express');
require('./mongoose.js');
require('./craw.js');
var app = express();
require('./config/express')(app,express);
module.exports = app;