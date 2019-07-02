const mongoose = require('mongoose');
const Subscriber = require('../subscriber/subscriber');
const Promocode = require('./promocode');

function create(req, res) {
  let data = req.body || {};
  data.tenant = req.tenant._id;

  Subscriber.findOne(data, (err, subscriber) => {
    if (err) { return res.status(400).json(err); }
    if (!subscriber) { return res.status(400).json({ message: 'Invalid subscriber id provided.' }); }
    Promocode.create({ subscriber: subscriber._id }, (err2, promocode) => {
      if (err2) { return res.status(400).json(err2); }
      res.status(201).send(promocode);
    });
  });
}

module.exports = {
  create,
};
