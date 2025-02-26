const express = require("express");
const {
  reportLostItem,
  getLostItems,
  deleteLostItem,
  getNearbyLostItems, 
  getUserLostItemsHistory 
} = require("../controllers/lostItemController");

const router = express.Router();

router.post("/", reportLostItem);
router.get("/", getLostItems);
router.delete("/:id", deleteLostItem);
router.get("/nearby", getNearbyLostItems); 
router.get("/history", getUserLostItemsHistory); 

module.exports = router;
