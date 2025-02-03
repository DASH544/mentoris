import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { CourseModel } from "../models/courseModel.js";
import { UserModel } from "../models/userModel.js";
// add zod validation
export const createCourse = async (req, res) => {
  const { title, thumbnail, lectures } = req.body;
  try {
    const adminData = req.admin;
    console.log(adminData);
    const admin = await UserModel.findById(adminData);
    console.log(admin);
    if (!admin) return res.status(403).json({ message: "Unauthorized Access" });
    const course = await CourseModel.create({
      title: title,
      thumbnail: thumbnail,
      lectures: lectures,
      creatorId: adminData,
    });
    res.status(200).json({ message: "Course Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const myCourses = async (req, res) => {
  try {
    const adminId = req.admin;
    if (!adminId) return res.status(401).json({ message: "Unauthorized" });
    const myCourses = await CourseModel.find({ creatorId: adminId });
    if (!myCourses)
      return res.status(404).json({ message: "No Courses Found" });
    res.status(200).json(myCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCourse = async (req, res) => {
  try {
    const adminId = req.admin;
    console.log(adminId);
    const courseId = req.params.id;
    console.log(courseId);
    if (!mongoose.Types.ObjectId.isValid(courseId))
      return res.status(400).json({ message: "Course Not Available" });
    const delCourse = await CourseModel.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });

    res.status(201).json({ message: "Course Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editCourse = async (req, res) => {
  try {
    const adminId = req.admin;
    const courseId = req.params.id;
    const { title, thumbnail } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }
    const editCourse = await CourseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      {
        title: title,
        thumbnail: thumbnail,
      },
      { new: true }

    );
    if(!editCourse) return res.status(400).json({message:"No Course Found"})
    console.log(editCourse);
    res.status(201).json({ message: "Course Edited Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers=async(req,res)=>
  {
    try {
      const adminId=req.admin
      const adminCourses=await CourseModel.find({creatorId:adminId})
     const courseIds=adminCourses.map((item)=>item._id)
     console.log(courseIds)
      const users=await UserModel.find({subsciption:{$in:courseIds}})
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }