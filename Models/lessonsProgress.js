import mongoose from "mongoose";

const Lessons = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  courseName: { type: String, required: true },
  lessonName: { type: String, required: true },
  steps: [
    {
      stepName: { type: String, required: true },
      _id: false,
      passed: { type: Boolean, default: false },
    },
  ],
});
export default mongoose.model("lessons-progress", Lessons);
