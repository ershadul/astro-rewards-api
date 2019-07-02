const Subscriber = require('../subscriber');
const tenantRequired = require('../middlewares/tenant');

module.exports = (app) => {
  app.get('/v1/subscribers', tenantRequired, Subscriber.list);
  app.post('/v1/subscribers', tenantRequired, Subscriber.create);
};
