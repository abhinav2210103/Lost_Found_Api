const { Schema, model } = require("mongoose");

const foundItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    dateFound: { type: Date, required: true },
    imageUrl: { type: String }, 
  },
  { timestamps: true }
);

const FoundItem = model("FoundItem", foundItemSchema);
module.exports = FoundItem;
