const { Schema, model } = require("mongoose");

const lostItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    dateLost: { type: Date, required: true },
    imageUrl: { type: String }, 
  },
  { timestamps: true }
);

const LostItem = model("LostItem", lostItemSchema);
module.exports = LostItem;
