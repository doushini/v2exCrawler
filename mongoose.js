/**
 * Created by Administrator on 15-4-17.
 */
var config = require('./config/config.json');
var mongoose = require('mongoose');
mongoose.connect( config.db.mongoose );
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error :') );
db.on('open', function (callback) {
    console.log("db open ");
});

