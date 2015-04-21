/**
 * Created by Administrator on 15-4-17.
 */
var https = require('https');
var config = require('./config/config.json');
var requestHttpUrl = config.http;
var Topic = require('./models/topic.js');
var Member = require('./models/member.js');

exports.hotTopics = function () {
    console.log( new Date()+ "begin to craw api");
    httpsGet( requestHttpUrl['hotTopic'], function (data) {
        var topicArray = JSON.parse( data );
        if( topicArray ){
            topicArray.forEach(function (topic) {

                var member = new Member({
                    memberId:topic['member']['id'],
                    username:topic['member']['username'],
                    avatar_normal:topic['member']['avatar_normal']
                });

                var entity = new Topic({
                    topicId:topic['id'],
                    title:topic['title'],
                    url:topic['url'],
                    content:topic['content'],
                    replies:topic['replies'],
                    member:member
                });

                entity.save(function (e) {
                    if(e){
                        console.log(e);
                    }
                });
            });
        }
    });
};

var httpsGet = function ( url,callback ) {
    https.get( url, function (res) {
        var size = 0;
        var chunk = [];

        res.on('data', function (d) {
            size += d.length;
            chunk.push( d );
        });

        res.on('end', function () {
            var data = Buffer.concat( chunk,size );
            callback( data.toString() );
        });

    }).on('error', function (e) {
        console.log( e );
    });
};