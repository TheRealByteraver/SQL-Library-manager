// NOTE: to start the app, start the file /bin/www, NOT this app.js file!!!
// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { sequelize } = require('./models'); 

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Successfully connected to the database');
  } catch(error) {
    console.log('Error occurred connecting to the database: ', error);
  }
})();

// catch 404 errors
app.use(function(req, res, next) {
  const err = new Error('The page you are looking for does not exist.🤷‍♂️');
  err.status = 404;
  next(err); // let the error handler below handle it further    
});

// catch all errors
app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  console.log(`Error ${err.status} : ${err.message}`);

  // clean up the error message for the user
  err.message = (req.app.get('env') === 'development')
    ? err.message 
    : 'Sorry! There was an unexpected error on the server. 🙅‍♂️';

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