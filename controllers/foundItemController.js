const FoundItem = require("../models/FoundItem");

exports.reportFoundItem = async (req, res) => {
  try {
    const { itemName, description, location, dateFound } = req.body;

    if (!itemName || !description || !location || !dateFound) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const foundItem = new FoundItem({ ...req.body, userId: req.user._id });
    await foundItem.save();

    res.status(201).json({ message: "Found item reported", foundItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find();
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFoundItem = async (req, res) => {
  try {
    const { id } = req.params;
    await FoundItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Found item removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
