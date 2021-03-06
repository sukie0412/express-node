var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var flash = require('connect-flash');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var aaRouter = require('./routes/aa');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // public 目录下的资源对外开放访问

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/aa', aaRouter);

// app.use(
//     cookieSession({
//         secret:settings.cookieSecret, //加密
//         keys: settings.db,
//         maxAge: 2 * 60 * 1000,
//     })
// );
app.use(
    cookieSession({
        keys: ['bbb'],
        maxAge: 2 * 60 * 1000
    })
);
app.use(flash());

app.use(function(req, res, next) {
    console.log('看我');
    console.log('app----req.session.isLogin', req.session.isLogin);
    if (req.session.isLogin == undefined) {
        req.flash('error', '请先登录');
        res.redirect('/login.html');
        console.log('--未登录');
    }else{
        // catch 404 and forward to error handler
        next(createError(404));
    }
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
