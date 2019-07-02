const _ = require('lodash');
const Subscriber = require('./subscriber');

function list(req, res) {
  let queryObject = req.query || {};
  queryObject.tenant = req.tenant._id;
  Subscriber.find(queryObject, (err, subscribers) => {
    if (err) { return res.status(400).send('Error fetching subscribers.'); }
    res.status(200).send(subscribers);
  });
}

function create(req, res) {
  let data = req.body || {};
  data.tenant = req.tenant._id;
  Subscriber.create(data, (err, newSubscriber) => {
    if (err) { return res.status(400).send('Failed to create a subscriber.'); }
    res.status(201).send(newSubscriber);
  });
}

module.exports = {
  list,
  create,
};
