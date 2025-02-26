const express = require("express");
const { reportFoundItem, getFoundItems, deleteFoundItem, handleUploadImage } = require("../controllers/foundItemController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/", reportFoundItem);
router.get("/", getFoundItems);
router.post("/upload-image/:id", upload.single("image"), handleUploadImage);
router.delete("/:id", deleteFoundItem);

module.exports = router;
