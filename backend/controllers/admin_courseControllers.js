import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { CourseModel } from "../models/courseModel.js";
import { UserModel } from "../models/userModel.js";
import cloudinary from "cloudinary";
// add zod validation
import { z } from "zod";
import { LectureModel } from "../models/lectureModel.js";
import getDataUrl  from "../utils/urlGen.js";
const requiredBody = z.object({
  title: z.string().min(3).max(32),
  desc: z.string().min(8).max(256),
  price: z.string(),
  duration: z.number(),
  category: z.string().min(3).max(32),
  video: z.string(),
});
const courseBody = requiredBody.pick({
  title: true,
  thumbnail: true,
  desc: true,
  price: true,
  category: true,
});
const lectureBody = requiredBody.pick({ title: true, desc: true });
export const createCourse = async (req, res) => {
  const { title, desc, lectures, price, category, duration } = req.body;
  const file = req.file;
  try {
    const parsedBody = courseBody.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(400).json({ message: parsedBody.error });
    const adminData = req.admin;
    const fileUrl = getDataUrl(file);
    const admin = await UserModel.findById(adminData);

    if (!admin) return res.status(403).json({ message: "Unauthorized Access" });
    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);
    const course = await CourseModel.create({
      title: title,
      thumbnail: {
        id:myCloud.public_id,
        url:myCloud.secure_url
      },
      desc: desc,
      price: price,
      category: category,
      duration: duration,
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

    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId))
      return res.status(400).json({ message: "Course Not Available" });
    const delCourse = await CourseModel.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!delCourse) return res.status(404).json({ message: "Course Nt Found" });
    const lectures = await LectureModel.deleteMany({
      course: courseId,
    });
    if (!lectures) return res.status(404).json({ message: "Course Not Found" });
    res.status(201).json({ message: "Course Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editCourse = async (req, res) => {
  try {
    const adminId = req.admin;
    const courseId = req.params.id;
    const { title, desc,price,duration,category } = req.body;
    const file=req.file
    
    const parsedBody = courseBody.safeParse(req.body);
    if (!parsedBody.success)
      return res
        .status(400)
        .json({ message: parsedBody.error});
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }
    const fileUrl=getDataUrl(file)
    const myCloud=await cloudinary.v2.uploader.upload(fileUrl.content)
    const editCourse = await CourseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      {
        title: title,
        thumbnail:
        {
          id:myCloud.public_id,
          url:myCloud.secure_url,
        } ,
        desc: desc,
        price:price,
        duration:duration,
        category:category
      },
      { new: true }
    );
    if (!editCourse)
      return res.status(400).json({ message: "No Course Found" });
    console.log(editCourse);
    res.status(201).json({ message: "Course Edited Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const adminId = req.admin;
    const adminCourses = await CourseModel.find({ creatorId: adminId });
    const courseIds = adminCourses.map((item) => item._id);
    console.log(courseIds);
    const users = await UserModel.find({ subsciption: { $in: courseIds } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const adminProfile = async (req, res) => {
  try {
    const adminId = req.admin;

    const adminDetails = await UserModel.findById(adminId);
    if (!adminDetails)
      return res.status(404).json({ message: "ADMIN not found" });
    res.status(200).json({ adminDetails });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addLecture = async (req, res) => {
  try {
    const adminId = req.admin;
    const courseId = req.params.id;
    if (!courseId)
      return res.status(400).json({ message: "No Course Selected" });
    const course = await CourseModel.findById(courseId);
    if (!course) return res.status(404).json("Course Not Found");
    const { title, desc, video } = req.body;
    const parsedBody = lectureBody.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(400).json({ message: parsedBody.error });
    const lecture = await LectureModel.create({
      title: title,
      desc: desc,
      video: video,
      course: courseId,
    });
    res.status(201).json({ message: "Lecture Added Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getLecture = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteLecture = async (req, res) => {
  try {
    const adminId = req.admin;
    const lectureId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(lectureId))
      return res.status(400).json({ message: "Lecture Not Found wrong id" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
