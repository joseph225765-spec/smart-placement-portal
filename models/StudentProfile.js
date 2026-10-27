const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  course: { type: String, required: true, trim: true, maxlength: 100 },
  skills: { type: String, required: true, trim: true, maxlength: 200 },
}, { timestamps: true });

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
