import mongoose from "mongoose";

const lectureSchema=new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
        desc:
        {
            type:String,
            required:true
        },
        video:
        {
            type:String,
            required:true
        },
        course:
        {
            type:mongoose.Types.ObjectId,
            ref:"courseModel",
            required:true
        }
    },{timestamps:true})

    export const LectureModel=mongoose.Schema("lecture",lectureSchema)