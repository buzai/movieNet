/**
 * Created by Administrator on 2016/5/11.
 */
var express = require('express');
var static = require('serve-static');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var port = process.env.PORT || 3000;
var app = express();
var connect = require('connect');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var dbUrl = 'mongodb://localhost/imoocc';
mongoose.connect(dbUrl);

app.use(cookieParser());
app.use(session({
    secret: 'foo',
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(static('public'));
app.set('views','./app/views/pages/');
app.set('view engine','jade');
app.locals.moment = require('moment');


if ( 'development' === app.get('env') ) {
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

//设置路由
require('./config/routes')(app)

app.listen(port)
console.log('moview is staring '+port)




