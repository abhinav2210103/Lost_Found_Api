const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

exports.matchItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();
    
    const matches = [];

    lostItems.forEach(lost => {
      foundItems.forEach(found => {
        if (
          lost.itemName.toLowerCase() === found.itemName.toLowerCase() &&
          lost.location.toLowerCase() === found.location.toLowerCase()
        ) {
          matches.push({ lostItem: lost, foundItem: found });
        }
      });
    });

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
