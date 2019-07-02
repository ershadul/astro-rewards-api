const Promocode = require('../promocode');
const tenantRequired = require('../middlewares/tenant');

module.exports = (app) => {
  app.post('/v1/promocodes', tenantRequired, Promocode.create);
};
