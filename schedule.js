/**
 * Created by Administrator on 15-4-17.
 */
var schedule = require('node-schedule');
var craw = require('./crawler.js');

var times = [];
for(var i=0;i<60;i++){
    times.push(i);
}

var rule = new schedule.RecurrenceRule();
rule.second = times;

var j = schedule.scheduleJob(rule, function () {
    craw.hotTopics();
});



