var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require("cors"); // added this

var makanbahRouter = require("./routes/makanbah");
var addBucketRouter = require("./routes/addBucket");


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  next();
  console.log("anything");
});

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ------------- added ---------------
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/", makanbahRouter); // to get to makanbah tables
// app.use("/addToBucketList", addBucketRouter);
app.post('/addToBucketList', function (req, res) {
  console.log("trying");
  res.send('Hello Restaurant!');
})

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
  console.log("getting 404");
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("getting 500");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
