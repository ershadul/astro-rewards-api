const Company = require('../company');

module.exports = (app) => {
  app.get('/v1/companies', Company.list);
  app.post('/v1/companies', Company.create);
  app.get('/v1/companies/:id', Company.get);
  app.put('/v1/companies/:id', Company.update);
  app.delete('/v1/companies/:id', Company.remove);
};
