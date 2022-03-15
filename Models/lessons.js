import mongoose from "mongoose";

const Lessons = new mongoose.Schema({
  courseName: { type: String, required: true },
  lessonName: { type: String, required: true },
  steps: [
    {
      stepName: { type: String, required: true },
      _id: false,
    },
  ],
});
export default mongoose.model("lessons", Lessons);
