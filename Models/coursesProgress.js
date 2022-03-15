import mongoose from "mongoose";

const CoursesProgress = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  courseName: { type: String, required: true },
  passed: { type: Boolean, default: false },
  lessons: [
    {
      lessonName: { type: String, required: true },
      _id: false,
      passed: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("courses-progress", CoursesProgress);
