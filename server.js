require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("node:path");
const Job = require("./models/Job");

const app = express();
const port = Number(process.env.PORT) || 3000;
const sampleJobs = [
  { role: "Frontend Developer Intern", company: "Bright Labs", location: "Bengaluru", type: "Internship" },
  { role: "Data Analyst Trainee", company: "Insight Works", location: "Hyderabad", type: "Entry level" },
  { role: "UI/UX Design Intern", company: "Pixel Studio", location: "Remote", type: "Internship" },
  { role: "Software Engineer Graduate", company: "Northstar Tech", location: "Pune", type: "Entry level" },
  { role: "Marketing Intern", company: "Grow Together", location: "Mumbai", type: "Internship" },
  { role: "Backend Developer Intern", company: "Cloudline", location: "Remote", type: "Internship" },
];

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/profile", require("./routes/profile"));
app.get("/api/health", (req, res) => res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).json({ message: "The server could not complete that request." });
});

async function start() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing. Copy .env.example to .env and add your MongoDB connection string.");
  await mongoose.connect(process.env.MONGODB_URI);
  if (await Job.countDocuments() === 0) await Job.insertMany(sampleJobs);
  app.listen(port, () => console.log(`Portal is running at http://localhost:${port}`));
}

start().catch((error) => {
  console.error(`Startup failed: ${error.message}`);
  process.exit(1);
});
