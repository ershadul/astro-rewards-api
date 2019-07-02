const Reward = require('../reward');
const tenantRequired = require('../middlewares/tenant');

module.exports = (app) => {
  app.get('/v1/rewards', tenantRequired, Reward.list);
  app.post('/v1/rewards', tenantRequired, Reward.create);
  app.get('/v1/rewards/:id', tenantRequired, Reward.get);
  app.put('/v1/rewards/:id', tenantRequired, Reward.update);
  app.delete('/v1/rewards/:id', tenantRequired, Reward.remove);
};
