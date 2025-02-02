import mongoose from "mongoose"
const userSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            unique:true,
            required:true,
        },
        password:
        {
            type:String,
            required:true
        },
        isAdmin:
        {
            type:Boolean,
        },
        courses:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }

    })

    export const UserModel=mongoose.model("user",userSchema)