const config = require('../config');

module.exports = (req, res, next) => {
  if (!req.headers.superuser || req.headers.superuser !== config.SUPERUSER) {
    return res.status(400).json({ message: 'Superuser key is required in header.' });
  }
  return next();
};
