import mongoose from "mongoose"
const courseSchema=new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
        thumbnail:
        {
            type:String,
            unique:true,
            required:true,
        },
        creatorId:
        {
           type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        isAdmin:
        {
            type:Boolean,
        },
        lectures:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"lecture"
        }

    })

    export const CourseModel=mongoose.model("course",courseSchema)