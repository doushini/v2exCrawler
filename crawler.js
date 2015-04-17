/**
 * Created by Administrator on 15-4-17.
 */
var https = require('https');
var config = require('./config/config.json');
var requestHttp = config.http;

exports.hotTopics = function () {
    sendGet( requestHttp.hotTopic, function (data) {
        var topicArray = JSON.parse( data );
        console.log( data );
        console.log( topicArray );
    } );
};

var sendGet = function( url,callback ){
    https.request( url, function (res) {
        var response = [];
        var size = 0;

        res.on('data', function (data) {
            response.push( data );
            size += data.length;
        });

        res.on('end', function (data) {
            response = Buffer.concat( response,size );
            console.log( response );
            callback( data );
        })
    }).on('error', function (e) {
        console.log( e );
    });
};
