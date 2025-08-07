const Maid = require("../models/Maid");

// Get all maids
const getAllMaids = async (req, res) => {
  try {
    const maids = await Maid.find();
    res.json(maids);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get maids by location
const getMaidsByLocation = async (req, res) => {
  const { location } = req.params;
  try {
    const maids = await Maid.find({ location: { $regex: location, $options: "i" } });
    res.json(maids);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add new maid
const addMaid = async (req, res) => {
  const maidData = req.body;
  try {
    const newMaid = new Maid(maidData);
    await newMaid.save();
    res.status(201).json(newMaid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete maid by ID
const deleteMaid = async (req, res) => {
  const { id } = req.params;
  try {
    await Maid.findByIdAndDelete(id);
    res.json({ message: "Maid deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllMaids, getMaidsByLocation, addMaid, deleteMaid };
