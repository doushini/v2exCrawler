var express = require('express');
var router = express.Router();
var topicController = require('../controllers/topics');
var userController = require('../controllers/users');
var Auth = require('../middleware/authorization');

//api router
router
    .all('/api/*',Auth.hasLogin)
    .get('/api/topic',topicController.index)
    //.get('/api/beginCrawApi',topicController.beginCrawApi)
    //.get('/api/endCrawApi',topicController.endCrawApi)
    .post('/api/topic/create',topicController.save);
//front router
router
    .get('/login',userController.login)
    .get('/reg',userController.reg)
    .post('/login',userController.session)
    .post('/users/create',userController.create)
    .get('/topics/create',topicController.create)
    .get('/',topicController.index);

module.exports = router;
