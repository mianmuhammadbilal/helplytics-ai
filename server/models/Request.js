const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: String,
  tags: [String],
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['open', 'in_progress', 'solved'], default: 'open' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  helpers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  aiSummary: String,
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);