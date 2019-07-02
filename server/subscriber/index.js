const Subscriber = require('./subscriber');

function list(req, res) {
  const queryObject = req.query || {};
  queryObject.tenant = req.tenant.id;
  Subscriber.find(queryObject, (err, subscribers) => {
    if (err) { return res.status(400).json(err); }
    return res.status(200).send(subscribers);
  });
}

function create(req, res) {
  const data = req.body || {};
  data.tenant = req.tenant.id;
  Subscriber.create(data, (err, newSubscriber) => {
    if (err) { return res.status(400).json(err); }
    return res.status(201).send(newSubscriber);
  });
}

module.exports = {
  list,
  create,
};
