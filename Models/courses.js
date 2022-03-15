import mongoose from "mongoose";

const Courses = new mongoose.Schema({
  courseName: { type: String, required: true },
  svgImage: { type: String },
  lessons: [
    {
      lessonName: { type: String, required: true },
      _id: false,
    },
  ],
});

export default mongoose.model("courses", Courses);
