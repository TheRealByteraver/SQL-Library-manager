var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { sequelize, Sequelize } = require('./models'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Successfully connected to the database');
  } catch(error) {
    console.log('Error occured connecting to the database: ', error);
  }
})();

// catch 404 errors
app.use(function(req, res, next) {
  const err = new Error('The page you are looking for does not exist.🤷‍♂️');
  err.status = 404;
  next(err); // let the error handler below handle it further    
  // res.status(404);
  // res.render('page-not-found.pug', { title: 'Page Not Found', error: err });
});

// catch all other errors
app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  console.log(`Error ${err.status} : ${err.message}`);

  // clean up the error message for the user:
  err.message = (req.app.get('env') === 'development')
    ? err.message 
    : 'Internal Server Error 🙅‍♂️';

  // tell the browser what is going on
  res.status(err.status);

  // render the error page
  if (err.status === 404) {
    res.render('page-not-found.pug', { title: 'Page Not Found', error: err });
  } else {
    res.render('error.pug', { title: 'Page Not Found', error: err });
  }
});

module.exports = app;