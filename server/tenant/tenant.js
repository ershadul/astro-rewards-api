const mongoose = require('mongoose'),
  timestamp = require('mongoose-timestamp'),
  Schema = mongoose.Schema;

let TenantSchema = new Schema({
  name: {type: String, required: true, unique: true, trim: true},
});

TenantSchema.plugin(timestamp);

// Export the model
const Tenant = mongoose.model('Tenant', TenantSchema);
module.exports = Tenant;
