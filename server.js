import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';

import index from './routes/index';
import user from './routes/user';
import catalog from './routes/catalog';

const server = express();

//Set up mongoose connection
mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://localhost/schoollibrary';
mongoose.connect(mongoDB, {
  useMongoClient: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(expressValidator());

server.use('/', index);
server.use('/user', user);
server.use('/catalog', catalog);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
server.use((err, req, res, next) => {
  res.status(500);
  res.send(err);
});

server.listen(3000, () => {
  console.log('We are live');
});
