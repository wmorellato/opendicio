const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const meaningsRouter = require('./routes/meanings');
const synonymsRouter = require('./routes/synonyms');
const { handleError } = require('./utils/error');
require('./db/mongoose');

const BASE_API = '/api/v1/';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// may move to a separate file if it gets too messy
app.use(BASE_API, meaningsRouter);
app.use(BASE_API, synonymsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  handleError(err, res);
});

module.exports = app;
