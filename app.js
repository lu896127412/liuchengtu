var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var admin = require('./router/admin'); // 后台
var web = require('./router/web'); // 前端

var aa = require('express-async-await');
var app = aa(express())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.post('/admin/upimg', web.upimg);


app.post('/web/zhuce', web.zhuce);
app.post('/web/login', web.login);
app.post('/web/addlist', web.addlist);
app.post('/web/list', web.list);
app.post('/web/dellist', web.dellist);
app.post('/web/hqlist', web.hqlist);
app.post('/web/savelist', web.savelist);

app.post('/web/jsondata', web.jsondata);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
