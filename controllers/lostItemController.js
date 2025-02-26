const LostItem = require("../models/LostItem");

exports.reportLostItem = async (req, res) => {
  try {
    const lostItem = new LostItem({ ...req.body, userId: req.user._id });
    await lostItem.save();
    res.status(201).json({ message: "Lost item reported", lostItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteLostItem = async (req, res) => {
  try {
    const { id } = req.params;
    await LostItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Lost item removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
