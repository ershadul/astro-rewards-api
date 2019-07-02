const Tenant = require('../tenant');

module.exports = (app) => {
  app.get('/v1/tenants', Tenant.list);
  app.post('/v1/tenants', Tenant.create);
  app.get('/v1/tenants/:id', Tenant.get);
  app.put('/v1/tenants/:id', Tenant.update);
  app.delete('/v1/tenants/:id', Tenant.remove);
};
