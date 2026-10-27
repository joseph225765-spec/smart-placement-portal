const express = require("express");
const StudentProfile = require("../models/StudentProfile");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne().sort({ updatedAt: -1 }).lean();
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { name, course, skills } = req.body;
    if (![name, course, skills].every((value) => typeof value === "string" && value.trim())) {
      return res.status(400).json({ message: "Name, course, and skills are required." });
    }
    const profile = await StudentProfile.findOneAndUpdate(
      {},
      { name: name.trim(), course: course.trim(), skills: skills.trim() },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
