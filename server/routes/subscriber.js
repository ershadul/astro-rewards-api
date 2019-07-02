const Subscriber = require('../subscriber');

module.exports = (app) => {
  app.get('/v1/subscribers', Subscriber.list);
  app.post('/v1/subscribers', Subscriber.create);
};
