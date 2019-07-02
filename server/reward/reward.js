const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const RewardSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true, trim: true },
  subTitle: { type: String, trim: true },
  description: { type: String, required: true, trim: true },
  thumbnail: { type: String, requird: true },
  redemptionPeriodStart: { type: Date, default: Date.now, required: true },
  redemptionPeriodEnd: { type: Date, required: true },
  redemptionType: { type: String, enum: ['online', 'store'], default: 'online' },
  locationUrl: { type: String, trim: true },
});

RewardSchema.plugin(timestamp);

const Reward = mongoose.model('Reward', RewardSchema);
module.exports = Reward;
