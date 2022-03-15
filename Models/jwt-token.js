import mongoose from "mongoose";

const Token = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
export default mongoose.model("tokens", Token);
