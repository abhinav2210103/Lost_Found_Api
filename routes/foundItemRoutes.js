const express = require("express");
const { reportFoundItem, getFoundItems, deleteFoundItem } = require("../controllers/foundItemController");

const router = express.Router();

router.post("/", reportFoundItem);
router.get("/", getFoundItems);
router.delete("/:id", deleteFoundItem);

module.exports = router;
