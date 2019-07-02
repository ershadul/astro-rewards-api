const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const PromocodeSchema = new Schema({
  subscriber: { type: Schema.Types.ObjectId, ref: 'Subscriber', required: true },
  code: { type: String, trim: true, default: uuidv4 },
});

PromocodeSchema.plugin(timestamp);

// Export the model
const Promocode = mongoose.model('Promocode', PromocodeSchema);
module.exports = Promocode;
