const Tenant = require('../tenant/tenant');

module.exports = (req, res, next) => {
  if (req.headers.tenant) {
    Tenant.findById(req.headers.tenant, (err, tenant) => {
      if (err || !tenant) { return res.status(400).send('Invalid tenant Id provided'); }
      req.tenant = tenant;
      next();
    });
  } else {
    req.tenant = null;
    next();
  }
};
