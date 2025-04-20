// setup express-session using mongoose

const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 24 * 60 * 60
      })
    })
  );
}