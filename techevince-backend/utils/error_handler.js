const { JsonWebTokenError } = require("jsonwebtoken");
const { MongooseError } = require("mongoose");

const errorHandler = (err, req, res, next) => {
  switch (true) {
    case typeof err === 'string':
      // custom application error
      const is404 = err.toLowerCase().endsWith('not found');
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ data: null, error: err, message: err });
    case err.name === 'ValidationError':
      // mongoose validation error
      return res.status(400).json({ data: null, error: err, message: err.message });
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      return res.status(401).json({ data: null, error: err, message: 'Unauthorized' });
    default:
      console.log(err);
      return res.status(500).json({ data: null, error: err, message: err.message });
  }
}
module.exports.errorHandler = errorHandler;