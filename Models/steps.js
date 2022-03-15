import mongoose from "mongoose";

const Steps = new mongoose.Schema({
  courseName: { type: String, required: true },
  lessonName: { type: String, required: true },
  stepName: { type: String, required: true },
  stepType: { type: String, required: true },
  stepContent: {},
});
export default mongoose.model("steps", Steps);
