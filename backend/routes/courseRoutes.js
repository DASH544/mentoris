import express, { Router } from "express";
import { addLecture, adminProfile, createCourse, deleteCourse, editCourse, getAllUsers, myCourses } from "../controllers/admin_courseControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAllCourse } from "../controllers/userControllers.js";
import uploadFile from "../middlewares/multer.js";
import { userAuth } from "../middlewares/userAuth.js";
const router = express.Router();


router.get("/all",getAllCourse)
router.post("/addlecture/:id",adminAuth,uploadFile,addLecture)
router.get("/lectures/:id",userAuth)
export default router;
