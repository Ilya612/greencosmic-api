import mongoose from "mongoose";

const Steps = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  courseName: { type: String, required: true },
  lessonName: { type: String, required: true },
  stepName: { type: String, required: true },
  passed: { type: Boolean, default: false },
});
export default mongoose.model("steps-progress", Steps);
