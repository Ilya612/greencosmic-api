import mongoose from "mongoose";

const CourseDescription = new mongoose.Schema({
  courseName: { type: String, required: true },
  mainImage: { type: String, required: true },
  blocks: [
    {
      blockName: { type: String },
      blockContent: { type: String },
      blockType: { type: String },
    },
  ],
});

export default mongoose.model("course-description", CourseDescription);
