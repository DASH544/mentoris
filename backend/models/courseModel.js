import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      id: String,
      url: String,
    },
    desc:
    {
      type:String,
      required:true
    },
    price:
    {
      type:String,
      required:true
    },
    duration:
    {
      type:Number,
      required:true
    },
    category:
    {
      type:String,
      required:true
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const CourseModel = mongoose.model("course", courseSchema);
