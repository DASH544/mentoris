import mongoose from "mongoose";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { CourseModel } from "../models/courseModel.js";
const requiredBody = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
});
const signinBody = requiredBody.pick({ email: true, password: true });
export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const parsedData = requiredBody.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ message: parsedData.error.issues[0].message });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(201).json({ message: "Email Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const parsedData = signinBody.safeParse(req.body);
    if (!parsedData.success)
      return res
        .status(400)
        .json({ message: parsedData.error.issues[0].message });
    const user = await UserModel.findOne({ email:email });
    if (!user)
      return res
        .status(404)
        .json({ message: "No user with this email exists" });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res.status(400).json({ message: "Incorrect Credentails" });
    const userId = user._id.toString();
    const userRole=user.role
    console.log(userId);
    const token = jwt.sign({ userId,userRole }, process.env.JWT_SECRET);
    res.status(200).json({ message: "User SignIn Sucessfully", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const userCourses=async (req,res)=>
  {
    try {
      const userId=req.userId
      const user=await UserModel.findById(userId)
      if(!user) return res.status(404).json({message:"Invalid User "})
      res.status(200).json(user.subsciption)
      
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }
export const getAllCourse=async (req,res)=>
  {
    try {
      const allCourses=await CourseModel.find()
      if(!allCourses) return res.status(404).json({message:"No Courses Found"})
      else
    {
      res.status(200).json(allCourses)
    }
      
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }
