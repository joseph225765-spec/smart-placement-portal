const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
