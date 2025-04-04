import mongoose from "mongoose";

const entitySchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Entity = mongoose.model("Entity", entitySchema);
export default Entity;
