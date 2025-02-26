const LostItem = require("../models/LostItems");
const FoundItem = require("../models/FoundItem");
const User = require("../models/users");
const { sendEmailNotification } = require("../utils/emailService");

exports.matchItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find().populate("userId");
    const foundItems = await FoundItem.find();

    const matches = [];

    lostItems.forEach((lost) => {
      foundItems.forEach((found) => {
        if (
          lost.itemName.toLowerCase() === found.itemName.toLowerCase() &&
          lost.location.toLowerCase() === found.location.toLowerCase()
        ) {
          matches.push({ lostItem: lost, foundItem: found });
        }
      });
    });

    if (matches.length > 0) {
      matches.forEach(({ lostItem, foundItem }) => {
        sendEmailNotification(
          lostItem.userId.email,
          "Lost Item Matched!",
          `Hello ${lostItem.userId.fullName}, 
      
          Your lost item "${lostItem.itemName}" has been found at "${foundItem.location}" on ${foundItem.dateFound}. 
          
          Please contact the finder to claim it.`
        );
      });      
    }

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
