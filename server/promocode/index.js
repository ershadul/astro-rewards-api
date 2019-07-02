const mongoose = require('mongoose');
const Subscriber = require('../subscriber/subscriber');
const Promocode = require('./promocode');

function create(req, res) {
  const { tenant } = req.headers;
  if (!tenant) { return res.status(400).send('tenant header is required.'); }
  if (!req.body.idType) { return res.status(400).send('idType is required.'); }
  if (!req.body.idNumber) { return res.status(400).send('idNumber is required.'); }
  if (!req.body.accountNumber) { return res.status(400).send('accountNumber is required.'); }

  let data = req.body || {};
  data.tenant = new mongoose.Types.ObjectId(tenant);

  Subscriber.findOne(data, (err, subscriber) => {
    if (err) { return res.status(400).send('Failed to create a promocode.'); }
    if (!subscriber) { return res.status(400).send('Invalid subscriber id provided.'); }
    Promocode.create({ subscriber: subscriber._id }, (err2, promocode) => {
      if (err2) { return res.status(400).send('Failed to create a promocode.'); }
      res.status(201).send(promocode);
    });
  });
}

module.exports = {
  create,
};
