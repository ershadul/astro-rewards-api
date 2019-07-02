const Company = require('../company');
const tenantRequired = require('../middlewares/tenant');

module.exports = (app) => {
  app.get('/v1/companies', tenantRequired, Company.list);
  app.post('/v1/companies', tenantRequired, Company.create);
  app.get('/v1/companies/:id', tenantRequired, Company.get);
  app.put('/v1/companies/:id', tenantRequired, Company.update);
  app.delete('/v1/companies/:id', tenantRequired, Company.remove);
};
