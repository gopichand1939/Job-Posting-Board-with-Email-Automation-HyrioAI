const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experienceLevel: { type: String, enum: ["BEGINNER", "INTERMEDIATE", "EXPERT"], required: true },
  candidates: [{ type: String }], // Array of candidate emails
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Job", jobSchema);
