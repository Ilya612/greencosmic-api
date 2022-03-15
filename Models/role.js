import mongoose from "mongoose";

const role = new mongoose.Schema({
  value: { type: String, default: "USER", unique: true },
});
export default mongoose.model("role", role);
