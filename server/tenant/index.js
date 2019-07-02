const _ = require('lodash'),
  Tenant = require('./tenant');

function list(req, res) {
  let queryObject = req.query || {};

  Tenant.find(queryObject, (err, tenants) => {
    if (err) { return res.status(400).send('Error fetching tenants.'); }
    res.status(200).send(tenants);
  });
}

function create(req, res) {
  Tenant.create(req.body, (err, newTenant) => {
    if (err) { return res.status(400).send('Failed to create a tenant.'); }
    res.status(201).send(newTenant);
  });
}

function get(req, res) {
  const tenantId = req.params.id;
  Tenant.findById(tenantId, (err, _tenant) => {
    if (err) { return res.status(400).send('Failed to fetch tenant.'); }
    if (!_tenant) { return res.status(404).send('Tenant with id not found.'); }
    res.status(200).send(_tenant);
  });
}

function update(req, res) {
  const tenantId = req.params.id;
  Tenant.findByIdAndUpdate(tenantId, req.body, {new: true}, (err, _tenant) => {
    if (err) { return res.status(400).send('Failed to update tenant.'); }
    if (!_tenant) { return res.status(404).send('Tenant with id not found.'); }
    res.status(200).send(_tenant);
  });
}

function remove(req, res) {
  const tenantId = req.params.id;
  Tenant.findByIdAndRemove(tenantId, (err, _tenant) => {
    if (err) { return res.status(400).send('Failed to remove tenant.'); }
    if (!_tenant) { return res.status(404).send('Tenant with id not found.'); }
    res.status(200).send("Tenant was deleted successfully");
  });
}

module.exports = {
  list,
  create,
  get,
  update,
  remove
};
