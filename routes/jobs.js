const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const search = String(req.query.search || "").trim();
    const filter = search
      ? { $or: ["role", "company", "location", "type"].map((field) => ({ [field]: { $regex: search, $options: "i" } })) }
      : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
