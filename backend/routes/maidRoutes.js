const express = require("express");
const router = express.Router();
const Maid = require("../models/Maid");
const {
  getAllMaids,
  getMaidsByLocation,
  addMaid,
  deleteMaid,
} = require("../controllers/maidController");

// GET all maids
router.get("/", getAllMaids);

// ✅ GET filtered maids (location, service, availability)
router.get("/search", async (req, res) => {
  const { location, service, day, time } = req.query;
  const query = {};

  // Match location (case-insensitive partial)
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  // Match services
  if (service) {
    query.services = { $in: [service] }; // array match
  }

  // Match availability (day + time)
  if (day && time) {
    query["structuredAvailability"] = {
      $elemMatch: {
        day,
        time,
      },
    };
  } else if (day) {
    query["structuredAvailability.day"] = day;
  } else if (time) {
    query["structuredAvailability.time"] = time;
  }

  try {
    const maids = await Maid.find(query);
    res.json(maids);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
});


// GET maids by location (used separately if needed)
router.get("/location/:location", getMaidsByLocation);

// POST: Add a single maid
router.post("/add", addMaid);

// POST: Add multiple maids
router.post("/add-multiple", async (req, res) => {
  try {
    const maids = req.body;

    if (!Array.isArray(maids)) {
      return res.status(400).json({ error: "Data must be an array" });
    }

    const result = await Maid.insertMany(maids, { ordered: false });
    res.status(201).json({ message: "Maids added successfully", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Delete maid by ID
router.delete("/:id", deleteMaid);

module.exports = router;
