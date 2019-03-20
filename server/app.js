const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('server:server');
const http = require('http');

const github = require('./routes/github');
const stackoverflow = require('./routes/stackoverflow');
const msdn = require('./routes/msdn');

//const db = require('./mongo')
//db.connect();

const app = express();
app.set('port', process.env.PORT || 8000);

//app.use(favicon(path.join(__dirname, '.', 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, './', 'build')));

app.use('/api/github/v1/', github);
app.use('/api/stackoverflow/v1/', stackoverflow);
app.use('/api/msdn/v1/', msdn);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);

server.listen(8000);

module.exports = app;
