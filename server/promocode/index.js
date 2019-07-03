const Subscriber = require('../subscriber/subscriber');
const Reward = require('../reward/reward');
const Promocode = require('./promocode');

function create(req, res) {
  const data = req.body || {};
  data.tenant = req.tenant.id;

  Promise.all([
    Subscriber.findOne({
      tenant: req.tenant.id,
      idType: req.body.idType,
      idNumber: req.body.idNumber,
      accountNumber: req.body.accountNumber,
    }).exec(),
    Reward.findById(req.body.reward).exec(),
  ]).then((result) => {
    if (!result[0] || !result[1]) { return res.status(400).json({ message: 'Invalid subscriber info provided.' }); }
    Promocode.create({ subscriber: result[0].id, reward: result[1].id }, (err2, promocode) => {
      if (err2) { return res.status(400).json(err2); }
      return res.status(201).send(promocode);
    });
  });
}

module.exports = {
  create,
};
