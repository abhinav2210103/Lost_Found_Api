const express = require("express");
const {
  reportLostItem,
  getLostItems,
  deleteLostItem,
  getNearbyLostItems, 
  getUserLostItemsHistory,
  claimFoundItem
} = require("../controllers/lostItemController");

const router = express.Router();

router.post("/", reportLostItem);
router.get("/", getLostItems);
router.delete("/:id", deleteLostItem);
router.get("/nearby", getNearbyLostItems);
router.get("/history", getUserLostItemsHistory); 
router.get("/claim/:id", claimFoundItem);

module.exports = router;
