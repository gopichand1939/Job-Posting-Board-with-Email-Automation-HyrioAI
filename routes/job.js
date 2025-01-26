const express = require("express");
const { createJob, getJobs, sendJobEmails } = require("../controllers/jobController");
const router = express.Router();

// Create a job posting
router.post("/", createJob);

// Get all jobs for the authenticated user
router.get("/", getJobs);

// Send emails to candidates for a specific job
router.post("/:jobId/notify", sendJobEmails);

module.exports = router;
