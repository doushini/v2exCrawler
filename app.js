var express = require('express');
require('./craw.js').begin();
var app = express();
require('./express')(app,express);
module.exports = app;
