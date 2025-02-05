import express, { Router } from "express";
import { addLecture, adminProfile, createCourse, deleteCourse, editCourse, getAllUsers, myCourses } from "../controllers/admin_courseControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAllCourse } from "../controllers/userControllers.js";
import uploadFile from "../middlewares/multer.js";
import { userAuth } from "../middlewares/userAuth.js";
const router = express.Router();


router.get("/all",getAllCourse)
router.get("/single",getSingleCourse)
router.get("/lectures/:id", userAuth, fetchLectures);
router.get("/lecture/:id", userAuth, fetchLecture);
router.get("/mycourse",userAuth , getMyCourses);
export default router;
