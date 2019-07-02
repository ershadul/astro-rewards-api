const mongoose = require('mongoose'),
  timestamp = require('mongoose-timestamp'),
  Schema = mongoose.Schema;

let RewardSchema = new Schema({
  title: {type: String, required: true, trim: true},
  subTitle: {type: String, trim: true},
  description: {type: String, required: true, trim: true},
  thumbnail: {type: String, requird: true},
  redemptionPeriodStart: {type: Date, default: Date.now, required: true},
  redemptionPeriodEnd: {type: Date, required: true},
  redemptionType: {type: String, enum: ['online', 'store'], default: 'online'},
  locationUrl: {type: String, trim: true},
  tenant: {type: Schema.Types.ObjectId, ref: 'Tenant', required: true},
  company: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
});

RewardSchema.plugin(timestamp);

// Export the model
const Reward = mongoose.model('Reward', RewardSchema);
module.exports = Reward;
