var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require("cors"); // added this

var makanbahRouter = require("./routes/makanbah");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ------------- added ---------------
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

app. use("/makanbah", makanbahRouter); // to get to makanbah tables

// -------------- until here ---------

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// --------------- added ---------------
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
// ------------- until here -------------


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
  res.send('error');
});

module.exports = app;