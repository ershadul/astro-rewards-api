const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const TenantSchema = new Schema({
  name: {
    type: String, required: true, unique: true, trim: true,
  },
});

TenantSchema.plugin(timestamp);

// Export the model
const Tenant = mongoose.model('Tenant', TenantSchema);
module.exports = Tenant;
