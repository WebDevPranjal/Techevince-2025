const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/api/auth/login');
}

module.exports = { ensureAuthenticated };