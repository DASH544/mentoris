import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,

      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lecture",
      },
    ],
  },
  { timestamps: true }
);

export const CourseModel = mongoose.model("course", courseSchema);
