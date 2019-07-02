const _ = require('lodash');
const mongoose = require('mongoose');
const Reward = require('./reward');
const Company = require('../company/company');
const upload = require('../services/image-uploader');

const singleUpload = upload.single('thumbnail');

function list(req, res) {
  const { tenant } = req.headers;
  if (!tenant) { return res.status(400).send('tenant header is required.'); }

  const tenantId = new mongoose.Types.ObjectId(tenant);

  Company.find({ tenant: tenantId }, '_id').distinct('_id').exec((err1, companyIds) => {
    let queryObject = req.query || {};
    const date = new Date();
    queryObject.redemptionPeriodStart = { $lte: date };
    queryObject.redemptionPeriodEnd = { $gt: date };
    queryObject.company = { $in: companyIds };

    Reward.find(queryObject).populate('company').exec((err2, rewards) => {
      if (err2) { return res.status(400).send('Error fetching rewards.'); }
      res.status(200).send(rewards);
    });
  });
}

function create(req, res) {
  const { tenant } = req.headers;
  if (!tenant) { return res.status(400).send('tenant header is required.'); }

  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
    }
    const data = req.body || {};
    data.thumbnail = req.file.location;
    Reward.create(data, (err, newReward) => {
      if (err) { return res.status(400).send('Failed to create reward.'); }
      res.status(201).send(newReward);
    });
  });
}

function get(req, res) {
  const rewardId = req.params.id;
  Reward.findById(rewardId).populate('company').exec((err, _reward) => {
    if (err) { return res.status(400).send('Failed to fetch reward.'); }
    if (!_reward) { return res.status(404).send('Reward with id not found.'); }
    res.status(200).send(_reward);
  });
}

function update(req, res) {
  const rewardId = req.params.id;
  Reward.findByIdAndUpdate(rewardId, req.body, { new: true }, (err, _reward) => {
    if (err) { return res.status(400).send('Failed to update reward.'); }
    if (!_reward) { return res.status(404).send('Reward with id not found.'); }
    res.status(200).send(_reward);
  });
}

function remove(req, res) {
  const rewardId = req.params.id;
  Reward.findByIdAndRemove(rewardId, (err, _reward) => {
    if (err) { return res.status(400).send('Failed to delete reward.'); }
    if (!_reward) { return res.status(404).send('Reward with id not found.'); }
    res.status(200).send('Reward was deleted successfully');
  });
}

module.exports = {
  list,
  create,
  get,
  update,
  remove,
};
