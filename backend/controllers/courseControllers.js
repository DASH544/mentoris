import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { CourseModel } from "../models/courseModel.js";
import { UserModel } from "../models/userModel.js";

export const createCourse = async (req, res) => 
    {
        const {title,thumbnail,lectures}=req.body
        try {
            const adminData=req.admin
            console.log(adminData)
            const admin=await UserModel.findById(adminData)
            console.log(admin)
            if(!admin) return res.status(403).json({message:"Unauthorized Access"})
            const course=await CourseModel.create(
                {
                    title:title,
                    thumbnail:thumbnail,
                    lectures:lectures,
                    creatorId:adminData
                })
            res.status(200).json({message:"Course Added Successfully"})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    };
