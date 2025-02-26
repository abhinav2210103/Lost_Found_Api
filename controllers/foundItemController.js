const FoundItem = require("../models/FoundItem");
const {uploadOnCloudinary} = require("../utils/cloudinary.util");

async function reportFoundItem(req, res) {
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


  async function getFoundItems(req, res) {
  try {
    const foundItems = await FoundItem.find();
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  async function deleteFoundItem(req, res) {
  try {
    const { id } = req.params;
    await FoundItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Found item removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


async function handleUploadImage(req, res) {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (req.file.size > 500 * 1024) { 
      return res.status(400).json({ message: "File size should be less than 500KB." });
    }

    const foundItem = await FoundItem.findById(id);
    if (!foundItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    console.log("uploadOnCloudinary function:", uploadOnCloudinary);

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const cloudinaryResponse = await uploadOnCloudinary(dataURI);

    foundItem.imageUrl = cloudinaryResponse.secure_url;
    await foundItem.save();

    return res.status(200).json({ message: "Image uploaded successfully", foundItem });
  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { handleUploadImage , reportFoundItem, getFoundItems, deleteFoundItem }; 
