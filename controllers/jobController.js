const Job = require("../models/Job");
const nodemailer = require("nodemailer");

// Create Job
const createJob = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;

  if (!jobTitle || !jobDescription || !experienceLevel || !endDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const job = new Job({
      companyId: req.user.userId,
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.user.userId });
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const sendJobEmails = async (req, res) => {
    const { jobId } = req.params;
  
    try {
      // Find the job by ID
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: job.candidates, // List of candidate emails
        subject: `Job Opportunity: ${job.jobTitle}`,
        html: `
          <h2>${job.jobTitle}</h2>
          <p>${job.jobDescription}</p>
          <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
          <p><strong>End Date:</strong> ${new Date(job.endDate).toDateString()}</p>
          <p>This job was posted by your company.</p>
        `,
      };
  
      // Send emails
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Emails sent to candidates successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  module.exports = { createJob, getJobs, sendJobEmails };