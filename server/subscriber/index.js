const _ = require('lodash');
const Subscriber = require('./subscriber');

function list(req, res) {
  const queryObject = req.query || {};
  Subscriber.find(queryObject, (err, subscribers) => {
    if (err) { return res.status(400).send('Error fetching subscribers.'); }
    res.status(200).send(subscribers);
  });
}

function create(req, res) {
  Subscriber.create(req.body, (err, newSubscriber) => {
    if (err) { return res.status(400).send('Failed to create a subscriber.'); }
    res.status(201).send(newSubscriber);
  });
}

module.exports = {
  list,
  create,
};
