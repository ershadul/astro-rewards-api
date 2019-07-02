const Reward = require('../reward');

module.exports = (app) => {
  app.get('/v1/rewards', Reward.list);
  app.post('/v1/rewards', Reward.create);
  app.get('/v1/rewards/:id', Reward.get);
  app.put('/v1/rewards/:id', Reward.update);
  app.delete('/v1/rewards/:id', Reward.remove);
};
