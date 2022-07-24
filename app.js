var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var loginRouter = require('./routes/login');//test
var joinRouter = require('./routes/join');//test
var InformationChangeRouter = require('./routes/information-change');//test
var showAllDataRouter = require('./routes/show-all-data');//test
//var deleteAccountRouter = require('./routes/delete-account_test');//test
var UpdateUsrStatus = require('./routes/Update-UsrStatus');//Develop
var ReadUsrData = require('./routes/Read-UsrData');//Develop
var UpdateUsrSleep = require('./routes/Update-UsrSleep');//Develop

var app = express();


// MariaDB Connect
//const maria = require('./database/connect/maria');
//maria.connect();

// view engine setup
//app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Set Port
app.set('port', process.env.PORT || 8000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);//test
app.use('/join', joinRouter);//test
app.use('/information-change',InformationChangeRouter);//test
app.use('/show-all-data', showAllDataRouter);//test
//app.use('/delete-account_test', deleteAccountRouter);//test
app.use('/Update-UsrStatus', UpdateUsrStatus);//Develop
app.use('/', ReadUsrData);//Develop 
app.use('/Update-UsrSleep', UpdateUsrSleep);//Develop

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

// add code
var server = app.listen(app.get('port'), function() {
	console.log('Express server Listening on port' + server.address().port);
});

//mysql add
var mysqlDB = require('./mysql-db');
mysqlDB.connect();

