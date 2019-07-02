const Tenant = require('./tenant');

function list(req, res) {
  const queryObject = req.query || {};

  Tenant.find(queryObject, (err, tenants) => {
    if (err) { return res.status(400).json(err); }
    res.status(200).send(tenants);
  });
}

function create(req, res) {
  Tenant.create(req.body, (err, newTenant) => {
    if (err) { return res.status(400).json(err); }
    res.status(201).send(newTenant);
  });
}

function get(req, res) {
  const tenantId = req.params.id;
  Tenant.findById(tenantId, (err, _tenant) => {
    if (err) { return res.status(400).json(err); }
    if (!_tenant) { return res.status(404).json({ message: 'Tenant not found.' }); }
    res.status(200).send(_tenant);
  });
}

function update(req, res) {
  const tenantId = req.params.id;
  Tenant.findByIdAndUpdate(tenantId, req.body, { new: true }, (err, _tenant) => {
    if (err) { return res.status(400).json(err); }
    if (!_tenant) { return res.status(404).json({ message: 'Tenant not found.' }); }
    res.status(200).send(_tenant);
  });
}

function remove(req, res) {
  const tenantId = req.params.id;
  Tenant.findByIdAndRemove(tenantId, (err, _tenant) => {
    if (err) { return res.status(400).json(err); }
    if (!_tenant) { return res.status(404).json({ message: 'Tenant not found.' }); }
    res.status(200).json({ message: 'Tenant was deleted successfully' });
  });
}

module.exports = {
  list,
  create,
  get,
  update,
  remove,
};
