const mongoose = require('mongoose'),
  timestamp = require('mongoose-timestamp'),
  Schema = mongoose.Schema;

let CompanySchema = new Schema({
  name: {type: String, required: true, trim: true},
  logo: {type: String, trim: true},
  website: {type: String, trim: true},
  tenant: {type: Schema.Types.ObjectId, ref: 'Tenant', required: true},
});

CompanySchema.plugin(timestamp);

// Export the model
const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
