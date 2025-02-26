const express = require("express");
const { matchItems } = require("../controllers/matchController");

const router = express.Router();

router.get("/", matchItems);

module.exports = router;
