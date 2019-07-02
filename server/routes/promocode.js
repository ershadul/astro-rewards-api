const Promocode = require('../promocode');

module.exports = (app) => {
  app.post('/v1/promocodes', Promocode.create);
};
