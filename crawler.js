/**
 * Created by Administrator on 15-4-17.
 */
var https = require('https');
var config = require('./config/config.json');
var requestHttp = config.http;
var Topic = require('./models/topic.js');

exports.hotTopics = function () {
    httpsGet( requestHttp.hotTopic, function (data) {
        var topicArray = JSON.parse( data );
        if( topicArray ){
            topicArray.forEach(function (topic) {

            });
        }
    });
};

var httpsGet = function ( url,callback ) {
    https.get( url, function (res) {
        res.on('data', function (d) {
            callback(d.toString() );
        });
    } );
};

var saveTopic = function ( t ) {
    new Topic( t).save();
};