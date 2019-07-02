const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true, trim: true },
  logo: { type: String, trim: true },
  website: { type: String, trim: true },
  tenant: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
});

CompanySchema.plugin(timestamp);

// Export the model
const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
