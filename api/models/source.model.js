import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});

const Source = mongoose.model("Source", sourceSchema);
export default Source;
