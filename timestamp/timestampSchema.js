const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const timestampSchema = new Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  active: { type: Boolean, default: true },
  vendor: { type: ObjectId, ref: 'Vendor' },
  client: { type: ObjectId, ref: 'Client' },
  comments: { type: String },
  invoiced: { type: Boolean },
  invoiceNum: { type: ObjectId, ref: 'Invoice' }
});

module.exports = mongoose.model('timestamp', timestampSchema);