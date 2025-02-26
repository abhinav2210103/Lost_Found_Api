const express = require("express");
const { reportLostItem, getLostItems, deleteLostItem } = require("../controllers/lostItemController");

const router = express.Router();

router.post("/", reportLostItem);
router.get("/", getLostItems);
router.post("/:id", deleteLostItem);

module.exports = router;
