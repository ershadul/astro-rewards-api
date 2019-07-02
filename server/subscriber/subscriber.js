const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const SubscriberSchema = new Schema({
  idType: {
    type: String,
    required: true,
    enum: ['MyKad', 'Old NRIC', 'Passport', 'Army', 'Police', 'Navy'],
  },
  idNumber: { type: String, trim: true, required: true },
  accountNumber: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: v => v && (v.length === 10 || v.length === 12),
    },
  },
  tenant: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
});

SubscriberSchema.plugin(timestamp);

// Export the model
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
module.exports = Subscriber;
