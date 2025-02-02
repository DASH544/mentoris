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
        role:
        {
            type:String,
            default:"user"
        },
        subsciption:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }]

    },
    {
        timestamps:true
    })

    export const UserModel=mongoose.model("user",userSchema)