const _ = require('lodash');
const mongoose = require('mongoose');
const Company = require('./company');
const upload = require('../services/image-uploader');

const singleUpload = upload.single('logo');

function list(req, res) {
  const queryObject = req.query || {};
  queryObject.tenant = req.tenant._id;

  Company.find(queryObject, (err, companies) => {
    if (err) { return res.status(400).send('Error fetching companies.'); }
    res.status(200).send(companies);
  });
}

function create(req, res) {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
    }

    const data = req.body || {};
    data.tenant = req.tenant._id;
    data.logo = req.file.location;

    Company.create(data, (err2, newCompany) => {
      if (err2) { return res.status(400).send('Failed to create a company.'); }
      res.status(201).send(newCompany);
    });
  });
}

function get(req, res) {
  const companyId = req.params.id;
  Company.findById(companyId, (err, _company) => {
    if (err) { return res.status(400).send('Failed to fetch company.'); }
    if (!_company) { return res.status(404).send('Company with id not found.'); }
    res.status(200).send(_company);
  });
}

function update(req, res) {
  const companyId = req.params.id;
  Company.findByIdAndUpdate(companyId, req.body, { new: true }, (err, _company) => {
    if (err) { return res.status(400).send('Failed to update company.'); }
    if (!_company) { return res.status(404).send('Company with id not found.'); }
    res.status(200).send(_company);
  });
}

function remove(req, res) {
  const companyId = req.params.id;
  Company.findByIdAndRemove(companyId, (err, _company) => {
    if (err) { return res.status(400).send('Failed to remove company.'); }
    if (!_company) { return res.status(404).send('Company with id not found.'); }
    res.status(200).send('Company was deleted successfully');
  });
}

module.exports = {
  list,
  create,
  get,
  update,
  remove,
};
