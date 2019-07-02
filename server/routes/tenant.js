const Tenant = require('../tenant');
const superuser = require('../middlewares/superuser');

module.exports = (app) => {
  app.get('/v1/tenants', superuser, Tenant.list);
  app.post('/v1/tenants', superuser, Tenant.create);
  app.get('/v1/tenants/:id', superuser, Tenant.get);
  app.put('/v1/tenants/:id', superuser, Tenant.update);
  app.delete('/v1/tenants/:id', superuser, Tenant.remove);
};
