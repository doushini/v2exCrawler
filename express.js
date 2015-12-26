var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';
var responseTime = require('response-time');
var compression = require('compression');
var session = require('express-session');//The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.
var routes = require('./routes/index');

module.exports = function (app, express) {
    // view engine setup
    app.set('env', env);
    app.set('views', path.join(__dirname, './views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, './public')));
    app.use(session({
        genid: function (req) {
            return require('node-uuid').v4();// use UUIDs for session IDs
        },
        secret: 'keyboard cat'
    }));

    // route app
    app.use(routes);

    if (app.get('env') === 'development') {
        app.use(responseTime());
    } else {
        app.use(compression({
            filter: function (req, res) {
                return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
            },
            level: 9
        }));
    }

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
