const tenantRoutes = require('./tenant');
const companyRoutes = require('./company');
const rewardRoutes = require('./reward');
const subscriberRoutes = require('./subscriber');
const promocodeRoutes = require('./promocode');

module.exports = (app) => {
  tenantRoutes(app);
  companyRoutes(app);
  rewardRoutes(app);
  subscriberRoutes(app);
  promocodeRoutes(app);
};
