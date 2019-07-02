const Reward = require('./reward');
const Company = require('../company/company');
const upload = require('../services/image-uploader');

const singleUpload = upload.single('thumbnail');

function list(req, res) {
  Company.find({ tenant: req.tenant.id }, '_id').distinct('_id').exec((err1, companyIds) => {
    if (err1) { return res.status(400).json(err1); }
    const queryObject = req.query || {};
    const date = new Date();
    queryObject.redemptionPeriodStart = { $lte: date };
    queryObject.redemptionPeriodEnd = { $gt: date };
    queryObject.company = { $in: companyIds };

    Reward.find(queryObject).populate('company').exec((err2, rewards) => {
      if (err2) { return res.status(400).json(err2); }
      return res.status(200).send(rewards);
    });
  });
}

function create(req, res) {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
    }
    const data = req.body || {};
    data.thumbnail = req.file.location;
    Reward.create(data, (err2, newReward) => {
      if (err2) { return res.status(400).json(err2); }
      return res.status(201).send(newReward);
    });
  });
}

function get(req, res) {
  const rewardId = req.params.id;
  Reward.findById(rewardId).populate('company').exec((err, _reward) => {
    if (err) { return res.status(400).json(err); }
    if (!_reward) { return res.status(404).json({ message: 'Reward with id not found.' }); }
    return res.status(200).send(_reward);
  });
}

function update(req, res) {
  const rewardId = req.params.id;
  Reward.findByIdAndUpdate(rewardId, req.body, { new: true }, (err, _reward) => {
    if (err) { return res.status(400).json(err); }
    if (!_reward) { return res.status(404).json({ message: 'Reward with id not found.' }); }
    return res.status(200).send(_reward);
  });
}

function remove(req, res) {
  const rewardId = req.params.id;
  Reward.findByIdAndRemove(rewardId, (err, _reward) => {
    if (err) { return res.status(400).json(err); }
    if (!_reward) { return res.status(404).json({ message: 'Reward with id not found.' }); }
    return res.status(200).json({ message: 'Reward was deleted successfully' });
  });
}

module.exports = {
  list,
  create,
  get,
  update,
  remove,
};
