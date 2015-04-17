/**
 * Created by Administrator on 15-4-17.
 */
var config = require('./config/config.json');
var mongoose = require('mongoose');
console.log( config.db.mongoose );
var db = mongoose.createConnection( config.db.mongoose );

db.on('error', function (e) {
    console.log( e );
});

