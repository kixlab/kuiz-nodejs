require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

const db = require('./src/db/db');
db();
var app = express();
app.use(cors());
// app.get('/',(req,res) =>{res.header("Access-Control-Allow-Origin","localhost:3000");res.send(data)});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SGMCQ Express API Documentation",
      version: "0.1.0",
      description:
        "This is a SGMCQ Epxress app documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/books.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var authRouter = require('./src/routes/auth');
var classRouter = require('./src/routes/class')


//app.use('/', indexRouter);
app.use('/auth',authRouter);//localhost:8080/auth/register
app.use('/class', classRouter)
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

const PORT = 8080; 

app.listen(PORT, () => {
    console.log(`Server Running at PORT: ${PORT}`);
})




module.exports = app;
