var express = require('express');
var router = express.Router();
var topicController = require('../controllers/topics');
var userController = require('../controllers/users');
var Auth = require('../middleware/authorization');

//api router
router
    .all('/api/*',Auth.hasLogin)
    .get('/api/topic',topicController.getAll)
    .get('/api/beginCrawApi',topicController.beginCrawApi)
    .get('/api/endCrawApi',topicController.endCrawApi)
    .post('/api/topic/create',topicController.save);
//front router
router
    .get('/login',userController.login)
    .get('/reg',userController.reg)
    .post('/login',userController.session)
    .post('/users/create',userController.create)
    .get('/topics/create',topicController.create);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
